import Product from "App/Models/Product";

export default class ProductService {
  public async index(request: any) {
    let result: any;

    try {
      let data: any, pagination: any;
      let query = Product.query().filter(request.filter);

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
      const data = await Product.findBy("id", request.product_id);

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
      let payload: any = {
        product_category_id: request.product_category_id,
        name: request.name,
        price: request.price,
      };

      const fileName = await Product.saveFile(request.file);

      if (fileName) {
        payload.file = fileName;
      }

      const product = await Product.create(payload);

      const data = await Product.findBy("id", product.id);

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
      let payload: any = {
        product_category_id: request.product_category_id,
        name: request.name,
        price: request.price,
      };

      const fileName = await Product.saveFile(request.file);

      if (fileName) {
        await Product.deleteFile(request.product_id);
        payload.file = fileName;
      }

      await Product.query().where("id", request.product_id).update(payload);

      const data = await Product.findBy("id", request.product_id);

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
      await Product.deleteFile(request.product_id);
      const product = await Product.findBy("id", request.product_id);
      await product!.delete();

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
