// Clase CARRITO
export default class Carrito {
  constructor() {
      this.productos = []; // El array de productos vacio.
  }

  añadirProducto(producto, cantidad) { // Metodo con dos parametros para añadir para los usos nombrados
      const indice = this.productos.findIndex(prod => prod.SKU === producto.SKU); // Busco el indice en el array, por el SKU, y me devuelve el indice si lo encuetra y lo guardo en una variable.
      if (indice > -1) { // Si no lo encuentra me devolvería -1
          this.productos[indice].cantidad = cantidad++; // En caso contrario actualizo cantidad
      } else { // Si no existe el producto en el array, lo arrego como nuevo.
        // Uso el operador propagación para copiar propiedades del objeto producto.
          this.productos.push({ ...producto, cantidad }); // La cantidad, se la añado con el valor proporcionado.
      }
  }

  eliminarProducto(producto, cantidad) { // Similar al anterior con ligeras diferencias 
      const indice = this.productos.findIndex(prod => prod.SKU === producto.SKU); // Busco el índice igual que el anterior.
      if (indice > -1) { // Verifico si el producto fue encontrado en el array, si no lo encuentra me devolvería -1
          this.productos[indice].cantidad -= cantidad; // Reduzco la cantidad del producto en el índice encontrado
          if (this.productos[indice].cantidad <= 0) {  // Si la cantidad del producto es menor o igual a cero
              this.productos.splice(indice, 1); // Elimino el producto del array 'productos'
          }
      }
  }

  calculoTotal() { // Utilizo el método 'reduce' para sumar el total del precio de todos los productos
    // Por cada producto, multiplico su precio por la cantidad y se suma al total acumulado
    return this.productos.reduce((total, producto) => total + producto.price * producto.cantidad, 0);
    // El valor inicial del total es 0
  }

  obtenerCarrito() { // Directamente que devuelvo:
    return {
      productos: this.productos, // Una lista de productos.
      total: this.calculoTotal(), // El total, usando el metodo de esta clase.
    }  
}

}  
  


