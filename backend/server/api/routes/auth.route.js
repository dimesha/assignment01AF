/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */
import  express  from "express";
import { signin, signup } from "../controllers/auth.controller.js";

const  router = express.Router();


router.post('/signup', signup);
router.post('/signin', signin);

export default router;