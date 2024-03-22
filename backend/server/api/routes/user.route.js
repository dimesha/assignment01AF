/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */
import  express  from "express";
import { test } from "../controllers/user.controller.js";


const router = express.Router();

router.get('/test', test);




export default router;