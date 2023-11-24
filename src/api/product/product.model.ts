/* eslint-disable @typescript-eslint/no-this-alias */
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
    },
    reviews: {
      type: [{ type: Schema.Types.ObjectId, ref: 'review' }],
      required: false
    },
    rating: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

ProductSchema.pre('save', async function (next) {
  const product = this

  if (this.reviews !== undefined && this.reviews !== null) {
    const totalRating = await this.populate('reviews').then(() => {
      return this.reviews?.reduce((acc: number, review: any) => {
        return acc + review.rating
      }, 0)
    })

    if (totalRating !== undefined) {
      const averageRating = totalRating / this.reviews?.length
      product.rating = averageRating

      next()
    }
  }
})

const ProductModel = model('product', ProductSchema)

export default ProductModel
