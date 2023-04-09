let focusedLink = ""


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
  
  locked = true
  
  
  fetch('https://spicy-stirring-leptoceratops.glitch.me/video-info?url=https://www.youtube.com/watch?v=dQw4w9WgXcQ')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
  
  document.getElementById("loading-search").style.display = "block"
  setTimeout(function() {
    document.getElementById("loading-search").style.display = "none"
    locked = false
  }, 3000)
}


function convertClick() {
  let input_url = document.getElementById("url-link").value
  if( isValidYoutubeVideoLink(input_url)) {
    search_video(input_url)
    focusedLink = input_url
  }else{

     document.getElementById("input-div").classList.add("error-input-div")
    setTimeout(function() {
          document.getElementById("input-div").classList.remove("error-input-div")
    }, 2000)
  
  }
}

function downloadVideo(url) {
   // cria um link com a URL do vídeo
  const link = document.createElement("a");
  link.href = `https://spicy-stirring-leptoceratops.glitch.me/?url=${url}`;
  // adiciona a propriedade "download" para iniciar o download quando o usuário clicar no link
  link.download = "video.mp4";
  // simula o clique no link para iniciar o download
  link.click();
}

function downloadClick() {
  downloadVideo(focusedLink)
  console.log("Downloading video...")
}

