const modal = document.getElementById("modal")
const card = document.getElementById("card")
const closeModal = document.getElementById("close")

card.addEventListener("click", setModalOpen);
closeModal.addEventListener("click", setModalClosed);


function setModalClosed(){
    modal.style.display = "none"
}
function setModalOpen(){
    modal.style.display = "block"
}





function sumOfEvens(int){
    let sum = 0;
    for(let i = 0; i<= number; i++){
        if(i % 2 === 0){
            sum+=i;
        }
    }
    return sum;
}

console.log(sumOfEvens(sum))
