console.log("Début du programme");
var path='Music/TheFatRat/Jackpot/';
function Selector(){
    if (s==1){
        path='Music/Tobu/Sugar/';
        file='10 Damn Son.m4a';
    }
    else if (s==2){
        path='Music/TheFatRat/Jackpot/';
        file='TheFatRat - Jackpot (Jackpot EP Track 1).mp3';
    }
    else{
        path='Music/Caravan Palace/(°_°)/';
        file='caravan-palace-wonderland.mp3';
    }
    ChangerPiste();
}
function ChangerPiste(){
    console.log(path);
    console.log(file);
    console.log(path+file);
    song=document.getElementById('player');
    song.setAttribute('src', path+file);
    console.log("Musique changée !");
    image=document.getElementById('Jacquette');
    image.setAttribute('src', path+'Jacquette.jpg');
    console.log(path+'Jacquette.jpg');
    image.setAttribute('width','300px');
    image.setAttribute('heigth','300px');
}
song=document.getElementById('player');
function Pause(){
    song.pause();
    console.log("Pause");
}
function Lecture(){
    song.play();
    console.log("Lecture");
}
function Stop(){
    song.pause();
    song.currentTime=0;
    console.log("Stop");
}
console.log("Fonction bien défini");
play=document.getElementById('play');
play.addEventListener("click",Lecture);
pause=document.getElementById('pause');
pause.addEventListener("click",Pause);
stop=document.getElementById('stop');
stop.addEventListener("click",Stop);

tobu=document.getElementById('Tobu');

tobu.addEventListener("click",function() {s=1;Selector()});
thefatrat=document.getElementById('TheFatRat');
thefatrat.addEventListener("click",function() {s=2;Selector()});
caravanpalace=document.getElementById('Caravan Palace');
caravanpalace.addEventListener("click",function() {s=3;Selector()});
