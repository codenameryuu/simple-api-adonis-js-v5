import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import ProductValidation from "App/Validations/ProductValidation";
const productValidation = new ProductValidation();

import ProductService from "App/Services/ProductService";
const productService = new ProductService();

import formatPayload from "App/Traits/FormatPayload";
import formatResponse from "App/Traits/FormatResponse";

export default class ProductController {
  public async index({ request, response }: HttpContextContract) {
    const validation = await productValidation.index(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const payload = formatPayload(request);
    const result = await productService.index(payload);

    return formatResponse(result, response);
  }

  public async show({ request, response }: HttpContextContract) {
    const validation = await productValidation.show(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const payload = formatPayload(request);
    const result = await productService.show(payload);

    return formatResponse(result, response);
  }

  public async store({ request, response }: HttpContextContract) {
    const validation = await productValidation.store(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const payload = formatPayload(request);
    const result = await productService.store(payload);

    return formatResponse(result, response);
  }

  public async update({ request, response }: HttpContextContract) {
    const validation = await productValidation.update(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const payload = formatPayload(request);
    const result = await productService.update(payload);

    return formatResponse(result, response);
  }

  public async destroy({ request, response }: HttpContextContract) {
    const validation = await productValidation.destroy(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const payload = formatPayload(request);
    const result = await productService.destroy(payload);

    return formatResponse(result, response);
  }
}
