import {openProductDetailAside} from './productDetail.mjs'
const productToys = [];
const productClothes = [];
const productElectronics = [];
const productFurnitures = [];
const productOthers = [];
const productAll = [];
const categories = {toys: productToys, clothes: productClothes, electronics: productElectronics, furnitures: productFurnitures, others: productOthers};
const addProduct = product => {
  const category = categories[product?.category];
  if (!category || typeof product.name !== 'string' || !Number.isFinite(Number(product.price)) || Number(product.price) < 0) return false;
  const entry = {name: product.name, price: Number(product.price), image: product.image, description: product.description, category: product.category};
  category.push(entry);
  productAll.push(entry);
  return true;
};
const cardsContainer = document.querySelector(".cards-container");

function renderProducts(arr) {
  if (!cardsContainer || !Array.isArray(arr)) return;
  cardsContainer.replaceChildren();
  for (let i = 0; i < arr.length; i++) {
    // product cart
    const productCart = document.createElement("div");
    productCart.classList.add("product-card");

    cardsContainer.append(productCart);
    // img
    const img = document.createElement("img");
    img.setAttribute("src", arr[i].image);
    img.addEventListener("click", openProductDetailAside);
    img.classList.add('img-product-detail')

    

    productCart.append(img);
    // product info
    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    productCart.append(productInfo);

    // product info div
    const productInfoDiv = document.createElement("div");
    productInfo.append(productInfoDiv);

    const productPrice = document.createElement("p");
    productPrice.setAttribute('class', 'productPrice')
    const productName = document.createElement("p");
    productName.setAttribute('class', 'productName')
    productInfoDiv.append(productPrice, productName);

    const priceText = document.createTextNode("$" + arr[i].price.toFixed(2).replace(".", ","));
    const nameText = document.createTextNode(arr[i].name);
    productPrice.append(priceText);
    productName.append(nameText);

    const productInfoFigure = document.createElement("figure");
    productInfo.append(productInfoFigure);
    const productImgCart = document.createElement("img");
    productImgCart.setAttribute("src", "./icons/bt_add_to_cart.svg");
    productImgCart.setAttribute("class", "btnAddProduct");
    productInfoFigure.append(productImgCart);
  }
}

export {
  addProduct,
  productAll,
  productToys,
  productClothes,
  productElectronics,
  productFurnitures,
  renderProducts,
};
