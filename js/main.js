"use strict";

// FUNZIONI
// cambio immagine - scorrere le classi tra gli elementi
function cambioImmagine() {
  domItems[contImmagine].classList.remove("active");
  domThumbnails[contImmagine].classList.remove("selected");

  domItems[nuovaPosizione].classList.add("active");
  domThumbnails[nuovaPosizione].classList.add("selected");

  contImmagine = nuovaPosizione;
}

function play() {
  if (contImmagine + 1 >= immagini.length) {
    // la nuova posizione è 0
    nuovaPosizione = 0;
  } else {
    // La nuova posizione è l'immagine successiva
    nuovaPosizione = contImmagine + 1;
  }
  cambioImmagine();
}

// PROGRAMMA

// assegnazione / dichiarazione variabile per il container
const container = document.querySelector(".container");
const row = document.createElement("div");
row.classList.add("row");
container.prepend(row);
// creazione elemento items
const items = document.createElement("div");
// aggiungo classe items
items.classList.add("items");
// appendo al container
row.append(items);

// array di oggetti - immagine, titolo, descrizione
const paesaggi = [
  {
    immagine: "01.jpg",
    titolo: "Paesaggio numero uno",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed consectetur massa. Donec dapibus ex sit amet diam commodo, eget porttitor diam dictum.",
  },
  {
    immagine: "02.jpg",
    titolo: "Paesaggio numero due",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed consectetur massa. Donec dapibus ex sit amet diam commodo, eget porttitor diam dictum. Aliquam porta accumsan augue, vel dictum erat volutpat a. Etiam sed egestas elit, et elementum ipsum. Aenean eu risus in massa fermentum condimentum. Duis facilisis quis lectus ut facilisis. Ut volutpat ipsum lectus, at suscipit augue maximus sed.",
  },
  {
    immagine: "03.jpg",
    titolo: "Paesaggio numero tre",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed consectetur massa.",
  },
  {
    immagine: "04.jpg",
    titolo: "Paesaggio numero quattro",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed consectetur massa. Donec dapibus ex sit amet diam commodo, eget porttitor diam dictum. Aliquam porta accumsan augue, vel dictum erat volutpat a. Etiam sed egestas elit, et elementum ipsum. Aenean eu risus in massa fermentum condimentum. Duis facilisis quis lectus ut facilisis. Ut volutpat ipsum lectus, at suscipit augue maximus sed.",
  },
  {
    immagine: "05.jpg",
    titolo: "Paesaggio numero cinque",
    descrizione:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed consectetur massa. Donec dapibus ex sit amet diam commodo, eget porttitor diam dictum.",
  },
];

// contatore immagini
let contImmagine = 0;

// creazione thumbnails nel dom
const miniature = document.createElement("div");
// aggiungo la classe thumbnails
miniature.classList.add("thumbnails");
// aggiungo nel dom
row.append(miniature);

// creazione elementi item e immagine
for (let i = 0; i < paesaggi.length; i++) {
  // creazione elemento item
  const item = document.createElement("div");
  // aggiungo classe item
  item.classList.add("item");
  // appendo item al contenitore items
  items.append(item);

  // creazione thumbnail
  const miniatura = document.createElement("div");
  // aggiungo classe thumbnail
  miniatura.classList.add("thumbnail");
  // inserisco in thumbnails
  miniature.append(miniatura);

  // creazione layer
  const layer = document.createElement("div");
  // classe layer
  layer.classList.add("layer");
  // inserito in miniatura
  miniatura.append(layer);

  // assegnazione variabile active e selected
  if (contImmagine === i) {
    item.classList.add("active");
    layer.classList.add("selected");
  }

  // inserisco le immagini dell'array nel dom
  const img = document.createElement("img");
  img.src = `img/${paesaggi[i].immagine}`;
  img.alt = `Paesaggio ${i + 1}`;
  // inserisco immagine in item
  item.append(img);

  // creazione elementi titolo e descrizione - inserimento in classe item
  // -- titolo
  const titolo = document.createElement("h2");
  titolo.classList.add("titolo");
  titolo.innerHTML = `${paesaggi[i].titolo}`;
  item.append(titolo);
  // -- descrizione
  const descrizione = document.createElement("p");
  descrizione.classList.add("descrizione");
  descrizione.innerHTML = `${paesaggi[i].descrizione}`;
  item.append(descrizione);

  // inserisco immagini nelle miniature
  const imgMiniature = document.createElement("img");
  imgMiniature.src = `img/${paesaggi[i].immagine}`;
  imgMiniature.alt = `Paesaggio ${i + 1}`;
  // inserisco immagine in miniatura
  miniatura.append(imgMiniature);

  // click miniature
  miniatura.addEventListener("click", function () {
    if (layer !== document.querySelector(".selected")) {
      document.querySelector(".selected").classList.remove("selected");
      layer.classList.add("selected");
    }
  });
}

// creazione frecce
// freccia in alto
const alto = document.createElement("div");
// assegnazione classe prev
alto.classList.add("prev");
// inserimento in items
miniature.append(alto);
// freccia in basso
const basso = document.createElement("div");
// assegnazione classe prev
basso.classList.add("next");
// inserimento in items
miniature.append(basso);

// Nuovo indice
let nuovaPosizione = 0;

const domItems = document.querySelectorAll(".item");
const domThumbnails = document.querySelectorAll(".layer");

// evento per cambiare le immagini
// scorrere in dietro
alto.addEventListener("click", function () {
  // se il contatore è inferiore a 0
  if (contImmagine - 1 < 0) {
    // la nuova posizione è l'ultima immagine dell'array
    nuovaPosizione = immagini.length - 1;
  } else {
    // La nuova posizione è l'immagine precedente
    nuovaPosizione = contImmagine - 1;
  }
  cambioImmagine();
});

// scorrere in avanti
basso.addEventListener("click", function () {
  // se il contatore è maggiore/uguale alla lunghezza dell'array
  play();
});

// bottoni play stop
const buttonPlay = document.querySelector("button:first-child");
const buttonStop = document.querySelector("button:last-child");

// variabile globale
let intervallo;

// al click del bottone play viene eseguita la timing function
buttonPlay.addEventListener("click", function () {
  intervallo = setInterval(play, 3000);
});

// al click del bottone stop viene fermata la timing function
buttonStop.addEventListener("click", function () {
  clearInterval(intervallo);
});
