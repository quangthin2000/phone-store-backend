import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Product from "App/Models/Product";
import { schema, rules } from "@ioc:Adonis/Core/Validator";
import Database from "@ioc:Adonis/Lucid/Database";
export default class ProductsController {
    /* function: POST store /product
     * @param: response, request
     */
    public async store({ request, response }: HttpContextContract) {
        const validations = schema.create({
            name: schema.string({ trim: true }, [rules.maxLength(100)]),
            thumbnail: schema.string({ trim: true }),
            rate: schema.number(),
            price: schema.number(),
            description: schema.string(),
            category: schema.string(),

        });
        if (!validations) {
            return response.json({
                message: "Cannot validate",
            });
        } else {
            const productData = await request.validate({ schema: validations });
            const product = await Product.create({ ...productData });
            return response.status(200).json(product);
        }
    }

    /* function - GET index /product
     * @param: respone
     */
    public async index({ response }: HttpContextContract) {
        const products = await Product.query().orderBy('id', 'asc');
        if (!products) {
            return response.status(500).json({
                message: "No product",
            });
        } else {
            return response.status(200).json({
                products: products,
                total: products.length,
            });
        }
    }

    /* function - GET pagination /product?page:pagge
     * @param: response
     */
    public async pagination({ request, response }: HttpContextContract) {
        const page = request.input("page", 2);
        const limit = 2;
        const products = await Database.from("products").paginate(page, limit);
        if (products) {
            return response.status(200).json({
                products: products,
            });
        } else {
            return response.status(200).json({
                products: Product.all(),
            });
        }
    }

    /* function - GET show product/:id
     * @param: params-id, response
     */





    public async show({ response, params }) {
        const { id } = params;
        const product = await Product.findOrFail(id);
        if (product) {
            return response.status(200).json({
                product: product,
            });
        }
    }

    /* function - PUT /product/:id update
     * @params: request, response, params
     */
    public async update({ request, response, params }: HttpContextContract) {
        const { id } = params;
        const product = await Product.findOrFail(id);
        // const validations = schema.create({
        //     name: schema.string({ trim: true }, [rules.maxLength(100)]),
        //     // thumbnail: schema.string({ trim: true }),
        //     // rate: schema.number(),
        //     // price: schema.number(),
        //     // description: schema.string(),
        //     // category_id: schema.number(),
        // })
        // const productData = await request.validate({schema: validations})
        const productData = request.all();
        product.merge(productData);
        await product.save();
        return response.status(200).json({
            message: "Success to save product",
            product: product,
        });
    }

    /* function destroy DELETE /product/:id
     * params: params, response
     */
    public async destroy({ response, params }: HttpContextContract) {
        const { id } = params;
        const product = await Product.findOrFail(id);
        product.delete();
        return response.status(200).json({
            message: "Success to delete product",
        });
    }
}
