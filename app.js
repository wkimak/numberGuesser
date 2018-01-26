// variable declaration
const input = document.getElementById('input');
const btn = document.getElementById('btn');
const container = document.getElementById('main');

// Counter variables
let count = 0;
let playedAgain = false;
let numsArray = [];


/* ----------- Plan ----------- */
// 1.) One event handler for Button
// 2.) Need to generate a random whole number between 1 and 10/ store in variable
// 3.) Need to figure out how many times button has been clicked
// 4.) Function to Handle error
// 5.) After 3 clicks, change Button textContent to "Play Again"


//Submit Button event handler
btn.addEventListener('click', function(){
	if(btn.getAttribute("value") == "Submit"){
		startGenerator();
	} else if(btn.getAttribute("value") == "Play Again"){
		playAgain();
	}
});


let p = document.createElement('p');
p.style.textAlign = "center";
container.appendChild(p);

function message(decision, value, counter){


switch(true){

case decision == "correct":
    p.innerHTML = "You guessed correct!";
    p.style.color = "green";
    p.style.fontSize = "18px";
    break;
case decision == "gameOver":
    p.innerHTML = "Game Over";
	p.style.color = "red";
	p.style.fontSize = "18px";
	break;
case decision == "wrong":
	p.innerHTML = value + " is not correct. You have " + (2-counter) + " guesses left.";
    p.style.color = "black";
	p.style.fontSize = "14px";
	break;
case decision == "insertNumber":
    p.innerHTML = "Please insert number";
    p.style.color = "red";
    p.style.fontSize = "18px";
    break;
case decision == "notInRange":
    p.innerHTML = "Number must be between 0 and 10!";
    p.style.color = "red";
    p.style.fontSize = "14px";
    break;
default:
    p.innerHTML = "";
    break;        	
}

}


function startGenerator(){

let value = input.value;
console.log(playedAgain);
if(value != '' && value <= 10 && value >=0){	
    generateAnswer(count);
    count++;
} else if(value == ''){
	message("insertNumber");
} else if(value < 0 || value > 10){
	message("notInRange");
}
}


function generateAnswer(count){
if(count == 0){
var nextRandom = Math.floor(Math.random()*10)+1; 
numsArray.push(nextRandom);
testValue(numsArray[numsArray.length-1], count);
} else{	
testValue(numsArray[numsArray.length-1], count);
}
}


function testValue(answer, counter){
    let value = parseInt(input.value);
    if(count == 2 && value != answer){
    	message("gameOver");
    	btn.setAttribute("value", "Play Again");
    	input.disabled = true;
    }else if(value === answer){
		message("correct");
		btn.setAttribute("value", "Play Again");
		input.disabled = true;
	} else if(value != answer){
        message("wrong", value, counter);
	} 
}


function playAgain(){
	count = 0;
    btn.setAttribute("value", "Submit");
    input.disabled = false;
	input.value= "";
	playedAgain = true;
	
	startGenerator();
}


