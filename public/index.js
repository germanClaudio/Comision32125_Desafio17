const socket = io.connect()

// ----------  Messages ----------------

socket.on('mensajesAll', async (mensajes) => {   //async (data)
    makeHtmlList (await mensajes)
   
})

const addMessage = () => {
    const mensaje = {
        author: {
            email : document.getElementById('author').value,
            nombre : document.getElementById('nombre').value,
            apellido : document.getElementById('apellido').value,
            edad : document.getElementById('edad').value,
            alias : document.getElementById('alias').value,
            avatar : document.getElementById('avatar').value
        },
        text: document.getElementById('texto').value,
        fyh: new Date().toLocaleString()
    }
    
    console.log('mensaje ',mensaje)
    socket.emit('newMensaje', mensaje )
    return false
}

const makeHtmlList = (mensajes) => {
    // const date = new Date().toLocaleString('en-GB')
    const htmlMsg = mensajes.map((mensaje) => {
        return  (`<div class="d-block mx-auto my-1 p-1">
                    <strong class="text-secondary"> Mensaje-> </strong>
                    <strong class="fw-bold text-primary">${mensaje.author.email}</strong>:
                    <e id="colorBrown" style="color:brown;">${mensaje.fyh} </e>: 
                    <em id="colorGreen" style="color:MediumSeaGreen;">${mensaje.text}</em>
                    <img class="img-fluid rounded-circle" alt="avatar" src='${mensaje.author.avatar}' width="60" height="60">
               </div>`)
    }).join(" ")

    document.getElementById('mostrarMensajes').innerHTML = htmlMsg;
}

// -------------- Show All Products ----------------
socket.on('productsAll', async (arrProd) => {
    renderProduct (await arrProd)
})

const addProduct = () => {
    const name = document.getElementById('name').value
    const timestamp = new Date().toLocaleString('en-GB')
    const description = document.getElementById('description').value
    const price = Number(document.getElementById('price').value)
    const picture = document.getElementById('picture').value
    const code = document.getElementById('code').value
    const stock = Number(document.getElementById('stock').value)

    socket.emit('newProducto', { name, timestamp, description, price, picture, code, stock })
    return false
}

const renderProduct = (arrProd) => {
    const html = arrProd.map((element) => {
    
        return (`<div class="col m-3">
                    <div class="card h-100" style="width: 18rem;">
                        <img src="${element.picture}" class="card-img-top" alt="Picture not Founded" height="215px" >
                        <div class="card-body">
                            <h6 class="card-title"><strong>${element.name}</strong></h6>
                            <p class="card-text">${element.description}<br>
                                                Price: $${element.price}<br>
                                                Code: ${element.code}<br>
                                                Stock: ${element.stock}<br>
                                                Id# ${element._id}</p>
                                <hr>                
                                <a href="#" class="btn btn-primary mx-auto"><i class="fa fa-shopping-cart"></i></a>
                                <a href="/api/productos/update/${element._id}" class="btn btn-secondary mx-auto"><i class="fa fa-pencil"></i></a>
                                <a href="/api/productos/delete/${element._id}" class="btn btn-danger mx-auto"><i class="fa fa-trash"></i></a>
                        </div>
                    </div>
                </div>`
                )
    }).join(" ");
        
    document.getElementById('mostrarProductos').innerHTML = html
        
    // const htmlProdList = 
    //     ( `<caption id="capProdList">Total Product List ${arrProd.length}</caption>`)
    // document.getElementById('capProdList').innerHTML = htmlProdList    

    document.getElementById('name').value = ""
    document.getElementById('description').value = ""
    document.getElementById('price').value = ""
    document.getElementById('picture').value = ""
    document.getElementById('code').value = ""
    document.getElementById('stock').value = ""
}

// -------------- Show Only One Product ----------------
socket.on('showOnlyOneProducto', async (addProduct) => {
    console.log('showOnlyOneProduct ----', addProduct)
    renderOnlyOneProduct (await addProduct)
})

const showOneProduct = () => {
    const name = document.getElementById('nameSearch').value  // const code = document.getElementById('codeSearch').value
    socket.emit('showOneProduct', name )
    return false
}

const renderOnlyOneProduct = (addProduct) => {
    console.log('onlyOneProduct ---- ', addProduct)
    const htmlOneProduct = addProduct.map((element) => {
    
        return (`<div class="card" style="width: 18rem;">
                    <img src="${element.picture}" class="card-img-top" alt="Picture not Founded">
                    <div class="card-body">
                    <h6 class="card-title">${element.name}</h6>
                    <p class="card-text">${element.description}</p>
                    <p class="card-text"><strong>${element.code}</strong></p>
                    <p class="card-text">${element.stock}</p>
                    <p class="card-text">${element.id}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                    </div>
                </div>`
        )
    }).join(" ");
        
    document.getElementById('showProductSearch').innerHTML = htmlOneProduct
    
    document.getElementById('nameSearch').value = ""
}



const updateProduct = () => {
    const _id = document.getElementById('id').value
    const name = document.getElementById('name').value
    const timestamp = new Date().toLocaleString('en-GB')
    const description = document.getElementById('description').value
    const price = Number(document.getElementById('price').value)
    const picture = document.getElementById('picture').value
    const code = document.getElementById('code').value
    const stock = Number(document.getElementById('stock').value)

    socket.emit('updateProducto', { _id, name, timestamp, description, price, picture, code, stock })
    return false

}    