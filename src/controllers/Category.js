import mongoose from 'mongoose';
import validations from '../validations/validations';

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
      const { title } = req.body;

      if (validations.validationField(title)) {
        return res.status(400).json({ message: 'Informações inválidas.' });
      }

      const newCategory = new CategoryModel({ title });

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

      if (validations.validationField(id) || validations.validationField(title)) {
        return res.status(400).json({ message: 'Informações inválidas.' });
      }

      await CategoryModel.findByIdAndUpdate(id, {
        $set: {
          title,
        },
      });
      return res.status(200).json({ message: 'Categoria alterada com sucesso.' });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
    }
  }

  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      if (validations.validationField(id)) {
        return res.status(400).json({ message: 'Informações inválidas.' });
      }

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
