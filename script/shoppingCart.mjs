import {addProductToCart} from './addProductCart.mjs';
const container = document.querySelector('.cards-container');
container?.addEventListener('click', event => {
    const button = event.target.closest('.btnAddProduct');
    if (!button || !container.contains(button)) return;
    const card = button.closest('.product-card');
    addProductToCart(card.querySelector('.productName').textContent,
        card.querySelector('.productPrice').textContent, card.querySelector('img').src);
});
