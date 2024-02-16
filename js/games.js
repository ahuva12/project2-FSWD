const user_title = document.getElementById("user-title");

var cur_user_jason = localStorage.getItem('current_user');
var cur_user = JSON.parse(cur_user_jason);
console.log(cur_user);
console.log(cur_user.user_name);
user_title.innerHTML = cur_user.user_name;

function check_out(e){
    console.log("here");
    localStorage.setItem("current_user",JSON.stringify({}));
    window.location.href = "/logIn.html";
}