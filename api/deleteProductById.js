const productRepository = require('../container/repository')

const deleteProductById = async (req, res) => {
    try {
        const id = req.params.id
        const productDetails = await productRepository.deleteProductById(id)
        res.status(200).json({
            status: true,
            data: productDetails,
        })
    } catch (err) {
        res.status(500).json({
            status: false,
            error: err
        })
    }
}

module.exports = { deleteProductById }
