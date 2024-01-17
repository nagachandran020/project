const mongoose = require('mongoose');



// Create student schema
const StudentSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
         type: String, 
         unique: true,
         required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword:{
       type: String,
       required:true
    },
    registerNumber: {
        type: String,
        required:true
     },
    gender: {
        type: String,
        required:true
     },
    dob:{
        type: String,
        required:true
     },
    phoneNumber: {
        type: String,
        required:true
     },
    college: {
        type: String,
        required:true
     },
    department: {
        type: String,
        required:true
     },
    year: {
        type: String,
        required:true
     },
    isUserType: {
        type: String,
        required:true
     }
  });


  // Create staff Schema
  const StaffSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email:{
         type: String, 
         unique: true,
         required: true
    },
    password: {
        type: String,
        required: true
    },
    confirmPassword:{
       type: String,
       required:true
    },
    phoneNumber: {
        type: String,
        required:true
     },
    college: {
        type: String,
        required:true
     },
    department: {
        type: String,
        required:false
     },
     isUserType: {
        type: String,
        required:true
     }
  });



// Define the event schema



const eventSchema = new mongoose.Schema({
  BSC_CS: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object, uploadIcon: String, fileDownload: String , downloadIcon: String}],
  MSC_CS: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean , fileUpload: Object, uploadIcon: String, fileDownload: String , downloadIcon: String}],
  MSC_IT: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object , uploadIcon: String, fileDownload: String , downloadIcon: String}],
  BCA_CA: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object , uploadIcon: String, fileDownload: String , downloadIcon: String}],
  BCA_DS: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object , uploadIcon: String, fileDownload: String , downloadIcon: String}],
  MCA_CA: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean , fileUpload: Object, uploadIcon: String, fileDownload: String , downloadIcon: String}],
  MSC_ADS: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean , fileUpload: Object, uploadIcon: String, fileDownload: String , downloadIcon: String}],
  BCOM_COM: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean , fileUpload: Object, uploadIcon: String, fileDownload: String , downloadIcon: String}],
  BCOM_INF: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object , uploadIcon: String, fileDownload: String , downloadIcon: String}],
  BCOM_INTER: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object, uploadIcon: String, fileDownload: String , downloadIcon: String }],
  BCOM_PROF: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object, uploadIcon: String, fileDownload: String , downloadIcon: String }],
  BCOM_STR: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object, uploadIcon: String, fileDownload: String , downloadIcon: String }],
  BCOM_CORP: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object, uploadIcon: String, fileDownload: String , downloadIcon: String }],
  BCOM_AC: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object, uploadIcon: String, fileDownload: String , downloadIcon: String }],
  MCOM_COM: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object, uploadIcon: String, fileDownload: String , downloadIcon: String }],
  MCOM_AC: [{ deptName: String, event: String, venue: String, date: String, time: String, addEvent: String, deleteEvent: String, approve: String, reject: String, isApproved: Boolean, fileUpload: Object , uploadIcon: String, fileDownload: String , downloadIcon: String}]
});

// const eventSchema = new mongoose.Schema({
//     deptName: {
//       type: String,
//       required: false
//     },
//     event: {
//       type: String,
//       required: false
//     },
//     venue: {
//       type: String,
//       required: false
//     },
//     date: {
//       type: String,
//       required: false
//     },
//     time: {
//       type: String,
//       required: false
//     },
//     addEvent: {
//       type: String,
//       required: false
//     },
//     deleteEvent: {
//       type: String,
//       required: false
//     }
//   });
  
//   const eventsDataArrSchema = new mongoose.Schema({
//     BSC_CS: [eventSchema],
//     MSC_CS: [eventSchema],
//     MSC_IT: [eventSchema],
//     BCA_CA: [eventSchema],
//     BCA_DS: [eventSchema],
//     MCA_CA: [eventSchema],
//     MSC_ADS: [eventSchema],
//     BCOM_COM: [eventSchema],
//     BCOM_INF: [eventSchema],
//     BCOM_INTER: [eventSchema],
//     BCOM_PROF: [eventSchema],
//     BCOM_STR: [eventSchema],
//     BCOM_CORP: [eventSchema],
//     BCOM_AC: [eventSchema],
//     MCOM_COM: [eventSchema],
//     MCOM_AC: [eventSchema]
//   });
  


// Define the user data schema
const userDataSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  formData: {
    type: [eventSchema],
    required: true
  }
});
  
  // Export all schemas
module.exports = {
    student: mongoose.model('Student', StudentSchema),
    staff: mongoose.model('Staff', StaffSchema),
    userData: mongoose.model('userData', userDataSchema )
};