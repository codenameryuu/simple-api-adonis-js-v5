import Route from "@ioc:Adonis/Core/Route";

import AuthController from "App/Controllers/Http/AuthController";
const authController = new AuthController();

Route.group(() => {
  Route.post("/register", authController.register).as("register");
  Route.post("/login", authController.login).as("login");
  Route.post("/logout", authController.logout).as("logout");
}).prefix("/api");

export default Route;
