const WATCH_HEADS = {
  negro: "assets/royal-pop-watch-head-ocho-negro_c069c6b9-81d6-488f-8a91-be7bf4a8f2ee.webp",
  blanc: "assets/royal-pop-watch-head-huit-blanc_cf5d83b4-e523-49ed-af3c-4ab626cc0e70.webp"
};

const PRODUCTS = [
  {
    id: "link-strap",
    category: "link",
    name: "Link Strap",
    price: 165,
    compareAt: 195,
    saveText: "Save $30",
    cardBg: "#ecebe7",
    defaultOrientation: "vertical",
    horizontalImage: "assets/royal-conversion-signature-metal-sport-strap-horizontal-crown-white.webp",
    swatches: [
      {
        name: "Obsidian Black",
        color: "#1a1a1c",
        image: "assets/royal-conversion-essentials-link-strap-vertical-crown-black.webp",
        watch: WATCH_HEADS.negro
      },
      {
        name: "Pastel Pink",
        color: "#e6b4be",
        image: "assets/royal-conversion-essentials-link-strap-vertical-crown-pink-pastel.webp",
        watch: WATCH_HEADS.blanc
      }
    ]
  },
  {
    id: "sport-strap",
    category: "sport",
    name: "Sport Strap",
    price: 89,
    compareAt: 119,
    saveText: "Save $30",
    cardBg: "#c6d1de",
    defaultOrientation: "vertical",
    horizontalImage: "assets/royal-conversion-base-sport-strap-horizontal-crown-ocean.webp",
    swatches: [
      {
        name: "Arctic White",
        color: "#ecebe6",
        image: "assets/royal-conversion-essentials-sport-strap-vertical-crown-white.webp",
        watch: WATCH_HEADS.blanc
      },
      {
        name: "Ocean Blue",
        color: "#1f4d7a",
        image: "assets/royal-conversion-base-sport-strap-horizontal-crown-ocean.webp",
        watch: WATCH_HEADS.blanc
      },
      {
        name: "Forest Green",
        color: "#1f5c3a",
        image: "assets/royal-conversion-essentials-sport-strap-vertical-crown-green.webp",
        watch: WATCH_HEADS.negro
      }
    ]
  },
  {
    id: "metal-sport",
    category: "metal",
    name: "Metal Sport Strap",
    price: 195,
    compareAt: 245,
    saveText: "Save $50",
    cardBg: "#ecebe7",
    defaultOrientation: "vertical",
    horizontalImage: "assets/royal-conversion-signature-metal-sport-strap-horizontal-crown-white.webp",
    swatches: [
      {
        name: "Obsidian Black",
        color: "#161618",
        image: "assets/royal-conversion-signature-metal-sport-strap-vertical-crown-black.webp",
        watch: WATCH_HEADS.negro
      },
      {
        name: "Alpine White",
        color: "#ecebe6",
        image: "assets/royal-conversion-signature-metal-sport-strap-horizontal-crown-white.webp",
        watch: WATCH_HEADS.blanc
      },
      {
        name: "Solar Yellow",
        color: "#e0ad1f",
        image: "assets/royal-conversion-signature-metal-sport-strap-horizontal-crown-yellow.webp",
        watch: WATCH_HEADS.negro
      }
    ]
  },
  {
    id: "royal-pop-sport",
    category: "sport",
    name: "Royal Pop Sport Strap",
    price: 79,
    compareAt: 119,
    saveText: "Save $40",
    cardBg: "#def4e5",
    defaultOrientation: "vertical",
    horizontalImage: "assets/royal-conversion-signature-metal-sport-strap-horizontal-crown-yellow.webp",
    swatches: [
      {
        name: "Emerald Green",
        color: "#189448",
        image: "assets/royal-conversion-essentials-sport-strap-vertical-crown-green.webp",
        watch: WATCH_HEADS.negro
      },
      {
        name: "Arctic White",
        color: "#ecebe6",
        image: "assets/royal-conversion-essentials-sport-strap-vertical-crown-white.webp",
        watch: WATCH_HEADS.blanc
      },
      {
        name: "Ocean Blue",
        color: "#1f4d7a",
        image: "assets/royal-conversion-base-sport-strap-horizontal-crown-ocean.webp",
        watch: WATCH_HEADS.negro
      }
    ]
  }
];

