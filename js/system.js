let productList = [];

//fetch dữ liệu API
const fetchProductList = async () => {
  try {
    const res = await axios({
      url: "https://633ce4277e19b1782903a4e4.mockapi.io/QLSP",
      method: "GET",
    });
    productList = mapData(res.data);
    renderProductList(productList);
  } catch (error) {
    console.log(error);
  }
};

const mapData = (data) => {
  const result = [];
  data.forEach((oldItem) => {
    //bóc tách phần từ
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
    } = oldItem;
    result.push(
      new Product(
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

const renderProductList = (data) => {
  if (!data) data = productList;
  let tableHTML = "";
  for (let item of data) {
    item.price = +item.price; //chuyển từ string sang number cho trường price

    let currentItem = item;

    tableHTML += `
    <tr class="text-sm">

        <td class="align-middle border-gray-300 py-3">${currentItem.id}</td>

        <td class="align-middle border-gray-300 py-3"><a href="shop-detail.html?id=${
          currentItem.id
        }"><img class="img-fluid flex-shrink-0" src="${
      currentItem.img
    }" alt="White Blouse Armani" style="min-width: 50px" width="50"></a></td>

        <td class="align-middle border-gray-300 py-3"><a href="shop-detail.html?id=${
          currentItem.id
        }">${currentItem.name}</a></td>
 
        <td class="align-middle border-gray-300 py-3">${currentItem.price.toLocaleString()}</td>

        <td class="align-middle border-gray-300 py-3">${currentItem.type}</td>
        
        <td class="align-middle border-gray-300 py-3">
          <button class="btn btn-link p-0" type="button" data-bs-toggle="modal" data-bs-target="#myModal" onclick="getDataToFormModal('${
            currentItem.id
          }')"><i class="fa-solid fa-pen-to-square fs-4"></i></button>
        </td>

        <td class="align-middle border-gray-300 py-3">
          <button class="btn btn-link p-0" type="button" onclick="deleteProductList('${
            currentItem.id
          }')"><i class="fas fa-trash-alt fs-4"></i></button>
        </td>

      </tr>
    `;
  }
  document.getElementById("tbodyCart").innerHTML = tableHTML;
};

//tạo sản phẩm mới trong danh mục
const createProductList = () => {
  let isFormValid = validateForm();
  if (!isFormValid) return;

  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("backCamera").value;
  let frontCamera = document.getElementById("frontCamera").value;
  let img = document.getElementById("img").value;
  let desc = document.getElementById("desc").value;
  let type = document.getElementById("type").value;

  let newProduct = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  axios({
    url: "https://633ce4277e19b1782903a4e4.mockapi.io/QLSP",
    method: "POST",
    data: newProduct,
  })
    .then(function () {
      fetchProductList();
      document.getElementById("btnReset").click();
    })
    .catch(function (error) {
      console.log(error);
    });
    
    onLoadCartNumbers();
};

//lấy thông tin của sản phẩm cần sửa lên form modal
const getDataToFormModal = async (id) => {
  try {
    const res = await axios({
      url: "https://633ce4277e19b1782903a4e4.mockapi.io/QLSP/" + id,
      method: "GET",
    });
    let product = res.data;
    document.getElementById("id").value = product.id;
    document.getElementById("name").value = product.name;
    document.getElementById("price").value = product.price;
    document.getElementById("screen").value = product.screen;
    document.getElementById("backCamera").value = product.backCamera;
    document.getElementById("frontCamera").value = product.frontCamera;
    document.getElementById("img").value = product.img;
    document.getElementById("desc").value = product.desc;
    document.getElementById("type").value = product.type;

    document.getElementById("id").disabled = true; //khóa input id
    document.getElementById("btnSave").disabled = true;
  } catch (error) {
    console.log(error);
  }
};

const updateProductList = () => {
  let isFormValid = validateForm();
  if (!isFormValid) return;

  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("backCamera").value;
  let frontCamera = document.getElementById("frontCamera").value;
  let img = document.getElementById("img").value;
  let desc = document.getElementById("desc").value;
  let type = document.getElementById("type").value;

  let newProduct = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  );

  axios({
    url: "https://633ce4277e19b1782903a4e4.mockapi.io/QLSP/" + id,
    method: "PUT",
    data: newProduct,
  })
    .then(function () {
      fetchProductList();
      document.getElementById("btnReset").click();
    })
    .catch(function (error) {
      console.log(error);
    });

  document.getElementById("btnClose").click();
};

//xóa một sản phẩm trong danh mục
const deleteProductList = async (id) => {
  try {
    const res = await axios({
      url: "https://633ce4277e19b1782903a4e4.mockapi.io/QLSP/" + id,
      method: "DELETE",
    });
    fetchProductList();
    onLoadCartNumbers();
  } catch (error) {
    console.log(error);
  }
};

//VALIDATION FORM
const validateForm = () => {
  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("backCamera").value;
  let frontCamera = document.getElementById("frontCamera").value;
  let img = document.getElementById("img").value;
  let desc = document.getElementById("desc").value;
  let type = document.getElementById("type").value;

  var isValid = true;
  isValid &= checkRequire(id, "tbId");
  isValid &=
    checkRequire(name, "tbName") &&
    checkLength(name, "tbName", 1, 50);
  isValid &= checkRequire(price, "tbPrice");
  isValid &=
    checkRequire(screen, "tbScreen") && checkLength(screen, "tbScreen", 1, 50);
  isValid &=
    checkRequire(backCamera, "tbBackCamera") &&
    checkLength(backCamera, "tbBackCamera", 1, 50);
  isValid &=
    checkRequire(frontCamera, "tbFrontCamera") &&
    checkLength(frontCamera, "tbFrontCamera", 1, 50);
  isValid &= checkRequire(img, "tbImg");
  isValid &= checkRequire(desc, "tbDesc") && checkLength(desc, "tbDesc", 1, 256);
  isValid &= checkRequire(type, "tbType");

  return isValid;
};

//không được nhập trống
const checkRequire = (val, spanId) => {
  if (val.length === 0) {
    document.getElementById(spanId).innerHTML = "*Trường này bắt buộc nhập !!!";
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};

//không được thêm trùng tên sản phẩm
const checkDouble = (val, spanId) => {
  for (let item of productList) {
    if (item.name === val) {
      document.getElementById(spanId).innerHTML = "*Sản phẩm bị trùng !!!";
      return false;
    }
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};

//kiểm tra độ dài ký tự
const checkLength = (val, spanId, min, max) => {
  if (val.length <= min || val.length >= max) {
    document.getElementById(
      spanId
    ).innerHTML = `*Độ dài phải từ ${min} tới ${max} ký tự !!!`;
    return false;
  }
  document.getElementById(spanId).innerHTML = "";
  return true;
};

//kiểm tra chỉ cho nhập số number
const checkNumber = (val, spanId) => {
  let pattern = /^([0-9])\w+/g;
  if (pattern.test(val)) {
    document.getElementById(spanId).innerHTML = "";
    return true;
  }
  document.getElementById(spanId).innerHTML =
    "*Trường này chỉ được nhập số !!!";
  return false;
};

//reset form modal trước khi nhập liệu
const resetInputFormModal = () => {
  document.getElementById("btnReset").click();
  document.getElementById("id").disabled = false;
  document.getElementById("tbId").innerHTML = "";
  document.getElementById("tbName").innerHTML = "";
  document.getElementById("tbPrice").innerHTML = "";
  document.getElementById("tbScreen").innerHTML = "";
  document.getElementById("tbBackCamera").innerHTML = "";
  document.getElementById("tbFrontCamera").innerHTML = "";
  document.getElementById("tbImg").innerHTML = "";
  document.getElementById("tbDesc").innerHTML = "";
  document.getElementById("tbType").innerHTML = "";
};

//hàm tính tổng số lượng sản phẩm trong kho, sau khi tính tổng thì xuất ra giao diện luôn
const onLoadCartNumbers = async () => {
  try {
    const res = await axios({
      url: "https://633ce4277e19b1782903a4e4.mockapi.io/QLSP",
      method: "GET",
    });
    productList = mapData(res.data);
    let total = productList.length;
    document.getElementById("haveItemInCart").textContent =
      "You currently have " + total + " item(s) in your cart.";
  } catch (error) {
    console.log(error);
  }
};

window.onload = function () {
  fetchProductList();
  onLoadCartNumbers();
};
