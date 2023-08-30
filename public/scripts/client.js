/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */



/* Take an array of tweet objects and append each one to the #tweet-container.*/
function renderTweets(tweetData) {
  for (let tweet of tweetData) {
    const tweetArticle = createTweetElement(tweet);
    $('#tweet-container').prepend(tweetArticle);
  }
};


/* Take a tweet object and return a tweet <article> containing the entire HTML structure of the tweet.*/
function createTweetElement(tweetData) {

  const timePassed = timeago.format(tweetData.created_at, 'en_CA');

  const tweetArticle = `
    <article>
      <header>
        <div class="icon-name">
          <p> <img src= "${tweetData.user.avatars}"/> </p>
          <p> ${tweetData.user.name} </p>
        </div>
        <p class="handle"> ${tweetData.user.handle} </p> 
      </header>

      <p> <h4>${escape(tweetData.content.text)}</h4> </p>
      <hr>
      <footer>
        <p> ${timePassed} <span class="tweet-icons">
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
        </span> </p>
      </footer>
    </article>`;
  return tweetArticle;
};


$(document).ready(function () {
  
  $("#compose-tweet-arrow").on('click', () => { //only display the tweet form when the arrow button is clicked
    $(".new-tweet").slideDown("slow");
    $(".new-tweet").css("display", "block");
  
    const $submitTweet = $('.new-tweet');

    $submitTweet.on('submit', (event) => { // Using JQuery, add an event listener to prevent default page reload behaviour
      
      event.preventDefault();
      

      const lengthOfTweet = $("#tweet-text").val().length;
      const charLimit = 140;

      if (lengthOfTweet !== 0 && lengthOfTweet <= charLimit) {
       
        //Any existing error slides up if condition is met
        $("#error-message").slideUp();


        const $tweet = $('#tweet-text').serialize(); //turn the form data into a query string

        $.ajax({ //use ajax to send the POST request to the server endpoint /tweets
          type: "POST",
          url: "http://localhost:8080/tweets",
          data: $tweet,
          success: function (response) {
            console.log("Success:", response);

            // Load the latest tweets after successfully posting
            loadTweets();

            //Reset counter to 140 after successful submission
            $('.counter').text(charLimit);

          },

          error: function (xhr, status, error) {
            console.log("Error:", error);
          }
        });

        $("#tweet-text").val(''); // Clear the form after submission
        

      } else if (lengthOfTweet === 0) {
        $("#error-message")
          .text("⛔️ Tweet cannot be empty!")
          .slideDown();
        $("#error-message").css("display", "block");

      } else if (lengthOfTweet > charLimit) {
        $("#error-message")
          .text("⛔️ Tweet exceeds character limit!")
          .slideDown();
        $("#error-message").css("display", "block");
      }
      
      
  });

});


  function loadTweets() {
    $.ajax({ //use ajax to send the GET tweets from /tweets page
      type: "GET",
      url: "http://localhost:8080/tweets",
      success: function (response) {
        console.log("Success: tweets loaded", response);
        renderTweets(response);
      },
      error: function (xhr, status, error) {
        console.log("Error: tweets not loaded", error);
      }
    });
    
  };
  
  loadTweets()

});

//Prevent cross-site scripting with escaping
const escape = function (str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};