import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
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
    active: Boolean,
    activeToken: String
});

userSchema.pre('save', function(next) {
    console.log('middleware hook function firing');
    next();
})

userSchema.methods.validPassword = (pw) => {
    return (this.password === pw );
}

module.exports = mongoose.model('User', userSchema);

