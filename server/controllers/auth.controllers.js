import User from "../models/user.models.js";
import bcrypt from "bcryptjs";

const hello = (req, res) => {
  return res.json({ user: ["user1", "user2", "user3"] });
};

const allUser = async (req,res) => {
  try {
    const user = await User.find()
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const singleUser = async (req,res) => {
  try {
    const {email} = req.headers;
    
    const user = await User.findOne({email})
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: error });
  }
}

const deleteUser = async (req,res) => {
  const {email} = req.body;
  try {
    const dUser = await User.findOneAndDelete({email})
    if (!dUser) {
      res.status(404).json({message:"user not found"})
    }else{
      res.status(200).json({message:"user deleted successfully"})
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

const login = async (req, res) => {
  try {
    const { email, password, userRole } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ error: "user has no account" });
    } else {
      if (!userRole) {
        res.status(400).json({ error: "user role is required" });
      } else if (userRole == user.userRole) {
        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
          res.status(400).json({ error: "password is incorrect" });
        } else {
          res.cookie(
            "userDATA",
            JSON.stringify({ email: user.email, userRole: user.userRole, username: user.username }),
            { maxAge: 9000000, httpOnly: false, secure: false }
          );

          res.status(200).json({ message: "Login success full"  });
        }
      } else {
        res.status(400).json({ error: "user role is mismatching" });
      }
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
        
      });

      await newUser.save();
      return res.status(200).json({ message: "success full", data: newUser });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "error during signin" });
  }
};

const singleEdit = async (req, res) => {
  const { name, email, userRole, workingHours } =
    req.body;

  try {
    const exsistUSer = await User.findOneAndUpdate({ email: email },{username: name,
      email: email,
      userRole: userRole,
      workingHours: workingHours
    });

  

      
      return res.status(200).json({ message: "successfull edited" });
    
  } catch (error) {
    console.log(error);
    res.status(404).json({ message: "error during edit" });
  }
};


export { login, signin, hello,allUser,singleUser ,deleteUser , singleEdit};
