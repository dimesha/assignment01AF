/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
    },
    courseCode: {
      type: String,
      required: true,
      unique: true,
    },
    courseDescription: {
        type: String,
        required: true,
      },
    courseCredit: {
      type: String,
    },
    enrolledStudents: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    enrolledfaculty: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User' 
    }],
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
{ timestamps: true }
);

const Course = mongoose.model('Course', courseSchema);

export default Course;