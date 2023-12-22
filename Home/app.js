var modal = document.getElementById("myModal");

var btn = document.getElementById("myBtn");

var closeBtn = document.getElementById("close");


btn.addEventListener( "click", function() {
  modal.style.display = "block";
  console.log("clicked to open modal")
})

closeBtn.onclick = function() {
  modal.style.display = "none";
}
console.log("hello")
//modal.onclick = function(event) {
 // if (event.target == modal) {
   // modal.style.display = "block";
  //}
//}