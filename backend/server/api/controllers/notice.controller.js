import Notice from '../model/notice.model.js';
import { errorHandler } from '../utils/error.js';
import Notification from '../model/notification.model.js';

// Route to Create Notice
export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You Are Not Allowed to Create a Notice.'));
  }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(400, 'Please Provide All Required Fields.'));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '');
  const newNotice = new Notice({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedNotice = await newNotice.save();

    // Create a Notification For the New Annuncement Entry
    const notification = new Notification({
      notificationTitle: 'New Notice Published!',
      notificationBody: `A New Notice Has Been Added.`
    });
    const savedNotification = await notification.save();
    res.status(201).json(savedNotice);
  } catch (error) {
    next(error);
  }
};

// Route to Get All Notice
export const getNotices = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.order === 'asc' ? 1 : -1;
    
    const Notices = await Notice.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.category && { category: req.query.category }),
      ...(req.query.slug && { slug: req.query.slug }),
      ...(req.query.noticeId && { _id: req.query.noticeId }),
      ...(req.query.searchTerm && {
        $or: [
          { title: { $regex: req.query.searchTerm, $options: 'i' } },
          { content: { $regex: req.query.searchTerm, $options: 'i' } },
        ],
      }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);

    const totalNotices = await Notice.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );
    const lastMonthNotices = await Notice.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });
    res.status(200).json({
      Notices,
      totalNotices,
      lastMonthNotices,
    });
  } catch (error) {
    next(error);
  }
};

// Route to Delete Notice
export const deleteNotice = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You Are Not Allowed to Delete This Notice.'));
  }
  try {
    await Notice.findByIdAndDelete(req.params.noticeId);
    res.status(200).json('The Notice Has Been Deleted');
  } catch (error) {
    next(error);
  }
};

// Route to Update Notice
export const updateNotice = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You Are Not Allowed to Update This Notice.'));
  }
  try {
    const updatedNotice = await Notice.findByIdAndUpdate(
      req.params.noticeId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
          image: req.body.image,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedNotice);
  } catch (error) {
    next(error);
  }
};