import {openProductDetailAside} from './productDetail.mjs'
const productToys = [];
const productClothes = [];
const productElectronics = [];
const productFurnitures = [];
const productOthers = [];
const productAll = [];
const addProduct = (product) => {
  if (product.category == "toys") {
    productToys.push({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
    productAll.push({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
  } else if (product.category == "clothes") {
    productClothes.push({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
    productAll.push({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
  } else if (product.category == "electronics") {
    productElectronics.push({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
    productAll.push({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
  } else if (product.category == "furnitures") {
    productFurnitures.push({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
    productAll.push({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
  } else if (product.category == "others") {
    productOthers.push({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
    productAll.push({
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      category: product.category,
    });
  }
};
const cardsContainer = document.querySelector(".cards-container");

function renderProducts(arr) {
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
    productPrice.setAttribute('id', 'productPrice')
    const productName = document.createElement("p");
    productName.setAttribute('id', 'productName')
    productInfoDiv.append(productPrice, productName);

    const priceText = document.createTextNode("$" + arr[i].price + ",00");
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
