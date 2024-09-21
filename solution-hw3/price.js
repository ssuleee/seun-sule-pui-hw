const originalPrice = 2.49;

const glazeChoice = [
    {
        description: 'Keep original',
        price: 0.00,
    },
    {
        description: 'Sugar milk',
        price: 0.00,
    },
    {
        description: 'Vanilla milk',
        price: 0.50,
    },
    {
        description: 'Double chocolate',
        price: 1.50,
    },
];

const packingSize = [
    {
        size: '1',
        increase: 1,
    },
    {
        size: '3',
        increase: 3,
    },
    {
        size: '6',
        increase: 5,
    },
    {
        size: '12',
        increase: 10,
    },
];

// Function to show glaze choices
function showGlazeChoices() {
    const glazeSelect = document.getElementById('glazing');

    // Clear existing options
    glazeSelect.innerHTML = '';

    // Add new options using a for loop
    for (let i = 0; i < glazeChoice.length; i++) {
        glazeSelect.innerHTML += `<option value="${glazeChoice[i].price}">${glazeChoice[i].description}</option>`;
    }
}

// Function to show packing size choices
function showPackingSizes() {
    const packingSelect = document.getElementById('pack-size');

    // Clear existing options
    packingSelect.innerHTML = '';

    // Add new options using a for loop
    for (let i = 0; i < packingSize.length; i++) {
        packingSelect.innerHTML += `<option value="${packingSize[i].increase}">${packingSize[i].size}</option>`;
    }
}

// Function to calculate and update the price
function updatePrice() {
    let selectedGlazePrice = 0;
    let selectedPackIncrease = 1;

    // Find selected glaze price
    const glazeSelect = document.getElementById('glazing');
    const selectedGlazeValue = glazeSelect.value;

    for (let i = 0; i < glazeChoice.length; i++) {
        if (selectedGlazeValue == glazeChoice[i].price) {
            selectedGlazePrice = glazeChoice[i].price;
            break; // Exit the loop once we find the match
        }
    }

    // Find selected pack increase
    const packingSelect = document.getElementById('pack-size');
    const selectedPackValue = packingSelect.value;

    for (let i = 0; i < packingSize.length; i++) {
        if (selectedPackValue == packingSize[i].increase) {
            selectedPackIncrease = packingSize[i].increase;
            break; // Exit the loop once we find the match
        }
    }

    // Calculate the final price
    const finalPrice = (originalPrice + selectedGlazePrice) * selectedPackIncrease;

    // Update the price display
    document.querySelector('.add-box-together p').innerText = `$${finalPrice.toFixed(2)}`;
}

// Event listeners to update price on selection change
document.getElementById('glazing').addEventListener('change', updatePrice);
document.getElementById('pack-size').addEventListener('change', updatePrice);

// Populate options on page load

// learned windowonload from Professor Françeska Xhakaj
window.onload = function() {
    showGlazeChoices();
    showPackingSizes();
    updatePrice(); // Initialize price on load
};



