const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const rollType = params.get("roll");

let cart = [];
let originalPrice = 0;

// Function to populate the page with the roll information
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
    glazeDropdown.appendChild(option);
  });

  packingSize.forEach((pack) => {
    const option = document.createElement("option");
    option.value = pack.increase;
    option.textContent = pack.size;
    packDropdown.appendChild(option);
  });

  console.log("Glaze options:", glazeDropdown.innerHTML);
  console.log("Pack options:", packDropdown.innerHTML);

  glazeDropdown.addEventListener("change", updatePrice);
  packDropdown.addEventListener("change", updatePrice);
}

function updatePrice() {
  const glazeDropdown = document.getElementById("glazing");
  const packDropdown = document.getElementById("pack-size");

  const selectedGlazePrice = parseFloat(glazeDropdown.value);
  const selectedPackIncrease = parseInt(packDropdown.value);

  console.log("Selected glaze price:", selectedGlazePrice);
  console.log("Selected pack increase:", selectedPackIncrease);

  const finalPrice =
    (originalPrice + selectedGlazePrice) * selectedPackIncrease;

  const priceElement = document.querySelector(".add-box-together p");
  priceElement.textContent = `$${finalPrice.toFixed(2)}`;
}

document.addEventListener("DOMContentLoaded", refreshPd);
