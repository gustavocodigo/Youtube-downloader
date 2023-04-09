function isValidYoutubeVideoLink(link) {
  // Expressão regular para validar um link de vídeo do YouTube
  var regex = /^(https?\:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9\-_]{11})$/

  // Verifica se o link corresponde ao padrão da expressão regular
  return regex.test(link)
}












let locked = false

function search_video(url)
{
  if (locked) return
  if ( isValidYoutubeVideoLink(url)) {
  locked = true
  document.getElementById("loading-search").style.display = "block"
  
  
  setTimeout(function() {
    document.getElementById("loading-search").style.display = "none"
    locked = false
  }, 3000)
  }else{
    alert("Error invalid youtbe link")
  }
}


function convertClick() 