const { sqlConfig } = require("../Config/config");
const mssql = require ('mssql');
const bcrypt = require('bcrypt')

// upload/edit user info(including user name....handle errors well to know if usernames have been taken or not)
const updateUserInformation = async (req,res)=>{
    try {
        const { user_id ,first_name, last_name,  profile_pic_url,bio,linkedin_url,facebook_url,website_url,instagram_url,twitter_url} = req.body;
        
        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .input('first_name',mssql.VarChar, first_name)
            .input('last_name',mssql.VarChar, last_name)
            .input('profile_pic_url',mssql.VarChar, profile_pic_url)
            .input('bio',mssql.VarChar, bio)
            .input('linkedin_url',mssql.VarChar, linkedin_url)
            .input('facebook_url',mssql.VarChar, facebook_url)
            .input('website_url',mssql.VarChar, website_url)
            .input('instagram_url',mssql.VarChar, instagram_url)
            .input('twitter_url',mssql.VarChar, twitter_url)
            .execute('updateUserInformationProc')  
        }
        
        return res.json({message: "User info updated successfully"})
    } catch ( error ) {
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
            return res.status(401).json({error: 'Invalid deactivate credentials'})
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
            return res.status(404).json({error: 'User not found'})
        }

        if(checkUserQuery.recordset[0].is_disabled ==0){
            return res.status(400).json({error: 'User is already active'})
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
            return res.status(200).json({message: 'User activated successfully'})
        }else{
            return res.json({message: "Customer activation failed"})
        }


    } catch (error) {
        return res.status(500).json({error: `Internal server error: ${error.message}`})
    }

}




// keep email private
const hideEmail = async (req,res)=>{
    try {
        const { user_id } = req.params.id;
        
        const pool = await mssql.connect(sqlConfig)

        if(pool.connected){
            const result = await pool.request()
            .input('user_id',mssql.VarChar, user_id)
            .execute('hideUserEmailProc')  
        }
        
        return res.json({message: "Email has been hidden"})
    } catch ( error ) {
        return res.json({Error:error.message})
    }
}

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
//  done                // send the viewed and viewer id to establish follow relationship.
//  frontend not yet    // Frontend logged out users will alway get not followed.
//  frontend not yet    // Have a modal pop up in frontend to request register or login if user tries following when not logged in yet. 


  
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
    viewUser,
    hideEmail,
    updateUserInformation,
    deactivateUserAccount,
    activateUserAccount
}