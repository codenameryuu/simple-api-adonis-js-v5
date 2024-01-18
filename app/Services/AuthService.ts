import Hash from "@ioc:Adonis/Core/Hash";

import User from "App/Models/User";

export default class AuthService {
  public async register(auth: any, request: any) {
    let result: any;

    try {
      const req = request.all();

      const email = req.email.toLowerCase();
      const password = await Hash.make(req.password);

      let data: any = {
        email: email,
        password: password,
      };

      const user = await User.create(data);

      data = await User.findBy("id", user.id);

      const accessToken = await auth.use("jwt").generate(data, {
        expiresIn: "1 day",
      });

      result = {
        status: true,
        message: "Data berhasil disimpan !",
        data: data,
        accessToken: accessToken,
      };
    } catch (err) {
      result = {
        status: true,
        message: "Data gagal disimpan !",
      };
    }

    return result;
  }

  public async login(auth: any, request: any) {
    let result: any;

    try {
      const req = request.all();

      const data = await User.findBy("email", req.email);

      const accessToken = await auth.use("jwt").generate(data, {
        expiresIn: "1 day",
      });

      result = {
        status: true,
        message: "Data berhasil diambil !",
        data: data,
        accessToken: accessToken,
      };
    } catch (err) {
      result = {
        status: true,
        message: "Data gagal diambil !",
      };
    }

    return result;
  }

  public async logout(auth: any) {
    let result: any;

    try {
      await auth.use("jwt").revoke();

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
