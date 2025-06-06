const modal = document.getElementById("modal");
const card = document.getElementById("card");
const closeModal = document.getElementById("close");
const cardExplorer = document.getElementById("playlist-cards");
const featured = document.getElementById("MainPlaylist");
const search = document.getElementById("search");

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
  search.oninput = () => {
    const normfilt = search.value.toLowerCase().replace(/\s+/g, "")
    const FilteredPlaylists = Playlists.filter((playlist) => {
      const play = playlist.playlist_name.toLowerCase()
      return play.replace(/\s+/g, "").includes(normfilt)
    });
    renderPlaylist(FilteredPlaylists);
  };
  renderPlaylist(Playlists);
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
          <div style="display:flex; justify-content: space-between">
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
            <svg class="likeBtn" xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 512 512"><!--!Font Awesome Free 6.7.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path fill="#ffffff" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8l0-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5l0 3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20-.1-.1s0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5l0 3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2l0-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>
            <p> ${element.likeCount} Likes</p>
          </div>
        </div>
      </div>`;

    const deleteBtn = newCard.getElementsByClassName("deleteCard");
    const likeBtn = newCard.getElementsByClassName("likeBtn");
    const image = newCard.getElementsByTagName("img")[0];
    image.onclick = () => openModal(element);
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
function openModal(PlaylistData) {
  xbtn = document.createElement("div");
  xbtn.innerHTML = `<div id="close" class="x" style="width: 20px; height: 20px; padding: 10px">
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
              src=""
            />
            <div
              style="
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
              "
            >
              <div>
                <p>${song}</p>
                <p>Twenty One pilots</p>
                <p>Trench</p>
              </div>
              <div>
                <p>3:34</p>
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
function renderSongs(PlaylistData) {
  const modalChildren = modal.children;
  const modalArray = [...modalChildren];

  modalArray.forEach((item) => modal.removeChild(item));

  xbtn = document.createElement("div");
  xbtn.innerHTML = `<div id="close" class="x" style="width: 20px; height: 20px; padding: 10px">
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
              src=""
            />
            <div
              style="
                width: 100%;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
              "
            >
              <div>
                <p>${song}</p>
                <p>Twenty One pilots</p>
                <p>Trench</p>
              </div>
              <div>
                <p>3:34</p>
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
  console.log(randPlaylist);
  featured.innerHTML = `<div id="featuredContainer">
            <div id="playlistImage">
                <img width="400px" height="400px" src="${randPlaylist.imgSrc}">
                <div>
                    <h1>${randPlaylist.playlist_name}</h1>
                </div>
            </div>
            <div id="playlistSongs" class="featuredPlaylist">
               
              
            </div>
        </div>`;

  let featuredPlaylist = featured.getElementsByClassName("featuredPlaylist");
  let songs = randPlaylist.songs;
  console.log(featuredPlaylist);
  songs.forEach((song) => {
    let newSong = document.createElement("div");
    newSong.innerHTML = `<div class="featuredSongs">
                    <img width="80px" height="80px" src="./assets/img/top.png">
                    <div>
                        <h3>${song}</h3>
                        <p>Twenty One Pilots</p>
                        <p>2:25</p>
                    </div>
       </div>`;
    featuredPlaylist[0].appendChild(newSong);
  });
}

displayPlaylists();
displayFeatured();
