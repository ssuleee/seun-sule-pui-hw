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

const addToCartButton = document.querySelector(".add-to-cart");
addToCartButton.addEventListener("click", addToCart);

document.addEventListener("DOMContentLoaded", refreshPd);
