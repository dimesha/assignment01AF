/*
IT21833366
wijerathna G.D.K
AF-assignment-01
restfull-API-UTMS(University Timetable Management System)
 */

import User from '../model/user.model.js';

// testing the backend-api
export const test = (req, res) => {
    res.json({
        message:'API is working!'
    });

};


// Router path to modify User
export const updateUser = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, 'Sorry!!...You can not Update This User.'));
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(errorHandler(400, 'Password Must Be At Least 6 Characters.'));
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          errorHandler(400, 'Invalid Username please try again!!...')
        );
      }
      if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'User Name Can Not Contain Spaces!!...'));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(400, 'The username must consist of alphabetic characters and numerals!!...')
        );
      }
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            profilePicture: req.body.profilePicture,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };
  