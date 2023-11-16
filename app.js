// Node.js Server setup för gästbok.

let express = require("express");
let app = express()
let port = 8080; // kör på port 8080


let httpserver = app.listen(port, function() {
    console.log(`Webbservern körs på ${port}`);
});

//Routar mig till /views/index.html sidan
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/views/index.html")
});

