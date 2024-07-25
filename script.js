let isOnline = true
const popup = document.querySelector(".popup")
let wifiIcon = document.querySelector(".icon i")
let popupTitle = document.querySelector(".popup .title")
let popupDesc = document.querySelector(".desc")

let reconnectBtn = document.querySelector(".reconnect-btn");
let timer = 10,interValid;

const checkConnection = async () => {
    try{
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            isOnline = response.status >= 200 && response.status < 300;
            console.log(response)
    }
    catch(error){
        isOnline = false;
        console.log(error)
    }
    timer = 10;
    clearInterval(interValid);
    handlePopup(isOnline);
    console.log(isOnline);
}
const handlePopup = (status)=>{
    if(status){
        wifiIcon.className = "uil uil-wifi";
        popup.classList.add("online");
        popupTitle.innerText = "Restored Connection !";
        popupDesc.innerHTML = "Your device is successfully connected to internet."
        return setTimeout(()=>{
            popup.classList.remove("show")
        },2000);
    }
    wifiIcon.className = "uil uil-wifi-slash";
    popupTitle.innerText = "Lost Connection...";
    popupDesc.innerHTML = "Your network is unavailable. We will attempt to reconnect you in <b>10</b> seconds.";
    popup.classList.add("show")
    popup.className = "popup show";
    interValid = setInterval(()=>{
        timer--;
        if(timer === 0){
            checkConnection();
        }
        popup.querySelector(".desc b").innerText = timer;
    },1000); 

}

setInterval(()=> isOnline && checkConnection() ,3000);
reconnectBtn.addEventListener("click",checkConnection);