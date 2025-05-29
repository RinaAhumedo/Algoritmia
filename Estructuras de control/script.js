function verificarEdad() {
    const edad = parseInt(document.getElementById("edad").value);
    const resultado = document.getElementById("resultado");
  
    if (isNaN(edad)) {
      resultado.textContent = "Por favor, ingresa una edad válida.";
    } else if (edad >= 18) {
      resultado.textContent = "¡Puedes votar!";
      
      // Bucle: mostrar los años desde que puede votar
      let años = "Años en los que has podido votar: ";
      for (let i = 18; i <= edad; i++) {
        años += i + " ";
      }
  
      resultado.textContent += "\n" + años;
    } else {
      resultado.textContent = "Aún no puedes votar. Faltan " + (18 - edad) + " años.";
    }
  }