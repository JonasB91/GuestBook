//index.js för index.html för att fetcha posts data.

//const { response } = require("express");

function fetchPosts() {
    fetch("/posts")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            updatePage(data.posts)
        })
        .catch(error => {
            console.error("Error fetching posts", error)
        });
}

// function för att uppdatera sidan med posts data.
function updatePage(posts) {
    console.log(posts);
    let postList = document.getElementById("postList"); // hämtar postList elementet i index.html
        postList.innerHTML = ""; // rensar nuvarande content

        posts.forEach(post => {
            let postDiv = document.createElement("div");
            postDiv.className = "post";
            postDiv.style.border = "1px solid white";

            let nameHeader = document.createElement("h3");
            nameHeader.textContent = post.name;

            let messageParagraph = document.createElement("p");
            messageParagraph.textContent = post.message;

            postDiv.appendChild(nameHeader);
            postDiv.appendChild(messageParagraph);
            postList.appendChild(postDiv);
        });
    }

    window.onload = () => {
        fetchPosts();
    }