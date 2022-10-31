var productList = [];

//fetch dữ liệu API
const fetchProduct = async () => {
  // call API fetch productList
  try {
    const res = await axios({
      url: "https://633ce4277e19b1782903a4e4.mockapi.io/QLSP",
      method: "GET",
    });
    console.log(res);
    productList = mapData(res.data);
    renderProductList(productList);
  } catch (err) {
    console.log(err);
  }
};

//render danh mục điện thoại lên giao diện trang chính
const renderProductList = (data) => {
  if (!data) data = productList;
  var productListHTML = "";
  for (let i in data) {
    data[i].price = + data[i].price; //chuyển trường price từ chuỗi sang số
    productListHTML += data[i].render();
  }
  document.getElementById("productList").innerHTML = productListHTML;
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
      new ProductsList(
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

//tìm hãng sản xuất điện thoại
const selectPhoneBrand = () => {
  const arr = document.getElementsByClassName("phoneBrand");
  let brandType;
  let listBrandType = [];
  for (let input of arr) {
    if (input.checked) {
      brandType = input.value;
      listBrandType.push(brandType);
    }
  }

  if (listBrandType.length === 0) {
    renderProductList();
    return;
  }

  const search = [];
  for (let k of listBrandType) {
    for (let i of productList) {
      if (i.type === k) {
        search.push(i);
      }
    }
  }
  renderProductList(search);
};

//xem giới thiệu chi tiết sản phẩm, SET sản phẩm cần xem xuống localStorage
// const setProductDetail = (id) => {
//   let viewItem = []; //tạo 1 mảng rỗng để chứa id khi click vào tấm hình điện thoại, mảng này chỉ luôn có 1 phần tử vì 1 lần chỉ view 1 sản phẩm bên web shop-detail
//   const foundView = productList.find((product) => product.id === id);
//   viewItem.push({ ...foundView, numberOfUnit: 1 });

//   //lưu xuống localStorage
//   const productDetailJSON = JSON.stringify(viewItem);
//   localStorage.setItem("productDetail", productDetailJSON);
// };

//lấy giỏ hàng từ localStorage
let cart = JSON.parse(localStorage.getItem("Cart")) || [];

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
