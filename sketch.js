var home = 0;
var instructions = 0.5;
var play = 1;
var end = 2;
var gameState = 0;
var bird, jump_sound, hit_sound, die_sound, point_sound, swoosh_sound;
var bgImg, livesImg, groundImg, pauseImg;
var foodCollection = 0;
var playtime = 0;
var lives = 3;
var xyz = 0;
var yz = 0;
var topEdge, ground, pause, resume, mute, unmute;
var pillar, pillarsGroup, foodsGroup;
var pillar1Img, pillar2Img, pillar3Img, pillar4Img, rand;
var food1Img, food2Img, food3Img, y;
var live1, live2, live3;
var logo, ready, logoImg, ready_logo;
var birdImg, birdAnim;
var _bg, bg, gameOver, restart;
var gameOverImg;

function preload() {
  // Images and animations files
  bgImg = loadImage('images/bg.png');
  livesImg = loadImage('images/lives.png');
  logoImg = loadImage('images/logo.png');
  ready_logo = loadImage('images/ready_logo.png');
  pillar1Img = loadImage('images/pillar1.png');
  pillar2Img = loadImage('images/pillar2.png');
  pillar3Img = loadImage('images/pillar3.png');
  pillar4Img = loadImage('images/pillar4.png');
  food1Img = loadImage('images/food1.png');
  food2Img = loadImage('images/food2.png');
  food3Img = loadImage('images/food3.png');
  groundImg = loadImage('images/ground.png');
  birdImg = loadImage('images/bird1.png');
  birdAnim = loadAnimation('images/bird1.png', 'images/bird2.png', 'images/bird3.png', 'images/bird4.png');
  gameOverImg = loadImage('images/gameOver.png');

  // Sound files
  jump_sound = loadSound('sounds/wing.wav');
  hit_sound = loadSound('sounds/hit.wav');
  die_sound = loadSound('sounds/die.wav');
  point_sound = loadSound('sounds/point.wav');
  swoosh_sound = loadSound('sounds/swooshing.wav');
}

function setup() {
  live1 = createSprite(170, 40, 30, 30);
  live1.addImage(livesImg);
  live1.scale = 0.35;

  live2 = createSprite(210, 40, 30, 30);
  live2.addImage(livesImg);
  live2.scale = 0.35;

  live3 = createSprite(250, 40, 30, 30);
  live3.addImage(livesImg);
  live3.scale = 0.35;
  createCanvas(displayWidth, windowHeight);

  pillarsGroup = new Group();
  foodsGroup = new Group();

  bird = createSprite(width / 3 + 30, height / 5 + 10, 50, 50);
  bird.addAnimation('bird', birdAnim);
  bird.setCollider('circle', 0, 0, 16);

  logo = createSprite(width / 2 + 60, height / 5 + 10, 100, 100);
  logo.addImage(logoImg);
  logo.scale = 0.8;

  if (gameState == 0) {
    var playBtn = createButton('Play');
    playBtn.position(width / 2 - 30, height / 2 + 40);
    playBtn.style('width', '86px');
    playBtn.style('height', '32px');
    playBtn.style('color', 'white');
    playBtn.style('background', 'transparent');
    playBtn.style('box-shadow', '0px 0px 12px 0.7px aliceblue');
    playBtn.style('fontSize', '20px');
    playBtn.style('border', '1px solid aliceblue');
    playBtn.style('borderRadius', '8px');
    playBtn.style('cursor', 'pointer');

    playBtn.mousePressed(() => {
      pause = createButton('pause');
      pause.position(50, 25);
      pause.style('width', '64px');
      pause.style('height', '26px');
      pause.style('border', '2px solid brown');
      pause.style('borderRadius', '10px');
      pause.style('fontSize', '16px');
      pause.style('outline', 'none');
      pause.style('fontWeight', 'bold');
      pause.style('cursor', 'pointer');

      resume = createButton('resume');
      resume.position(50, 25);
      // resume.style('width', '30px');
      resume.style('height', '26px');
      resume.style('border', '2px solid brown');
      resume.style('borderRadius', '10px');
      resume.style('fontSize', '16px');
      resume.style('outline', 'none');
      resume.style('fontWeight', 'bold');
      resume.style('cursor', 'pointer');
      resume.hide();

      mute = createButton('mute');
      mute.position(width - 120, 25);
      mute.style('width', '60px');
      mute.style('height', '26px');
      mute.style('border', '2px solid brown');
      mute.style('borderRadius', '60px');
      mute.style('fontSize', '16px');
      mute.style('fontWeight', 'bold');
      mute.style('outline', 'none');
      mute.style('cursor', 'pointer');

      unmute = createButton('unmute');
      unmute.position(width - 120, 25);
      unmute.style('width', '80px');
      unmute.style('height', '26px');
      unmute.style('border', '2px solid brown');
      unmute.style('borderRadius', '60px');
      unmute.style('fontSize', '16px');
      unmute.style('fontWeight', 'bold');
      unmute.style('outline', 'none');
      unmute.style('cursor', 'pointer');
      unmute.hide();

      pause.mousePressed(() => {
        xyz = 1;
        bird.addImage('bird', birdImg);
        pause.hide();
        resume.show();
        if (yz == 0) {
          swoosh_sound.play();
        }
      })

      resume.mousePressed(() => {
        xyz = 0;
        bird.addAnimation('bird', birdAnim);
        pause.show();
        resume.hide();
        if (yz == 0) {
          swoosh_sound.play();
        }
      })

      mute.mousePressed(() => {
        yz = 1;
        mute.hide();
        unmute.show();
        // if (yz == 0) {
        swoosh_sound.play();
        // }
      })

      unmute.mousePressed(() => {
        yz = 0;
        unmute.hide();
        mute.show();
        if (yz == 0) {
          swoosh_sound.play();
        }
      })
      // bird.velocityY = -18;
      playBtn.hide();
      logo.visible = false;
      gameState = 0.5;
      if (yz == 0) {
        swoosh_sound.play();
      }
    })
  }


  topEdge = createSprite(bird.x, -50, 100, 50);
  ground = createSprite(width / 2 + 100, height - 30, width, 20);
  ground.addImage(groundImg);
  ground.velocityX = -8 - (foodCollection / 3);

  ready = createSprite(width / 2 + 20, height / 4, 100, 100);
  ready.addImage(ready_logo);
  ready.scale = 0.8;
  ready.visible = false;

  _bg = createSprite(width / 2, height / 2 - 20, width / 2 + 30, height / 2 + 30);
  _bg.shapeColor = 'black';
  bg = createSprite(width / 2, height / 2 - 20, width / 2, height / 2);
  bg.shapeColor = 'lightgreen';
  gameOver = createSprite(width / 2 + 20, height / 3 - 10, 100, 100);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.8;
  _bg.visible = false;
  bg.visible = false;
  gameOver.visible = false;

  restart = createButton('replay');
  restart.position(width / 2 - 30, height / 2 + 60);
  restart.style('width', '70px');
  restart.style('height', '25px');
  restart.style('border', '1px solid black');
  restart.style('borderRadius', '8px');
  restart.style('background', 'aliceblue');
  restart.style('fontSize', '16px');
  restart.style('fontWeight', 'bold');
  restart.style('outline', 'none');
  restart.style('cursor', 'pointer');
  restart.hide();
  restart.mousePressed(() => {
    gameState = 0.5;
    bg.visible = false;
    _bg.visible = false;
    gameOver.visible = false;
    restart.hide();
    lives = 3;
    foodCollection = 0;
    playtime = 0;
    if (yz == 0) {
      swoosh_sound.play();
    }
  })
}

