import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import AuthValidation from "App/Validations/AuthValidation";
const authValidation = new AuthValidation();

import AuthService from "App/Services/AuthService";
const authService = new AuthService();

import formatResponse from "App/Traits/FormatResponse";

export default class AuthController {
  public async register({ auth, request, response }: HttpContextContract) {
    const validation = await authValidation.register(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const result = await authService.register(auth, request);

    return formatResponse(result, response);
  }

  public async login({ auth, request, response }: HttpContextContract) {
    const validation = await authValidation.login(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const result = await authService.login(auth, request);

    return formatResponse(result, response);
  }

  public async logout({ auth, response }: HttpContextContract) {
    const result = await authService.logout(auth);

    return formatResponse(result, response);
  }
}
