// delgetstei ajillah controller
var uiController = (function () {})();

// sanhvvtei ajillah controller
var financeController = (function () {})();

// programmiig holboh controller
var appController = (function (uiController, financeController) {
  //towchtoi bolon cursort ogodol damjuulah func
  var addItem = function () {
    console.log("ogodol oruulla");
  };

  //towch deer darhad addItem ajillah func
  document.querySelector(".add__btn").addEventListener("click", function () {
    addItem();
  });

  //enter darhad addItem ajillah func
  document.addEventListener("keypress", function () {
    if (event.keyCode === 13 || event.which === 13) {
      addItem();
    }
  });
})(uiController, financeController);
