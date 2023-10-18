var ListaSemestres = [];

document.getElementById("nuevoSemestreForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe normalmente
  
    // Obtiene los valores ingresados por el usuario
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;
  
    // Crea un objeto con los datos del formulario
    var semestre = { nombre: nombre, descripcion: descripcion };
 
    ListaSemestres.push(semestre);
  
    // Limpia el formulario
    document.getElementById("nuevoSemestreForm").reset();
    
    // Oculta el modal
    $('#exampleModal').modal('hide')

    //Llamamos a actualizar a la vista
    actualizarVista();
});

function actualizarVista() {
    var contenedorHTML = document.getElementById("semestres");
    contenedorHTML.innerHTML = '';

    // Recorre el vector y genera HTML para cada objeto
    ListaSemestres.forEach(function (objeto, index) {
        // Genera elementos HTML
        var div = document.createElement("div");
        div.className = "col-sm-6 col-md-4 col-lg-4 my-3"; // Asigna las clases Bootstrap
        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${objeto.nombre}</h5>
                    <p class="card-text">${objeto.descripcion}</p>
                    <div class="d-flex justify-content-end">
                        <a href="#" class="btn btn-primary btn-sm me-2" id="detalleBtn${index}">Detalle</a>
                        <a href="#" class="btn btn-danger btn-sm" id="eliminarBtn${index}">Eliminar</a>
                    </div>
                </div>
            </div>
        `;
        contenedorHTML.appendChild(div);

        // Agrega un evento al botón para eliminar el elemento
        document.getElementById(`eliminarBtn${index}`).addEventListener('click', function () {
            eliminarElemento(index);
        });
        // Agrega un evento al botón para ver el detalle del elemento
        document.getElementById(`detalleBtn${index}`).addEventListener('click', function () {
            var url = "../html/detalle.html?index=" + index + "&ListaSemestres=" + JSON.stringify(ListaSemestres);
            // Redirige a la página con la URL construida
            window.location.href = url;
        });
    });
}

function eliminarElemento(index) {

    var alertDiv = document.createElement("div");
    alertDiv.className = "alert alert-warning alert-dismissible fade show";
    alertDiv.innerHTML = `
        <strong>Confirmación:</strong> ¿Estás seguro de que deseas eliminar el semestre?
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Cerrar"></button>
        <div class="mt-3">
            <button type="button" class="btn btn-danger me-2" id="btnCancelar">Cancelar</button>
            <button type="button" class="btn btn-primary" id="btnAceptar">Aceptar</button>
        </div>
    `;
    // Agrega el elemento div al cuerpo del documento
    document.body.appendChild(alertDiv);

    // Agrega un evento al botón de cancelar
    document.getElementById("btnCancelar").addEventListener("click", function () {
        document.body.removeChild(alertDiv); // Cierra la alerta
    });

    // Agrega un evento al botón de aceptar
    document.getElementById("btnAceptar").addEventListener("click", function () {
        document.body.removeChild(alertDiv); // Cierra la alerta
        // Elimina el elemento correspondiente de miLista
        ListaSemestres.splice(index, 1);
        // Actualiza la vista
        actualizarVista();
    });
}