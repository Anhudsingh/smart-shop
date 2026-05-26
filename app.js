/**
 * SMART SHOP - Interactive Frontend Application Logic
 * CSE Final Year Project
 * Developed by: Anhud Singh Kondal (Computer Science & Engineering)
 * File: app.js
 */

// Developer details for project validation
const DEVELOPER_NAME = "Anhud Singh";
const COURSE_BRANCH = "B.Tech in Computer Science & Engineering (Final Year)";
const ACADEMIC_YEAR = "2025 - 2026";

// Static mock product data representing curated collections
const PRODUCTS = [
    {
        id: 1,
        name: "Vintage Heavyweight Oversized Tee",
        category: "gents",
        price: 29.99,
        oldPrice: 45.00,
        rating: 4.8,
        reviewsCount: 128,
        badge: "BEST SELLER",
        image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=600&auto=format&fit=crop",
        description: "Engineered from ultra-thick 240GSM cotton, this streetwear-essential boxy tee provides the ultimate vintage wash look and unparalleled comfort. Designed for maximum breathability and style.",
        sizes: ["S", "M", "L", "XL"],
        colors: ["#1a1a1a", "#7a7a7a", "#e2e8f0"]
    },
    {
        id: 2,
        name: "Cyberpunk Graphic Printed Hoodie",
        category: "gents",
        price: 59.99,
        rating: 4.9,
        reviewsCount: 94,
        badge: "NEW ARRIVAL",
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop",
        description: "Bold screen-printed neon graphics inspired by techwear aesthetics. Features a double-lined drawstring hood, heavy ribbing, and custom utility metal toggles.",
        sizes: ["M", "L", "XL"],
        colors: ["#0f172a", "#3b82f6"]
    },
    {
        id: 3,
        name: "Relaxed Fit Utility Cargo Pants",
        category: "gents",
        price: 49.99,
        oldPrice: 65.00,
        rating: 4.7,
        reviewsCount: 65,
        badge: "TRENDING",
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop",
        description: "Constructed with water-resistant ripstop nylon, multiple 3D cargo pockets, and adjustable ankle drawstring cuffs. Blends everyday functionality with street design.",
        sizes: ["30", "32", "34", "36"],
        colors: ["#1e293b", "#3f3f46"]
    },
    {
        id: 4,
        name: "Oversized Streetwear Acid-Wash Sweatshirt",
        category: "ladies",
        price: 44.99,
        rating: 4.6,
        reviewsCount: 88,
        badge: "NEW ARRIVAL",
        image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=600&auto=format&fit=crop",
        description: "Ultimate vintage streetwear comfort. Drop shoulder details, hand-distressed hem finishes, and pre-shrunk premium organic loopback cotton blend.",
        sizes: ["S", "M", "L"],
        colors: ["#6b7280", "#a855f7", "#ec4899"]
    },
    {
        id: 5,
        name: "High-Waist Retro Utility Denim Jeans",
        category: "ladies",
        price: 54.99,
        oldPrice: 75.00,
        rating: 4.8,
        reviewsCount: 112,
        badge: "CLEAN WASH",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=600&auto=format&fit=crop",
        description: "Classic straight-leg cut denim with deep front utility pockets. Features signature contrast bronze stitching and premium rigid raw denim texture.",
        sizes: ["26", "28", "30", "32"],
        colors: ["#2563eb", "#1d4ed8"]
    },
    {
        id: 6,
        name: "Minimalist Pastel Summer Slip Dress",
        category: "ladies",
        price: 39.99,
        rating: 4.5,
        reviewsCount: 76,
        badge: "SUMMER HOT",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=600&auto=format&fit=crop",
        description: "A lightweight, breathable, and incredibly fluid satin-blend slip dress. Features adjustable criss-cross back straps and a delicate modern cowl neckline.",
        sizes: ["XS", "S", "M", "L"],
        colors: ["#fef08a", "#fbcfe8", "#ffffff"]
    },
    {
        id: 7,
        name: "Kids Urban Camo Bomber Jacket",
        category: "kids",
        price: 34.99,
        oldPrice: 49.99,
        rating: 4.9,
        reviewsCount: 45,
        badge: "POPULAR",
        image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?q=80&w=600&auto=format&fit=crop",
        description: "Windproof and water-repellent shell with light warm thermal quilting. Styled with matching classic contrast elasticated neck, wrist, and bottom ribbing.",
        sizes: ["4Y", "6Y", "8Y", "10Y"],
        colors: ["#166534", "#1e293b"]
    },
    {
        id: 8,
        name: "Kids Colorful Premium Graphic Hoodie",
        category: "kids",
        price: 24.99,
        rating: 4.7,
        reviewsCount: 38,
        badge: "COMFY FIT",
        image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=600&auto=format&fit=crop",
        description: "Supersoft brushed inner fleece hoodie featuring vibrant embroidered cheerful patterns. Made skin-safe with hypoallergenic chemical-free organic dye processing.",
        sizes: ["6Y", "8Y", "10Y", "12Y"],
        colors: ["#f97316", "#e11d48", "#06b6d4"]
    }
];

