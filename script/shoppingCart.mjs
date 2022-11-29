import { addProductToCart } from "./addProductCart.mjs";
import { renderCart } from "./addProductCart.mjs";

const btnAddProduct = document.querySelectorAll('.btnAddProduct');

btnAddProduct.forEach((btn) => {
    btn.addEventListener('click', () => {
        const productInfo = btn.parentElement.parentElement;
        const productPrice = productInfo.querySelector('#productPrice').textContent;
        const productName = productInfo.querySelector('#productName').textContent;
        const productImage = productInfo.parentElement.querySelector('img').src;
        addProductToCart(productName, productPrice, productImage);
        
    });
    });

