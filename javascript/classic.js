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
    if (book.category == "Classic") {
      

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
                <button type="button" class="btn custom-button text-light" id="button-style">View Cart</button>
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

// add to cart
  //functionality for add to cart 
//   let cartItems = [];
// let booksData = []; // Renamed from booksdata to booksData to avoid confusion

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
//     })
//     .catch(error => {
//       console.error('Error fetching data: ', error);
//     });
// }

// function addtoCart(bookID) {
//   alert('Book added to cart');
//   const selectedBook = booksData.find(book => book.id === bookID);

//   if (selectedBook) {
//     // Add the selected book to the cart if it exists
//     cartItems.push(selectedBook);
//     console.log("Book: ", selectedBook);
//   } else {
//     console.log("Book not found with ID: ", bookID);
//   }
// }

// // Call the function to fetch books data
// fetchBooksData();
let cartItems = [];
let booksData = [];

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

      // Loop through all the books and add them to cartItems
      // booksData.forEach(book => {
      //   addtoCart(book.id);
      // });

     
    })
    .catch(error => {
      console.error('Error fetching data: ', error);
    });
}

function addtoCart(bookID) {
    const selectedBook = booksData.find(book => book.id == bookID);
    if (selectedBook) {
      cartItems.push(selectedBook);
      console.log("Book added to cart: ", selectedBook);
    } else {
      console.log("Book not found with ID: ", bookID);
    }
  }

// Call the function to fetch books data
fetchBooksData();