const state = {
  filter: "all",
  selectedSwatches: Object.fromEntries(PRODUCTS.map((p) => [p.id, 0])),
  orientations: Object.fromEntries(PRODUCTS.map((p) => [p.id, p.defaultOrientation])),
  cart: []
};

const productGrid = document.getElementById("productGrid");
const cartCountEl = document.getElementById("cartCount");
const cartItemsEl = document.getElementById("cartItems");
const cartSubtotalEl = document.getElementById("cartSubtotal");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const toastEl = document.getElementById("toast");

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toastEl.classList.remove("show"), 2600);
}

function renderProducts() {
  const visible = state.filter === "all"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === state.filter);

  productGrid.innerHTML = visible.map((product) => {
    const activeIdx = state.selectedSwatches[product.id] || 0;
    const activeSwatch = product.swatches[activeIdx];
    const orientation = state.orientations[product.id] || "vertical";
    const displayImage = orientation === "horizontal" ? product.horizontalImage : activeSwatch.image;

    return `
      <article class="product-card" data-id="${product.id}">
        <div class="product-media" style="background:${product.cardBg}">
          <div class="orientation-toggle" role="group" aria-label="Crown orientation">
            <button type="button" class="orientation-btn ${orientation === "horizontal" ? "active" : ""}" data-orient="horizontal" data-product="${product.id}">Horizontal</button>
            <button type="button" class="orientation-btn ${orientation === "vertical" ? "active" : ""}" data-orient="vertical" data-product="${product.id}">Vertical</button>
          </div>
          <span class="rcs-stage" style="--rcs-zoom: 1.06; --st-s: 1; --ov-t: translate(0%, 0%) scale(1.04); --ov-f: none;">
            <img class="rcs-img" src="${displayImage}" alt="${product.name} in ${activeSwatch.name}" draggable="false" />
            <img class="rcs-watch" src="${activeSwatch.watch}" alt="" draggable="false" />
          </span>
          <span class="save-badge">${product.saveText}</span>
        </div>
        <div class="product-body">
          <h3 class="product-name">${product.name}</h3>
          <div class="product-price-row">
            <span class="product-compare-price">$${product.compareAt}.00</span>
            <span class="product-price">$${product.price}.00</span>
          </div>
          <div class="product-meta-row">
            <span class="product-finish">${activeSwatch.name}</span>
            <div class="swatches" aria-label="Select finish">
              ${product.swatches.map((s, idx) => `
                <button
                  type="button"
                  class="swatch ${idx === activeIdx ? "active" : ""}"
                  style="background:${s.color}"
                  title="${s.name}"
                  data-product="${product.id}"
                  data-swatch="${idx}"
                ></button>
              `).join("")}
            </div>
          </div>
          <div class="product-add">
            <button type="button" class="btn btn-dark" data-add="${product.id}">Add to Bag</button>
          </div>
        </div>
      </article>
    `;
  }).join("");
}

function addToCart(item) {
  const existing = state.cart.find((c) => c.key === item.key);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...item, qty: 1 });
  }
  renderCart();
  openCart();
  showToast(`${item.name} added to bag`);
}

function renderCart() {
  const totalQty = state.cart.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  cartCountEl.textContent = totalQty;
  cartSubtotalEl.textContent = `$${subtotal}`;

  if (state.cart.length === 0) {
    cartItemsEl.innerHTML = `<p style="color:var(--text-light-muted);font-size:0.9rem;">Your bag is empty. Explore our conversion straps or bundle offers to begin.</p>`;
    return;
  }

  cartItemsEl.innerHTML = state.cart.map((item, idx) => `
    <div class="cart-item">
      <div class="cart-item-meta">
        <h5>${item.name}</h5>
        <p>${item.variant} &middot; $${item.price}</p>
      </div>
      <div class="qty-ctrl">
        <button type="button" data-qty-delta="-1" data-idx="${idx}" aria-label="Decrease quantity">&minus;</button>
        <span>${item.qty}</span>
        <button type="button" data-qty-delta="1" data-idx="${idx}" aria-label="Increase quantity">+</button>
      </div>
    </div>
  `).join("");
}

