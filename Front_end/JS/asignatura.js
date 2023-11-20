var columnaDest = 0;

// Datos JSON de las Cards
var asignaturasData = {
  "23241": {
    name: "Full Stack JS",
    dateStart: "",
    dateEnd: "",
    color: "#33aaff",
    description: "El semestre más importante",
    opinion: "Me encanta",
    difficulty: 1,
    status: "asignaturas-pending"
  },
  "23242": {
    name: "Competencias Digitales",
    dateStart: "",
    dateEnd: "",
    color: "#CCCCCC",
    description: "El semestre más importante",
    opinion: "Me encanta",
    difficulty: 3,
    status: "empezada"
  }
};

// Función para extraer las tarjetas temáticas
function drawAsignaturas(asignaturas) {
  // Obtener el contenedor donde se añadirán las tarjetas
  var container = $("#asignaturas-pending");

  // Vaciar el contenedor
  container.empty();

  // Iterar a través de los temas y crear tarjetas
  $.each(asignaturas, function (index, asignatura) {
    var card = createCard(index, asignatura);
    container.append(card);
  });

  // Activar la función de arrastrar y soltar
  dragAndDrop();
}

// Función para crear una tarjeta temática única
function createCard(index, asignatura) {
  var card = `
    <div class="margen-top-lg col-sm-4 ${asignatura.status}" id="${index}">
      <div class="card" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title" style="background-color: ${asignatura.color};">
            Asignatura: ${asignatura.name}
          </h5>
          <div class="padding-sm">
            <p class="card-text">
              Fecha inicio: ${asignatura.dateStart}<br>
              Fecha fin: ${asignatura.dateEnd}<br>
              Descripción: ${asignatura.description}<br>
              Opinión: ${asignatura.opinion}<br>
              Dificultad: ${asignatura.difficulty}
            </p>
            <a href="#" class="btn btn-primary" id="editarAsignatura" onclick="drawModalAsignatura(${index})">Editar</a>
            <button class="btn btn-danger" id="eliminar" onclick="eliminar(${index})"><i class="fas fa-trash"></i></button>
          </div>
        </div>
      </div>
    </div>
  `;

  return card;
}

// Función para activar la función de arrastrar y soltar
function dragAndDrop() {
  $(".draggable").draggable({
    helper: "clone"
  });

  $(".column").sortable({
    connectWith: ".column"
  });
}

// Función para abrir el modal de un nuevo asunto
function drawModalAsignatura(columna) {
  columnaDest = columna;
  // Restablecer el formulario
  $("#asignaturaForm")[0].reset();

  // Mostrar el modal
  $("#modalAsignatura").modal("show");
}

// Haga clic en el botón "Añadir Asignatura".
$("#añadir-asignatura").click(function () {
  drawModalAsignatura(0);
});
  // Si viene definido un índice de asignatura, cargamos los datos en el formulario
$("#editar-asignatura").click(function (index) {
  if (index && typeof asignaturasData[index] != "undefined") {
    asignatura = asignaturasData[index];
    title = "Ver/Editar ";
  }
  drawModalAsignatura();
  
});
// Haga clic en el botón "Guardar" en el modal
$("#guardarAsignatura").click(function () {
  // Obtener datos del formulario
  var nombreAsignatura = $("#nombreAsignatura").val();
  var fechaInicio = $("#fechaInicio").val();
  var fechaFin = $("#fechaFin").val();
  var descripcion = $("#descripcion").val();
  var opinion = $("#opinion").val();
  var color = $("#color").val();
  var dificultad = $("#dificultad").val();

  if (nombreAsignatura == "" || fechaInicio  == ""  || fechaFin == "" || descripcion == "" || opinion == "" || color == "" || dificultad == "")
  {
    alert("faltan campos por rellenar")
    return false;
  }

  // Crear un nuevo objeto sujeto
  var newSubject = {
    name: nombreAsignatura,
    dateStart: fechaInicio,
    dateEnd: fechaFin,
    color: color,
    description: descripcion,
    opinion: opinion,
    difficulty: dificultad,
    status: "asignaturas-pending"
  };

  // Añadir el nuevo sujeto a los datos
  var newIndex = Date.now().toString();
  asignaturasData[newIndex] = newSubject;

  // Crear y añadir una nueva tarjeta
  var newCard = createCard(newIndex, newSubject);
  
console.log(columnaDest);
  if (columnaDest == 1)
    $("#empezada").append(newCard);
  if (columnaDest == 2)
    $("#aprobada").append(newCard);
  if (columnaDest == 3)
    $("#suspendida").append(newCard);
  if (columnaDest == 0)
    $("#asignaturas-pending").append(newCard);

  // Ocultar el modal
  $("#modalAsignatura").modal("hide");
});

// Función de documento listo
$(document).ready(function () {
  drawAsignaturas(asignaturasData);
});

/*
// Handle changes in the select element with id "select-semana"
$("#select-semana").change(function () {
  // Update subjects based on the selected week if needed
});
*/