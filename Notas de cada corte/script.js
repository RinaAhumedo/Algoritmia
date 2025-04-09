function calcularNota() {
    const corte1 = parseFloat(document.getElementById("corte1").value);
    const corte2 = parseFloat(document.getElementById("corte2").value);
    const resultadoDiv = document.getElementById("resultado");
  
    if (isNaN(corte1) || isNaN(corte2)) {
      resultadoDiv.textContent = "Por favor, completa ambas notas.";
      return;
    }
  
    if (corte1 < 0 || corte1 > 5 || corte2 < 0 || corte2 > 5) {
      resultadoDiv.textContent = "Las notas deben estar entre 0.0 y 5.0.";
      return;
    }
  
    const notaNecesaria = (3.0 - (corte1 * 0.3 + corte2 * 0.3)) / 0.4;
    const redondeada = Math.round(notaNecesaria * 100) / 100;
  
    if (redondeada > 5.0) {
      resultadoDiv.innerHTML = `😢 Necesitas un <strong>${redondeada}</strong> en el final.<br>La materia está <span style="color: #d10000;">perdida</span>.`;
    } else if (redondeada <= 0) {
      resultadoDiv.innerHTML = `🎉 ¡Ya tienes más de 3.0 asegurado!<br><span style="color: green;">La materia está ganada</span>.`;
    } else {
      resultadoDiv.innerHTML = `📚 Necesitas sacar <strong>${redondeada}</strong> en el final.<br>¡Tú puedes! 💪`;
    }
  }
  