// Multiple Currency Configuration
const CURRENCY_CONFIG = {
    USD: { symbol: "$", rate: 1.0 },
    EUR: { symbol: "€", rate: 0.92 },
    GBP: { symbol: "£", rate: 0.79 },
    INR: { symbol: "₹", rate: 83.0 },
    JPY: { symbol: "¥", rate: 155.0 }
};
let currentCurrency = "USD";

function formatPrice(usdAmount) {
    const config = CURRENCY_CONFIG[currentCurrency] || CURRENCY_CONFIG.USD;
    const converted = usdAmount * config.rate;
    const decimals = currentCurrency === "JPY" ? 0 : 2;
    return `${config.symbol}${converted.toFixed(decimals)}`;
}

// Application State Management
let cart = [];
let orders = [];
let currentCategory = "all";
let searchQuery = "";
let selectedProductForQuickView = null;

// Cart Storage Management (Local Persistence)
function initLocalStorage() {
    try {
        const savedCart = localStorage.getItem("smart_shop_cart");
        if (savedCart) {
            cart = JSON.parse(savedCart);
            updateCartUI();
        }
    } catch (e) {
        console.error("Local Storage not supported or blocked: ", e);
    }
}

function saveCartToStorage() {
    try {
        localStorage.setItem("smart_shop_cart", JSON.stringify(cart));
    } catch (e) {
        console.error("Failed to save cart status: ", e);
    }
}

// Initialize and Dynamically Inject Currency Selector in Navbar
function initCurrencySelector() {
    try {
        const savedCurrency = localStorage.getItem("smart_shop_currency");
        if (savedCurrency && CURRENCY_CONFIG[savedCurrency]) {
            currentCurrency = savedCurrency;
        }
    } catch (e) {
        console.error("Local storage error:", e);
    }

    const headerActions = document.querySelector(".header-actions");
    if (!headerActions) return;

    const selectWrapper = document.createElement("div");
    selectWrapper.className = "currency-select-wrapper";
    selectWrapper.style.position = "relative";
    selectWrapper.style.display = "flex";
    selectWrapper.style.alignItems = "center";

    const select = document.createElement("select");
    select.id = "currency-selector";
    select.style.padding = "0.5rem 1.8rem 0.5rem 0.8rem";
    select.style.borderRadius = "var(--radius-pill)";
    select.style.border = "1px solid var(--border-color)";
    select.style.backgroundColor = "hsl(210, 20%, 96%)";
    select.style.fontWeight = "600";
    select.style.fontSize = "0.85rem";
    select.style.color = "var(--text-dark)";
    select.style.cursor = "pointer";
    select.style.appearance = "none";
    select.style.webkitAppearance = "none";
    select.style.transition = "all var(--transition-fast)";

    select.onmouseenter = () => select.style.backgroundColor = "var(--border-color)";
    select.onmouseleave = () => select.style.backgroundColor = "hsl(210, 20%, 96%)";
    select.onfocus = () => {
        select.style.borderColor = "var(--text-muted)";
        select.style.boxShadow = "0 0 0 3px rgba(0, 0, 0, 0.05)";
    };
    select.onblur = () => {
        select.style.borderColor = "var(--border-color)";
        select.style.boxShadow = "none";
    };

    Object.keys(CURRENCY_CONFIG).forEach(code => {
        const opt = document.createElement("option");
        opt.value = code;
        opt.textContent = `${CURRENCY_CONFIG[code].symbol} ${code}`;
        if (code === currentCurrency) opt.selected = true;
        select.appendChild(opt);
    });

    const arrow = document.createElement("span");
    arrow.innerHTML = "▾";
    arrow.style.position = "absolute";
    arrow.style.right = "0.7rem";
    arrow.style.pointerEvents = "none";
    arrow.style.fontSize = "0.75rem";
    arrow.style.color = "var(--text-muted)";

    selectWrapper.appendChild(select);
    selectWrapper.appendChild(arrow);

    const loginBtn = headerActions.querySelector(".btn-login");
    if (loginBtn) {
        headerActions.insertBefore(selectWrapper, loginBtn);
    } else {
        headerActions.appendChild(selectWrapper);
    }

    select.addEventListener("change", (e) => {
        currentCurrency = e.target.value;
        try {
            localStorage.setItem("smart_shop_currency", currentCurrency);
        } catch (err) {}
        
        renderProducts();
        updateCartUI();
        
        if (selectedProductForQuickView) {
            openQuickView(selectedProductForQuickView.id);
        }
    });
}

