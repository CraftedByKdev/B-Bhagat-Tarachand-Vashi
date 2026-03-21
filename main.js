import { dishes, features, menuCategories, menuData, reviews } from './app_data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    initNavbar();
    populateData();
    initAnimations();
});

function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

function populateData() {
    const dishesContainer = document.getElementById('dishes-container');
    dishes.forEach(dish => {
        const dishEl = document.createElement('div');
        dishEl.className = 'dish-card group bg-charcoal rounded-2xl overflow-hidden border border-white/5 hover:border-gold/30 transition-colors duration-300 gsap-fade-up';
        dishEl.innerHTML = `
            <div class="dish-card-img-wrapper relative h-64 w-full">
                <img src="${dish.image}" alt="${dish.name}" class="w-full h-full object-cover">
                <div class="absolute top-4 right-4 bg-charcoal/80 backdrop-blur-md px-3 py-1 rounded-full border border-gold/30 text-xs font-medium text-gold tracking-widest uppercase">
                    ${dish.tag}
                </div>
            </div>
            <div class="p-8">
                <h3 class="text-2xl font-serif text-cream mb-3">${dish.name}</h3>
                <p class="text-cream/60 font-light leading-relaxed mb-6 line-clamp-2">${dish.desc}</p>
                
            </div>
        `;
        dishesContainer.appendChild(dishEl);
    });

    const featuresContainer = document.getElementById('features-container');
    features.forEach(feature => {
        const featEl = document.createElement('div');
        featEl.className = 'bg-charcoal/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-gold/20 transition-colors duration-300 gsap-fade-up';
        featEl.innerHTML = `
            <div class="w-14 h-14 bg-maroon-dark rounded-xl flex items-center justify-center border border-gold/20 mb-6">
                <i data-lucide="${feature.icon}" class="text-gold w-6 h-6"></i>
            </div>
            <h3 class="text-xl font-serif text-cream mb-3">${feature.title}</h3>
            <p class="text-cream/70 font-light leading-relaxed">${feature.desc}</p>
        `;
        featuresContainer.appendChild(featEl);
    });

   const menuTabsContainer = document.getElementById("menu-tabs");
const menuContent = document.getElementById("menu-content");
const selectedCategoryTitle = document.getElementById("selected-category-title");
const leftArrow = document.getElementById("menu-left-arrow");
const rightArrow = document.getElementById("menu-right-arrow");

function formatPrice(price) {
  return `₹${price.toFixed(2)}`;
}

function renderTabs() {
  menuTabsContainer.innerHTML = "";

  menuCategories.forEach((category, index) => {
    const tab = document.createElement("button");
    tab.type = "button";
    tab.className = `menu-tab ${index === 0 ? "active" : ""}`;
    tab.textContent = category;

    tab.addEventListener("click", () => {
      document.querySelectorAll(".menu-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderMenuItems(category);
    });

    menuTabsContainer.appendChild(tab);
  });
}

function renderMenuItems(category) {
  const items = menuData[category] || [];
  selectedCategoryTitle.textContent = category;

  menuContent.innerHTML = items.map(item => `
    <div class="menu-item">
      <div class="menu-item-left">
        <h4>${item.name}</h4>
        ${item.quantity ? `<div class="menu-meta">${item.quantity}</div>` : ""}
        ${item.description ? `<div class="menu-meta">${item.description}</div>` : ""}
      </div>
      <div class="menu-price">${formatPrice(item.price)}</div>
    </div>
  `).join("");
}

leftArrow.addEventListener("click", () => {
  menuTabsContainer.scrollBy({ left: -250, behavior: "smooth" });
});

rightArrow.addEventListener("click", () => {
  menuTabsContainer.scrollBy({ left: 250, behavior: "smooth" });
});

renderTabs();
renderMenuItems(menuCategories[0]);

if (window.lucide) {
  lucide.createIcons();
}
    const reviewsContainer = document.getElementById('reviews-container');
    reviews.forEach(review => {
        const revEl = document.createElement('div');
        revEl.className = 'bg-charcoal p-8 rounded-2xl border border-white/5 relative gsap-fade-up';
        revEl.innerHTML = `
            <i data-lucide="quote" class="absolute top-6 right-6 text-gold/10 w-12 h-12"></i>
            <div class="flex space-x-1 mb-6">
                ${Array(5).fill('<i data-lucide="star" class="text-gold fill-gold w-4 h-4"></i>').join('')}
            </div>
            <p class="text-cream/80 font-light leading-relaxed mb-8 italic">"${review.text}"</p>
            <div class="flex items-center">
                <div class="w-10 h-10 bg-maroon-dark rounded-full flex items-center justify-center text-gold font-serif font-bold border border-gold/20 mr-4">
                    ${review.author.charAt(0)}
                </div>
                <div>
                    <h5 class="text-cream font-medium">${review.author}</h5>
                    <span class="text-xs text-cream/50 uppercase tracking-widest">${review.label}</span>
                </div>
            </div>
        `;
        reviewsContainer.appendChild(revEl);
    });

    lucide.createIcons();
}

function initAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to('.gsap-hero', {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        delay: 0.2
    });

    const fadeUpElements = document.querySelectorAll('.gsap-fade-up');
    fadeUpElements.forEach(el => {
        gsap.fromTo(el, 
            { y: 40, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });
}
