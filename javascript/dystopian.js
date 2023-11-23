fetch('books.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.')
    }
    return response.json();
  })
  .then(books => {
    let html = '';
    let html2='';

    books.forEach(book => {
      if (book.category == "Dystopian") {
        

        // Generate Bootstrap card HTML for each book
        let htmlSegment = `
          <div class="col-md-4">
            <div class="card mb-3 mx-1 my-4">
              <img src="${book.cover_image}" id="image" class="card-img-top" alt="Book Cover" >
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">${book.description}</p>
                <p class="card-text">${book.price}</p>
                <div class="button-container">
                  <button type="button" class="btn custom-button text-light" id="button-style" onclick="addtoCart(${book.id})">Add to cart</button>
                  <button type="button" class="btn custom-button text-light" id="button-style" onclick="window.location.href='cart.html'"> View Cart</a></button>
                </div>
              </div>
            </div>
          </div>
        `;
        html += htmlSegment; 
      }
    });

    let resultant = document.getElementById("display");
    resultant.innerHTML = html;
   
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
//   //functionality for add to cart 
// //   let cartItems = [];
// // let booksData = []; // Renamed from booksdata to booksData to avoid confusion

// // function fetchBooksData() {
// //   fetch('books.json')
// //     .then(response => {
// //       if (!response.ok) {
// //         throw new Error('Network response was not ok.');
// //       }
// //       return response.json();
// //     })
// //     .then(books => {
// //       booksData = books; // Assign the fetched array of books to the booksData variable
// //     })
// //     .catch(error => {
// //       console.error('Error fetching data: ', error);
// //     });
// // }

// // function addtoCart(bookID) {
// //   alert('Book added to cart');
// //   const selectedBook = booksData.find(book => book.id === bookID);

// //   if (selectedBook) {
// //     // Add the selected book to the cart if it exists
// //     cartItems.push(selectedBook);
// //     console.log("Book: ", selectedBook);
// //   } else {
// //     console.log("Book not found with ID: ", bookID);
// //   }
// // }

// // // Call the function to fetch books data
// // fetchBooksData();
// let cartItems = [];
// let booksData = [];

// function fetchBooksData() {
//   fetch('books.json')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok.');
//       }
//       return response.json();
//     })
//     .then(books => {
//       booksData = books; // Assign the fetched array of books to the booksData variable

//       // Loop through all the books and add them to cartItems
//       // booksData.forEach(book => {
//       //   addtoCart(book.id);
//       // });

     
//     })
//     .catch(error => {
//       console.error('Error fetching data: ', error);
//     });
// }

// function addtoCart(bookID) {
//     const selectedBook = booksData.find(book => book.id == bookID);
//     if (selectedBook) {
//       cartItems.push(selectedBook);
//       console.log("Book added to cart: ", selectedBook);
//     } else {
//       console.log("Book not found with ID: ", bookID);
//     }
//   }

// // Call the function to fetch books data
// fetchBooksData();


// //view cart
// function updateCartDisplay() {
//   let cartHTML = '';
//   let totalAmount = 0;

//   // Loop through cart items to display each item in the cart
//   cartItems.forEach(item => {
//     const book = booksData.find(book => book.id === item.id);
//     if (book) {
//       const subtotal = item.quantity * parseFloat(book.price.replace('$', ''));
//       totalAmount += subtotal;

//       cartHTML += `
//         <div class="card mb-3 mx-1 my-4">
//           <div class="card-body">
//             <h5 class="card-title">${book.title}</h5>
//             <p class="card-text">Price: ${book.price}</p>
//             <p class="card-text">Quantity: <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${book.id}, this.value)"> <button onclick="removeFromCart(${book.id})">Remove</button></p>
//             <p class="card-text">Subtotal: $${subtotal.toFixed(2)}</p>
//           </div>
//         </div>
//       `;
//     }
//   });

//   // Display cart items and total amount
//   document.getElementById("cartDisplay").innerHTML = cartHTML;
//   document.getElementById("totalAmount").textContent = `$${totalAmount.toFixed(2)}`;
// }


//gpt
let cartItems = []; // Define cartItems globally to hold the cart items
let booksData = []; // Define booksData globally to hold book information

// Function to fetch books data from books.json
function fetchBooksData() {
  fetch('books.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      return response.json();
    })
    .then(books => {
      booksData = books; // Assign the fetched array of books to the booksData variable
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
}

// Function to add a book to the cart
function addtoCart(bookID) {
  const selectedBook = booksData.find(book => book.id == bookID);
  if (selectedBook) {
    cartItems.push(selectedBook);
    console.log("Book added to cart: ", selectedBook);
  } else {
    console.log("Book not found with ID: ", bookID);
  }
}

// Function to remove a book from the cart
function removeFromCart(bookID) {
  cartItems = cartItems.filter(book => book.id != bookID);
  updateCartDisplay();
}

// Function to update the quantity of a book in the cart
function updateQuantity(bookID, newQuantity) {
  const bookIndex = cartItems.findIndex(book => book.id == bookID);
  if (bookIndex !== -1) {
    cartItems[bookIndex].quantity = parseInt(newQuantity);
  }
  updateCartDisplay();
}

// Function to update the display of cart items on cart.html
function updateCartDisplay() {
  let cartHTML = '';
  let totalAmount = 0;

  // Loop through cart items to display each item in the cart
  cartItems.forEach(item => {
    const book = booksData.find(book => book.id === item.id);
    if (book) {
      const subtotal = item.quantity * parseFloat(book.price.replace('$', ''));
      totalAmount += subtotal;

      cartHTML += `
        <div class="card mb-3 mx-1 my-4">
          <div class="card-body">
            <h5 class="card-title">${book.title}</h5>
            <p class="card-text">Price: ${book.price}</p>
            <p class="card-text">Quantity: <input type="number" min="1" value="${item.quantity}" onchange="updateQuantity(${book.id}, this.value)"> <button onclick="removeFromCart(${book.id})">Remove</button></p>
            <p class="card-text">Subtotal: $${subtotal.toFixed(2)}</p>
          </div>
        </div>
      `;
    }
  });

  // Display cart items and total amount
  document.getElementById("cartDisplay").innerHTML = cartHTML;
  document.getElementById("totalAmount").textContent = `$${totalAmount.toFixed(2)}`;
}

// Call the function to fetch books data when the cart.html page loads
fetchBooksData();

