// selección de elementos (4) del DOM por ID almacenados en variables
const divInterfaz = document.querySelector('#interfaz');
const divIntegracion = document.querySelector('#integracion');
const divGenerador = document.querySelector('#generador');
const divAutenticador = document.querySelector('#autenticador');

console.log('ESTA FUNCIONANDO');
let funcionalidadesSeleccionadas = [];
let data;  // variable para almacenar los datos cargados desde el JSON
let nombreEmpresaInput;
//función para actualizar el menú desplegable
function actualizarMenuDesplegable() {
  const dropdownMenu = document.querySelector('.dropdown-center .dropdown-menu');
  dropdownMenu.innerHTML = ''; // saca el contenido actual del menú

  // agrega al menu las funcionalidades seleccionadas 
  funcionalidadesSeleccionadas.forEach(funcionalidadSeleccionada => {
    const listItem = document.createElement('li');
    listItem.textContent = `${funcionalidadSeleccionada.herramienta} - €${funcionalidadSeleccionada.precio}`;
    dropdownMenu.appendChild(listItem);
  });
}
document.addEventListener('DOMContentLoaded', function () {
  //recuperar funcionalidades seleccionadas desde localStorage
  const funcionalidadesGuardadas = JSON.parse(localStorage.getItem('funcionalidadesSeleccionadas'));
  
  // recuperar nombr la empresa desde localStorage
  const nombreEmpresaGuardado = localStorage.getItem('nombreEmpresa');

  nombreEmpresaInput = document.getElementById('nombreEmpresa');

   
  
  if (nombreEmpresaGuardado) {
    nombreEmpresaInput.value = nombreEmpresaGuardado;
  }
  
  if (funcionalidadesGuardadas){
    funcionalidadesSeleccionadas = funcionalidadesGuardadas;
    
    // marcar los checkbox  segun las selecciones guardadas
    funcionalidadesSeleccionadas.forEach(funcionalidadSeleccionada => {
      const checkbox = document.getElementById('opcion' + funcionalidadSeleccionada.herramienta);
      if (checkbox) {
        checkbox.checked = true;
      }
    });
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
          actualizarMenuDesplegable();

        // actualizar el presupuesto en cada cambio
        const montoTotal = calcularMontoTotal(funcionalidadesSeleccionadas);
        const resultadoElement = document.getElementById('resultado');
        calcularMontoTotal(funcionalidadesSeleccionadas);
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
    const montoTotal = funcionalidadesSeleccionadas.reduce((total, funcionalidad) => total + funcionalidad.precio, 0);
    const montoTotalElement = document.getElementById('montoTotal');
    montoTotalElement.textContent = `Presupuesto total: €${montoTotal.toFixed(2)}`;
    return montoTotal;  }

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
});
