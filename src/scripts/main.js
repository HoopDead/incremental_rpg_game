const main_character = {
  level: 1,
  coins: 100,
  profession: "none",
  strenght: 0,
  agility: 0,
  inteligence: 0,
  defence: 0,
  luck: 0
};

var shop = {
  item1: {
    name: "Long Sword",
    cost: 100
  }
};

let newItems = {
  item1: {
    name: "Wooden Sword",
    cost: 5009
  }
};

shop = Object.assign({}, shop, newItems);

console.table(shop);
