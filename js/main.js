// Adding product to the table

var products = document.getElementsByClassName("form-control");
var addBtn = document.getElementById("addBtn");
var nameAlert = document.getElementById("nameAlert");
var priceAlert = document.getElementById("priceAlert");
var tableBody = document.getElementById("tableBody");

var productsArr = [];

// Getting data from local storage if exist.
if (JSON.parse(localStorage.getItem("products")) != null) {
  productsArr = JSON.parse(localStorage.getItem("products"));
  display();
}

// product name regex
var nameRegex = /^[A-Z][a-z]{2,12}$/;

// product price regex
var priceRegex = /^\d/;

function checkNameValidation() {
  var isProductNameValid = nameRegex.test(products[0].value);

  // checking for product name validation
  if (!isProductNameValid) {
    products[0].classList.add("is-invalid");
    products[0].classList.remove("is-valid");
    nameAlert.classList.remove("d-none");
    addBtn.disabled = true;

    return false;
  } else {
    products[0].classList.add("is-valid");
    products[0].classList.remove("is-invalid");
    nameAlert.classList.add("d-none");
    addBtn.removeAttribute("disabled");

    return true;
  }
}
function checkPriceValidation() {
  var isProductPriceValid = priceRegex.test(products[1].value);

  // checking for product price validation
  if (!isProductPriceValid) {
    products[1].classList.add("is-invalid");
    products[1].classList.remove("is-valid");
    priceAlert.classList.remove("d-none");
    addBtn.disabled = true;

    return false;
  } else {
    products[1].classList.add("is-valid");
    products[1].classList.remove("is-invalid");
    priceAlert.classList.add("d-none");
    addBtn.removeAttribute("disabled");

    return true;
  }
}

// checking for product name validation
products[0].onkeyup = checkNameValidation;

// checking for price name validation
products[1].onkeyup = checkPriceValidation;

function addProduct() {
  var product = {
    name: products[0].value,
    price: products[1].value,
    category: products[2].value,
    description: products[3].value,
  };

  productsArr.push(product);
  display();
  clear();
}

function display() {
  var trs = "";

  for (var i = 0; i < productsArr.length; i++) {
    trs += `<tr>
        <td>${i + 1}</td>
        <td>${productsArr[i].name}</td>
        <td>${productsArr[i].price}</td>
        <td>${productsArr[i].category}</td>
        <td>${productsArr[i].description}</td>
        <td><button onclick='deleteProduct(${i})' class="btn btn-danger">Delete</button></td>
        <td><button onclick='updateData(${i})' class="btn btn-warning">Update</button></td>
        </tr>`;
  }
  tableBody.innerHTML = trs;
  localStorage.setItem("products", JSON.stringify(productsArr));
}

function clear() {
  for (var i = 0; i < products.length; i++) {
    products[i].value = "";
  }
}

function deleteProduct(index) {
  productsArr.splice(index, 1);
  display();
}

addBtn.onclick = function () {
  if (addBtn.innerHTML == "Add Product") {
    addProduct();
  } else {
    updateProduct();
  }
};
var indexOfProduct;
function updateData(index) {
  indexOfProduct = index;
  products[0].value = productsArr[index].name;
  products[1].value = productsArr[index].price;
  products[2].value = productsArr[index].category;
  products[3].value = productsArr[index].description;

  addBtn.innerHTML = "Update Product";
}

function updateProduct() {
  productsArr[indexOfProduct].name = products[0].value;
  productsArr[indexOfProduct].price = products[1].value;
  productsArr[indexOfProduct].category = products[2].value;
  productsArr[indexOfProduct].description = products[3].value;
  display();
  clear();
  addBtn.innerHTML = "Add Product";
}

products[4].onkeyup = search;
function search() {
  var trs = "";
  for (var i = 0; i < productsArr.length; i++) {
    if (
      productsArr[i].name
        .toLowerCase()
        .includes(products[4].value.toLowerCase())
    ) {
      trs += `<tr>
                <td>${i + 1}</td>
                <td>${productsArr[i].name}</td>
                <td>${productsArr[i].price}</td>
                <td>${productsArr[i].category}</td>
                <td>${productsArr[i].description}</td>
                <td><button onclick='deleteProduct(${i})' class="btn btn-danger">Delete</button></td>
                <td><button onclick='updateData(${i})' class="btn btn-warning">Update</button></td>
                </tr>`;
    }
  }
  tableBody.innerHTML = trs;
}
