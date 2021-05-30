import mongoose from 'mongoose';

const Category = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Category', Category);
