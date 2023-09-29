const inputCarnet = document.getElementById("idTxtCarnet");
const inputNombreC = document.getElementById("idTxtNombreCompleto");
const inputDui = document.getElementById("idTxtDui");
const inputNit = document.getElementById("idTxtNit");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputCorreo = document.getElementById("idTxtCorreo");
const inputEdad = document.getElementById("idTxtEdad");

buttonAgregarEstudiante = document.getElementById("idBtnAgregar");
buttonMostrarEstudiante = document.getElementById("idBtnMostrar");

const notificacion = document.getElementById("idNotificacion");
const notificacionError = document.getElementById("idNotificacionError");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const toasterror = new bootstrap.Toast(notificacionError);
const mensaje = document.getElementById("idMensaje");
const mensajeError = document.getElementById("idMensajeError");

let arrayEstudiante = [];
let indiceEstudiante = 0;

const Limpiar = () =>{
    inputCarnet.value = "";
    inputNombreC.value = "";
    inputDui.value = "";
    inputNit.value = "";
    inputFechaNacimiento.value = "";
    inputCorreo.value = "";
    inputEdad.value = "";

     
    inputCarnet.focus();
};
/*
Funciones para validar los campos
*/


  inputCarnet.addEventListener("blur",function (){
    const dato = inputCarnet.value; 

    if (/^[A-Z]{2}\d{3}$/.test(dato)) { //carné

    } else {
        mensajeError.innerHTML = "Por favor, ingrese un Carnet válido; por ejemplo:(AB001).";
        toasterror.show();
        inputCarnet.value = ""; // Limpiar el campo
    }

  });

  inputNombreC.addEventListener("blur", function (){
    const dato = inputNombreC.value;

    if (/^[A-Za-záéíóúÁÉÍÓÚ\s]+$/.test(dato)) {   //nombres y apellidos
        
    } else {
        mensajeError.innerHTML = "Por favor, ingrese un Nombre y Apellido válido; por ejemplo: (Juan Pérez).";
        toasterror.show();
        inputCarnet.value = ""; // Limpiar el campo
    }
  });

  inputDui.addEventListener("blur", function (){
    const dato = inputDui.value;

    if (/^\d{8}-\d$/.test(dato)) {    //DUI
        
    } else {
        mensajeError.innerHTML = "Por favor, ingrese un DUI válido formato (########-#).";
        toasterror.show();
        inputDui.value = ""; // Limpiar el campo
    }
  });

  inputNit.addEventListener("blur", function (){
    const dato = inputNit.value;

    if (/^\d{4}-\d{6}-\d{3}-\d$/.test(dato)) {    //NIT
        
    } else {
        mensajeError.innerHTML = "Por favor, ingrese un NIT válido formato (0000-000000-000-0).";
        toasterror.show();
        inputNit.value = ""; // Limpiar el campo
    }
  });

  inputFechaNacimiento.addEventListener("blur", function (){
    const dato = inputFechaNacimiento.value;

    if (/^\d{2}-\d{2}-\d{4}$/.test(dato)) {    //fecha de nacimiento
        
    } else {
        mensajeError.innerHTML = "Por favor, ingrese una fecha válido formato (día, mes y año).";
        toasterror.show();
        inputFechaNacimiento.value = ""; // Limpiar el campo
    }
  });

  inputCorreo.addEventListener("blur", function (){
    const dato = inputCorreo.value;

    if (/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(dato)) {    //e-mail
        
    } else {
        mensajeError.innerHTML = "Por favor, ingrese un Correo válido Ejemplo (usuario@dominio.com).";
        toasterror.show();
        inputCorreo.value = ""; // Limpiar el campo
    }
  });

  inputEdad.addEventListener("blur", function () {
    const valor = inputEdad.value;
  
    if (/^\d{1,2}$/.test(valor)) {     // EDAD
        const edad = parseInt(valor); // Convierte la entrada en un número entero
    
        if (edad >= 18 && edad <= 99 && !valor.startsWith('0')) {
            // La entrada es una edad válida.
        } else {
            // La entrada no cumple con los criterios de edad válida.
            mensajeError.innerHTML = "Por favor, ingrese una edad entre (18-99) sin ceros al principio.";
            toasterror.show();
            inputEdad.value = ""; // Limpiar el campo
        }
    } else {
        // La entrada no es un número válido.
        mensajeError.innerHTML = "Por favor, ingrese una edad válida (solo números).";
        toasterror.show();
        inputEdad.value = ""; // Limpiar el campo
        
    }
  });

