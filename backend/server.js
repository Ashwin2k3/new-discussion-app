import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/index.js';
import authRouter from "./routes/auth.js";
import messageRouter from "./routes/messages.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

const corsOtions = {
  origin : "http://localhost:5173",
  method : ["GET", "POST", "PUT", "DELETE"],
}

app.use(cors(corsOtions));
app.use(express.json());
routes(app);

const server = http.createServer(app);
const io = new Server(server);

app.set('socketio', io);

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


// routes

app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter)

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});