import { menuArray } from "./data.js";

// Render menu items
document.getElementById("menu").innerHTML = menuArray
  .map((item) => {
    return `
    <div class="menu-item">
      <div class="item-left-container">
        <span class="item-emoji">${item.emoji}</span>
        <div >
          <h3 class="item-name">${item.name}</h3>
          <p class="item-ingredients">${item.ingredients.join(", ")}</p>
          <p class="item-price">£${item.price}</p>
        </div>
      </div>

      <button data-menu-item-id="${
        item.id
      }" id="addItemBtn" class="item-btn">+</button>
    </div>
    <hr />
  `;
  })
  .join("");
