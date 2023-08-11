/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];
 

/* Take an array of tweet objects and append each one to the #tweet-container.*/
function renderTweets(tweetData) {
  for (let tweet of tweetData) {
    const tweetArticle = createTweetElement(tweet);
    $('#tweet-container').append(tweetArticle);
  }
};


/* Take a tweet object and return a tweet <article> containing the entire HTML structure of the tweet.*/
function createTweetElement(tweetData) {
  const tweetArticle = `
    <article>
      <header>
        <div class="icon-name">
          <p> <img src= "${tweetData.user.avatars}"/> </p>
          <p> ${tweetData.user.name} </p>
        </div>
        <p class="handle"> ${tweetData.user.handle} </p> 
      </header>

      <p> <h4>${tweetData.content.text}</h4> </p>
      <hr>
      <footer>
        <p> ${tweetData.created_at} <span class="tweet-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
        </span> </p>
      </footer>
    </article>`;
  return tweetArticle;
};

$(document).ready(() => {
  renderTweets(tweetData);
});
