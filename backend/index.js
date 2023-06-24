// Levantando el servidor
const express = require('express');
const app = express();
const fs = require('fs');

app.listen(3000, console.log("¡Servidor encendido!"));
app.use(express.json())
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

// Leyendo canciones.json
app.get('/canciones', (req, res) => {
    const songs = JSON.parse(fs.readFileSync("canciones.json"));
    res.json(songs);
});

// Creando canciones.json
app.post('/canciones', (req, res) => {
    const song = req.body;
    const songs = JSON.parse(fs.readFileSync("canciones.json"));
    songs.push(song);
    fs.writeFileSync("canciones.json", JSON.stringify(songs));
    res.status(201).send("Canción agregada con éxito!");
});

// Borrando canciones.json
app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const songs = JSON.parse(fs.readFileSync("canciones.json"));
    const index = songs.findIndex(cancion => cancion.id == id);
    songs.splice(index, 1);
    fs.writeFileSync("canciones.json", JSON.stringify(songs));
    res.status(200).send("Canción eliminada con éxito");
});

// Actualizando canciones.json
app.put('/canciones/:id', (req, res) => {
    const { id } = req.params;
    const song = req.body;
    const songs = JSON.parse(fs.readFileSync("canciones.json"));
    const index = songs.findIndex(cancion => cancion.id == id);
    songs[index] = song;
    fs.writeFileSync("canciones.json", JSON.stringify(songs));
    res.status(200).send("Canción actualizada con éxito");
});