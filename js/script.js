const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}


window.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname; // Get the current path from the URL
    document.querySelectorAll('#navbar li a').forEach(link => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });
  

  const searchInput = document.querySelector("[data-search]");
  const products = document.querySelectorAll(".pro");

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase().trim();

    products.forEach((product) => {
      const productName = product.querySelector(".des h5").textContent.toLowerCase();
      const productBrand = product.querySelector(".des span").textContent.toLowerCase();

      // Show or hide the product based on the search input
      if (productName.includes(value) || productBrand.includes(value)) {
        product.style.display = "block";
      } else {
        product.style.display = "none";
      }
    });
  });


  document.addEventListener('DOMContentLoaded', function () {
    // Select all 'add-to-cart' buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const cartCount = document.getElementById('cart-count');
    const cartOverlay = document.getElementById('cart-overlay');
    const cartItemsContainer = document.getElementById('cart-items');
    const closeCartButton = document.getElementById('close-cart');
    const openCartButton = document.getElementById('open-cart');
    let cart = JSON.parse(localStorage.getItem('cart')) || []; // Initialize cart from localStorage

    // Function to save cart to localStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Function to display cart items
    function displayCartItems() {
        cartItemsContainer.innerHTML = ''; // Clear current items
        let subtotal = 0;
        cart.forEach((item, index) => {
            subtotal += parseFloat(item.price) * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <div class="cart-item-row">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <p>${item.name}</p>
                        <p>₱${item.price}</p>
                        <div class="cart-item-controls">
                    <button class="decrease" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase" data-index="${index}">+</button>
                     </div>
                    </div>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Update subtotal
        document.querySelector('.subtotal').textContent = `Subtotal: ₱${subtotal.toFixed(2)}`;
        cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0); // Update cart count
    }

    // Add to cart functionality
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const product = button.closest('.pro');
            const itemId = product.getAttribute('data-id');
            const itemName = product.getAttribute('data-name');
            const itemPrice = parseFloat(product.getAttribute('data-price'));
            const itemImage = product.getAttribute('data-image');

            // Check if item is already in the cart
            const existingItem = cart.find(item => item.id === itemId);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ id: itemId, name: itemName, price: itemPrice, image: itemImage, quantity: 1 });
            }

            saveCart();
            displayCartItems();
        });
    });

    // Open cart
    openCartButton.addEventListener('click', () => {
        cartOverlay.classList.add('active');
        displayCartItems();
    });

    // Close cart
    closeCartButton.addEventListener('click', () => {
        cartOverlay.classList.remove('active');
    });

    // Event delegation for cart item controls
    cartItemsContainer.addEventListener('click', event => {
        const target = event.target;
        const index = target.dataset.index;

        if (target.classList.contains('increase')) {
            cart[index].quantity++;
        } else if (target.classList.contains('decrease')) {
            cart[index].quantity--;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1); // Remove item if quantity is 0
            }
        }

        saveCart();
        displayCartItems();
    });

    // Initialize cart display
    displayCartItems();
});




  cartItem.innerHTML = `
  <div class="cart-item-row">
    <img src="${item.image}" alt="${item.name}">
    <div class="cart-item-info">
      <p>${item.name}</p>
      <p>₱${item.price}</p>
    </div>
  </div>
  <div class="cart-item-controls">
    <button>-</button>
    <span>1</span>
    <button>+</button>
  </div>
`;
  
 




  