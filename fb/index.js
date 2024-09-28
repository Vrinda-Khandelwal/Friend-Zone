let login=document.getElementById("login");
login.addEventListener("submit",(event)=>
{
    event.preventDefault();
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let data={email:email,password:password};
    fetch("http://localhost:8000/user/login",{
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
        if(data.msg=="login Successfully")
        {
            console.log(data.token);
            alert(data.msg);
            localStorage.setItem("mtoken",data.token);
            location="welcome.html";
        }
        else
        alert(data.msg);
        
    }).catch(error=>
    {
        console.log(error);
    }
    );
});
