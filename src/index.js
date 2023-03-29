const baseUrl = "http://localhost:3000";

document.addEventListener("DOMContentLoaded", () => {
    loadMenu();
    addRamen();
    updateRamen();
});

function loadMenu() {
    fetch(baseUrl + "/ramens")
        .then((res) => res.json())
        .then((ramens) => {
            displayRamen(ramens)
        })
}

// takes in an array of ramen objects and displays its properties on page
function displayRamen(ramens) {
    let menu = document.getElementById("ramen-menu");
    let detailImg = document.querySelector("#ramen-detail img")
    let name = document.querySelector("#ramen-detail h2")
    let restaurant = document.querySelector("#ramen-detail h3")
    let rating = document.getElementById("rating-display")
    let comment = document.getElementById("comment-display")

    // display first ramen on initial load
    detailImg.src = ramens[0].image;
    name.textContent = ramens[0].name;
    restaurant.textContent = ramens[0].restaurant;
    rating.textContent = ramens[0].rating;
    comment.textContent = ramens[0].comment;

    ramens.forEach((ramen) => {
        let menuImg = document.createElement("img")
        menuImg.src = ramen.image
        menu.appendChild(menuImg)

        menuImg.addEventListener("click", () => {
            detailImg.src = ramen.image;
            name.textContent = ramen.name;
            restaurant.textContent = ramen.restaurant;
            rating.textContent = ramen.rating;
            comment.textContent = ramen.comment;
        });
    })
}

// queries for input values from new ramen form and adds new ramen object to display
function addRamen() {
    let form = document.getElementById("new-ramen");
    let newName = document.getElementById("new-name");
    let newRestaurant = document.getElementById("new-restaurant");
    let newImage = document.getElementById("new-image");
    let newRating = document.getElementById("new-rating");
    let newComment = document.getElementById("new-comment");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        let newRamen = [{
            "name": newName.value,
            "restaurant": newRestaurant.value,
            "image": newImage.value,
            "rating": newRating.value,
            "comment": newComment.value
        }]
        displayRamen(newRamen);
        form.reset();
    });
}

// updates rating & comment for ramen displayed but does not persist when new ramen is selected
function updateRamen() {
    let form = document.getElementById("edit-ramen");
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        let editedRating = document.getElementById("edit-rating");
        let editedComment = document.getElementById("edit-comment");
        let rating = document.getElementById("rating-display");
        let comment = document.getElementById("comment-display");

        rating.textContent = editedRating.value;
        comment.textContent = editedComment.value;

        form.reset();
    });
}

