let data;
let selectedName;

function preload() {
  data = loadTable("assets/volcanoes.csv", "csv", "header");

  imgActive = loadImage("assets/vulcano_attivo.png");     
  imgInactive = loadImage("assets/vulcano_nonattivo.png"); 
}

function setup() {
  createCanvas(windowWidth/1.5, windowHeight/1.5);
  
  background(2, 16, 28);

  fill(255);
  textSize(24);

  // 1. Recupero nome
  const params = new URLSearchParams(window.location.search);
  selectedName = params.get("name");

  if (!selectedName) {
    text("Nessun vulcano selezionato.", 50, 50);
    return;
  }

  // 2. Cerco il vulcano nel CSV
  let found = false;

  for (let i = 0; i < data.getRowCount(); i++) {
    let name = data.getString(i, "Volcano Name");

    if (name === selectedName) {

      // --- 3. Recupero le info  ---
      let country = data.getString(i, "Country");
      let elevation = data.getNum(i, "Elevation (m)");
      let type = data.getString(i, "Type");
      let status = data.getString(i , "Status");

  // --- 4. Visualizzazione ---
      push();  
        textSize(32);
        let title = name;

        let x = 50;
        let y = 80;

        let w = textWidth(title);
        let paddingV = 10;   
        let paddingH = 20;   

        // --- SFONDO DEL NOME ---
        fill(112, 141, 129, 70);    
        stroke(255);
        rect(
          x - paddingH,
          y - 30 - paddingV/2,
          w + paddingH ,
          40 + paddingV,
          10
        );
      pop();

      text(name, x, y)

      textSize(18);
      text("Paese: " + country, 50, 120);
      text("Altitudine: " + elevation, 50, 150);
      text("Tipo: " + type, 50, 180);
      text("Stato: " + status, 50, 210);

      // --- SCELTA IMMAGINE IN BASE ALLO STATO ---
      let imgY = 280;     // distanza dal testo
      let imgX = 50; // centro pagina
      let imgSize = 200;  // dimensione immagine

      image(imgActive, imgX, imgY, imgSize, imgSize);

      

      found = true;
      break;
    }
  }

  if (!found) {
    text("Vulcano non trovato nel dataset.", 50, 50);
  }
}

function draw() {
  
}


