function openImg(src) {
  document.getElementById("overlay").style.display = "flex";
  document.getElementById("overlayImg").src = src;
}

function closeImg() {
  document.getElementById("overlay").style.display = "none";
}