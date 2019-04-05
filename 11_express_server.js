const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs')

//Renvoie le JSON contenant les Artistes
app.get('/Documents/Music', function (req, res) {
  const payload = {
    artists: []
  }

  fs.readdir('Documents/Music/', function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        payload.artists.push({
          name: file
       })
       
    })
    console.log(payload)
    res.status(200).send(payload)
  })
}).use(express.static(path.join(__dirname + '/Documents/Music')));

//Renvoie le JSON contenant les Albums faits par l'Artiste concerne
app.get('/Documents/Music/:artist', function (req, res) {
  const artist = req.params.artist
  const payload = {
    albums: []
  }

  fs.readdir('Documents/Music/' + artist, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        payload.albums.push({
          name: file
       })
       
    })
    console.log(payload)
    res.status(200).send(payload)
  })
})

//Renvoie le JSON contenant les Titres de l'Album concerne
app.get('/Documents/Music/:artist/:album', function (req, res) {
  const artist = req.params.artist
  const album = req.params.album
  const payload = {
    titles: []
  }

  fs.readdir('Documents/Music/' + artist + '/' + album, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    //listing all files using forEach
    files.forEach(function (file) {
        // Do whatever you want to do with the file
        payload.titles.push({
          name: file
       })
       
    })
    console.log(payload)
    res.status(200).send(payload)
  })
})

//Renvoie le JSON contenant l'URL du Titre concerne
app.get('/Documents/Music/:artist/:album/:title', function (req, res) {
  const artist = req.params.artist
  const album = req.params.album
  const title = req.params.title
  const payload = {
    url : 'Documents/Music/' + artist + '/' + album + '/' + title
  }

  fs.readdir('Documents/Music/' + artist + '/' + album + '/' + title, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    res.status(200).send(payload)
  })
})

//Renvoie le JSON contenant l'URL de la Jaquette concerne
app.get('/Documents/images/:artist/:album/:image', function (req, res) {
  const artist = req.params.artist
  const album = req.params.album
  const image = req.params.image
  const payload = {
    url : 'Documents/images/' + artist + '/' + album + '/' + image
  }

  fs.readdir('Documents/images/' + artist + '/' + album + '/' + image, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    } 
    res.status(200).send(payload)
  })
})

//Renvoie un message type Error 404
app.get('/', function (req, res) {
  res.status(404).send('<h3>Désolé, le document demandé est introuvable...<h3>')
})

app.use('/', express.static(path.join(__dirname + '/Documents')))

app.get('/player', function(req,res){
  app.use('/', express.static(path.join(__dirname + '/Documents/Music')))
  res.status(200).sendFile(path.join(__dirname+'/music_player.html'))
})

app.listen(8080)