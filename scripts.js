const coupons = {
  Crook: { name: "Crook", discountPercentage: 50 },
  SAVE20: { name: "SAVE20", discountPercentage: 20 },
};

document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  navToggle.addEventListener("click", function () {
    navMenu.classList.toggle("show");
  });
});

function showContactPopup() {
  document.getElementById("contact-popup").style.display = "flex";
  document.getElementById("overlay").style.display = "block";
}

function hideContactPopup() {
  document.getElementById("contact-popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}

function applyCoupon() {
  const couponCode = document.getElementById("coupon-code").value.trim();

  if (coupons[couponCode]) {
    const { name, discountPercentage } = coupons[couponCode];
    const nonDiscountedOffers = document.querySelectorAll(
      ".nondiscounted-offer"
    );

    nonDiscountedOffers.forEach((offer) => {
      const cardContainer = offer.closest(".card-container");
      const cardHeadContent = offer.querySelector(".card__head-content");
      const originalPriceElement = cardHeadContent.querySelector(
        ".upper-cent-price__body"
      );
      const originalPriceText = originalPriceElement.innerText;
      const [priceEGP, priceUSD] = originalPriceText
        .split("/")
        .map((price) => price.trim());

      const newPriceEGP = parseFloat(priceEGP) * (1 - discountPercentage / 100);
      const newPriceUSD =
        parseFloat(priceUSD.replace("$", "")) * (1 - discountPercentage / 100);

      // Create discount wrapper
      const discountWrapper = document.createElement("div");
      discountWrapper.classList.add("discount-wrapper");

      // Create discount badge
      const discountBadge = document.createElement("div");
      discountBadge.classList.add("discount-badge");
      discountBadge.innerText = `${discountPercentage}%`;

      // Update offer class and data attribute
      offer.classList.remove("nondiscounted-offer");
      offer.classList.add("discounted-offer");
      offer.setAttribute("data-discount", discountPercentage);

      // Update prices
      const upperCentPriceBody = cardHeadContent.querySelector(
        ".upper-cent-price__body"
      );
      upperCentPriceBody.innerHTML = `
              <span class="old-price">${priceEGP}</span>
              <span class="discounted-price">${newPriceEGP.toFixed(
                2
              )} جنية / ${newPriceUSD.toFixed(2)}$</span>
          `;

      // Wrap card container with discount wrapper
      cardContainer.parentNode.insertBefore(discountWrapper, cardContainer);
      discountWrapper.appendChild(discountBadge);
      discountWrapper.appendChild(cardContainer);
    });

    hideCouponPopup();
  } else {
    alert("Invalid coupon code.");
  }
}

function showCouponPopup() {
  document.getElementById("coupon-popup").style.display = "flex";
  document.getElementById("overlay").style.display = "block";
}

function hideCouponPopup() {
  document.getElementById("coupon-popup").style.display = "none";
  document.getElementById("overlay").style.display = "none";
}
