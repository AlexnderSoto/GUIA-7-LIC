//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento"); 
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino"); 
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion"); 
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar"); 
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar"); 
const buttonMostrarPaciente = document.getElementById("idBtnMostrar"); 
const buttonAgregarPais = document.getElementById("idBtnAddPais");
const buttonActualizar = document.getElementById("idBtnEditar")

const notificacion = document.getElementById("idNotificacion");
// Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");
//Componente modal
const idModal = document.getElementById("idModal");
//Arreglo global de pacientes
let arrayPaciente = [];

let indicePacienteEnEdicion = 0;
/*
Creando una funcion para que limpie el formulario
siempre que se cargue la pagina o cuando se presione el boton limpiar del formulario
*/
const limpiarForm = () => {
inputNombre.value = "";
inputApellido.value = "";
inputFechaNacimiento.value = ""; 
inputRdMasculino.checked = false; 
inputRdFemenino.checked = false; 
cmbPais.value = 0;
inputDireccion.value = "";
inputNombrePais.value = "";

inputNombre.focus();
};

/*
Funcion para validar el ingreso del paciente
*/

const addPaciente = function(indice) {
  let nombre = inputNombre.value;
  let apellido = inputApellido.value;
  let fechaNacimiento = inputFechaNacimiento.value;
  let sexo =
      inputRdMasculino.checked == true
          ? "Hombre"
          : inputRdFemenino.checked == true
          ? "Mujer"
          : "";
  let pais = cmbPais.value;
  let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
  let dirección = inputDireccion.value;

  if (
      nombre != "" &&
      apellido != "" &&
      fechaNacimiento != "" &&
      sexo != "" &&
      pais != 0 &&
      dirección != ""
  ) {
      if (typeof indice === 'number' && indice >= 0 && indice < arrayPaciente.length) {
          // Actualiza la información del paciente existente en el arreglo
          arrayPaciente[indice] = [
              nombre,
              apellido,
              fechaNacimiento,
              sexo,
              labelPais,
              dirección
          ];
          mensaje.innerHTML = "Paciente actualizado correctamente";
          imprimirPacientes();
      } else {
          // Agrega información al arreglo paciente como nuevo paciente
          arrayPaciente.push([
              nombre,
              apellido,
              fechaNacimiento,
              sexo,
              labelPais,
              dirección
          ]);
          mensaje.innerHTML = "Se ha registrado un nuevo paciente";
      }

      toast.show();
      limpiarForm();
  } else {
      mensaje.innerHTML = "Faltan campos por completar";
      toast.show();
  }
}


 // Función para eliminar un paciente
 const editarPaciente = (indice) => {
    if (indice >= 0 && indice < arrayPaciente.length) {
      const paciente = arrayPaciente[indice];
      // Llena los campos del formulario con los datos del paciente
      inputNombre.value = paciente[0];
      inputApellido.value = paciente[1];
      inputFechaNacimiento.value = paciente[2];
      if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
        inputRdFemenino.checked = false;
      } else if (paciente[3] === "Mujer") {
        inputRdMasculino.checked = false;
        inputRdFemenino.checked = true;
      } else {
        inputRdMasculino.checked = false;
        inputRdFemenino.checked = false;
      }
      // Busca el índice del país basado en el valor almacenado en paciente[4]
    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text === paciente[4]) {
          cmbPais.selectedIndex = i;
          break; // Detén la búsqueda una vez que encuentres la coincidencia
        }
      }
      inputDireccion.value = paciente[5];
    }
  }
  
  // Función para eliminar un paciente
  const eliminarPaciente = (indice) => {
    if (indice >= 0 && indice < arrayPaciente.length) {
      arrayPaciente.splice(indice, 1); // Elimina el paciente del array
      imprimirPacientes(); // Actualiza la tabla de pacientes
    }
  }
  
  // Asigna eventos para editar y eliminar a los botones de la tabla
  document.getElementById("idTablaPacientes").addEventListener("click", (event) => {
    if (event.target && event.target.id.startsWith("idBtnEditar")) {
      const indice = parseInt(event.target.id.replace("idBtnEditar", ""));
      editarPaciente(indice);
      indicePacienteEnEdicion=indice;
    } else if (event.target && event.target.id.startsWith("idBtnEliminar")) {
      const indice = parseInt(event.target.id.replace("idBtnEliminar", ""));
      eliminarPaciente(indice);
    }
  });


//Funcion que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 0;
    
    arrayPaciente.forEach((element) => {
        
        $fila += `<tr>
        <td scope="row" class="text-center fw-bold">${contador + 1}</td>
        <td>${element[0]}</td>
        <td>${element[1]}</td>
        <td>${element[2]}</td>
        <td>${element[3]}</td>
        <td>${element[4]}</td>
        <td>${element[5]}</td>
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

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
    <table class="table table-striped table-hover table-bordered"> 
    <tr>
    <th scope="col" class="text-center" style="width:5%">#</th> 
    <th scope="col" class="text-center" style="width:15%">Nombre</th>
    <th scope="col" class="text-center" style="width:15%">Apellido</th>
    <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th> 
    <th scope="col" class="text-center" style="width:10%">Sexo</th>
    <th scope="col" class="text-center" style="width:10%">Pais</th> 
    <th scope="col" class="text-center" style="width:25%">Dirección</th> 
    <th scope="col" class="text-center" style="width: 10%">Opciones</th> 
    </tr>
    ${imprimirFilas()}
    </table>
    </div>`;
    document.getElementById("idTablaPacientes").innerHTML = $table;
};

//contador global de los option correspondiente
//al select (cmb) pais

let contadorGlobalOption = cmbPais.children.length;

const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        //Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un nuevo mensaje a nuestra notificacion
        mensaje.innerHTML = "Pais agregado correctamente";
        //Llamando al componente de Bootstrap
        toast.show();
    } else {
        //Asignando un mensaje a nuestra notificacion
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

//Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () =>{
    limpiarForm();
};
buttonAgregarPaciente.onclick = () =>{
    addPaciente();
};
buttonMostrarPaciente.onclick = () =>{
    imprimirPacientes();
};
buttonAgregarPais.onclick = () =>{
    addPais();
};

buttonActualizar.onclick = () => {
    
  console.log(indicePacienteEnEdicion);
  if (indicePacienteEnEdicion >= 0) {
    addPaciente(indicePacienteEnEdicion);
    // Limpia el índice después de la actualización
    indicePacienteEnEdicion = -1;
}
}

//Se agrega el focus en el campo nombre pais del modal
idModal.addEventListener("shown.bs.modal", () =>{
    inputNombrePais.value = "";
    inputNombrePais.focus();
});
 

//Ejecutar funcion al momento de cargar la pagina HTML
limpiarForm();