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



//main
import gsap from "gsap";
let mouse = {x: 0, y: 0};
window.addEventListener("mousemove", (ev) => (mouse = getMousePos(ev)));
class Cursor {
  constructor(el) {
    // Varibles
    this.Cursor = el;
    this.Cursor.style.opacity = 0;
    this.Item = document.querySelectorAll(".hero-inner-link-item");
    this.Hero = document.querySelector(".hero-inner");
    this.bounds = this.Cursor.getBoundingClientRect();
    this.cursorConfigs = {
      x: { previous: 0, current: 0, amt: 0.2 },
      y: { previous: 0, current: 0, amt: 0.2 },
    };
    this.onMouseMoveEv = () => {
      this.cursorConfigs.x.previous = this.cursorConfigs.x.current = mouse.x;
      this.cursorConfigs.y.previous = this.cursorConfigs.y.previous = mouse.y;

      // Set cursor opacity to 1 when hovered on screen
      gsap.to(this.Cursor, {
        duration: 1,
        ease: "Power3.easeOut",
        opacity: 1,
      });
      // Execute scale function
      this.onScaleMouse();

      // The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.
      requestAnimationFrame(() => this.render());
      // Clean up function
      window.removeEventListener("mousemove", this.onMouseMoveEv);
    };
    // Scale cursor animation
    window.addEventListener("mousemove", this.onMouseMoveEv);
  }
  render() {
    this.cursorConfigs.x.current = mouse.x;
    this.cursorConfigs.y.current = mouse.y;

    // lerp
    for (const key in this.cursorConfigs) {
      // key will be x & y
      // WTF IS LERP?
      // Lerp - A lerp returns the value between two numbers at a specified, decimal midpoint:
      this.cursorConfigs[key].previous = lerp(
        this.cursorConfigs[key].previous,
        this.cursorConfigs[key].current,
        this.cursorConfigs[key].amt
      );
    }
    // Setting the cursor x and y to our cursoer html element
    this.Cursor.style.transform = `translateX(${this.cursorConfigs.x.previous}px) translateY(${this.cursorConfigs.y.previous}px)`;
    // RAF
    requestAnimationFrame(() => this.render());
  }
}


