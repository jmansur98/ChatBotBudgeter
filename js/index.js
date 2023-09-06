/*
const nombre = prompt("Ingrese su nombre completo");
const edad = prompt("Ingrese su edad");
const mensaje = " hola me llamo " + nombre  + " y tengo " + edad;
*/

//const edad = 22;
//console.log (edad)


/*
 //Solicitar al usuario dos valores
 var valor1 = prompt("Ingrese el primer valor:");
var valor2 = prompt("Ingrese el segundo valor:");

// Convertir los valores a números (si es necesario)
valor1 = parseFloat(valor1);
valor2 = parseFloat(valor2);

// Verificar si los valores son números válidos
if (!isNaN(valor1) && !isNaN(valor2)) {
    // Comparar los valores y mostrar resultados
    if (valor1 > valor2) {
        alert("El primer valor es mayor que el segundo.");
    } else if (valor1 < valor2) {
        alert("El segundo valor es mayor que el primero.");
    } else {
        alert("Los valores son iguales.");
    }
} else {
    alert("Por favor, ingrese valores numéricos válidos.");
}
*/

/*
//Solicitar al usuario dos valores
var valor1 = prompt("En que plataforma desea integrarlo:");
var valor2 = prompt("Desea conectar una base de datos:");

// Convertir los valores a números (si es necesario)
valor1 = parseFloat(valor1);
valor2 = parseFloat(valor2);

// Verificar si los valores son números válidos
if (!isNaN(valor1) && !isNaN(valor2)) {
    // Comparar los valores y mostrar resultados
    if (valor1 > valor2) {
        alert("El primer valor es mayor que el segundo.");
    } else if (valor1 < valor2) {
        alert("El segundo valor es mayor que el primero.");
    } else {
        alert("Los valores son iguales.");
    }
} else {
    alert("Por favor, ingrese valores numéricos válidos.");
}
*/



/*
// Solicitar al usuario un número entero positivo
const numero = parseInt(prompt("Ingrese un número entero positivo:"));

// Verificar si el número es válido
if (numero >= 0) {
  let factorial = 1;

  // Calcular el factorial usando un ciclo for
  for (let i = 1; i <= numero; i++) {
    factorial *= i;
  }

  // Mostrar el resultado
  console.log(`El factorial de ${numero} es ${factorial}`);
} else {
  console.log("Ingrese un número válido.");
}
*/



/*
const generateButton = document.getElementById('generate');
const passwordField = document.getElementById('password');

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';

generateButton.addEventListener('click', () => {
  const passwordLength = 12; // Longitud de la contraseña
  let newPassword = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    newPassword += characters.charAt(randomIndex);
  }

  passwordField.value = newPassword;
}); */

/*
const addTaskButton = document.getElementById('addTask');
const newTaskInput = document.getElementById('newTask');
const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', () => {
  const taskText = newTaskInput.value.trim();

  if (taskText !== '') {
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
      ${taskText}
      <button class="delete">Eliminar</button>
    `;
    taskList.appendChild(taskItem);
    newTaskInput.value = '';

    const deleteButton = taskItem.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
      taskList.removeChild(taskItem);
    });
  }
});
*/

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
          case 'Opcion 6':
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
        
