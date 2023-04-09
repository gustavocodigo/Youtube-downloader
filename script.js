let locked = false

function search_video(url)
{
  if (locked) return
  locked = true
  document.getElementById("loading-search").style.display = "block"
  
  
  setTimeout(function() {
    document.getElementById("loading-search").style.display = "none"
    locked = false
  }, 3000)
}