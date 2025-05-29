let frutas = ["manzana", "pera", "banana"];
const lista = document.getElementById("listaFrutas");

function mostrarFrutas(array) {
  lista.innerHTML = "";
  array.forEach(fruta => {
    const li = document.createElement("li");
    li.textContent = fruta;
    lista.appendChild(li);
  });
}

// Mostrar frutas al cargar
mostrarFrutas(frutas);

// Métodos de array en acción
function agregarFruta() {
  frutas.push("naranja");
  mostrarFrutas(frutas);
}

function eliminarUltima() {
  frutas.pop();
  mostrarFrutas(frutas);
}

function filtrarFrutas() {
  const filtradas = frutas.filter(f => f.includes("a"));
  mostrarFrutas(filtradas);
}

function convertirMayusculas() {
  const mayusculas = frutas.map(f => f.toUpperCase());
  mostrarFrutas(mayusculas);
}