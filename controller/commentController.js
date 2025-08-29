import prisma from '../db.config.js';


export const createComment = async (req, res) => {
    const { user_id, post_id ,comment} = req.body;
    //increase comment counter
    
    try {

        const newComment =await prisma.comments.create({
            data:{
                user_id:user_id,
                post_id:post_id,
                comment:comment
            }
        })
        await prisma.Post.update({
        where:{
            id:Number(post_id)
        },
        data:{
            comment_count:{
                increment:1
            }
        }
    })
        return res.json({status:200,data:newComment ,message:"Comment created successfully"}) ;

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const updateComment = async (req,res)=>{
    const userId = req.params.id;
    const { name, email, password} = req.body;

    const updated=await prisma.User.update({
        where:{
            id:Number(userId)
        },
        data:{
            name,
            email,
            password
        }
    })
    return res.status(200).json({message:"Comment updated" , data:updated})
}
export const getComment = async (req, res) =>{
    const {commentId}=req.params.id;
    const users =await prisma.comments.findUnique({
        where:{
            id:Number(commentId)
        }
    });

    return res.status(200).json({message:"Comment user",data:users})
}

export const getComments = async (req, res) =>{
    const users =await prisma.comments.findMany({
        include:{
            user:true
        }
    });

    return res.status(200).json({message:"All user",data:users})
}
export const deleteComment = async (req, res) =>{
     const {commentId , post_id}=req.body;
     await prisma.Post.update({
        where:{
            id:Number(post_id)
        },
        data:{
            comment_count:{
                increment:1
            }
        }
    })
    await prisma.comments.delete({
        where:{
            id:Number(commentId)
        }
    });

    return res.status(200).json({message:"Comment Deleted"})
}