//const url = 'https://api-node2.onrender.com/membresia'
const url = 'http://localhost:8383/membresia'
const obtenerDatoEspecifico = async () => {
    const apiUrl = 'https://www.datos.gov.co/resource/mcec-87by.json';
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // Supongamos que quieres obtener el primer dato de la respuesta
      const valor = data[0];
  
      // Ahora puedes usar datoEspecifico como necesites
      console.log('Dato específico:', valor);
  
      // Si necesitas realizar alguna acción con este dato, puedes hacerlo aquí
    } catch (error) {
      console.error('Error al obtener dato específico de la API:', error);
    }
  };
  
  // Llama a la función para obtener el dato específico
  obtenerDatoEspecifico();

  // ...

// Función para obtener y cargar los datos de la API en el campo precioDolar
const cargarDatosDeAPI = async () => {
    const apiUrl = 'https://www.datos.gov.co/resource/mcec-87by.json';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Supongamos que precioDolar es el campo que quieres cargar
        const precioDolarInput = document.getElementById('precioDolar');

        // Aquí decides cómo quieres seleccionar el valor de la API, por ejemplo, usando el primer elemento
        const primerElementoDeLaApi = data[0];
        const valor = primerElementoDeLaApi && primerElementoDeLaApi.valor;

        // Verificamos si el valor de la API es válido antes de asignarlo al campo
        if (valor !== undefined) {
            precioDolarInput.value = valor;
        }

    } catch (error) {
        console.error('Error al cargar datos de la API:', error);
    }
};

// Llamamos a la función para cargar los datos cuando la página se carga
window.onload = () => {
    cargarDatosDeAPI();
    editarMembresia(); // También llamamos a editarCompra, según tu implementación actual
};

const regresarListar = () => {
    window.location.href = 'index.html';
}

const recargarListarMembresia= () => {
    listarMembresia();
};

const listarMembresia = async () => {
    let objectId = document.getElementById('contenido')
    let contenido = '';
    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then((res) => res.json())
        .then(function (data) {
            let listarMembresias = data.msg

            listarMembresias.map(function (membresia) {
                objetoMembresia = Object.keys(membresia).map(key => key + '=' + encodeURIComponent(membresia[key])).join('&');
            
                contenido = contenido + '<tr>' +
                    '<td>' + membresia.idMembresia + '</td>' +
                    '<td>' + membresia.nombreMembresia + '</td>' +
                    '<td>' + membresia.precioMembresia + '</td>' +
                    '<td>' + membresia.frecuenciaMembresia + '</td>' +
                    '<td>' + membresia.fechaInicio + '</td>' +
                    '<td>' + membresia.fechaFin + '</td>' +
                    '<td>' + membresia.servicioMembresia + '</td>' +
                    '<td>' + membresia.precioDolar + '</td>' +

                    '<td> <button type="button" onclick="redireccionarEditar(\'' + objetoMembresia + '\')" class="btn btn-success">Editar: Membresia</button></td>' +
                    '<td> <button type="button" class="btn btn-danger btnEliminar" onclick="eliminarMembresia(\'' + membresia.idMembresia + '\');">Eliminar</button></td>' +
                    '</tr>';
            });
            
            objectId.innerHTML = contenido;
 
        })
}

const registrarMembresias = () => {

    const idMembresias = document.getElementById('idMembresia').value
    const nombreMembresias = document.getElementById('nombreMembresia').value
    const precioMembresias = document.getElementById('precioMembresia').value
    const frecuenciaMembresias = document.getElementById('frecuencia').value
    const fechaInicios = document.getElementById('fechaInicio').value
    const fechaFins = document.getElementById('frechaFin').value
    const servicios = document.getElementById('servicio').value
    const precioDolars = document.getElementById('precioDolar').value
    if (idMembresias.length == 0) {
        document.getElementById('idHelp').innerHTML = 'Dato requerido'

    }
    else if (nombreMembresias.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
    }
    else if (precioMembresias == 0) {
        document.getElementById('precioHelp').innerHTML = 'Dato requerido'
    }
    else if (frecuenciaMembresias == 0) {
        document.getElementById('frecuenciaHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaInicios == 0) {
        document.getElementById('fechainicioHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaFins == 0) {
        document.getElementById('fechacinHelp').innerHTML = 'Dato requerido'
    }
    else if (servicios == 0) {
        document.getElementById('servicioHelp').innerHTML = 'Dato requerido'
    } 
    else if (precioDolars == 0) {
        document.getElementById('precioDolarHelp').innerHTML = 'Dato requerido'
    } else {
        let membresia = {
            //derecha variables creadas con la S / izquierda los nombres de la base de datos
            idMembresia: idMembresias, //lo primero es la clave, lo segundo es lo que se va a enviar.
            nombreMembresia: nombreMembresias,
            precioMembresia: precioMembresias,
            frecuenciaMembresia: frecuenciaMembresias,
            fechaInicio: fechaInicios,
            fechaFin: fechaFins,
            servicioMembresia: servicios,
            precioDolar:precioDolars
        }
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(membresia), //Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "membresia editada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    regresarListar();
                }, 2000);
            })

    }

}



