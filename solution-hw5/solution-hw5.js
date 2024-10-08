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

let cartBotton = [];
let originalPrice = 0;

function refreshPd() {
  const rollData = rolls[rollType];

  if (rollData) {
    const rollImage = document.querySelector(
      ".orginal-bunbun-product-details-img"
    );
    rollImage.src = rollData.imageFile;

    const priceElement = document.querySelector(".add-box-together p");
    originalPrice = rollData.basePrice;
    priceElement.textContent = `$${originalPrice.toFixed(2)}`;

    const bunText = document.querySelector(
      ".original-sentence-right-under-cart-text p"
    );
    bunText.textContent = `${rollType} cinnamon roll`;
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

  const priceElement = document.querySelector(".add-box-together p");
  priceElement.textContent = `$${finalPrice.toFixed(2)}`;
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

  cartBotton.push(newRoll);

  console.log(cartBotton);
}

document.addEventListener("DOMContentLoaded", refreshPd);

const rollSet = new Set();

let totalCheckOutPrice = 0;

function addNewRoll(rollType, rollGlazing, packSize, basePrice) {
  const bunbun = new Roll(rollType, rollGlazing, packSize, basePrice);
  totalCheckOutPrice += bunbun.basePrice;
  console.log(totalCheckOutPrice);

  rollSet.add(bunbun);

  return bunbun;
}

function createElement(bunbun) {
  const template = document.querySelector("#cart-template");
  const clone = template.content.cloneNode(true);

  bunbun.element = clone.querySelector(".shop-cart-everything");

  const btnDelete = bunbun.element.querySelector(".remove-text-under-picture");
  console.log(btnDelete);
  btnDelete.addEventListener("click", () => {
    deleteRoll(bunbun);
  });

  const rollListElement = document.querySelector(".cart-page-all-together");
  rollListElement.prepend(bunbun.element);

  updateElement(bunbun);
}

function updateElement(bunbun) {
  const rollImageElement = bunbun.element.querySelector(
    ".orginal-product-gallery-img"
  );
  const rollTypeElement = bunbun.element.querySelector(".product-name");
  const rollGlazeElement = bunbun.element.querySelector(".glazing-original");
  const rollPackElement = bunbun.element.querySelector(".pack-size-original");
  const rollPriceElement = bunbun.element.querySelector(".price-number");
  const totalPriceElement = document.querySelector(".final-cart-price");

  rollImageElement.src =
    "../assets/products/" + bunbun.type.toLowerCase() + "-cinnamon-roll.jpg";
  rollTypeElement.innerText = bunbun.type + " Cinnamon Roll";
  rollGlazeElement.innerText = bunbun.glazing;
  rollPackElement.innerText = "Pack Size: " + bunbun.size;
  rollPriceElement.innerText = "$" + bunbun.basePrice.toFixed(2);
  totalPriceElement.innerText = "$" + totalCheckOutPrice.toFixed(2);
}

const originalRoll = addNewRoll("Original", "Sugar Milk", 1, 2.49);
const walnutRoll = addNewRoll("Walnut", "Vanilla Milk", 12, 39.9);
const raisinRoll = addNewRoll("Raisin", "Sugar Milk", 3, 8.97);
const appleRoll = addNewRoll("Apple", "Original", 3, 10.47);

for (const bunbun of rollSet) {
  console.log(bunbun);
  createElement(bunbun);
}

function deleteRoll(bunbun) {
  bunbun.element.remove();

  rollSet.delete(bunbun);

  totalCheckOutPrice -= bunbun.basePrice;
  console.log(totalCheckOutPrice);

  const totalPriceElement = document.querySelector(".final-cart-price");
  totalPriceElement.innerText = "$" + totalCheckOutPrice.toFixed(2);
}
