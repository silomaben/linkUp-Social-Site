const mssql = require('mssql')
const { createNewPost, createComment, createSubcomment, editPost, deletePost, likeComment, unlikeComment, likeSubcomment, likePost, unlikePost } = require('../../src/Controllers/postsController')


const Filter = require('bad-words');
const filter = new Filter();

const res = {json: jest.fn()}



describe('posts tests',()=>{
    it('should create post and return success message', async ()=>{
            const req = {
                body: {
                    user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                    image: "https://cdn.pixabay.com/photo/2023/08/20/20/03/planes-8203121_1280.jpg",
                    body: "no pets! but dogs alowed",
                    tagged: ""
                }
            }

            

            const filterMock = jest.spyOn(filter, "isProfane").mockReturnValue(false);

            const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                connected: true,
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: 1
                })
            })
 
            await createNewPost(req,res)

            // expect(res.status).toHaveBeenCalledWith(200)

            expect(res.json).toHaveBeenCalledWith({
                message: "Posted successfully"
            })

            //reset mocks
            res.json.mockRestore()
            

    })


    it('should return a profanity error message when creating a post with profanity', async () => {
        const req = {
            body: {
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                image: "https://cdn.pixabay.com/photo/2023/08/20/20/03/planes-8203121_1280.jpg",
                body: "bitch stfu",
                tagged: ""
            }
        };
    
        
        const filterMock = jest.spyOn(filter, "isProfane").mockReturnValue(true);
    
        await createNewPost(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "Posting failed due to profanity"
        });
    
        // Restore the mocks
        filterMock.mockRestore();
        res.json.mockRestore(); 
    });

    it('should edit post and return success message', async ()=>{
        const req = {
            body: {
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                post_id: "5c7f8faa-a07e-44da-9094-ea075a391ac9",
                body: "no pets but dogs allowed",
                tagged: ""
            }
        }

        const filterMock = jest.spyOn(filter, "isProfane").mockReturnValue(true);
        const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        })

        await editPost(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "Post updated successfully"
        });
    
        filterMock.mockRestore();
        res.json.mockRestore(); 
    })


    it('should return error message for editting another persons post', async ()=>{
        
    })
    
    it('should delete post and return success message', async ()=>{
        const req = {
            params: { id: "5c7f8faa-a07e-44da-9094-ea075a391ac9" }, 
            body: {
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4"
            }
        }

        
        const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        })
        
        await deletePost(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "Post deleted successfully"
        });
    
        res.json.mockRestore(); 
    })

    it('should return error message for deleting another persons post', async ()=>{

    })

    it('should fetch and return posts', async ()=>{

    })

    it('should fetch and return singlepost with its comments and subcomments', async ()=>{
        const req = {
            params: { id: "5c7f8faa-a07e-44da-9094-ea075a391ac9" }, 
        }

         
    })

    it('should like a post successfully', async ()=>{
        const req = {
            body: {
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                comment_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4"
            }
        }

        
        const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        })
        
        await likeComment(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "comment was liked"
        });

        res.json.mockRestore(); 
    })

    it('should unlike a post successfully', async ()=>{
        const req = {
            body: {
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                comment_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4"
            }
        }

        
        const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        })
        
        await unlikePost(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "unliked"
        });

        res.json.mockRestore();
    })
    
})


describe('comments tests',()=>{
    it('should create comment and return success message', async ()=>{
        const req = {
            body: {
                post_id: "90af0c8b-7ee7-48a8-a494-927c82598db3",
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                body: "Sunday test 1 indeed"
            }
        }

        

        const filterMock = jest.spyOn(filter, "isProfane").mockReturnValue(false);

        const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        })

        await createComment(req,res)

        

        expect(res.json).toHaveBeenCalledWith({
            message: "comment added"
        })

        res.json.mockRestore()
        

    })  

    it('should edit comment and return success message', async ()=>{

    })
    it('should return error message for editting another persons comment', async ()=>{

    })
    
    it('should delete comment and return success message', async ()=>{

    })

    it('should return error message for deleting another persons comment', async ()=>{

    })

    it('should like a comment successfully', async ()=>{
        const req = {
            body: {
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                comment_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4"
            }
        }

        
        const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        })
        
        await likeComment(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "comment was liked"
        });
    
    
        res.json.mockRestore();
    
    })
    
    it('should unlike a comment successfully', async ()=>{
        const req = {
            body: {
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                comment_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4"
            }
        }

        
        const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        })
        
        await unlikeComment(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "unliked comment"
        });

        res.json.mockRestore();
    
    })

})

describe('subcomments tests',()=>{

    it('should create subcomment and return success message', async ()=>{
        const req = {
            body: {
                comment_id: "1",
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                body: "subcoment sunday init"
            }
        }

        

        const filterMock = jest.spyOn(filter, "isProfane").mockReturnValue(false);

        const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        })

        await createSubcomment(req,res)

        // expect(res.status).toHaveBeenCalledWith(200)

        expect(res.json).toHaveBeenCalledWith({
            message: "subcomment added"
        })

        res.json.mockRestore()
    })  

    it('should return a profanity error message when creating a subcomment with profanity', async () => {
        const req = {
            body: {
                comment_id: "2",
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                body: "fuck school"
            }
        };
    
        
        const filterMock = jest.spyOn(filter, "isProfane").mockReturnValue(true);
    
        await createNewPost(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "Posting failed due to profanity"
        });
    
        filterMock.mockRestore();
        res.json.mockRestore(); 
    });

    it('should edit subcomment and return success message', async ()=>{

    })
    
    it('should return error message for editting another persons subcomment', async ()=>{

    })
    
    it('should delete subcomment and return success message', async ()=>{

    })

    it('should return error message for deleting another persons subcomment', async ()=>{

    })

    it('should like a subcomment successfully', async ()=>{
        const req = {
            body: {
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                subcomment_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4"
            }
        }

        
        const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        })
        
        await likeSubcomment(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "subcomment was liked"
        });
    
        res.json.mockRestore();
   
    })
    
    it('should unlike a subcomment successfully', async ()=>{
        const req = {
            body: {
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                subcomment_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4"
            }
        }

        
        const pool = jest.spyOn(mssql, "connect").mockResolvedValueOnce({
            connected: true,
            request: jest.fn().mockReturnThis(),
            input: jest.fn().mockReturnThis(),
            execute: jest.fn().mockResolvedValueOnce({
                rowsAffected: 1
            })
        })
        
        await likeSubcomment(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "subcomment was liked"
        });
    
        
        res.json.mockRestore();
    })
   
})