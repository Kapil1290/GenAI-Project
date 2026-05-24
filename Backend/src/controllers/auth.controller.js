const userModel = require('../models/user.model')
const blacklistModel = require('../models/blacklist.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/**
 * @name POST api/auth/register 
 * @description to register the user with certain details
 * @access public
 */
async function userRegister(req, res){ 
    const{ username, email, password } = req.body;

    if(!username || !email || !password){
        return res.status(401).json({
            message:"All fields required"
        })   
    }

    const isUserAlreadyExist = await userModel.findOne({
        $or:[{username},{email}]
    })

    if(isUserAlreadyExist){
        return res.status(401).json({
            message:"Username or Email already exist!!"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password:hash
    })

    const token = jwt.sign({
        id:user._id,
        username: user.username
    }, process.env.JWT_SECRET, {
        expiresIn:"1d"
    })

    res.cookie("token", token)

    res.status(200).json({
        message:"User successfully registered",
        user:{
            id:user._id,
            username: user.username,
            email:user.email,
        }

    })
    
}

/**
 * @name post login controller 
 * @description use to login the app 
 * @access private
 */
async function userLogin(req, res){
    const{email, password} = req.body; 

    const data = await userModel.findOne({email})

    if(!data){
        return res.status(401).json({
            message:"Email or Username doesn't exist"
        })
    }
    
    const isValidPassword = await bcrypt.compare(password, data.password)

    if(!isValidPassword){
        return res.status(402).json({
            message: "Password is incorrect"
        })
    }

    const token = jwt.sign({
        id: data._id,
        username: data.username
    }, process.env.JWT_SECRET, {
        expiresIn:"1d"
    })

    res.cookie("token", token)

    return res.status(200).json({
        message:"User logged in successfully",
        user:{
            id: data._id,
            username:data.username,
            email: data.email,
        }
    })

}

/**
 * @name get logout controller
 * @description use to logout the app
 * @access public
 */

async function userLogout(req, res){
    
    const token = req.cookies.token;

    if(token){
        await blacklistModel.create({token});
    }

    if(!token){
        return res.status(401).json({
            message:"User already logout!!!"
        })
    }

    res.clearCookie("token")

    return res.status(200).json({
        message:"User logged out successfully"
    })
}


/**
 * @name get api/auth/get-me
 * @description to get the current logged in user details
 * @access private
 */

async function getMeController(req, res){

    const user = await userModel.findById(req.user.id)

    return res.status(200).json({
        message:"User data fetched successfully...",
        user:{
            id:user._id,
            username: user.username,
            email:user.email,
        }
    })
}

module.exports = {userRegister, userLogin, userLogout, getMeController}