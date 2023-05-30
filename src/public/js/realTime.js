const ws = io.connect("http://localhost:8080", { forceNew: true })

function addProd(e) {
    console.log('entro')
    const product = {
        id: document.getElementById("id").value,
        title: document.getElementById("title").value,
        thumbnail: document.getElementById("thumbnail").value,
        price: document.getElementById("price").value,
        code: document.getElementById("code").value,
        description: document.getElementById("description").value,
        stock: document.getElementById("stock").value,
    }
    ws.emit('addProd', product);
    return false;
}

function delProd(e) {
    const prodToDelete = document.getElementById('delId').value;
    console.log(prodToDelete) 
    ws.emit('delProd', prodToDelete);
    return false;
}

function render(dataProduct) {
    const htmlContent = dataProduct.map((item, index) => {
        return(
            `
            <ul>
            <li>${item.id}</li>
            <li>${item.title}</li>
            <li>${item.thumbnail}</li>
            <li>${item.price}</li>
            <li>${item.code}</li>
            <li>${item.description}</li>
            <li>${item.stock}</li>
            </ul>
            `
        )
    }).join(' ');
    document.getElementById('socket-info').innerHTML = htmlContent;
}

ws.on('delProd', function(dataProd){
    render(dataProd)
})
 
ws.on('addProd', function(dataProd){
    render(dataProd)
})