const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    
    email : {
        type: String,
        required : true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value))
                throw new Error('Email is invalid');
        }
    },

    age: {
        type: Number,
        default: 0,
        validate(val){
            if(val < 0)
                throw new Error('Age must be positive number');
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(val){
            if(val.toLowerCase().includes('password'))
                throw new Error('Use other password')
        }
    }, 
    tokens : [{
        token:{
            type: String,
            required: true
        }
    }]
});

userSchema.statics.findbyCredentials = async (email, password)=> {
    const user = await User.findOne({email})
    if(!user){
        throw new Error(`Unable to login`)
    }
    const isMatch = await bcrypt.compare(password, user.password);
        
    if(!isMatch) {
       throw new Error(`Unable to login`);
    }

    return user;
}

userSchema.methods.generateAuthToken = async function (){
    const user = this;
    const token = jwt.sign({_id: user._id.toString()}, 'thisismyproject');
    
    user.tokens = user.tokens.concat({token});
    await user.save();

    return token;
}

// Hash password
userSchema.pre('save', async function(next){

    const user = this;
    //console.log("Just before save");
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    
    next()
});

const User = mongoose.model('User', userSchema);
module.exports = User;