function openCart() {
  cartDrawer.classList.add("open");
  cartBackdrop.classList.add("open");
}

function closeCart() {
  cartDrawer.classList.remove("open");
  cartBackdrop.classList.remove("open");
}

// Category filters
document.querySelectorAll(".filter-pill").forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filter-pill").forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    state.filter = btn.dataset.filter;
    renderProducts();
  });
});

// Product grid delegation (orientation + swatches + add to bag)
productGrid.addEventListener("click", (e) => {
  const orientBtn = e.target.closest("[data-orient]");
  if (orientBtn) {
    state.orientations[orientBtn.dataset.product] = orientBtn.dataset.orient;
    renderProducts();
    return;
  }
  const swatchBtn = e.target.closest("[data-swatch]");
  if (swatchBtn) {
    state.selectedSwatches[swatchBtn.dataset.product] = Number(swatchBtn.dataset.swatch);
    state.orientations[swatchBtn.dataset.product] = "vertical";
    renderProducts();
    return;
  }
  const addBtn = e.target.closest("[data-add]");
  if (addBtn) {
    const product = PRODUCTS.find((p) => p.id === addBtn.dataset.add);
    const swatch = product.swatches[state.selectedSwatches[product.id] || 0];
    addToCart({
      key: `${product.id}-${swatch.name}`,
      name: product.name,
      variant: swatch.name,
      price: product.price
    });
  }
});

// Bundle slot toggles
document.querySelectorAll(".bundle-slots").forEach((group) => {
  const limit = Number(group.dataset.limit);
  group.addEventListener("click", (e) => {
    const chip = e.target.closest(".slot-chip");
    if (!chip) return;
    if (chip.classList.contains("selected")) {
      if (group.querySelectorAll(".slot-chip.selected").length > 1) {
        chip.classList.remove("selected");
      }
      return;
    }
    const selected = group.querySelectorAll(".slot-chip.selected");
    if (selected.length >= limit) {
      selected[0].classList.remove("selected");
    }
    chip.classList.add("selected");
  });
});

document.getElementById("addBundleBase3").addEventListener("click", () => {
  const picks = [...document.querySelectorAll('[data-bundle="base3"] .slot-chip.selected')].map((el) => el.textContent);
  addToCart({
    key: `bundle-base3-${picks.join("-")}`,
    name: "Any 3 Base Straps Bundle",
    variant: picks.join(", "),
    price: 189
  });
});

document.getElementById("addBundleLink2").addEventListener("click", () => {
  const picks = [...document.querySelectorAll('[data-bundle="link2"] .slot-chip.selected')].map((el) => el.textContent);
  addToCart({
    key: `bundle-link2-${picks.join("-")}`,
    name: "Any 2 Link Straps Bundle",
    variant: picks.join(", "),
    price: 259
  });
});

// Cart controls
document.getElementById("openCartBtn").addEventListener("click", openCart);
document.getElementById("closeCartBtn").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);

cartItemsEl.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-qty-delta]");
  if (!btn) return;
  const idx = Number(btn.dataset.idx);
  const delta = Number(btn.dataset.qtyDelta);
  state.cart[idx].qty += delta;
  if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
  renderCart();
});

document.getElementById("checkoutBtn").addEventListener("click", () => {
  if (state.cart.length === 0) {
    showToast("Add a strap or bundle first");
    return;
  }
  showToast("Checkout flow ready — connect Shopify or Stripe");
});

// FAQ accordion
document.getElementById("faqList").addEventListener("click", (e) => {
  const trigger = e.target.closest(".faq-trigger");
  if (!trigger) return;
  const item = trigger.closest(".faq-item");
  item.classList.toggle("open");
});

// Newsletter
document.getElementById("newsletterForm").addEventListener("submit", (e) => {
  e.preventDefault();
  e.target.reset();
  showToast("Welcome to the VELORIS private list");
});

renderProducts();
renderCart();
