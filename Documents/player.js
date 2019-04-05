var path='Documents/Music/TheFatRat/Jackpot/';

var playlist = [];

song=document.getElementById('audio');

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

function playMusic(author, album, music){
    song=document.getElementById('audio');
    song.setAttribute('src','Music/'+author+'/'+album+'/'+music);
    document.getElementById('music_name').innerHTML = music;
}

function ChangerPiste(author, album, music, image){
  images=document.getElementById('Jacquette');
  console.log('Documents/Music/'+author+'/'+album+'/'+image);
  images.setAttribute('src','Music/'+author+'/'+album+'/'+image);
  song=document.getElementById('audio');
  song.setAttribute('src','Music/'+author+'/'+album+'/'+music);
  document.getElementById('music_name').innerHTML = music;
}

function addToPL(author, album, music, image){
 ChangerPiste(author, album, music, image);
  playlist.push(music);
  S='';
  for (i=0; i<playlist.length; i++){
    S = S + '<li id="'+playlist[i]+'">' + playlist[i] +
    '<button class="remove" id="'+playlist[i]+'" onClick="'+"removeFromPL('" +playlist +"','"+playlist[i]+"'"+')">'+
    '<i class="fa fa-trash"></i>'+
    '</button>'+ '</li>' ;
  }
  document.getElementById('playList').innerHTML = S
}

function removeFromPL(playlist, song){
    var index = playlist.indexOf(song);
    console.log('song = ' + song);
    console.log('playlist = ' + playlist);
    console.log('index = ' + index);
    if (index > -1) {
        playlist.splice(index, 1);
    }
    S='';
    for (i=0; i<playlist.length; i++){
        S = S + '<div id="'+playlist[i]+'">' + playlist[i] +
        '<button class="remove" id="'+playlist[i]+'" onClick="'+"removeFromPL('" +playlist +"','"+playlist[i]+"'"+')">'
        '<i class="fa fa-trash"></i>'+
        '</button>'+ '</div>';
    }
    document.getElementById('playList').innerHTML = S
}

play=document.getElementById('play');
play.addEventListener("click",Lecture);
pause=document.getElementById('pause');
pause.addEventListener("click",Pause);
stop=document.getElementById('stop');
stop.addEventListener("click",Stop);
window.addEventListener("load",getAuthor)