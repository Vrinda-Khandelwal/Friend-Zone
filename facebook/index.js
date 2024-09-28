const express = require("express");
const mylib = require("./mylib");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app=express();
app.use(cors());
app.use(express.json());

app.post("/user/SignUp",async(req,res)=>
    {
        let email=req.body.email;
        let password=req.body.password;
        let name=req.body.name;
        let gender=req.body.gender;
        let check=await mylib.check(email);
        if(check!=null)
        {
          res.json({msg:"User already exists",token:''});
        }
        else
        {
            const newuser={email:email,password:password,name:name,gender:gender};
            mylib.save(newuser);
            res.json({msg:"Data Saved",token:''});
        }
    }
);

app.post("/user/login",async(req,res)=>
    {
        let email=req.body.email;
        let password=req.body.password;
        console.log(email);
        console.log(password);
        let user=await mylib.check(email);
        console.log(user);
        if(user!=null)
        {
            if(user[0].password==`${password}`)
            {
                let token= mylib.generateToken(user);
                console.log(token);
                res.json({msg:"login Successfully",token:token});
            }
            else
            {
                res.json({msg:"Password Invalid",token:''});
            }
        }
        else
        {
            res.json({msg:"Email id is Invalid",token:''});
        }
    }
);


app.post("/user/edit",async(req,res)=>
    {
        let email=req.body.email;
        let password=req.body.password;
        let name=req.body.name;
        let edituser={email:email,password:password,name:name};
        await mylib.edit(edituser);
        res.send("Updated Sucessfully");
});

app.post("/friend/save",async(req,res)=>
    {
        const token=req.body.token;
        console.log(token);
        const rec=req.body.rec;
        console.log(rec);
        let pay=mylib.decodeToken(token);
        const sender=pay.email;
        console.log(sender);
        let check=await mylib.check(rec);
        if(check!=null)
        {
            let friend={sender:sender,rec:rec,status:0};
            mylib.savefriend(friend);
            res.json({msg:"Friend Saved",token:''});
        }
        else
        {
            res.json({msg:"Friend Not Exists",token:''});
        }
    }
);

app.post("/friend/accept",(req,res)=>
    {
        const fid=req.body.fid;
        let friend={fid:fid,status:1};
        const save=mylib.accept(friend);
        res.json({msg:"Friend accepted"});
    }
);

app.post("/friend/reject",(req,res)=>
    {
        const fid=req.body.fid;
        let friend={fid:fid,status:2};
        const save= mylib.reject(friend);
        res.json({msg:"Friend reject"});
    }
);

app.post("/user/wallPost",async(req,res)=>
    {
        const token=req.body.token;
        const message=req.body.message;
        let payload= mylib.decodeToken(token);
        let wpost={sender:payload.email,message:message};
        mylib.message(wpost);
        res.json({msg:"message posted",token:''});
    }
);

app.post("/welcome",async(req,res)=>
{
    const token=req.body.token;
    console.log("Token on server",token);
    let decode=mylib.decodeToken(token);
    const pfriends=await mylib.pendingRequest(decode.email);
    const friends=await mylib.acceptRequest(decode.email);
    const wposts=await mylib.wposts(decode.email);
    const values={
        pfriends:pfriends,
        friends:friends,
        wposts:wposts
    };
    res.json(values);
});


/*app.get("/login",(req,res)=>
{
    const email = "a@a.com";
    const name = "Shaka";
    const payload={email:email,name:name};
    const secretkey="Maine@Baboo&Ki?Babooi*hu!123";
    const options={'expiresIn':'1h'};
    const token = jwt.sign(payload,secretkey,options);
    const values={'token':token};
    res.json(values);

});

app.get("/Friends",(req,res)=>
    {
        const token = req.query.token;
        const secretkey="Maine@Baboo&Ki?Babooi*hu!123";
        const payload = jwt.verify(token,secretkey);
        console.log(payload.email);
        res.json("Hello");
    
    });

    app.get("/savePost",(req,res)=>
        {
            const token = req.query.token;
            const secretkey="Maine@Baboo&Ki?Babooi*hu!123";
            const payload = jwt.verify(token,secretkey);
            console.log(payload.email);
            console.log(payload.name);
            res.json("Post have Saved");
        
        }); 
*/
app.listen(8000);