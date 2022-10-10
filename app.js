//
//p.addEventListener("click", e => {console.log(e.target)})
const modal = document.querySelector(".modal-container");
const modalTitle = document.querySelector(".modal-container h3");
const nastepnaGra = document.querySelector(".modal-container button.again");
const koniec = document.querySelector(".modal-container button.end");

const zwyciestwa = document.querySelector(".wynik .gracz span");
const remisy = document.querySelector(".wynik .remis span");
const przegrane = document.querySelector(".wynik .komputer span");

let plansza = ["","","","","","","","",""]

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
    //console.log("Postaw kolko plansza: ")
    //console.log(plansza)
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

});
rysujPlansze();