const eliminarMembresia = async (idMembresia) => {
    try {
        const deleteUrl = `${url}`;  // Solo la ruta base, ya que el ID irá en el cuerpo de la solicitud

        const response = await fetch(deleteUrl, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({ idMembresia })  // Incluye el ID en el cuerpo de la solicitud
        });

        if (!response.ok) {
            throw new Error(`Error al eliminar. Código de respuesta: ${response.status}`);
        }

        const json = await response.json();
        Swal.fire({
            position: "center",
            icon: "error",
            title: "membresia eliminada exitosamente",
            showConfirmButton: false,
            timer: 1500
        });

        setTimeout(() => {
            regresarListar();
        }, 2000);

        // Puedes realizar alguna acción adicional después de eliminar, como recargar la lista de donaciones
        // por ejemplo:
        // recargarListaDonaciones();
    } catch (error) {
        console.error('Error al eliminar la donación:', error.message);
        // Puedes manejar el error de alguna manera, por ejemplo, mostrar un mensaje al usuario.
        alert('Error al eliminar la donación. Por favor, inténtalo de nuevo más tarde.');
    }
};



const actualizarMembresia = () => {

    const idMembresias = document.getElementById('idMembresia').value
    const nombreMembresias = document.getElementById('nombreMembresia').value
    const precioMembresias = document.getElementById('precioMembresia').value
    const frecuenciaMembresias = document.getElementById('frecuencia').value
    const fechaInicios = document.getElementById('fechaInicio').value
    const fechaFins = document.getElementById('frechaFin').value
    const servicios = document.getElementById('servicio').value

    if (idMembresias.length == 0) {
        document.getElementById('idHelp').innerHTML = 'Dato requerido'

    }
    else if (nombreMembresias.length == 0) {
        document.getElementById('nombreHelp').innerHTML = 'Dato requerido'
    }
    else if (precioMembresias == 0) {
        document.getElementById('precioHelp').innerHTML = 'Dato requerido'
    }
    else if (frecuenciaMembresias == 0) {
        document.getElementById('frecuenciaHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaInicios == 0) {
        document.getElementById('fechainicioHelp').innerHTML = 'Dato requerido'
    }
    else if (fechaFins == 0) {
        document.getElementById('fechacinHelp').innerHTML = 'Dato requerido'
    }
    else if (servicios == 0) {
        document.getElementById('servicioHelp').innerHTML = 'Dato requerido'
    } else {
        let membresia = {
            //derecha variables creadas con la S / izquierda los nombres de la base de datos
            idMembresia: idMembresias, //lo primero es la clave, lo segundo es lo que se va a enviar.
            nombreMembresia: nombreMembresias,
            precioMembresia: precioMembresias,
            frecuenciaMembresia: frecuenciaMembresias,
            fechaInicio: fechaInicios,
            fechaFin: fechaFins,
            servicioMembresia: servicios

        }
        //Fecth permite reaizar peticiones http a una url
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(membresia), //Convertir el objeto a JSON
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then((res) => res.json())//Obtener respuesta de la petición
            .then(json => {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Donación actualizada exitosamente",
                    showConfirmButton: false,
                    timer: 1500
                });

                setTimeout(() => {
                    regresarListar();
                }, 2000);
                //Imprimir el mensaje de la transacción
            })
    }

}

const redireccionarEditar = (membresia) => {
    document.location.href = "editarMembresia.html?membresia" + membresia
}

const editarMembresia = () => {
    var urlparams = new URLSearchParams(window.location.search);

    document.getElementById('idMembresia').value = urlparams.get('idMembresia');
    document.getElementById('nombreMembresia').value = urlparams.get('nombreMembresia');
    document.getElementById('precioMembresia').value = urlparams.get('precioMembresia');
    document.getElementById('frecuenciaMembresia').value = urlparams.get('frecuenciaMembresia');
    document.getElementById('fechaInicio').value = urlparams.get('fechaInicio');
    document.getElementById('fechaFin').value = urlparams.get('fechaFin');
    document.getElementById('servicioMembresia').value = urlparams.get('servicioMembresia');
}








if (document.querySelector('#btnRegistrar')) { //Si objeto exitste
    document.querySelector('#btnRegistrar').addEventListener('click', registrarMembresias)
}

if (document.querySelector('#btnActualizar')) {//Si objeto existe
    document.querySelector('#btnActualizar').addEventListener('click', actualizarMembresia)
}

if (document.querySelector('#btnEliminar')) {//Si objeto existe
    document.querySelector('#btnEliminar')
        .addEventListener('click', eliminarMembresia)

}