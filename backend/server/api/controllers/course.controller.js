/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */
import Course from '../model/course.model.js';
import { errorHandler } from '../utils/error.js';

//API for Create a new Course
export const create = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'You Are Not Allowed to Create a Course.'));
    }
    if (!req.body.courseCode || !req.body.courseName) {
      return next(errorHandler(400, 'Please Provide All Required Fields!!...'));
    }
    const slug = req.body.courseCode
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
    const newCourse = new Course({
    ...req.body,
    slug,
    userId: req.user.id,
  });
    try {
      const savedCourse = await newCourse.save();
      res.status(201).json(savedCourse);
    } catch (error) {
      next(error);
    }
  };
  
