// Getting all references to html
const modal = document.getElementById("modal");
const card = document.getElementById("card");
const closeModal = document.getElementById("close");
const cardExplorer = document.getElementById("playlist-cards");
const featured = document.getElementById("MainPlaylist");
const search = document.getElementById("search");
const clearBtn = document.getElementById("clearBtn");
const searchBtn = document.getElementById("searchBtn");
const sort = document.getElementById("sorting");
// Logic

function setModalClosed() {
  modal.style.display = "none";
}
function setModalOpen() {
  modal.style.display = "block";
}
async function getData() {
  let res;
  await fetch("./data/data.json").then((response) => {
    res = response.json();
  });
  return res;
}
async function displayPlaylists() {
  let Playlists = await getData();

  // I believe this is better, but for sake of the review i just commented it
  // search.oninput = () => {
  //   const normfilt = search.value.toLowerCase().replace(/\s+/g, "");
  //   const FilteredPlaylists = Playlists.filter((playlist) => {
  //     const play = playlist.playlist_name.toLowerCase();
  //     return play.replace(/\s+/g, "").includes(normfilt);
  //   });
  //   renderPlaylist(FilteredPlaylists);
  // };

  search.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      filter(Playlists);
    }
  });

  searchBtn.addEventListener("click", () => filter(Playlists));

  clearBtn.addEventListener("click", () => {
    search.value = "";
    renderPlaylist(Playlists);
  });

  renderPlaylist(Playlists);
}
function filter(Playlists) {
  const normfilt = search.value.toLowerCase().replace(/\s+/g, "");
  const FilteredPlaylists = Playlists.filter((playlist) => {
    const play = playlist.playlist_name.toLowerCase();
    const author = playlist.playlist_author.toLowerCase();
    return (
      play.replace(/\s+/g, "").includes(normfilt) ||
      author.replace(/\s+/g, "").includes(normfilt)
    );
  });
  renderPlaylist(FilteredPlaylists);
}
async function renderPlaylist(Playlists) {
  const cardChildren = cardExplorer.children;
  const cardArray = [...cardChildren];

  cardArray.forEach((item) => cardExplorer.removeChild(item));

  Playlists.forEach((element) => {
    newCard = document.createElement("div");
    newCard.innerHTML = `<div id="id-${element.playlistID}" class="card">
        <img width="200px" height="200px" src=${element.imgSrc} />
        <div class="cardContent">
          <div class="textarea">
           <div>
            <h4>${element.playlist_name}</h4>
            <p>${element.playlist_author}</p>
            </div>
            <div class="deleteCard" style="margin-right: 10px">
              x
            </div>
          </div>


          <div
            class="cardMenu"
          >
<svg class="likeBtn" fill="${
      element.isLiked ? "red" : "#ffffff"
    }" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>        

        <p> ${element.likeCount} Likes</p>
        <p>From: ${element.timeCreated}</p>
          </div>
        </div>
      </div>`;

    const deleteBtn = newCard.getElementsByClassName("deleteCard");
    const likeBtn = newCard.getElementsByClassName("likeBtn");
    const image = newCard.getElementsByTagName("img")[0];
    image.onclick = () => renderSongs(element);
    deleteBtn[0].addEventListener("click", () =>
      deleteCard(Playlists, element)
    );
    likeBtn[0].addEventListener("click", () => like(Playlists, element));
    cardExplorer.appendChild(newCard);
  });
}
function like(Playlists, PlaylistData) {
  if (PlaylistData.isLiked) {
    PlaylistData.isLiked = false;
    PlaylistData.likeCount -= 1;
    console.log(PlaylistData.likeCount);
    console.log(PlaylistData.playlistID);
  } else {
    PlaylistData.isLiked = true;
    PlaylistData.likeCount += 1;
    console.log(PlaylistData.likeCount);
    console.log(PlaylistData.playlistID);
  }

  renderPlaylist(Playlists);
}
function deleteCard(Playlists, card) {
  const cardId = card.playlistID;
  const FilteredPlaylist = Playlists.filter((song) => {
    return song.playlistID !== cardId;
  });
  renderPlaylist(FilteredPlaylist);
}
function renderSongs(PlaylistData) {
  const modalChildren = modal.children;
  const modalArray = [...modalChildren];

  modalArray.forEach((item) => modal.removeChild(item));

  xbtn = document.createElement("div");
  xbtn.innerHTML = `<div id="close" class="xbtn">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
          </div>`;
  modal.innerHTML = /*html*/ `<div id="modalContent">
      <div id="albumSection" class="x">
      <div style="display: flex">
      <img
      style="border-radius: 6px"
      width="200px"
      height="200px"
      src="${PlaylistData.imgSrc}"
      />
      <div style="margin-left: 20px">
      <h1>${PlaylistData.playlist_name}</h1>
      <p>${PlaylistData.playlist_author}</p>
      </div>
          </div>
          
        </div>
        <div><button class="Btn">Shuffle</button></div>
        <div id="albumSongs" class="albumSongs">
      </div>`;

  const albumSongsPart = modal.getElementsByClassName("albumSongs");
  console.log(albumSongsPart[0]);
  let songs = PlaylistData.songs;
  console.log(songs);
  songs.forEach((song) => {
    let newSong = document.createElement("div");
    newSong.innerHTML = `
    <div id="song">
            <img
              style="border-radius: 4px"
              width="50px"
              src="${PlaylistData.imgSrc}"
            />
            <div
            class="songInModal"
            >
              <div>
                <p>${song.title}</p>
                <p>${song.artist}</p>
              </div>
              <div>
                <p>${song.duration}</p>
              </div>
            </div>
          </div>`;

    albumSongsPart[0].appendChild(newSong);
  });

  const playlistSection = modal.getElementsByClassName("x");
  const shufflBtn = modal.getElementsByClassName("Btn");
  shufflBtn[0].addEventListener("click", () =>
    shuffle(PlaylistData, PlaylistData.songs)
  );
  xbtn.onclick = () => setModalClosed();
  playlistSection[0].appendChild(xbtn);
  setModalOpen();
}
function shuffle(PlaylistData, songs) {
  console.log(songs);
  songs.sort(() => Math.random() - 0.5);
  console.log(songs);

  renderSongs(PlaylistData);
}
async function RandomPlaylist() {
  let Playlists = await getData();
  let rand = Playlists[Math.floor(Math.random() * Playlists.length)];
  return rand;
}
async function displayFeatured() {
  const randPlaylist = await RandomPlaylist();
  featured.innerHTML = `<div id="featuredContainer">
            <div id="playlistImage">
                <img width="400px" height="400px" src="${randPlaylist.imgSrc}">
                <div class="center">
                    <h1>${randPlaylist.playlist_name}</h1>
                    <p>Created by: "${randPlaylist.playlist_author}"</p>
                </div>
            </div>
            <div id="playlistSongs" class="featuredPlaylist">
               
              
            </div>
        </div>`;

  let featuredPlaylist = featured.getElementsByClassName("featuredPlaylist");
  let songs = randPlaylist.songs;
  songs.forEach((song) => {
    let newSong = document.createElement("div");
    newSong.innerHTML = `<div class="featuredSongs">
                    <img width="80px" height="80px" src="${randPlaylist.imgSrc}">
                    <div class="featSong">
                         <h3>${song.title}</h3>
                <p>${song.artist}</p>
                <p>${song.duration}</p>
                    </div>
       </div>`;
    featuredPlaylist[0].appendChild(newSong);
  });
}

