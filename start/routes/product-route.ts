import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.get("/product", "ProductController.index").as("index");
  Route.get("/product/:product_id", "ProductController.show").as("show");
  Route.post("/product", "ProductController.store").as("store");
  Route.put("/product/:product_id", "ProductController.update").as("update");
  Route.delete("/product/:product_id", "ProductController.destroy").as("destroy");
})
  .as("product")
  .middleware("auth:jwt")
  .prefix("/api");

export default Route;
