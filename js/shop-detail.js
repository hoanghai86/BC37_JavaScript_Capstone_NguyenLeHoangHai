var productList = [];
var productDetail = [];

//fetch dữ liệu API
const fetchProduct = async () => {
  // 1.call API fetch productList
  try {
    const res = await axios({
      url: "https://633ce4277e19b1782903a4e4.mockapi.io/QLSP",
      method: "GET",
    });

    productList = mapData(res.data);
    const params = new URLSearchParams(window.location.search.substring(1));
    const id = params.get("id");

    //findById
    productDetail = findItemById(id);

    //render
    renderProductById(productDetail);
  } catch (err) {
    console.log(err);
  }
};

//render danh mục điện thoại lên giao diện trang chính
const renderProductById = (data) => {
  if (!data) data = productDetail;
  var productListHTML = "";
  data.price = +data.price;
  productListHTML += data.render();
  document.getElementById("productDetail").innerHTML = productListHTML;
};

//map dữ liệu API lên giao diện vì API không có phương thức
const mapData = (dataFormAPI) => {
  const result = [];
  dataFormAPI.forEach((oldProduct) => {
    const {
      id,
      name,
      price,
      screen,
      backCamera,
      frontCamera,
      img,
      desc,
      type,
    } = oldProduct;
    result.push(
      new ProductDetail(
        id,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
      )
    );
  });
  return result;
};

//tìm sản phẩm theo id
function findItemById(id) {
  for (let item of productList) {
    if (item.id == id) {
      return item;
    }
  }
}

//lưu giỏ hàng xuống localStorage
function setProductCart() {
  let cartJSON = JSON.stringify(cart);
  localStorage.setItem("Cart", cartJSON);
}

//lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("Cart")) || [];

//nút thêm vào giỏ hàng
const addToCart = (id) => {
  let unit = +document.getElementById(`inputQuantity-${id}`).value;

  // không cho thêm trùng mặt hàng vào giỏ hàng
  if (cart.find((cartItems) => cartItems.id === id)) {
    // alert("Sản phẩm đă có trong giỏ hàng !!!");
    //số lượng chọn mua không nhỏ hơn 1
    buyNow(id);
  } else if (unit < 1) {
    alert("Vui lòng chọn số lượng lớn hơn 0 !!!");
  } else {
    let cartItems = findItemById(id);
    //dấu ... là copy sản phẩm tìm được vào giỏ hàng cart, đồng thời thêm tiếp 1 thuộc tính numberOfUnit với số lượng do người dùng nhập vào
    cart.push({ ...cartItems, numberOfUnit: unit });
    setProductCart();
  }
  onLoadCartNumbers(); //render lại tổng mặt hàng
};

//nút tăng giảm số lượng
const changeNumberOfUnits = (action, id) => {
  var input = +document.getElementById(`inputQuantity-${id}`).value;
  if (action === "minus" && input > 1) {
    input--;
  } else if (action === "plus") {
    input++;
  }
  document.getElementById(`inputQuantity-${id}`).value = input;
};

//nút mua ngay
const buyNow = (id) => {
  let unit = +document.getElementById(`inputQuantity-${id}`).value;
  let oldUnit = 0;
  let cartItems = "";

  if ((cartItems = cart.find((cartItems) => cartItems.id === id))) {
    //nếu trong giỏ hàng đã có thì cộng dồn số lượng
    oldUnit = cartItems.numberOfUnit;
    var index = findIndexById(id);
    var product = cart[index];
    product.numberOfUnit = oldUnit + unit;
    setProductCart();
  } else {
    //nếu trong giỏ hàng chưa có gì thì push mới vào
    let cartItems = findItemById(id);
    cart.push({ ...cartItems, numberOfUnit: unit });
    setProductCart();
  }
  onLoadCartNumbers(); //render lại tổng mặt hàng
};

//tìm vị trí sản phẩm trong giỏ hàng để update số lượng (numberOfUnit)
function findIndexById(id) {
  for (let i in cart) {
    if (cart[i].id === id) {
      return i;
    }
  }
}

//hàm tính tổng số lượng sản phẩm trong giỏ hàng, sau khi tính tổng thì render luôn
const onLoadCartNumbers = () => {
  let total = 0;
  cart.forEach((item) => (total += item.numberOfUnit));
  document.getElementById("totalNumberInCart").textContent = total;
};


//code form login admin
const validateLoginAdmin = () => {
  let emailModal = document.getElementById("email_modal").value;
  let passwordModal = document.getElementById("password_modal").value;
  if (
    emailModal === "hainguyenlehoang86@gmail.com" &&
    passwordModal === "hainguyenlehoang86@gmail.com"
  ) {
    alert("Login successfully !!!");
    window.location = "system.html";
    return false;
  } else {
    alert("Wrong information !!!");
    return false;
  }
};

window.onload = function () {
  fetchProduct();
  onLoadCartNumbers();
};
