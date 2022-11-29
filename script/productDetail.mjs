import { productAll } from "./product.mjs";
import { addProductToCart } from "./addProductCart.mjs";
import { renderCart } from "./addProductCart.mjs";
// <aside id="productDetail" class="product-detail-aside inactive">
        // <div class="product-detail-close">
        //   <img src="./icons/icon_close.png" alt="close">
        // </div>
        const body = document.querySelector('body');
        const mainContainer = document.querySelector('.main-container')
        const asideProductDetail = document.createElement('aside');
        asideProductDetail.setAttribute('id', 'productDetail')
        asideProductDetail.setAttribute('class', 'product-detail-aside inactive');
        body.insertBefore(asideProductDetail, mainContainer);
        
        
        //product detail close
        const productDetailClose = document.createElement('div');
        productDetailClose.classList.add('product-detail-close');
        
        // img
        const iconClose = document.createElement('img');
        iconClose.setAttribute('src', './icons/icon_close.png');
        ;
        
        
        const productDetailContainer = document.querySelector("#productDetail");
        const productDetailCloseIcon = document.querySelector(".product-detail-close");
        const menuDesktop = document.querySelector(".desktop-menu");
        const menuMobile = document.querySelector('.mobile-menu');
function openProductDetailAside() {
    productDetailContainer.classList.remove("inactive");
    if (shoppingCartContainer.classList.contains("inactive") == false) {
      shoppingCartContainer.classList.toggle("inactive");
    }
    if (menuDesktop.classList.contains("inactive") == false) {
      menuDesktop.classList.toggle("inactive");
    }
    if (menuMobile.classList.contains("inactive") == false) {
      menuMobile.classList.toggle("inactive");
    }
    asideProductDetail.innerHTML = "";
    asideProductDetail.appendChild(productDetailClose);
    productDetailClose.appendChild(iconClose);


    const imgProductDetail = event.target;
    const productDetail = imgProductDetail.parentElement;
    const productDetailName = productDetail.querySelector("#productName").textContent;
    const productDetailPrice = productDetail.querySelector("#productPrice").textContent;
    const productDetailImage = imgProductDetail.getAttribute('src');
    // buscar producto en array de productos con el nombre
    const product = productAll.find((product) => product.name === productDetailName);
    console.log(product);
    const productDetailDescription = product.description;
    //agregar datos al aside

    const imgDetail = document.createElement('img');
    imgDetail.setAttribute('src', productDetailImage);
    imgDetail.setAttribute('alt', productDetailName);
    asideProductDetail.append(imgDetail);

    const productInfo = document.createElement('div');
    productInfo.setAttribute('class', 'product-info');
    asideProductDetail.append(productInfo);

    const productName = document.createElement('p');
    productName.append(productDetailName);
    productInfo.append(productName);

    const productPrice = document.createElement('p');
    productPrice.append(productDetailPrice);
    productInfo.append(productPrice);

    const productDescription = document.createElement('p');
    productDescription.append(productDetailDescription);
    productInfo.append(productDescription);

    const buttonAddToCart = document.createElement('button');
    buttonAddToCart.setAttribute('class', 'primary-button add-to-cart-button');
    buttonAddToCart.append('Add to cart');
    productInfo.append(buttonAddToCart);

    const iconCartButton = document.createElement('img');
    iconCartButton.setAttribute('src', './icons/bt_add_to_cart.svg');
    iconCartButton.setAttribute('alt', 'cart');
    buttonAddToCart.append(iconCartButton);

    buttonAddToCart.addEventListener('click', () => {
      addProductToCart(productDetailName, productDetailPrice, productDetailImage);
    });
  }

productDetailClose.addEventListener('click', closeProductDetailAside);
  function closeProductDetailAside() {
      productDetailContainer.classList.add('inactive');
}


  export { openProductDetailAside };