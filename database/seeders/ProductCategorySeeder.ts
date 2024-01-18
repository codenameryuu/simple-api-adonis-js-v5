import BaseSeeder from "@ioc:Adonis/Lucid/Seeder";

import ProductCategory from "App/Models/ProductCategory";

export default class extends BaseSeeder {
  public async run() {
    await ProductCategory.create({
      name: "Mabel",
      description: "Kategori Mebel",
    });
  }
}
