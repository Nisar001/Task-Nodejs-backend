import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/ConnectDB.js'
import cors from 'cors'
import authRoutes from './routes/UserRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api/v1/auth", authRoutes)

const PORT = process.env.PORT;

app.listen(PORT, () => {
   console.log(`Server running on ${process.env.DEV_MODE} made on port ${PORT}`);
})