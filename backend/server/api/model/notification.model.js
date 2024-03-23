/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */
import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
    {
    notificationTitle: { 
        type: String, 
        require: true 
    },
    notificationBody: { 
        type: String 
    }
}, 
{ timestamps: true }
);

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;