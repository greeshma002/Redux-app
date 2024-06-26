import { errorHandler } from "../utils/error.js"
import  bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";

export const test = (req,res) => {
    res.json({
        message:'API is working!',
    })
}

//UPDATE USER

export const updateUser = async (req, res, next) => {
    console.log('req.params.id',req.params.id);
    // if(req.user.id !== req.params.id) {
    //     return next(errorHandler(401, 'You can update only your account!'));
    // }
    try {
        if(req.body.password) {
            req.body.password = await bcryptjs.hashSync(req.body.password, 10)
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
            },
            { new: true }
        );
        const { password, ...rest } = updateUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error)
    }
}

//DELETE USER FUNCTIONALITY

export const deleteUser = async (req, res, next) => {
    if(req.user.id !== req.params.id) {
        return next(errorHandler(401, 'You can delete only your account'))
    } 
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted')
    } catch (error) {
        next(error) 
    }
}
export const getUser = async (req, res, next) => {
  console.log('req.params.id',req.params.id);
  const userId=req.params.id
try {
  const userDet = await User.findById(userId);
console.log('userDet',userDet);
} catch (error) {
  
}
 
}

export const userDetails = async (req, res, next) => {
  try{
    const userDet = await User.find();
    res.json(userDet)
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}


export const deleteAdmin = async (req, res, next) => {
    const userId = req.params.id;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  export const editUser = async (req, res, next) => {
    const userId = req.params.id;
    const updatedData = req.body; 
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updatedData },
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
  
      return res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'An error occurred while updating the user', error: error.message });
    }
  };

   export const addUser =  async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const newUser = new User({ username, email, password });
      await newUser.save();
      res.status(201).json({ success: true, data: newUser });
    } catch (error) {
      res.status(500).json({ success: false, message: 'An error occurred while adding user.', error });
    }
  };
  