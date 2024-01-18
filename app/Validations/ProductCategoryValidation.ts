import { schema, rules } from "@ioc:Adonis/Core/Validator";

export default class ProductCategoryValidation {
  public async index(request: any) {
    let status, message, errorField;

    const validationSchema = schema.create({
      paginate: schema.enum(["Ya", "Tidak"] as const),
      page: schema.number.optional([rules.requiredWhen("paginate", "=", "Ya")]),
      per_page: schema.number.optional([rules.requiredWhen("paginate", "=", "Ya")]),
      filter: schema.object.optional().members({ name: schema.string.optional(), relationship: schema.string.optional() }),
    });

    const validationMessages = {
      "paginate.enum": "Paginasi harus berisi Ya atau Tidak !",
      "paginate.required": "Paginasi tidak boleh kosong !",

      "page.number": "Halaman harus bertipe angka !",
      "page.requiredWhen": "Halaman tidak boleh kosong !",

      "per_page.number": "Per halaman harus bertipe angka !",
      "per_page.requiredWhen": "Per halaman tidak boleh kosong !",

      "filter.object": "Filter harus bertipe object !",
      "filter.name.string": "Filter bagian nama harus bertipe string !",
      "filter.relationship.string": "Filter bagian relasi harus bertipe string !",
    };

    try {
      await request.validate({ schema: validationSchema, messages: validationMessages });

      status = true;
      message = "Validasi berhasil !";
    } catch (err) {
      status = false;
      message = err.messages.errors[0].message;
      errorField = err.messages.errors[0].field;
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    };

    return result;
  }

  public async show(request: any) {
    let status, message, errorField;

    const validationSchema = schema.create({
      params: schema.object().members({
        product_category_id: schema.number([rules.required(), rules.exists({ table: "product_categories", column: "id" })]),
      }),
    });

    const validationMessages = {
      "params.product_category_id.number": "ID kategori produk harus bertipe angka !",
      "params.product_category_id.required": "ID kategori produk tidak boleh kosong !",
      "params.product_category_id.exists": "ID kategori produk tidak tersedia !",
    };

    try {
      await request.validate({
        schema: validationSchema,
        messages: validationMessages,
      });

      status = true;
      message = "Validasi berhasil !";
    } catch (err) {
      status = false;
      message = err.messages.errors[0].message;
      errorField = err.messages.errors[0].field;
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    };

    return result;
  }

  public async store(request: any) {
    let status, message, errorField;

    const validationSchema = schema.create({
      name: schema.string([rules.required()]),
      description: schema.string([rules.required()]),
    });

    const validationMessages = {
      "name.string": "Nama harus bertipe string !",
      "name.required": "Nama tidak boleh kosong !",

      "description.string": "Deskripsi harus bertipe string !",
      "description.required": "Deskripsi tidak boleh kosong !",
    };

    try {
      await request.validate({
        schema: validationSchema,
        messages: validationMessages,
      });

      status = true;
      message = "Validasi berhasil !";
    } catch (err) {
      status = false;
      message = err.messages.errors[0].message;
      errorField = err.messages.errors[0].field;
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    };

    return result;
  }

  public async update(request: any) {
    let status, message, errorField;

    const validationSchema = schema.create({
      params: schema.object().members({
        product_category_id: schema.number([rules.required(), rules.exists({ table: "product_categories", column: "id" })]),
      }),
      name: schema.string([rules.required()]),
      description: schema.string([rules.required()]),
    });

    const validationMessages = {
      "params.product_category_id.number": "ID kategori produk harus bertipe angka !",
      "params.product_category_id.required": "ID kategori produk tidak boleh kosong !",
      "params.product_category_id.exists": "ID kategori produk tidak tersedia !",

      "name.string": "Nama harus bertipe string !",
      "name.required": "Nama tidak boleh kosong !",

      "description.string": "Deskripsi harus bertipe string !",
      "description.required": "Deskripsi tidak boleh kosong !",
    };

    try {
      await request.validate({
        schema: validationSchema,
        messages: validationMessages,
      });

      status = true;
      message = "Validasi berhasil !";
    } catch (err) {
      status = false;
      message = err.messages.errors[0].message;
      errorField = err.messages.errors[0].field;
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    };

    return result;
  }

  public async destroy(request: any) {
    let status, message, errorField;

    const validationSchema = schema.create({
      params: schema.object().members({
        product_category_id: schema.number([rules.required(), rules.exists({ table: "product_categories", column: "id" })]),
      }),
    });

    const validationMessages = {
      "params.product_category_id.number": "ID kategori produk harus bertipe angka !",
      "params.product_category_id.required": "ID kategori produk tidak boleh kosong !",
      "params.product_category_id.exists": "ID kategori produk tidak tersedia !",
    };

    try {
      await request.validate({
        schema: validationSchema,
        messages: validationMessages,
      });

      status = true;
      message = "Validasi berhasil !";
    } catch (err) {
      status = false;
      message = err.messages.errors[0].message;
      errorField = err.messages.errors[0].field;
    }

    const result = {
      status: status,
      message: message,
      errorField: errorField,
    };

    return result;
  }
}
