//delgetstei ajillah controller
var uiController = (function () {
  return {
    getInfo: function () {
      return {
        type: document.querySelector(".add__type").value,
        description: document.querySelector(".add__description").value,
        value: document.querySelector(".add__value").value,
      };
    },
  };
})();

//sanhvvtei ajillah controller
var financeController = (function () {})();

//programmiig holboh controller
var appController = (function (uiController, financeController) {
  var addController = function () {
    var info = uiController.getInfo();
    console.log(info);
  };

  var setupEventListener = function () {
    document.querySelector(".add__btn").addEventListener("click", function () {
      addController();
    });

    document.addEventListener("keypress", function () {
      if (event.keyCode === 13 || event.which === 13) {
        addController();
      }
    });
  };

  return {
    init: function () {
      console.log("app started");
      setupEventListener();
    },
  };
})(uiController, financeController);

appController.init();
