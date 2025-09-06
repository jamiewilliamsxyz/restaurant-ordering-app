import { menuArray } from "./data.js";

let canOrder = true;
let order = [];

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

        <button data-menu-item-id="${
          item.id
        }" id="item-btn" class="item-btn">+</button>
      </div>
  `
  )
  .join("");

// Add item to order if it matches one in the menu
const addItemToOrder = (id) => {
  order.push(menuArray.filter((item) => item.id === id)[0]);
};

// Listen for button clicks to add an item to the order
document.addEventListener("click", (e) => {
  if (e.target.dataset.menuItemId) {
    let itemToAddId = Number(e.target.dataset.menuItemId);

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

// Render the order HTML
const renderOrder = () => {
  document.getElementById("bottom-section").innerHTML = `
    <div class="order-display-container">
      <h3 class="order-heading">Your order</h3>
      <div>
        ${order
          .map(
            (item) => `
            <div class="order-item-container">
              <div class="left-order-item-container">
                <p class="order-item-name">${item.name}</p>
                <button id="remove-item-btn" class="remove-item-btn">remove</button>
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
};
