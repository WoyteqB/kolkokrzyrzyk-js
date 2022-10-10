//const p = document.querySelector(".plansza");
//p.addEventListener("click", e => {console.log(e.target)})

const przyciski = document.querySelectorAll(".plansza .pole button");
przyciski.forEach( (przycisk, index) => {
    przycisk.addEventListener("click", e => postawKrzyzyk(e, przycisk, index));
} );

let plansza = ["X","","","O","","","","",""]

let wygrana = false;
let koniecGry = false;

let postawKrzyzyk = (e, button, index)=>{
    console.log("Klasa "+button.className);
    if(e.target.innerText === ""){
        plansza[index]="X";
        sprawdzWygrana();
        postawKolko();
        rysujPlansze();
        console.log(e.target);
    }
};

let postawKolko = () => {
    let ileWolnychPol = plansza.filter( pole => pole==="").length;
    console.log("ile wolnych pol: "+ileWolnychPol);
    let losowaLiczba = Math.floor(Math.random()  *ileWolnychPol)
    console.log("Losowa liczba: "+losowaLiczba)
    let licznik = 0;
    let kolko = true;
    while(kolko){
        //console.log("Licznik: "+licznik)
        if(plansza[licznik] === ""){
            if(losowaLiczba === 0){
                plansza[licznik] = "O";
                kolko=false;
                console.log("Postawiłek kółko: "+ licznik )
            }else{
                losowaLiczba--;
            }

        }
        licznik++;
        if(licznik>10) kolko = false;
    }
    console.log("Postaw kolko plansza: ")
    console.log(plansza)
}

let rysujPlansze = () => {
    przyciski.forEach( (przycisk, index) => {
        przycisk.innerHTML = plansza[index];
        if(plansza[index] !== ""){
            przycisk.removeEventListener("click", e => postawKrzyzyk(e, przycisk, index));
            przycisk.classList.add("used")
        }
    } )
}

let sprawdzWygrana = () =>{
    console.log("wygrana?")
    for(let i = 0; i < 3; i++){
        if(plansza[(i*3)]!=="" && plansza[(i*3)] === plansza[(i*3)+1] && plansza[(i*3)+1] === plansza[(i*3)+2]){
            console.log(plansza[(i*3)+1]);
        }
        if(plansza[i]!=="" && plansza[i] === plansza[i+3] && plansza[i+3] === plansza[i+6]){
            console.log(plansza[i]);
        }
    }
    if(plansza[4]!=="" && plansza[0] === plansza[4] && plansza[4] === plansza[8]){
        console.log(plansza[0]);
    }else if(plansza[4]!=="" && plansza[2] === plansza[4] && plansza[4] === plansza[6]){
        console.log(plansza[2]);
    }
    
}

rysujPlansze();

