const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    });
};

exports.register = async (req, res, next) => {
    try {
        const { email, password, username } = req.body;

        const user = await User.create({
            email,
            password,
            username,
        });

        const token = signToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            }
        });
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password' });
        }

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
        }

        const token = signToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
            }
        });
    } catch (err) {
        next(err);
    }
};
