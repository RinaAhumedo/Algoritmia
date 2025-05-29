// Declaramos una función que recibe dos parámetros y retorna la suma
function sumar(a, b) {
    return a + b;
  }
  
  // Función que recoge los datos del HTML, llama a 'sumar' y muestra el resultado
  function mostrarResultado() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
  
    let resultado = sumar(num1, num2);
  
    document.getElementById("resultado").textContent = resultado;
  }