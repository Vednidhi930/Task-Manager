import { userModel } from "../models/user.model.js";
import { taskModel } from "../models/task.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodeMailer from "nodemailer";
const JWT_SECRET_KEY = "vednidhi123";
import multer from "multer"

// registration
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  const hashPassowrd = await bcrypt.hash(password, 10);

  const user = new userModel({
    username: username,
    email: email,
    password: hashPassowrd,
  });

  await user.save();
  res.status(200).json({ message: "User is registered successfully" });
};

//login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const findUser = await userModel.findOne({ email });
  if (!findUser) {
    res.status(422).json({ message: "user doesn't exist" });
  } else {
    const userId = findUser._id;
    console.log(userId);
    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      res.status(422).json({ message: "Incorrect Password" });
    } else {
      const UserToken = jwt.sign({ email, password, userId }, JWT_SECRET_KEY);

      const options = {
        expire: new Date(Date.now()),
        httpOnly: true,
        secure: true,
      };

      res
        .cookie("userToken", UserToken, options)
        .status(200)
        .json({ message: "Login Successfully" });
    }
  }
};

//logout

const loggedOut = (req, res) => {
  const loggedInUser = req.cookies.userToken;

  if (loggedInUser)
    res
      .clearCookie("userToken")
      .status(200)
      .json({ message: "Thanks! Come Back again" });
};

// Task Data

const taskData = async (req, res) => {
  const { title, description, color } = req.body;
  console.log(title, description, color);

  const userToken = req.cookies.userToken;
  console.log(userToken);
  if (!userToken) {
    res.json({ message: "login First" }).status(422);
  } else {
    const checkUser = jwt.verify(userToken, JWT_SECRET_KEY);
    const userId = checkUser.userId;
    const taskData = new taskModel({
      title: title,
      description: description,
      color: color,
    });
    const saveData = await taskData.save();
    const taskId = saveData._id;

    const taskUser = await userModel.findByIdAndUpdate(userId, {
      $push: { tasks: taskId },
    });
    if (!taskUser) {
      res.json({ message: "invalid user" }).status(422);
    } else {
      taskUser.tasks.push(saveData._id);
      res.json({ message: "task created" }).status(200);
    }
  }
};

const getTaskData = async (req, res) => {
  try {
    const userToken = req.cookies.userToken;
    if (!userToken) {
      res.json({ message: "login First" }).status(422);
    } else {
      const checkUser = jwt.verify(userToken, JWT_SECRET_KEY);
      if (!checkUser) {
        res.json({ message: "token expired" });
      } else {
        const userId = checkUser.userId;
        const user = await userModel.findOne({ _id: userId }).populate("tasks");
        res.json({ message: "done", user: user }).status(200);
      }
    }
  } catch (error) {
    res.json({ message: "internal server error" }).status(422);
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userToken = req.cookies.userToken;
  if (!userToken) {
    res.json({ message: "Login First" }).status(200);
  } else {
    const checkUser = jwt.verify(userToken, JWT_SECRET_KEY);
    if (!checkUser) {
      res.json({ message: "token expired" });
    } else {
      const userId = checkUser.userId;
      await taskModel.findByIdAndDelete(id);
      await userModel.findByIdAndUpdate(userId, { $pull: { tasks: id } });
      res.json({ message: "task deleted" }).status(200);
    }
  }
};

// Task complete update
const CompletedTaskUpdate = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const userToken = req.cookies.userToken;
  if (!userToken) {
    res.json({ message: "Login First" }).status(200);
  } else {
    const checkUser = jwt.verify(userToken, JWT_SECRET_KEY);
    if (!checkUser) {
      res.json({ message: "token expired" });
    } else {
      const task = await taskModel.findByIdAndUpdate(id);
      const completedTask = task.completed;
      await taskModel.findByIdAndUpdate(id, { completed: !completedTask });
      res.json({ message: "task updated" }).status(200);
    }
  }
};

const mainTask = async (req, res) => {
  const { title, description, color } = req.body;
  const { id } = req.params;
  console.log(id, title, description, color);

  const userToken = req.cookies.userToken;
  if (!userToken) {
    res.json({ message: "Login First" }).status(200);
  } else {
    const checkUser = jwt.verify(userToken, JWT_SECRET_KEY);
    if (!checkUser) {
      res.json({ message: "token expired" });
    } else {
      await taskModel.findByIdAndUpdate(id, {
        title: title,
        description: description,
        color: color,
      });
      res.json({ message: "task updated" }).status(200);
    }
  }
};

const completedTask = async (req, res) => {
  const userToken = req.cookies.userToken;
  if (!userToken) {
    res.json({ message: "Login First" }).status(200);
  } else {
    const checkUser = jwt.verify(userToken, JWT_SECRET_KEY);
    if (!checkUser) {
      res.json({ message: "token expired" });
    } else {
      const userId = checkUser.userId;
      const taskData = await userModel.findById(userId).populate({
        path: "tasks",
        match: { completed: true },
      });
      res.json({ taskData: taskData }).status(200);
    }
  }
};

const incompletedTask=async(req,res)=>{
  const userToken = req.cookies.userToken;
  if (!userToken) {
    res.json({ message: "Login First" }).status(200);
  } else {
    const checkUser = jwt.verify(userToken, JWT_SECRET_KEY);
    if (!checkUser) {
      res.json({ message: "token expired" });
    } else {
      const userId = checkUser.userId;
      const taskData = await userModel.findById(userId).populate({
        path: "tasks",
        match: { completed: false },
      });
      res.json({ taskData: taskData }).status(200);
    }
  }
}

// generate otp and send with the help of gmail
const sendEmail = (req, res) => {
  //346775

  const OTP = Math.floor(1 + Math.random() * 9000);

  const emailProvider = nodeMailer.createTransport({
    service: "gmail",
    secure: true,
    port: 465, // gmail by default port is 465
    auth: {
      user: "shanukumar7988@gmail.com",
      pass:"qoddpqeklnzuluyd", // fir apko gmail ka password dena hai kuch aisa agr aapke gmail pe 2 step authentication on h to
    },
    tls: { rejectUnauthorized: false },
  });

  const receiver = {
    from: "shanukumar7988@gmail.com",
    to: "coderved930@gmail.com",
    subject: "OTP Verification",
    text: `Your One Time Password(OTP) is ${OTP}`,
  };

  emailProvider.sendMail(receiver, (error, emailResponse) => {
    if (error) {
      res.status(422).json({ message: error });
    } else {
      res.status(200).json({ message: "otp send successfully on your gmail account" });
    }
  });
};

const userProfile=async(req,res)=>{
  
}

const userHome = (req, res) => {
  // res
  // .status(200)
  // .json({message:"Token verified"})
};

export {
  registerUser,
  loginUser,
  userHome,
  loggedOut,
  taskData,
  getTaskData,
  deleteTask,
  CompletedTaskUpdate,
  sendEmail,
  mainTask,
  completedTask,
  incompletedTask,
  userProfile,
};
