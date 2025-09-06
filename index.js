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

const addItemToOrder = (id) => {
  order.push(menuArray.filter((item) => item.id === id)[0]);
};

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

    if (canOrder) {
      renderOrder();
    }
  }
});

const renderOrder = () => {
  document.getElementById("bottom-section").innerHTML = `
    <div>
      <h3>Your order</h3>
      <div>
        ${order
          .map(
            (item) => `
            <div>
              <div>
                <p class="item-name">${item.name}</p>
                <button id="remove-btn" class="remove-btn">remove</button>
              </div>
              <p class="item-price">${item.price}</p>
            </div>
          `
          )
          .join("")}
      </div>
      <hr>
      <div class="total-price-section">
        <p class="total-price-text">Total price:</p>
        <p class="price">£
          ${order.reduce((acc, obj) => {
            return acc + obj.price;
          }, 0)}
        </p>
      </div>
    <div/>
  `;
};
