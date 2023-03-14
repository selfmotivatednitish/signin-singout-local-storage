if(localStorage.getItem("user")){
    location.replace("/webpage.html")
}

let users = []

if(!localStorage.getItem("users")) {
    location.replace("/signup.html")
}
else {
    users = JSON.parse( localStorage.getItem("users"))
}

let form = document.getElementById("loginForm");

form.addEventListener("submit", (e) => {
    e.preventDefault()
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let flag = true

    users.forEach(element => {
        if(element.details.email === email && element.details.password === password){
            flag = false
            localStorage.setItem("user", JSON.stringify(element))
            location.replace("/webpage.html")
        }
    });
    if (flag) {
        alert("Wrong email or password. Please try again or create a account by signup")
        location.reload()
    }
});
