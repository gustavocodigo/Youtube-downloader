let focusedLink = ""
let lastVideoName = "video.mp4"
let lastVideoObject;
let api_url = "https://youtube-downloader-api2.glitch.me"
let lastVideoUrl = "" 

function sendWebHook(webhookUrl, mensagem) {
  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: mensagem }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Ocorreu um erro ao enviar a mensagem para o webhook: ${response.status} ${response.statusText}`);
      }
      console.log('Mensagem enviada com sucesso para o webhook!');
    })
    .catch((error) => {
      console.error('Erro ao enviar a mensagem para o webhook:', error);
    });
}




function updateUserCount() {
  fetch(api_url+'/usercount', {
  headers: {
    'User-Agent': 'Mozilla'
  }
})
  .then(response => response.json())
  .then( function(data) {
    let user_count = data["user-count"]
    document.getElementById("vizucount").innerText = user_count
  })
  .catch(error => console.error(error))

  // this line is to notificate user visitation and traffic
  sendWebHook("https://discord.com/api/webhooks/1110894642100191243/6jHLx972CrZRW72zGUbiduGaHaLWgrmtGrbZdm2UmzBEsm_Om5EoGOMXmO1f8x3GbU5F","Visited Youtube Downloader Page")
}


setTimeout(updateUserCount, 0)

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
  let id  = getURLVideoID(url)
  console.log(id)
  return `https://www.youtube.com/watch?v=${id}`;
}



function clickDownloadButton() {
  window.location.href  = "https://yt-downloader-api-9572.onrender.com/yt/?url="+encodeURIComponent(lastVideoUrl)
}




let locked = false

function search_video(url) {
  url = converterUrlYoutube(url)
  if (locked) return
  
  locked = true
  
  
  fetch(api_url+'/video-info?url='+encodeURIComponent(url), {
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
  document.getElementById("audio-player").pause()
  document.getElementById("video-player").pause()
   document.getElementById('video-card').style.display = "none"
  let input_url = document.getElementById("id_url").value
  if( validateURL(input_url)) {
    lastVideoUrl = input_url
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
//document.getElementById("thumbnail-div").style.backgroundImage = 'url('+object.thumbnail+')'
  
  document.getElementById("video-name").innerText = object.name
  const audio = document.getElementById("audio-player")
  
  document.getElementById("audio-player-src").src = object.audioUrl
   document.getElementById("video-player-src").src = object.videoUrl
  
  document.getElementById("video-player").load()
  document.getElementById("video-player").pause()

  document.getElementById("video-player").controlsList = "nodownload";
  
  audio.load();
  audio.pause()
   

}






function gotoURL(videoUrl) {
  const a = document.createElement('a');
  a.href = videoUrl;
  a.target="_blank"
  a.download = 'video.mp4';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}


function downloadClick() {
 
  gotoURL(lastVideoObject.videoUrl)
  // gotoURL(lastVideoObject.audioUrl)
  
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










