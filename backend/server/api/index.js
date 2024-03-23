/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/user.route.js';
import authRoute  from './routes/auth.route.js';
import timetableRoute from './routes/timetable.route.js';
import notificationRoute from './routes/notification.route.js';
import courseRoute from './routes/course.route.js';
import cookieParser from 'cookie-parser';


dotenv.config();
mongoose.connect(
   process.env.MONGO
)
.then(() =>{
    console.log("MongoDB is connected");

})
.catch((err) => {
    console.log(err);

});
const app = express();
app.use(express.json());
app.use(cookieParser());
app.listen(3000, () =>{
    console.log("Server is running on port 3000!!")
});
app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/timetable', timetableRoute);
app.use('/api/course', courseRoute);
app.use('/api/notification', notificationRoute);


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Ooops,internal server error!!...';
    res.status(statusCode).json({
        success : false,
        statusCode,
        message
    });
});