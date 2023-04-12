let focusedLink = ""
let lastVideoName = "video.mp4"
let lastVideoObject;
let api_url = "https://youtube-downloader-api2.glitch.me/"



function isValidYoutubeVideoLink(link) {
 
  return validateURL(link)
}


function converterUrlYoutube(id) {
  return `https://www.youtube.com/watch?v=${id}`
}







let locked = false

function search_video(url) {
  url = converterUrlYoutube(getURLVideoID(url))
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
  
  console.log( validateURL(input_url))
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
// document.getElementById("thumbnail-div").style.backgroundImage = 'url('+object.thumbnail+')'
  
  document.getElementById("video-name").innerText = object.name
  // document.getElementById("video-iframe").src = object.videoUrl

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
  // gotoURL(lastVideoObject.audioUrl)
  
  console.log(lastVideoObject.videoUrl)
  
  // console.log("Downloading video...")
}

function downloadClick2() {
 
  // gotoURL(lastVideoObject.videoUrl)
  gotoURL(lastVideoObject.audioUrl)
  
  console.log(lastVideoObject.videoUrl)
  
  // console.log("Downloading video...")
}




const validQueryDomains = new Set([
  'youtube.com',
  'www.youtube.com',
  'm.youtube.com',
  'music.youtube.com',
  'gaming.youtube.com',
]);

const validPathDomains = /^https?:\/\/(youtu\.be\/|(www\.)?youtube\.com\/(embed|v|shorts)\/)/;

const idRegex = /^[a-zA-Z0-9-_]{11}$/;

function validateID(id) {
  return idRegex.test(id);
}

function getURLVideoID(link) {
  const parsed = new URL(link);
  let id = parsed.searchParams.get('v');
  if (validPathDomains.test(link) && !id) {
    const paths = parsed.pathname.split('/');
    id = parsed.host === 'youtu.be' ? paths[1] : paths[2];
  } else if (parsed.hostname && !validQueryDomains.has(parsed.hostname)) {
    throw Error('Not a YouTube domain');
  }
  if (!id) {
    throw Error(`No video id found: ${link}`);
  }
  id = id.substring(0, 11);
  if (!validateID(id)) {
    throw TypeError(`Video id (${id}) does not match expected ` +
      `format (${idRegex.toString()})`);
  }
  return id;
}

const urlRegex = /^https?:\/\//;

function getVideoID(str) {
  if (validateID(str)) {
    return str;
  } else if (urlRegex.test(str)) {
    return getURLVideoID(str);
  } else {
    throw Error(`No video id found: ${str}`);
  }
}

function validateURL(string) {
  try {
    getURLVideoID(string);
    return true;
  } catch (e) {
    return false;
  }
}







