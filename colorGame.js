const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.querySelector("#message");
const h1 = document.querySelector("h1");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");
let numSquares = 6;
let colors = [];
let pickedColor;

init();

function init(){
    //mode buttons event listeners
    setupModeButtons();
    setUpSquares();
    reset();
}

function setupModeButtons(){
    for(let i = 0; i < modeButtons.length; i++){
        modeButtons[i].addEventListener("click", function(){
            modeButtons[0].classList.remove("selected");
            modeButtons[1].classList.remove("selected");
            this.classList.add("selected");
            //a ternary operator is used below in place of an if statement
            this.textContent === "Easy" ? numSquares = 3: numSquares = 6;
            //if(this.textContent === "Easy"){
            //    numSquares = 3;
            //} else {
            //    numSquares = 6;
            //}
            reset();
        });
    }
}

function setUpSquares(){
    for(let i = 0; i < squares.length; i++){
        //add click listeners to squares
        squares[i].addEventListener("click", function(){
            //grab color of clicked square
            let clickedColor = this.style.backgroundColor;
            //compare color to pickedColor
            if(clickedColor === pickedColor){
                messageDisplay.textContent = "Correct!";
                resetButton.textContent = "Play Again?";
                changeColors(clickedColor);
                h1.style.background = clickedColor; 
            } else {
                this.style.backgroundColor = "#121212";
                messageDisplay.textContent = "Try Again";
            }
        });
    }
}

function reset(){
    colors = generateRandomColors(numSquares);
    //pick a new random color from arr
    pickedColor = pickColor();
    //change color display to match picked color
    colorDisplay.textContent = pickedColor;
    //change from 'play again?' to 'new colors'
    resetButton.textContent = "New Colors";
    //change message display
    messageDisplay.textContent = "";
    //change colors of squares
    for(let i = 0; i < squares.length; i++){
        if(colors[i]){
        squares[i].style.display = "block";
        squares[i].style.backgroundColor = colors[i];
    } else {
        squares[i].style.display = "none";
    }
}
    h1.style.backgroundColor = "#4F5D75";
}

resetButton.addEventListener("click", function(){
    reset();
})

function changeColors(color){
    //loop through all squares
    for(let i = 0; i < squares.length; i++){
    //change each color to match a given color
    squares[i].style.backgroundColor = color;
    }
}

function pickColor(){
    let random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num){
    //make an array
    let arr = []
    //repeat num times
    for(let i = 0; i < num; i++){
        //get random color and push into arr
        arr.push(randomColor())
    }
    //return that array
    return arr;
}

function randomColor(){
    //pick a "red" from 0-255
    let r = Math.floor(Math.random() * 256);
    //pick a "green" from 0-255
    let g = Math.floor(Math.random() * 256);
    //pick a "blue" from 0-255
    let b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}