const addEstudiante = function(indice){
    let carnet = inputCarnet.value;
    let nombreCompleto = inputNombreC.value;
    let dui = inputDui.value;
    let nit = inputNit.value;
    let fechaNaciemiento = inputFechaNacimiento.value;
    let correo = inputCorreo.value;
    let edad = inputEdad.value;

    // Modificar la fecha de nacimiento al formato día-mes-año
    const [mes, dia, año] = fechaNaciemiento.split('-');
    const fechaNacimientoFormato = `${dia.padStart(2, '0')}-${mes.padStart(2, '0')}-${año}`;

    if (
        carnet != "" &&
        nombreCompleto != "" &&
        dui != "" &&
        nit != "" &&
        fechaNacimientoFormato != "" &&
        correo != "" &&
        edad != ""
    ) {
        if (typeof indice === 'number' && indice >= 0 && indice < arrayEstudiante.length) {
            // Actualiza la información del estudiante existente en el arreglo
            arrayEstudiante[indice] =[
                carnet,
                nombreCompleto,
                dui,
                nit,
                fechaNacimientoFormato,
                correo,
                edad
            ]
            mensaje.innerHTML = "Estudiante actualizado correctamente";
            imprimirEstudiante();
        } else {
            // Agrega información al arreglo estudiante como nuevo estudiante
            arrayEstudiante.push([
                carnet,
                nombreCompleto,
                dui,
                nit,
                fechaNacimientoFormato,
                correo,
                edad
            ]);
            mensaje.innerHTML = "Se ha registrado un nuevo estudiante";
        }
        toast.show();
        Limpiar();
    } else {

        mensajeError.innerHTML = "Faltan campos por completar";
        toasterror.show();    
    }

};
const eliminarEstudiante = (indice) => {
    if (indice >= 0 && indice < arrayEstudiante.length) {
      arrayEstudiante.splice(indice, 1); // Elimina el estudiante del array
      imprimirEstudiante(); // Actualiza la tabla de estudiantes
    }
  }



function imprimirFilas() {
    let $fila = "";
    let contador = 0;

    arrayEstudiante.forEach((element) => {

        $fila += `<tr>
        <td scope="row" class="text-center fw-bold">${contador + 1}</td>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>${element[2]}</td>
        <td>${element[3]}</td>
        <td>${element[4]}</td>
        <td>${element[5]}</td>
        <td>${element[6]}</td>
        <td>
        <button id="idBtnEditar${contador}" type="button" class="btn btn-primary" alt="Eliminar"> 
        <i class="bi bi-pencil-square"></i>
        </button>
        <button id="idBtnEliminar${contador}" type="button" class="btn btn-danger" alt="Editar"> 
        <i class="bi bi-trash-fill"></i>
        </button>
        </td>
        </tr>`;

        contador++;
    });
    return $fila;
};

const imprimirEstudiante = () => {
    let $table = `<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered"> 
    <tr>
    <th scope="col" class="text-center" style="width:5%">#</th> 
    <th scope="col" class="text-center" style="width:7%">Carnet</th>
    <th scope="col" class="text-center" style="width:15%">Nombre Completo</th>
    <th scope="col" class="text-center" style="width:10%">DUI</th>
    <th scope="col" class="text-center" style="width:18%">NIT</th> 
    <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th> 
    <th scope="col" class="text-center" style="width:15%">Correo</th> 
    <th scope="col" class="text-center" style="width:5%">Edad</th> 
    <th scope="col" class="text-center" style="width:10%">Opciones</th> 
    </tr>
    ${imprimirFilas()}
    </table>
    </div>`;
    document.getElementById("idTablaEstudiante").innerHTML = $table;
};



buttonMostrarEstudiante.onclick = () =>{
    imprimirEstudiante();
};

buttonAgregarEstudiante.onclick = () =>{
    addEstudiante();
}


//Ejecutar funcion al momento de cargar la pagina HTML
Limpiar();