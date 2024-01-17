const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const schemas = require('./schema');
const { async } = require('rxjs');
const shortid = require('shortid');





// Set up the JWT secret key (<---do not touch--->)
const secretKey = 'LINGESH_TECHNOPHILE#001';
const uniqueId = shortid.generate();
var staffUserId = String;


// Set up the Express app
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// setup listener 

app.listen(2000, ()=> {console.log('Listing port successfully on 2000')})

// DB setup
mongoose.connect('mongodb://127.0.0.1:27017/Event_PortalDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB', err));




// get schemas form schema.js

const student = schemas.student;
const staff = schemas.staff;
const userData = schemas.userData;


// handling student and staff sign up
app.post('/api/signup', async (req, res) => {
  console.log('res---->', req.body)
  try {
    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    if(req.body.isUserType == 'STUDENT'){
      console.log('THIS IS STUDENT SIGN UP');

      // find existing user
      const userExists = await student.findOne({ email: req.body.email }).exec();
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }  
      const studentSignup = new student({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hashedPassword,
          confirmPassword: req.body.confirmPassword,
          registerNumber: req.body.registerNumber,
          gender: req.body.gender,
          dob: req.body.dob,
          phoneNumber: req.body.phoneNumber,
          college: req.body.college,
          department: req.body.department,
          year: req.body.year,
          isUserType: req.body.isUserType
        });

        // find duplicate sign up details


        // Save the user to the database
        await studentSignup.save();
    } else {
      console.log('THIS IS STAFF SIGN UP')
      
      //find existing user
      const userExists = await staff.findOne({ email: req.body.email }).exec();
      if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
      }     

      var emailId = req.body.email;

      if(emailId &&  emailId.startsWith("hod.") || emailId &&  emailId.startsWith("dean.")){

        const staffSignup = new staff({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: emailId,
          password: hashedPassword,
          confirmPassword: req.body.confirmPassword,
          phoneNumber: req.body.phoneNumber,
          college: req.body.college,
          department: req.body.department,
          isUserType: req.body.isUserType
        })
         // Save the user to the database
         await staffSignup.save();

         // Return a success message
        res.status(200).json({ message: 'Account created successfully' });
      } else {
        res.status(200).json({message: 'Please use official email id' })
      }
    }
     
  } catch (error) {
    // Return an error message
    res.status(500).json({ message: 'Account has not been created' });
  }
});


// handling student and staff login 

app.post('/api/login', async (req, res) => {
  try{
    var userEmail = req.body.email;
    var user = String;

    if(userEmail){
      var userOfStudent =  await student.findOne({email: userEmail})
      console.log('student identified', userOfStudent);
    } 
    if(userEmail){
      var userOfStaff = await staff.findOne({email: userEmail})
      console.log('staff identified', userOfStaff)
      if(userOfStaff){
        staffUserId = userOfStaff._id;
      }
    
    }
    var user = userOfStudent || userOfStaff;
    
    if(user != 'null'){
      console.log('user1',user)
      // If the user doesn't exist, return an error
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
 
      // Verify the password using bcrypt
      const isPasswordValid = await bcrypt.compare(req.body.password, user.password);
      console.log('pw1',isPasswordValid)
      // If the password is invalid, return an error
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }


      var userEmail = user.email;
      var isLoginType = String;
      if(userEmail && userEmail.startsWith("hod.")){
        isLoginType = 'HOD'
      }
      if(userEmail && userEmail.startsWith("dean.")){
        isLoginType = 'DEAN'
      }

      console.log('dta--->', isLoginType)
      // Generate a JWT token
      const token = jwt.sign({
        userId : user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isUserType: user.isUserType,
        isTypeOfLogin: isLoginType
      }, secretKey);
      console.log('token1',token)
     // Return the token to the client
     res.status(200).json({token});
    }

  } catch(error){
    res.send({message: 'login failed'});
    console.log('error--->', error);
  }
})



// handling user data 


app.post('/api/saveData', async (req, res) => {
  console.log('req', req);
  if (!req.body) {
    return res.status(400).json({ message: 'formData field is required.' });
  }
  const userDataCollections = new userData({
    id: uniqueId,
    userId: (staffUserId) ? staffUserId : '' ,
    formData: req.body
  });
  console.log('user data collections--', userDataCollections)
  const userExists = await userData.findOne({ userId: staffUserId }).exec();
  if (userExists) {
    console.log('user db exists-->')
    res.status(200).json(userDataCollections);
  } else {

    await userDataCollections.save()
    .then(() => {
      res.status(200).json(userDataCollections);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });

  }

 

});



// get each user saved data

app.get('/api/getUserData', (req, res) => {
  var userId = (staffUserId) ? staffUserId : '';
  userData.find({ userId })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});



app.put('/api/updateUserData', async (req, res) => {
  try {
    const userId = req.body.user_id;
    const formData = req.body.data
    console.log('hey is there', userId, formData)
    
    const updatedData = await userData.findOneAndUpdate(
      { userId: userId },
      { $set: { formData } },
      { new: true }
    );

    res.status(200).json(updatedData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'An error occurred while updating the user data.' });
  }
});







// Protected endpoint
app.get('/api/protected', (req, res) => {
  // Verify the JWT token
  try {
    const decoded = jwt.verify(req.headers.authorization.split(' ')[1], secretKey);
    const userEmail = decoded.email;

    // Return the protected data to the client
    res.status(200).json({ message:  `Hello, ${userEmail}!` });

  } catch(error) {
    res.status(500).json({message: "Couldn't find user"})
  }

});

