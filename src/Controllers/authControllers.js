const {v4} = require('uuid');
const bcrypt = require('bcrypt')
const mssql = require ('mssql');
const jwt = require('jsonwebtoken')
const { sqlConfig } = require('../Config/config');
const { loginSchema } = require('../utils/validators');

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


// disable user (for user to disable themselves)
const deactivateUserAccount = async(req, res)=>{
    try {

        const {user_id,password} = req.body
        

        const pool = await mssql.connect(sqlConfig)
        const checkEmailQuery = await pool
        .request()
        .input('user_id', user_id)
        .execute('fetchUserByIdProc')

        if(checkEmailQuery.recordset.length <= 0){
            return res.status(404).json({error: "Customer account not found"})
        }

        if(checkEmailQuery.recordset[0].is_disabled ==1){
            return res.status(400).json({error: 'Customer account is already deactivated'})
        }

        const valid = await bcrypt.compare(password, checkEmailQuery.recordset[0].password)
        if(!valid){
            return res.status(401).json({error: 'Invalid login credentials'})
        }

        const result = await pool
        .request()
        .input('user_id', user_id)
        .execute('deactivateUserAccountProc')

        console.log(result);

        if(result.rowsAffected==1){
            return res.status(200).json({message: 'User deactivated successfully'})
        }else{
            return res.json({message: "Admin cannot be disabled"})
        }

    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }
}


//reactivate user account
const activateUserAccount = async(req, res)=>{
    try {        
        const {email, password} = req.body
        console.log(email,password);

        const pool = await mssql.connect(sqlConfig)

        const checkUserQuery = await pool
        .request()
        .input('email', email)
        .execute('fetchUserByEmailProc')

        if(checkUserQuery.recordset.length <= 0){
            return res.status(404).json({error: 'Customer account not found'})
        }

        if(checkUserQuery.recordset[0].is_disabled ==0){
            return res.status(400).json({error: 'Customer account is already active'})
        }
        
        const valid = await bcrypt.compare(password, checkUserQuery.recordset[0].password)

        if(!valid){
            res.status(401).json({error: 'Invalid password'})
        }


        const result = await pool
        .request()
        .input('email', email)
        .execute('activateDisabledUserProc')

        if(result.rowsAffected==1){
            return res.status(200).json({message: 'Account activated successfully'})
        }else{
            return res.json({message: "Customer activation failed"})
        }


    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }

}



//login a user

const login = async (req, res)=>{
    try {
        
        if(!req.body){
            return res.status(400).json({error: 'Request body is missing or empty.'})
        }
        
        const {credential, passcode} = req.body
        console.log(credential,passcode);

        // const { error } = loginSchema.validate({credential, passcode})
        // if(error){
        //     return res.status(422).json({error: error.message})
        // }

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
            expiresIn: 24 * 60 * 60
        })
    
        const { is_verified, is_deleted ,password, ...user } = checkEmailQuery.recordset[0]
    
        return res.status(200).json({message: 'Login successful', token, user})
    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }
}



//deactivate user

//reactivate user 


//forgot password


// verifytoken


//reset password








module.exports = {
    registerUser,
    login,
    activateUserAccount,
    deactivateUserAccount
}

