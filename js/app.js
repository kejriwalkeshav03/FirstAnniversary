const hamburger = document.querySelector('.header_hamburger');

const header = document.querySelector('.header');

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle('open');
    header.classList.toggle('active');

});





// time

function abso(a){
  return a - Math.floor(a);
}

function ten(x){
    if((x/10)<1){
        return "0" + x;
    }
    return x;
}

const dy= document.getElementById("y");
const dm= document.getElementById("m");
const dw= document.getElementById("w");
const d= document.getElementById("d");
const dhr= document.getElementById("hr");
const dmin= document.getElementById("min");
const dsec= document.getElementById("sec");

function getCurrentTime() {
    const startDate = new Date("2025-02-26T00:00:00");
    const now = new Date();

    if (isNaN(startDate)) {
        throw new Error("Invalid date format");
    }

    if (startDate > now) {
        throw new Error("Input date must be in the past");
    }

    let years = now.getFullYear() - startDate.getFullYear();
    let months = now.getMonth() - startDate.getMonth();
    let days = now.getDate() - startDate.getDate();
    let hours = now.getHours() - startDate.getHours();
    let minutes = now.getMinutes() - startDate.getMinutes();
    let seconds = now.getSeconds() - startDate.getSeconds();

    // Adjust seconds
    if (seconds < 0) {
        seconds += 60;
        minutes--;
    }

    // Adjust minutes
    if (minutes < 0) {
        minutes += 60;
        hours--;
    }

    // Adjust hours
    if (hours < 0) {
        hours += 24;
        days--;
    }

    // Adjust days
    if (days < 0) {
        const previousMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        days += previousMonth.getDate();
        months--;
    }

    // Adjust months
    if (months < 0) {
        months += 12;
        years--;
    }

    dy.innerText=years;

    dm.innerText=months;
    d.innerText=days;
    dhr.innerHTML=hours;
    dmin.innerText=minutes;
    dsec.innerText=seconds;


}

window.setInterval(getCurrentTime,1000);


// scroll

const scroll = document.querySelector(".scroll");

window.addEventListener('scroll',function(){
    const h = document.documentElement.clientHeight *0.5;
   if(window.scrollY > h){
    scroll.classList.remove('inactive-scroll');
       scroll.classList.add('active-scroll');
   }else{
        scroll.classList.remove('active-scroll');
        scroll.classList.add('inactive-scroll');
    
   }
   
})

// spinner

const spinner = document.querySelector('.spinning')
const spinBtn = document.querySelector('.spin-con button')


spinBtn.addEventListener('click',spinWheel)
let  deg = 0;
let newDeg= null;
let prize ;
function spinWheel(){
  let rotateDeg = deg +( (Math.random() * 1000) + 3333) ;
  console.log(rotateDeg)
  let pureDeg = rotateDeg%360;
 
  pureDeg = changeDeg(pureDeg,rotateDeg);
  
  checkDeg(pureDeg);
 if(newDeg) rotateDeg = newDeg;
 console.log(rotateDeg)
  console.log(prize)
  spinBtn.removeEventListener('click',spinWheel)
  spinner.style.transform = `rotate(${rotateDeg}deg)`;
deg = rotateDeg;
newDeg = null;
  setTimeout(function(){
    let winner = document.querySelector(`.spin-con_content:nth-of-type(${prize})`)
    let infoSpin = document.querySelector('.spin-info')
    winner.classList.add('won');
    let wItem = winner.children[0].innerText;
    if(wItem.length<6)wItem = 'a ' + wItem;
    infoSpin.innerText=`Congrats Bae, you will get ${wItem}!`
    // spinBtn.addEventListener('click',spinWheel)
  },5000)
}


function changeDeg(deg,rotateD){
  let degArr = [20.5,69.5,114,159,203,249,293,339.5];
  for (i=0;i<degArr.length;i++){
    if(deg>degArr[i] && deg<(degArr[i]+3)){
      newDeg = rotateD + 8;
      return deg + 8;
    }
    if(deg<degArr[i] && deg>(degArr[i]-3)){
      newDeg = rotateD - 8;
      return deg - 8;
    } 

  }
  return deg;
}

function checkDeg(deg){
   // 20.5,69.5,114,159,203,249,293,339.5
  if(deg>20.5 && deg<69.5){
    prize = '8';
  }else if(deg>69.5 && deg<114){
    prize = '7';
  }else if(deg>114 && deg<159){
    prize = '6';
  }else if(deg>159 && deg<203){
    prize = '5';
  }else if(deg>203 && deg<249){
    prize = '4';
  }else if(deg>249 && deg<293){
    prize = '3';
  }else if(deg>293 && deg<339.5){
    prize = '2';
  }else {
    prize = '1';
  }
}


// gallery zoom

const photosArr = document.querySelectorAll('.gal-box span') ;
const galOv = document.querySelector('.gal-big');
const galOvImg = document.querySelector('.gal-big img');

galOv.addEventListener('click',function(e){
  if(e.target==this){
    galOv.classList.remove('show-galbig');
  }
})

photosArr.forEach((p)=>{
  p.addEventListener('click',function(){
    let src = p.children[0].getAttribute('src');
    galOvImg.setAttribute('src',src)
    galOv.classList.add('show-galbig')
  })
})