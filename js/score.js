//Updates the top 5 players

let users_Json = localStorage.getItem('users');
let usersC = JSON.parse(users_Json) || [];
let usersM = JSON.parse(users_Json) || [];

function update_best_players(){

    let color_best_players = usersC.sort((a, b) => b.games_scores[0]-a.games_scores[0]);
    console.log(color_best_players);
    console.log(usersC);
    let memory_best_players = usersM.sort((a, b) => b.games_scores[1]-a.games_scores[1]);
    console.log(memory_best_players);
    console.log(usersM);
   

    

    update_table(color_best_players, "table-color-players",0);
    update_table(memory_best_players, "table-memory-players",1);
}


//update the table of the top players
function update_table(best_players, id_table,gn){

    let table = document.getElementById(id_table);
    let tbody = table.querySelector("tbody");

    let curr_user = JSON.parse(localStorage.getItem('current_user'));

    let rows = tbody.getElementsByTagName("tr");
    for(let i = 0; i<rows.length && i < best_players.length; i++){
        let row = rows[i];
        let playerNameCell = row.querySelector("td:nth-child(1)");
        let scoreCell = row.querySelector("td:nth-child(2)");
        playerNameCell.innerHTML = best_players[i].user_name;
        scoreCell.innerHTML = best_players[i].games_scores[gn]; 

        if (best_players[i].user_name === curr_user.user_name){
            console.log(best_players[i].user_name);
            console.log( curr_user.user_name);
            playerNameCell.style.fontSize = "25px"; 
            scoreCell.style.fontSize = "25px"; 
            playerNameCell.style.fontWeight = "bold"; 
            scoreCell.style.fontWeight = "bold"; 
        }   
    }
} 

function check_out(e){
    console.log("here");
    localStorage.setItem("current_user",JSON.stringify({}));
    window.location.href = "/logIn.html";
}

update_best_players();