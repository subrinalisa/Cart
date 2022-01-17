// Fetching Dom Element
const table = document.querySelector('.book-table tbody');
const bookPrice = document.querySelectorAll('.book-price');
const cartAlert = document.querySelector('.alert');
const emptyCart = document.querySelector('#empty-cart');
const noItem = document.querySelector('.no-item');
const shippingAddress = document.querySelector('.shipping-address');
const carTotal = document.querySelector('.cart-total');
const subTotal = document.querySelector('.sub-total');
const shippingCost = document.querySelector('.shipping-cost');
const totalCost = document.querySelector('.total-cost');
const payCost = document.querySelector('.payable-cost');

// Cart Price
const cartSum = () => {
    let sum = 0;
    for (i = 0; i < bookPrice.length; i++) {
        sum += parseInt(bookPrice[i].textContent);
    }
    carTotal.textContent = sum;
    subTotal.textContent = carTotal.textContent;
    totalCost.textContent = parseInt(subTotal.textContent) + parseInt(shippingCost.textContent);
    payCost.textContent = totalCost.textContent;
}

// Shipping Price
shippingAddress.addEventListener('change', function () {
    let v = this.value;
    if (v == 1) {
        shippingCost.textContent = 50;
    } else if (v == 2) {
        shippingCost.textContent = 100;
    }
    cartSum();
});

// Quantity Update
const quantityUpdate = (quantityInput, quantity, indexNo) => {
    quantityInput.value = quantity;
    bookPrice[indexNo].textContent = quantity * priceList[indexNo];
    cartSum();
}

// Delete Item
const deleteItem = (tr, bookName, indexNo, quantityInput) => {
    tr.style.display = 'none';
    cartAlert.style.display = 'block';
    cartAlert.innerHTML = `
    <strong class="me-2">${bookName}</strong>is removed from cart. <button type="button" class="undo-btn">Undo</button>
    <button type="button" class="btn-close"></button>
    `;
    quantityUpdate(quantityInput, 0, indexNo);
    cartAlert.addEventListener('click', (e) => {
        const undo = e.target.classList.contains('undo-btn');
        const closeBtn = e.target.classList.contains('btn-close');
        if (undo) {
            tr.style.display = 'table-row';
            cartAlert.style.display = 'none';
            quantityUpdate(quantityInput, 1, indexNo);
        } else if (closeBtn) {
            tr.remove();
            cartAlert.style.display = 'none';
            quantityUpdate(quantityInput, 0, indexNo);
        }
    });
}

// Table Operation
table.addEventListener('click', (e) => {
    const eTarget = e.target;
    const deleteBtn = eTarget.classList.contains('delete-btn');
    const plusBtn = eTarget.classList.contains('increment-btn');
    const minusBtn = eTarget.classList.contains('decrement-btn');
    const tr = eTarget.closest('tr');
    const quantityInput = tr.querySelector('.quantity-input');
    let quantity = parseInt(quantityInput.value);
    const bookName = tr.querySelector('.book-name').textContent;
    const price = tr.querySelector('.book-price');
    const indexNo = Array.prototype.indexOf.call(table.children, tr);
    if (deleteBtn) {
        deleteItem(tr, bookName, indexNo, quantityInput);
    } else if (plusBtn) {
        ++quantity;
        quantity = quantity >= 10 ? 10 : quantity;
        quantityUpdate(quantityInput, quantity, indexNo);
    } else if (minusBtn) {
        --quantity;
        quantity = quantity <= 1 ? 1 : quantity;
        quantityUpdate(quantityInput, quantity, indexNo);
    }
});

// Empty Cart
emptyCart.addEventListener('click', (e) => {
    table.innerHTML = '';
    if (table.childElementCount) {
        noItem.style.display = 'none';
    } else {
        noItem.style.display = 'block';
    }
});

/*------- Basic --------*/
let priceList = [];
[...bookPrice].forEach((element, index) => {
    priceList[index] = parseInt(element.textContent);
});
shippingCost.textContent = 50;
cartSum();