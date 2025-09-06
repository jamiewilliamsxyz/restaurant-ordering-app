import { menuArray } from "./data.js";

let canOrder = true;
let order = [];

const bottomSection = document.getElementById("bottom-section");

// Render menu items
document.getElementById("menu").innerHTML = menuArray
  .map(
    (item) =>
      `
      <div class="menu-item">
        <div class="item-left-container">
          <span class="item-emoji">${item.emoji}</span>
          <div>
            <h3 class="item-name">${item.name}</h3>
            <p class="item-ingredients">${item.ingredients.join(", ")}</p>
            <p class="item-price">£${item.price}</p>
          </div>
        </div>

        <button data-add="${item.id}" class="item-btn">+</button>
      </div>
  `
  )
  .join("");

// Listen for button clicks
document.addEventListener("click", (e) => {
  // Remove item if the complete order button is clicked by passing the id into the function to remove an item
  if (e.target.dataset.remove) {
    let itemToRemoveId = Number(e.target.dataset.remove);

    switch (itemToRemoveId) {
      case 0:
        removeItemFromOrder(itemToRemoveId);
        break;
      case 1:
        removeItemFromOrder(itemToRemoveId);
        break;
      case 2:
        removeItemFromOrder(itemToRemoveId);
        break;
      default:
        break;
    }

    // Call render order function
    if (canOrder) {
      renderOrder();
    }
  }

  // Add item if the add item is clicked by passing the id into the function to add an item
  if (e.target.dataset.add) {
    let itemToAddId = Number(e.target.dataset.add);

    switch (itemToAddId) {
      case 0:
        addItemToOrder(itemToAddId);
        break;
      case 1:
        addItemToOrder(itemToAddId);
        break;
      case 2:
        addItemToOrder(itemToAddId);
        break;
      default:
        break;
    }

    // Call render order function
    if (canOrder) {
      renderOrder();
    }
  }
});

// Function to add item to order if it matches one in the menu
const addItemToOrder = (id) => {
  order.push(menuArray.filter((item) => item.id === id)[0]);
};

// Function to remove item from order
const removeItemFromOrder = (id) => {
  order.pop(menuArray.filter((item) => item.id === id)[0]);
};

// Function to render the order HTML
const renderOrder = () => {
  if (order.length > 0) {
    bottomSection.innerHTML = `
    <div class="order-display-container">
      <h3 class="order-heading">Your order</h3>
      <div>
        ${order
          .map(
            (item) => `
            <div class="order-item-container">
              <div class="left-order-item-container">
                <p class="order-item-name">${item.name}</p>
                <button data-remove="${item.id}" class="remove-item-btn">remove</button>
              </div>
              <p class="order-item-price">£${item.price}</p>
            </div>
          `
          )
          .join("")}
      </div>
      <hr>
      <div class="total-price-container">
        <p class="total-price-text">Total price:</p>
        <p class="total-price">£${order.reduce((acc, obj) => {
          return acc + obj.price;
        }, 0)}
        </p>
      </div>
      <button id="complete-order-btn" class="complete-order-btn">Complete order</button>
    <div/>
  `;
  } else {
    bottomSection.innerHTML = "";
  }
};
