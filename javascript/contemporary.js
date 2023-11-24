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
    if (book.category == "Contemporary") {
      let htmlSegment = `
        <div class="col-md-4">
          <div class="card mb-3 mx-1 my-4">
            <img src="${book.cover_image}" id="image" class="card-img-top" alt="Book Cover" >
            <div class="card-body">
              <h5 class="card-title">${book.title}</h5>
              <p class="card-text">${book.description}</p>
              <p class="card-text">$${book.price}</p>
              <div class="button-container">
                <button type="button" class="btn custom-button text-light" id="button-style" onclick="addtoCart(${book.id})">Add to cart</button>
                <button type="button" class="btn custom-button text-light" id="button-style" onclick="window.location.href='cart.html'">View Cart</button>
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
                booksData = books; 
              })
              .catch(error => {
                console.error('Error fetching data: ', error);
              });
          }
          
          function addtoCart(bookID) {
            const selectedBook = booksData.find(book => book.id == bookID);
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; 
          
            if (selectedBook) {
                const existingBook = cartItems.find(item => item.id === selectedBook.id);
          
                if (existingBook) {
                    existingBook.quantity++; 
                } else {
                    selectedBook.quantity = 1; 
                    cartItems.push(selectedBook);
                }
          
                localStorage.setItem('cartItems', JSON.stringify(cartItems)); 
                console.log("Book added to cart: ", selectedBook);
            } else {
                console.log("Book not found with ID: ", bookID);
            }
          }
          
          fetchBooksData();
          