import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import postRoute from './routes/postRoutes.js';
import commentRoute from './routes/commentRoute.js';

dotenv.config();

const app = express(); 
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const PORT = 3000;


app.use('/api/user',userRoute);
app.use('/api/post',postRoute);
app.use('/api/comment', commentRoute)


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})

app.get("/",(req,res)=>{
    res.send("Hello from the Prisma server");
})