// DOM Elements
const productsGrid = document.getElementById("products-grid");
const navLinks = document.querySelectorAll(".nav-link");
const categoryFilterBtns = document.querySelectorAll(".filter-btn");
const searchInput = document.getElementById("search-input");
const cartBadge = document.getElementById("cart-badge");
const cartDrawer = document.getElementById("cart-drawer");
const drawerOverlay = document.getElementById("drawer-overlay");
const drawerBody = document.getElementById("drawer-body");
const cartTrigger = document.getElementById("cart-trigger");
const btnCloseDrawer = document.getElementById("btn-close-drawer");

// Totals Elements
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTax = document.getElementById("cart-tax");
const cartTotal = document.getElementById("cart-total");

// Modal Overlays
const modalLogin = document.getElementById("modal-login");
const modalQuickView = document.getElementById("modal-quick-view");
const modalCheckout = document.getElementById("modal-checkout");
const modalPortfolio = document.getElementById("modal-portfolio");
const modalAdmin = document.getElementById("modal-admin");

// Main App Initialization
document.addEventListener("DOMContentLoaded", () => {
    initLocalStorage();
    initOrders();
    initCurrencySelector();
    renderProducts();
    setupEventListeners();
    setupNavbarScrollEffect();
});

// Setup sticky header scroll aesthetics
function setupNavbarScrollEffect() {
    const header = document.querySelector(".header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });
}

// Event Listeners Router
function setupEventListeners() {
    // Navigation / Category Filter
    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const cat = e.target.getAttribute("data-category");
            updateActiveCategory(cat);
        });
    });

    categoryFilterBtns.forEach(btn => {
        btn.addEventListener("click", (e) => {
            const cat = e.target.getAttribute("data-category");
            updateActiveCategory(cat);
        });
    });

    // Search input event
    searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderProducts();
    });

    // Cart Drawer Controls
    cartTrigger.addEventListener("click", () => toggleCartDrawer(true));
    btnCloseDrawer.addEventListener("click", () => toggleCartDrawer(false));
    drawerOverlay.addEventListener("click", () => toggleCartDrawer(false));

    // Form Submissions
    document.getElementById("login-form").addEventListener("submit", handleLoginSubmit);
    document.getElementById("checkout-flow-form").addEventListener("submit", handleCheckoutSubmit);

    // Dynamic Portfolio Project Details button
    document.getElementById("portfolio-btn").addEventListener("click", () => openModal(modalPortfolio));
}

