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

async function getData() {
 let res;
  await fetch("./data/data.json")
    .then((response) => {
    res = response.json();
    })
    return res;
}

async function displayPlaylists() {
let Playlists = await getData()
  
Playlists.forEach((element) => {
      cardExplorer.innerHTML += /*html*/ `
      <div class="card">
        <img width="200px" height="200px" src=${element.imgSrc} />
        <div
          id="cardText"
          style="
            flex: 1;
            margin-left: 10px;
            padding-top: 6px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          "li
        >
          <div id="cardInfo">
            <h4>${element.playlist_name}</h4>
            <p>${element.playlist_author}</p>
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
            <p> ${element.likeCount} Likes</p>
          </div>
        </div>
      </div>
    `;
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


displayPlaylists();
