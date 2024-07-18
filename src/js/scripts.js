const bodyDocument = document.querySelector("body");
const cartModal = document.getElementById("cart-modal");
const openCartModalButton = document.getElementById("open-cart-modal-button");
const closeCartModalButton = document.getElementById("close-cart-modal-button");
const cartProductsList = document.getElementById("cart-products-list");
const cartCounter = document.getElementById("cart-counter");
const cartTotal = document.getElementById("cart-modal-total");
const cartModalAddress = document.getElementById("cart-modal-address");
const cartModalAddressWarn = document.getElementById("cart-modal-address-warn");
const cartCheckoutButton = document.getElementById("cart-checkout-button");
const cartModalEmptyWarn = document.getElementById("cart-modal-empty-warn");

let cart = [];

openCartModalButton.addEventListener("click", () => {
  cartModal.style.display = "flex";
  bodyDocument.style.overflow = "hidden";
});

closeCartModalButton.addEventListener("click", () => {
  cartModal.style.display = "none";
  bodyDocument.style.overflow = "unset";
});

cartModal.addEventListener("click", (event) => {
  if (event.target === cartModal) {
    cartModal.style.display = "none";
    bodyDocument.style.overflow = "unset";
  }
});

const menu = document.getElementById("menu");

menu.addEventListener("click", (event) => {
  const parentButton = event.target.closest(".add-to-cart-btn");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");
    const price = parentButton.getAttribute("data-price");
    const image = parentButton.getAttribute("data-image");

    addToCart(name, price, image);
  }
});

const addToCart = (name, price, image) => {
  const existingItem = cart.find((item) => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name, price, image, quantity: 1 });
  }

  Toastify({
    text: "Item adicionado!",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#54CC0A",
    },
  }).showToast();

  updateCartModal();
  cartProductsList.style.display = "flex";
  cartModalEmptyWarn.style.display = "none";
};

const updateCartModal = () => {
  cartProductsList.innerHTML = "";
  let total = 0;

  cart.forEach((item) => {
    const cartProduct = document.createElement("div");
    cartProduct.classList.add("flex", "items-center");

    cartProduct.innerHTML = `
      <div class="flex flex-1 gap-4">
        <img
          class="size-12 rounded"
          src="${item.image}"
          alt="${item.name}"
        />
        <div class="flex flex-col">
          <span class="text-lg font-bold">${item.name}</span>
          <span class="text-sm">${item.quantity}x R$ ${item.price}</span>
        </div>
      </div>
      <button
        type="button"
        class="size-8 duration-300 hover:text-red-500 remove-from-cart-button"
        aria-label="remover"
        data-name="${item.name}"
      >
        <i class="fa-solid fa-trash"></i>
      </button>
      `;

    total += parseFloat(item.price) * item.quantity;

    cartProductsList.appendChild(cartProduct);
  });

  if (cart.length === 0) {
    cartModalEmptyWarn.style.display = "flex";
    cartProductsList.style.display = "none";
  }

  cartTotal.textContent = formatToCurrency(total);
  cartCounter.innerHTML = cart.length;
};

cartProductsList.addEventListener("click", (event) => {
  const parentButton = event.target.closest(".remove-from-cart-button");

  if (parentButton) {
    const name = parentButton.getAttribute("data-name");

    removeItemCart(name);
  }
});

const removeItemCart = (name) => {
  const index = cart.findIndex((item) => item.name === name);

  if (index !== -1) {
    const item = cart[index];

    if (item.quantity > 1) {
      item.quantity -= 1;
      updateCartModal();
      return;
    }

    cart.splice(index, 1);

    Toastify({
      text: "Item removido!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#FF3131",
      },
    }).showToast();

    updateCartModal();
  }
};

cartModalAddress.addEventListener("input", (event) => {
  let inputValue = event.target.value;

  if (inputValue !== "") {
    cartModalAddress.classList.remove("border-red-500");
    cartModalAddressWarn.classList.add("hidden");
  }
});

cartCheckoutButton.addEventListener("click", () => {
  const isOpen = isTheRestaurantOpen;

  if (!isOpen) {
    Toastify({
      text: "No momento estamos fechados.",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#FF3131",
      },
    }).showToast();

    return;
  }

  if (cart.length === 0) {
    Toastify({
      text: "Seu carrinho está vazio!",
      duration: 3000,
      close: true,
      gravity: "top",
      position: "right",
      stopOnFocus: true,
      style: {
        background: "#FF3131",
      },
    }).showToast();

    return;
  }

  if (cartModalAddress.value === "") {
    cartModalAddressWarn.classList.remove("hidden");
    cartModalAddress.classList.add("border-2", "border-red-500");
    return;
  }

  const products = cart
    .map((item) => `\n ${item.quantity}x ${item.name}`)
    .join("");

  let total = formatToCurrency(
    cart.reduce((total, item) => {
      return total + item.quantity * parseFloat(item.price);
    }, 0),
  );

  const phone = "86988641961";
  const message = `🍔 *NOVO PEDIDO!* \n${products} \n\n *Entregar em:* ${cartModalAddress.value} \n\n *Valor total:* ${formatToCurrency(total)}`;

  window.open(`https://wa.me/${phone}?text=${message}`, "_blank");

  Toastify({
    text: "Pedido enviado!",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    style: {
      background: "#54CC0A",
    },
  }).showToast();

  cart = [];
  updateCartModal();
  cartModalAddress.value = "";
});

const storeStatus = document.getElementById("store-status");

const verifyStoreStatus = () => {
  const date = new Date();
  const hour = date.getHours();

  return true;
};

const isTheRestaurantOpen = verifyStoreStatus();

if (isTheRestaurantOpen) {
  storeStatus.classList.add("bg-green-500");
  storeStatus.classList.remove("bg-red-500");
  storeStatus.title = "Estamos abertos";
} else {
  storeStatus.classList.add("bg-red-500");
  storeStatus.classList.remove("bg-green-500");
  storeStatus.title = "Estamos fechados";
}

const formatToCurrency = (value) => {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
};
