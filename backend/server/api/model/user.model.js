/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,

    },
    email: {
        type: String,
        required: true,
        unique: true,

    },
    password: {
        type: String,
        required: true,
    },
},{timestamps:true}
);

const User = mongoose.model('User', userSchema);

export default User;