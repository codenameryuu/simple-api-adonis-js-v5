import { BaseModelFilter } from "@ioc:Adonis/Addons/LucidFilter";
import { ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Orm";

import isset from "App/Helpers/Isset";

import Product from "../Product";

export default class ProductFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Product, Product>;
  name(value: any) {
    if (isset(value)) {
      const search = String(value).trim();
      this.$query.where("name", "ILIKE", `%${search}%`);
    }
  }

  price(value: any) {
    if (isset(value)) {
      this.$query.where("price", value);
    }
  }
}
