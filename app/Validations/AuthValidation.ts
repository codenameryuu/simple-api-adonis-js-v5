import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Hash from "@ioc:Adonis/Core/Hash";
import User from "App/Models/User";

export default class AuthValidation {
  public async register(request: any) {
    let status, message, errorField;

    const validationSchema = schema.create({
      email: schema.string([rules.required(), rules.email(), rules.unique({ table: "users", column: "email", caseInsensitive: true })]),
      password: schema.string([rules.required(), rules.confirmed("password_confirmation")]),
      password_confirmation: schema.string([rules.required()]),
    });

    const validationMessages = {
      "email.string": "Emaul harus bertipe string !",
      "email.required": "Email tidak boleh kosong !",
      "email.email": "Format email tidak valid !",
      "email.unique": "Email sudah terdaftar !",

      "password.string": "Password harus bertipe string !",
      "password.required": "Password tidak boleh kosong !",

      "password_confirmation.string": "Konfirmasi password harus bertipe string !",
      "password_confirmation.required": "Konfirmasi password tidak boleh kosong !",
      "password_confirmation.confirmed": "Password tidak sama !",
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

  public async login(request: any) {
    let status, message, errorField;

    const validationSchema = schema.create({
      email: schema.string([rules.required(), rules.email(), rules.exists({ table: "users", column: "email", caseInsensitive: true })]),
      password: schema.string([rules.required()]),
    });

    const validationMessages = {
      "email.string": "Emaul harus bertipe string !",
      "email.required": "Email tidak boleh kosong !",
      "email.email": "Format email tidak valid !",
      "email.exists": "Email tidak tersedia !",

      "password.string": "Password harus bertipe string !",
      "password.required": "Password tidak boleh kosong !",
    };

    try {
      await request.validate({ schema: validationSchema, messages: validationMessages });

      status = true;
      message = "Validasi berhasil !";

      const req = request.all();

      const user = await User.findBy("email", req.email);

      if (!(await Hash.verify(user!.password, req.password))) {
        status = false;
        message = "Password salah !";
        errorField = "password";
      }
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
