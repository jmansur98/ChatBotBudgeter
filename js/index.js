
function calcularPresupuesto() {
  const opcionesSeleccionadasSeccion1 = [];
  const checkboxesSeccion1 = document.querySelectorAll('#seccion1 input[type="checkbox"]');
  checkboxesSeccion1.forEach(checkbox => {
      if (checkbox.checked) {
          opcionesSeleccionadasSeccion1.push(checkbox.value);
      }
  });
  const opcionesSeleccionadasSeccion2 = [];
  const checkboxesSeccion2 = document.querySelectorAll('#seccion2 input[type="checkbox"]');
  checkboxesSeccion2.forEach(checkbox => {
      if (checkbox.checked) {
          opcionesSeleccionadasSeccion2.push(checkbox.value);
      }
  });

  // Calcular el monto total del presupuesto combinando las secciones.
  let montoTotal = 0;
  opcionesSeleccionadasSeccion1.concat(opcionesSeleccionadasSeccion2).forEach(opcion => {
      switch (opcion) {
          case 'Opción 1':
              montoTotal += 100;
              break;
          case 'Opción 2':
              montoTotal += 150;
              break;
          case 'Opción 3':
              montoTotal += 200;
              break;
          case 'Opción 4':
              montoTotal += 50;
              break;
          case 'Opción 5':
              montoTotal += 75;
              break;
              case 'Opción 6':
                montoTotal += 120;
                break;
            default:
                break;
      }
  });
  // Mostrar resultato total debajo de la pag. 
  const resultadoElement = document.getElementById('resultado');
  resultadoElement.textContent = `Monto Total del Presupuesto: $${montoTotal}`;
}
        
