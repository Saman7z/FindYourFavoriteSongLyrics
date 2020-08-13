//! VAR DECLATIONS
let resultsContainer = document.querySelector(".results");
//! FUNCTIONS
//extra data 
const getExtraData = (url) => {
    fetch(`https://cors-anywhere.herokuapp.com/${url}`).then(res => res.json()).then(data => showPosts(data))
}

//show posts function
const showPosts = (data) => {

  let info = data.data;
 // console.log(info);
 // console.log(data);
  if (info.length > 0) {
    resultsContainer.innerHTML = `${info
      .map(
        (item) => `
        <div class="result-item">
            <div class="result-item-text">${item.title} By ${item.artist.name}</div>
            <button class="result-item-btn" data-artist="${item.artist.name}" data-title="${item.title}">Get Lyrics</button>
        </div>
        `
      )
      .join("")}`;
    //let paginationContainer = ;
    if (data.prev) {
      // show prev btn  <button class="nav-btn next-btn">Next</button>
      document.querySelector(
        ".prev-btn-container"
      ).innerHTML = `<button class="nav-btn prev-btn" onclick="getExtraData('${data.prev}')">Prev</button>`;
    }
    if (data.next) {
      // show next btn
      //  console.log(data.next)
      document.querySelector(
        ".next-btn-container"
      ).innerHTML = `<button class="nav-btn next-btn" onClick="getExtraData('${data.next}')">Next</button>`;
    }
  } else {
    resultsContainer.innerHTML =
      '<h2 class="res-empty"> We couldnt find Anything </h2>';
  }
};
// showData
// const showData = (info) => {
//   resultsContainer.innerHTML += `
//     <div class="result-item">
//     <div class="result-item-text">${info.title} by ${info.artist.name}</div>
//     <button class="result-item-btn">Get Lyrics</button>
// </div>
//     `;
// };

//change ui

// const changeUI = (prev = false, next = false, data) => {
//   document.querySelector(".res-empty").style.display = "none";
//   if (prev) {
//     document.querySelector(".prev-btn").style.display = "block";
//     document.querySelector(".prev-btn").addEventListener("click", getData);
//   }
//   if (next) {
//     document.querySelector(".next-btn").style.display = "block";
//   }
// };

// gett data from API
const getData = (url, term) => {  
 // console.log(term);
  if (term != undefined && term) {
    res = fetch(`${url}${term}`);
  } else {
   // console.log(url);
    res = fetch(`https://cors-anywhere.herokuapp.com/${url}`);
  }
  res
    .then((resData) => resData.json())
    .then((data) => {
      showPosts(data);
     // console.log(data)
    })
    .catch((e) => console.log(e));
  //let data = await res

  //  console.log(data);
  //   data.data.forEach((item) => showData(item));
  //   if (data.prev) {
  //     let prev = true;
  //   } else {
  //     let prev = false;
  //   }
  //   if (data.next) {
  //     let next = true;
  //   } else {
  //     let next = false;
  //   }
  //   changeUI(prev, next, data);
  // showPosts(data)
};

const showLyrics = async (title, artist) => {
  let coreUrl = 'https://api.lyrics.ovh/v1/';
 // console.log(`title ${title}`)
 // console.log(`artist ${artist}`)
  // try {
  //   if( get = await fetch(`${coreUrl}${String(artist)}/${String(title)}`).s)
  // } catch (error) {
  //   console.log(error)
  // }
    console.log((await fetch(`${coreUrl}${artist}/${title}`)).status)
    if( (await fetch(`${coreUrl}${artist}/${title}`)).status == 200){
      let get =  await fetch(`${coreUrl}${String(artist)}/${String(title)}`)
      let res = await get.json();
      let data = await res;
     
        if(data.lyrics | data.lyrics != undefined) {
          let formattedLyric = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
         
          document.querySelector(".nav-btns").style.display = "none";
          resultsContainer.innerHTML = `
          <div class='lyrics-container'>
          <h2>${artist}</h2>
          <h1>${title}</h1>
          <div class="lyrics">
          <div class="lyrics-text">
          ${formattedLyric}
          </div>
          </div>
          </div>
          `
    }else{
        console.log("else on 132")
    }

      }else{
          resultsContainer.innerHTML = `<div>unfortunetly we could'n find the lyrics for <strong>${title}</strong> by <strong>${artist}</strong></div>`;
          resultsContainer.style.fontSize = "1.5rem";
          document.querySelector(".result-container").style.margin = "5rem auto"
          //console.log(error)
          // document.querySelector('.res-empty').innerText = `unfortunetly we could'n find the lyrics for ${title} by ${artist}`
          // document.querySelector('.res-empty').style.display = "block";
          document.querySelector('.nav-btns').style.display = "none";
          
      }
   // }).catch(error => console.log(error))
  //catch (error) {
  //   resultsContainer.innerHTML = "";
  //   console.log(error)
  //   document.querySelector('.res-empty').innerText = `unfortunetly we could'n find the lyrics for ${title} by ${artist}`
  //   document.querySelector('.res-empty').style.display = "block"
  // }
}

//seatch btn clicked
const searchBtnClicked = () => {
  
  let input = document.getElementById("search-box").value;
  let url = "https://api.lyrics.ovh/suggest/";
  getData(url, input);
  
};

const getLyrics = (e) => {
  if(e.target.tagName == "BUTTON") {
    let title = e.target.getAttribute('data-title');
    let artist = e.target.getAttribute('data-artist');
    showLyrics(title, artist)
  }
}
const getInstantData = (input) => {
  
  let url = "https://api.lyrics.ovh/suggest/";
  getData(url, input);
  
};


const searchBtnEnter = (e) => {
  e = e || window.event;
  //console.log(e.target.value)
  getInstantData(e.target.value)
  if(e.keyCode == 13) {
    searchBtnClicked()
  }
}
//!  EVENTS

document
  .querySelector(".search-btn")
  .addEventListener("click", searchBtnClicked);
  document
  .getElementById("search-box")
  .addEventListener("keydown", searchBtnEnter);

// try {
  
// } catch (error) {
  
// }
resultsContainer.addEventListener("click", getLyrics)