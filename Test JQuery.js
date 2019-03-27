console.log("Début du programme")
function ChangerPiste(){
    song=document.getElementById('player');
    song.setAttribute('src','Music/TheFatRat/Jackpot/TheFatRat - Jackpot (Jackpot EP Track 1).mp3');
    console.log("Musique changée !")
}
$('#Ink').on('click',ChangerPiste)