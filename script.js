document.addEventListener("DOMContentLoaded", function() {
    // Manejar el envío del formulario de inicio de sesión
    let formLogin = document.getElementById("miForm");
    if (formLogin) {
        formLogin.addEventListener("submit", function(event) {
            event.preventDefault(); // Evitar que se envíe el formulario automáticamente

            // Mostrar mensaje de inicio de sesión
            Swal.fire({
                title: 'Inicio de sesión',
                text: '¡Has iniciado sesión correctamente!',
                icon: 'success',
                confirmButtonText: 'Ok',
            });
        });
    }

    // Función para enviar el formulario de contacto con AJAX
    function enviarFormularioContacto(nombre, correo, mensaje) {
        return new Promise((resolve, reject) => {
            // Datos del formulario
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('correo', correo);
            formData.append('mensaje', mensaje);

            // Configuración de la solicitud AJAX
            const requestOptions = {
                method: 'POST',
                body: formData
            };

            // Realizar la solicitud AJAX al servidor
            fetch('url_del_servidor', requestOptions)
                .then(response => {
                    // Verificar si la respuesta fue exitosa (código de estado 200)
                    if (response.ok) {
                        resolve();
                    } else {
                        // Si la respuesta no fue exitosa, rechazar la promesa con un mensaje de error
                        reject('Error al enviar el formulario');
                    }
                })
                .catch(error => {
                    // Capturar cualquier error durante la solicitud AJAX y rechazar la promesa
                    reject(error);
                });
        });
    }

    // Función para actualizar el contador de ítems en el icono del carrito
    function actualizarContadorCarrito() {
        const contadorCarrito = document.getElementById('contadorCarrito');
        contadorCarrito.textContent = carrito.length;
    }

    const carrito = []; // Array para almacenar los productos agregados al carrito

    // Función para agregar un producto al carrito
    function agregarAlCarrito(nombre, precio) {
        carrito.push({ nombre, precio });
        actualizarContadorCarrito();
    }

    // Agregar evento a los botones de agregar al carrito
    const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');
    botonesAgregarCarrito.forEach(boton => {
        boton.addEventListener('click', function() {
            const nombre = boton.dataset.nombre;
            const precio = parseFloat(boton.dataset.precio);
            agregarAlCarrito(nombre, precio);

            // Mostrar mensaje de éxito al usuario
            Swal.fire({
                title: 'Agregado al carrito',
                text: `${nombre} se ha añadido al carrito.`,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
        });
    });

    // Manejar el envío del formulario de contacto
    let formContacto = document.getElementById("formularioContacto");
    if (formContacto) {
        formContacto.addEventListener("submit", function(event) {
            event.preventDefault(); // Evitar que se envíe el formulario automáticamente

            // Obtener los valores del formulario
            let nombre = document.getElementById("nombre").value;
            let correo = document.getElementById("correo").value;
            let mensaje = document.getElementById("mensaje").value;

            // Enviar el formulario y manejar la promesa resultante
            enviarFormularioContacto(nombre, correo, mensaje)
                .then(() => {
                    // Mostrar mensaje de éxito al usuario
                    Swal.fire({
                        title: 'Mensaje enviado',
                        text: '¡Gracias por ponerte en contacto con nosotros!',
                        icon: 'success',
                        confirmButtonText: 'Ok'
                    });
                })
                .finally(() => {
                    // Limpiar los campos del formulario
                    formContacto.reset();
                });
        });
    }

    // Obtener el contenedor de diseño
    let designContainer = document.getElementById('designContainer');

    // URL de la API
    const URL = 'https://api.example.com/designs';

    // Realizar la solicitud a la API
    fetch(URL)
        .then(response => response.json())
        .then(data => {
            const designs = data.results;
            designs.forEach(design => {
                // Crear un elemento para mostrar el diseño
                const designElement = document.createElement('div');
                designElement.innerHTML = `
                    <h2>${design.name}</h2>
                    <img src="${design.imageURL}" alt="Imagen del diseño">
                `;
                // Agregar el elemento al contenedor de diseño
                designContainer.appendChild(designElement);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos de la API:', error);
        });
});
