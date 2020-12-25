// We have 9 people at our Christmas this year.
// We are doing a mega secret santa.
// Every person buys 6 gifts, one from each of 6 different categories.
// You can't buy for yourself and you can't buy for the same person twice.
// Generate a list for everyone.

const family = [];

const categories = [];

let list = [];

const addName = () => {
  var submitName = document.getElementById("addNames").value;
  family.push(submitName);

  document.getElementById("names").innerHTML = family;
  document.getElementById("addNames").value = "";
};

const addCategory = () => {
  var submitCategory = document.getElementById("addCategories").value;
  categories.push(submitCategory);

  document.getElementById("categories").innerHTML = categories;
  document.getElementById("addCategories").value = "";
};

const generateList = () => {
  for (let i = 0; i < categories.length; i++) {
    family.map((x) => {
      list.push(x.concat("-", categories[i]));
      list.sort();
    });
  }
};

//Durstenfeld Shuffle - acts like picking a deck of cards.
function shuffleArray() {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}

function reorderValues() {
  list.forEach((item, index) => {
    for (let i = 0; i < family.length; i++) {
      if (i == 0 && index < categories.length && item.indexOf(family[i]) > -1) {
        list.splice(index, 1);
        list.push(item);
      } else if (
        i > 0 &&
        i < family.length - 1 &&
        index > i * categories.length - 1 &&
        index < (i + 1) * categories.length &&
        item.indexOf(family[i]) > -1
      ) {
        list.splice(index, 1);
        list.push(item);
      } else if (
        i == family.length - 1 &&
        index >= i * categories.length &&
        item.indexOf(family[i]) > -1
      ) {
        list.splice(index, 1);
        list.unshift(item);
      }
    }
  });
}

function concat() {
  let totalList = [];
  for (let i = 0; i < family.length; i++) {
    let fam = [family[i]];

    if (i == 0) {
      var items = list.slice(i, categories.length);
    } else if (i > 0) {
      var items = list.slice(
        i * categories.length,
        (i + 1) * categories.length
      );
    }
    var individualList = fam.concat(items);
    totalList.push(individualList);
    console.log(individualList);
  }

  var app = document.querySelector("#app");
  app.innerHTML =
    "<ul>" +
    totalList
      .map(function (x) {
        return "<li>" + x + "</li>";
      })
      .join("") +
    "</ul>";
}

function generate() {
  generateList();
  shuffleArray(list);
  reorderValues(list);
  reorderValues(list);
  reorderValues(list);
  reorderValues(list);
  reorderValues(list);
  reorderValues(list);
  reorderValues(list);
  reorderValues(list);
  reorderValues(list);
  concat();
}
