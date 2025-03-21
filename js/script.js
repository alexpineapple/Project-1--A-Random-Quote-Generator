/******************************************
 * Random Quote Generator - Enhanced
******************************************/

import quotes from "./quotes.js";

/* 
  We'll store the last displayed quote text & source
  so we can tweet them. 
*/
let currentQuoteText = "";
let currentQuoteSource = "";

/* Timer variables */
let previousIndex = 0;
let randomIndex;
let timeLeft = 5;
let countdownIntervalId;
let quoteTimeoutId;

/***
 * Returns a random integer between `lower` and `upper` (inclusive)
***/
function randomNumberBetween(lower, upper) {
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

/***
 * Returns a random quote from `quotes`, ensuring we don't repeat the last one
***/
function getRandomQuote() {
  randomIndex = randomNumberBetween(0, quotes.length - 1);
  while (randomIndex === previousIndex) {
    randomIndex = randomNumberBetween(0, quotes.length - 1);
  }
  previousIndex = randomIndex;
  return quotes[randomIndex];
}

/***
 * Update the countdown display in HTML
***/
function updateCountdownDisplay() {
  document.getElementById("countdown").textContent = timeLeft;
}

/***
 * Start or restart timers:
 *   1) 1-second interval to decrement timeLeft
 *   2) timeLeft-second timeout to call printQuote()
***/
function startTimers() {
  clearTimers();     // clear existing timers
  updateCountdownDisplay(); // show correct time initially

  countdownIntervalId = setInterval(() => {
    timeLeft--;
    updateCountdownDisplay();
    if (timeLeft <= 0) {
      printQuote();
    }
  }, 1000);

  quoteTimeoutId = setTimeout(() => {
    printQuote();
  }, timeLeft * 1000);
}

/***
 * Clear both countdown & quote timeout
***/
function clearTimers() {
  clearInterval(countdownIntervalId);
  clearTimeout(quoteTimeoutId);
}

/***
 * Generate a random "darker" background color
 * so white text remains readable
***/
function getDarkerBackgroundColor() {
  const r = randomNumberBetween(0, 150);
  const g = randomNumberBetween(0, 150);
  const b = randomNumberBetween(0, 150);
  return `rgb(${r}, ${g}, ${b})`;
}

/***
 * Print a new quote, update background, reset timers
***/
function printQuote() {
  const randomQuote = getRandomQuote();
  
  // Build the HTML text
  let htmlOutput = `
    <p class="quote">${randomQuote.quote}</p>
    <p class="source">${randomQuote.source}
  `;
  if (randomQuote.citation) {
    htmlOutput += `<span class="citation">${randomQuote.citation}</span>`;
  }
  if (randomQuote.location) {
    htmlOutput += `<span class="location">${randomQuote.location}</span>`;
  }
  if (randomQuote.year) {
    htmlOutput += `<span class="year">${randomQuote.year}</span>`;
  }
  // If a gif property exists, add an <img> tag
  if (randomQuote.gif) {
    // Optionally wrap <img> in a container if you prefer styling
    htmlOutput += `
      <div class="gif-container">
        <img src="${randomQuote.gif}" alt="Star Wars GIF" class="quote-gif">
      </div>
    `;
  }
  htmlOutput += `</p>`;

  // Update the quote-box
  document.getElementById("quote-box").innerHTML = htmlOutput;

  // Save the text & source for tweeting
  currentQuoteText = randomQuote.quote;
  currentQuoteSource = randomQuote.source || "";

  // Update the background to a darker RGB
  document.body.style.backgroundColor = getDarkerBackgroundColor();

  // Reset the countdown to 5 seconds
  timeLeft = 5;
  startTimers();
}

/***
 * Freeze (pause) the countdown. Called on mouseover.
***/
function freezeTimer() {
  // Stop intervals/timeouts
  clearTimers();
  // Add "paused" class to .container for the glow
  document.querySelector(".container").classList.add("paused");
}

/***
 * Resume from the point it was paused. Called on mouseleave.
***/
function resumeTimer() {
  // Remove "paused" class
  document.querySelector(".container").classList.remove("paused");
  // Re-start the timers from the current `timeLeft`
  startTimers();
}

/***
 * Tweet the current quote in a new tab
***/
function tweetQuote() {
  // Format: "Quote text" -- Source
  // URL-encode the text
  const textToTweet = encodeURIComponent(`"${currentQuoteText}" — ${currentQuoteSource}`);
  // Compose the Twitter share link
  const twitterURL = `https://twitter.com/intent/tweet?text=${textToTweet}`;
  // Open in a new tab
  window.open(twitterURL, "_blank");
}

/***
 * Set up event listeners
***/

// Button to show another quote
document.getElementById("load-quote").addEventListener("click", printQuote);

// Button to tweet the quote
document.getElementById("tweet-quote").addEventListener("click", tweetQuote);

// Hover over quote box -> freeze
document.getElementById("quote-box").addEventListener("mouseover", freezeTimer);
document.getElementById("quote-box").addEventListener("mouseleave", resumeTimer);

/***
 * Initial setup
***/
printQuote();
