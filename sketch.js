let data;

let minLat, minLon, maxLat, maxLon;


function preload() {
  data=loadTable("assets/volcanoes.csv", "csv", "header");

}

function setup() {
  let c = createCanvas(windowWidth/1.5, windowHeight/1.5);
  c.parent("sketch-holder");

  //definisco min e max per la latitudine
  let allLat = data.getColumn("Latitude");
  minLat = min(allLat);
  maxLat = max(allLat);

  let allLon = data.getColumn("Longitude");
  minLon = min(allLon);
  maxLon = max(allLon);

}

function draw() {
  background(2, 16, 28);
  
 
  // Avvio del ciclo
  for(let rowNumber = 0; rowNumber < data.getRowCount(); rowNumber ++) {
    let lon = data.getNum(rowNumber, "Longitude");
    let lat = data.getNum(rowNumber, "Latitude");
    let country = data.getString(rowNumber, "Country");
    let name = data.getString(rowNumber, "Volcano Name");

    let x = map(lon, minLon, maxLon, 0, width);

    let y = map(lat, maxLat, minLat, 0, height);
  
    let radius = 10;
    let d = dist(x, y, mouseX, mouseY);

    // --- DISEGNO DELL'ELLISSE ---
    // Imposto il riempimento per l'ellisse
    if(d < radius) {
      fill(244, 213, 141); // Colore in hover
    } 
    else { 
      fill(112, 141, 129); // Colore normale
    }
    
    // Disegno l'ellisse 
    ellipse(x, y, radius); 

    // --- DISEGNO DEL TESTO ---
    // Se il mouse è sopra, disegno il testo
    if (d < radius) {
      push();
      let currentTextSize = 12; 
      textSize(currentTextSize);
  
      // 1. DEFINIZIONE DELLE RIGHE DI TESTO
      let line1 = name;
      let line2 = country;
      let line3 = "Lat: " + lat.toFixed(2); 
      let line4 = "Lon: " + lon.toFixed(2); 
  
      // 2. CALCOLO DELLA LARGHEZZA MASSIMA DEL TESTO
      let maxW = max(textWidth(line1), textWidth(line2), textWidth(line3), textWidth(line4));
      
      let rectPadding = 20; 
      let totalLines = 4;
      let lineHeight = currentTextSize + 4;
  
      // 3. CALCOLO ALTEZZA E CENTRO DEL RIQUADRO
      let rectHeight = (totalLines * lineHeight) + rectPadding;
      let yCenter = y - radius - 40;
  
      // SFONDO DEL TOOLTIP ─ rettangolo smussato
      fill(112, 141, 129, 70);
      noStroke();
      rectMode(CENTER);
      rect(x, yCenter, maxW + rectPadding, rectHeight, 10);  // <-- angoli smussati (10px)
  
      // TESTO CENTRATO
      fill('white');
      textAlign(CENTER, CENTER);   // <-- centrato orizzontalmente e verticalmente
      textSize(currentTextSize);
  
      // Calcolo posizione verticale del primo testo
      let yStart = yCenter - (rectHeight / 2) + rectPadding/2+ 5;
  
      // Disegno testo centrato
      text(line1, x, yStart); 
      text(line2, x, yStart + lineHeight);
      text(line3, x, yStart + 2 * lineHeight);
      text(line4, x, yStart + 3 * lineHeight);
  
      pop();

      return;
  }
}
}

function mousePressed() {
  let radius = 10;

  // Controllo tutti i vulcani
  for (let rowNumber = 0; rowNumber < data.getRowCount(); rowNumber++) {
    let lon = data.getNum(rowNumber, "Longitude");
    let lat = data.getNum(rowNumber, "Latitude");

    let x = map(lon, minLon, maxLon, 0, width);
    let y = map(lat, maxLat, minLat, 0, height);

    let d = dist(x, y, mouseX, mouseY);

    if (d < radius) {
      // qui avviene il click sul pallino
      let name = data.getString(rowNumber, "Volcano Name");

      // apri una pagina con il nome del vulcano come parametro
      window.location.href = `index_2.html?name=${encodeURIComponent(name)}`;
      
      // Interrompo il ciclo
      return;
    }
  }
}