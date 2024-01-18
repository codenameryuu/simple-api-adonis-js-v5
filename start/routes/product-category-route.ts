import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/product-category", "ProductCategoryController.index").as("index");
  Route.get("/product-category/:product_category_id", "ProductCategoryController.show").as("show");
  Route.post("/product-category", "ProductCategoryController.store").as("store");
  Route.put("/product-category/:product_category_id", "ProductCategoryController.update").as("update");
  Route.delete("/product-category/:product_category_id", "ProductCategoryController.destroy").as("destroy");
})
  .as("product-category")
  .middleware("auth:jwt")
  .prefix("/api");

export default Route;
