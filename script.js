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
  
  
  fetch('https://spicy-stirring-leptoceratops.glitch.me/video-info?url='+url, {
  headers: {
    'User-Agent': 'Mozilla'
  }
})
  .then(response => response.json())
  .then(data => showVideoInfor(data))
  .catch(error => console.error(error))

  
  document.getElementById("loading-search").style.display = "block"
  setTimeout(function() {
    
    locked = false
  }, 3000)
}


function convertClick() {
   document.getElementById('downloads-div').style.display = "none"
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


function showVideoInfor(object) {
  //alert(object.name)
  //alert(object.thumbnail)
  const divElement = document.getElementById('downloads-div');
  divElement.style.display = "block"
  document.getElementById("loading-search").style.display = "none"
divElement.style.backgroundImage = 'url('+object.thumbnail+'?timestamp=' + Date.now() + ')';

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

