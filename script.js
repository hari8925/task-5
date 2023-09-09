const btncart = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const btnclose = document.querySelector("#cart-close");

btncart.addEventListener("click", () => {
  cart.classList.add("cart-active");
});

btnclose.addEventListener("click", () => {
  cart.classList.remove("cart-active");
});

document.addEventListener("DOMContentLoaded", loadfood);

function loadfood() {
  loadcontent();
}
function loadcontent() {
  //remov food items from cart
  let btnremove = document.querySelectorAll(".cart-remove");
  btnremove.forEach((btn) => {
    btn.addEventListener("click", removeItem);
  });

  //product item change event
  let qtyelements = document.querySelectorAll(".cart-quantity");
  qtyelements.forEach((input) => {
    input.addEventListener("change", changeqty);
  });

  //product cart
  let btnaddcart = document.querySelectorAll(".add-cart");
  btnaddcart.forEach((btn) => {
    btn.addEventListener("click", addcart);
  });

  update();
}
//remove item
function removeItem() {
  if (confirm("are you sure you want to remove")) {
    let title = this.parentElement.querySelector(".cart-food-tittle").innerHTML;
    itemlist = itemlist.filter((el) => el.title != title);
    this.parentElement.remove();
    loadcontent();
  }
}
//change quantity

function changeqty() {
  if (isNaN(this.value) || this.value < 1) {
    this.value = 1;
  }
  loadcontent();
}

let itemlist = [];

//add cart

function addcart() {
  //checking ok
  let food = this.parentElement; //ok
  console.log(food);
  let title = food.querySelector(".card-title").innerHTML;
  let price = food.querySelector(".card-price").innerHTML;
  let image = food.querySelector(".food-img").src;
  //console.log(title, price, image);

  let newproductname = { title, price, image };

  //check product alredy exist
  if (itemlist.find((el) => el.title == newproductname.title)) {
    alert("product alredy exist");
    return;
  } else {
    itemlist.push(newproductname);
  }
  let newproduct = createcardproduct(title, price, image);
  let element = document.createElement("div");
  element.innerHTML = newproduct;
  let cartbasket = document.querySelector(".cart-content");

  cartbasket.append(element);
  loadcontent();
}

function createcardproduct(title, price, image) {
  return `<div class="cart-box" >
  <img
    class="cart-img"
    src="${image}"
  />
  <div class="detail-box">
    <div class="cart-food-tittle">${title}</div>
    <div class="price-box">
      <div class="cart-price">${price}</div>
      <div class="cart-amt">${price}</div>
    </div>
    <input type="number" value="1" class="cart-quantity" />
  </div>
  <i class="fa-solid fa-trash-can cart-remove"></i>
</div>`;
}
function update() {
  const cartitems = document.querySelectorAll(".cart-box");
  const totalvalue = document.querySelector(".total-price");

  let total = 0;
  cartitems.forEach((product) => {
    let priceelement = product.querySelector(".cart-price");
    let price = parseFloat(priceelement.innerHTML.replace("Rs.", ""));
    let qty = product.querySelector(".cart-quantity").value;
    total += price * qty;
    product.querySelector(".cart-amt").innerText = "RS." + price * qty;
  });
  totalvalue.innerHTML = "Rs." + total;

  //add product count
  const cartcount = document.querySelector("#cart-count");

  let count = itemlist.length;
  cartcount.innerHTML = count;

  if (count == 0) {
    cartcount.style.display = "none";
  } else {
    cartcount.style.display = "inline-block";
  }
}
