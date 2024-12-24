

let search=document.querySelector(".input-search");
let btn=document.querySelector(".btn-input ")








 async function Data(value){
let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=2053b679bca9461db86223932241712&q=${value}&days=3`);
let res = await response.json();

// console.log(res);

display(res)
}


function display(data){
    console.log(data);
    let array=data.forecast.forecastday;
    let location= data.location.name
    cartona=``;
    for(let i=0; i< array.length;i++){
   let date= getDate(array[i].date)
  cartona+=`
  <div class="item col-md-4" >
             ${ i<1?  ` <div class="today d-flex justify-content-between align-items-center  py-2 px-2 text-light"id="today-date">
                 <div>
                    <p id="today-day">${date.day}</p>
                 </div>
                  <span>
                  <span id="today-month" class="my-auto">${i<1?date.numDay:""}</span>
                  <span id="today-number" class="my-auto">${i<1?date.day:"" }</span>
                            
                        </span>
              </div>` : `<div class=" text-center tomorrow text-light py-2 px-2">
                     <p  class="my-auto py-2 px-2 tommrow-day ">${date.day}</p>
                   </div>`
             }
          <div class="item-content text-light py-3 px-3 text-start" id="today">
            <p id="today-location" class="fs-4">${i<1?location:""}</p>
            <div class="d-flex justify-content-between align-items-center" id="today-degree">
              <span class=" degreee fw-bolder">
            ${
                i<1? `<div><span class="today-temp ">${i<1?data.current.temp_c:array[i].day.avgtemp_c}<span><sup>c</sup></span></span></div>`
                : `<div class="text-center item2-content">
                                                   <span class="today-temp text-center fs-1">${array[i].day.avgtemp_c}</span>
                                                   <span class="fs-1"><sup>c</sup></span>
                                                 </div>`
            }
              </span>
                <img src=${i<1?data.current.condition.icon:array[i].day.condition.icon} id="today-img-state" alt="">
            </div>
          
            <div id="today-state" class="fs-6  mb-3">${i<1?data.current.condition.text:array[i].day.condition.text}</div>
            <small>${i>0?array[i].day.avgtemp_c+" c":""}<sup></sup></small>
            <div class="item-footer d-flex me-3">
             ${
                i<1? ` <div class="div d-flex me-3">
                   <img src="./img/icon-umberella.png" class=" me-2"  alt="">
              <p id="hummintty">${i<1?data.current.humidity:""}%</p>
               
                  
              </div>
              <div class="d-flex me-3">
                  <img src="./img/icon-wind.png" class="me-2" alt="">
                  <p id="wind">${i<1?data.current.wind_kph:""}kh/h</p>
              </div>
              <div class="d-flex me-3">
                  <img src="./img/icon-compass.png" class="me-2" alt="">
                  <p id="direction">${i<1?data.current.wind_dir:""}</p>
              </div>`:""
             }
          </div>
          </div> 
          
            </div>


`
    }

   document.getElementById("rowData").innerHTML=cartona
}


function getDate(x){
    let days =new Date(x)
let day= days.toLocaleString('en-us',{weekday:'long' })
let numDay=days.toLocaleString('en-us',{day:'2-digit'})
let month =days.toLocaleString('en-us',{month:"long"})
 return{day ,month,numDay};
}



search.addEventListener("input",function(e){
    if(e.target.value.length<5){
        return
    }
    Data(e.target.value)
})


btn.addEventListener("click",()=>{
    Data(search.value)
})


navigator.geolocation.getCurrentPosition(
    (data)=>{
let bl7=data.coords.latitude;
let x=data.coords.longitude;
Data(`${bl7},${x}`);

},
(error)=>{
Data("alexandria")

})