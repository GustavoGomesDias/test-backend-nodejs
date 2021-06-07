import mongoose from 'mongoose';

const ProductModel = mongoose.model('Product');

class Product {
  async findAll(req, res) {
    try {
      const products = await ProductModel.find({}).populate('category');

      return res.status(200).json(products);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
    }
  }

  async store(req, res) {
    try {
      const {
        title, description, price, category,
      } = req.body;

      const newProduct = await new ProductModel({
        title, description, price, category,
      });

      await newProduct.save();

      return res.json({ message: 'Produto criado com sucesso.' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
    }
  }
}

export default new Product();
