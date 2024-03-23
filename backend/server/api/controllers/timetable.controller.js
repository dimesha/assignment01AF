/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */
import TimeTable from '../model/timetable.model.js';
import Notification from '../model/notification.model.js';
import { errorHandler } from '../utils/error.js';


// API for adding new Time Table 
export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
        return next(errorHandler(403, 'You Are Not Allowed to Create a Time Table.'));
    }
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

// API for Update Time Table
export const update = async (req, res, next) => {
    try {
      const { classSession, course, day, startTime, endTime, faculty, location } = req.body;
      const timetableId = req.params.id;
      const timetable = await TimeTable.findById(timetableId);
      
      if (!timetable) {
        return next(errorHandler(404, 'Sorry,Time Table Not Found!!...'));
      }
  
      // Convert start and end times to Date objects
      const startDateTime = new Date(`${day}T${startTime}`);
      const endDateTime = new Date(`${day}T${endTime}`);
  
      // Check if there are sessions at the same time and location (excluding the current session)
      const existingSessionsSameTimeAndLocation = await TimeTable.find({
        day,
        startTime,
        endTime,
        location,
        _id: { $ne: timetableId }
      });
  
      // If there are sessions with the same time and location, return an error
      if (existingSessionsSameTimeAndLocation.length > 0) {
        return next(errorHandler(400, 'Sorry,Cannot update: Session at the same time and location already exists!!...'));
      }
  
      // Update the timetable fields
      timetable.classSession = classSession;
      timetable.course = course;
      timetable.day = day;
      timetable.startTime = startTime;
      timetable.endTime = endTime;
      timetable.faculty = faculty;
      timetable.location = location;
      
      const updatedTimetable = await timetable.save();
  
      // Create a Notification For the Updated the Time Table
      const notification = new Notification({
        notificationTitle: 'Successfully,Timetable Updated!!...',
        notificationBody: `A New Time Table Has Been Updated!!...`
      });
      const savedNotification = await notification.save();
  
      res.status(200).json(updatedTimetable);
    } catch (error) {
      next(error);
    }
  };

  // API for Delete the Time Table
export const remove = async (req, res, next) => {
    try {
      const timetableId = req.params.id;
      const timetable = await TimeTable.findById(timetableId);
      if (!timetable) {
          return next(errorHandler(404, 'Sorry,Timetable Not Found!!...'));
      }
      await TimeTable.deleteOne({ _id: timetableId });
      res.status(200).json({ success: true, message: 'Timetable Deleted Successfully!!...' });
    } catch (error) {
      next(error);
    }
  };

  // API to Get All the Time Tables
export const getAll = async (req, res, next) => {
    try {
      const timetables = await TimeTable.find();
      res.status(200).json(timetables);
    } catch (error) {
      next(error);
    }
  };
  
  