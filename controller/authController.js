const bcrypt = require('bcrypt');
const {readJSON , writeJSON} = require('../utils/fileHandler');
const {generateToken} = require('../utils/jwtToken');
const {v4:uuidv4} = require('uuid')

const File_Name = "user.json";


async function registerUser(req , res) {
    try{

    const {name , email , password} = req.body;

    if (!name || !email || !password) return res.status(400).json({ message: 'User Name , Email and password are required.' });

    const users = await readJSON(File_Name);
    const existingUser = users.find(user => email === user.email);
    if(existingUser) {
        return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
        id: uuidv4(),
        name,
        email,
        password: hashedPassword
    };

    users.push(newUser);
    await writeJSON(File_Name, users);

    res.status(201).json({ message: 'User registered successfully.' });
}catch(err){
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
}
}

async function LoginUser(req, res) {
    try {
      const { email, password } = req.body;
  
      const users = await readJSON(File_Name);
      const user = users.find(user => user.email === email);
  
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      const token = generateToken(user.id, email);
  
      res.json({ message: 'Login successful', token });
      
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  }
  
module.exports = {
    registerUser,
    LoginUser
}