// Cart
let cartProducts = [];  // Setting up cart array variable
let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');

cartIcon.onclick = () => {
    cart.classList.add('active');
}

closeCart.onclick = () => {
    cart.classList.remove('active');
}

// Cart Working JS
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}else {
    ready();
}

// Making Function
function ready() {
    // Place products in page
    for (var i=0; i<products.length; i++)
        addProduct(products[i]);

    // Remove items from cart
    var removeCartButtons = document.getElementsByClassName('cart-remove');
    
    for (var i=0; i<removeCartButtons.length; i++) {
        removeCartButtons[i].addEventListener('click', removeCartItem);
    }

    updateTotal();

    // Quantity Changes
    var quantityInputs = document.getElementsByClassName('cart-quantity');
    for (var i=0; i<quantityInputs.length; i++) {
        quantityInputs[i].addEventListener('change', quantityChanged);
    }

    // Add to cart
    var addCart = document.getElementsByClassName('add-cart');
    for (var i=0; i<addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }

    // Buy Button
    var buyButton = document.getElementsByClassName('btn-buy')[0];
    buyButton.addEventListener('click', buyButtonClicked);
}

// Add products
function addProduct(product) {
    var productBox = document.createElement('div');
    productBox.classList.add('product-box');
    var items = document.getElementsByClassName('shop-content')[0];

    // Adding the product
    var productContent = `<img src="img/${product.img}" alt="" class="product-img">
                        <h2 class="product-title">${product.name}</h2>
                        <span class="price">${product.price}$</span>
                        <i class="bx bx-shopping-bag add-cart" id="${product.id}"></i>`;

    productBox.innerHTML = productContent;
    items.append(productBox);
}

// Buy Button
function buyButtonClicked(event) {
    if (cartProducts.length === 0)
        alert('Your cart is empty!');
    else {
        alert('Your order is placed!');
        cleanCart();
        cartProducts = [];
        updateTotal();
    }
}

function cleanCart() {
    var cartContent = document.getElementsByClassName('cart-content')[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
}

// Remove items from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    const productId = buttonClicked.id;

    const product = cartProducts.findIndex(p => p.id == productId);
    cartProducts.splice(product, 1);

    console.log(product);

    buttonClicked.parentElement.remove();
    updateTotal();
}

// Quantity changes
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }

    const productId = input.id;
    cartProducts.forEach(cartProduct => {
        if (cartProduct.id == productId)
            cartProduct.quantity = input.value;
    });

    updateTotal();
}

function addCartClicked(event) {
    var button = event.target;
    const productId = button.id;
    let newProduct = null;

    products.forEach(product => {
        if (product.id == productId)
        newProduct = product;
    });

    if(newProduct != null && !productInCart(newProduct))
        addProductToCart(newProduct);

    cart.classList.add('active');
}

function productInCart(product) {
    var value = false
    cartProducts.forEach(cartProduct => {
        if (cartProduct.id === product.id)
            value = true;
    });

    return value;
}

function addProductToCart(product) {
    product.quantity = 1;
    cartProducts.push(product);

    updateCart();
}

// Update Cart
function updateCart() {
    cleanCart();
    var cartItems = document.getElementsByClassName('cart-content')[0];
    
    cartProducts.forEach(cartProduct =>{
        var cartShopBox = document.createElement('div');
        cartShopBox.classList.add('cart-box');

        // Adding the product
        var cartBoxContent = `<img src="img/${cartProduct.img}" alt="" class="cart-img">
                            <div class="detail-box">
                                <div class="cart-product-title">${cartProduct.name}</div>
                                <div class="cart-price">${cartProduct.price}</div>
                                <input type="number" name="" id="${cartProduct.id}" value="${cartProduct.quantity}" class="cart-quantity">
                            </div>
                            <!-- Remove Cart -->
                            <i class="bx bxs-trash-alt cart-remove" id="${cartProduct.id}"></i>`;

        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
        cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
    });

    updateTotal();
}

// Update Total
function updateTotal() {
    var total = 0;

    cartProducts.forEach(cartProduct => {
        total += cartProduct.price * cartProduct.quantity;
    });

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('total-price')[0].innerText = '$' + total;
}
