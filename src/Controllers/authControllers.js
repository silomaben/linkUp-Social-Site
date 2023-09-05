const {v4} = require('uuid');
const bcrypt = require('bcrypt')
const mssql = require ('mssql');
const { sqlConfig } = require('../Config/config');


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



module.exports = {
    registerUser
}
