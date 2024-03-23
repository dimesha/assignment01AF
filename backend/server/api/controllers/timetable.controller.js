/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */
import TimeTable from '../model/timetable.model.js';
import Notification from '../model/notification.model.js';
import { errorHandler } from '../utils/error.js';


// API fro adding new Time Table 
export const create = async (req, res, next) => {
    // if (!req.user.isAdmin) {
    //     return next(errorHandler(403, 'You Are Not Allowed to Create a Time Table.'));
    // }
    try {
        const { classSession, course, day: dateString, startTime, endTime, faculty, location } = req.body;
        const day = new Date(dateString);
  
        // Check if there are sessions at the same time with the same location
        const existingSessionsSameLocation = await TimeTable.findOne({
            day,
            location,
            $or: [
                {
                    $and: [
                        { startTime: { $lte: startTime } },
                        { endTime: { $gt: startTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $lt: endTime } },
                        { endTime: { $gte: endTime } }
                    ]
                },
                {
                    $and: [
                        { startTime: { $gte: startTime } },
                        { endTime: { $lte: endTime } }
                    ]
                }
            ]
        });
  
        if (existingSessionsSameLocation) {
            return next(errorHandler(400, 'A session at the same time with the same location already exists.'));
        }
  
        // Check if there are sessions at the same time with different locations
        const existingSessionsDifferentLocation = await TimeTable.findOne({
            day,
            $or: [
                {
                    location: { $ne: location },
                    $or: [
                        {
                            $and: [
                                { startTime: { $lte: startTime } },
                                { endTime: { $gt: startTime } }
                            ]
                        },
                        {
                            $and: [
                                { startTime: { $lt: endTime } },
                                { endTime: { $gte: endTime } }
                            ]
                        },
                        {
                            $and: [
                                { startTime: { $gte: startTime } },
                                { endTime: { $lte: endTime } }
                            ]
                        }
                    ]
                }
            ]
        });
  
        if (existingSessionsDifferentLocation) {
            console.warn('Sorry, A session at the same time with a different location already exists.');
        }
  
        const newTimetable = new TimeTable({ classSession, course, day, startTime, endTime, faculty, location });
        const savedTimetable = await newTimetable.save();
  
        // Create a Notification for the New Time Table Added
        const notification = new Notification({
            notificationTitle: 'New Timetable Added Successfully!!...',
            notificationBody: 'A New Timetable Has Been Added!!...'
        });
        const savedNotification = await notification.save();
  
        res.status(201).json(savedTimetable);
    } catch (error) {
        next(error);
    }
  };
  