// Update Active Nav and Render Products
function updateActiveCategory(category) {
    currentCategory = category;

    // Sync header navbar
    navLinks.forEach(link => {
        if (link.getAttribute("data-category") === category) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });

    // Sync storefront filter buttons
    categoryFilterBtns.forEach(btn => {
        if (btn.getAttribute("data-category") === category) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    renderProducts();

    // Smooth scroll down to products section if we select a category from hero button or nav links
    const shopSection = document.getElementById("shop");
    if (shopSection) {
        shopSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// Render product list with animations
function renderProducts() {
    productsGrid.innerHTML = "";

    const filtered = PRODUCTS.filter(prod => {
        const matchesCategory = currentCategory === "all" || prod.category === currentCategory;
        const matchesSearch = prod.name.toLowerCase().includes(searchQuery) || 
                              prod.description.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
                <span style="font-size: 3rem; display: block; margin-bottom: 1rem;">🔍</span>
                <h3 style="font-weight: 700; color: var(--text-dark); margin-bottom: 0.5rem;">No products found</h3>
                <p>Try modifying your search keywords or browsing different categories.</p>
            </div>
        `;
        return;
    }

    filtered.forEach((product, idx) => {
        const hasOldPrice = product.oldPrice ? true : false;
        const card = document.createElement("div");
        card.className = "product-card";
        card.style.animationDelay = `${idx * 0.05}s`;
        
        card.innerHTML = `
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ""}
            <div class="product-img-container">
                <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
                <div class="product-actions">
                    <button class="btn-action quick-view" onclick="openQuickView(${product.id})">
                        <span>Quick View</span>
                    </button>
                    <button class="btn-action" onclick="addToCartDirect(${product.id})" aria-label="Add to Cart">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    </button>
                </div>
            </div>
            <div class="product-details">
                <span class="product-meta">${product.category}</span>
                <h3 class="product-name" onclick="openQuickView(${product.id})">${product.name}</h3>
                <div class="product-rating">
                    ${getRatingStars(product.rating)}
                    <span class="rating-count">(${product.reviewsCount})</span>
                </div>
                <div class="product-price-wrapper">
                    <div>
                        ${hasOldPrice ? `<span class="product-old-price">${formatPrice(product.oldPrice)}</span>` : ""}
                        <span class="product-price">${formatPrice(product.price)}</span>
                    </div>
                    <button class="add-to-cart-simple" onclick="addToCartDirect(${product.id})">
                        + Add
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// Render stars
function getRatingStars(rating) {
    let starsHtml = "";
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHtml += `★`;
        } else if (i === fullStars + 1 && hasHalfStar) {
            starsHtml += `★`; // Simply use full star for mock representation
        } else {
            starsHtml += `☆`;
        }
    }
    return starsHtml;
}

// Drawer Visibility Toggle
function toggleCartDrawer(open) {
    if (open) {
        cartDrawer.classList.add("active");
        drawerOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // disable background scroll
    } else {
        cartDrawer.classList.remove("active");
        drawerOverlay.classList.remove("active");
        document.body.style.overflow = "auto";
    }
}

// Cart State Logic
function addToCartDirect(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;
    
    addToCart(product, product.sizes[0], product.colors[0]);
    
    // Provide visually premium feedback by sliding out cart drawer
    toggleCartDrawer(true);
}

function addToCart(product, size, color) {
    const existingIndex = cart.findIndex(item => 
        item.id === product.id && 
        item.selectedSize === size && 
        item.selectedColor === color
    );

    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            ...product,
            selectedSize: size,
            selectedColor: color,
            quantity: 1
        });
    }

    saveCartToStorage();
    updateCartUI();
}

function updateCartUI() {
    // Badge counter
    const totalQty = cart.reduce((total, item) => total + item.quantity, 0);
    cartBadge.textContent = totalQty;
    
    if (totalQty > 0) {
        cartBadge.style.display = "flex";
    } else {
        cartBadge.style.display = "none";
    }

    // Drawer list
    drawerBody.innerHTML = "";

    if (cart.length === 0) {
        drawerBody.innerHTML = `
            <div class="cart-empty-state">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="color: var(--border-color);"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                <h3>Your Cart is empty</h3>
                <p style="text-align: center; font-size: 0.9rem;">Browse our collections and select premium arrivals to fill your cart.</p>
            </div>
        `;
        cartSubtotal.textContent = formatPrice(0);
        cartTax.textContent = formatPrice(0);
        cartTotal.textContent = formatPrice(0);
        return;
    }

    cart.forEach(item => {
        const itemElement = document.createElement("div");
        itemElement.className = "cart-item";
        itemElement.innerHTML = `
            <div class="cart-item-img-container">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
            </div>
            <div class="cart-item-details">
                <div>
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-option">Size: ${item.selectedSize} / Color: <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background-color:${item.selectedColor}; border:1px solid #ddd; vertical-align:middle;"></span></p>
                </div>
                <div class="cart-item-footer">
                    <div class="cart-qty-selector">
                        <button class="qty-btn" onclick="updateQty(${item.id}, '${item.selectedSize}', '${item.selectedColor}', -1)">-</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQty(${item.id}, '${item.selectedSize}', '${item.selectedColor}', 1)">+</button>
                    </div>
                    <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
                </div>
            </div>
            <button class="btn-remove-item" onclick="removeCartItem(${item.id}, '${item.selectedSize}', '${item.selectedColor}')" aria-label="Remove item">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        `;
        drawerBody.appendChild(itemElement);
    });

    calculateTotals();
}

function updateQty(id, size, color, diff) {
    const idx = cart.findIndex(item => 
        item.id === id && 
        item.selectedSize === size && 
        item.selectedColor === color
    );
    if (idx === -1) return;

    cart[idx].quantity += diff;
    if (cart[idx].quantity <= 0) {
        cart.splice(idx, 1);
    }

    saveCartToStorage();
    updateCartUI();
}

function removeCartItem(id, size, color) {
    cart = cart.filter(item => 
        !(item.id === id && item.selectedSize === size && item.selectedColor === color)
    );

    saveCartToStorage();
    updateCartUI();
}

function calculateTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08; // Mock 8% GST/Sales Tax for academic completeness
    const total = subtotal + tax;

    cartSubtotal.textContent = formatPrice(subtotal);
    cartTax.textContent = formatPrice(tax);
    cartTotal.textContent = formatPrice(total);
}

// Modal Toggle Utility
function openModal(modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
}

function closeModal(modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
}

