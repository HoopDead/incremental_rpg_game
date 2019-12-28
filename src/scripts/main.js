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
      renderMoney();
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
  coins: 1000,
  hp: [100, 100], //First value - hp till fight. Second value - max hp.
  stats: [
    { name: "strenght", value: 5, cost: 10 }, //damage
    { name: "agility", value: 5, cost: 10 }, //dodge
    { name: "inteligence", value: 5, cost: 10 }, //more coins from objects
    { name: "luck", value: 5, cost: 10 } //add stat in item
  ],
  moves: [
    { id: 0, name: "Basic attack", damage: 3 },
    { id: 1, name: "Lava Spike", damage: 7 },
    { id: 2, name: "Blast of Renewal", damage: 4 },
    { id: 3, name: "Energy Arrow", damage: 5 }
  ],
  equpiment: [
    { id: 0, name: "Empty", cost: 0, strenght: 0, damage: 0},
    { id: 1, name: "Empty", cost: 0, strenght: 0, damage: 0},
    { id: 2, name: "Empty", cost: 0, strenght: 0, damage: 0},
    { id: 3, name: "Empty", cost: 0, strenght: 0, damage: 0},
    { id: 4, name: "Empty", cost: 0, strenght: 0, damage: 0},
    { id: 5, name: "Empty", cost: 0, strenght: 0, damage: 0},
  ],
  wearing: [
    { id: 0, name: "Empty", cost: 0, strenght: 0, damage: 0},
    { id: 1, name: "Empty", cost: 0, strenght: 0, damage: 0},
    { id: 2, name: "Empty", cost: 0, strenght: 0, damage: 0},
    { id: 3, name: "Empty", cost: 0, strenght: 0, damage: 0},
    { id: 4, name: "Empty", cost: 0, strenght: 0, damage: 0},
    { id: 5, name: "Empty", cost: 0, strenght: 0, damage: 0},
  ],
  nextGeneration: function() {
    console.log("Next generation - Player");
    this.level++;
    this.coins = this.coins + enemy.drop_coins + enemy.level * 0.5 * player.stats[2].value;
    this.hp[1] = this.hp[1] * this.level;
    for (let i = 0; i < this.stats.length; i++) {
      this.stats[i].value += getRandom();
    }
  },
  displayStats: function() {
    console.log("Display stats");
    for(stat of this.stats)
    {
      $("#stats").replaceWith(firstToUpper(stat.name) + ": " + stat.value + "<br>");
      console.log(firstToUpper(stat.name) + ": " + stat.value);
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
      this.drop_coins + (this.level + player.level) * getRandom() * 5;
    this.hp[1] = this.hp[1] * this.level;
    for (let i = 0; i < this.stats.length; i++) {
      this.stats[i].value += getRandom();
    }
  }
};

//Shop section

//Shop object
var shop = [
  { id: 0, name: "Long Sword", cost: 100, strenght: 3},
  { id: 1, name: "Leather Helmet", cost: 100, strenght: 2},
  { id: 2, name: "Leather Chestplate", cost: 100, strenght: 3},
  { id: 3, name: "Leather Pants", cost: 100, strenght: 2},
  { id: 4, name: "Leather Boots", cost: 100, strenght: 1},
  { id: 5, name: "Iron Amulet", cost: 500, strenght: 5}
];


//Display shop items
const displayShop = object => {
  $("#shop").append(`<a id = ${object.id} class = 'itemBuy'>` + object.name + " " + object.cost + `</a>` + "<br>");
}

//Loop to use shop display function
shop.forEach(function(item) {
  displayShop(item);
})

//New item function - used when player buy item
const newItem = id => {
  $.getJSON("../items.json", function(json){
    let random = json.items[Math.floor(Math.random() * json.items.length)];
    Object.assign(random, {cost: game.round * 100, strenght: Math.ceil(game.round * player.level * 0.5)});
    shop[id] = random;
    $("#" + id).html(shop[id].name + " " + shop[id].cost);
  });
};

