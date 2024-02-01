import BaseSchema from "@ioc:Adonis/Lucid/Schema";

export default class extends BaseSchema {
  protected tableName = "products";

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments("id");

      table.integer("product_category_id").unsigned().references("id").inTable("product_categories");

      table.string("name");
      table.integer("price").defaultTo(0);
      table.json("file").nullable();

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp("deleted_at", { useTz: true }).nullable();
      table.timestamp("created_at", { useTz: true });
      table.timestamp("updated_at", { useTz: true });
    });
  }

  public async down() {
    this.schema.dropTable(this.tableName);
  }
}
