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

    addListItem: function (item, type) {
      var html, list;
      if (type === "inc") {
        list = ".income__list";
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = ".expenses__list";
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%DESCRIPTION%</div><div class="right clearfix"><div class="item__value">%VALUE%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>';
      }

      html = html.replace("%id%", item.id);
      html = html.replace("%DESCRIPTION%", item.description);
      html = html.replace("%VALUE%", item.value);

      document.querySelector(list).insertAdjacentHTML("beforeend", html);
    },
  };
})();

//sanhvvtei ajillah controller
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },
  };

  return {
    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item);
      return item;
    },
  };
})();

//programmiig holboh controller
var appController = (function (uiController, financeController) {
  var addController = function () {
    var info = uiController.getInfo();
    var item = financeController.addItem(
      info.type,
      info.description,
      info.value
    );

    uiController.addListItem(item, info.type);
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
