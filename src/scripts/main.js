//Game section

var game = {
  isFight: false,
  round: 0,
  winner: null,
  refill: function() {
    console.log("Refillowanie w trakcie...");
    if (this.winner == "Player") {
      console.log("Next gen start");
      player.nextGeneration();
      enemy.nextGeneration();
      player.hp[0] = player.hp[1];
      enemy.hp[0] = enemy.hp[1];
    } else {
      player.hp[0] = player.hp[1];
      enemy.hp[0] = enemy.hp[1];
    }
  }
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
  hp: [30, 30], //First value - hp till fight. Second value - max hp.
  moves: [{ id: 0, name: "Basic attack" }],
  nextGeneration: function() {
    console.log("Next generation - Player");
    this.level++;
    this.coins = enemy.drop_coins + enemy.level * getRandom();
    this.strenght += getRandom();
    this.agility += getRandom();
    this.inteligence += getRandom();
    this.luck += getRandom();
    this.hp[1] = this.hp[1] * this.level;
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
  hp: [25, 25], //First value - hp till fight. Second value - max hp.
  moves: [
    { id: 0, name: "Fireball", damage: 1 },
    { id: 1, name: "Furious Light", damage: 2 }
  ],
  nextGeneration: function() {
    console.log("Next generation - Enemy");
    this.level++;
    this.drop_coins =
      this.drop_coins + (this.level + player.level) * getRandom();
    this.strenght += getRandom();
    this.agility += getRandom();
    this.inteligence += getRandom();
    this.luck += getRandom();
    this.hp[1] = this.hp[1] * this.level;
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
  if (!game.isFight) {
    console.log("Start fight!");
    console.log("================");
    game.isFight = true;
  } else {
    console.log("Fight started!");
  }
});

$("#basicattack").click(function() {
  if (game.isFight == true) {
    fight();
  } else {
    console.log("Start fight first!");
  }
});

const fight = () => {
  let playerMove =
    player.moves[Math.floor(Math.random() * player.moves.length)];
  let enemyMove = enemy.moves[Math.floor(Math.random() * enemy.moves.length)];
  let randPlayerDamage = randomizePlayerDamage();
  let randEnemyDamage = randomizeEnemyDamage();
  console.log("Player dmg: " + randPlayerDamage);
  player.hp[0] -= randEnemyDamage;
  enemy.hp[0] -= randPlayerDamage;
  console.log("Player: " + player.hp[0]);
  console.log("Enemy: " + enemy.hp[0]);
  if (player.hp[0] <= 0) {
    console.log("Player dead.");
  } else if (enemy.hp[0] <= 0) {
    console.log("Enemy dead.");
  }

  //Enemy move
};

//Sekcja testowa
shop = Object.assign({}, shop, newItems);

const getRandom = function() {
  return Math.floor(Math.random() * 5 + 1);
};

const randomizePlayerDamage = function() {
  return (
    (player.strenght + player.agility + player.inteligence + player.luck) *
    0.25 *
    player.level *
    getRandom()
  );
};

const randomizeEnemyDamage = function() {
  return (
    (enemy.strenght + enemy.agility + enemy.inteligence + enemy.luck) *
    0.25 *
    enemy.level *
    getRandom()
  );
};
