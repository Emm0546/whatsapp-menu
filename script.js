const foodCheckboxes = document.querySelectorAll(".food-checkbox");

const totalPrice = document.querySelector("#total-price");
const itemCount = document.querySelector("#item-count");
const orderButton = document.querySelector("#order-button");

const languageButtons = document.querySelectorAll(".lang-button");

const whatsappNumber = "2250546918383";

let currentLanguage = "fr";

const translations = {
  en: {
    welcome: "WELCOME TO",
    description: "Authentic Ivorian food, made with love.",
    open: "● Open for orders",
    menu: "OUR MENU",
    choose: "Choose your meal",
    count: "03 ITEMS",
    chicken: "Chicken Attiéké",
    chickenDesc: "Grilled chicken served with fresh attiéké.",
    garba: "Garba Special",
    garbaDesc: "Fresh attiéké with tuna and spicy onions.",
    fish: "Grilled Fish",
    fishDesc: "Fresh grilled fish with alloco.",
    selected: "Selected items",
    total: "Total",
    order: "Order via WhatsApp",
    note: "Your order will be sent directly to our WhatsApp.",
    message: "Hello Chez Maman! I would like to place an order:",
    totalMessage: "Total:",
  },

  fr: {
    welcome: "BIENVENUE CHEZ",
    description: "Une cuisine ivoirienne authentique, préparée avec amour.",
    open: "● Commandes ouvertes",
    menu: "NOTRE MENU",
    choose: "Choisissez votre repas",
    count: "03 ARTICLES",
    chicken: "Attiéké au poulet",
    chickenDesc: "Poulet braisé accompagné d'attiéké frais.",
    garba: "Garba spécial",
    garbaDesc: "Attiéké frais accompagné de thon et d'oignons pimentés.",
    fish: "Poisson braisé",
    fishDesc: "Poisson frais braisé accompagné d'alloco.",
    selected: "Articles sélectionnés",
    total: "Total",
    order: "Commander sur WhatsApp",
    note: "Votre commande sera directement envoyée sur notre WhatsApp.",
    message: "Bonjour Chez Maman ! Je souhaite passer une commande :",
    totalMessage: "Total :",
  },
};

function changeLanguage(language) {
  currentLanguage = language;

  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach(function (element) {
    const key = element.dataset.i18n;
    element.textContent = translations[language][key];
  });

  languageButtons.forEach(function (button) {
    button.classList.toggle("active", button.dataset.lang === language);
  });

  updateOrder();
}

function updateOrder() {
  let total = 0;
  let selectedItems = [];

  foodCheckboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      const price = Number(checkbox.value);

      const name =
        currentLanguage === "fr"
          ? checkbox.dataset.nameFr
          : checkbox.dataset.name;

      total += price;

      selectedItems.push({
        name: name,
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

languageButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    changeLanguage(button.dataset.lang);
  });
});

orderButton.addEventListener("click", function () {
  const order = updateOrder();

  let message = translations[currentLanguage].message + "\n\n";

  order.items.forEach(function (item) {
    message +=
      "- " + item.name + " : " + item.price.toLocaleString("fr-FR") + " FCFA\n";
  });

  message +=
    "\n" +
    translations[currentLanguage].totalMessage +
    " " +
    order.total.toLocaleString("fr-FR") +
    " FCFA";

  const encodedMessage = encodeURIComponent(message);

  const whatsappURL =
    "https://wa.me/" + whatsappNumber + "?text=" + encodedMessage;

  window.open(whatsappURL, "_blank");
});

updateOrder();
changeLanguage("fr");