function draw() {
  background(bgImg);
  bird.collide(bird);
  bird.collide(topEdge);

  drawSprites();

  if (ground.x < width / 2) {
    ground.x = width / 2 + 100;
  }

  if (gameState == 0) {
    textSize(28);
    fill('steelblue');
    text('Hey, Welcome to the flappy bird game.', width / 3, height / 3 + 30);
    text('Press        to get in full screen mode and then refresh the page\n               that helps you to give a better experience.', width / 5 + 40, height / 3 + 68);
    fill('aliceblue');
    text('F11', width / 5 + 120, height / 3 + 68);
    ground.visible = false;
    live1.visible = false;
    live2.visible = false;
    live3.visible = false;

  }

  if (gameState == 0.5) {
    xyz = 1;
    pause.hide();
    mute.hide();
    unmute.hide();
    ground.velocityX = 0;
    bird.visible = false;
    ready.visible = true;
    // fill('green');
    // textSize(34);
    // text("Get Ready", width / 2 - 70, height / 3 - 20);
    fill('aliceblue');
    textSize(27);
    text("Press    or                 key to fly the bird", width / 2 - 215, height / 3 + 20);
    fill('slateblue');
    text("j      up arrow", width / 2 - 132, height / 3 + 20);
  }

  if (gameState == 1) {
    textSize(28);
    fill('black');
    text('Food Collected: ' + foodCollection, 310, 50);
    if (xyz == 0) {
      playtime++;
    }
    // console.log(playtime);

    if (xyz == 0) {
      bird.velocityY += 2;
    }

    pause.show();
    mute.show();
    if (yz == 1) {
      unmute.show();
    }
    ready.visible = false;
    bird.visible = true;
    ground.visible = true;
    live1.visible = true;
    live2.visible = true;
    live3.visible = true;
    if (lives == 2) {
      live3.visible = false;
    }
    if (lives == 1) {
      live3.visible = false;
      live2.visible = false;
    }
    if (lives == 0) {
      live3.visible = false;
      live2.visible = false;
      live1.visible = false;
      gameState = 2;
      if (yz == 0) {
        die_sound.play();
      }
    }
    // console.log(lives);
  }

  if (gameState == 2) {
    _bg.visible = true;
    bg.visible = true;
    gameOver.visible = true;

    textSize(24);
    if (foodCollection == 0) {
      fill('red');
      text('Oh! you collected 0 food', width / 2 - 110, height / 2 - 65);
    }
    else if (foodCollection == 5) {
      fill('green');
      text('Great! you collected 5 foods', width / 2 - 130, height / 2 - 65);
    }
    else if (foodCollection > 1) {
      fill('brown');
      text('Nice! you collected more than 1 food', width / 2 - 180, height / 2 - 65);
    }
    else if (foodCollection == 1) {
      fill('brown');
      text('Wow! you collected 1 food', width / 2 - 120, height / 2 - 65);
    }
    textSize(24);
    text('Food Collected: ' + foodCollection, width / 2 - 80, height / 2 - 10);
    textSize(24);
    fill('black');
    if (int(playtime / 60) < 60) {
      text('Playtime taken: ' + int(playtime / 60) + ' sec', width / 2 - 100, height / 2 + 20);
    }
    else if (int(playtime / 60) > 59) {
      text('Playtime taken: ' + int((playtime / 60) / 60) + ' min', width / 2 - 100, height / 2 + 20);
    }

    restart.show();
    pillarsGroup.destroyEach();
    foodsGroup.destroyEach();
    bird.visible = false;
    pause.hide();
    resume.hide();
    mute.hide();
    unmute.hide();
    xyz = 1;
  }

  pillars();
  foods();

  if (xyz == 1) {
    frameCount = 40;
    bird.velocityY = 0;
    ground.velocityX = 0;
    pillarsGroup.setVelocityXEach(0);
    foodsGroup.setVelocityXEach(0);
  }
  else {
    ground.velocityX = -8 - (foodCollection / 3);
    pillarsGroup.setVelocityXEach(-10 - (foodCollection / 3));
    foodsGroup.setVelocityXEach(-10 - (foodCollection / 3));
  }

  if (bird.isTouching(pillarsGroup)) {
    lives--;
    bird.velocityY = -16;
    pillarsGroup.destroyEach();
    foodsGroup.destroyEach();
    if (lives != 0 && yz == 0) {
      hit_sound.play();
    }
    // console.log('touched');
  }
  if (bird.isTouching(ground)) {
    lives--;
    bird.y = height / 3;
    bird.velocityY = -16;
    if (lives != 0 && yz == 0) {
      hit_sound.play();
    }
  }
  if (bird.isTouching(foodsGroup)) {
    foodCollection++;
    foodsGroup.destroyEach();
    if (yz == 0) {
      point_sound.play();
    }
  }
}

