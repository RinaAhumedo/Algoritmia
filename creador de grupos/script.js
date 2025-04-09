const fileInput = document.getElementById("fileInput");
const message = document.getElementById("message");
const studentList = document.getElementById("studentList");
const groupsContainer = document.getElementById("groups");
const resetBtn = document.getElementById("resetBtn");

fileInput.addEventListener("change", handleFile);
resetBtn.addEventListener("click", () => {
  fileInput.value = "";
  message.textContent = "";
  studentList.innerHTML = "";
  groupsContainer.innerHTML = "";
  resetBtn.style.display = "none";
});

function handleFile(e) {
  const file = e.target.files[0];
  if (!file) return;

  const isCSV = file.name.endsWith(".csv");
  const isExcel = file.name.endsWith(".xlsx") || file.name.endsWith(".xls");

  if (!isCSV && !isExcel) {
    message.textContent = "Formato de archivo no válido. Usa CSV o Excel.";
    return;
  }

  if (file.size > 50 * 1024 * 1024) {
    message.textContent = "Archivo demasiado grande. Máximo 50MB.";
    return;
  }

  const reader = new FileReader();
  reader.onload = function (event) {
    let students = [];

    if (isCSV) {
      const text = event.target.result;
      const lines = text.split("\n").filter(Boolean);
      const headers = lines[0].split(";").map(h => h.trim().toLowerCase());
      const nameIdx = headers.indexOf("apellidosnombres");
      const genderIdx = headers.indexOf("genero");

      if (nameIdx === -1 || genderIdx === -1) {
        message.textContent = "El archivo debe tener columnas 'ApellidosNombres' y 'Genero'.";
        return;
      }

      students = lines.slice(1).map(line => {
        const cols = line.split(";");
        return {
          nombre: cols[nameIdx].trim(),
          genero: cols[genderIdx].trim().toUpperCase()
        };
      }).filter(s => s.nombre && (s.genero === 'F' || s.genero === 'M'));

      processData(students);
    } else {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const headers = json[0].map(h => h.toLowerCase());
      const nameIdx = headers.indexOf("apellidosnombres");
      const genderIdx = headers.indexOf("genero");

      if (nameIdx === -1 || genderIdx === -1) {
        message.textContent = "El archivo debe tener columnas 'ApellidosNombres' y 'Genero'.";
        return;
      }

      students = json.slice(1).filter(row => row[nameIdx] && row[genderIdx]).map(row => ({
        nombre: row[nameIdx].trim(),
        genero: row[genderIdx].trim().toUpperCase()
      }));

      processData(students);
    }
  };

  if (isCSV) {
    reader.readAsText(file);
  } else {
    reader.readAsBinaryString(file);
  }
}

function processData(students) {
  message.textContent = "Archivo cargado correctamente.";
  resetBtn.style.display = "inline-block";

  students.sort((a, b) => a.nombre.localeCompare(b.nombre));
  studentList.innerHTML = "";
  students.forEach(s => {
    const li = document.createElement("li");
    li.textContent = `${s.nombre} (${s.genero})`;
    studentList.appendChild(li);
  });

  generateGroups(students);
}

function generateGroups(students) {
  const females = students.filter(s => s.genero === "F");
  const males = students.filter(s => s.genero === "M");
  const groups = [];

  shuffle(females);
  shuffle(males);

  while (females.length > 0 || males.length > 0) {
    const group = [];

    if (females.length > 0) {
      group.push(females.pop());
    } else if (males.length > 0) {
      group.push(males.pop());
    }

    for (let i = 0; i < 2; i++) {
      if (males.length > 0) {
        group.push(males.pop());
      } else if (females.length > 0) {
        group.push(females.pop());
      }
    }

    groups.push(group);
  }

  groupsContainer.innerHTML = "";
  groups.forEach((group, idx) => {
    const div = document.createElement("div");
    div.className = "group";
    div.innerHTML = `<strong>Grupo ${idx + 1}</strong><ul>` + 
      group.map(p => `<li>${p.nombre} (${p.genero})</li>`).join("") + "</ul>";
    groupsContainer.appendChild(div);
  });
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
