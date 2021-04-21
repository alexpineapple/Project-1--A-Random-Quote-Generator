/******************************************
Treehouse FSJS Techdegree:
project 1 - A Random Quote Generator
******************************************/

// For assistance:
  // Check the "Project Resources" section of the project instructions
  // Reach out in your Slack community - https://treehouse-fsjs-102.slack.com/app_redirect?channel=chit-chat

/***
 * `quotes` array - holds all the quote objects
***/
const quotes = [
  {
    quote: "Hello There.",
    source: "Obi Wan Kenobi", year: "19 BBY", location:"Utapau", citation: "Star Wars:Episode 3 Revenge of the Sith"
  },
  {
    quote: "Is it possible to learn this power?",
    source: "Anakin Skywalker", year: "19 BBY", location:"Coruscant", citation: "Star Wars:Episode 3 Revenge of the Sith"
  },
  {
    quote: "Did you ever hear the Tragedy of Darth Plagueis the wise? I thought not. It's not a story the Jedi would tell you. It's a Sith legend. Darth Plagueis was a Dark Lord of the Sith, so powerful and so wise he could use the Force to influence the midichlorians to create life... He had such a knowledge of the dark side that he could even keep the ones he cared about from dying. The dark side of the Force is a pathway to many abilities some consider to be unnatural. He became so powerful... the only thing he was afraid of was losing his power, which eventually, of course, he did. Unfortunately, he taught his apprentice everything he knew, then his apprentice killed him in his sleep. It's ironic he could save others from death, but not himself.",
    source: "Sheev Palpatine", year: "19 BBY", location:"Coruscant", citation: "Star Wars:Episode 3 Revenge of the Sith"
  },
  {
    quote: "There’s Always A Bigger Fish.",
    source: "Qui-Gon Jin", year: "32 BBY", location:"Naboo", citation: "Star Wars:Episode 1 The Phantom Menace"
  },
  {
    quote: "Fear is the path to the Dark Side. Fear leads to anger. Anger leads to hate. Hate, leads to suffering.",
    source: "Master Yoda", year: "32 BBY", location:"Coruscant", citation: "Star Wars:Episode 1 The Phantom Menace"
  },
  {
    quote: "I don't like sand. It's coarse and rough and irritating and it gets everywhere. Not like here. Here everything is soft and smooth.",
    source: "Anakin Skywalker", year: "22 BBY", location:"Naboo", citation: "Star Wars:Episode 2 Attack of the Clones"
  },
  {
    quote: "I killed them, I killed them all. There dead. Every single one of them. But not just the men, but the women, and the children too. There like animals! And I slaughtered theme like animals! I hate them!",
    source: "Anakin Skywalker", year: "22 BBY", location:"Tatooine", citation: "Star Wars:Episode 2 Attack of the Clones"
  },
  {
    quote: "I'm just a simple man, trying to make my way in the universe.",
    source: "Jango Fett", year: "22 BBY", location:"Kamino", citation: "Star Wars:Episode 2 Attack of the Clones"
  }
]

var previousIndex = 0;
var randomIndex;

/***
 * `getRandomQuote` function
***/
function randomNumberBetween(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower
}
function getRandomQuote(){
  //get a random index
  randomIndex = randomNumberBetween(0, (quotes.length -1))
  //prevents repeated quotes if index matches previous
  while (randomIndex === previousIndex){
    randomIndex = randomNumberBetween(0, (quotes.length -1))
  }
  //set previous index
  previousIndex = randomIndex;
  return quotes[randomIndex];
}

/***
 * `printQuote` function
***/
function printQuote(){
  var ramdomQuote = getRandomQuote();
  var htmlOutput = `<p class="quote">${ramdomQuote.quote}</p>
                    <p class="source">${ramdomQuote.source}`;

  if (ramdomQuote.citation){
    htmlOutput += `<span class="citation">${ramdomQuote.citation}</span>`
  }
  if (ramdomQuote.location){
    htmlOutput += `<span class="location">${ramdomQuote.location}</span>`
  }
  if (ramdomQuote.year){
    htmlOutput += `<span class="year">${ramdomQuote.year}</span>`
  }

  htmlOutput += `</p>`
  //update web page
  document.getElementById('quote-box').innerHTML = htmlOutput;
  //update background color
  document.body.style.backgroundColor = `rgb(${randomNumberBetween(0,255)}, ${randomNumberBetween(0,255)}, ${randomNumberBetween(0,255)})`;
  return htmlOutput;
}


//set the interval to automatically refresh quotes every 5 seconds
setInterval(printQuote,5000);

/***
 * click event listener for the print quote button
 * DO NOT CHANGE THE CODE BELOW!!
***/

document.getElementById('load-quote').addEventListener("click", printQuote, false);
