import { SwaggerConfig } from "@ioc:Adonis/Addons/Swagger";
import Env from "@ioc:Adonis/Core/Env";

export default {
  uiEnabled: true, //disable or enable swaggerUi route
  uiUrl: "docs", // url path to swaggerUI
  specEnabled: true, //disable or enable swagger.json route
  specUrl: "/swagger.json",

  middleware: [], // middlewares array, for protect your swagger docs and spec endpoints

  options: {
    definition: {
      openapi: "3.0.0",
      info: {
        title: Env.get("APP_DESC"),
        version: "1.0.0",
        description: "Simple API using adonis js created by Muhammad Fikri Sabriansyah",
      },
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
    },

    apis: ["docs/swagger/controllers/*.yml", "docs/swagger/controllers/**/*.yml", "docs/swagger/components/*.yml", "docs/swagger/components/**/*.yml"],

    basePath: "/",
  },
  mode: Env.get("NODE_ENV") === "production" ? "PRODUCTION" : "RUNTIME",
  specFilePath: "docs/swagger.json",
} as SwaggerConfig;
