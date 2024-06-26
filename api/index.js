import experss from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import adminRoutes from './routes/admin.route.js';
import authRoutes from './routes/auth.route.js';
dotenv.config()
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB")
  })
  .catch((err) => {
    console.log(err)
  })

const app = experss()
app.use(experss.json())
app.use(cookieParser());

app.listen(3000, () => {
    console.log("Server running on prot 3000")
})

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode,
    });
  });
  
