function calcularPresupuesto() {
    const nombreUsuario = prompt("Por favor, ingresa tu nombre:");
    // opciones seleccionadas
    const opcionesSeleccionadas = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
    for (const checkbox of checkboxes) {
        opcionesSeleccionadas.push(checkbox.value);
    }

    // Calcular el monto total
    let montoTotal = 0;
    for (const opcion of opcionesSeleccionadas) {
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
    }

    // Mostrar el resultado mediante  un alert()
    alert(`${nombreUsuario}: el monto total del presupuesto es: €${montoTotal}`);
}

const calcularBtn = document.getElementById('calcularBtn');
calcularBtn.addEventListener('click', calcularPresupuesto);

