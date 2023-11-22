
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
      if (book.id === 1 || book.id === 2 || book.id === 3 || book.id === 7 || book.id === 12 || book.id === 18 || book.id === 26 || book.id === 28) {
        

        // Generate Bootstrap card HTML for each book
        let htmlSegment = `
          <div class="col-md-3">
            <div class="card mb-3 mx-1 my-4">
              <img src="${book.cover_image}" id="image" class="card-img-top" alt="Book Cover" >
              <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
                <p class="card-text">${book.description}</p>
                <p class="card-text">${book.price}</p>
                <div class="button-container">
                  <button type="button" class="btn custom-button text-light" id="button-style">Add to cart</button>
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


