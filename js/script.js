function init() {
    document.getElementById("scrollBtn1").addEventListener("click", scrollToDiv);
    document.getElementById("scrollBtn2").addEventListener("click", scrollToDiv2);
    document.getElementById("scrollBtn3").addEventListener("click", scrollToDiv3);
    document.getElementById("scrollBtn4").addEventListener("click", scrollToDiv4);
  }
    window.onload = init;
  function scrollToDiv() {
    document.getElementById("kronoberg").scrollIntoView({ behavior: 'smooth' });
    
  }
  
function scrollToDiv2() {
    document.getElementById("kalmar").scrollIntoView({ behavior: 'smooth' });
    
  }

  function scrollToDiv3() {
    document.getElementById("jönköping").scrollIntoView({ behavior: 'smooth' });
    
  }

  function scrollToDiv4() {
    document.getElementById("öland").scrollIntoView({ behavior: 'smooth' });
    
  }