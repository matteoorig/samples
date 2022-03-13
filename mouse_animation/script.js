const lerp = (a,b,n) => (1-n) * a + n * b;

const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;

    if (!e) e = window.event;
    if (e.clientX || e.clientY) {
      posx = e.clientX;
      posy = e.clientY;
    }
    return { 
        x: posx, 
        y: posy 
    };
};
const getSiblings = (e) => {
    let siblings = [];

    if (!e.parentNode) {
      return siblings;
    }

    let sibling = e.parentNode.firstChild;


    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== e) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }

    return siblings;
};

//Cursor
let mouse = {
  x:0,
  y:0
};

window.addEventListener("mousemove", (ev) =>(mouse = getMousePos(ev)));

class Cursor{
  constructor(el){
      this.Cursor = el;
      this.Cursor.style.opacity = 0;
      this.Item = document.querySelectorAll("h1");
      this.Hero = document.querySelector(".container");
      this.bounds = this.Cursor.getBoundingClientRect();
      this.cursorConfigs = {
        x: {previous: 0, current: 0, amt: 0.2},
        y: {previous: 0, current: 0, amt: 0.2},
      }
      this.onMouseMoveEv = () =>{
        this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x;
        this.cursorConfigs.y.previous = this.cursorConfigs.y.current = mouse.y;

        //animation
        gsap.to(this.Cursor, {
          duration:1,
          ease: "Power3.easeOut",
          opacity:1,
        })

        this.onScaleMouse();
        requestAnimationFrame(()=> this.render());

        //funzione di clean-up
        window.removeEventListener("mousemove", this.onMouseMoveEv)
      }

      //assegno eventListener personalizzato al mouse
      window.addEventListener("mousemove", this.onMouseMoveEv);
  }

  onScaleMouse() {
    // Loop through all items
    this.Item.forEach((link) => {
      
      //event in entrata nel container del titolo
      link.addEventListener("mouseenter", () => {
        this.Cursor.classList.add("media-blend");
        this.scaleAnimation(this.Cursor.children[0], 0.8, 0.6);
      });

      //event in uscita dal container del titolo
      link.addEventListener("mouseleave", () => {
        this.Cursor.classList.remove("media-blend");
        this.scaleAnimation(this.Cursor.children[0], 0, 0.8);
      });
    });
   }

   scaleAnimation(el, amt, duration){
    gsap.to(el, {
      duration:duration,
      scale: amt,
      ease: "Power3.easeOut",
    })
   }





  render(){
    this.cursorConfigs.x.current = mouse.x;
    this.cursorConfigs.y.current = mouse.y;

    for(const k in this.cursorConfigs){
      this.cursorConfigs[k].previous = lerp(
        this.cursorConfigs[k].previous,
        this.cursorConfigs[k].current,
        this.cursorConfigs[k].amt
      );
    }

    //render in html
    this.Cursor.style.transform = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`;

    requestAnimationFrame(()=> this.render());
  }
}

//main
const body = document.querySelector("body");
window.onload = () =>{
  body.classList.remove("loading");
  gsap.from(body, {
    opacity:0,
    duration:1,
    ease:"Power3.easeInOut",
  })
  const cursor = new Cursor(document.querySelector(".cursor"));
}