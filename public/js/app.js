console.log('Client side javascript file is loaded!')

//fetch example
// fetch('http://localhost:8080/weather?address=!!').then( (response) =>{   
//        response.json().then((data)=>{
//                if(data.error){
//                        console.log(data.error);
//                        //message2.textContent= data.error;
//                }else{
//                 console.log(data);
//                // message1.textContent=data.forecast;
                
//                }
//         })
// })


const weatherForm = document.querySelector('form');
const searchBox = document.querySelector('input'); 
const message1 = document.querySelector('#message1'); 
const message2 = document.querySelector('#message2'); 

weatherForm.addEventListener('submit',(e) => {
        e.preventDefault();
        const searchTerm = searchBox.value ; 
        console.log("Search Term is "+ searchTerm);

        message1.textContent="";
        message2.textContent="";
       fetch('http://localhost:8080/weather?address='+searchTerm).then( (response) =>{   
       response.json().then((data)=>{
               if(data.error){
                       console.log(data.error);
                       message2.textContent= data.error;
               }else{
                console.log(data);
                message2.textContent='Forecast : '+data.forecast;
                message1.textContent='Location : '+data.location;
                
               }
        })
    
})
})