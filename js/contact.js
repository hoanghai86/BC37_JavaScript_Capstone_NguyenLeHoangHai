//lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("Cart")) || [];

//hàm tính tổng số lượng sản phẩm trong giỏ hàng, sau khi tính tổng thì xuất ra giao diện luôn
const onLoadCartNumbers = () => {
  let total = 0;
  cart.forEach((item) => (total += item.numberOfUnit));
  document.getElementById("totalNumberInCart").textContent = total;
};



window.onload = function () {

    onLoadCartNumbers();

    document.getElementById("proceedToCheckOut").addEventListener("click",proceedToCheckout);
  };
  