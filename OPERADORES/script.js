function verificarDescuento() {
    let edad = parseInt(document.getElementById("edad").value);
    let esFrecuente = document.getElementById("frecuente").checked;
  
    // Uso de operadores:
    // - Comparación: edad >= 60
    // - Lógico: || (o)
    // - Aritmético: edad + 5 (solo como demostración)
  
    let aplicaDescuento = (edad >= 60 || esFrecuente);
  
    let mensaje = aplicaDescuento
      ? "¡Aplica para un descuento!"
      : "No aplica para descuento.";
  
    document.getElementById("resultado").textContent = mensaje;
  }