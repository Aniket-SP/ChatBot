
$(document).ready(function() {
  // Make AJAX request to check cookies and validate tokens
  $.ajax({
    url: "/check_cookies",
    method: "GET",
    dataType: "json",
    success: function(response) {
      // Handle the response
      if (response.valid) {
        // Cookies and tokens are valid, proceed with chat functionality
        console.log(response.valid);
        // Your chat logic here
      }
      // else {
//        // Cookies or tokens are invalid, display an error message and redirect to login page
//        console.log("Invalid cookies or tokens");
//        const errorMessage = "Your session has expired. Please login again.";
//        // Display error message'
//        $('#error-message').text(errorMessage).show();
//        // Redirect to login page after 5 seconds'
//        window.location.href = '/';
////        setTimeout(function() {
////          window.location.href = '/err_login';
////        }, 5000);
//      }
    },
    error: function() {
      // Error occurred while making the AJAX request
      console.log("Error occurred while checking cookies");
      const errorMessage = "Your session has expired. Please login again.";
        // Display error message'
      $('#error-message').text(errorMessage).show();
      window.location.href = '/';
    }
  });
});