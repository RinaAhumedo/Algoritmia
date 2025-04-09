const aspirantes = [];
const votos = {};
const codigosUsados = new Set();

const aspiranteForm = document.getElementById("aspiranteForm");
const votanteForm = document.getElementById("votanteForm");
const candidatosContainer = document.getElementById("candidatosContainer");
const listaResultados = document.getElementById("listaResultados");

document.getElementById("iniciarVotacion").addEventListener("click", () => {
  if (aspirantes.length === 0) {
    alert("Registra al menos un aspirante antes de iniciar la votación.");
    return;
  }

  document.getElementById("registro-aspirantes").style.display = "none";
  document.getElementById("votacion").style.display = "block";
  mostrarCandidatos();
  actualizarResultados();
});

aspiranteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreAspirante").value;
  const propuesta = document.getElementById("propuestaAspirante").value;
  const foto = document.getElementById("fotoAspirante").files[0];

  if (!foto) return;

  const reader = new FileReader();
  reader.onload = () => {
    aspirantes.push({
      nombre,
      propuesta,
      foto: reader.result
    });
    votos[nombre] = 0;
    aspiranteForm.reset();
    alert("Aspirante registrado correctamente.");
  };
  reader.readAsDataURL(foto);
});

votanteForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nombre = document.getElementById("nombreVotante").value.trim();
  const curso = document.getElementById("cursoVotante").value.trim();
  const codigo = document.getElementById("codigoEstudiantil").value.trim();
  const elegido = document.querySelector('input[name="candidato"]:checked');

  if (!elegido) {
    alert("Selecciona un candidato para votar.");
    return;
  }

  if (!/^\d{6}$/.test(codigo)) {
    alert("El código estudiantil debe tener 6 dígitos.");
    return;
  }

  if (codigosUsados.has(codigo)) {
    alert("Este código ya ha sido usado. Solo se permite un voto por estudiante.");
    return;
  }

  votos[elegido.value]++;
  codigosUsados.add(codigo);

  votanteForm.reset();
  mostrarCandidatos();
  actualizarResultados();
});

function mostrarCandidatos() {
  candidatosContainer.innerHTML = "";
  aspirantes.forEach((asp, index) => {
    const div = document.createElement("div");
    div.classList.add("candidato");
    div.innerHTML = `
      <input type="radio" name="candidato" value="${asp.nombre}" id="candidato${index}" required />
      <img src="${asp.foto}" alt="${asp.nombre}" />
      <div>
        <label for="candidato${index}"><strong>${asp.nombre}</strong></label><br/>
        <span>${asp.propuesta}</span>
      </div>
    `;
    candidatosContainer.appendChild(div);
  });
}

function actualizarResultados() {
  listaResultados.innerHTML = "";
  const resultados = Object.entries(votos).sort((a, b) => b[1] - a[1]);

  resultados.forEach(([nombre, cantidad]) => {
    const li = document.createElement("li");
    li.textContent = `${nombre}: ${cantidad} voto(s)`;
    listaResultados.appendChild(li);
  });

  const ganadorTexto = document.getElementById("probableGanador");
  if (resultados.length > 0 && resultados[0][1] > 0) {
    ganadorTexto.textContent = `Hasta ahora, ${resultados[0][0]} tiene más probabilidades de ganar con ${resultados[0][1]} voto(s).`;
  } else {
    ganadorTexto.textContent = "Aún no hay votos registrados.";
  }
}
