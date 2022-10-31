//lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("Cart")) || [];

//hàm tính tổng số lượng sản phẩm trong giỏ hàng, sau khi tính tổng thì xuất ra giao diện luôn
const onLoadCartNumbers = () => {
  let total = 0;
  cart.forEach((item) => (total += item.numberOfUnit));
  document.getElementById("totalNumberInCart").textContent = total;
  document.getElementById("haveItemInCart").textContent =
    "You currently have " + total + " item(s) in your cart.";
};

//hàm tính tổng tiền các sản phẩm, sau khi tính xong thì xuất ra giao diện
const onLoadCartSubtotal = () => {
  let subTotal = 0;
  let total = 0;
  let ship = 0;
  let tax = 0;
  cart.forEach((item) => (subTotal += item.calcMoney()));
  ship = parseInt(subTotal * 0.05);
  tax = parseInt(subTotal * 0.1);
  total = parseInt(subTotal + ship + tax);
  document.getElementById("cartSubtotal1").textContent =
    subTotal.toLocaleString() + " đ";
  document.getElementById("cartSubtotal2").textContent =
    subTotal.toLocaleString() + " đ";
  document.getElementById("shipCost").textContent =
    ship.toLocaleString() + " đ";
  document.getElementById("taxCost").textContent = tax.toLocaleString() + " đ";
  document.getElementById("cartSubtotal3").textContent =
    total.toLocaleString() + " đ";
};

//mapdata để có lại phương thức tính thành tiền nên file basket.js
const mapData = () => {
  let result = [];
  for (let item of cart) {
    let oldItem = item;
    let newItem = new Basket(
      oldItem.id,
      oldItem.name,
      oldItem.numberOfUnit,
      oldItem.price,
      oldItem.screen,
      oldItem.backCamera,
      oldItem.frontCamera,
      oldItem.img,
      oldItem.desc,
      oldItem.type
    );
    result.push(newItem);
  }
  return result;
};

//lưu giỏ hàng xuống localStorage
const setCartList = () => {
  let cartJSON = JSON.stringify(cart);
  localStorage.setItem("Cart", cartJSON);
};

//lấy giỏ hàng từ localStorage lên
const getCartList = () => {
  let cartJSON = localStorage.getItem("Cart");
  if (!cartJSON) return;
  cart = mapData(JSON.parse(cartJSON));
  renderCart(cart);

  //nếu giỏ hàng trống thì vô hiệu nút thanh toán
  if (cart.length === 0) {
    document.getElementById("proceedToCheckOut").disabled = true;
  } else {
    document.getElementById("proceedToCheckOut").disabled = false;
  }
};

const renderCart = (data) => {
  if (!data) data = cart;

  let tableHTML = "";
  for (var i = 0; i < data.length; i++) {
    //   for (let item of cartlist){
    let currentItem = data[i];

    tableHTML += `
        
        <tr class="text-sm">
        <td class="align-middle border-gray-300 py-3"><a href="shop-detail.html?id=${
          currentItem.id
        }"><img class="img-fluid flex-shrink-0" src="${
      currentItem.img
    }" alt="White Blouse Armani" style="min-width: 50px" width="50"></a></td>
        <td class="align-middle border-gray-300 py-3"><a href="shop-detail.html?id=${
          currentItem.id
        }">${currentItem.name}</a></td>
        <td class="align-middle border-gray-300 py-3" style="width: 150px"> 
        <div class="row align-items-center row-quantity justify-content-md-start">
          <button class="col-3 btn-minus" type="button" onclick="changeNumberOfUnits('minus',${
            currentItem.id
          })">-</button>
          <input class="col-4 text-center" readonly="readonly" type="text" min="1" value="${
            currentItem.numberOfUnit
          }" >
          <button class="col-3 btn-plus" type="button" onclick="changeNumberOfUnits('plus',${
            currentItem.id
          })">+</button>
        
        </div>


        </td>
        <td class="align-middle border-gray-300 py-3">đ ${currentItem.price.toLocaleString()}</td>
        <td class="align-middle border-gray-300 py-3">đ 0.00</td>
        <td class="align-middle border-gray-300 py-3" style="width: 100px">đ ${currentItem
          .calcMoney()
          .toLocaleString()}</td>
        <td class="align-middle border-gray-300 py-3">
          <button class="btn btn-link p-0" type="button" onclick="deleteCartItem('${
            currentItem.id
          }')"><i class="fas fa-trash-alt fs-4"></i></button>
        </td>
      </tr>

        `;
  }
  document.getElementById("tbodyCart").innerHTML = tableHTML;
};

//tìm vị trí sản phẩm trong giỏ hàng
const findByID = (id) => {
  for (let i in cart) {
    if (cart[i].id == id) {
      return i;
    }
  }
  return -1;
};

//xóa sản phẩm trong giỏ hàng
const deleteCartItem = (id) => {
  let index = findByID(id);
  cart.splice(index, 1);

  //nếu giỏ hàng trống thì vô hiệu nút thanh toán
  if (cart.length === 0) {
    document.getElementById("proceedToCheckOut").disabled = true;
  }

  renderCart();
  setCartList();
  onLoadCartNumbers();
  onLoadCartSubtotal();
};

//hàm thay đổi số lượng sản phẩm trong giỏ hàng
const changeNumberOfUnits = (action, id) => {
  cart = cart.map((item) => {
    let numberOfUnit = item.numberOfUnit;
    if (item.id == id) {
      if (action === "minus" && numberOfUnit > 1) {
        numberOfUnit--;
      } else if (action === "plus") {
        numberOfUnit++;
      }
    }

    return {
      ...item,
      numberOfUnit,
    };
  });
  renderCart();
  onLoadCartNumbers();
  onLoadCartSubtotal();
  setCartList();
};

//code nút thanh toán thành công (proceed to checkout)
const proceedToCheckout = () => {
  cart = [];
  setCartList();
  document.getElementById("proceedToCheckOut").disabled = false;
};

//code nút xóa toàn bộ giỏ hàng
const deleteAllItemInCart = () =>{
  cart = [];
  document.getElementById("proceedToCheckOut").disabled = true;
  renderCart();
  onLoadCartNumbers();
  onLoadCartSubtotal();
  setCartList();
}

window.onload = function () {
  getCartList();
  onLoadCartNumbers();
  onLoadCartSubtotal();
  document
    .getElementById("proceedToCheckOut")
    .addEventListener("click", proceedToCheckout);
  document.getElementById("deleteAllItemInCart").addEventListener("click", deleteAllItemInCart);
};
