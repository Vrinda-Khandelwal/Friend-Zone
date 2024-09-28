const mysql = require("mysql2/promise");
const jwt=require("jsonwebtoken");
/*async function SignUp(email)
{
    db= connect();
    const q="SELECT * FROM user WHERE email=?";
    console.log(q);
    let [row]=await db.query(q,[email]);
    console.log("Hello",row);
    if(row.length>0)
        return row;
    else
        return null;
}*/

async function check(email)
{
    db= await connect();
    console.log(email);
    const q=`SELECT * FROM user WHERE email='${email}'`;
    console.log(q);
    const [row] = (await db.query(q));
    db.end();
    console.log("Hello",row);
    db.end((error)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Connection closed");
        }
    });
    if(row.length>0)
        return row;
    else
        return null;
    
}

async function connect()
{
    const db=await mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"india",
        database:"facebook"
});
return db;
}

async function save(newuser)
{
    const db = await connect();
    const q=`insert into user values('${newuser.email}','${newuser.password}','${newuser.name}','${newuser.gender}')`;
    db.query(q);
    db.end();
}

function generateToken(user)
{
    console.log("gabbr",user);
    const email = user[0].email;
    const name = user[0].name;
    const password= user[0].password;
    const gender= user[0].gender;
    const payload={email:email,name:name,password:password,gender:gender};
    const secretkey="Maine@Baboo&Ki?Babooi*hu!123";
    const options={'expiresIn':'1h'};
    const token = jwt.sign(payload,secretkey,options);
    const values=token;
    console.log(values);
    return(values);
}

async function edit(edituser)
{
    const db = await connect();
    const q=`UPDATE user SET password = '${edituser.password}', name = '${edituser.name}' WHERE email='${edituser.email}'`;
    console.log(q);
    db.query(q);
    db.end();
}

async function savefriend(friend){
    const db = await connect();
    const q = `INSERT INTO friend (sender, rec, status) VALUES ('${friend.sender}','${friend.rec}',${friend.status})`;
    console.log(q);
    const [result]=await db.query(q);
    db.end();
    return result;
}

function decodeToken(token)
{
    const secretkey="Maine@Baboo&Ki?Babooi*hu!123";
    let payload=jwt.verify(token,secretkey);
    console.log(payload);
    console.log(payload.email);
    return(payload);
}

async function accept(friend)
{
    const db = await connect();
    const q = `UPDATE friend SET status = ${friend.status} WHERE fid=${friend.fid}`;
    db.query(q);
    db.end();
}

async function reject(friend)
{
    const db = await connect();
    const q = `UPDATE friend SET status = ${friend.status} WHERE fid=${friend.fid}`;
    db.query(q);
    db.end()
}

async function message(wpost)
{
    const db = await connect();
    const q = `INSERT INTO wpost (sender, message, dop) VALUES ('${wpost.sender}', '${wpost.message}', NOW())`;
    db.query(q);
    db.end((error)=>{
        if(error){
            console.log(error);
        }
        else{
            console.log("Connection closed");
        }
    });
}

async function pendingRequest(email) {
    const db=await connect();
    const q = `select * from friend where rec="${email}" and status=0`;
    let [result]=await db.query(q);
    db.end();
    return result;
}

async function acceptRequest(email) {
    const friend=[];
    const db = await connect();
    const q =`select * from friend where (rec="${email}" or sender="${email}") and status=1`;
    let [result]=await db.query(q);
    db.end();
    console.log(result);
    for(let f of result)
    {
        if(f.sender==email)
        {
            friend.push(f.rec);
        }
        else
        {
            friend.push(f.sender);
        }
    }
    return friend;
}

async function wposts(email)
{
    const friend=await acceptRequest(email);
    friend.push(email);
    const wpost=[];
    const db=await connect();
    const q = `select * from wpost order by wid desc`;
    const [result]=await db.query(q);
    db.end();
    for(let w of result)
    {
        if(friend.includes(w.sender))
        {
            wpost.push(w);
        }
    }
    return wpost;
}

module.exports={
    connect, save, generateToken, edit, check, savefriend, decodeToken, accept, reject, message,
    pendingRequest, acceptRequest, wposts
};