const productRepository = require('../container/repository')

const getProductById = async (req, res) => {
    try {
        let id = req.params.id
        let productDetails = await productRepository.getProductById(id);
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

module.exports = { getProductById }