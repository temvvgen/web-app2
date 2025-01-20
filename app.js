// delgetstei ajillah controller
var uiController = (function () {
  return {
    getInput: function () {
      return {
        type: document.querySelector(".add__type").value,
        describtion: document.querySelector(".add__description").value,
        money: document.querySelector(".add__value").value,
      };
    },
  };
})();

// sanhvvtei ajillah controller
var financeController = (function () {})();

// programmiig holboh controller
var appController = (function (uiController, financeController) {
  var addController = function () {
    console.log(uiController.getInput());
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    addController();
  });

  document.addEventListener("keypress", function () {
    if (event.keyCode === 13) {
      addController();
    }
  });
})(uiController, financeController);
