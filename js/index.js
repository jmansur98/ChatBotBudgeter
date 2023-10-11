// selección de elementos (4) del DOM por ID almacenados en variables
const divInterfaz = document.querySelector('#interfaz');
const divIntegracion = document.querySelector('#integracion');
const divGenerador = document.querySelector('#generador');
const divAutenticador = document.querySelector('#autenticador');

let funcionalidadesSeleccionadas = [];
let data;  // variable para almacenar los datos cargados desde el JSON
let nombreEmpresaInput;
document.addEventListener('DOMContentLoaded', function () {
  //recuperar funcionalidades seleccionadas desde localStorage
  const funcionalidadesGuardadas = JSON.parse(localStorage.getItem('funcionalidadesSeleccionadas'));
  
  // recuperar nombr la empresa desde localStorage
  const nombreEmpresaGuardado = localStorage.getItem('nombreEmpresa');
    if (funcionalidadesGuardadas) {
    funcionalidadesSeleccionadas = funcionalidadesGuardadas;
  }
  
  if (nombreEmpresaGuardado) {
    nombreEmpresaInput.value = nombreEmpresaGuardado;
  }
  fetch('js/objeto.json')
    .then(response => response.json())
    .then(jsonData => {
      data = jsonData;

      //se usa un bucle "forEach" para iterar a través de cada objeto del arrays  
      data.forEach(funcionalidad => {
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = 'opcion' + funcionalidad.herramienta;
        input.value = funcionalidad.herramienta;

        //para cada funcionalidad se crea un elemento de entrada "input" de tipo "checkbox" y un elemento "label"
        //"input" se utiliza para permitir al usuario seleccionar la funcionalidad, y el "label" se utiliza para mostrar el nombre de la herramienta y su precio.
        //se agregaron atributos como "id", "value" y "htmlFor" para asociar los elementos "input" y "label" correctamente.
        const label = document.createElement('label');
        label.htmlFor = input.id;
        label.textContent = `${funcionalidad.herramienta} - €${funcionalidad.precio}`;

        //evento "change" a cada "input" que se dispara cuando el usuario cambia la selección 
        //dentro de este evento, se agrega o elimina la funcionalidad seleccionada al array "funcionalidadesSeleccionadas", dependiendo de si se marca o desmarca la casilla de verificación.
        input.addEventListener('change', function () {
          const funcionalidadSeleccionada = data.find(f => f.herramienta === this.value)
          if (this.checked) {
            funcionalidadesSeleccionadas.push(funcionalidadSeleccionada);
          } else {
            const index = funcionalidadesSeleccionadas.indexOf(funcionalidadSeleccionada);
            if (index > -1) {
              funcionalidadesSeleccionadas.splice(index, 1);
            }
          }
        });

        // agrega elementos al DOM según el tipo de funcionalidad
        if (funcionalidad.tipo === 'interfaz') {
          divInterfaz.appendChild(input);
          divInterfaz.appendChild(label);
          divInterfaz.appendChild(document.createElement('br'));
        }
        else if (funcionalidad.tipo === 'generador') {
          divGenerador.appendChild(input);
          divGenerador.appendChild(label);
          divGenerador.appendChild(document.createElement('br'));
        }
        else if (funcionalidad.tipo === 'integracion') {
          divIntegracion.appendChild(input);
          divIntegracion.appendChild(label);
          divIntegracion.appendChild(document.createElement('br'));
        }
        else if (funcionalidad.tipo === 'autenticador') {
          divAutenticador.appendChild(input);
          divAutenticador.appendChild(label);
          divAutenticador.appendChild(document.createElement('br'));
        }
      });
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

  // funcion para calcular el monto total que toma el array "funcionalidadesSeleccionadas" como argumento
  // esta función utiliza el método "reduce" para calcular el monto total seleccionado sumando los precios
  function calcularMontoTotal(funcionalidadesSeleccionadas) {
    return funcionalidadesSeleccionadas.reduce((total, funcionalidad) => total + funcionalidad.precio, 0);
  }

  //función para crear un objeto de presupuesto
  //solicita al usuario que ingrese el nombre de su empresa utilizando el método "prompt"
  function crearPresupuesto() {
    const nombreEmpresaInput = document.getElementById('nombreEmpresa');
    const nombreUsuario = nombreEmpresaInput.value;
    //guardar las funcionalidades seleccionadas en localStorage
    localStorage.setItem('funcionalidadesSeleccionadas', 
    JSON.stringify(funcionalidadesSeleccionadas));


    //función calcular el monto total de las funcionalidades seleccionadas
    const montoTotal = calcularMontoTotal(funcionalidadesSeleccionadas);

    //devuelve un objeto que contiene nombre del usuario, funcionalidades seleccionadas y monto total
    return {
      nombreUsuario,
      funcionalidadesSeleccionadas,
      montoTotal,
    };
  }

  //evento del botón de cálculo. Se selecciona un botón con el ID "calcularBtn" y se agrega un evento "click" a él
  //cuando el botón se hace clic, se llama a la función "crearPresupuesto" para calcular el presupuesto
  const calcularBtn = document.getElementById('calcularBtn');

  calcularBtn.addEventListener('click', () => {
    // guardar funcionalidades seleccionadas en localStorage
    localStorage.setItem('funcionalidadesSeleccionadas', JSON.stringify(funcionalidadesSeleccionadas));
    const presupuesto = crearPresupuesto();
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = `${presupuesto.nombreUsuario} su presupuesto total es: €${presupuesto.montoTotal}`;
  });
});
