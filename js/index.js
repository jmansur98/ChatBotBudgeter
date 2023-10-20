// selección de elementos (4) del DOM por ID almacenados en variables
const divInterfaz = document.querySelector('#interfaz');
const divIntegracion = document.querySelector('#integracion');
const divGenerador = document.querySelector('#generador');
const divAutenticador = document.querySelector('#autenticador');

console.log('ESTA FUNCIONANDO');
let funcionalidadesSeleccionadas = [];
let data;  // variable para almacenar los datos cargados desde el JSON
let nombreEmpresaInput;

function calcularMontoTotal(funcionalidadesSeleccionadas) {
  const montoTotal = funcionalidadesSeleccionadas.reduce((total, funcionalidad) => total + funcionalidad.precio, 0);
  const montoTotalElement = document.getElementById('montoTotal');
  montoTotalElement.textContent = `Presupuesto total: €${montoTotal.toFixed(2)}`;
  return montoTotal; 
 }
//función para actualizar el menú desplegable
function actualizarMenuDesplegable() {
  const dropdownItems = document.querySelector('.dropdown-items');
  const dropdownTotalIVA = document.querySelector('.total-iva');
  dropdownItems.innerHTML = ''; // Limpiar los ítems antes de actualizar

  //agrega al menú las funcionalidades seleccionadas 
  funcionalidadesSeleccionadas.forEach(funcionalidadSeleccionada => {
    const listItem = document.createElement('div');
    listItem.textContent = `${funcionalidadSeleccionada.herramienta} - €${funcionalidadSeleccionada.precio}`;
    dropdownItems.appendChild(listItem);
  });
  
  //monto total con IVA
  const montoTotalSinIVA = calcularMontoTotal(funcionalidadesSeleccionadas);
  const iva = montoTotalSinIVA * 0.21; 
  const montoTotalConIVA = montoTotalSinIVA + iva;

  //agrega el total con IVA al menú desplegable
  dropdownTotalIVA.textContent = `Total + IVA (21%): €${montoTotalConIVA.toFixed(2)}`;
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

        //"input" se utiliza para permitir al usuario seleccionar la funcionalidad, y el "label" se utiliza para mostrar el nombre de la herramienta y su precio.
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
          calcularMontoTotal(funcionalidadesSeleccionadas);

        // actualizar el presupuesto en cada cambio
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

});
