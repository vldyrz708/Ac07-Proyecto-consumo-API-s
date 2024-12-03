// Función para cargar todas las recetas desde la API, creamos la funcion asincrona usando async para..

const cargarRecetas = async () => {
    try {
        //await lo usaremos para decir que primero cumpla el cargado de los datos de la api y despues pase a lo siguiente
        const respuesta = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=b&language=es');
        console.log("respuesta",respuesta);
        // Verificamos si la solicitud fue exitosa obteniendo el codigo 200
        if (respuesta.status === 200) {
            //la respuesta sera un json y lo convertiremos en un objeto js para poder trabajarlo
            const datos = await respuesta.json();
            console.log("Respuesta de la API:", datos);
            console.log("bien hecho!!")

            // Verifica si datos tiene la propiedad meals que nos devuelve la api y es donde estan las recetas
            if (datos.meals) {
                // creamos una variable vacia para almacenar las recetas
                console.log("Arreglo");
                console.log(datos.meals);
                let recetas = '';
                //Funcion usando forEach para que itere por cada receta que encuentre y se cree un contenedor html
                 //[aqui usaremos las propiedades que nos da la api, 'strMealThumb' para mostrar la imagen y 
                //'strMeal' para el nombre de la receta]
                datos.meals.forEach(receta => {
                    recetas += `
                        <div class="receta">
                            <img class="poster" src="${receta.strMealThumb}" alt="${receta.strMeal}">
                            <h3 class="titulo">${receta.strMeal}</h3>
                        </div>
                    `;
                });

                // Insertamos el html creado en el contenedor que tenemos en el index.html
                document.getElementById('contenedor').innerHTML = recetas;

            } else {
                // Si no se encuentran recetas damos un mensaje
                document.getElementById('contenedor').innerHTML = '<p>No se encontraron recetas.</p>';
            }
        } else {
            // Maneja errores de respuesta de http
            console.error('Error al cargar las recetas:', respuesta.status);
        }
    } catch (error) {
        // mostramos algun otro error que tengamos en el bloque de try
        console.error(error);
    }
};

// Llama a la función para cargar recetas al inicio
cargarRecetas();
