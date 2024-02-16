
 
 /*// Sample user data
 var users = [
     { email: 'john@example.com' ,user_name:'the best',last_seen: new Date(), password: '123#$nam' , games_scores: [70,90] },
     { email: 'JaneSmith@gmail.com',user_name:'gader21',last_Seen: new Date(), password: 'dcww2147' ,games_scores: [400,54] }
 ];

 // Convert the user data to a JSON string
 var usersJson = JSON.stringify(users);

 // Store the JSON string in local storage
 localStorage.setItem('users', usersJson);
 localStorage.setItem('current_user', JSON.stringify({}));
 /*-------------------- CLEAN LOCAL STORAGE--------------------------------*/

 const log_in = document.getElementById('login-form');
 const sign_up = document.getElementById('signup-form');
 const change_to_sign_up = document.getElementById('signup-link');
 const log_in_container = document.getElementById('log-in-container');
 const signup_container = document.getElementById('signup-container');
 const change_to_log_in = document.getElementById('login-link');

 change_to_log_in.addEventListener('click',go_to_log_in);
 log_in.addEventListener('submit',check_log_in);
 sign_up.addEventListener('submit',add_new_user);

 var cur_user_jason = localStorage.getItem('current_user');
 var cur_user = JSON.parse(cur_user_jason) || {};


 check_cookies();
 /* 
 a function that checks if a user is already logged in 
 and if the user cookies had expired or not
 */
 function check_cookies(){
    if(Object.keys(cur_user).length != 0){
        var now = new Date();
        var last = new Date(cur_user.last_seen);
        console.log(new Date(last));
        var difference = Math.abs(now - last);
        var milliseconds_per_day = 1000 * 60 * 60 * 24; 
        var days = Math.floor(difference / milliseconds_per_day);
        if(days <= 2)
        {    
        window.location.href = "/html/games.html";
        }
        else{
            localStorage.setItem("current_user",JSON.stringify({}));
        }
    }

 }

// 
 change_to_sign_up.addEventListener('click',function(){

     log_in_container.classList.remove('show');
     log_in_container.classList.add('hide');
     signup_container.classList.remove('hide');
     signup_container.classList.add('show');
 });

 function go_to_log_in(){
    log_in_container.classList.remove('hide');
    log_in_container.classList.add('show');
    signup_container.classList.remove('show');
    signup_container.classList.add('hide');
}

 function check_log_in(event){
    console.log("before");
    event.preventDefault();
    console.log("after");
   const userPass = document.getElementById('password');
   const userName= document.getElementById('user_name');

   var storedUsersJson = localStorage.getItem('users');
   var storedUsers = JSON.parse(storedUsersJson) || [];
   var exist = 0;
   for(let i = 0; i<storedUsers.length; i++){
        if(storedUsers[i].user_name === userName.value &&storedUsers[i].password === userPass.value)
        {
            // TODO: CHECK IF HE NEEDS TO BE BLOCKED
            storedUsers[i].last_seen = new Date();
            console.log( storedUsers[i].last_seen);
            localStorage.setItem('users', JSON.stringify(storedUsers));
            localStorage.setItem('current_user',JSON.stringify(storedUsers[i]));
            window.location.href = "/html/games.html";
            exist = 1;
            break;
        }
        
   }
   if(exist === 0){
        window.alert("user name or password are wrong \n try again!");
        //TODO to block if the password is wrong 3 times.
   }

 }

 function add_new_user(event) {
     event.preventDefault(); // Prevent form submission from reloading the page

     // Get form input values
    const userMail = document.getElementById('signup-email');
    const userName= document.getElementById('signup-user-name');
    const userPass = document.getElementById('signup-password');

     // Get existing users from local storage
     var storedUsersJson = localStorage.getItem('users');
     var storedUsers = JSON.parse(storedUsersJson) || []; 
    var now = new Date();
     // Create the new user 
     var newUser = {
         email: userMail.value,
         user_name: userName.value,
         last_seen: now,
         password: userPass.value,
         games_scores: [0, 0]
     };
 
     if(check_user_name(storedUsers,newUser) && check_user_email(storedUsers,newUser)){

        storedUsers.push(newUser);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        go_to_log_in();
     }
     else{
        userMail.value="";
        userName.value="";
        userPass.value="";
     }
 }

 function check_user_name(Users,user){
    for(var i=0;i<Users.length;i++){
        console.log(Users[i].user_name);
        if(Users[i].user_name === user.user_name){
            console.log("false");
            window.alert("user name already exist:( \n try again...");
            return false;
        }
    }
     console.log("true");
    return true;
 }

 function check_user_email(Users,user){
    for(var i=0;i<Users.length;i++){
        console.log(Users[i].email);
        if(Users[i].email === user.email){
            console.log("false");
            window.alert("you have an account already\n please to log in");
            return false;
        }
    }
     console.log("true");
     return true;
 }


