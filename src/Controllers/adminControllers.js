const mssql = require ('mssql');
const { sqlConfig } = require('../Config/config');
const bcrypt = require('bcrypt')



// barn user (for admin)

const barnUser = async(req, res)=>{
    try {
        const {admin_id,admin_password,user_id} = req.body
        
        const pool = await mssql.connect(sqlConfig)
        const checkAdminEmailQuery = await pool
        .request()
        .input('user_id', admin_id)
        .execute('fetchUserByIdProc')

        if(checkAdminEmailQuery.recordset.length <= 0){
            return res.status(404).json({error: "The admin_id provided was not found"})
        }

        if(checkAdminEmailQuery.recordset[0].is_admin == 0){
            return res.status(400).json({error: 'Only admins can bar users'})
        }

        const valid = await bcrypt.compare(admin_password, checkAdminEmailQuery.recordset[0].password)
        if(!valid){
            return res.status(401).json({error: 'Invalid credentials'})
        }


        const checkUserEmailQuery = await pool
        .request()
        .input('user_id', user_id)
        .execute('fetchUserByIdProc')

        if(checkUserEmailQuery.recordset.length <= 0){
            return res.status(404).json({error: "User not found"})
        }

        if(checkUserEmailQuery.recordset[0].is_deleted ==1){
            return res.status(400).json({error: 'User is already banned'})
        }

        const result = await pool
        .request()
        .input('user_id', user_id)
        .execute('barnUserAccountProc')

        console.log(result);

        if(result.rowsAffected==1){
            return res.status(200).json({message: 'User banned successfully'})
        }else{
            return res.json({message: "Admin cannot be banned"})
        }

    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }
}





// unbarn user (for admin)
const unbarnUser = async(req, res)=>{
    try {
        const {admin_id,admin_password,user_id} = req.body
        
        const pool = await mssql.connect(sqlConfig)
        const checkAdminEmailQuery = await pool
        .request()
        .input('user_id', admin_id)
        .execute('fetchUserByIdProc')

        if(checkAdminEmailQuery.recordset.length <= 0){
            return res.status(404).json({error: "The admin_id provided was not found"})
        }

        if(checkAdminEmailQuery.recordset[0].is_admin == 0){
            return res.status(400).json({error: 'Only admins can bar users'})
        }

        const valid = await bcrypt.compare(admin_password, checkAdminEmailQuery.recordset[0].password)
        if(!valid){
            return res.status(401).json({error: 'Invalid credentials'})
        }


        const checkUserEmailQuery = await pool
        .request()
        .input('user_id', user_id)
        .execute('fetchUserByIdProc')

        if(checkUserEmailQuery.recordset.length <= 0){
            return res.status(404).json({error: "User not found"})
        }

        if(checkUserEmailQuery.recordset[0].is_deleted == 0){
            return res.status(400).json({error: 'User is not banned'})
        }

        const result = await pool
        .request()
        .input('user_id', user_id)
        .execute('unbarnUserAccountProc')

        console.log(result);

        if(result.rowsAffected==1){
            return res.status(200).json({message: 'User unbanned successfully'})
        }

    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }
}


module.exports = {
    barnUser,
    unbarnUser
}