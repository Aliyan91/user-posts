import prisma from "../db.config.js";

export const createPost = async (req, res) => {
  const { user_id, title, description } = req.body;
  try {
    const newPost = await prisma.Post.create({
      data: {
        user_id: Number(user_id),
        title: title,
        description: description,
      },
    });
    return res.json({
      status: 200,
      data: newPost,
      message: "Post created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { title, description } = req.body;

  const updated = await prisma.Post.update({
    where: {
      id: Number(userId),
    },
    data: {
      title,
      description,
    },
  });
  return res.status(200).json({ message: "User updated", data: updated });
};

export const getPosts = async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  if(page <= 0){
    page=1
  }
  if(limit <= 0 || limit > 100){
    limit = 10;
  }
  try {
    const userId = req.query.user_id; // or req.params.user_id if using route params

    let posts;
    const skip = (page-1)*limit;
    if (userId) {
      posts = await prisma.Post.findMany({
        skip:skip,
        take:limit,
        include: {
          comment: true,
        },
        where: {
          user_id: Number(userId),
        },
      });
    } else {
      posts = await prisma.Post.findMany({
        skip:skip,
        take:limit,
        include: {
          comment: {
            include: {
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          id: "desc",
        },
        
      });
    }
    //to get total post count
    const totalPosts =await prisma.Post.count()
    const totalPages = Math.ceil(totalPosts/limit)
    return res.json({ status: 200, data: posts,meta:{
      totalPages,
      currentPage:page,
      limit:limit
    } });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};
export const getPostById = async (req, res) => {
  try {
    const postId = req.params.id;

    const post = await prisma.Post.findUnique({
      where: {
        id: Number(postId),
      },
    });

    if (!post) {
      return res.status(404).json({ status: 404, message: "Post not found" });
    }

    return res.status(200).json({ status: 200, data: post });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const post = await prisma.post.delete({
    where: {
      id: Number(postId),
    },
  });

  return res.status(200).json({ message: "Post Deleted" });
};


// to searh post
export const seearchPost = async(req,res)=>{
  const query= req.query.q;
  console.log(query)
  const posts = await prisma.post.findMany({
    where:{
      description:{
        search:query
      }
    }
  })
  console.lof
  return res.status(200).json({posts})
}