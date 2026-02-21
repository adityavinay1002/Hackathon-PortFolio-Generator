const Portfolio = require('../models/Portfolio');
const User = require('../models/User');

exports.getPortfolio = async (req, res, next) => {
    try {
        let portfolio = await Portfolio.findOne({ user: req.user.id });

        if (!portfolio) {
            // Create a default empty portfolio if one doesn't exist
            portfolio = await Portfolio.create({
                user: req.user.id,
                profile: { fullName: '', bio: '' },
                skills: [],
                projects: [],
            });
        }

        res.status(200).json({
            success: true,
            data: portfolio,
        });
    } catch (err) {
        next(err);
    }
};

exports.updatePortfolio = async (req, res, next) => {
    try {
        const portfolio = await Portfolio.findOneAndUpdate(
            { user: req.user.id },
            req.body,
            { new: true, runValidators: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            data: portfolio,
        });
    } catch (err) {
        next(err);
    }
};

exports.getPublicPortfolio = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const portfolio = await Portfolio.findOne({ user: user._id });

        if (!portfolio) {
            return res.status(404).json({ success: false, message: 'Portfolio not found' });
        }

        res.status(200).json({
            success: true,
            data: {
                ...portfolio._doc,
                username: user.username,
            },
        });
    } catch (err) {
        next(err);
    }
};
