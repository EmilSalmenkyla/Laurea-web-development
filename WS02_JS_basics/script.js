console.log("Hello World!");
alert("Hello World!");
const name = "Emil";
let age = 22;
const favouriteAnimal = "Koira";

console.log(name, age, favouriteAnimal);

console.log("Hello! My name is " + name + " and my favourite animal is the " + favouriteAnimal + ".");
const userName = prompt("What is your name?");
console.log("Hello " + userName + "! Welcome to JavaScript.");
const userAge = prompt("How old are you?");

if (userAge >= 18) {
    console.log("You are an adult.");
} else {
    console.log("You are under 18.");
}
function greetUser(name) {
    console.log("Hello " + name + "!");
}

greetUser("Emil");
greetUser("Juho");
greetUser("Anna");

