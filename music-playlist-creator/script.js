const modal = document.getElementById("modal");
const card = document.getElementById("card");
const closeModal = document.getElementById("close");
const cardExplorer = document.getElementById("playlist-cards");
// card.addEventListener("click", setModalOpen)
// closeModal.addEventListener("click", setModalClosed);

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
        <div
          style="
            flex: 1;
            margin-left: 10px;
            padding-top: 6px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <div>
            <h4>${element.playlist_name}</h4>
            <p>${element.playlist_author}</p>
          </div>
          <div
          
            style="
              padding-bottom: 10px;
              display: flex;
              align-items: center;
              gap: 8px;
            "
          >
            <img class="likeBtn" src="" width="10px" height="10px" />
            <p> ${element.likeCount} Likes</p>
          </div>
          </div>
          </div>`;

    const likeBtn = newCard.getElementsByClassName("likeBtn");
    const image = newCard.getElementsByTagName("img")[0];
    image.onclick = () => openModal(element);
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
function openModal(PlaylistData) {
  
  xbtn = document.createElement("div");
  xbtn.innerHTML = `<div id="close" class="x" style="width: 20px; height: 20px; padding: 10px">
            X
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
        <div><button class="shufflBtn">Shuffle :P</button></div>
        <div id="albumSongs" class="albumSongs">

      </div>`;


  const albumSongsPart = modal.getElementsByClassName('albumSongs')
  console.log(albumSongsPart[0])
  let songs = PlaylistData.songs;
  console.log(songs)
  songs.forEach((song) =>  {
    let newSong = document.createElement('div')
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

    albumSongsPart[0].appendChild(newSong)}
  )

  const playlistSection = modal.getElementsByClassName("x");
  const shufflBtn = modal.getElementsByClassName("shufflBtn");
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
            X
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
        <div><button class="shufflBtn">Shuffle :P</button></div>
        <div id="albumSongs" class="albumSongs">

      </div>`;


  const albumSongsPart = modal.getElementsByClassName('albumSongs')
  console.log(albumSongsPart[0])
  let songs = PlaylistData.songs;
  console.log(songs)
  songs.forEach((song) =>  {
    let newSong = document.createElement('div')
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

    albumSongsPart[0].appendChild(newSong)}
  )
  

  const playlistSection = modal.getElementsByClassName("x");
  const shufflBtn = modal.getElementsByClassName("shufflBtn");
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

displayPlaylists();

/*≈<div id="song">
            <img
              style="border-radius: 4px"
              width="50px"
              src="${PlaylistData.imgSrc}"
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
                <p>Cut my Lip</p>
                <p>Twenty One pilots</p>
                <p>Trench</p>
              </div>
              <div>
                <p>3:34</p>
              </div>
            </div>
          </div>*/