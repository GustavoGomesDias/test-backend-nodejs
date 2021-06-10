import mongoose from 'mongoose';

const CategoryModel = mongoose.model('Category');
const ProductModel = mongoose.model('Product');

class Category {
  async findAll(req, res) {
    try {
      const categories = await CategoryModel.find({}, 'title');

      return res.status(200).json(categories);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
    }
  }

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

  async editCategory(req, res) {
    try {
      const { id, title } = req.body;

      await CategoryModel.findByIdAndUpdate(id, {
        $set: {
          title,
        },
      });
      return res.status(200).json({ message: 'Categoria atualizado com sucesso.' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      await CategoryModel.findByIdAndRemove({
        _id: id,
      });

      await ProductModel.updateMany({ category: { $in: id } }, {
        $pull: { category: id },
      });
      return res.status(200).json({ message: 'Categoria criada com sucesso.' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
    }
  }
}

export default new Category();
