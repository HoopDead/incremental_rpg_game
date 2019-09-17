//Game section

var game = {
  isFight: false,
  round: 1,
  winner: null,
  refill: function() {
    console.log("Refillowanie w trakcie...");
    this.isFight = false;
    this.round++;
    if (this.winner == "Player") {
      console.log("Next gen start");
      player.nextGeneration();
      enemy.nextGeneration();
      player.hp[0] = player.hp[1];
      enemy.hp[0] = enemy.hp[1];
      this.winner = null;
    } else {
      player.hp[0] = player.hp[1];
      enemy.hp[0] = enemy.hp[1];
      this.winner = null;
    }
  }
};

//Main character section

var player = {
  level: 1,
  coins: 0,
  hp: [100, 100], //First value - hp till fight. Second value - max hp.
  stats: [
    { name: "strenght", value: 5, cost: 10 },
    { name: "agility", value: 5, cost: 10 },
    { name: "inteligence", value: 5, cost: 10 },
    { name: "luck", value: 5, cost: 10 }
  ],
  moves: [
    { id: 0, name: "Basic attack", damage: 3 },
    { id: 1, name: "Lava Spike", damage: 7 },
    { id: 2, name: "Blast of Renewal", damage: 4 },
    { id: 3, name: "Energy Arrow", damage: 5 }
  ],
  nextGeneration: function() {
    console.log("Next generation - Player");
    this.level++;
    this.coins = enemy.drop_coins + enemy.level * getRandom();
    this.hp[1] = this.hp[1] * this.level;
    for (let i = 0; i < this.stats.length; i++) {
      this.stats[i].value += getRandom();
    }
  }
};

//Enemy section

var enemy = {
  level: 2,
  drop_coins: 150,
  hp: [125, 125], //First value - hp till fight. Second value - max hp.
  stats: [
    { name: "strenght", value: 5, cost: 10 },
    { name: "agility", value: 5, cost: 10 },
    { name: "inteligence", value: 5, cost: 10 },
    { name: "luck", value: 5, cost: 10 }
  ],
  moves: [
    { id: 0, name: "Basic attack", damage: 1 },
    { id: 1, name: "Furious Light", damage: 2 },
    { id: 2, name: "Fireball", damage: 4 },
    { id: 3, name: "Blazing Charge", damage: 3 },
    { id: 4, name: "Assault of Chaotic Energy", damage: 6 }
  ],
  nextGeneration: function() {
    console.log("Next generation - Enemy");
    this.level++;
    this.drop_coins =
      this.drop_coins + (this.level + player.level) * getRandom();
    this.hp[1] = this.hp[1] * this.level;
    for (let i = 0; i < this.stats.length; i++) {
      this.stats[i].value += getRandom();
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
  if (!game.isFight) {
    game.isFight = true;
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
  let randPlayerDamage = randomizePlayerDamage() * playerMove.damage;
  let randEnemyDamage = randomizeEnemyDamage() * enemyMove.damage;
  player.hp[0] -= randEnemyDamage;
  enemy.hp[0] -= randPlayerDamage;
  console.log(
    "[Round " +
      game.round +
      "] Player uses: " +
      playerMove.name +
      " and took: " +
      randPlayerDamage +
      " enemy HP is: " +
      enemy.hp[0]
  );
  console.log(
    "[Round " +
      game.round +
      "] Enemy uses: " +
      enemyMove.name +
      " and took: " +
      randEnemyDamage +
      " player HP is: " +
      player.hp[0]
  );
  if (player.hp[0] <= 0) {
    game.winner = "Enemy";
    game.refill();
    console.log("Player dead.");
  } else if (enemy.hp[0] <= 0) {
    game.winner = "Player";
    game.refill();
    console.log("Enemy dead.");
  }

  //Enemy move
};

//Sekcja testowa
shop = Object.assign({}, shop, newItems);

const getRandom = function() {
  return Math.floor(Math.random() * 5);
};

const randomizePlayerDamage = function() {
  let finalDamage = 0;
  for (let i = 0; i < player.stats.length; i++) {
    finalDamage += player.stats[i].value;
  }
  return Math.floor(finalDamage * 0.1 * player.level * getRandom());
};

const randomizeEnemyDamage = function() {
  let finalDamage = 0;
  for (let i = 0; i < enemy.stats.length; i++) {
    finalDamage += enemy.stats[i].value;
  }
  return Math.floor(finalDamage * 0.1 * enemy.level * getRandom());
};
