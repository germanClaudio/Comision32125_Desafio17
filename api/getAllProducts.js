const productRepository = require('../repository/repository')

const getAllProducts = async (req, res) => {
    try {
        const products = await productRepository.getProducts()
        // res.status(200).json({
        //     status: true,
        //     data: products,
        // })
        return products

    } catch (err) {
        console.log(err)
        // res.status(500).json({
        //     error: err,
        //     status: false,
        // })
    }
}

module.exports = { getAllProducts }