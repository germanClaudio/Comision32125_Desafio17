class ProductosDto {
    constructor(datos, cotizaciones) {
        this._id = datos._id
        this.name = datos.name
        this.description = datos.description
        this.price = datos.price
        this.code = datos.code
        this.picture = datos.picture
        this.stock = datos.stock
        for (const [denominacion, valor] of Object.entries(cotizaciones)) {
            this[denominacion] = valor 
        }
        
    }
}

module.exports = {ProductosDto}