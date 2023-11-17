// Node.js Server setup för gästbok.

let express = require("express"); // express
let app = express() // express
let port = 8080; // kör på port 8080
let fs = require("fs"); // fileserver
let bodyParser = require("body-parser"); // body-parser för json formatting


//Middlewears 
app.use(bodyParser.json()); // för att parse json format till body.
app.use(bodyParser.urlencoded({ extended: true })); // behövs för att processa data som skickats med POST
app.use(express.static("public")); // för att komma åt filer i public 
app.set("view engine", "ejs"); // använder mig av ejs för att kunna skriva ut javascript i html

let httpserver = app.listen(port, function() {
    console.log(`Webbservern körs på ${port}`);
});


//Routar mig till /views/index.html sidan
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
});


app.post("/", function (req, res) {
    console.log("Got a new post request!"); //loggar får en ny post request

    // Extrahera data från form submission.
    let name = req.body.name;
    let message = req.body.message;

    let newPost = { name, message }; // skapar ny post i objekt.

    // läser in data från posts.json om error logga error och skicka status code 500
    fs.readFile("posts.json", "utf-8", (err, data) => {
        if (err) {
            console.log(err);
            res.status(500).send("Internal Error");
            return;
        }

        // parse befintlig data inom arrayn.
        let posts = JSON.parse(data || '[]'); // om filen är tom så initiera med en tom array

        //Adderea ny post till arrayn
        posts.push(newPost); 
        
        //Skriver tillbaka den uppdaterade datan i rätt json format, om error loggas err, och vi skickar 500 statuskod hoppar ur, annars logga nya posten.
        fs.writeFile("posts.json", JSON.stringify(posts, null, 2),  (err) => {
            if (err) {
                console.log(err);
                res.status(500).send("Internal error");
                return;
            } else {
                console.log("New Post Added to Json-file", newPost); // Log the new post object
                res.send("New Post Added to Json-file");
            }
        });
    });
});

app.get("/", function(req, res) {

});