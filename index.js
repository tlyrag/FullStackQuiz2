const mongoose = require('mongoose');

const express = require('express')
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require('dotenv').config();

const port = process.env.PORT || 3000;

// Create a Schema object
const studentSchema = new mongoose.Schema(
  {
      name:{type:String,require:true},
      studentID:{type:Number,required:true}
  }
);
// Create a Model object
const Student = mongoose.model("w24students",studentSchema);

app.get('/', (req, res) => {
  res.sendFile(__dirname + "/form.html")
});

app.post('/', async (req, res) => {
  // get the data from the form
    const uri = req.body.myuri
    console.log(uri)
  // connect to the database and log the connection
  await mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
  })
  // add the data to the database
   let name = "Thiago Lyra Ganem";
   let studentID = 300370930;
    const newStud = new Student({
      name,
      studentID
    });
    console.log(newStud)
  try{
    
    await newStud.save();
  }
  catch(err){
    console.log(`Unable to sav new Student ${err}`)
  }
  
  // send a response to the user
  res.send(`<h1>Document  Added</h1>`);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
