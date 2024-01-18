import { DateTime } from "luxon";
import { BaseModel, column } from "@ioc:Adonis/Lucid/Orm";
import { compose } from "@ioc:Adonis/Core/Helpers";
import { Filterable } from "adonis-lucid-filter/build/src/Mixin";
import { SoftDeletes } from "adonis-lucid-soft-deletes/build/src/SoftDeletes";

export default class User extends compose(BaseModel, Filterable, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number;

  @column()
  public email: string;

  @column({ serializeAs: null })
  public password: string;

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

  /*
  |-----------------------------------------------------------------------------
  | RELATIONAL METHOD(s)
  |-----------------------------------------------------------------------------
  | write your relational method(s) below, to maintain code readability
  */
}
