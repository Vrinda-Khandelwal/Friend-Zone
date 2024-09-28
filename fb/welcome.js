let reqarea=document.getElementById("requestarea");
reqarea.addEventListener("submit",(event)=>
{
    event.preventDefault();
    let rec=document.getElementById("rec").value;
    let token=localStorage.getItem("mtoken");
    console.log(token);
    let data={token:token,rec:rec};
    fetch("http://localhost:8000/friend/save",{
        method:"post",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(data)
    }).
    then(response=>
    {
        if(response.ok)
            return response.json();
        else
        throw new Error("Error Occured");
    }).
    then(data=>{
        console.log(data.msg);
        alert(data.msg);
        
    }).catch(error=>
    {
        console.log(error);
    }
    );
});

let postarea=document.getElementById("postarea");
postarea.addEventListener("submit",(event)=>
{
    event.preventDefault();
    let message=document.getElementById("message").value;
    let token=localStorage.getItem("mtoken");
    console.log(token);
    let data={message:message,token:token};
    fetch("http://localhost:8000/user/wallPost",{
        method:"post",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(data)
    }).
    then(response=>
    {
        if(response.ok)
            return response.json();
        else
        throw new Error("Error Occured");
    }).
    then(data=>{
        console.log(data.msg);
        alert(data.msg);
        
    }).catch(error=>
    {
        console.log(error);
    }
    );
});

function show()
{
    let token=localStorage.getItem("mtoken");
    console.log(token);
    let data={token:token};
    fetch("http://localhost:8000/welcome",{
        method:"post",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(data)
    }).
    then(response=>
    {
        if(response.ok)
            return response.json();
        else
        throw new Error("Error Occured");
    }).
    then(data=>{
        console.log("done");
        disp(data.pfriends,data.wposts,data.friends);
        
    }).catch(error=>
    {
        console.log(error);
    }
    );
}

function disp(pfriends,wposts,friends)
{
    let pdiv=document.getElementById("pfriends");
    let fdiv=document.getElementById("friends");
    let wdiv=document.getElementById("wposts");
    let html="";
    for(let f of friends)
    {
        html=html+f+"<br>"+"<hr>";
    }
    fdiv.innerHTML=html;
    let html1="";
    for(let w of wposts)
    {
        html1=html1+w.message+"<br>";
        html1=html1+w.sender+"<br><hr>";
    }
    wdiv.innerHTML=html1;
    let html2="";
    for(let p of pfriends)
    {
        html2=html2+p.sender+`<span style="float:right;"><button type="button" class="btn btn-primary" onclick="accept(${p.fid})">Accept</button><button type="button" class="btn btn-danger" onclick="reject(${p.fid})">Reject</button></span>`+"<br>"+"<hr>";
    }
    pdiv.innerHTML=html2;
}

function accept(afid)
{
    let data={fid:afid};
    fetch("http://localhost:8000/friend/accept",{
        method:"post",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(data)
    }).
    then(response=>
    {
        if(response.ok)
            return response.json();
        else
        throw new Error("Error Occured");
    }).
    then(data=>{
        console.log(data.msg);
        alert(data.msg);
        
    }).catch(error=>
    {
        console.log(error);
    }
    );
}

function reject(rfid)
{
    let data={fid:rfid};
    fetch("http://localhost:8000/friend/reject",{
        method:"post",
        headers:{"content-Type":"application/json"},
        body:JSON.stringify(data)
    }).
    then(response=>
    {
        if(response.ok)
            return response.json();
        else
        throw new Error("Error Occured");
    }).
    then(data=>{
        console.log(data.msg);
        alert(data.msg);
        
    }).catch(error=>
    {
        console.log(error);
    }
    );
}