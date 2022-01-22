var block = document.getElementById("block");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var jumping = 0;
var counter = 0;


//eventlisner to make the hole
//"animationiteration" mean this code is emplemented after every animationiteration
//what we do here change the top position of hole 
// this return value between 150 to 450 in negative
//


hole.addEventListener('animationiteration', () => {
    var random = -((Math.random()*300)+150);
    hole.style.top = random + "px";
    counter++;
});

/* to simulate gravity */

setInterval(function(){
    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top")); // get the top of the character (100)
    if(jumping==0){
        character.style.top = (characterTop+3)+"px";// top is incresing which mean the chracter go down
    }
    var blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var cTop = -(500-characterTop);
    if((characterTop>480)||((blockLeft<20)&&(blockLeft>-50)&&((cTop<holeTop)||(cTop>holeTop+130)))){
        var val = confirm("Game over. Score: "+(counter));
            if (val == true) {
                window.location.href = "index.html";
            } else {
                window.location.href = "../Home.html";
            }
        character.style.top = 100 + "px";
        counter=0;
    }
},10);

function jump(){
    jumping = 1;
    let jumpCount = 0;
    var jumpInterval = setInterval(function(){
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop>6)&&(jumpCount<15)){
            character.style.top = (characterTop-5)+"px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping=0;
            jumpCount=0;
        }
        jumpCount++;
    },10);
}