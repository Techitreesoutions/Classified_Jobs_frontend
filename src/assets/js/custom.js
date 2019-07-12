function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("nav-res").style.opacity = "1";
  document.getElementById("cd-shadow-layer").style.display = "block";
  
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("nav-res").style.opacity = "0";
  document.getElementById("cd-shadow-layer").style.display = "none";  
  //$('#nav-res').hide().fadeIn('slow');
} 

$(document).ready(function(){ 
  $("#cd-shadow-layer").click(function(){
    //$("#cd-shadow-layer").addClass("display-none");
    closeNav(); 
  });
});