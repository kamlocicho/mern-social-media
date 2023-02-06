import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from './routes/auth.js'
import postRoutes from './routes/post.js'

// CONFIGURATIONS
dotenv.config();
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({allowedHeaders: '*', origin: 'http://127.0.0.1:5173'}));

// ROUTES WITH FILES
app.get('/', (req, res) => {
    res.status(200).json({success: true})
})

app.use('/auth', authRoutes);
app.use('/post', postRoutes);

// MONGOOSE SETUP
const PORT = process.env.PORT || 6001;

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URI)
.then(() => app.listen(PORT, () => {
    console.log(`Application running on port: ${PORT}`);
}))
.catch(err => console.log(err))