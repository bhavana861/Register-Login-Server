const bcrypt = require('bcryptjs')
const userslist = require('../models/userModel')
const jwt = require('jsonwebtoken')

// register
exports.registerController = async (req,res)=>{
    console.log("Inside registerController");
    const {firstname,lastname,email,password,phonenumber} = req.body
    console.log(firstname,lastname,email,password,phonenumber);
    try{
      const existingUser = await userslist.findOne({email})
      if(existingUser){
        res.status(406).json("User already exist")
      }
      
      else{
         // Hash the password
         const saltRounds = 10; // Number of salt rounds for bcrypt
         const hashedPassword = await bcrypt.hash(password, saltRounds);
 
        const newUser = new userslist({
            firstname,lastname,email, password: hashedPassword,phonenumber
        })
        await newUser.save()
        res.status(200).json(newUser)
      }
    }catch(err){
        res.status(401).json(err)

    }

    
}

// login
exports.loginController = async (req, res) => {
    console.log("Inside loginController");
    const { email, password } = req.body;
    console.log(email, password);

    try {
        // Find the user by email
        const existingUser = await userslist.findOne({ email });
        if (!existingUser) {
            return res.status(404).json("Invalid Email / Password");
        }
        // Compare the entered password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordMatch) {
            return res.status(404).json("Invalid Email / Password");
        }
      // Generate a JWT token
        const token = jwt.sign({ userId: existingUser._id },process.env.JWTPASSWORD);
        // Send the response
        res.status(200).json({
            userslist: {
                _id: existingUser._id,
                firstname: existingUser.firstname,
                lastname: existingUser.lastname,
                email: existingUser.email,
                phonenumber: existingUser.phonenumber
            },
            token
        });
    } catch (err) {
        console.error(err);
        res.status(500).json("An error occurred while logging in");
    }
};
