import { menuArray } from "./data.js";

const bottomSection = document.getElementById("bottom-section");
let order = [];
let canOrder = true;

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
  const target = e.target;

  // Add item to order
  if (target.dataset.add && canOrder) {
    addItemToOrder(Number(target.dataset.add));
    renderOrder();
  }

  // Remove item from order
  if (target.dataset.remove && canOrder) {
    removeItemFromOrder(Number(target.dataset.remove));
    renderOrder();
  }

  // Handle complete order button click
  if (target.id === "complete-order-btn") {
    canOrder = false;
    openPaymentModal();
  }
});

// Listen for payment form submit
let paymentForm = document.getElementById("payment-form");

document.getElementById("payment-form").addEventListener("submit", (e) => {
  e.preventDefault();

  // Hide modal
  document.querySelector(".payment-modal").style.display = "none";

  // Render confirmation message with name from form data
  bottomSection.innerHTML = `<div class="confirmation-message"><p>Thanks, ${new FormData(
    paymentForm
  ).get("name")}.<br />Your order is on its way!</p></div>`;
});

// Functions for adding/removing
const addItemToOrder = (id) => {
  order.push(menuArray.filter((item) => item.id === id)[0]);
};

const removeItemFromOrder = (id) => {
  order.splice(order.indexOf(order.filter((item) => item.id === id)[0]), 1);
};

// Function to render the order display HTML
const renderOrder = () => {
  // Only render order display if there's an item in the order
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

// Function to open payment modal
const openPaymentModal = () => {
  document.querySelector(".payment-modal").style.display = "flex";
};
