import { BaseModelFilter } from "@ioc:Adonis/Addons/LucidFilter";
import { ModelQueryBuilderContract } from "@ioc:Adonis/Lucid/Orm";

import isset from "App/Helpers/Isset";

import ProductCategory from "../ProductCategory";

export default class ProductCategoryFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof ProductCategory, ProductCategory>;

  name(value: any) {
    if (isset(value)) {
      const search = String(value).trim();
      this.$query.where("name", "ILIKE", `%${search}%`);
    }
  }
}
