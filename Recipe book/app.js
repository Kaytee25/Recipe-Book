const categories = [
  { id: "breakfast", name: "Breakfast", description: "Bright starts & brunch classics" },
  { id: "lunch", name: "Lunch", description: "Midday bowls & wraps" },
  { id: "dinner", name: "Dinner", description: "Hearty mains" },
  { id: "dessert", name: "Dessert", description: "Sweet endings" },
  { id: "vegan", name: "Vegan", description: "Plant-powered plates" },
  { id: "drinks", name: "Drinks", description: "Smoothies & refreshers" }
];

const recipes = [
  {
    id: 1,
    title: "Citrus Avocado Toast",
    chef: "Chef Amina",
    category: "breakfast",
    time: 15,
    rating: 4.7,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=1200&q=80",
    ingredients: ["Sourdough", "Avocado", "Orange segments", "Chili flakes", "Olive oil"],
    steps: [
      "Toast sourdough slices until crisp.",
      "Mash avocado with olive oil and a pinch of salt.",
      "Spread avocado on toast and top with citrus segments.",
      "Finish with chili flakes and extra olive oil."
    ]
  },
  {
    id: 2,
    title: "Spiced Chickpea Bowl",
    chef: "Chef Leila",
    category: "lunch",
    time: 25,
    rating: 4.9,
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    ingredients: ["Chickpeas", "Quinoa", "Spinach", "Cumin", "Lemon"],
    steps: [
      "Warm chickpeas with cumin, paprika, and olive oil.",
      "Cook quinoa and fluff with lemon zest.",
      "Layer spinach, quinoa, and spiced chickpeas in a bowl.",
      "Drizzle tahini dressing before serving."
    ]
  },
  {
    id: 3,
    title: "Herb Butter Salmon",
    chef: "Chef Mateo",
    category: "dinner",
    time: 30,
    rating: 4.6,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=80",
    ingredients: ["Salmon", "Butter", "Parsley", "Garlic", "Lemon"],
    steps: [
      "Season salmon with salt and pepper.",
      "Sear salmon skin-side down until crisp.",
      "Add garlic herb butter and baste for 2 minutes.",
      "Finish with lemon juice and serve."
    ]
  },
  {
    id: 4,
    title: "Cardamom Rice Pudding",
    chef: "Chef Noor",
    category: "dessert",
    time: 40,
    rating: 4.8,
    difficulty: "Medium",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80",
    ingredients: ["Rice", "Milk", "Cardamom", "Honey", "Pistachios"],
    steps: [
      "Simmer rice with milk until creamy.",
      "Stir in cardamom and honey.",
      "Chill for 20 minutes.",
      "Top with pistachios and serve."
    ]
  },
  {
    id: 5,
    title: "Garden Veggie Stir-Fry",
    chef: "Chef Hana",
    category: "vegan",
    time: 20,
    rating: 4.5,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    ingredients: ["Broccoli", "Bell peppers", "Snap peas", "Soy sauce", "Ginger"],
    steps: [
      "Heat wok and add sesame oil.",
      "Stir-fry vegetables until crisp-tender.",
      "Add ginger and soy sauce.",
      "Serve with jasmine rice."
    ]
  },
  {
    id: 6,
    title: "Tropical Sunrise Smoothie",
    chef: "Chef Luca",
    category: "drinks",
    time: 8,
    rating: 4.4,
    difficulty: "Easy",
    image:
      "https://images.unsplash.com/photo-1505253216365-9d6f7c1a3dca?auto=format&fit=crop&w=1200&q=80",
    ingredients: ["Mango", "Pineapple", "Coconut milk", "Banana", "Lime"],
    steps: [
      "Blend all ingredients until smooth.",
      "Taste and add lime for brightness.",
      "Pour into chilled glasses.",
      "Garnish with mint."
    ]
  }
];

const chefProfiles = [
  {
    name: "Chef Amina",
    specialty: "Modern Breakfast",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1546069901-5ec6a79120b0?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Chef Leila",
    specialty: "Middle Eastern Bowls",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Chef Mateo",
    specialty: "Seafood & Grill",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1528712306091-ed0763094c98?auto=format&fit=crop&w=1200&q=80"
  },
  {
    name: "Chef Noor",
    specialty: "Desserts",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=1200&q=80"
  }
];

