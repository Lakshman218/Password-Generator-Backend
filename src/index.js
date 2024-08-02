import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import session from "express-session";
import userRoutes from "./routes/route.js"

dotenv.config()
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const sessionSecret = process.env.SESSION_SECRET || "default_secret_key";

app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.use(cors({
  origin: true,
  methods: "GET,HEAD,POST,DELETE",
  credentials: true,
}))
app.use('/api/', userRoutes)

mongoose.connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("Connected to mongoDB");
  })
  .catch(error => {
    console.log('MongoDB connection error:', error);
  })

const port = process.env.PORT

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
})
