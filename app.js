//delgetstei ajillah controller
var uiController = (function () {
  return {
    getInfo: function () {
      return {
        type: document.querySelector(".add__type").value,
        description: document.querySelector(".add__description").value,
        value: parseInt(document.querySelector(".add__value").value),
      };
    },

    clearFields: function () {
      var fields = document.querySelectorAll(".add__description, .add__value");

      var fieldsArr = Array.prototype.slice.call(fields);
      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });

      if (fieldsArr.length > 0) {
        fieldsArr[0].focus();
      }
      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }
    },

    toswiigVzvvleh: function (tosow) {
      document.querySelector(".budget__value").textContent = tosow.tosow;
      document.querySelector(".budget__income--value").textContent =
        tosow.totalInc;
      document.querySelector(".budget__expenses--value").textContent =
        tosow.totalExp;
      if (tosow.huwi !== 0) {
        document.querySelector(".budget__expenses--percentage").textContent =
          tosow.huwi + "%";
      } else {
        document.querySelector(".budget__expenses--percentage").textContent =
          tosow.huwi;
      }
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

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
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

    tosow: 0,
    huwi: 0,
  };

  return {
    tosowTootsooloh: function () {
      calculateTotal("inc");
      calculateTotal("exp");

      data.tosow = data.totals.inc - data.totals.exp;
      data.huwi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },
    toswiigAwah: function () {
      return {
        tosow: data.tosow,
        huwi: data.huwi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
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
    if (info.description !== "" && info.value !== "") {
      var item = financeController.addItem(
        info.type,
        info.description,
        info.value
      );

      uiController.addListItem(item, info.type);
      uiController.clearFields();

      financeController.tosowTootsooloh();

      var tosow = financeController.toswiigAwah();

      uiController.toswiigVzvvleh(tosow);
    }
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
      uiController.toswiigVzvvleh({
        tosow: 0,
        huwi: 0,
        totalInc: 0,
        totalExp: 0,
      });
      setupEventListener();
    },
  };
})(uiController, financeController);

appController.init();
