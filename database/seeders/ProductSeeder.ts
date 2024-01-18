import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

import Product from "App/Models/Product";
import ProductCategory from "App/Models/ProductCategory";

export default class extends BaseSeeder {
  public async run() {
    const productCategory = await ProductCategory.first();

    await Product.create({
      productCategoryId: productCategory?.id,
      name: "Kursi",
      price: 100000,
    });
  }
}
