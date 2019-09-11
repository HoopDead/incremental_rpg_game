//Main character section

const main_character = {
  level: 1,
  coins: 100,
  profession: "none",
  strenght: 0,
  agility: 0,
  inteligence: 0,
  defence: 0,
  luck: 0,
  hp: 100
};

//Enemy section

var enemy = {
  level: 2,
  drop_coins: 150,
  strenght: 3,
  agility: 5,
  inteligence: 3,
  defence: 9,
  luck: 3,
  hp: 25
};

//Shop section
var shop = {
  item1: {
    name: "Long Sword",
    cost: 100
  },
  item2: {
    name: "Bow",
    cost: 100
  },
  item3: {
    name: "Magic Wand",
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
