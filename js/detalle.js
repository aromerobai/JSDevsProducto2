var index;
var ListaSemestres;

function obtenerParametrosDeURL() {
    // Obtiene la cadena de consulta (query string) de la URL actual
    var queryString = window.location.search;

    // Crea un objeto para almacenar los parámetros
    var parametros = {};

    // Divide la cadena de consulta en pares clave-valor
    var pares = queryString.substring(1).split('&');

    // Itera a través de los pares y los almacena en el objeto de parámetros
    for (var i = 0; i < pares.length; i++) {
        var par = pares[i].split('=');
        var clave = decodeURIComponent(par[0]);
        var valor = decodeURIComponent(par[1]);
        parametros[clave] = valor;
    }

    index = parametros.index;
    ListaSemestres = JSON.parse(localStorage.getItem('ListaSemestres'));
}

document.addEventListener('DOMContentLoaded', function() {
    var contenedorHTML = document.getElementById("encabezado");
    var div = document.createElement("div");
    div.innerHTML = `
        <div class="container vertical-center">
            <div class="text-center">
                <h1>${ListaSemestres[index].nombre}</h1>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Detalles del Semestre</button>
            </div>
        </div>
    `;
    contenedorHTML.appendChild(div);

    var descripcionLabel = document.getElementById("descripcionLabel");
    descripcionLabel.textContent = ListaSemestres[index].descripcion;
});