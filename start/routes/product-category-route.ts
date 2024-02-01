import Route from "@ioc:Adonis/Core/Route";

import ProductCategoryController from "App/Controllers/Http/ProductCategoryController";
const productCategoryController = new ProductCategoryController();

Route.group(() => {
  Route.get("/product-category", productCategoryController.index).as("index");
  Route.get("/product-category/:product_category_id", productCategoryController.show).as("show");
  Route.post("/product-category", productCategoryController.store).as("store");
  Route.put("/product-category/:product_category_id", productCategoryController.update).as("update");
  Route.delete("/product-category/:product_category_id", productCategoryController.destroy).as("destroy");
})
  .as("product-category")
  .middleware("auth:jwt")
  .prefix("/api");

export default Route;
