//original author is
//Julian Garnier

//https://github.com/juliangarnier/anime/
//https://codepen.io/juliangarnier/pen/gmOwJX


//editing it for meee


var count=0;
var animating
var canvasEl = document.querySelector('.fireworks');
var head = document.querySelector('.portfolio');
var inView= true;
var ctx = canvasEl.getContext('2d');//rendering context is 2d>?
var numberOfParticules = 20;
var pointerX = 0;
var pointerY = 0;
/*
var tap = ('ontouchstart' in window || navigator.msMaxTouchPoints) ? 'touchstart' : 'mousedown';//mouse or touch screen?
*/
var colors = ['#ffa600', '#36471A', '#36471A', '#ffa600'];

function setCanvasSize() {
  canvasEl.width = head.clientWidth *2 ;
  canvasEl.height = head.clientHeight *2 ;
  canvasEl.style.width = head.clientWidth + 'px';
  canvasEl.style.height = head.clientHeight + 'px';
  canvasEl.getContext('2d').scale(2, 2);
}

/*function updateCoords(e) {
  pointerX = e.clientX || e.touches[0].clientX;
  pointerY = e.clientY || e.touches[0].clientY;
}
*/
function setParticuleDirection(p) {
  var angle = anime.random(0, 360) * Math.PI / 180;
  var value = anime.random(200, 600);
  var radius = [-1, 1][anime.random(0, 1)] * value;
  return {
    x: p.x + radius * Math.cos(angle),
    y: p.y + radius * Math.sin(angle)
  }
}
//particle 
function createParticule(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = colors[anime.random(0, colors.length - 1)];
  p.radius = anime.random(0.1, 1);//circle size
  p.endPos = setParticuleDirection(p);
  p.draw = function() {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 2 * Math.PI, true);
    ctx.fillStyle = p.color;
    ctx.fill();
  }
  return p;
}

function createCircle(x,y) {
  var p = {};
  p.x = x;
  p.y = y;
  p.color = '#FFF';
  p.radius = 1;
  p.alpha = .2;
  p.lineWidth =3;
  p.draw = function() {
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, 0.2 * Math.PI, true);
    ctx.lineWidth = p.lineWidth;
    ctx.strokeStyle = p.color;

    ctx.stroke();
    ctx.globalAlpha = 1;
  }
  return p;
}

function renderParticule(anim) {
  for (var i = 0; i < anim.animatables.length; i++) {
    anim.animatables[i].target.draw();
  }
}

function animateParticules(x, y) {
  var circle = createCircle(x, y);
  var particules = [];
  for (var i = 0; i < numberOfParticules; i++) {
    particules.push(createParticule(x, y));
  }
  anime.timeline().add({
    targets: particules,
    x: function(p) { return p.endPos.x; },
    y: function(p) { return p.endPos.y; },
    radius: 4,
    duration: anime.random(1500, 2700),
    easing: 'linear',
    update: renderParticule
  })
    .add({
    targets: circle,
    radius: anime.random(1600, 1800),
    lineWidth: 0,
    alpha: {
      value: 0,
      easing: 'linear',
      duration: anime.random(1200, 2000),  
    },
    duration: anime.random(1000, 2100),
    easing: 'linear',
    update: renderParticule,
    offset: 0,

  });
}

var render = anime({
  duration: Infinity,
  update: function() {
     // if(count>300){
    ctx.clearRect(0.0, 0.0, canvasEl.width, canvasEl.height);
    count =0;
     // }
     // else return;
  },
});
/* //click function-- removed it cuz im not using it
document.addEventListener(tap, function(e) {
  window.human = true;
  updateCoords(e);
  animateParticules(pointerX, pointerY);
}, false);
*/
var centerX = window.innerWidth / 2;
var centerY = window.innerHeight / 2;

function animate() {
    if( !isAnyPartOfElementInViewport(canvasEl)){
        console.log("out of view")
        animating = false
        return     
        }
        else{
            animating = true;
            render.play();

        }
  animateParticules(
    //where the auto click position is
    //changed it so thats its ranomd across whole canvas
    //removed on click too
    anime.random(canvasEl.width-100, 0), 
    anime.random(canvasEl.height-100, 0)
  );

  anime({duration: 5}).finished.then(animate);
  count++;
console.log("animating" + count);
  //click again after time
}
    animate();


setCanvasSize();

window.addEventListener('resize', setCanvasSize, );
window.addEventListener('scroll', animateDelay  );

//to unload function


function animateDelay(){
    if(animating){
        return    console.log ("already animating"); //stop it spamming more animations   
    }
    window.setTimeout( 
            animate()
        
     , 1000)
        
}

function isAnyPartOfElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    const windowHeight = (window.innerHeight || document.documentElement.clientHeight);
    const windowWidth = (window.innerWidth || document.documentElement.clientWidth);
    const vertInView = (rect.top <= windowHeight) && ((rect.top + rect.height) >= 0);
    const horInView = (rect.left <= windowWidth) && ((rect.left + rect.width) >= 0);

    return (vertInView && horInView);
  }