const productRepository = require('../repository/repository')

const deleteAllProducts = async (req, res) => {
    try {
        const productDetails = await productRepository.deleteAllProducts()
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

module.exports = { deleteAllProducts }