const categoryGrid = document.getElementById("categoryGrid");
const recipeGrid = document.getElementById("recipeGrid");
const chefGrid = document.getElementById("chefGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortFilter = document.getElementById("sortFilter");
const recipeForm = document.getElementById("recipeForm");
const recipeModal = document.getElementById("recipeModal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.getElementById("closeModal");
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

const ratingsStore = new Map();

const getAverageRating = (recipe) => {
  const data = ratingsStore.get(recipe.id) || { total: recipe.rating, count: 1 };
  return data.total / data.count;
};

const renderCategories = () => {
  categoryGrid.innerHTML = categories
    .map(
      (category) => `
      <div class="category-card" data-category="${category.id}">
        <h3>${category.name}</h3>
        <span>${category.description}</span>
      </div>
    `
    )
    .join("");

  categoryGrid.querySelectorAll(".category-card").forEach((card) => {
    card.addEventListener("click", () => {
      categoryFilter.value = card.dataset.category;
      renderRecipes();
      document.getElementById("featured").scrollIntoView({ behavior: "smooth" });
    });
  });
};

const renderCategoryOptions = () => {
  const options = categories
    .map((category) => `<option value="${category.id}">${category.name}</option>`)
    .join("");
  categoryFilter.insertAdjacentHTML("beforeend", options);
  recipeForm.category.insertAdjacentHTML("beforeend", options);
};

const getFilteredRecipes = () => {
  const searchValue = searchInput.value.toLowerCase();
  const categoryValue = categoryFilter.value;

  return recipes
    .filter((recipe) => (categoryValue === "all" ? true : recipe.category === categoryValue))
    .filter(
      (recipe) =>
        recipe.title.toLowerCase().includes(searchValue) ||
        recipe.chef.toLowerCase().includes(searchValue)
    )
    .sort((a, b) => {
      if (sortFilter.value === "time") return a.time - b.time;
      if (sortFilter.value === "name") return a.title.localeCompare(b.title);
      return getAverageRating(b) - getAverageRating(a);
    });
};

const renderRecipes = () => {
  const filtered = getFilteredRecipes();
  recipeGrid.innerHTML = filtered
    .map((recipe) => {
      const rating = getAverageRating(recipe);
      return `
      <article class="recipe-card">
        <img src="${recipe.image}" alt="${recipe.title}" />
        <div class="recipe-card-content">
          <div>
            <h3>${recipe.title}</h3>
            <div class="recipe-meta">
              <span>${recipe.chef}</span>
              <span>${recipe.time} min · ${recipe.difficulty}</span>
            </div>
          </div>
          <div class="rating" aria-label="Rating ${rating.toFixed(1)}">
            ${renderStars(rating)}
          </div>
          <button type="button" data-id="${recipe.id}">View Recipe</button>
        </div>
      </article>
    `;
    })
    .join("");

  recipeGrid.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => openRecipeModal(parseInt(button.dataset.id, 10)));
  });
};

const renderChefRatings = () => {
  chefGrid.innerHTML = chefProfiles
    .map(
      (chef) => `
      <article class="chef-card">
        <img src="${chef.image}" alt="${chef.name}" />
        <h3>${chef.name}</h3>
        <p>${chef.specialty}</p>
        <div class="rating" aria-label="Rating ${chef.rating}">
          ${renderStars(chef.rating)}
        </div>
      </article>
    `
    )
    .join("");
};

const renderStars = (rating) => {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  let stars = "";
  for (let i = 0; i < 5; i += 1) {
    if (i < fullStars) stars += "★";
    else if (i === fullStars && hasHalf) stars += "☆";
    else stars += "✩";
  }
  return stars;
};

const openRecipeModal = (id) => {
  const recipe = recipes.find((item) => item.id === id);
  if (!recipe) return;
  const rating = getAverageRating(recipe);

  modalBody.innerHTML = `
    <div class="modal-hero">
      <img src="${recipe.image}" alt="${recipe.title}" style="width:100%; border-radius:16px; margin-bottom:16px;" />
      <h2>${recipe.title}</h2>
      <p><strong>Chef:</strong> ${recipe.chef} · <strong>Time:</strong> ${recipe.time} min · <strong>Difficulty:</strong> ${recipe.difficulty}</p>
      <div class="rating" aria-label="Rating ${rating.toFixed(1)}">
        ${renderStars(rating)}
      </div>
      <h3>Ingredients</h3>
      <ul class="step-list">
        ${recipe.ingredients.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <h3>Step-by-step Guide</h3>
      <ol class="step-list">
        ${recipe.steps.map((step) => `<li>${step}</li>`).join("")}
      </ol>
      <div style="margin-top:16px;">
        <label style="font-weight:600;">Rate this recipe:</label>
        <div class="rating" style="margin-top:6px;">
          ${[1, 2, 3, 4, 5]
            .map(
              (value) =>
                `<button class="rate-btn" data-value="${value}" data-id="${recipe.id}" style="background:none;border:none;cursor:pointer;font-size:1.1rem;color:#f4c150;">★</button>`
            )
            .join("")}
        </div>
      </div>
    </div>
  `;

  recipeModal.classList.add("show");
  recipeModal.setAttribute("aria-hidden", "false");

  modalBody.querySelectorAll(".rate-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const value = parseInt(btn.dataset.value, 10);
      updateRating(parseInt(btn.dataset.id, 10), value);
    });
  });
};

const closeRecipeModal = () => {
  recipeModal.classList.remove("show");
  recipeModal.setAttribute("aria-hidden", "true");
};

const updateRating = (id, value) => {
  const recipe = recipes.find((item) => item.id === id);
  if (!recipe) return;
  const data = ratingsStore.get(id) || { total: recipe.rating, count: 1 };
  data.total += value;
  data.count += 1;
  ratingsStore.set(id, data);
  renderRecipes();
  openRecipeModal(id);
};

const handleRecipeSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(recipeForm);
  const newRecipe = {
    id: Date.now(),
    title: formData.get("title").trim(),
    chef: formData.get("chef").trim(),
    category: formData.get("category"),
    time: parseInt(formData.get("time"), 10),
    rating: parseFloat(formData.get("rating")),
    difficulty: formData.get("difficulty"),
    image: formData.get("image").trim(),
    ingredients: formData
      .get("ingredients")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    steps: formData
      .get("steps")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean)
  };

  recipes.unshift(newRecipe);
  recipeForm.reset();
  renderRecipes();
  document.getElementById("featured").scrollIntoView({ behavior: "smooth" });
};

const handleMenuToggle = () => {
  navLinks.classList.toggle("show");
};

searchInput.addEventListener("input", renderRecipes);
categoryFilter.addEventListener("change", renderRecipes);
sortFilter.addEventListener("change", renderRecipes);
recipeForm.addEventListener("submit", handleRecipeSubmit);
closeModal.addEventListener("click", closeRecipeModal);
recipeModal.addEventListener("click", (event) => {
  if (event.target === recipeModal) closeRecipeModal();
});
menuBtn.addEventListener("click", handleMenuToggle);

renderCategories();
renderCategoryOptions();
renderRecipes();
renderChefRatings();


