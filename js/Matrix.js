// JavaScript Document

/* -----------+ Comment Block +-------------------
File:		Matrix.js
Author:     J. Apodaca
Date:       Mar 18, 2014
Purpose:    Create a console of falling text graphics
Dependencies: None
    Input:     None
Output:        None

Example of Use: <script type="text/javascript" src="js/Matrix.js"> </script>

Special Thanks to: http://codepen.io/anon/pen/zmaye

*/

//Note: Unlike PHP scripts, we do NOT use <script> pairs with Javascript
 
 var   canvas = document.querySelector('canvas'),
         ctx = canvas.getContext('2d'),
   particles = [],
patriclesNum = 50,
           w = 500,
           h = 500,
      colors = ['#f35d4f','#f36849','#c0d988','#6ddaf1','#f1e85b'];
      letterColor = '#7CFC00'; //LawnGreen 	
 
canvas.width = 500;
canvas.height = 500;
canvas.style.left = (window.innerWidth - 500)/2+'px';


if(window.innerHeight>500)
canvas.style.top = (window.innerHeight - 500)/2+'px';
  
function Factory(){  
  this.x =  Math.round( Math.random() * w);
  this.y =  0;  //top of canvas

  this.vx = 0; //no x velocity
  this.vy = Math.round( Math.random() * 3) - 1.5+12; // where 12 is the pixel height of the letters
}
   
function ClearCanvas(){
// Gives user ability to clear the canvas with the on screen button.
  ctx.clearRect(0, 0, w, h);
} //End ClearCanvas 

function draw(){
//Goal here is to change the letters as we go down.
  ctx.globalCompositeOperation = 'source-over';
  ctx.font="20px Georgia";
  ctx.strokeText("Matrix",10,50);

  
  for(var i = 0;i < patriclesNum; i++){
    var temp = particles[i];
 
    temp.x = 500-(i*10);
    temp.y += temp.vy;

	ctx.font = "12px Symbol";
    ctx.strokeStyle="green";
   
   
    // ctx.globalCompositeOperation = 'destination-over';
	ctx.fillStyle="#000000"; //replace previous letter with a blank
    ctx.fillRect(temp.x ,temp.y ,10,12);  //if we can't put a space there, blank it with a box
    
    //does not create an object or text node that you can edit afterwards. 
    //It will fill text on canvas, that means it will leave pixels on canvas.       
	ctx.strokeText(RandomLetter(),temp.x ,temp.y );
    
    if(temp.x > w)temp.x = 0;
    if(temp.x < 0)temp.x = w;
    if(temp.y > h)temp.y = 0;
    if(temp.y < 0)temp.y = h;
  }
}

function RandomLetter() {
// Generate a random letter
// 97 is the ascii value for 'a'
// or we simply create an array, then randomly pluck a letter using an index
var charChoice = " ¥abcdefghijklmnopqrstuvwxyz¥ABCDEFGHIJKLMNOPQRSTUVWXYZ12345678901234567890¥";
//Placed ¥ in several places to increase the probability of its appearance  -- like the movie.

return charChoice.charAt(randomIntInRange(0,charChoice.length) ) 
} //End RandomLetter

function randomIntInRange(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
} //End randomIntInRange


window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame    ||
          function( callback ){
            window.setTimeout(callback, 1000 / 60); 
          };
})();

(function init(){
  for(var i = 0; i < patriclesNum; i++){
    particles.push(new Factory);
  }
})();

(function loop(){
  draw();
  requestAnimFrame(loop);
})();


