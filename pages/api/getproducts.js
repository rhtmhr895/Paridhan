
import connectDb from "../../middleware/mongoose"
import Product from "../models/Product"

const handler = async (req, res) => {
  let products = await Product.find()
  let category = {}
  for (let item of products) {
    if (item.title in category) {
      if(!category[item.title].color.includes(item.color) && item.availableQty > 0) {
        category[item.title].color.push(item.color)
      }
      if(!category[item.title].size.includes(item.size) && item.availableQty > 0) {
        category[item.title].size.push(item.size)
      }
    }
     else {
      category[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {
        category[item.title].color = [item.color]
        category[item.title].size = [item.size]

      }
    }
  }
  res.status(200).json({category})
}


export default connectDb(handler);