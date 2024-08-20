const express = require("express");
const app = express();
const users = require("./routes/user.js"); 
const posts = require("./routes/post.js"); 
const cookieParser = require("cookie-parser");
const session = require("express-session");
const flash = require("connect-flash");
const path = require("path");

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));
app.use(flash());

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
});

app.get("/register",(req,res)=>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    
    if(name === "anonymous"){
        req.flash("error","user not registered");
    }else{
        req.flash("success","user registered successfully!");
    }
    
    res.redirect("/hello");
});

app.get("/hello",(req,res)=>{

    res.render("page.ejs",{name: req.session.name});
});

// app.get("/reqcount",(req,res)=>{
//     if(req.session.count){
//         req.session.count++;
//     } else{
//         req.session.count=1;
//     }

//     res.send(`you sent a request ${req.session.count} times`);
// });


// app.get("/test",(req,res)=>{
//     res.send("Test successful!");
// });



app.listen(3000, ()=>{
    console.log("server is listening to 3000");
});

// app.use(cookieParser("secretcode"));

// app.get("/getsignedcookie",(req,res)=>{
//     res.cookie("color","red",{signed: true});
//     res.send("done!");
// });

// app.get("/verify",(req,res)=>{
//     res.send(req.signedCookies);
// });

// app.get("/greet",(req,res)=>{
//     let {name = "anonymous"}=req.cookies;
//     res.send(`Hi, ${name}`);
// });

// app.get("/getcookies",(req,res)=>{
//     res.cookie("greet","namaste");
//     res.cookie("origin","India");
//     res.send("We sent you a cookie!");
// });

// app.get("/",(req,res)=>{
//     console.log(req.cookies);
//     res.send("Hi, i am root");
// });

// app.use("/users",users);
// app.use("/users",posts);
