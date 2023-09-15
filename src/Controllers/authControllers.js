const {v4} = require('uuid');
const bcrypt = require('bcrypt')
const mssql = require ('mssql');
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const { sqlConfig } = require('../Config/config');
const { loginSchema } = require('../utils/validators');
const { sendResetToken } = require('../EmailService/sendResetToken');










// register a user
const registerUser = async (req,res)=>{
    try {
        console.log('got data');
        const user_id = v4();
        
        const { first_name, last_name, username, email,  password, profile_pic_url } = req.body;
        

        const pool = await mssql.connect(sqlConfig);

        if(pool.connected){
            const confirmEmailExists = await pool
            .request()
            .input('email', email)
            .execute('fetchUserByEmailProc')

            console.log('bellowfetch');

            if(confirmEmailExists.recordset.length > 0){
                return res.status(409).json({error: 'The email provided is already registered.'})
            }

            const salt = await bcrypt.genSalt(10)
            const hashedPwd = await bcrypt.hash(password, salt)

            const result =await pool
            .request()
            .input('user_id', user_id)
            .input('first_name', first_name)
            .input('last_name', last_name)
            .input('username', username)
            .input('email', email)
            .input('profile_pic_url', profile_pic_url)
            .input('password', hashedPwd)
            .execute('registerNewUserProc')

            return res.json({
                        message: "User registration was successful"
                    })
                }
        // if(result.rowsAffected==1){
        //     return res.json({
        //         message: "User registration was successful"
        //     })
        // }else{
        //     return res.json({message: "User registration failed"})
        // }
        

    } catch (error) {
        return res.json({Error:error.message})
    }
}


//login a user

// ********************  fix to use username to log in **************************

const login = async (req, res)=>{
    try {
        
        if(!req.body){
            return res.status(400).json({error: 'Request body is missing or empty.'})
        }
        
        const {credential, passcode} = req.body
        

        // const { error } = loginSchema.validate({credential, passcode})
        // if(error){
        //     return res.status(422).json({error: error.message})
        // }

        console.log(credential,passcode);

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;        
        let checkEmailQuery = null

        if(emailRegex.test(credential)){

            
            const pool = await mssql.connect(sqlConfig)
            checkEmailQuery = await pool
            .request()
            .input('email', credential)
            .execute('fetchUserByEmailProc')
        }else{
            const pool = await mssql.connect(sqlConfig)
            checkEmailQuery = await pool
            .request()
            .input('username', credential)
            .execute('fetchUserByUsernameProc')
            
        }

    
        if(checkEmailQuery.recordset.length <= 0){
            return res.status(404).json({error: 'Email is not registered'})
        }
    
        if(checkEmailQuery.recordset[0].is_deleted == 1){
            return res.status(403).json({error: 'Account is deactivated'})
        }
    
        const valid = await bcrypt.compare(passcode, checkEmailQuery.recordset[0].password)
        if(!valid){
            return res.status(401).json({error: 'Invalid login credentials'})
        }
    
        const token = jwt.sign({ email: checkEmailQuery.recordset[0].email, is_admin: checkEmailQuery.recordset[0].is_admin }, process.env.SECRET_KEY, {
            expiresIn: 60 * 60
        })

        
    
        const { is_verified, is_deleted ,password, ...user } = checkEmailQuery.recordset[0]
    
        return res.status(200).json({message: 'Login successful', token, user})
    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }
}








//forgot password

const forgotPassword = async(req, res)=>{
    try {
        
        const { email } = req.body
        const token = crypto.randomBytes(20).toString('hex')

        const pool = await mssql.connect(sqlConfig)
        const checkEmailQuery = await pool
        .request()
        .input('email', email)
        .execute('fetchUserByEmailProc')

        if(checkEmailQuery.recordset.length <= 0){
            return res.status(404).json({error: 'Email is not registered'})
        }
        
        await pool
        .request()
        .input('email', email)
        .input('password_reset_token', token)
        .execute('saveUserResetPasswordTokenProc')
        

        const sent = sendResetToken(email,token)
        console.log(sent);

        res.status(200).json({message: 'Password reset email sent'})
        

    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }
}


// verifytoken
const verifyToken = async(req, res)=>{
    try {
        const {token, email} = req.body

        const pool = await mssql.connect(sqlConfig)
        const checkEmailQuery = await pool
        .request()
        .input('email', email)
        .execute('fetchUserByEmailProc')

        if(checkEmailQuery.recordset.length <= 0){
            return res.status(404).json({error: 'Email is not registered'})
        }
        
        if(checkEmailQuery.recordset[0].password_reset_token == token ){
            return res.status(200).json({message: `Token is Valid`})
        }
        return res.status(400).json({error: 'Invalid token or token expired'})
    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }
}


//reset password
const resetPassword = async(req, res)=>{
    try {
        
        const { password, email } = req.body

        const pool = await mssql.connect(sqlConfig)
        const checkEmailQuery = await pool
        .request()
        .input('email', email)
        .execute('fetchUserByEmailProc')

        if(checkEmailQuery.recordset.length <= 0){
            return res.status(404).json({error: 'Email is not registered'})
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPwd = await bcrypt.hash(password, salt)

        await pool
        .request()
        .input('password', hashedPwd)
        .input('email', email)
        .execute('resetPasswordProc')

        return res.status(200).json({message: 'Password reset successful'})
    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }
}








module.exports = {
    registerUser,
    login,
    forgotPassword,
    verifyToken,
    resetPassword
}



