import prisma from '../db.config.js';


export const createUser = async (req, res) => {
    const { name, email ,password} = req.body;
    try {
        const finduser = await prisma.User.findUnique({
            where:{
                
                email
            }
        })
        if(finduser){return res.json({status:400,message:"Email already exists"})}

        const newUser = await prisma.User.create({
            data:{
                name:name,
                email:email,
                password:password
            }
        })
        return res.json({status:200,data:newUser ,message:"User created successfully"}) ;

    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Internal server error"})
    }
}

export const updateUser = async (req,res)=>{
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
    return res.status(200).json({message:"User updated" , data:updated})
}


export const getUsers = async (req, res) =>{
    const users = await prisma.user.findMany({
        select:{
            _count:{
                select:{
                    post:true,
                    comment:true
                }
            }
        }
        
    });

    return res.status(200).json({message:"All user",data:users})
}
export const deleteUsers = async (req, res) =>{
    const userId=req.params.id;
    const users = await prisma.User.delete({
        where:{
            id:Number(userId)
        }
    });

    return res.status(200).json({message:"User Deleted"})
}