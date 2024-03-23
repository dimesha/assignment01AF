import Notification from '../model/notification.model.js';
import { errorHandler } from '../utils/error.js';

//API for Create a Notification
export const createNotification = async (req, res, next) => {
    try {
        const { notificationTitle, notificationBody } = req.body;
        const newNotification = new Notification({notificationTitle,notificationBody});
        const savedNotification = await newNotification.save();
        res.status(201).json(savedNotification);
    } catch (error) {
        next(error);
    }
};

//API for Get All Notification list
export const getAllNotification = async (req, res) => {
  try {
      const notifications = await Notification.find();
      res.json(notifications);
  } catch (error) {
      res.status(500).json({ error: 'Opps!!!!.....Internal Server Error.' });
  }
};

// API for Get Notification By ID
export const getNotificationById = async (req, res) => {
    try {
        const notification = await Notification.findById(req.params.id);
        if (!notification) {
            return res.status(404).json({ error: 'Sorry,Notification Not Found!!!...Please try again' });
        }
        res.json(notification);
    } catch (error) {
        res.status(500).json({ error: 'Opps!!!!.....Internal Server Error.-in line 35 noti controler-' });
    }
};

// API for Update Notification
export const updateNotification = async (req, res) => {
    try {
        const { notificationTitle, notificationBody } = req.body;
        const notificationId = req.params.id;

        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return next(errorHandler(404, 'Sorry, Notification could not Find!!....'));
        }

        notification.notificationTitle = notificationTitle;
        notification.notificationBody = notificationBody;
        const updatedNotification = await notification.save();

        res.status(200).json(updatedNotification);
    } catch (error) {
        next(error);
    }
};

// API for Delete Notification
export const deleteNotification = async (req, res) => {
    try {
        const deletedNotification = await Notification.findByIdAndDelete(req.params.id);
        if (!deletedNotification) {
            return res.status(404).json({ error: 'Sorry, Notification could not Find!!...' });
        }
        res.json({ message: 'Notification Deleted Successfully!!...' });
    } catch (error) {
        res.status(500).json({ error: 'Opps!!!!.....Internal Server Error!!...' });
    }
};