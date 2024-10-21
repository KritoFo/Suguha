const btnCar = document.querySelector('.container-car');
const containerCarPrd = document.querySelector('.container-car-prd');

//Toggle carrito de compras
btnCar.addEventListener('click', () => {
    containerCarPrd.classList.toggle('hidden-car');
});

//Agregar productos al carrito
document.querySelectorAll(".add-to-car").forEach(button => {
    button.addEventListener("click", function(event) {
        const targetButton = event.target.closest("button.add-to-car");
        if (!targetButton) return;

        const productId = targetButton.getAttribute("data-id");
        const productNombre = targetButton.getAttribute("data-nombre");
        const productPrecio = targetButton.getAttribute("data-precio");
        const productImg = targetButton.getAttribute("data-img");
        const productValor = targetButton.getAttribute("data-valor");

        const product = {
            img: productImg,
            id: productId,
            nombre: productNombre,
            precio: productPrecio,
            valor: productValor,
            cantidad: 1
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingProduct = cart.find(item => item.id === productId);

        if (existingProduct) {
            existingProduct.cantidad += 1;
        } else {
            cart.push(product);
        };
    
        localStorage.setItem("cart", JSON.stringify(cart));

        updateCartCount();

        renderCart();
    
        alert(`${productNombre} ha sido agregado al carrito`);
    });
});

//Actualizar contador carrito
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((total,product) => total + product.cantidad, 0);
    document.getElementById("contador-prd").textContent = totalItems;
};
updateCartCount();

//Vaciar carrito
document.getElementById("vaciar-carrito").addEventListener("click", function () {
    localStorage.removeItem("cart");
    updateCartCount();
    renderCart();
    renderTotal();
    alert("El carrito ha sido vaciado.");
});

//Funciones carrito
function renderCart() {
    const cartContainer = document.getElementById("cart-items");
    const emptyMessage = document.getElementById("empty-message");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartContainer.innerHTML = '';

//Mensaje si esta vacio
    if (cart.length === 0) {
        emptyMessage.style.display = "block";
        return;
    } else {
        emptyMessage.style.display = "none";
    };

//Insertar productos
    cart.forEach((product, index) => {
        const productHTML = `
        <div class="cart-item">
            <img src="img/${product.img}" alt="${product.nombre}" class="cart-item-img">
            <div class="cart-item-info">
                <h3>${product.nombre}</h3>
                <p>Precio: $${product.precio}</p>
                <div class="cart-item-controls">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <span class="quantity">${product.cantidad}</span>
                    <button class="increase-quantity" data-index="${index}">+</button>
                </div>
            </div>
        </div>
        `;

        cartContainer.insertAdjacentHTML("beforeend", productHTML);
    });

    renderTotal();

//Boton sumar
    document.querySelectorAll(".increase-quantity").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            increaseQuantity(index);
        });
    });

//Boton restar
    document.querySelectorAll(".decrease-quantity").forEach(button => {
        button.addEventListener("click", function() {
            const index = this.getAttribute("data-index");
            decreaseQuantity(index);
        });
    });
};

//Sumar cantidades carrito
function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].cantidad += 1;

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
};

//Restar catidades carrito
function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].cantidad > 1) {
        cart[index].cantidad -= 1;
    } else {
        cart.splice(index, 1);
    };

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart();
};

//Convertir precio de texto a numero
function priceTextToNumber(priceText) {
    return parseFloat(priceText.replace(/[^0-9.-]+/g, ""));
};

//Funcion precio total carrito
function calculateTotal() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, product) => sum + product.valor * product.cantidad, 0);
    return total.toLocaleString("es-Co", { minimumFractionDigits: 2, maximumFractionDigits: 2});
};

//Mostrar el total
function renderTotal() {
    const total = calculateTotal();
    const totalContainer = document.getElementById("cart-total");
    totalContainer.textContent = `Total: $${total}`;
};

document.addEventListener("DOMContentLoaded", renderCart);