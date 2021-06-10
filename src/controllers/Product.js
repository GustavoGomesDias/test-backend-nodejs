import mongoose from 'mongoose';
import validations from '../validations/validations';

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

  async findProductsByName(req, res) {
    try {
      const { search } = req.query;

      if (validations.validationField(search)) {
        return res.status(400).json({ message: 'Informações inválidas' });
      }

      const products = await ProductModel.find({
        title: {
          $regex: search,
          $options: 'i',
        },
      }).populate('category');

      return res.status(200).json(products);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
    }
  }

  async findProductsByCategory(req, res) {
    try {
      const { search } = req.query;

      if (validations.validationField(search)) {
        return res.status(400).json({ message: 'Informações inválidas' });
      }

      const products = await ProductModel.find({
        category: {
          _id: search,
        },
      });

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

      if (
        validations.validationField(title)
        || validations.validationField(description)
        || validations.validationField(price)
      ) {
        return res.status(400).json({ message: 'Informações inválidas' });
      }

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

  async editProduct(req, res) {
    try {
      const {
        id, title, description, price,
      } = req.body;

      if (validations.validationField(id)) {
        return res.status(400).json({ message: 'Informações inválidas' });
      }

      await ProductModel.findByIdAndUpdate(id, {
        $set: {
          title,
          description,
          price,
        },
      });

      return res.status(200).json({ message: 'Produto atualizado com sucesso.' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
    }
  }

  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      if (validations.validationField(id)) {
        return res.status(400).json({ message: 'Informações inválidas' });
      }

      await ProductModel.findByIdAndDelete({ _id: id });
      return res.status(200).json({ message: 'Produto deletado com sucesso.' });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: 'Erro interno, tente novamente mais tarde.' });
    }
  }
}

export default new Product();
