/**
 * 1) start game and show the best score yet 
 * 2) start the game right after he presses the button   V
 * 3) when he losses to pop up the window again and show the current score
 * 4) if he broke it another message 
 * 5) at a new game to restart everything
 */

//take the  current user

var cur_user_jason = localStorage.getItem('current_user');
var cur_user = JSON.parse(cur_user_jason);



const circle = document.getElementById("circle");
const ball =  document.getElementById("ball");


const score = document.getElementById("score");
const closeButton = document.getElementById('closeButton');
const floatingWindow = document.getElementById('floatingWindow');
const cur_game_score = document.getElementById("cur_game_score");
const best_game_score = document.getElementById("best_game_score");
best_game_score.innerHTML = cur_user.games_scores[0];
let cur_level = 9;
var cur_ball_color = ball.style.backgroundColor;
var cur_circle_color = window.getComputedStyle(circle).getPropertyValue("border-bottom-color");;
const color_array = ["#6a4c93","#ff595e","#ffca3a","#1982c4"];
var color_offset = 0;
var cur_points = 2.5;
var i=1;
ball.style.backgroundColor = color_array[Math.floor((Math.random() * 3) + 0)];
document.addEventListener('keydown', function(event) {
    // Check if the pressed key is the space key
    if (event.code === 'Space' || event.key === ' ') {
        // Perform your desired action here
        colorChange_right();
    }
});

// Add event listener to close the floating window
closeButton.addEventListener('click', function() {
    floatingWindow.classList.remove('show');
    floatingWindow.classList.add('hidden');
    game();
});

function game(){
    circle.style.borderTopColor=color_array[0];
    circle.style.borderLeftColor=color_array[1];
    circle.style.borderBottomColor=color_array[2];
    circle.style.borderRightColor=color_array[3];
    color_offset = 0;
    cur_points = 2.5;
    cur_level = 9;
    i=1;
    level_massage("level "+ i +"!",1000);
    my_animation();

}

function update_score(points) {
    score.innerHTML = points; 
}


function colorChange_right(){
    color_offset++;
  
    circle.style.borderTopColor=color_array[(0+color_offset)%color_array.length];
    circle.style.borderLeftColor=color_array[(1+color_offset)%color_array.length];
    circle.style.borderBottomColor=color_array[(2+color_offset)%color_array.length];
    circle.style.borderRightColor=color_array[(3+color_offset)%color_array.length];
}

/**
 * The function activates the functions that raise and lower the ball until there is a miss.
 **/

function my_animation() {
  
    ball_animation_down(function () {// call the down function with the up function as a parameter
        ball_animation_up(function () {// call the down function with a function that checks if to continue the recursion
                if (points_or_fail()) {
                    my_animation(); 
                }else{
                    stop_game();
                }
            });
        });
}

function stop_game(){
    let points =cur_points - 2.5;
    floatingWindow.classList.remove('hidden');
    cur_game_score.innerHTML = points;

        if(points > cur_user.games_scores[0])
        {
            level_massage("new record!!",3000);
            cur_user.games_scores[0]=points;
            update_local_storage();
        }
    best_game_score.innerHTML = cur_user.games_scores[0];
    floatingWindow.classList.add('show');
    update_score(0);
}


function update_local_storage(){
    //TODO: enter the new player.
    var storedUsersJson = localStorage.getItem('users');
    var storedUsers = JSON.parse(storedUsersJson) || []; 

    storedUsers[storedUsers.findIndex(element => element.user_name === cur_user.user_name)] = cur_user;
    localStorage.setItem("users", JSON.stringify(storedUsers ));
    localStorage.setItem("current_user",JSON.stringify(cur_user));
    console.log('updated');
}

function points_or_fail(){
    if(cur_ball_color === cur_circle_color){
        cur_points = cur_points+2.5;
        return true;
        // add 5 points.
    }else{
        // miss; stop all the intervals.
        return false;
    }
}

/**
 * The function move the ball down a px every interval.
 * input : a callback function that moves the ball back up.
 **/
function ball_animation_down(callback) { 

    var pos = 112;
    /*change_level();*/
    var id = setInterval(move, cur_level);

    function move() {
        if (pos < 245) {
            pos++;
            ball.style.top = pos + "px";
        } else {
            clearInterval(id);
            cur_ball_color = ball.style.backgroundColor;
            cur_circle_color = window.getComputedStyle(circle).getPropertyValue("border-bottom-color");
            if(points_or_fail()){
                update_score(cur_points);
                change_level();
                ball.style.backgroundColor = color_array[choose_ball_color()];
                callback(); // Call the callback function when animation completes
            }
            else{
                stop_game();
            }
        }
    }
}

/**
 * The function move the ball up a px every interval.
 * input : a callback function that checks if the player missed or not .
 **/

function ball_animation_up(callback) {
    var pos = 245;
    /*change_level();*/
    var id = setInterval(move,cur_level+2);

    function move() {
        if (pos > 122) {
            pos--;
            ball.style.top = pos + "px";
        } else {
            clearInterval(id);
            callback(); // Call the callback function when animation completes
        }
    }
}

function choose_ball_color(){// it des not check the same values.
    var temp = Math.floor((Math.random() * 4) + 0);
    return temp;
}


function change_level(){  
    console.log(i);
    if(cur_points % 20 === 0 ){
        if(cur_level != 1 ){
            cur_level -= 2;
        }
        i++;
        level_massage("level "+ i +"!",1000);
    }    
}

function level_massage(level,time){
    var toastMessage = document.getElementById('toast-message');
    toastMessage.classList.add('shown');
    toastMessage.innerHTML = level;
    // Hide the toast message after 3 seconds
    setTimeout(function() {
      toastMessage.classList.remove('shown');
    }, time);
}

function check_out(e){
    console.log("here");
    localStorage.setItem("current_user",JSON.stringify({}));
    window.location.href = "/logIn.html";
}

















