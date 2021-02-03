import mongoose from 'mongoose';
var Mixed = mongoose.Schema.Types.Mixed;

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/ 
    },
    password: {type: String, required: true },
    resetToken: String,
    tokenExpires: Date,
    verify: Boolean,
    verifyToken: String,
    roles: { type: [String], default: [] },
    config: { type: Mixed, default: { user:true } },
    regdate: Date,
});

module.exports = mongoose.model('User', userSchema);

