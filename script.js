let focusedLink = ""
let lastVideoName = "video.mp4"
let lastVideoObject;
let api_url = "https://youtube-downloader-api2.glitch.me/"



function isValidYoutubeVideoLink(link) {
  // Expressão regular para validar um link de vídeo do YouTube
  var regex =
    /^(https?\:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9\-_]{11})$/;

  // Verifica se o link corresponde ao padrão da expressão regular
  return (
    regex.test(link) || /^https?:\/\/youtu\.be\/[a-zA-Z0-9\-_]{11}$/.test(link)
  );
}


function converterUrlYoutube(url) {
  const regex = /^https?:\/\/(?:www\.)?youtu\.be\/(.+)$/i;
  const match = url.match(regex);

  if (match) {
    const videoId = match[1];
    return `https://www.youtube.com/watch?v=${videoId}`;
  }

  return url;
}







let locked = false

function search_video(url) {
  url = converterUrlYoutube(url)
  if (locked) return
  
  locked = true
  
  
  fetch(api_url+'/video-info?url='+url, {
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
   document.getElementById('video-card').style.display = "none"
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
  console.log(object)
  lastVideoObject = object
  //alert(object.name)
  //alert(object.thumbnail)
  const divElement = document.getElementById('video-card');
  lastVideoName = object.name
  divElement.style.display = "block"
  document.getElementById("loading-search").style.display = "none"
document.getElementById("thumbnail-div").style.backgroundImage = 'url('+object.thumbnail+')'
  
  document.getElementById("video-name").innerText = object.name

}

function downloadVideo(url) {
   // cria um link com a URL do vídeo
  const link = document.createElement("a");
  link.href = url;// api_url+`/downlaod-video?url=${url}`;
  // adiciona a propriedade "download" para iniciar o download quando o usuário clicar no link
  link.download = lastVideoName+".mp4";
  
  // simula o clique no link para iniciar o download
  link.click();
}





function gotoURL(videoUrl) {
  const a = document.createElement('a');
  a.href = videoUrl;
  a.download = 'video.mp4';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


function downloadVideo3(videoUrl) {
  fetch(videoUrl)
    .then(response => response.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'video.mp4';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
}


function downloadClick() {
 
  gotoURL(lastVideoObject.videoUrl)
  console.log(lastVideoObject.videoUrl)
  
  // console.log("Downloading video...")
}

