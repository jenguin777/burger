// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-devoured").on("click", function(event) {
      var id = $(this).data("id");
      var newDevoured = $(this).attr("data-newdevour");
      // Change state, you need it in quotes since it's a string
      if( newDevoured == 'false' ) {
          newDevoured = true;
      } else {
          newDevoured = false;
      }
      var newDevouredState = {
        id: id,
        devoured: newDevoured
      };
  
      // // Send the PUT request...had trouble with this...tried $.post and it worked
      // $.post("/api/update/burgers/", 
      // //   $.ajax("/api/burgers/" + id, {
      //   newDevouredState
      // ).then(
      //   function(response) {
      //     console.log("changed devoured to", newDevouredState);
      //    console.log(response ,"This is the response back");
      //     // Reload the page to get the updated list
      //     location.reload();
      //   }
      // );

      // Send the PUT request
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newDevouredState
      }).then(
        function(response) {
        console.log("changed devoured to", newDevouredState);
        console.log(response ,"This is the response back");
        // Reload the page to get the updated list
        location.reload();
      }
);





    });
  
    $(".create-form").on("submit", function(event) {
      // Make sure to preventDefault on a submit event.
      event.preventDefault();
      var newBurger;

      var enteredName =  $("#burger-id").val().trim();
      console.log("enteredName: " + enteredName);
      var enteredNameLength = $("#burger-id").val().length;
      console.log("enteredNameLength: " + enteredNameLength);

      // add client side validation for 1) not null and 2) > 35 chars - the database allows 35 as well
      if(enteredName === '' || enteredNameLength > 35) {

        // clear out the invalid value
        $("#burger-id").val("");
        // then display the alert message to the user
        alert("You must enter a name between 1 and 35 characters");
        // I thought that alert had an inherent return in it but apparently not...had to add this to prevent post from trying to enter a null name after clearing it out
        return;
      } else {

        // var newBurger = {    --used this when testing my server side validation, commented out client side validation for testing server side validation
          newBurger = {
            name: enteredName,
            devoured: 0
          };
      }

      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
});
  