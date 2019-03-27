console.log("Début du programme");
function ChangerPiste(){
    song=document.getElementById('player');
    song.setAttribute('src','Music/TheFatRat/Jackpot/TheFatRat - Prelude (Jackpot EP Track 3).mp3');
    console.log("Musique changée !");
}
floyd=document.getElementById("Ink");
floyd.addEventListener("click",ChangerPiste);
