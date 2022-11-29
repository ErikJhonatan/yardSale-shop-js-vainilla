function addProductToCart(productName, productPrice, productImage) {
    if (typeof productName !== 'string' || !productName.trim() || !Number.isFinite(parsePrice(productPrice))) return;
    const text = document.querySelector('.text');
    if (text) {
        text.remove();
    }
    const iconShoppingCart = document.querySelector('.iconShoppingCart');
    if (iconShoppingCart) {
        iconShoppingCart.remove();
    }
    const product = {
        name: productName,
        price: productPrice,
        image: productImage
    };
    let cart = getProductsFromCart();
    if (cart === null) {
        cart = [];
    }
    // no agregar productos repetidos
    const productExists = cart.some((product) => product.name === productName);
    if (productExists) {
        
        swal({
            title: "Repeated product",
            text: "The product "+ product.name +" already in the cart",
            icon: "error",
            button: "To accept",
            });
        // centrar el boton de To accept
        const btnSweetAlert = document.querySelector('.swal-button');


        btnSweetAlert.style.backgroundColor = '#acd9b2';
        btnSweetAlert.style.color = '#fff';
        btnSweetAlert.style.border = 'none';
        btnSweetAlert.style.borderRadius = '8px';
        return;

    }
    cart.push(product);
    swal({
        title: "Product added",
        text: "The product "+ product.name +" was added to the cart",
        icon: "success",
        button: "to accept",
        });
    // cambiar el color del boton aceptar del sweetalert
    const btnSweetAlert = document.querySelector('.swal-button');
    btnSweetAlert.style.backgroundColor = '#acd9b2';
    btnSweetAlert.style.color = '#F7F7F7';
    btnSweetAlert.style.border = 'none';
    btnSweetAlert.style.borderRadius = '8px';

    localStorage.setItem('cart_yardSale', JSON.stringify(cart));
    renderTotal();
    renderTotalProducts();
    const orderContent = document.querySelector('.my-order-content div');
    const shoppingCart = document.createElement('div');
        shoppingCart.classList.add('shopping-cart');
        orderContent.append(shoppingCart);

        const shoppingCartFigure = document.createElement('figure');
        shoppingCart.append(shoppingCartFigure);

        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.image)
        shoppingCartFigure.append(productImg);

        const price = document.createElement('p');
        const name = document.createElement('p');

        const productPriceText = document.createTextNode(product.price);
        const productNameText = document.createTextNode(product.name);
        price.append(productPriceText);
        name.append(productNameText);

        shoppingCart.append(name, price);
        
        const iconDeleteProduct = document.createElement('img');
        iconDeleteProduct.setAttribute('src', './icons/icon_close.png');
        shoppingCart.append(iconDeleteProduct);
        iconDeleteProduct.addEventListener('click', () => {
                deleteProductFromCart(product.name);
                shoppingCart.remove();
                swal({
                    title: "Product deleted",
                    text: "The product "+ product.name +" was deleted from the cart",
                    icon: "success",
                    button: "to accept",
                    });
                // cambiar el color del boton aceptar del sweetalert
                const btnSweetAlert = document.querySelector('.swal-button');
                btnSweetAlert.style.backgroundColor = '#acd9b2';
                btnSweetAlert.style.color = '#F7F7F7';
                btnSweetAlert.style.border = 'none';
                btnSweetAlert.style.borderRadius = '8px';

                if(orderContent.children.length === 0) {
                    shoppingCartState();
                }
                renderTotal();
                renderTotalProducts();
            });

}
// obtener productos del carrito 
function parsePrice(value) {
    const text = String(value ?? '').replace('$', '').replace(',', '.').trim();
    if (!text) return NaN;
    const price = Number(text);
    return Number.isFinite(price) && price >= 0 ? price : NaN;
}
function getProductsFromCart() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart_yardSale'));
        return Array.isArray(cart) ? cart.filter(product => product && typeof product.name === 'string' && Number.isFinite(parsePrice(product.price))) : [];
    } catch { return []; }
}

