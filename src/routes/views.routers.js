import express from "express";
import ProductManager from "../dao/ProductManager.js"
import CartManager from "../dao/CartManager.js";

const router = express.Router();
const productManager = new ProductManager();
const cartManager = new CartManager();

router.get ("/", async (req, res) => {
    const products = await productManager.getProducts(req.query);
    res.render("home", {products}); 
});

router.get("/products", async (req, res) => {
    const products = await productManager.getProducts(req.query);
    res.render("products", {products});
});

router.get("/products/:pid", async (req, res) => {
    const pid = req.params.pid;
    const product = await productManager.getProductById(pid);

    res.render("product", {product});
});

router.get ("/realtimeproducts", (req, res) => {
    res.render ("realTimeProducts"); 
});

router.get ("/chat", (req, res) => {
    res.render ("chat"); 
}); 

router.get("/cart/:cid", async (req, res) => {
    const cid = req.params.cid;
    const cart = await cartManager.getCart(cid);

    if (cart) {
        res.render("cart", {products:cart.products});
    } else {
        res.status(400).send({status:"error", message:"Error! No se encuentra el ID de Carrito!"});
    }
});

export default router;