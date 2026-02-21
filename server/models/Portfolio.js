const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        unique: true,
    },
    profile: {
        fullName: String,
        bio: String,
        avatar: String,
        title: String,
        location: String,
    },
    socialLinks: {
        github: String,
        linkedin: String,
        twitter: String,
        instagram: String,
        email: String,
        website: String,
    },
    skills: [{
        name: String,
        level: { type: Number, default: 80 },
        category: { type: String, default: 'Frontend' }
    }],
    specializations: [{
        title: String,
        description: String,
        icon: String
    }],
    projects: [{
        title: String,
        description: String,
        image: String,
        techStack: [String],
        githubLink: String,
        liveLink: String,
    }],
    theme: {
        type: String,
        default: 'modern-blue',
    }
}, { timestamps: true });

module.exports = mongoose.model('Portfolio', portfolioSchema);
