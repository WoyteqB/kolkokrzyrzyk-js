//
//p.addEventListener("click", e => {console.log(e.target)})
const modal = document.querySelector(".modal-container.game-end");
const modalTitle = document.querySelector(".modal-container.game-end h3");
const nastepnaGra = document.querySelector(".modal-container.game-end button.again");
const koniec = document.querySelector(".modal-container.game-end button.end");

const modalGameStart = document.querySelector(".game-start");
const poziomTrudnosci = document.querySelectorAll(".game-start .poziom button");
const graj = document.querySelector(".game-start .play button");
const zwyciestwa = document.querySelector(".wynik .gracz span");
const remisy = document.querySelector(".wynik .remis span");
const przegrane = document.querySelector(".wynik .komputer span");

let plansza = ["","","","","","","","",""]
let poziom = 1;
let wygrana = false;
let koniecGry = false;

let postawKrzyzyk = (e, button, index)=>{
    //console.log("Klasa "+button.className);
    if(e.target.innerText === ""){
        plansza[index]="X";
        rysujPlansze();
        sprawdzWygrana();
        if(!koniecGry){
            postawKolko();
            rysujPlansze();
            sprawdzWygrana();
        }
        //console.log(e.target);
    }
};

let postawKolko = () => {
    console.log("Czy są dwa X w lini: "+sprawdzCzySaDwaZnakiWLini())
    console.log(sprawdzCzySaDwaZnakiWLini("X") != undefined);
    let dwaXwWierszu = sprawdzCzySaDwaZnakiWLini("X");
    let dwaOwWierszu = sprawdzCzySaDwaZnakiWLini("O");
    if(dwaOwWierszu != undefined && poziom === 3 ){
        //console.log("Do zablokowania pole " + sprawdzCzySaDwaZnakiWLini());
        plansza[dwaOwWierszu]="O";
        //console.log("wstaw  O w miejsce: "+plansza[sprawdzCzySaDwaZnakiWLini()]);
        //console.log(plansza);
    }else if(dwaXwWierszu != undefined && poziom !== 1 ){
        //console.log("Do zablokowania pole " + sprawdzCzySaDwaZnakiWLini());
        plansza[dwaXwWierszu]="O";
        //console.log("wstaw  O w miejsce: "+plansza[sprawdzCzySaDwaZnakiWLini()]);
        //console.log(plansza);
    }else{
        let ileWolnychPol = plansza.filter( pole => pole==="").length;
        //console.log("ile wolnych pol: "+ileWolnychPol);
        let losowaLiczba = Math.floor(Math.random()  *ileWolnychPol)
        //console.log("Losowa liczba: "+losowaLiczba)
        let licznik = 0;
        let kolko = true;
        while(kolko){
            //console.log("Licznik: "+licznik)
            if(plansza[licznik] === ""){
                if(losowaLiczba === 0){
                    plansza[licznik] = "O";
                    kolko=false;
                    //console.log("Postawiłek kółko: "+ licznik )
                }else{
                    losowaLiczba--;
                }
    
            }
            licznik++;
            if(licznik>10) kolko = false;
        }
    }
    //console.log("Postaw kolko plansza: ")
    //console.log(plansza)
}

let sprawdzCzySaDwaZnakiWLini = (item) =>{
    let test = "XX";
    item === "X"? test="XX":test="OO";
    if((plansza[0] + plansza[4] + plansza[8]) === test){
        console.log("Dwa x w lini do zablokowania. skos 1: "+plansza[0] +",2: "+ plansza[4] +",3: "+ plansza[8] );
        //console.log(zrocPustePolePlanszy(0,4,8));
        if(zrocPustePolePlanszy(0,4,8) != undefined){
            return zrocPustePolePlanszy(0,4,8);
        }
    }else if((plansza[2] + plansza[4] + plansza[6]) === test){
        //console.log("Dwa x w lini do zablokowania. / " );
        if(zrocPustePolePlanszy(2,4,6) != undefined){
            return zrocPustePolePlanszy(2,4,6);
        }
    }else{
        for(let i = 0; i < 3; i++){
            if((plansza[(i*3)] + plansza[(i*3)+1] + plansza[(i*3)+2]) === test){
                //console.log("Dwa x w lini do zablokowania. Wiersz "+i );
                if(zrocPustePolePlanszy((i*3),(i*3)+1,(i*3)+2) != undefined){
                    return zrocPustePolePlanszy((i*3),(i*3)+1,(i*3)+2);
                    break;
                }
            }
            if((plansza[i] + plansza[i+3] + plansza[i+6]) === test){
                //console.log("Dwa x w lini do zablokowania. Kolumna: "+i )
                if(zrocPustePolePlanszy(i,i+3,i+6) != undefined){
                    return zrocPustePolePlanszy(i,i+3,i+6);
                    break;
                }
            }
        }
    }
}
let zrocPustePolePlanszy = (el1, el2, el3) => {
    if(plansza[el1] == ""){
        return el1;
    }else if(plansza[el2] == ""){
        return el2;
    }else if(plansza[el3] == ""){
        return el3;
    }else{
        return null;
    }
}

