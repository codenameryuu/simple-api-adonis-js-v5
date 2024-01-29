import ProductCategory from "App/Models/ProductCategory";

export default class ProductCategoryService {
  public async index(request: any) {
    let result: any;

    try {
      let data: any, pagination: any;
      let query = ProductCategory.query().filter(request.filter);

      if (request.relationship == "Ya") {
        query.withScopes((scopes) => scopes.loadRelationship());
      }

      if (request.paginate == "Ya") {
        data = await query.paginate(request.page, request.per_page);
        pagination = true;
      } else {
        data = await query.exec();
        pagination = false;
      }

      result = {
        status: true,
        message: "Data berhasil diambil !",
        data: data,
        pagination: pagination,
      };
    } catch (e) {
      result = {
        status: true,
        message: "Data gagal diambil !",
      };
    }

    return result;
  }

  public async show(request: any) {
    let result: any;

    try {
      let query = ProductCategory.query().where("id", request.product_category_id);

      if (request.relationship == "Ya") {
        query.withScopes((scopes) => scopes.loadRelationship());
      }

      const data = await query.exec();

      result = {
        status: true,
        message: "Data berhasil diambil !",
        data: data,
      };
    } catch (e) {
      result = {
        status: true,
        message: "Data gagal diambil !",
      };
    }

    return result;
  }

  public async store(request: any) {
    let result: any;

    try {
      const payload = {
        name: request.name,
        description: request.description,
      };

      const productCategory = await ProductCategory.create(payload);

      const data = await ProductCategory.findBy("id", productCategory.id);

      result = {
        status: true,
        message: "Data berhasil disimpan !",
        data: data,
      };
    } catch (e) {
      result = {
        status: true,
        message: "Data gagal disimpan !",
      };
    }

    return result;
  }

  public async update(request: any) {
    let result: any;

    try {
      const payload = {
        name: request.name,
        description: request.description,
      };

      await ProductCategory.query().where("id", request.product_category_id).update(payload);

      const data = await ProductCategory.findBy("id", request.product_category_id);

      result = {
        status: true,
        message: "Data berhasil disimpan !",
        data: data,
      };
    } catch (e) {
      result = {
        status: true,
        message: "Data gagal disimpan !",
      };
    }

    return result;
  }

  public async destroy(request: any) {
    let result: any;

    try {
      const productCategory = await ProductCategory.findBy("id", request.product_category_id);
      await productCategory!.delete();

      result = {
        status: true,
        message: "Data berhasil dihapus !",
      };
    } catch (e) {
      result = {
        status: true,
        message: "Data gagal dihapus !",
      };
    }

    return result;
  }
}
