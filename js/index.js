
const divInterfaz = document.querySelector('#interfaz');
const divIntegracion = document.querySelector('#integracion');
const divGenerador = document.querySelector('#generador');
const divAutenticador = document.querySelector('#autenticador');

let funcionalidadesSeleccionadas = [];



document.addEventListener('DOMContentLoaded', function () { 
  
// Arreglo de objetos para representar las funcionalidades
const funcionalidades = [
    {tipo: 'interfaz', herramienta: 'Messenger', precio: 100 },
    {tipo: 'interfaz', herramienta: 'Telegram', precio: 154 },
    {tipo: 'interfaz', herramienta: 'Whatsapp', precio: 122 },
    {tipo: 'generador', herramienta: 'ManyChat', precio: 500 },
    {tipo: 'generador', herramienta: 'Chatfuel', precio: 678 },
    {tipo: 'generador', herramienta: 'Personalizada', precio: 100 },
    {tipo: 'integracion', herramienta: 'Hubspot', precio: 100 },
    {tipo: 'integracion', herramienta: 'Salesforce', precio: 100 },
    {tipo: 'autenticador', herramienta: 'Google', precio: 100 },
    {tipo: 'autenticador', herramienta: 'Facebook', precio: 100 },
  ];
  

funcionalidades.forEach(funcionalidad => {
    const input =document.createElement('input');
    input.type = 'checkbox'
    input.id = 'opcion' + funcionalidad.herramienta;
    input.value = funcionalidad.herramienta;

    const label = document.createElement ('label');
    label.htmlFor = input.id;
    label.textContent = `${funcionalidad.herramienta} - €${funcionalidad.precio}`;

    input.addEventListener('change', function(){
        console.log('ESTE ES THIS VALUE', this.value);
        const funcionalidadSeleccionada = funcionalidades.find(f => f.herramienta === this.value )
        console.log('funcionalidades selec', funcionalidadesSeleccionadas)
        if(this.checked){
            funcionalidadesSeleccionadas.push(funcionalidadSeleccionada);
        }else{
            const index = funcionalidadesSeleccionadas.indexOf(funcionalidadSeleccionada);
            if(index > -1){
                funcionalidadesSeleccionadas.splice(index,1);
            }
        }
        console.log('funcionalidades selec', funcionalidadesSeleccionadas)
    })

    if(funcionalidad.tipo === 'interfaz'){  
        divInterfaz.appendChild(input);
        divInterfaz.appendChild(label);
        divInterfaz.appendChild(document.createElement('br'));

    }
    if(funcionalidad.tipo === 'generador'){
        divGenerador.appendChild(input);
        divGenerador.appendChild(label);
        divGenerador.appendChild(document.createElement('br'));

    }
    if(funcionalidad.tipo === 'integracion'){
        divIntegracion.appendChild(input);
        divIntegracion.appendChild(label);
        divIntegracion.appendChild(document.createElement('br'));

    }
    if(funcionalidad.tipo === 'autenticador'){
        divAutenticador.appendChild(input);
        divAutenticador.appendChild(label);
        divAutenticador.appendChild(document.createElement('br'));

    }
})
  // Función para calcular el monto total
  function calcularMontoTotal(funcionalidadesSeleccionadas) {
    return funcionalidadesSeleccionadas.reduce((total, funcionalidad) => total + funcionalidad.precio, 0);
  }
  
  // Función para crear un objeto de presupuesto
  function crearPresupuesto() {
    const nombreUsuario = prompt("Por favor, ingresa el nombre de su empresa:");
  
    // Calcular el monto total
    const montoTotal = calcularMontoTotal(funcionalidadesSeleccionadas);
  
    return {
      nombreUsuario,
      funcionalidadesSeleccionadas,
      montoTotal,
    };
  }
  
  // Botón de calcular
  const calcularBtn = document.getElementById('calcularBtn');
  calcularBtn.addEventListener('click', () => {
    const presupuesto = crearPresupuesto();
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.textContent = `${presupuesto.nombreUsuario}: el monto total del presupuesto es: €${presupuesto.montoTotal}`;
  });
});