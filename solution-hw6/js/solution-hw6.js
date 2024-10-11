class Roll {
  constructor(rollType, rollGlazing, packSize, basePrice) {
    this.type = rollType;
    this.glazing = rollGlazing;
    this.size = packSize;
    this.basePrice = basePrice;
  }
}

const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
let originalPrice = 0;

function refreshPd() {
  const rollData = rolls[rollType];

  if (rollData) {
    document.querySelector(".orginal-bunbun-product-details-img").src =
      rollData.imageFile;
    originalPrice = rollData.basePrice;
    document.querySelector(
      ".add-box-together p"
    ).textContent = `$${originalPrice.toFixed(2)}`;
    document.querySelector(
      ".original-sentence-right-under-cart-text p"
    ).textContent = `${rollType} cinnamon roll`;
    showDropdown();
  }
}

function showDropdown() {
  const glazeDropdown = document.getElementById("glazing");
  const packDropdown = document.getElementById("pack-size");

  glazeDropdown.innerHTML = "";
  packDropdown.innerHTML = "";

  glazeChoice.forEach((glaze) => {
    const option = document.createElement("option");
    option.value = glaze.price;
    option.textContent = glaze.description;
    option.dataset.price = glaze.price;
    glazeDropdown.appendChild(option);
  });

  packingSize.forEach((pack) => {
    const option = document.createElement("option");
    option.value = pack.increase;
    option.textContent = pack.size;
    option.dataset.increase = pack.increase;
    packDropdown.appendChild(option);
  });

  glazeDropdown.addEventListener("change", updatePrice);
  packDropdown.addEventListener("change", updatePrice);
}

function updatePrice() {
  const glazeDropdown = document.getElementById("glazing");
  const packDropdown = document.getElementById("pack-size");

  const selectedGlazePrice = Number(
    glazeDropdown.options[glazeDropdown.selectedIndex].dataset.price
  );
  const selectedPackIncrease = Number(
    packDropdown.options[packDropdown.selectedIndex].dataset.increase
  );

  const finalPrice =
    (originalPrice + selectedGlazePrice) * selectedPackIncrease;
  document.querySelector(
    ".add-box-together p"
  ).textContent = `$${finalPrice.toFixed(2)}`;
}

function addToCart() {
  const glazeDropdown = document.getElementById("glazing");
  const packDropdown = document.getElementById("pack-size");

  const selectedGlazeDescription =
    glazeDropdown.options[glazeDropdown.selectedIndex].text;
  const selectedPackSize =
    packDropdown.options[packDropdown.selectedIndex].text;
  const selectedGlazePrice = Number(
    glazeDropdown.options[glazeDropdown.selectedIndex].dataset.price
  );
  const selectedPackIncrease = Number(
    packDropdown.options[packDropdown.selectedIndex].dataset.increase
  );

  const finalPrice =
    (originalPrice + selectedGlazePrice) * selectedPackIncrease;

  const newRoll = new Roll(
    rollType,
    selectedGlazeDescription,
    selectedPackSize,
    finalPrice
  );
  cart.push(newRoll);
  localStorage.setItem("cart", JSON.stringify(cart));
  console.log("Cart updated:", cart);
}

function populateCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  console.log("Cart items:", cartItems);
  cartItems.forEach((item) => {
    createElement(item);
  });
  console.log("Updating total price");
  updateTotalPrice();
}

function createElement(bunbun) {
  const template = document.querySelector("#cart-template");
  const clone = template.content.cloneNode(true);
  bunbun.element = clone.querySelector(".shop-cart-everything");

  const btnDelete = bunbun.element.querySelector(".remove-text-under-picture");
  btnDelete.addEventListener("click", () => {
    deleteRoll(bunbun);
  });

  document.querySelector(".cart-page-all-together").prepend(bunbun.element);
  updateElement(bunbun);
}

function updateElement(bunbun) {
  bunbun.element.querySelector(
    ".orginal-product-gallery-img"
  ).src = `../assets/products/${bunbun.type.toLowerCase()}-cinnamon-roll.jpg`;
  bunbun.element.querySelector(
    ".product-name"
  ).innerText = `${bunbun.type} Cinnamon Roll`;
  bunbun.element.querySelector(".glazing-original").innerText = bunbun.glazing;
  bunbun.element.querySelector(
    ".pack-size-original"
  ).innerText = `Pack Size: ${bunbun.size}`;
  bunbun.element.querySelector(
    ".price-number"
  ).innerText = `$${bunbun.basePrice.toFixed(2)}`;
}

function deleteRoll(bunbun) {
  bunbun.element.remove();
  const index = cart.findIndex(
    (item) =>
      item.type === bunbun.type &&
      item.glazing === bunbun.glazing &&
      item.size === bunbun.size &&
      item.basePrice === bunbun.basePrice
  );
  if (index > -1) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
  }
  updateTotalPrice();
}

function updateTotalPrice() {
  let totalCheckOutPrice = 0;
  for (const item of cart) {
    totalCheckOutPrice += item.basePrice;
  }
  console.log("Total price calculated:", totalCheckOutPrice);
  const totalElement = document.querySelector(".final-cart-price");
  if (totalElement) {
    totalElement.innerText = `$${totalCheckOutPrice.toFixed(2)}`;
  } else {
    console.error("Total price element not found");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (rollType) {
    refreshPd();
    const addToCartButton = document.querySelector("#add-to-cart-button");
    if (addToCartButton) {
      addToCartButton.addEventListener("click", addToCart);
    }
  } else {
    populateCart();
  }
});
