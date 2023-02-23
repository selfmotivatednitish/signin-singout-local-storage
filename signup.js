let form = document.getElementById("signupForm");

if (localStorage.getItem("user")) {
    location.replace("/webpage.html");
}

// profile img change at signup page
let imgFile;
const file = document.getElementById("profilePicture");
const img = document.getElementById("profilePicdummy");

file.addEventListener("change", function () {
    const choosedFile = this.files[0];

    if (choosedFile) {
        const reader = new FileReader();

        reader.addEventListener("load", function () {
            img.setAttribute("src", reader.result);
            const base64String = reader.result
                .replace('data:', '')
                .replace(/^.+,/, '');

            imgFile = base64String.toString()
        });

        reader.readAsDataURL(choosedFile);
    }
    else {
        imgFile = ""
    }
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let designation = document.getElementById("designation").value;
    let contactNumber = document.getElementById("contactNumber").value;
    let employeeID = document.getElementById("employeeID").value;
    let dob = document.getElementById("dob").value;
    let address = document.getElementById("address").value;
    let profilePicture = imgFile;
    let link = document.getElementById("link").value;
    let language = document.getElementById("language").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let check = true;

    if (findAge(dob) < 20) {
        check = false;
        alert("Your age must must be atleast 20 Years!!!");
    }

    let cot = String(contactNumber);
    if (cot.length != 10) {
        check = false;
        alert("Your mobile number should of length 10!!!");
    }

    if (check) {
        let user = {
            employeeID: employeeID,
            details: {
                firstName: firstName,
                lastName: lastName,
                designation: designation,
                contactNumber: contactNumber,
                email: email,
                dob: dob,
                address: address,
                profilePicture: profilePicture,
                link: link,
                language: language,
                password: password,
            },
        };
        let users = [];
        let flag = true;
        if (localStorage.getItem("users")) {
            users = JSON.parse(localStorage.getItem("users"));
            users.forEach((element) => {
                if (element.employeeID === employeeID) {
                    alert(
                        "Employee is already registered with the given employee ID!!!\nRedirecting to sigin page..."
                    );
                    location.replace("/signin.html");
                    flag = false;
                }
            });
            if (flag) {
                users.push(user);
            }
        } else {
            users = [];
            users.push(user);
        }
        // user = users[2]
        if (flag) {
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("users", JSON.stringify(users));

            location.replace("/webpage.html");

            alert("You Signup successfully");
        }
    }
});

function findAge(dob) {
    let date = new Date(dob);
    let month_diff = Date.now() - date.getTime();
    let age_dt = new Date(month_diff);

    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);
    return age;
}
