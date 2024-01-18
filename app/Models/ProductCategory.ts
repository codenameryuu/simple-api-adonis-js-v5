import { DateTime } from "luxon";
import { BaseModel, HasMany, ModelQueryBuilderContract, column, hasMany, scope } from "@ioc:Adonis/Lucid/Orm";
import { compose } from "@ioc:Adonis/Core/Helpers";
import { Filterable } from "adonis-lucid-filter/build/src/Mixin";
import { SoftDeletes } from "@ioc:Adonis/Addons/LucidSoftDeletes";

import Product from "./Product";

import ProductCategoryFilter from "./Filters/ProductCategoryFilter";

type Query = ModelQueryBuilderContract<typeof ProductCategory>;

export default class ProductCategory extends compose(BaseModel, Filterable, SoftDeletes) {
  public static $filter = () => ProductCategoryFilter;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public name: string;

  @column()
  public description: string;

  @column.dateTime({ serializeAs: null })
  public deletedAt: DateTime;

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime;

  /*
  |-----------------------------------------------------------------------------
  | HOOK METHOD(s)
  |-----------------------------------------------------------------------------
  | write your hook method(s) below, to maintain code readability
  */

  /*
  |-----------------------------------------------------------------------------
  | STATIC METHOD(s)
  | ----------------------------------------------------------------------------
  | write your static method(s) below, to maintain code readability
  */

  /*
  |-----------------------------------------------------------------------------
  | SCOPED METHOD(s)
  | ----------------------------------------------------------------------------
  | write your static method(s) below, to maintain code readability
  */

  public static loadRelationship = scope((query: Query) => {
    query.preload("product");
  });

  /*
  |-----------------------------------------------------------------------------
  | RELATIONAL METHOD(s)
  |-----------------------------------------------------------------------------
  | write your relational method(s) below, to maintain code readability
  */

  @hasMany(() => Product, {
    localKey: "id",
    foreignKey: "productCategoryId",
    serializeAs: "products",
  })
  public product: HasMany<typeof Product>;
}
