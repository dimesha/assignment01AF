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
    profilePicture: {
        type: String,
        default:'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.zilvitismazeikiai.lt%2FAvatar-icon-Human-A-person-s-badge-Vector-Social-media-746807.html&psig=AOvVaw2dWBNrrPaK42LzicTyw8Bo&ust=1711233622082000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIDGw5X4iIUDFQAAAAAdAAAAABAE',
      },
      isAdmin: {
        type: Boolean,
        default: false,
      },
      role: { 
        type: String, 
        default: false 
      },
      enrolledCourses: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'courses' 
      }]
},{timestamps:true}
);

const User = mongoose.model('User', userSchema);

export default User;