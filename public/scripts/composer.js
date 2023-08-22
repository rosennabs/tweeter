$(document).ready(function() {

  let lastScrollTop = 0;

  $(window).on("scroll", function () {
    let currentScrollTop = $(this).scrollTop();

    // Show/hide buttons based on scroll status
    if (currentScrollTop === lastScrollTop) {
      $("#toggle-up").css("display", "none");
      $("#compose-tweet-arrow").css("display", "block");
    } else {
      $("#toggle-up").css("display", "block");
      $("#compose-tweet-arrow").css("display", "none");
    }
  
  });

  // Scroll back to the top when clicked
  $("#toggle-up").on("click", function () {
    $(window).scrollTop(0);
    $(".new-tweet").slideDown("slow");
    $(".new-tweet").css("display", "block");
    
  });

});