let rysujPlansze = () => {
    let plaszaPusta = 
 `<div class="pole wiersz1 kolumna1">
    <button class="0"></button>
  </div>
  <div class="pole wiersz1 kolumna2">
    <button class="1"></button>
  </div>
  <div class="pole wiersz1 kolumna3">
    <button class="2"></button>
  </div>
  <div class="pole wiersz2 kolumna1">
    <button class="3"></button>
  </div>
  <div class="pole wiersz2 kolumna2">
    <button class="4"></button>
  </div>
  <div class="pole wiersz2 kolumna3">
    <button class="5"></button>
  </div>
  <div class="pole wiersz3 kolumna1">
    <button class="6"></button>
  </div>
  <div class="pole wiersz3 kolumna2">
    <button class="7"></button>
  </div>
  <div class="pole wiersz3 kolumna3">
    <button class="8"></button>
  </div>`;
  const poleGry = document.querySelector(".plansza");
    poleGry.innerHTML = plaszaPusta;
    const przyciski = document.querySelectorAll(".plansza .pole button");
    
    przyciski.forEach( (przycisk, index) => {
        przycisk.innerHTML = plansza[index];
        if(plansza[index] !== ""){
            przycisk.classList.add("used");
        }else{
            przycisk.addEventListener("click", e => postawKrzyzyk(e, przycisk, index));
        }
    } )
}

let sprawdzWygrana = () =>{
    //console.log("wygrana?")
    for(let i = 0; i < 3; i++){
        if(plansza[(i*3)]!=="" && plansza[(i*3)] === plansza[(i*3)+1] && plansza[(i*3)+1] === plansza[(i*3)+2]){
            wyswietlZwyciesce(plansza[(i*3)+1]);
            break;
        }
        if(plansza[i]!=="" && plansza[i] === plansza[i+3] && plansza[i+3] === plansza[i+6]){
            wyswietlZwyciesce(plansza[i]);
            break;
        }
    }
    if(plansza[4]!=="" && plansza[0] === plansza[4] && plansza[4] === plansza[8]){
        wyswietlZwyciesce(plansza[0]);
    }else if(plansza[4]!=="" && plansza[2] === plansza[4] && plansza[4] === plansza[6]){
        wyswietlZwyciesce(plansza[2]);
    }
    if((plansza.filter(pole => pole==="").length)===0 && !koniecGry){
        wyswietlZwyciesce("");
    }
    
}
let wyswietlZwyciesce = (wygrany) =>{
    
    koniecGry = true;
    if(wygrany==="X"){
        modalTitle.innerHTML = "Wygrałeś";
        zwyciestwa.innerHTML = parseInt(zwyciestwa.innerHTML)+1;
    }else if(wygrany==="O"){
        modalTitle.innerHTML = "Przegrałeś";
        przegrane.innerHTML = parseInt(przegrane.innerHTML)+1;
    }else{
        modalTitle.innerHTML = "Remis";
        remisy.innerHTML = parseInt(remisy.innerHTML)+1;
    }
    modal.classList.remove("hidden");
}

nastepnaGra.addEventListener("click", ()=>{
    modal.classList.add("hidden");
    plansza = ["","","","","","","","",""];
    rysujPlansze();
    koniecGry=false;

});
koniec.addEventListener("click", ()=>{
    modal.classList.add("hidden");
    plansza = ["","","","","","","","",""];
    rysujPlansze();
    koniecGry=false;
    przegrane.innerHTML="0";
    zwyciestwa.innerHTML="0";
    remisy.innerHTML="0";
    modalGameStart.classList.remove("hidden");

});
poziomTrudnosci.forEach(przycisk => przycisk.addEventListener("click", (event)=>{
    console.log(event.target);
    poziomTrudnosci.forEach(p => p.classList.add("disable"));
    przycisk.classList.remove("disable");
    if(przycisk.textContent === "Łatwy"){
        poziom = 1;
    }else if(przycisk.textContent === "Średni"){
        poziom = 2;
    }else if(przycisk.textContent === "Trudny"){
        poziom = 3;
    }
    
}));
graj.addEventListener("click", ()=>{
    modalGameStart.classList.add("hidden");
})
rysujPlansze();

