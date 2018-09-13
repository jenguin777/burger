// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
    $(".change-devoured").on("click", function(event) {
      var id = $(this).data("id");
      var newDevoured = $(this).attr("data-newdevour");
      // Change state
      if( newDevoured == 'false' ) {
          newDevoured = true;
      } else {
          newDevoured = false;
      }
      var newDevouredState = {
        id: id,
        devoured: newDevoured
      };
  
      // Send the PUT request.
      $.post("/api/update/burgers/", 
    //   $.ajax("/api/burgers/" + id, {
        newDevouredState
       
      ).then(
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

      // trying to implement not null validation
  //     if( !this.value ) {
  //       $(this).parents('p').alert("You must enter a value");
  // }   else {

  //     var newBurger = {
  //       name: $("#burger-id").val().trim(),
  //       devoured: 0
  //     };
  //   }
        

      var newBurger = {
          name: $("#burger-id").val().trim(),
          devoured: 0
      };

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
  