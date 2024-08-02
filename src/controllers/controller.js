import User from '../model/userModel.js'
import Password from '../model/passwordModel.js'
import bcrypt from 'bcrypt'
import generateToken from '../utils/generateToken.js'

export const signupController = async(req, res) => {
  try {
    const {name, email, password} = req.body
    const userEmail = await User.findOne({email})
    if(userEmail) {
      res.status(500).json({ message: "Email already exist"})
      return
      // throw new Error("Email already exist")
    }
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({
      name: name,
      email: email,
      password: passwordHash,
    })
    console.log("user created", user);
    res.status(200).json({ message: "Registered Succussfully"})
  } catch (error) {
      res.status(400).json({error})
      console.log(error);
  }
}


export const loginController = async(req, res) => {
  try {
    const {email, password} = req.body
    console.log(email, password);
    const user = await User.findOne({email})
    if(!user) {
      res.status(400).json({message: "Invalid Email"})
      return
    }
    if(user && typeof user.password === 'string' && (await bcrypt.compare(password, user.password)) ) {
      res.status(200).json({
        message: "Login Succussfull",
        _id: user.id,
        name: user.name,
        email: user.email,
        token: generateToken(user.id)
      })
    } else {
      res.status(400).json({ message: "Invalid credentials" })
      return
    }
  } catch (error) {
      res.status(400).json({error})
      console.log(error);
  }
}

export const savePasswordController = async(req, res) => {
  try {
    const {userId, password, passwordTitle} = req.body
    console.log(userId, password, passwordTitle);
    const user = await User.findById(userId)
    if(!user) {
      res.status(400).json({ message: "Invalid User" })
      return
    }
    const savedPassword = await Password.create({
      userId: userId,
      title: passwordTitle,
      password: password,
    })

    res.status(200).json({ message: "Password Saved Succussfully" })

  } catch (error) {
      res.status(400).json({error})
      console.log(error);
  }
}

export const getPasswordController = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    const passwords = await Password.find({ userId: userId }).exec();
    console.log(passwords); 
    res.status(200).json({ passwords });
  } catch (error) {
    console.error("Error fetching passwords:", error);
    res.status(500).json({ error: 'An error occurred' });
  }
};

export const deletePasswordController = async (req, res) => {
  try {
    const { userId, passwordId } = req.body;
    console.log('Deleting password:', { userId, passwordId });

    const result = await Password.findOneAndDelete({ _id: passwordId, userId: userId });

    if (result) {
      res.status(200).json({ message: 'Password deleted successfully' });
      return
    } else {
      res.status(404).json({ message: 'Password not found' });
      return
    }
  } catch (error) {
    console.error('Error deleting password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
