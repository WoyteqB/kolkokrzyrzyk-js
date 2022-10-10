

let plansza = ["X","","","O","","","","",""]

let wygrana = false;


let postawKrzyzyk = (e, button, index)=>{
    console.log(index);
    plansza[index]="X";
    sprawdzWygrana();
    postawKolko();
    rysujPlansze();
    console.log(e.target);
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
    console.log("Rysuj plansze");
    let text = `<div class="pole wiersz1 kolumna1">
                    <button class="1"></button>
                </div>
                <div class="pole wiersz1 kolumna2">
                    <button class="2"></button>
                </div>
                <div class="pole wiersz1 kolumna3">
                    <button class="3"></button>
                </div>
                <div class="pole wiersz2 kolumna1">
                    <button class="4"></button>
                </div>
                <div class="pole wiersz2 kolumna2">
                    <button class="5"></button>
                </div>
                <div class="pole wiersz2 kolumna3">
                    <button class="6"></button>
                </div>
                <div class="pole wiersz3 kolumna1">
                    <button class="7"></button>
                </div>
                <div class="pole wiersz3 kolumna2">
                    <button class="8"></button>
                </div>
                <div class="pole wiersz3 kolumna3">
                    <button class="9"></button>
                </div>`;

    document.querySelector(".plansza").innerHTML = text;
    const przyciski = document.querySelectorAll(".plansza .pole button");
    przyciski.forEach( (przycisk, index) => {
        przycisk.innerHTML = plansza[index];
        //console.log(plansza[index]);
        if(plansza[index] === ""){
            przycisk.addEventListener("click", e => postawKrzyzyk(e, przycisk, index));
        }else{
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

