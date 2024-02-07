/**
 * 1) start game and show the best score yet 
 * 2) start the game right after he presses the button   V
 * 3) when he losses to pop up the window again and show the current score
 * 4) if he broke it another message 
 * 5) at a new game to restart everything
 */



const circle = document.getElementById("circle");
const ball =  document.getElementById("ball");
const right =  document.getElementById("right");
const score = document.getElementById("score");
const closeButton = document.getElementById('closeButton');
const floatingWindow = document.getElementById('floatingWindow');


var cur_ball_color = ball.style.backgroundColor;
var cur_circle_color = window.getComputedStyle(circle).getPropertyValue("border-bottom-color");;
const color_array = ["#6a4c93","#ff595e","#ffca3a","#1982c4"];
var color_offset = 0;
var cur_points = 2.5;
ball.style.backgroundColor = color_array[Math.floor((Math.random() * 3) + 0)];

right.addEventListener("click",colorChange_right)
circle.addEventListener("click",my_animation);


localStorage.setItem("TRY",5);
// Add event listener to close the floating window
closeButton.addEventListener('click', function() {
    floatingWindow.classList.add('hidden');
    my_animation();
});




function update_score() {
    score.innerHTML = cur_points; 
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
    console.log("entered");
    ball_animation_down(function () {// call the down function with the up function as a parameter
        ball_animation_up(function () {// call the down function with a function that checks if to continue the recursion
                if (points_or_fail()) {
                    my_animation(); 
                }
            });
        });
}

function points_or_fail(){

    console.log("ball "+cur_ball_color);
    console.log("circle " +cur_circle_color);
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
    var id = setInterval(move, 9);

    function move() {
        if (pos < 245) {
            pos++;
            ball.style.top = pos + "px";
        } else {
            clearInterval(id);
            cur_ball_color = ball.style.backgroundColor;
            cur_circle_color = window.getComputedStyle(circle).getPropertyValue("border-bottom-color");
            if(points_or_fail()){
                update_score();
                callback(); // Call the callback function when animation completes
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
    var id = setInterval(move, 9);

    function move() {
        if (pos > 122) {
            pos--;
            ball.style.top = pos + "px";
        } else {
            clearInterval(id);
            ball.style.backgroundColor = color_array[choose_ball_color()];
            callback(); // Call the callback function when animation completes
        }
    }
}

function choose_ball_color(){
    var temp = Math.floor((Math.random() * 3) + 0);
    console.log(temp);
        while(color_array[temp] === cur_ball_color ){
             temp = Math.floor((Math.random() * 3) + 0);
             console.log(temp);
        }
        console.log("the chosen: " +temp);
    return temp;
}



function colorChange_left(){
    color_offset--;
    console.log(color_offset);
    circle.style.borderTopColor=color_array[(0+color_offset)%color_array.length];
    circle.style.borderLeftColor=color_array[(1+color_offset)%color_array.length];
    circle.style.borderBottomColor=color_array[(2+color_offset)%color_array.length];
    circle.style.borderRightColor=color_array[(3+color_offset)%color_array.length];
    
}