function deleteProductFromCart(productName) {
    let cart = getProductsFromCart();
    cart = cart.filter((product) => product.name !== productName);
    localStorage.setItem('cart_yardSale', JSON.stringify(cart));
    renderTotal();
    renderTotalProducts();  
}

function renderCart() {
    const cart = getProductsFromCart();
    const container = document.querySelector('.my-order-content div');
    if (!container) return;
    container.replaceChildren();
    // si el carrito esta vacio mostrar mensaje
    if (cart === null || cart.length === 0) {
       shoppingCartState();
    }

    if (cart === null) {
        return;
    }
    const orderContent = document.querySelector('.my-order-content div');
    cart.forEach((product) => {
        
        const shoppingCart = document.createElement('div');
        shoppingCart.classList.add('shopping-cart');
        orderContent.append(shoppingCart);

        const shoppingCartFigure = document.createElement('figure');
        shoppingCart.append(shoppingCartFigure);

        const productImg = document.createElement('img');
        productImg.setAttribute('src', product.image)
        shoppingCartFigure.append(productImg);

        const price = document.createElement('p');
        const name = document.createElement('p');

        const productPriceText = document.createTextNode(product.price);
        const productNameText = document.createTextNode(product.name);
        price.append(productPriceText);
        name.append(productNameText);

        shoppingCart.append(name, price)

        const iconDeleteProduct = document.createElement('img');
        iconDeleteProduct.setAttribute('src', './icons/icon_close.png');
        shoppingCart.append(iconDeleteProduct);

        iconDeleteProduct.addEventListener('click', () => {
            swal({
                title: "Product deleted",
                text: "The product "+ product.name +" was deleted from the cart",
                icon: "success",
                button: "to accept",
                });
            // cambiar el color del boton aceptar del sweetalert
            const btnSweetAlert = document.querySelector('.swal-button');
            btnSweetAlert.style.backgroundColor = '#acd9b2';
            btnSweetAlert.style.color = '#F7F7F7';
            btnSweetAlert.style.border = 'none';
            btnSweetAlert.style.borderRadius = '8px';

            deleteProductFromCart(product.name);
            shoppingCart.remove();
            if(orderContent.children.length === 0) {
                shoppingCartState();
            }
        });
        
    })
}
function shoppingCartState(){
    const orderContent = document.querySelector('.my-order-content div');
    if (!orderContent) return;
    orderContent.replaceChildren();
    const text = document.createElement('p');
    const textContent = document.createTextNode('There are no products in the cart');
    text.append(textContent);
    text.style.textAlign = 'center';
    text.style.margin = '24px';
    text.classList.add('text');
    orderContent.append(text);
    const createImg = document.createElement('img');
    const iconShoppingCart = './icons/icon_shopping_cart.svg';
    createImg.setAttribute('src', iconShoppingCart);
    createImg.classList.add('iconShoppingCart');
    createImg.style.width = '100px';
    createImg.style.margin = '24px auto';
    createImg.style.display = 'block';
    createImg.style.animation = 'bounce 1s infinite';
    orderContent.append(createImg);
}
function totalProducts() {
    const cart = getProductsFromCart();
    if (cart === null) {
        return 0;
    }
    return cart.length;
}
function renderTotalProducts() {
    const totalProduct = document.querySelector('.navbar-shopping-cart div');
    totalProduct.innerHTML = totalProducts();
}

function calculateTotal() {
    const cart = getProductsFromCart();
    if (cart === null || cart.length === 0) {
        return 0;
    }
    const total = cart.reduce((acc, product) => {
        return acc + Math.round(parsePrice(product.price) * 100);
    }, 0);
    return total / 100;
}
function renderTotal() {
    const total = calculateTotal();
    const totalContainer = document.querySelector('#totalPriceShoopping');
   totalContainer.innerHTML = '$' + total.toFixed(2).replace('.', ',');
}

renderCart();
renderTotal();
renderTotalProducts();
 export {addProductToCart, renderCart, shoppingCartState, deleteProductFromCart, getProductsFromCart, renderTotal};