// 1. Quick View Modal Operations
function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    selectedProductForQuickView = product;
    
    const hasOldPrice = product.oldPrice ? true : false;
    const sizeWrapper = document.getElementById("qv-sizes");
    const colorsWrapper = document.getElementById("qv-colors");
    
    // Set text contents
    document.getElementById("qv-img").src = product.image;
    document.getElementById("qv-title").textContent = product.name;
    document.getElementById("qv-price").textContent = formatPrice(product.price);
    
    if (hasOldPrice) {
        document.getElementById("qv-old-price").textContent = formatPrice(product.oldPrice);
        document.getElementById("qv-old-price").style.display = "inline";
    } else {
        document.getElementById("qv-old-price").style.display = "none";
    }
    
    document.getElementById("qv-desc").textContent = product.description;

    // Render sizes
    sizeWrapper.innerHTML = "";
    product.sizes.forEach((size, idx) => {
        const button = document.createElement("button");
        button.className = `size-pill ${idx === 0 ? "active" : ""}`;
        button.textContent = size;
        button.onclick = (e) => {
            document.querySelectorAll(".size-pill").forEach(p => p.classList.remove("active"));
            e.target.classList.add("active");
        };
        sizeWrapper.appendChild(button);
    });

    // Render colors
    colorsWrapper.innerHTML = "";
    product.colors.forEach((color, idx) => {
        const dot = document.createElement("button");
        dot.className = `color-dot ${idx === 0 ? "active" : ""}`;
        dot.style.backgroundColor = color;
        dot.onclick = (e) => {
            document.querySelectorAll(".color-dot").forEach(d => d.classList.remove("active"));
            e.target.classList.add("active");
        };
        colorsWrapper.appendChild(dot);
    });

    openModal(modalQuickView);
}

function addToCartFromQuickView() {
    if (!selectedProductForQuickView) return;
    
    const activeSize = document.querySelector(".size-pill.active").textContent;
    
    // Find matching HEX color back from element style
    const activeColorBg = document.querySelector(".color-dot.active").style.backgroundColor;
    
    addToCart(selectedProductForQuickView, activeSize, activeColorBg);
    closeModal(modalQuickView);
    toggleCartDrawer(true);
}

// 2. Login Flow Modal Controllers
function openLoginModal() {
    openModal(modalLogin);
}

function switchLoginRegister() {
    const title = document.getElementById("login-title");
    const subtitle = document.getElementById("login-subtitle");
    const submitBtn = document.getElementById("btn-login-submit");
    const formCheckbox = document.getElementById("login-checkbox-row");
    const togglePrompt = document.getElementById("login-toggle-prompt");
    
    if (submitBtn.textContent.includes("Sign In")) {
        title.textContent = "Create an Account";
        subtitle.textContent = "Access premium collections under CSE project platform.";
        submitBtn.textContent = "Create Account";
        formCheckbox.style.display = "none";
        togglePrompt.innerHTML = `Already have an account? <button class="modal-switch-btn" onclick="switchLoginRegister()">Sign In</button>`;
    } else {
        title.textContent = "Welcome Back";
        subtitle.textContent = "Sign in to resume custom academic project actions.";
        submitBtn.textContent = "Sign In";
        formCheckbox.style.display = "flex";
        togglePrompt.innerHTML = `Don't have an account? <button class="modal-switch-btn" onclick="switchLoginRegister()">Sign Up</button>`;
    }
}

function handleLoginSubmit(e) {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const submitBtnText = document.getElementById("btn-login-submit").textContent;
    
    // Simulated successful frontend login feedback
    const btn = e.target.querySelector(".btn-submit");
    btn.innerHTML = `<span style="display:inline-block; animation:bounce 0.8s infinite;">⌛</span> Connecting...`;
    
    setTimeout(() => {
        btn.textContent = "Success ✓";
        setTimeout(() => {
            closeModal(modalLogin);
            
            // Alter header button text dynamically to simulate login session state
            const headerLoginBtn = document.querySelector(".btn-login");
            
            if (email.toLowerCase().trim() === "anhud@smartshop.com") {
                headerLoginBtn.textContent = "Admin Dashboard ⚙️";
                headerLoginBtn.style.borderColor = "var(--primary)";
                headerLoginBtn.style.backgroundColor = "var(--text-dark)";
                headerLoginBtn.style.color = "var(--text-light)";
                headerLoginBtn.onclick = () => openAdminModal();
                
                alert("Welcome, System Administrator!\nYou have unlocked the Admin Dashboard. Click the 'Admin Dashboard ⚙️' button in the navbar to open it.");
            } else {
                headerLoginBtn.textContent = email.split('@')[0];
                headerLoginBtn.style.borderColor = "var(--success)";
                headerLoginBtn.style.backgroundColor = "transparent";
                headerLoginBtn.style.color = "var(--text-dark)";
                headerLoginBtn.onclick = () => openLoginModal();
                
                alert(`${submitBtnText === "Sign In" ? "Sign In" : "Registration"} Simulated Successfully!\nLogged in as: ${email}`);
            }
            
            // Restore button styling
            btn.textContent = submitBtnText;
        }, 800);
    }, 1500);
}

