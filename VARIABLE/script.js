// Declaramos variables
const nombre = "Carlos";       // string
let edad = 20;                 // number
let esEstudiante = true;      // boolean

// Creamos el texto con los resultados
let mensaje = "";
mensaje += "Nombre: " + nombre + "<br>";
mensaje += "Edad: " + edad + "<br>";
mensaje += "¿Es estudiante?: " + (esEstudiante ? "Sí" : "No") + "<br>";

// Simulamos un cumpleaños
edad = edad + 1;
mensaje += "Nueva edad después del cumpleaños: " + edad;

// Mostramos el mensaje en la página
document.getElementById("resultado").innerHTML = mensaje;