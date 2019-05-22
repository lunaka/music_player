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
    console.log('-------------------------->'+data);
    test = document.getElementById('getAuthor');
    S = "";
    for (i=0; i<data.artists.length; i++){
      S = S + "<button class='but' id='"+data.artists[i].name+"' onClick="+ '"'+"getAlbums('" + data.artists[i].name + "')"+'">' + data.artists[i].name+'</button>'+'<br></br>'
    }
    test.innerHTML = S
    console.log(S)
    console.log('FIN DO GET AUTHOR');
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
    console.log(S)
    console.log('FIN DO GET ALBUMS');
  });
}

//Fonction affichant la liste des pistes de l'album album de l'auteur author sélectionné présents dans le dossier 'Documents/Music/author/album'
function getMusics(author,album){
  console.log('Documents/Music/'+author+'/'+album);

  $.get('Documents/Music/'+author+'/'+album, function(data, status){
    test = document.getElementById('getMusics');
    var last = data.titles.length;
    S = ""
    for (i=0; i<data.titles.length-1; i++){
      
      S = S + '<button id="'+data.titles[i].name+'" '+ "class='but' " + 'onClick="'+"addToPL('" +author +"','"+album+"','"+data.titles[i].name+"','"+data.titles[last-1].name +"'"+')">' + data.titles[i].name+"</button>" + '<br></br>'
    
    } 
    test.innerHTML = S
    console.log('FIN DO GET MUSICS');
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
  console.log('Documents/Music/'+author+'/'+album+'/'+image);
  images.setAttribute('src','Music/'+author+'/'+album+'/'+image);
  playMusic(author,album,music);
}

//Fonction qui ajoute une musique à la playlist
function addToPL(author, album, music, image){
  ChangerPiste(author, album, music, image);
  playlist.push(music);
  S='';
  for (i=0; i<playlist.length; i++){
    S = S + '<li id="'+playlist[i]+'">' + playlist[i] +
    '<button class="remove" id="'+playlist[i]+'" onClick="'+"removeFromPL('" +playlist +"','"+i+"'"+')">'+
    '<i class="fa fa-trash"></i>'+
    '</button>'+ '</li>' ;
  }
  document.getElementById('playList').innerHTML = S
}

//Fonction qui retire une musique de la playlist
function removeFromPL(playlist, index){
  console.log('song = ' + playlist[index]);
  console.log('playlist = ' + playlist);
  console.log('index = ' + index);
  S='';
  for (i=0; i<playlist.length; i++){
    if (i!=index){
      S = S + '<li id="'+playlist[i]+'">' + playlist[i] +
    '<button class="remove" id="'+playlist[i]+'" onClick="'+"removeFromPL('" +playlist +"','"+i+"'"+')">'
    '<i class="fa fa-trash"></i>'+
    '</button>'+ '</li>';
    }
  }
  document.getElementById('playList').innerHTML = S
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