const foodCheckboxes = document.querySelectorAll(".food-checkbox");

const totalPrice = document.querySelector("#total-price");
const itemCount = document.querySelector("#item-count");

const orderButton = document.querySelector("#order-button");

const whatsappNumber = "2250546918383";

function updateOrder() {
  let total = 0;
  let selectedItems = [];

  foodCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      const price = Number(checkbox.value);

      total += price;

      selectedItems.push({
        name: checkbox.dataset.name,
        price: price,
      });
    }
  });

  totalPrice.textContent = total.toLocaleString("fr-FR") + " FCFA";

  itemCount.textContent = selectedItems.length;

  orderButton.disabled = selectedItems.length === 0;

  return {
    total: total,
    items: selectedItems,
  };
}

foodCheckboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", updateOrder);
});

orderButton.addEventListener("click", function () {
  // Get the current order
  const order = updateOrder();

  let message = "Hello Chez Maman! I would like to place an order:\n\n";

  order.items.forEach(function (item) {
    message +=
      "- " + item.name + " : " + item.price.toLocaleString("fr-FR") + " FCFA\n";
  });

  message += "\nTotal: " + order.total.toLocaleString("fr-FR") + " FCFA";

  const encodedMessage = encodeURIComponent(message);

  const whatsappURL =
    "https://wa.me/" + whatsappNumber + "?text=" + encodedMessage;

  window.open(whatsappURL, "_blank");
});

updateOrder();
