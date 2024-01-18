import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";

import ProductCategoryValidation from "App/Validations/ProductCategoryValidation";
const productCategoryValidation = new ProductCategoryValidation();

import ProductCategoryService from "App/Services/ProductCategoryService";
const productCategoryService = new ProductCategoryService();

import formatResponse from "App/Traits/FormatResponse";

export default class ProductCategoryController {
  public async index({ request, response }: HttpContextContract) {
    const validation = await productCategoryValidation.index(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const result = await productCategoryService.index(request);

    return formatResponse(result, response);
  }

  public async show({ request, response }: HttpContextContract) {
    const validation = await productCategoryValidation.show(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const result = await productCategoryService.show(request);

    return formatResponse(result, response);
  }

  public async store({ request, response }: HttpContextContract) {
    const validation = await productCategoryValidation.store(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const result = await productCategoryService.store(request);

    return formatResponse(result, response);
  }

  public async update({ request, response }: HttpContextContract) {
    const validation = await productCategoryValidation.update(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const result = await productCategoryService.update(request);

    return formatResponse(result, response);
  }

  public async destroy({ request, response }: HttpContextContract) {
    const validation = await productCategoryValidation.destroy(request);

    if (!validation.status) {
      return formatResponse(validation, response);
    }

    const result = await productCategoryService.destroy(request);

    return formatResponse(result, response);
  }
}
