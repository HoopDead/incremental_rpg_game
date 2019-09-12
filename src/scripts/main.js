//Game section

var game = {
  isFight: false,
  round: 0
};

//Main character section

var player = {
  level: 1,
  coins: 0,
  strenght: 0,
  agility: 0,
  inteligence: 0,
  defence: 0,
  luck: 3,
  hp: 100,
  getDamage: function() {
    return (
      Math.floor(
        this.level * 2 +
          this.strenght * 0.4 +
          this.inteligence * 0.4 +
          this.agility * 0.35
      ) * this.luck
    );
  },
  checkHp: function() {
    if (this.hp <= 0) {
      console.log("Player dies");
      game.isFight = false;
    }
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
  getDamage: function() {
    return (
      Math.floor(
        this.level * 1.5 +
          this.strenght * 0.2 +
          this.inteligence * 0.2 +
          this.agility * 0.15
      ) *
      (0.5 * this.luck)
    );
  },
  checkHp: function() {
    if (this.hp <= 0) {
      console.log("Enemy die.");
      game.isFight = false;
    }
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
  console.log("================");
  fight(game.round);
});

let fight = (round, isFight) => {
  console.log("Runda: " + (game.round + 1));
  var turn =
    game.round % 2 === 0 ? console.log("Player") : console.log("Enemy");
  game.isFight = true;
};

$("#basicattack").click(function() {
  if (game.isFight == true) {
    console.log(
      "Player uses basic atack: " + Math.floor(player.getDamage())
    );
    game.round++;
    enemy.hp -= player.getDamage();
    console.log("Enemy hp: " + enemy.hp);
    enemy.checkHp();
    enemyMove();
  } else {
    console.log("Start fight first!");
  }
});

let enemyMove = () => {
  console.log("Enemy uses basic atack: " + enemy.getDamage());
  game.round++;
  player.hp -= enemy.getDamage();
  console.log("Player hp: " + player.hp);
  player.checkHp();
};

//Sekcja testowa
shop = Object.assign({}, shop, newItems);
