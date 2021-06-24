const express=require("express");
const bodyParser=require("body-parser");
const https=require("https");
const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html")
});
app.post("/",function(req,res){
  var firstName=req.body.fName;
  var lastName=req.body.lName;
  var email=req.body.email;
  //refer this link for everything
  //https://mailchimp.com/developer/reference/lists/#post_/lists/-list_id-
  const data={
    members:[{
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }

    ]
  };
  var jsonData=JSON.stringify(data);
  //refer this link for everything
  //https://mailchimp.com/developer/reference/lists/#post_/lists/-list_id-
  const url="https://us18.api.mailchimp.com/3.0/lists/a81138d576";
  const options={
    method:"POST",
    auth:"Nithi:48762e62becd30528c24ee0cd1f845e9-us18"
  };
  const request =https.request(url,options,function(response){
    if (response.statusCode==200){
      res.sendFile(__dirname+"/success.html");
    }
    else{
      res.sendFile(__dirname+"/failure.html");
    }
    response.on("data",function(data){
      console.log(JSON.parse(data));
    })

  })
  request.write(jsonData);
  request.end();
});
app.post("/failure",function(req,res){
  res.redirect("/");
});


app.listen(process.env.PORT || 4000,function(){
  console.log("The port 4000 started.");
});



//List id
// a81138d576
// Api key
// 48762e62becd30528c24ee0cd1f845e9-us18
