const { sqlConfig } = require("../Config/config");
const mssql = require ('mssql');

const followUser = async (req,res)=>{
    try {
        const { follower_id, followed_id } = req.body;
        
        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('follower_id',mssql.VarChar, follower_id)
            .input('followed_id', mssql.VarChar,followed_id)
            .execute('followUserProc')

            if(result.rowsAffected==1){
                return res.json({message: "User followed successfully"})
            }else{
                return res.json({message: "Following user failed"})
            }

        }
        
    } catch ( error ) {
        return res.json({Error:error.message})
    }
}
const unfollowUser = async (req,res)=>{
    try {
        const { unfollower_id, unfollowed_id } = req.body;
        
        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('unfollower_id',mssql.VarChar, unfollower_id)
            .input('unfollowed_id', mssql.VarChar,unfollowed_id)
            .execute('unfollowUserProc')

            if(result.rowsAffected==1){
                return res.json({message: "User unfollowed successfully"})
            }else{
                return res.json({message: "Unollowing user failed"})
            }

        }
        
    } catch ( error ) {
        return res.json({Error:error.message})
    }
}




// view user profile.
//************************** */
//     // send the viewed and viewer id to establish follow relationship.
//     // Frontend logged out users will alway get not followed.
//     // Have a modal pop up in frontend to request register or login if user tries following when not logged in yet. 


  
const viewUser = async (req,res)=>{
    try {
        const { me, them } = req.body;
        
        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('me',mssql.VarChar, me)
            .input('them', mssql.VarChar,them)
            .execute('viewUserProc')

        console.log(result);
        return res.json({message: result.recordset})
         
        }
        
    } catch ( error ) {
        return res.json({Error:error.message})
    }
}







module.exports = {
    unfollowUser,
    followUser,
    viewUser
}