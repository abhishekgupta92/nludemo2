// Variable to count number of attempts.
// Below function Executes on click of login button.
function validate(){
var username = document.getElementById("username").value;
var password = document.getElementById("password").value;
if (username == "admin" && password == "nludemo")
{
    window.location = "index.html"; // Redirecting to other page.
    return false;

    
}
else
{
    
    myFunction("snackbar1");
    
    // Disabling fields after 3 attempts.
}   

}

function myFunction(txt) {
      var x = document.getElementById(txt);

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}