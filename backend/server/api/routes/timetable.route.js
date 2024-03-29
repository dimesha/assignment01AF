/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */
import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, update, remove, getAll, getById, getByWeek } from '../controllers/timetable.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.put('/updatetimetable/:id', verifyToken, update)
router.delete('/deletetimetable/:id', remove);
router.get('/gettimetables', verifyToken, getAll)
router.get('/gettimetable/:id', verifyToken, getById)
router.get('/getweektimetables', verifyToken, getByWeek)

export default router;