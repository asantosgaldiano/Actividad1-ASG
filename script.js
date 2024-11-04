import Carrito from "./Carrito.js";

document.addEventListener('DOMContentLoaded', function (event) {
  // Declaro e inicializo variables
  let moneda;
  var productos = [];
  let carrito = new Carrito();

  function cargarTabla(productos) { // Carga de productos en el DOM
    const tablaProductos = document.getElementById("tablaProductos");
    productos.forEach(product => { // Que voy hacer con cada producto:

        // PRIMERA CELDA
        const productDes = document.createElement('td');
        const title = document.createElement('h3');
        title.innerText = product.title;
        const sku = document.createElement('p');
        sku.textContent = "REF : " + product.SKU;
        productDes.append(title, sku);

        // SEGUNDA CELDA
        const cantidad = document.createElement('td'); // Creo celda
        const botones = document.createElement('div'); // Creo div
        // Contenido del div // Botones y casilla
        const menos = document.createElement('button'); // Creo boton MENOS
        menos.textContent = "-"; // Contenido texto
        menos.id = "button-"; // Le paso el id
        const mas = document.createElement('button'); // Creo boton MAS
        mas.textContent = "+"; // Contenido texto
        mas.id = "button+"; // Le paso el id
        const numero = document.createElement('input'); // Creo de tipo input CUADRO
        numero.type = "number"; // Input de tipo numero
        numero.value = "0"; // Con valor inicial 0
        numero.id = "numero"; // Le paso el id
        numero.min = "0"; // Limito el valor inferior a 0.
        
        menos.classList.add('btn');// Para el estilo, añado las clases para estilos
        mas.classList.add('btn');
        numero.classList.add('casilla');
        botones.classList.add('botonera');

        botones.append(menos, numero, mas); // Añado el contenido al div
        cantidad.appendChild(botones); // Y a su vez, a la celda name le meto el div
        
        // FUNCIONALIDAD DE LOS BOTONES
        mas.addEventListener('click', () => { // Defino que hago al darle al click
          numero.value = parseInt(numero.value)+1; // Cada pulsacion aumento 1
          total.textContent = (product.price * numero.value) + "  " + moneda; // Saco el total en la celda correspondiente
          calcularTotal(product, numero.value); // Paso el aux y el producto al metodo.
        });
        menos.addEventListener('click', () => { // Es el mismo procedimiento que para el boton +
          if (parseInt(numero.value) > 0) // Solo que garantizo que no bajo de 0.
          numero.value = parseInt(numero.value)-1;
          total.textContent = (product.price * numero.value) + "  " + moneda;
          calcularTotal(product, numero.value);
        });
        numero.addEventListener('click', () => { // En este caso, es similar pero no hace falta ir sumando/restando de 1 en 1
          total.textContent = (product.price * numero.value) + "  " + moneda;
          calcularTotal(product, numero.value);
        });

        // TERCERA CELDA
        const prUnidad = document.createElement('td'); // Creo celda
        prUnidad.textContent = `${product.price} ${moneda}`; // Realizo la concatenacion precio producto y su moneda.

        // CUARTA CELDA
        const total = document.createElement('td');
        total.textContent = `${numero.value} ${moneda}`;
        
        // AÑADO LA FILA 
        const tr = document.createElement('tr'); // Creo fila
        tr.append(productDes, cantidad, prUnidad, total); // Uso append para añadir varios elementos.
        tablaProductos.append(tr); // A mi tablaProductos le voy añadiendo las filas
      });
  }

  function pintarCarrito (contenidoCarrito){ // Hago una funcion para pintar el carrito manejando el DOM segun el contenido carrito
    const tablaCarrito = document.getElementById("productosCarrito");
    tablaCarrito.innerHTML = ''; // Limpio el contenido previo de la tabla
    // Recorro el array y creo los elementos
    contenidoCarrito.productos.forEach(producto => { // Ojo porque del contenidoCarrito solo tomo "productos" para recorrerlo.
    
      const celdaTitulo = document.createElement('td'); // Creo y asigno el contenido a la celda "izquierda" del Carrito
      celdaTitulo.innerText = `${producto.cantidad} x ${producto.title}`;

      const celdaPrecio = document.createElement('td'); // Creo y asigno el contenido a la celda "derecha" del Carrito
      celdaPrecio.innerText = `${producto.cantidad} x ${producto.price} ${moneda}`;
      celdaPrecio.classList.add('dch'); // Le añado una class para el estilo

      // Añado Fila
      const fila = document.createElement('tr');
      fila.append(celdaTitulo, celdaPrecio);
      tablaCarrito.append(fila);
    });
    // Zona inferior del Carrito, el total
    const total = contenidoCarrito.total; // Tomo el valor del "total" de la carrito.
    const totalFinal = document.getElementById("totalFinal");
    totalFinal.innerText = total.toFixed(2) + " " + moneda; // Asigno el contenido al span con ese id.
  };

  function calcularTotal(product, cantidad) { // Metodo para calcular los totales y llamada a pintar el carrito.
    const total = (product.price * cantidad).toFixed(2); // Calculo total, redondeado a 2 y lo guardo en variable total.
    if (cantidad > 0) { // Solo añado al carrito a partir de 1.
        carrito.añadirProducto(product, parseInt(cantidad)); // Usando metodo añadir de la clase Carrito
    }
    else{ // Elimino productos usando metodo eliminar
        carrito.eliminarProducto(product, 1);
    }
    const contenidoCarrito = carrito.obtenerCarrito(); // En un variable recojo el contenido del Carrito usando el metodo de esa clase.
    pintarCarrito(contenidoCarrito); // LLamo al metodo, para pintar todo el carrito, pasandole el contenido del carrito.
  }

  // CONEXION API
  fetch('https://jsonblob.com/api/1299791008530030592')
    .then((response) => response.json())
        .then(todoeljson => {
            moneda = todoeljson.currency; // Separo objeto moneda
            productos = todoeljson.products;// y objeto array productos.
            cargarTabla(productos);
            console.log(moneda); // Los saco por consola para comprobarlo
            console.log(productos); // Los saco por consola para comprobarlo
        })
        .catch((error) => { // Error por la carga
          console.error("Error al obtener productos del fetch:", error);
  }); 
});

console.log("Final. Todo ejecutado correctamente");