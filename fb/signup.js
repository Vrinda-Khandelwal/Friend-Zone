let SignUp=document.getElementById("signUp");
SignUp.addEventListener("submit",(event)=>
{
    event.preventDefault();
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let name=document.getElementById("name").value;
    //let gender=document.getElementById("gender").value;
    // Get the selected gender value
    let gender = document.querySelector('input[name="gender"]:checked').value;
    let data={email:email,password:password,name:name,gender:gender};
    fetch("http://localhost:8000/user/SignUp",{
        method:"POST",
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
        alert(data.msg);
        console.log(data.msg);
    }).catch(error=>
    {
        console.log(error);
    }
    );
});