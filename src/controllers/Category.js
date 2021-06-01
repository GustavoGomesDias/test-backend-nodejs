import mongoose from 'mongoose';

const CategoryModel = mongoose.model('Category');

class Category {
  async store(req, res) {
    try {
      const newCategory = new CategoryModel(req.body);

      await newCategory.save();

      return res.status(200).json({ message: 'Categoria criada com sucesso.' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
    }
  }
}

export default new Category();
