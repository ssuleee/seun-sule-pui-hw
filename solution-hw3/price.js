const originalPrice = 2.49;

const glazeChoice = [
  {
    description: "Keep original",
    price: 0.0,
  },
  {
    description: "Sugar milk",
    price: 0.0,
  },
  {
    description: "Vanilla milk",
    price: 0.5,
  },
  {
    description: "Double chocolate",
    price: 1.5,
  },
];

const packingSize = [
  {
    size: "1",
    increase: 1,
  },
  {
    size: "3",
    increase: 3,
  },
  {
    size: "6",
    increase: 5,
  },
  {
    size: "12",
    increase: 10,
  },
];

// Showing glaze pirce choices
function showGlazeChoices() {
  const glazeSelect = document.getElementById("glazing");

  glazeSelect.innerHTML = "";

  for (let i = 0; i < glazeChoice.length; i++) {
    glazeSelect.innerHTML += `<option value="${glazeChoice[i].price}">${glazeChoice[i].description}</option>`;
  }
}

function showPackingSizes() {
  const packingSelect = document.getElementById("pack-size");

  packingSelect.innerHTML = "";

  for (let i = 0; i < packingSize.length; i++) {
    packingSelect.innerHTML += `<option value="${packingSize[i].increase}">${packingSize[i].size}</option>`;
  }
}

function updatePrice() {
  let selectedGlazePrice = 0;
  let selectedPackIncrease = 1;

  const glazeSelect = document.getElementById("glazing");
  const selectedGlazeValue = glazeSelect.value;

  for (let i = 0; i < glazeChoice.length; i++) {
    if (selectedGlazeValue == glazeChoice[i].price) {
      selectedGlazePrice = glazeChoice[i].price;
      break;
    }
  }

  const packingSelect = document.getElementById("pack-size");
  const selectedPackValue = packingSelect.value;

  for (let i = 0; i < packingSize.length; i++) {
    if (selectedPackValue == packingSize[i].increase) {
      selectedPackIncrease = packingSize[i].increase;
      break;
    }
  }

  const finalPrice =
    (originalPrice + selectedGlazePrice) * selectedPackIncrease;

  document.querySelector(
    ".add-box-together p"
  ).innerText = `$${finalPrice.toFixed(2)}`;
}

document.getElementById("glazing").addEventListener("change", updatePrice);
document.getElementById("pack-size").addEventListener("change", updatePrice);

// learned window onload from Professor Françeska Xhakaj
window.onload = function () {
  showGlazeChoices();
  showPackingSizes();
  updatePrice();
};
