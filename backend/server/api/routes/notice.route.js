import express from 'express';
import { verifyToken } from '../utils/verifyUser.js';
import { create, deleteNotice, getNotices, updateNotice} from '../controllers/notice.controller.js';

const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getnotices', getNotices)
router.delete('/deletenotice/:noticeId/:userId', verifyToken, deleteNotice)
router.put('/updatenotice/:noticeId/:userId', verifyToken, updateNotice)

export default router;