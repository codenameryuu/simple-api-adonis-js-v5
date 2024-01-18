import ProductCategory from "App/Models/ProductCategory";

export default class ProductCategoryService {
  public async index(request: any) {
    let result: any;

    try {
      const req = request.all();

      let data, pagination;
      let query = ProductCategory.query().filter(req.filter);

      if (req.relationship == "Ya") {
        query.withScopes((scopes) => scopes.loadRelationship());
      }

      if (req.paginate == "Ya") {
        data = await query.paginate(req.page, req.per_page);
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
    } catch (err) {
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
      const params = request.params();
      const req = request.all();

      let query = ProductCategory.query().where("id", params.product_category_id);

      if (req.relationship == "Ya") {
        query.withScopes((scopes) => scopes.loadRelationship());
      }

      const data = await query.exec();

      result = {
        status: true,
        message: "Data berhasil diambil !",
        data: data,
      };
    } catch (err) {
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
      const req = request.all();

      let data: any = {
        name: req.name,
        description: req.description,
      };

      const productCategory = await ProductCategory.create(data);

      data = await ProductCategory.findBy("id", productCategory.id);

      result = {
        status: true,
        message: "Data berhasil disimpan !",
        data: data,
      };
    } catch (err) {
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
      const params = request.params();
      const req = request.all();

      let data: any = {
        name: req.name,
        description: req.description,
      };

      await ProductCategory.query().where("id", params.product_category_id).update(data);

      data = await ProductCategory.findBy("id", params.product_category_id);

      result = {
        status: true,
        message: "Data berhasil disimpan !",
        data: data,
      };
    } catch (err) {
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
      const params = request.params();

      const productCategory = await ProductCategory.findBy("id", params.product_category_id);
      await productCategory!.delete();

      result = {
        status: true,
        message: "Data berhasil dihapus !",
      };
    } catch (err) {
      result = {
        status: true,
        message: "Data gagal dihapus !",
      };
    }

    return result;
  }
}
