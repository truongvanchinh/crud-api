import express from 'express';
import dotenv from 'dotenv';  
dotenv.config();
import userRoutes from './routes/user.routes.ts';
import { connectDB } from './config/db.ts';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})

