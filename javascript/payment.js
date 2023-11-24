document.addEventListener("DOMContentLoaded", function() {
    const cartTableBody = document.getElementById('cartTableBody');
    const totalAmount = document.getElementById('totalAmount');

    // Retrieve cart items from localStorage
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Display payment receipt table based on cart items
    function displayReceiptTable() {
        cartTableBody.innerHTML = '';
        let totalPrice = 0;

        if (cartItems.length > 0) {
            cartItems.forEach((book, index) => {
                // Increment index to start from 1
                const quantity = book.quantity || 1;
                const total = parseFloat(book.price) * quantity;

                const tableRow = `
                    <tr>
                        <th scope="row">${index + 1}</th>
                        <td>${book.title}</td>
                        <td>${book.description}</td>
                        <td>$${book.price}</td>
                        <td>${quantity}</td>
                        <td>$${total.toFixed(2)}</td>
                    </tr>
                `;
                cartTableBody.innerHTML += tableRow;
                totalPrice += total;
            });
        } else {
            cartTableBody.innerHTML = '<tr><td colspan="6">No items in the cart.</td></tr>';
        }

        // Display total amount
        totalAmount.textContent = `$${totalPrice.toFixed(2)}`;
    }

    displayReceiptTable(); // Display payment receipt table when the page loads
});