function init() {
    document.getElementById("scrollBtn").addEventListener("click", scrollToDiv);
  }
  
  function scrollToDiv() {
    document.getElementById("image-container").scrollIntoView({ behavior: 'smooth' });
  }
  
  window.onload = init;
 /*
  function scrollToTop() {
    let scrollToTopButton = document.getElementById("scrollToTopButton");
   
     scrollToTopButton.addEventListener("click", function() {
       window.scrollTo({
         top: 0,
         behavior: "smooth"
       });
     });
}
*/

function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
  
  window.addEventListener("scroll", function() {
    let scrollToTopButton = document.getElementById("scrollToTopButton");
    if (window.pageYOffset > 30) {
      scrollToTopButton.style.display = "block";
    } else {
      scrollToTopButton.style.display = "none";
    }
  });


function scrollToDiv() {
    document.getElementById("attractionMenu").scrollIntoView({ behavior: 'smooth' });
  }
  