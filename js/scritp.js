var miLista = [];

document.getElementById("nuevoSemestreForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita que el formulario se envíe normalmente
  
    // Obtiene los valores ingresados por el usuario
    var nombre = document.getElementById("nombre").value;
    var descripcion = document.getElementById("descripcion").value;
  
    // Crea un objeto con los datos del formulario
    var semestre = { nombre: nombre, descripcion: descripcion };
  
    // Agrega el objeto a una lista en JavaScript
    miLista.push(semestre);
  
    // Limpia el formulario
    document.getElementById("nuevoSemestreForm").reset();

    $('#exampleModal').modal('hide')

    var contenedorHTML = document.getElementById("semestres");
    contenedorHTML.innerHTML = '';

    // Recorre el vector y genera HTML para cada objeto
    miLista.forEach(function (objeto,index) {
        var div = document.createElement("div");
        div.className = "col-sm-6 col-md-4 col-lg-4 my-3"; // Asigna las clases Bootstrap
        div.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${objeto.nombre}</h5>
                  <p class="card-text">${objeto.descripcion}</p>
                  <a href="#" class="btn btn-primary" id="eliminarBtn${index}">Eliminar</a>
              </div>
          </div>
        `;
        contenedorHTML.appendChild(div);
         // Agrega un evento al botón para eliminar el elemento
        document.getElementById(`eliminarBtn${index}`).addEventListener('click', function () {
            eliminarElemento(index);
        });
    });
});

function eliminarElemento(index) {
    // Elimina el elemento correspondiente de miLista
    miLista.splice(index, 1);

    // Actualiza la vista
    actualizarVista();
}

function actualizarVista() {
    var contenedorHTML = document.getElementById("semestres");
    contenedorHTML.innerHTML = '';

    // Recorre el vector y genera HTML para cada objeto
    miLista.forEach(function (objeto, index) {
        // Genera elementos HTML
        var div = document.createElement("div");
        div.className = "col-sm-6 col-md-4 col-lg-4 my-3"; // Asigna las clases Bootstrap
        div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${objeto.nombre}</h5>
                    <p class="card-text">${objeto.descripcion}</p>
                    <a href="#" class="btn btn-primary" id="eliminarBtn${index}">Eliminar</a>
                </div>
            </div>
        `;
        contenedorHTML.appendChild(div);

        // Agrega un evento al botón para eliminar el elemento
        document.getElementById(`eliminarBtn${index}`).addEventListener('click', function () {
            eliminarElemento(index);
        });
    });
}