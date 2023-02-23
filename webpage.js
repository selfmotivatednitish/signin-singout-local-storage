const language = ['', 'English', 'Hindi']

let user

if(localStorage.getItem("user")){
    user = JSON.parse( localStorage.getItem("user") )
}
else {
    location.replace("/signin.html")
}

// profile img change at edit-profile at webpage
let imgFile = user.details.profilePicture
const file = document.getElementById("profModal");
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
        imgFile = user.details.profilePicture
    }
});

let fullname = user.details.firstName + " " + user.details.lastName
const src = "data:image/png;base64," + user.details.profilePicture
document.getElementById("fullName").innerHTML = user.details.firstName + " " + user.details.lastName
document.getElementById("designation").innerHTML = user.details.designation
document.getElementById("address").innerHTML = user.details.address
document.getElementById("contactNumber").innerHTML = user.details.contactNumber
document.getElementById("email").innerHTML= user.details.email
document.getElementById("email").href = `mailto:` + user.details.email
document.getElementById("link").innerHTML = user.details.link
document.getElementById("link").href = user.details.link
document.getElementById("language").innerHTML = language[user.details.language]
document.getElementById("img-thumbnail").src = src

let editButton = document.getElementById("edit-button")

editButton.addEventListener("click", (e) => {
    document.getElementById("nameModal").value = user.details.firstName + " " + user.details.lastName
    document.getElementById("desgModal").value = user.details.designation
    document.getElementById("addModal").value = user.details.address
    document.getElementById("contModal").value = user.details.contactNumber
    document.getElementById("emailModal").value = user.details.email
    document.getElementById("linkModal").value = user.details.link
    document.getElementById("langModal").value = language[user.details.language]
    document.getElementById("profilePicdummy").src = src
})

let saveProfile = document.getElementById("edit-profile-form")

saveProfile.addEventListener("submit", (e) => {
    e.preventDefault()
    let fullName = document.getElementById("nameModal").value;
    let designation = document.getElementById("desgModal").value;
    let contactNumber = document.getElementById("contModal").value;
    let address = document.getElementById("addModal").value;
    let link = document.getElementById("linkModal").value;
    let language = document.getElementById("langModal").value;
    let email = document.getElementById("emailModal").value;

    const nameSplit = fullName.split(" ")
    let firstName = nameSplit[0]
    let lastName = nameSplit[1]

    let tempUser = {
        employeeID:user.employeeID,
        details:{
            firstName:firstName,
            lastName:lastName,
            designation:designation,
            contactNumber:contactNumber,
            email:email,
            dob:user.details.dob,
            address:address,
            profilePicture:imgFile,
            link:link,
            language:language,
            password:user.details.password
        }
    }
    let users = []
    if(localStorage.getItem("users")) {
        users = JSON.parse(localStorage.getItem("users"))
        users = users.map(temp => temp.employeeID !== user.employeeID ? temp : tempUser)
    }
    console.log(user);

    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("user", JSON.stringify(tempUser));
    location.reload()
});

let logoutButton = document.getElementById("signout")

logoutButton.addEventListener("click", (e) => {
    localStorage.removeItem("user")
    alert("You successfully signout!!!")
    location.replace("/signin.html")
})