async function Sort() {
  let Playlists = await getData();
  const sortType = sort.value;
  if (sortType === "name") {
    let byName = Playlists.slice(0);
    byName.sort(function (a, b) {
      const x = a.playlist_name.toLowerCase();
      const y = b.playlist_name.toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    });
    renderPlaylist(byName);
  } else if (sortType === "likes") {
    let byLikes = Playlists.slice(0);
    byLikes.sort(function (a, b) {
      return b.likeCount - a.likeCount;
    });
    renderPlaylist(byLikes);
  } else if(sortType === "date") {
    let byDate = Playlists.slice(0);
    byDate.sort(function (a, b) {
      return b.timeCreated - a.timeCreated;
    });
    renderPlaylist(byDate);
  }
}

displayPlaylists();
displayFeatured();

// help functions

function compareNames(name1, name2) {
  return name1 - name2;
}

// Code that got cleaned up but might want to keep in hand >>> {
//
// function openModal(PlaylistData) {
//   xbtn = document.createElement("div");
//   xbtn.innerHTML = `<div id="close" class="x" style="width: 20px; height: 20px; padding: 10px">
//             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>
//           </div>`;
//   modal.innerHTML = /*html*/ `<div id="modalContent">
//       <div id="albumSection" class="x">
//       <div style="display: flex">
//       <img
//       style="border-radius: 6px"
//       width="200px"
//       height="200px"
//       src="${PlaylistData.imgSrc}"
//       />
//       <div style="margin-left: 20px">
//       <h1>${PlaylistData.playlist_name}</h1>
//       <p>${PlaylistData.playlist_author}</p>
//       </div>
//           </div>

//         </div>
//         <div><button class="Btn">Shuffle</button></div>
//         <div id="albumSongs" class="albumSongs">

//       </div>`;

//   const albumSongsPart = modal.getElementsByClassName("albumSongs");
//   console.log(albumSongsPart[0]);
//   let songs = PlaylistData.songs;
//   console.log(songs);
//   songs.forEach((song) => {
//     let newSong = document.createElement("div");
//     newSong.innerHTML = `
//     <div id="song">
//             <img
//               style="border-radius: 4px"
//               width="50px"
//               src="${PlaylistData.imgSrc}"
//             />
//             <div
//               style="
//                 width: 100%;
//                 display: flex;
//                 flex-direction: row;
//                 align-items: center;
//                 justify-content: space-between;
//               "
//             >
//               <div>
//                 <p>${song.title}</p>
//                 <p>${song.artist}</p>
//               </div>
//               <div>
//                 <p>${song.duration}</p>
//               </div>
//             </div>
//           </div>`;

//     albumSongsPart[0].appendChild(newSong);
//   });

//   const playlistSection = modal.getElementsByClassName("x");
//   const shufflBtn = modal.getElementsByClassName("Btn");
//   shufflBtn[0].addEventListener("click", () =>
//     shuffle(PlaylistData, PlaylistData.songs)
//   );
//   xbtn.onclick = () => setModalClosed();
//   playlistSection[0].appendChild(xbtn);
//   setModalOpen();
// }
//}
