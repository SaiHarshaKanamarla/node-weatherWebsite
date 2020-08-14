console.log("this is a client side js file");

const weatherForm = document.querySelector('form');
const searchEle = document.querySelector('input');   
const messageOne = document.querySelector('#first');
const messageTwo = document.querySelector('#second');


weatherForm.addEventListener('submit',(e) =>{
     
    console.log(searchEle.value);
    e.preventDefault(); // This will prevent the default behavior of the form refresh
    var url = 'http://localhost:3000/weather?location='+searchEle.value;
    if(!searchEle.value){
        messageOne.textContent = "Please enter a Valid city name";
        messageTwo.textContent = "";
        return;
    }
    messageOne.textContent = "Loading...";
    messageTwo.textContent = "";

    fetch(url).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log(data.error);
            messageOne.textContent = '';
            messageTwo.textContent = data.error;
        }else{            
            console.log(data.forecast);
            console.log(data.location);
            messageOne.textContent = data.forecast;
            messageTwo.textContent = "Location: "+ data.location;
        }
    })
})
})