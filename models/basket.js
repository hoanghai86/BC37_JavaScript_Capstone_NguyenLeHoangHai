function Basket(
  id,
  name,
  numberOfUnit,
  price,
  screen,
  backCamera,
  frontCamera,
  img,
  desc,
  type
) {
  this.id = id;
  this.name = name;
  this.numberOfUnit = numberOfUnit;
  this.price = price;
  this.screen = screen;
  this.backCamera = backCamera;
  this.frontCamera = frontCamera;
  this.img = img;
  this.desc = desc;
  this.type = type;

  //phương thức
  this.calcMoney = function () {
    return this.numberOfUnit * this.price;
  };
}
