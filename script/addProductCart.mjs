const CART_KEY = 'cart_yardSale';

function parsePrice(value) {
    if (typeof value !== 'number' && typeof value !== 'string') return NaN;
    const text = String(value).replace('$', '').replace(',', '.').trim();
    if (!text) return NaN;
    const price = Number(text);
    return price >= 0 && Number.isSafeInteger(Math.round(price * 100)) ? price : NaN;
}

function getProductsFromCart() {
    try {
        const cart = JSON.parse(localStorage.getItem(CART_KEY));
        if (!Array.isArray(cart)) return [];
        const names = new Set();
        let cents = 0;
        return cart.filter(product => {
            if (!product || typeof product.name !== 'string' || !product.name.trim() ||
                names.has(product.name) || !Number.isFinite(parsePrice(product.price))) return false;
            const next = cents + Math.round(parsePrice(product.price) * 100);
            if (!Number.isSafeInteger(next)) return false;
            cents = next;
            names.add(product.name);
            return true;
        });
    } catch { return []; }
}

function notify(title, text, icon) {
    swal({title, text, icon, button: 'To accept'});
    const button = document.querySelector('.swal-button');
    if (button) Object.assign(button.style, {
        backgroundColor: '#acd9b2', color: '#F7F7F7', border: 'none', borderRadius: '8px',
    });
}

function saveCart(cart) {
    try {
        const cents = cart.reduce((total, product) => total + Math.round(parsePrice(product.price) * 100), 0);
        if (!Number.isSafeInteger(cents)) throw new Error('Cart total out of range');
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        return true;
    } catch {
        notify('Cart not saved', 'Browser storage is unavailable or the total is out of range', 'error');
        return false;
    }
}

function addProductToCart(productName, productPrice, productImage) {
    if (typeof productName !== 'string' || !productName.trim() || !Number.isFinite(parsePrice(productPrice))) return;
    const cart = getProductsFromCart();
    if (cart.some(product => product.name === productName)) {
        notify('Repeated product', `The product ${productName} is already in the cart`, 'error');
        return;
    }
    const product = {name: productName, price: productPrice, image: productImage};
    if (!saveCart([...cart, product])) return;
    renderCart();
    renderTotal();
    renderTotalProducts();
    notify('Product added', `The product ${productName} was added to the cart`, 'success');
}

function deleteProductFromCart(productName) {
    const cart = getProductsFromCart();
    const remaining = cart.filter(product => product.name !== productName);
    if (remaining.length === cart.length || !saveCart(remaining)) return false;
    renderCart();
    renderTotal();
    renderTotalProducts();
    return true;
}

function createCartRow(product) {
    const row = document.createElement('div');
    row.classList.add('shopping-cart');
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = typeof product.image === 'string' ? product.image : '';
    image.alt = product.name;
    figure.append(image);
    const name = document.createElement('p');
    name.textContent = product.name;
    const price = document.createElement('p');
    price.textContent = product.price;
    const remove = document.createElement('img');
    remove.src = './icons/icon_close.png';
    remove.alt = `Remove ${product.name}`;
    remove.setAttribute('role', 'button');
    remove.tabIndex = 0;
    remove.addEventListener('click', () => {
        if (deleteProductFromCart(product.name)) {
            notify('Product deleted', `The product ${product.name} was deleted from the cart`, 'success');
        }
    });
    remove.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); remove.click(); }
    });
    row.append(figure, name, price, remove);
    return row;
}

function renderCart() {
    const container = document.querySelector('.my-order-content div');
    if (!container) return;
    const cart = getProductsFromCart();
    container.replaceChildren(...cart.map(createCartRow));
    if (!cart.length) shoppingCartState();
}

function shoppingCartState() {
    const container = document.querySelector('.my-order-content div');
    if (!container) return;
    const text = document.createElement('p');
    text.textContent = 'There are no products in the cart';
    text.classList.add('text');
    Object.assign(text.style, {textAlign: 'center', margin: '24px'});
    const icon = document.createElement('img');
    icon.src = './icons/icon_shopping_cart.svg';
    icon.alt = '';
    icon.classList.add('iconShoppingCart');
    Object.assign(icon.style, {width: '100px', margin: '24px auto', display: 'block', animation: 'bounce 1s infinite'});
    container.replaceChildren(text, icon);
}

function renderTotalProducts() {
    const container = document.querySelector('.navbar-shopping-cart div');
    if (container) container.textContent = getProductsFromCart().length;
}

function renderTotal() {
    const cents = getProductsFromCart().reduce((total, product) => total + Math.round(parsePrice(product.price) * 100), 0);
    const container = document.querySelector('#totalPriceShoopping');
    if (container) container.textContent = '$' + (cents / 100).toFixed(2).replace('.', ',');
}

renderCart();
renderTotal();
renderTotalProducts();
export {addProductToCart, renderCart, shoppingCartState, deleteProductFromCart, getProductsFromCart, renderTotal};
