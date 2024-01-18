import Product from "App/Models/Product";

export default class ProductService {
  public async index(request: any) {
    let result: any;

    try {
      const req = request.all();

      let data, pagination;
      let query = Product.query().filter(req.filter);

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

      const data = await Product.findBy("id", params.product_id);

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
      const file = request.file("file");

      let data: any = {
        product_category_id: req.product_category_id,
        name: req.name,
        price: req.price,
      };

      const fileName = await Product.saveFile(file);

      if (fileName) {
        data.file = fileName;
      }

      const product = await Product.create(data);

      data = await Product.findBy("id", product.id);

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
      const file = request.file("file");

      let data: any = {
        product_category_id: req.product_category_id,
        name: req.name,
        price: req.price,
      };

      const fileName = await Product.saveFile(file);

      if (fileName) {
        await Product.deleteFile(params.product_id);
        data.file = fileName;
      }

      await Product.query().where("id", params.product_id).update(data);

      data = await Product.findBy("id", params.product_id);

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

      await Product.deleteFile(params.product_id);
      const product = await Product.findBy("id", params.product_id);
      await product!.delete();

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
