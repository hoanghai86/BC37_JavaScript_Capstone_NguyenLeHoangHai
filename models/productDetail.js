
class ProductDetail extends Product{
    constructor(id, name, price, screen, backCamera, frontCamera, img, desc, type) {
        super(id, name, price, screen, backCamera, frontCamera, img, desc, type)
}

    render(){
        return `
        <div class="col-lg-4 animate__animated animate__fadeIn">
        <img src="${this.img}" alt="" style="width: 100%;">
      </div>

      <div class="col-lg-4 animate__animated animate__fadeIn">
        <table class="table table-striped">
          <h3>Thông số/ Cấu hình</h3>
          <tbody>
            <tr>
              <td>Điện thoại</td>
              <td>${this.name}</td>
            </tr>
            <tr>
              <td>Công nghệ màn hình</td>
              <td>${this.screen}</td>
            </tr>
            <tr>
              <td>Hệ điều hành</td>
              <td>iOS 16</td>
            </tr>
            <tr>
              <td>Camera trước</td>
              <td>${this.frontCamera}</td>
            </tr>
            <tr>
              <td>Camera sau</td>
              <td>${this.backCamera}</td>
            </tr>
            <tr>
              <td>Mô tả</td>
              <td>${this.desc}</td>
            </tr>

          </tbody>
        </table>
      </div>

      <div class="col-lg-4 d-flex flex-column justify-content-between animate__animated animate__fadeIn">
        <div class="p-4 p-lg-5 border mb-5 bg-light">
          <form action="#">
            
            
            <p class="h1 text-danger mb-4 text-center fw-bold">đ ${this.price.toLocaleString()}</p>
           
            <div class="row align-items-center row-quantity justify-content-md-center">
            <span class="col-5">Số lượng</span>
            <button class="col-2 btn-minus" type="button" onclick="changeNumberOfUnits('minus',${this.id})">-</button>
            <input
              class="col-3 text-center quantity"
              type="number"
              role="spinbutton"
              aria-valuenow="1"
              value="1"
              min="1"
              id="inputQuantity-${this.id}"
            />
            <button class="col-2 btn-plus" type="button" onclick="changeNumberOfUnits('plus',${this.id})">+</button>
          </div>

            <p class="text-center row mt-2">
            <a class="btn btn-warning col me-1" type="button" onclick="addToCart('${this.id}')"><i class="fas fa-shopping-cart"></i>Thêm vào giỏ hàng</a>
            <a class="btn btn-danger col ms-1" role="button" onclick="buyNow('${this.id}')">Mua ngay</a>
            </p>
          </form>
        </div>
        
      </div>

        `;
    }
}