// 3. Checkout Simulation Workflow
function startCheckout() {
    if (cart.length === 0) {
        alert("Your cart is empty! Please add products before checking out.");
        return;
    }
    
    toggleCartDrawer(false);
    
    // Reset Checkout form stages
    document.getElementById("checkout-form-stages").style.display = "block";
    document.getElementById("checkout-success").style.display = "none";
    document.getElementById("checkout-step-1").classList.add("active");
    document.getElementById("checkout-step-2").classList.remove("active");
    
    // Auto fill total price
    document.getElementById("btn-checkout-submit").textContent = `Place Order - ${cartTotal.textContent}`;
    
    openModal(modalCheckout);
}

function handleCheckoutSubmit(e) {
    e.preventDefault();
    
    const submitBtn = document.getElementById("btn-checkout-submit");
    submitBtn.innerHTML = `⌛ Securing Transaction Gateway...`;
    submitBtn.disabled = true;

    const inputs = e.target.querySelectorAll("input");
    const firstName = inputs[0] ? inputs[0].value : "Guest";
    const lastName = inputs[1] ? inputs[1].value : "User";
    const customerName = `${firstName} ${lastName}`;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    const itemsSummary = cart.map(i => `${i.name} (x${i.quantity})`).join(", ");
    const itemsCount = cart.reduce((sum, i) => sum + i.quantity, 0);

    const newOrder = {
        id: `SS-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleString(),
        customerName: customerName,
        itemsCount: itemsCount,
        itemsSummary: itemsSummary,
        subtotal: subtotal,
        total: total,
        status: "Completed"
    };

    orders.unshift(newOrder);
    try {
        localStorage.setItem("smart_shop_orders", JSON.stringify(orders));
    } catch (err) {}

    setTimeout(() => {
        // Clear global cart state
        cart = [];
        saveCartToStorage();
        updateCartUI();

        // Switch modal state to Success Screen
        document.getElementById("checkout-form-stages").style.display = "none";
        document.getElementById("checkout-success").style.display = "flex";
        
        // Active visual checkmarks
        document.getElementById("checkout-step-2").classList.add("active");
        submitBtn.disabled = false;
        
        // Sync Admin Dashboard if open
        updateAdminDashboard();
    }, 2000);
}

// Admin Panel State & Dashboards Logic
let currentAdminTab = "metrics";

function initOrders() {
    try {
        const savedOrders = localStorage.getItem("smart_shop_orders");
        if (savedOrders) {
            orders = JSON.parse(savedOrders);
        } else {
            orders = [
                {
                    id: "SS-4892",
                    timestamp: new Date(Date.now() - 24 * 3600 * 1000).toLocaleString(),
                    customerName: "Aman Preet Sharma",
                    itemsCount: 2,
                    itemsSummary: "Vintage Heavyweight Oversized Tee (x1), Cyberpunk Graphic Printed Hoodie (x1)",
                    subtotal: 89.98,
                    total: 97.18,
                    status: "Completed"
                },
                {
                    id: "SS-7128",
                    timestamp: new Date(Date.now() - 12 * 3600 * 1000).toLocaleString(),
                    customerName: "Priya Malhotra",
                    itemsCount: 1,
                    itemsSummary: "Relaxed Fit Utility Cargo Pants (x1)",
                    subtotal: 49.99,
                    total: 53.99,
                    status: "Completed"
                },
                {
                    id: "SS-3301",
                    timestamp: new Date(Date.now() - 2 * 3600 * 1000).toLocaleString(),
                    customerName: "Rohan Varma",
                    itemsCount: 3,
                    itemsSummary: "Kids Urban Camo Bomber Jacket (x2), Vintage Heavyweight Oversized Tee (x1)",
                    subtotal: 99.97,
                    total: 107.97,
                    status: "Completed"
                }
            ];
            localStorage.setItem("smart_shop_orders", JSON.stringify(orders));
        }
    } catch (e) {
        console.error("Failed to load orders: ", e);
    }
}

function openAdminModal() {
    updateAdminDashboard();
    openModal(modalAdmin);
}

function switchAdminTab(tabName) {
    currentAdminTab = tabName;
    
    // Toggle active tab buttons
    document.querySelectorAll(".admin-tab-btn").forEach(btn => {
        if (btn.id === `tab-btn-${tabName}`) {
            btn.classList.add("active");
            btn.style.background = "white";
            btn.style.borderColor = "var(--border-color)";
        } else {
            btn.classList.remove("active");
            btn.style.background = "transparent";
            btn.style.borderColor = "transparent";
        }
    });

    // Toggle active content divs
    document.querySelectorAll(".admin-tab-content").forEach(content => {
        if (content.id === `admin-tab-${tabName}`) {
            content.style.display = "block";
        } else {
            content.style.display = "none";
        }
    });

    updateAdminDashboard();
}

function updateAdminDashboard() {
    // 1. Calculate General Metrics
    const totalOrders = orders.length;
    const grossRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const totalItems = orders.reduce((sum, o) => sum + o.itemsCount, 0);
    const aov = totalOrders > 0 ? grossRevenue / totalOrders : 0;

    // Set text contents with currency formatting!
    document.getElementById("metric-revenue").textContent = formatPrice(grossRevenue);
    document.getElementById("metric-orders").textContent = totalOrders;
    document.getElementById("metric-aov").textContent = formatPrice(aov);
    document.getElementById("metric-items").textContent = totalItems;
    document.getElementById("admin-orders-count").textContent = totalOrders;

    // 2. Render Sales Charts (Department Distribution)
    const deptSales = { gents: 0, ladies: 0, kids: 0 };
    orders.forEach(order => {
        if (order.itemsSummary.toLowerCase().includes("kids")) {
            deptSales.kids += order.total;
        } else if (order.itemsSummary.toLowerCase().includes("pants") || order.itemsSummary.toLowerCase().includes("hoodie") || order.itemsSummary.toLowerCase().includes("tee")) {
            deptSales.gents += order.total;
        } else if (order.itemsSummary.toLowerCase().includes("dress") || order.itemsSummary.toLowerCase().includes("sweatshirt") || order.itemsSummary.toLowerCase().includes("jeans")) {
            deptSales.ladies += order.total;
        } else {
            // Distribute evenly
            deptSales.gents += order.total / 3;
            deptSales.ladies += order.total / 3;
            deptSales.kids += order.total / 3;
        }
    });

    const chartWrapper = document.getElementById("admin-category-chart");
    chartWrapper.innerHTML = "";
    
    const totalDeptRevenue = deptSales.gents + deptSales.ladies + deptSales.kids || 1;
    const departments = [
        { name: "Gents Streetwear", key: "gents", color: "var(--primary)" },
        { name: "Ladies Wear", key: "ladies", color: "#a855f7" },
        { name: "Kids Selection", key: "kids", color: "#166534" }
    ];

    departments.forEach(dept => {
        const salesAmt = deptSales[dept.key];
        const pct = Math.round((salesAmt / totalDeptRevenue) * 100);
        
        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.flexDirection = "column";
        row.style.gap = "0.4rem";
        row.innerHTML = `
            <div style="display: flex; justify-content: space-between; font-size: 0.85rem; font-weight: 700;">
                <span>${dept.name}</span>
                <span>${formatPrice(salesAmt)} (${pct}%)</span>
            </div>
            <div style="width: 100%; height: 10px; background-color: var(--border-color); border-radius: 5px; overflow: hidden;">
                <div style="width: ${pct}%; height: 100%; background-color: ${dept.color}; transition: width 0.6s ease;"></div>
            </div>
        `;
        chartWrapper.appendChild(row);
    });

    // 3. Render Orders Table
    const ordersList = document.getElementById("admin-orders-list");
    ordersList.innerHTML = "";

    if (orders.length === 0) {
        ordersList.innerHTML = `
            <tr>
                <td colspan="7" style="text-align: center; padding: 2rem; color: var(--text-muted);">
                    No orders simulated yet. Use 'Generate Mock Sale' above to start!
                </td>
            </tr>
        `;
    } else {
        orders.forEach(order => {
            const tr = document.createElement("tr");
            tr.style.borderBottom = "1px solid var(--border-color)";
            tr.innerHTML = `
                <td style="padding: 1rem 1.2rem; font-weight: 700; color: var(--primary);">${order.id}</td>
                <td style="padding: 1rem 1.2rem; color: var(--text-muted);">${order.timestamp}</td>
                <td style="padding: 1rem 1.2rem; font-weight: 600;">${order.customerName}</td>
                <td style="padding: 1rem 1.2rem; max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${order.itemsSummary}">${order.itemsSummary}</td>
                <td style="padding: 1rem 1.2rem; text-align: right; font-weight: 700;">${formatPrice(order.total)}</td>
                <td style="padding: 1rem 1.2rem; text-align: center;">
                    <span style="background-color: #dcfce7; color: var(--success); font-size: 0.75rem; font-weight: 800; padding: 0.25rem 0.6rem; border-radius: var(--radius-pill);">${order.status}</span>
                </td>
                <td style="padding: 1rem 1.2rem; text-align: center;">
                    <button onclick="refundOrder('${order.id}')" style="color: var(--primary); font-weight: 700; font-size: 0.8rem; background-color: #fee2e2; padding: 0.3rem 0.8rem; border-radius: var(--radius-sm); border: 1px solid transparent; cursor: pointer; transition: all var(--transition-fast);">Refund</button>
                </td>
            `;
            ordersList.appendChild(tr);
        });
    }

    // 4. Render Inventory Control
    const inventoryList = document.getElementById("admin-inventory-list");
    inventoryList.innerHTML = "";

    PRODUCTS.forEach(prod => {
        const tr = document.createElement("tr");
        tr.style.borderBottom = "1px solid var(--border-color)";
        tr.innerHTML = `
            <td style="padding: 0.8rem 1.2rem;">
                <img src="${prod.image}" alt="${prod.name}" style="width: 40px; height: 45px; object-fit: cover; border-radius: 4px; border: 1px solid var(--border-color);">
            </td>
            <td style="padding: 0.8rem 1.2rem; font-weight: 700; font-size: 0.9rem;">${prod.name}</td>
            <td style="padding: 0.8rem 1.2rem; text-transform: uppercase; font-size: 0.8rem; font-weight: 600; color: var(--text-muted);">${prod.category}</td>
            <td style="padding: 0.8rem 1.2rem; font-weight: 600;">$${prod.price.toFixed(2)}</td>
            <td style="padding: 0.8rem 1.2rem; font-weight: 700; color: var(--primary);">${formatPrice(prod.price)}</td>
            <td style="padding: 0.8rem 1.2rem; text-align: center; display: flex; justify-content: center; gap: 0.5rem; align-items: center; height: 60px;">
                <button onclick="adjustProductPrice(${prod.id}, -5)" style="background-color: var(--border-color); font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 4px; border: 1px solid transparent; cursor: pointer;">- $5</button>
                <button onclick="adjustProductPrice(${prod.id}, 5)" style="background-color: var(--primary); color: white; font-weight: 700; padding: 0.25rem 0.6rem; border-radius: 4px; border: 1px solid transparent; cursor: pointer;">+ $5</button>
            </td>
        `;
        inventoryList.appendChild(tr);
    });
}

function refundOrder(orderId) {
    if (confirm(`Are you sure you want to refund and delete Order ${orderId}?`)) {
        orders = orders.filter(o => o.id !== orderId);
        try {
            localStorage.setItem("smart_shop_orders", JSON.stringify(orders));
        } catch (err) {}
        updateAdminDashboard();
    }
}

function adjustProductPrice(productId, adjustment) {
    const prod = PRODUCTS.find(p => p.id === productId);
    if (!prod) return;
    
    prod.price = Math.max(5.00, prod.price + adjustment); // Keep it above $5
    
    renderProducts(); // Update storefront prices!
    updateCartUI(); // Update cart item prices!
    updateAdminDashboard(); // Update inventory pricing lists!
}

function generateMockOrder() {
    const mockFirstNames = ["Rohan", "Anjali", "Siddharth", "Simran", "Kabir", "Neha", "Arjun", "Aditi"];
    const mockLastNames = ["Sen", "Verma", "Kapoor", "Bhasin", "Malhotra", "Mehta", "Grover", "Joshi"];
    
    const randomFirst = mockFirstNames[Math.floor(Math.random() * mockFirstNames.length)];
    const randomLast = mockLastNames[Math.floor(Math.random() * mockLastNames.length)];
    const customer = `${randomFirst} ${randomLast}`;

    // Select random 1 to 3 items from PRODUCTS
    const randomCount = Math.floor(Math.random() * 3) + 1;
    let selectedItems = [];
    let subtotal = 0;
    let totalItemsCount = 0;
    
    for (let i = 0; i < randomCount; i++) {
        const randomProduct = PRODUCTS[Math.floor(Math.random() * PRODUCTS.length)];
        const qty = Math.floor(Math.random() * 2) + 1;
        selectedItems.push(`${randomProduct.name} (x${qty})`);
        subtotal += randomProduct.price * qty;
        totalItemsCount += qty;
    }

    const tax = subtotal * 0.08;
    const total = subtotal + tax;
    
    const mockOrder = {
        id: `SS-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toLocaleString(),
        customerName: customer,
        itemsCount: totalItemsCount,
        itemsSummary: selectedItems.join(", "),
        subtotal: subtotal,
        total: total,
        status: "Completed"
    };

    orders.unshift(mockOrder);
    try {
        localStorage.setItem("smart_shop_orders", JSON.stringify(orders));
    } catch (e) {}

    updateAdminDashboard();
}
