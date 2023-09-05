const mssql = require('mssql')
const { createNewPost } = require('../../src/Controllers/postsController')


const Filter = require('bad-words');
const filter = new Filter();

const res = {json: jest.fn()}



describe('create a post',()=>{


    it('should return a success message after posting successfully', async ()=>{
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
            res.json.mockRestore()
            

    })


    it('should return a profanity error message', async () => {
        const req = {
            body: {
                user_id: "be6feb2f-4195-40b3-8d65-39403d5f37e4",
                image: "https://cdn.pixabay.com/photo/2023/08/20/20/03/planes-8203121_1280.jpg",
                body: "bitch stfu",
                tagged: ""
            }
        };
    
        // Mock the filter.isProfane function to return true
        const filterMock = jest.spyOn(filter, "isProfane").mockReturnValue(true);
    
        await createNewPost(req, res);
    
        expect(res.json).toHaveBeenCalledWith({
            message: "Posting failed due to profanity"
        });
    
        // Restore the mocks
        filterMock.mockRestore();
        res.json.mockRestore(); // Reset the response object
    });
    
})