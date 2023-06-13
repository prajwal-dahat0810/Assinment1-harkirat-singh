const express = require('express')
const app = express()
const port = 3002
const USERS=[];
const SUBMISSION=[{qid:1,uid:10},{qid:2,uid:10},{qid:2,uid:20}];
const QUESTIONS=[{
  tittle:"Two states",
  id:"1",
  description:"Giver an array ,return a max size of array ?",
  testcases :[{
    input:"[1,2,3,4,5]",
    output:"5"
  }]
}]
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.get('/',function(req,res){
  res.send("Hello World");
})
app.post('/signup', function(req, res) {
  let email = req.body.Email;
  let password = req.body.Password; 
  // console.log(req.body);
  // res.send(`ok`);
//check if user exists or not
let userExists = USERS.some(user => user.email === email);

if (userExists) {
  // Return 409 Conflict status code if user already exists
  res.status(409).send(' Already User sign UP');
} else {
  // Create a new user object with the email and password
  const newUser = {
    email,
    password
  };
  USERS.push(newUser);

    // Return 200 OK status code and success message
    res.status(200).send('User created successfully');
  }

})
app.post('/login',function(req,res){
  let email = req.body.Email;
  let password = req.body.Password; 
  let userExists = USERS.some(user => user.email === email );
  let passwordExist=USERS.some(user=>user.password===password);
  if(userExists&&passwordExist){ 
   
    res.status(200).send('User login  successfully');
  }
  else{
    res.status(401).send('enter right Password');
  }



})
app.get('/signup',function(req,res){
  res.send('<html><h1 >sign up </h1><form action="/signup" method="post"><input type="email" name="Email" placeholder="Enter Email"><input type="password" name="Password" placeholder="Enter Password"><input type="submit"></form></html>')
})
app.get('/login', function(req, res) {
  res.send('<html><h1 >LOGIN</h1><form action="/login" method="post"><input type="email" name="Email" placeholder="Enter Email"><input type="password" name="Password" placeholder="Enter Password"><input type="submit"></form></html>')
})
app.get('/questions', function(req, res)  {
  // for (let i = 0; i < QUESTIONS.length; i++) {
  //   console.log("Title: " + QUESTIONS[i].title);
  //   console.log("Description: " + QUESTIONS[i].description);
  //   console.log("Test cases: " + QUESTIONS[i].testcases);
  // }
  // Assume that QUESTIONS is an array of question objects 
  // Return all the questions in the QUESTIONS array
  res.status(200).json(QUESTIONS);
  
});



app.get("/submissions", function(req, res) {
  // let the user submit a problem, randomly accept or reject the solution
  // Store the submission in the SUBMISSION array above
  
  //request should send to client for question id 
  res.send('<html><h1>Enter ID of Question</h1><form action="/submissions" method="post"><input type="text" name="uid" id="uid" placeholder="User ID"><input type="submit" value="Submit"></form></html>')
  //server return array of submission
 //res.post("<html><h1 >Enter the id of question </h1></html>")
}
 
);

app.post("/submissions", function(req, res){
  let uid = req.body.uid;
  let sub = []
  for(let i=0;i<SUBMISSION.length;i++){
    if(SUBMISSION[i].uid == uid){
      sub.push(SUBMISSION[i]);
    }
  }
  res.send(sub)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
