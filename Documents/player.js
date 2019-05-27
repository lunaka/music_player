var path='Documents/Music/TheFatRat/Jackpot/';

var playlist = [];

song=document.getElementById('audio');

//Fonctions des boutons Lecture, Pause, Stop

function Pause(){
    song.pause();
}
function Lecture(){
    song.play();
}
function Stop(){
    song.pause();
    song.currentTime=0;
}

//Fonction affichant la liste des auteurs présents dans le dossier 'Documents/Music/'

function getAuthor(){
  $.get('Documents/Music/', function(data, status){
    test = document.getElementById('getAuthor');
    S = "";
    for (i=0; i<data.artists.length; i++){
      S = S + "<button class='but' id='"+data.artists[i].name+"' onClick="+ '"'+"getAlbums('" + data.artists[i].name + "')"+'">' + data.artists[i].name+'</button>'+'<br></br>'
    }
    test.innerHTML = S
  });
}

//Fonction affichant la liste des albums de l'auteur author sélectionné présents dans le dossier 'Documents/Music/author'

function getAlbums(author){
  $.get('Documents/Music/'+author, function(data, status){
    test = document.getElementById('getAlbums')
    S = ""
    for (i=0; i<data.albums.length; i++){
      S = S + "<button id='"+data.albums[i].name+ "' class='but'" + " onClick="+ '"'+"getMusics('" + author + "','"+ data.albums[i].name + "')"+'"'+">" + data.albums[i].name+'</button>'+'<br></br>'
    }
    var noMusics = document.getElementById('getMusics');
    noMusics.innerHTML = 'Choisissez un album';
    test.innerHTML = S
  });
}

//Fonction affichant la liste des pistes de l'album album de l'auteur author sélectionné présents dans le dossier 'Documents/Music/author/album'

function getMusics(author,album){
  $.get('Documents/Music/'+author+'/'+album, function(data, status){
    test = document.getElementById('getMusics');
    var last = data.titles.length;
    S = ""
    for (i=0; i<data.titles.length-1; i++){
      
      S = S + '<button id="'+data.titles[i].name+'" '+ "class='but' " + 'onClick="'+"addToPL('" +author +"','"+album+"','"+data.titles[i].name+"','"+data.titles[last-1].name +"'"+')">' + data.titles[i].name+"</button>" + '<br></br>'
    
    } 
    test.innerHTML = S
  });
}

//Fonction jouant la piste située à l'url 'Documents/Music/author/album/music'

function playMusic(author, album, music){
    song=document.getElementById('audio');
    song.setAttribute('src','Music/'+author+'/'+album+'/'+music);
    document.getElementById('music_name').innerHTML = music;
}

//Fonction qui change la musique jouée ainsi que la musique jouée.

function ChangerPiste(author, album, music, image){
  images=document.getElementById('Jacquette');
  images.setAttribute('src','Music/'+author+'/'+album+'/'+image);
  playMusic(author,album,music);
}

//Fonction qui ajoute une musique à la playlist

function addToPL(author, album, music, image){
  ChangerPiste(author, album, music, image);
  playlist.push(music);
  S='<ul>';
  for (i = 0 ; i < playlist.length ; i++){
    S = S + ' <li id = " '+playlist[i]+' "> ' + playlist[i] +
    '<button class = "remove" id = " ' + playlist[i] + ' " onClick = " ' + ' removeFromPL(' + i + ') "> '+
    '<i class="fa fa-trash"></i>'+
    '</button>'+ '</li>' ;
  }
  document.getElementById('playList').innerHTML = S + '</ul>'
  console.log(playlist)
}

//Fonction qui retire une musique de la playlist

function removeFromPL(index){
  S='<ul>';
  console.log("DEBUT REMOVEFROMPL")
  console.log("La playlist est : " + playlist)
  console.log("Elle est de longueur " + playlist.length)
  console.log("Musique à supprimer : " + playlist[index])
  console.log("Son indice : " + index)
  let L = []
  for (i = 0 ; i < playlist.length ; i++){
    if (i < index){
      console.log(playlist[i])
      console.log(i)
      S = S + ' <li id = " '+playlist[i]+' "> ' + playlist[i] +
    '<button class = "remove" id = " ' + playlist[i] + ' " onClick = " ' + ' removeFromPL(' + i + ') "> '+
    '<i class="fa fa-trash"></i>'+
    '</button>'+ '</li>' ;
    L.push(playlist[i])
    }
    else if (i > index){
    console.log(playlist[i])
    console.log(i)
    S = S + ' <li id = " '+playlist[i]+' "> ' + playlist[i] +
    '<button class = "remove" id = " ' + playlist[i] + ' " onClick = " ' + ' removeFromPL(' + (i-1) + ') "> '+
    '<i class="fa fa-trash"></i>'+
    '</button>'+ '</li>' ;
    L.push(playlist[i])
    }
  }
  playlist = L
  document.getElementById('playList').innerHTML = S + '</ul>'
  console.log("Nouvelle playlist : " + playlist)
  console.log("FIN REMOVEFROMPL")
}

//Affectation des eventListener

play=document.getElementById('play');
play.addEventListener("click",Lecture);
pause=document.getElementById('pause');
pause.addEventListener("click",Pause);
stop=document.getElementById('stop');
stop.addEventListener("click",Stop);
window.addEventListener("load",getAuthor)

// %%%%%%%%%%%%%%% La barre de progression interactive %%%%%%%%%%%%%%%%%%%%%

progressBar=document.getElementById('progress-bar')
progressBarIndicator=document.querySelector('#progress-bar div')

song.addEventListener('timeupdate', function () {
	percent = (100 / this.duration) * this.currentTime;
	progressBarIndicator.style.width = percent + '%';
});

progressBar.addEventListener('click',function(e){
	var x = e.pageX - this.offsetLeft
	xconvert = x/400 //A ajuster selon le width de #progress-bar dans le fichier style.css
	xconvert.toFixed(5)
	var temps = xconvert * song.duration
	song.currentTime = (xconvert * song.duration).toFixed(3)
})

// %%%%%%%%%%%%%%%%%%%% Changement de musique automatique %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

function nextTrack(artiste, album, music, image){
  //Fonction à appeler dans l'audio lors de l'évènement onEnded de la balise Audio
  // Prends l'artiste et l'album en arguments, cherche l'indice de la musique actuelle et changer la musique avec la piste d'indice égal à l'indice actuelle + 1 
  let L = getMusics(artiste, album)
  for (i = 0 ; i < L.length ; i++){
    if (L[i] == music) {
      addToPL(artiste, album, L[i], image)
    }
  }

}