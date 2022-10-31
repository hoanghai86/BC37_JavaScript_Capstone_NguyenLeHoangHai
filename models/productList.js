class ProductsList extends Product {
  constructor(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    desc,
    type
  ) {
    super(id, name, price, screen, backCamera, frontCamera, img, desc, type);
  }

  //render ra màn hình
  render() {
    return `
            <div class="col-lg-3 col-md-6 animate__animated animate__fadeIn">
          <div class="product h-100">
            <div class="product-image">
              <a href="shop-detail.html?id=${this.id}&test=abc" 
                ><img
                  class="img-fluid"
                  src="${this.img}"
                  alt="Fur coat with very but very very long name"
                                  
              /></a>
            </div>
            <div class="py-2 px-3 text-center">
              <h3 class="h5 text-uppercase mb-3">
                <a class="reset-link" href="shop-detail.html" onclick="setProductDetail('${this.id}')">${this.name}</a>
              </h3>
              <div class="price">
                <div class="unit-price-old">₫ 2.140.000</div>
                -
                <div class="unit-price-new">₫ ${this.price.toLocaleString()}</div>
                <div class="screen">${this.screen}</div>
                <div class="back-camera">${this.backCamera}</div>
                <div class="front-camera">${this.frontCamera}</div>
                <div class="desc">${this.desc}</div>
                <div class="type d-none">${this.type}</div>
              </div>
              <div class="item-rating">
                <p>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-solid fa-star"></i>
                  <i class="fa-regular fa-star"></i>
                </p>
                <p class="item-rating-total">1498</p>
              </div>


            </div>
            <ul class="list-unstyled p-0 ribbon-holder mb-0"></ul>
          </div>
          </div>

  `;
  }
}
