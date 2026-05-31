import { Schema, model } from 'mongoose'

const productSchema = new Schema({
     title : {
     type: String,
     required: true,
     trim: true,
     lowercase: true
     },
     price: {
          type: String,
          required: true
     },
     discount: {
          type: String,
          default: 0
     }

}, {timestamps: true})

const ProductModel = model("Product", productSchema)

export default ProductModel

