/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, updatecourse} from '../controllers/course.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.put('/updatecourse/:courseId/:userId', verifyToken, updatecourse)

export default router;
