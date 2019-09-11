//Main character section

var main_character = {
  level: 1,
  coins: 0,
  strenght: 0,
  agility: 0,
  inteligence: 0,
  defence: 0,
  luck: 3,
  hp: 100,
  getDamageCharacter: function() {
    return (
      (this.level * 2 +
        this.strenght * 0.4 +
        this.inteligence * 0.4 +
        this.agility * 0.35) *
      this.luck
    );
  }
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
  hp: 25,
  getDamageEnemy: function() {
    return (
      (this.level * 1.5 +
        this.strenght * 0.2 +
        this.inteligence * 0.2 +
        this.agility * 0.15) *
      (0.5 * this.luck)
    );
  }
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

//Fight section

$("#startfight").click(function() {
  console.log("Start fight!");
  fight();
});

let fight = () => {};

shop = Object.assign({}, shop, newItems);

console.log(
  main_character.getDamageCharacter() + " " + Math.floor(enemy.getDamageEnemy())
);
