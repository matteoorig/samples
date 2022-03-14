var tl = new TimelineMax({onUpdate: updatePercentage});
const controller = new ScrollMagic.Controller();

const container = document.querySelector(".container");

tl.from(".item", .5, {x: 200, opacity: 0})

const scene = new ScrollMagic.Scene({
    triggerElement: ".container",
    triggerHook: "onLeave",
    duration: "100%"
}).setPin(".container").setTween(tl).addTo(controller);

function updatePercentage(){
    tl.progress();
    console.log( window.innerHeight);
    
}