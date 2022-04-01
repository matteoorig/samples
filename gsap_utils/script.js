const item = document.querySelector(".item");
/*
    item può essere sia un oggetto DOM che un var qualsiasi
        var obj = {PROP: 10}
        gsap.to(item, {
            duration: 3,
            PROP:300,
            onUpdate: () =>{
               ...
            }
        })


*/
gsap.to(item, {
    duration: 3,
    x:300,
})