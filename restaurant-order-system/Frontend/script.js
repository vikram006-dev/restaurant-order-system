  // Extract table number from URL
  const urlParams = new URLSearchParams(window.location.search);
  const tableNumber = urlParams.get('table') || "Unknown";
  document.getElementById("table-number").textContent = tableNumber;

  const menuData = {
      starters: [
          { name: "Spring Rolls", price: 5 },
          { name: "Garlic Bread", price: 3 },
      ],
      "main-course": [
          { name: "Grilled Chicken", price: 12 },
          { name: "Veggie Burger", price: 8 },
      ],
      desserts: [
          { name: "Ice Cream", price: 4 },
          { name: "Brownie", price: 5 },
      ],
      beverages: [
          { name: "Coffee", price: 3 },
          { name: "Lemonade", price: 2 },
          { name: "Mojitos", price: 2 },
      ],
  };

  const navbar = document.getElementById("navbar");
  const menuItemsContainer = document.getElementById("menu-items");
  const submitButton = document.getElementById("submit-button");
  const orderSummary = document.getElementById("order-summary");
  const summaryList = document.getElementById("summary-list");
  const totalAmountEl = document.getElementById("total-amount");
  const finalSubmit = document.getElementById("final-submit");

  let cart = [];

  function displayMenuItems(category) {
      menuItemsContainer.innerHTML = "";
      menuData[category].forEach((item) => {
          const menuItem = document.createElement("div");
          menuItem.classList.add("menu-item");

          menuItem.innerHTML = `
              <span>${item.name} - ${item.price} Rs</span>
              <button class="add-button">+</button>
          `;

          const addButton = menuItem.querySelector(".add-button");
          addButton.addEventListener("click", () => addToCart(item));

          menuItemsContainer.appendChild(menuItem);
      });
  }

  function addToCart(item) {
      cart.push(item);
  }

  function updateOrderSummary() {
      summaryList.innerHTML = "";
      let total = 0;

      cart.forEach((item) => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `<span>${item.name}</span><span>${item.price} Rs</span>`;
          summaryList.appendChild(listItem);
          total += item.price;
      });

      totalAmountEl.textContent = total;
  }

  submitButton.addEventListener("click", () => {
      updateOrderSummary();
      orderSummary.style.display = "block";
      submitButton.classList.add("hidden");
  });

  finalSubmit.addEventListener("click", () => {
      const orderDetails = {
          tableNumber,
          items: cart,
          total: totalAmountEl.textContent
      };

      console.log("Sending Order:", orderDetails);

      fetch('/submit-order', {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderDetails),
      });

      alert("Order submitted successfully for Table " + tableNumber + "!");
      cart = [];
      orderSummary.style.display = "none";
      submitButton.classList.remove("hidden");
  });

  navbar.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
          const category = e.target.getAttribute("data-category");
          displayMenuItems(category);
      }
  });

  fetch('https://restaurant-order-system-cpw1.onrender.com', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
  })