function keyPressed() {
  if ((keyCode == 74 || keyCode == 38) && gameState == 1 && xyz == 0) {
    bird.velocityY = -20;
    if (yz == 0) {
      jump_sound.play();
    }
  }
  if (((keyCode == 74 || keyCode == 38) && gameState == 0.5)) {
    gameState = 1;
    bird.y = height / 5;
    bird.velocityY = -20;
    xyz = 0;
  }
}

function pillars() {
  if (frameCount % 80 == 0 && gameState == 1 && xyz == 0) {
    pillar1 = createSprite(width, 160, 100, 400);
    pillar1.addImage(pillar1Img);
    pillar1.setCollider('rectangle', 10, -30, 50, 330);
    pillar1.scale = 1.4;
    // pillar1.debug = true;
    pillar1.velocityX = -10 - (foodCollection / 3);
    rand = random([pillar2Img, pillar3Img, pillar4Img]);
    pillar2 = createSprite(width + 20, ground.y - 143, 100, 400);
    pillar2.addImage(rand);
    pillar2.setCollider('rectangle', -7, 30, 50, 100);
    pillar2.scale = 1.4;
    // pillar2.debug = true;
    pillar2.velocityX = -10 - (foodCollection / 3);

    if (rand == pillar2Img) {
      var rd2 = random([500, 490, 520]);
      pillar1.y = pillar2.y - rd2;
      pillar2.y = ground.y - 221;
      pillar2.setCollider('rectangle', -7, 30, 50, 218);
    }
    else if (rand == pillar3Img) {
      var rd3 = random([420, 440, 410]);
      pillar1.y = pillar2.y - rd3;
      pillar2.y = ground.y - 178;
      pillar2.setCollider('rectangle', -7, 30, 50, 155);
    }
    else if (rand == pillar4Img) {
      var rd4 = random([350, 340, 360]);
      pillar1.y = pillar2.y - rd4;
    }

    y = pillar2.y;
    pillarsGroup.add(pillar1);
    pillarsGroup.add(pillar2);
  }
}

function foods() {
  if (frameCount % 160 == 0 && gameState == 1 && xyz == 0) {
    var food = createSprite(width, y, 20, 20);
    var r = random([food1Img, food2Img, food3Img]);
    food.addImage(r);
    food.velocityX = -10 - (foodCollection / 3);
    // console.log(frameCount);
    foodsGroup.add(food);
    if (rand == pillar2Img) {
      food.y -= 170;
    }
    else if (rand == pillar3Img) {
      food.y -= 120;
    }
    else if (rand == pillar4Img) {
      food.y -= 90;
    }
  }
}


