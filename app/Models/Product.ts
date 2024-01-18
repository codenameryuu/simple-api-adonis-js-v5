import { DateTime } from "luxon";
import { BaseModel, BelongsTo, ModelQueryBuilderContract, beforeFetch, beforeFind, belongsTo, column, computed } from "@ioc:Adonis/Lucid/Orm";
import { compose } from "@ioc:Adonis/Core/Helpers";
import { Filterable } from "adonis-lucid-filter/build/src/Mixin";
import { SoftDeletes } from "@ioc:Adonis/Addons/LucidSoftDeletes";

import ProductCategory from "./ProductCategory";

import ProductFilter from "./Filters/ProductFilter";

import StorageHelper from "App/Helpers/StorageHelper";
const storageHelper = new StorageHelper();

type Query = ModelQueryBuilderContract<typeof Product>;

export default class Product extends compose(BaseModel, Filterable, SoftDeletes) {
  public static $filter = () => ProductFilter;

  @column({ isPrimary: true })
  public id: number;

  @column()
  public productCategoryId: number;

  @column()
  public name: string;

  @column()
  public price: number;

  @column()
  public file?: string | null;

  @computed({ serializeAs: "file_url" })
  public get fileUrl() {
    if (this.file) {
      const result = storageHelper.getUrl(this.file, "products");
      return result;
    }

    return null;
  }

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

  @beforeFind()
  public static async beforeFind(query: Query) {
    query.preload("productCategory");
  }

  @beforeFetch()
  public static async beforeFetch(query: Query) {
    query.preload("productCategory");
  }

  /*
  |-----------------------------------------------------------------------------
  | STATIC METHOD(s)
  | ----------------------------------------------------------------------------
  | write your static method(s) below, to maintain code readability
  */

  static async saveFile(file: any) {
    const fileName = await storageHelper.upload(file, "products");

    return fileName;
  }

  static async deleteFile(productId: any) {
    const product = await Product.findBy("id", productId);

    if (product?.file) {
      await storageHelper.delete(product?.file, "products");
    }
  }

  /*
  |-----------------------------------------------------------------------------
  | SCOPED METHOD(s)
  | ----------------------------------------------------------------------------
  | write your static method(s) below, to maintain code readability
  */

  /*
  |-----------------------------------------------------------------------------
  | RELATIONAL METHOD(s)
  |-----------------------------------------------------------------------------
  | write your relational method(s) below, to maintain code readability
  */

  @belongsTo(() => ProductCategory, {
    localKey: "id",
    foreignKey: "productCategoryId",
    serializeAs: "product_category",
  })
  public productCategory: BelongsTo<typeof ProductCategory>;
}
