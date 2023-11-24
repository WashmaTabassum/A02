document.addEventListener("DOMContentLoaded", function() {
    const cartDisplay = document.getElementById('cartDisplay');
    const totalAmount = document.getElementById('totalAmount');

    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    function displayCartItems() {
        cartDisplay.innerHTML = '';

        if (cartItems.length > 0) {
            let totalPrice = 0;

            cartItems.forEach((book, index) => {
                
                if (!book.quantity || book.quantity < 1) {
                    book.quantity = 1;
                }

                totalPrice += (book.price) * book.quantity;

                
                cartDisplay.innerHTML += `
               
                <div class="container d-flex justify-content-center">
                  <div class="card mb-3" style="max-width: 20rem;">
                    <div class="card-body">
                      <h5 class="card-title">${book.title}</h5>
                      <p class="card-text">${book.description}</p>
                      <p class="card-text">$${book.price}</p>
                      <div class="input-group mb-3">
                        <button class="btn btn-outline-secondary" type="button" onclick="decreaseQuantity(${index}) " id="searchbtn">-</button>
                        <input type="text" class="form-control" value="${book.quantity}" id="quantity${index}" readonly>
                        <button class="btn btn-outline-secondary" type="button" onclick="increaseQuantity(${index})" id="searchbtn">+</button>
                        <button class="btn btn-danger" onclick="removeItem(${index})">Remove</button>
                      </div>
                  </div>
                </div>
              </div>

                `;
            });

            // Display total amount
            totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
        } else {
            
            cartDisplay.innerHTML = '<p>Your cart is empty, populate it First.</p>';
            totalAmount.textContent = '$0.00';
        }
    }

    displayCartItems();

    // decrease quantity
    window.decreaseQuantity = function(index) {
        if (cartItems[index].quantity > 1) {
            cartItems[index].quantity--;
            displayCartItems();
            updateLocalStorage();
        }
    };

    // increase quantity
    window.increaseQuantity = function(index) {
        cartItems[index].quantity++;
        displayCartItems();
        updateLocalStorage();
    };

    // remove item from cart
    window.removeItem = function(index) {
        cartItems.splice(index, 1);
        displayCartItems();
        updateLocalStorage();
    };

    function updateLocalStorage() {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
});