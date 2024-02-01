import Route from "@ioc:Adonis/Core/Route";

import ProductController from "App/Controllers/Http/ProductController";
const productController = new ProductController();

Route.group(() => {
  Route.get("/product", productController.index).as("index");
  Route.get("/product/:product_id", productController.show).as("show");
  Route.post("/product", productController.store).as("store");
  Route.put("/product/:product_id", productController.update).as("update");
  Route.delete("/product/:product_id", productController.destroy).as("destroy");
})
  .as("product")
  .middleware("auth:jwt")
  .prefix("/api");

export default Route;
