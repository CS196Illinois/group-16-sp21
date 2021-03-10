function sendDown() {
     window.scrollTo(0,4500);
}

var firstgif = "assets/firstpic1.gif";
var secondgif = "assets/frame20.png";
var onScrollHandler = function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

     if(scrollTop!=0) {
        document.getElementById("motivate").innerHTML = "Great!";
        document.getElementById("motivate").style.opacity = 0;
        document.getElementById("motivate").style.transitionDuration = "0.5s";
    }

    if ((scrollTop > 1250) && (firstgif != "assets/firstpic2.gif")) {
        firstgif = "assets/firstpic2.gif";
        document.getElementById("firstpic").src = firstgif;
    } 
                    
    if ((scrollTop < 1240) && (firstgif != "assets/firstpic1.gif")) {
        firstgif = "assets/firstpic1.gif";
        document.getElementById("firstpic").src = firstgif;
    }

    if ((scrollTop > 1730)) {
        document.getElementById("secondpic").style.opacity = 1;
                        document.getElementById("secondpic").style.transitionDuration = "0.2s";
    }

    if ((scrollTop < 1730)) {
        document.getElementById("secondpic").style.opacity = 0;
    }
                    
    if ((scrollTop < 2550) && (secondgif != "assets/frame20.png")) {
        secondgif = "assets/frame20.png";
        document.getElementById("secondpic").src = secondgif;
    }

    if ((scrollTop > 2550) && (secondgif != "assets/secondpic3.gif")) {
        secondgif = "assets/secondpic3.gif";
        document.getElementById("secondpic").src = secondgif;
    }
                
};
document.addEventListener("scroll", onScrollHandler);