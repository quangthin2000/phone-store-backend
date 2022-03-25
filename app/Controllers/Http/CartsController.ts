import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Cart from "App/Models/Cart";
import Product from "App/Models/Product";
export default class CartsController {
    
    public async addToCart({ response, params }: HttpContextContract) {
        const LIMITED_PRODUCT = 10;
        const { id } = params;
        const cart = await Cart.find(id);
        if (cart) {
            cart.quantity++;
            if (cart.quantity <= LIMITED_PRODUCT) {
                cart.save();
                return response.json({
                    cart: cart,
                    message: "Successfully add to card",
                });
            } else {
                return response.json({
                    message: "Limited, you can not add",
                });
            }
        } else {
            const newCart = new Cart();
            newCart.product_id = id;
            newCart.save();
            return response.json({
                cart: newCart,
                message: "successful add to cart ",
            });
        }
    }

    public async index({ response }: HttpContextContract) {
        try{
            const carts = await Cart.query().preload('products');
            return response.json({
                carts: carts,
            })
        }catch(error){
            return response
        .status(500)
        .json({ message: `An error occured: ${error.message}` });
        }
            
    }

    public async destroy({ response, params }: HttpContextContract) {
        const { id } = params;
        const cart = await Cart.findOrFail(id);
        cart.delete();
        return response.status(200).json({
            message: "Success to delete product",
        });
    }

    public async update({ request, response, params }: HttpContextContract) {
        const { id } = params;
        const LIMITED_PRODUCT = 10;
        const cart = await Cart.findOrFail(id);
        const data = request.all();
        if (data.quantity > LIMITED_PRODUCT && data.quantity < 0) {
            return response.json({
                message: "You can input quantity from 1 to 10",
            });
        } else {
            cart.merge(data);
            await cart.save();
            return response.status(200).json({
                cart: cart,
            });
        }
    }
}
