$(document).ready(function() {
  $('#tweet-text').on('input', function () {
    const charLimit = 140;
    const inputLength = $(this).val().length;
    const characterLeft = charLimit - inputLength;

    //Target the counter in the new-tweet class section.
    const $counter = $(this).closest('.new-tweet').find('.counter');

    //Update the counter
    $counter.text(characterLeft);

    // Add or remove the "invalid" class based on the character left
    if (characterLeft < 0) {
      $counter.addClass('invalid');
    } else {
      $counter.removeClass('invalid');

      $('.new-tweet button').on('click', (event) => { // Reset counter to 140 after submission
        $counter.text(charLimit);
      });
    }
    
  });


});
