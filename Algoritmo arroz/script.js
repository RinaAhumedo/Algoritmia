function calcular() {
    const cantidad = parseFloat(document.getElementById('cantidad').value);
    const tipo = document.getElementById('tipo').value;
    const resultado = document.getElementById('resultado');
  
    if (isNaN(cantidad) || cantidad <= 0) {
      resultado.textContent = "Por favor, ingresa una cantidad válida.";
      return;
    }
  
    let tazasArroz = 0;
    let tazasAgua = 0;
  
    if (tipo === 'tazas') {
      tazasArroz = cantidad;
    } else if (tipo === 'libras') {
      // Aproximadamente 2.5 tazas de arroz por libra
      tazasArroz = cantidad * 2.5;
    }
  
    tazasAgua = tazasArroz * 2;
  
    resultado.innerHTML = `
      Para preparar <strong>${tazasArroz.toFixed(2)}</strong> tazas de arroz necesitas:<br/>
      <strong>${tazasAgua.toFixed(2)}</strong> tazas de agua.
    `;
  }
  