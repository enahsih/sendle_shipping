//numbers counter in the about page

let valdisplay=document.getElementsByClassName("cu");
console.log(valdisplay);
let interval=3000;

Array.from(valdisplay).forEach(element => {
    let startvalue=0;
    let endvalue=parseInt(element.getAttribute("data-val"));
    let duration=Math.floor(interval/endvalue);
    let counter=setInterval(function(){
        startvalue += 2;
        element.innerHTML = startvalue + "+";
        if(startvalue===endvalue){
            clearInterval(counter);
        }

    }, duration)
    
});
