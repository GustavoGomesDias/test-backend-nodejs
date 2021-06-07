import mongoose from 'mongoose';

const Product = mongoose.model('Product');

class Manager {
  async addProductInCategory(req, res) {
    try {
      const { productId, categoryId } = req.body;

      await Product.findByIdAndUpdate(productId, {
        $push: {
          category: categoryId,
        },
      });

      return res.status(200).json({ message: 'Categoria adiconada com sucesso.' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Ocorreu um erro interno, tente novamente mais tarde.' });
    }
  }
}

export default new Manager();
