import { Schema, model } from 'mongoose';

export const ProductSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, 'Product image is required']
    },
    name: {
      type: String,
      required: [true, 'Product name is required'],
      minlength: [4, 'Product name must be at least 4 characters long']
    },
    description: {
      type: String,
      required: [true, 'Product description is required']
    },
    price: {
      type: Number,
      required: [true, 'Product price is required']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const ProductModel = model('product', ProductSchema)

export default ProductModel
