const productRepository = require('../container/repository')

createProduct = async (req, res) => {
    try {
        const payload = {
            name: req.body.name,
            description: req.body,
            price: req.body.price,
            picture: req.file.path,
            code: req.body.code,
            stock: req.body.stock,
            category: req.body.category
        }
        const product = await productRepository.createProduct({
            ...payload
        });
        res.status(200).json({
            status: true,
            data: product,
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err,
            status: false,
        })
    }
}

module.exports = { createProduct }