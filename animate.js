//Make the DIV element draggagle:
var angryCounter = 0;
var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
var pos1_before = 0;
var pos2_before = 0;
var second = 0.0;
var s = 0.0;
var inter;
var audio;
var flag = 0;

window.onload = function() {
    document.getElementById("angerAudio").pause();
}

dragElement(document.getElementById("object"));

document.querySelector('body').addEventListener('mousemove', eyeball);

function eyeball(){
  // console.log(audio)
  // audio.play();
  var eye1 = document.querySelectorAll('.eye1');
  eye1.forEach(function(eye1){
    let x = (eye1.getBoundingClientRect().left) + (eye1.clientWidth / 2);
    let y = (eye1.getBoundingClientRect().top) + (eye1.clientHeight / 2);
    let radian = Math.atan2(event.pageX - x, event.pageY - y);
    let rot = (radian * (180 / Math.PI) * -1 + 270);
    eye1.style.transform = "rotate(" + rot + "deg)";
  })

  var eye2 = document.querySelectorAll('.eye2');
  eye2.forEach(function(eye2){
    let x = (eye2.getBoundingClientRect().left) + (eye2.clientWidth / 2);
    let y = (eye2.getBoundingClientRect().top) + (eye2.clientHeight / 2);
    let radian = Math.atan2(event.pageX - x, event.pageY - y);
    let rot = (radian * (180 / Math.PI) * -1 + 270);
    eye2.style.transform = "rotate(" + rot + "deg)";
  })
}

function getMobileOperatingSystem() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) )
  {
    return 'iOS';
  }
  else if( userAgent.match( /Android/i ) )
  {
    return 'Android';
  }
  else
  {
    return 'unknown';
  }
}

function dragElement(elmnt) {

  if (document.getElementById("object")) {
    /* if present, the header is where you move the DIV from:*/
    if(getMobileOperatingSystem() == "unknown"){
      console.log("masuk")
      document.getElementById("object").onmousedown = dragMouseDown;
    }
    else{
      console.log("masuk android")
      // document.getElementById("object").ontouchstart = dragMouseDown;
      document.getElementById("object").addEventListener("touchstart", dragMouseDown)
    }
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    if(getMobileOperatingSystem() == "unknown"){
      elmnt.onmousedown = dragMouseDown;
    }
    else{
      // elmnt.ontouchstart = dragMouseDown;
      elmnt.addEventListener("touchstart", dragMouseDown)
    }
  }

  function dragMouseDown(e) {
    second = 0;
    document.getElementById("timer1").innerHTML = second;
    clearInterval(inter)

    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;

    if(getMobileOperatingSystem() == "unknown"){
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }
    else{
      // document.ontouchend = closeDragElement;
      // // call a function whenever the cursor moves:
      // document.ontouchmove = elementDrag;

      elmnt.addEventListener("touchend", closeDragElement)
      elmnt.addEventListener("touchmove", elementDrag)
    }
    
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    if(getMobileOperatingSystem() == "unknown"){
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
    }
    else{
      pos1 = pos3 - e.touches[0].clientX;
      pos2 = pos4 - e.touches[0].clientY;
      pos3 = e.touches[0].clientX;
      pos4 = e.touches[0].clientY;
    }

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
    // document.ontouchend = null;
    // document.ontouchmove = null;
    elmnt.addEventListener("touchend", null);
    elmnt.addEventListener("touchmove", null);

    elmnt.style.top = "50vh";
    elmnt.style.left = "40vw";

    // if(angryCounter >= 3){
    //   inter = setInterval(function(){ countTimer() }, 100);
    // }
    inter = setInterval(function(){ countTimer() }, 100);
  }
}

function countTimer(){
  if(angryCounter >= 20){
    second = second + 0.1;
    s = second.toFixed(1);
  }

  document.getElementById("timer1").innerHTML = s;
}

function loadAudio(){
  flag = 1;
  audio = document.getElementById("angerAudio");
  audio.autoplay = true;
  audio.play();
}

function posChecker(pos1, pos2){
  if(pos1_before != pos1 || pos2_before != pos2){
    angryCounter = angryCounter + 1
  }
  pos1_before = pos1;
  pos2_before = pos2;
  if(angryCounter >= 20){
    if(flag == 0){
      loadAudio();
    }
    document.body.style.backgroundColor = "#5c6d70";  
    // document.getElementById("timer1").style.display = "inline";
    document.getElementById("brow1").style.transform = "rotate(20deg)";
    document.getElementById("brow2").style.transform = "rotate(-20deg)";
    document.getElementById("mouth1").style.width  = "8vw";
    document.getElementById("mouth1").style.borderRadius  = "50%";
  }
  else{
    document.body.style.backgroundColor = "lightgreen";
    // document.getElementById("timer1").style.display = "none";
    // document.getElementById("timer1").innerHTML = second;
    clearInterval(inter);
    second = 0;
    s = 0;
    document.getElementById("brow1").style.transform = "rotate(0deg)";
    document.getElementById("brow2").style.transform = "rotate(0deg)";
    document.getElementById("mouth1").style.width  = "6vw";
    document.getElementById("mouth1").style.borderRadius  = "12%";
    flag = 0;
    audio.pause();
  }

  if(angryCounter > 0){
    angryCounter = angryCounter - 0.5;
  }
}

setInterval(function(){ posChecker(pos1, pos2) }, 100);
// setInterval(function(){ console.log(getMobileOperatingSystem()) }, 500);