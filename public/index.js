//index.js för index.html för att fetcha posts data.

//const { response } = require("express");

function fetchPosts() {
    fetch("/post")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updatePage(data.posts)
        })
        .catch(error => {
            console.error("Error fetching posts", error);
        });
}

// function för att uppdatera sidan med posts data.
function updatePage(posts) {
    console.log(posts);
    let postList = document.getElementById("postList"); // hämtar postList elementet i index.html
        postList.innerHTML = ""; // rensar nuvarande content

        posts.reverse().forEach(post => { // loopar för varje post så callbackfunction vi skapar nya elements för varje objekt från json filen.
            let postDiv = document.createElement("div");
            postDiv.className = "post";
            postDiv.style.border = "1px solid white";
            postDiv.style.borderRadius = "20px"
            postDiv.style.textAlign = "center";
            postDiv.style.marginTop = "10px";

            // Skapar nya elements för varje formulär element, 
            let nameHeader = document.createElement("h2");
            nameHeader.textContent = post.name;

            let emailParagraph = document.createElement("p");
            emailParagraph.textContent = "email" + post.email;

            let messageParagraph = document.createElement("p");
            messageParagraph.textContent = post.message;

            // appendar 
            postDiv.appendChild(nameHeader);
            postDiv.appendChild(emailParagraph);
            postDiv.appendChild(messageParagraph);
            postList.appendChild(postDiv);
            
        });
    }


    window.onload = () => {
        fetchPosts();
    }