//Click on item - buy algorithm
$(".itemBuy").click(function(event){
  let e = event.target.id
  if(player.coins > shop[e].cost)
  {
    if(player.equpiment.length < 7)
    {
      console.log("Buy");
      player.coins -= shop[e].cost;
      player.equpiment[e] = shop[e];
      $("#equipment" + e).html("Nazwa: " + shop[e].name + "Strenght: " + shop[e].strenght);
      newItem(e);
      renderMoney();
    }
    else
    {
      alert("Too much items.");
    }
  }
  else
  {
    alert("Not enough money.");
  }
});

const renderMoney = () => {
  $("#money").html(player.coins + " coins");
}

renderMoney(); // Important function.

//Shop stop

//Fight section

$("#startfight").click(function() {
  if (!game.isFight) {
    console.log("Started!");
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
  let randPlayerDamage = randomizePlayerDamage(player.level) * playerMove.damage;
  let randEnemyDamage = randomizeEnemyDamage(enemy.level) * enemyMove.damage;
  let playerMessage = `[Round ${game.round}] Player uses: ${playerMove.name} and took ${randPlayerDamage} enemy HP is ${enemy.hp[0]}`;
  let enemyMessage = `[Round ${game.round}] Enemy uses: ${enemyMove.name} and took ${randEnemyDamage} player HP is ${player.hp[0]}`
  if(isDodge(player.stats[1].value) == true)
  {
    randEnemyDamage = 0;
    enemyMessage += " [PLAYER DODGES]!";
  }
  player.hp[0] -= randEnemyDamage;
  enemy.hp[0] -= randPlayerDamage;
  console.log(playerMessage);
  $("#logs").append(playerMessage + "\n");
  console.log(enemyMessage);
  $("#logs").append(enemyMessage + "\n");
  var textArea = document.getElementById('logs');
  textArea.scrollTop = textArea.scrollHeight;  
  if (player.hp[0] <= 0) {
    game.winner = "Enemy";
    game.refill();
    $("#logs").append("Player dead.\n");
  } else if (enemy.hp[0] <= 0) {
    game.winner = "Player";
    game.refill();
    $("#logs").append("Enemy dead.\n");
  }
};

//Fight stop

//Sekcja testowa
const isDodge = function(agility) {
  var sum = 0;
  player.stats.forEach(function(stat){
    sum = sum + stat.value;
  })
  let random = Math.floor(Math.random() * sum);
  if(random < agility)
  {
    return true;
  }
  else
  {
    return false;
  }
}

const getRandom = function() {
  return Math.floor(Math.random() * 5 + 1);
};

const randomizePlayerDamage = function(min) {
  let finalDamage = 0;
  for (let i = 0; i < player.stats.length; i++) {
    finalDamage += player.stats[i].value;
  }
  return Math.floor(Math.random() * (finalDamage - min) + min);
};

const randomizeEnemyDamage = function(min) {
  let finalDamage = 0;
  for (let i = 0; i < enemy.stats.length; i++) {
    finalDamage += enemy.stats[i].value;
  }
  return Math.floor(Math.random() * (finalDamage - min) + min);
};

const firstToUpper = (text) => {
  if(typeof text !== 'string') return ''
  return text.charAt(0).toUpperCase() + text.slice(1);
}


$(".eqb").click(function(event) {
  let e = event.target.id;
  let id = event.target.id;
  id = id.replace("equipment", "");
  e = e.replace("equipment", "wearing");
  player.wearing[id] = player.equpiment[id];
  player.stats[0].value += player.wearing[id].strenght;
  $("#" + e).html("Nazwa: " + player.equpiment[id].name + " Strength: " + player.equpiment[id].strenght);
  $("#" + event.target.id).html("");
  player.equpiment[id] = {id: 0, name: "Empty", cost: 0, strenght: 0, damage: 0}
  player.stats[0].value -= player.equpiment[id].strenght;

})

$(".eqw").click(function(event){
  let e = event.target.id;
  let id = event.target.id;
  id = id.replace("wearing", "");
  e = e.replace("wearing", "equipment");
  player.equpiment[id] = player.wearing[id];
  player.stats[0].value -= player.equpiment[id].strenght;
  $("#" + e).html("Nazwa: " + player.equpiment[id].name + " Strength: " + player.equpiment[id].strenght);
  $("#" + event.target.id).html("");
  player.wearing[id] = {id: 0, name: "Empty", cost: 0, strenght: 0, damage: 0}
});
