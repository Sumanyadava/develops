import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

const hello = (req, res) => {
  return res.json({ user: ["user1", "user2", "user3"] });
};

const login = async (req, res) => {
  try {
    const { email, password,userRole } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "user has no account" });
    }
    if (!userRole) {
      res.status(400).json({ error: "user role is required" });
    }else if (userRole == user.userRole) {

      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        res.status(400).json({ error: "password is incorrect" });
      } else {
  
        res.cookie(
          "userdata",
          { email: user.email, userRole: user.userRole },
          { maxAge: 9000000 }
        );
        
        res.status(200).json({ message: "Login success full" });
      }

    }else{
      res.status(400).json({ error: "user role is mismatching" });
    }

    
    
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "error during login" });
  }
};

const signin = async (req, res) => {
  const { name, email, password, userRole, workingHours, inTime, outTime } =
    req.body;

  try {
    const exsistUSer = await User.findOne({ email: email });

    if (exsistUSer) {
      return res.status(400).json({
        error: "user already exists",
      });
    } else {
      const hash_password = await bcrypt.hash(password, 10);
      const newUser = User({
        username: name,
        email: email,
        password: hash_password,
        userRole: userRole,
        workingHours: workingHours,
        inOutTime: [
          {
            inTime: inTime,
            outTime: outTime,
          },
        ],
      });

      await newUser.save();
      return res.status(200).json({ message: "success full", data: newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "error during signin" });
  }
};

export { login, signin, hello };
