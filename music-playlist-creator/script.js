const modal = document.getElementById("modal");
const card = document.getElementById("card");
const closeModal = document.getElementById("close");
const cardExplorer = document.getElementById("playlist-cards");

card.addEventListener("click", setModalOpen);
closeModal.addEventListener("click", setModalClosed);

function setModalClosed() {
  modal.style.display = "none";
}
function setModalOpen() {
  modal.style.display = "block";
}

function displayPlaylists(Playlists) {
  console.log("I get here 1");
  console.log(Playlists[0]);
  console.log("I get here 2");

  Playlists.array.forEach(element => {
    
  });

    console.log("I get here 3");
  }


function sumOfEvens(int) {
  let sum = 0;
  for (let i = 0; i <= number; i++) {
    if (i % 2 === 0) {
      sum += i;
    }
  }
  return sum;
}

displayPlaylists(fetch("./data/data.json").then((response) => response.json()));

  <div class="card">
        <img width="200px" height="200px" src={Playlist.img} />
        <div
          id="cardText"
          style="
            flex: 1;
            margin-left: 10px;
            padding-top: 6px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "
        >
          <div id="cardInfo">
            <h4>{Playlist.playlist_name}</h4>
            <p>{Playlist.playlist_author}</p>
          </div>
          <div
            id="cardLikes"
            style="
              padding-bottom: 10px;
              display: flex;
              align-items: center;
              gap: 8px;
            "
          >
            <img width="10px" height="10px" />
            <p> {Playlist.likeCount} Likes</p>
          </div>
        </div>
      </div>