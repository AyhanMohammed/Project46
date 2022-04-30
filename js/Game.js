class Game {
    constructor() {
      this.active = false;
      this.pause = false;
      this.life1 = 250;
      this.life2 = 250;
    }

    getState() {
        var gameStateRef = database.ref("gameState");
        gameStateRef.on("value", function(data) {
          gameState = data.val();
        });
      }

    update(state) {
        database.ref("/").update({
          gameState: state
        });
      }
    
    start() {
        player = new Player();
        playerCount = player.getCount();
    

        boxer1 = createSprite(width / 2 + 300,height - 300);
        boxer1.addImage("redboxer",redboxer);
        boxer1.addImage("redboxerFlip",redflip)
        boxer1.addAnimation("walking",redboxerWalk);
        boxer1.addAnimation("walkingFlip",redwalkFlip)
        boxer1.addAnimation("redpunch",redboxerPunch);
        boxer1.addAnimation("redpunchFlip",redflipPunch);
        boxer1.addAnimation("redDead",redboxerDead);
        boxer1.debug = false;
        boxer1.setCollider("rectangle",-5,5,50,80);

        boxer1.changeImage("redboxer");
      
        boxer1.scale = 3;

        boxer2 = createSprite(width / 2 - 300,height - 300);
        boxer2.addImage("blueboxer",blueflip);
        boxer2.addImage("blueboxerFlip",blueboxer);
        boxer2.addAnimation("blueboxerWalk",bluewalkFlip);
        boxer2.addAnimation("blueboxerWalkFlip",blueboxerWalk);
        boxer2.addAnimation("bluepunch",blueflipPunch);
        boxer2.addAnimation("bluepunchFlip",blueboxerPunch);
        boxer2.addAnimation("blueDead",blueboxerDead);
        boxer2.debug = false;
        boxer2.setCollider("rectangle",5,5,50,80);

        boxer2.changeImage("blueboxer");

        boxer2.scale = 3;

        redicon = createSprite(width / 2 + 680, height / 2 - 270);
        redicon.addImage("redicon",rediconImg);
        redicon.scale = 0.7;

        blueicon = createSprite(width / 2 - 680, height / 2 - 270);
        blueicon.addImage("blueicon",blueiconImg);
        blueicon.scale = 0.7;
        

      //  countDown = createSprite(width / 2, height / 2);
      //  countDown.addAnimation("countdown",countDownAnim);
       

      }

      start2() {
        countDown = createSprite(width / 2, height / 2);
        countDown.addAnimation("countdown",countDownAnim);
      }

    play() {

      background(bg);

      
      
      this.timer();
      countDown.changeAnimation("countdown");
 
    
      //countDown.visible = false;

      this.handlePlayerControls();

      this.showRedLife();
      this.showBlueLife();

      pauseButton = createImg("assets/pauseimage.png");
      pauseButton.position(width / 2 - 30,50);
      pauseButton.size(50,50);
      pauseButton.mousePressed(() => {
        this.pause = true;
        keyRel = true;
        this.pauseClick();
      })

      if (this.life1 <= 0) {
        boxer1.changeAnimation("redDead");
        boxer2.changeImage("blueboxer");
        boxer1.y = height - 100;
        this.pause = true;
        this.life1 = 0;
        fill("red");
        rect(width / 2 +350, height - 650, 250, 30);
      }

      if (this.life2 <= 0) {
        boxer2.changeAnimation("blueDead");
        boxer1.changeImage("redboxer");
        boxer2.y = height - 100;
        this.pause = true;
        this.life2 = 0;
        fill("red");
        rect(width / 2 - 600, height - 650, 250, 30);
      }

      
        
      
      drawSprites()
    }

    play2() {

      background(bg);
 
     
      console.log("I am here")

      Player.getPlayersInfo();

      this.timer();
      countDown.changeAnimation("countdown");
 
    
      //countDown.visible = false;

      this.handlePlayerControls();

      this.showRedLife();
      this.showBlueLife();
      drawSprites();


    }

    updateCountdown() {
      var m = Math.floor(time/60);
      var s = time % 60;
      time = time - 1;
      if (time <- 200) {
        countDown.visible = false;
      }
    }

    timer() {
      setInterval(this.updateCountdown,1000);
    }

    pauseClick() {
        resume = createImg("assets/resumeimage.png");
        resume.position(width / 2-40,height / 2);
        resume.size(80,80);
        resume.mousePressed(() => {
          this.pause = false;
          keyRel = false;
          resume.hide();
          restart.hide();
          home.hide();
        })
    
        restart = createImg("assets/restartimage.png");
        restart.position(width / 2-120,height / 2);
        restart.size(80,80);
        restart.mousePressed(() => {
          this.life1 = 250;
          this.life2 = 250;
          boxer1.x = width / 2 + 300;
          boxer2.x = width / 2 - 300;
          resume.hide();
          restart.hide();
          home.hide();
          //time = 100;
          //console.log(time);
          //this.start2();
          //this.timer();
          this.play();
          boxer1.changeImage("redboxer");
          boxer2.changeImage("blueboxer");
          this.pause = false;
        })
    
        home = createImg("assets/homeimage.png");
        home.position(width / 2+40,height / 2);
        home.size(80,80);
        home.mousePressed(() => {
          location.reload();
        })
    }

    showBlueLife() {
      push();
      fill("white");
      rect(width / 2 - 600, height - 650, 250, 30);
      fill("green");
      rect(width / 2 - 600, height - 650, this.life2, 30);
      noStroke();
      pop();
    }

    showRedLife() {
      push();
      fill("white");
      rect(width / 2 + 350, height - 650, 250, 30);
      fill("green");
      rect(width / 2 + 350, height - 650, this.life1, 30);
      noStroke();
      pop();
    }

    handlePlayerControls() {
      if (!this.pause) {
      if (keyDown(LEFT_ARROW) && boxer1.x > width / 2 - 500) {
        boxer1.position.x = boxer1.position.x - 5;
        boxer1.changeAnimation("walking");
        this.active = true;
      }
    
     if (keyDown(RIGHT_ARROW) && boxer1.x < width / 2 + 500) {
        boxer1.position.x = boxer1.position.x + 5;
        boxer1.changeAnimation("walkingFlip");
        this.active = false;
      }

      if (keyDown("d") && boxer2.x < width / 2 + 500) {
        boxer2.position.x = boxer2.position.x + 5;
        boxer2.changeAnimation("blueboxerWalk");
        this.active = true;
      }

      if (keyDown("a") && boxer2.x > width / 2 - 500) {
        boxer2.position.x = boxer2.position.x - 5;
        boxer2.changeAnimation("blueboxerWalkFlip");
        this.active = false;
      }

      if (keyDown("space") && this.active == true) {
        boxer1.changeAnimation("redpunch");
        if (boxer1.isTouching(boxer2)) {
          this.life2 = this.life2 - 2;
        }
      }

      if (keyDown("space") && this.active == false) {
        boxer1.changeAnimation("redpunchFlip");
        if (boxer1.isTouching(boxer2)) {
          this.life2 = this.life2 - 2;
        }
      }

      if (keyDown("e") && this.active == true) {
        boxer2.changeAnimation("bluepunch");
        if (boxer2.isTouching(boxer1)) {
          this.life1 = this.life1 - 2;
        }
      }

      if (keyDown("e") && this.active == false) {
        boxer2.changeAnimation("bluepunchFlip");
        if (boxer2.isTouching(boxer1)) {
          this.life1 = this.life1 - 2;
        }
      }
    }
    }
}


function keyReleased() {
  if (keyCode == 37 && !keyRel) {
    boxer1.changeImage("redboxer");
  }
  if (keyCode == 39 && !keyRel) {
    boxer1.changeImage("redboxerFlip")
  }
  if (keyCode == 68 && !keyRel) {
    boxer2.changeImage("blueboxer");
  }
  if (keyCode == 65 && !keyRel) {
    boxer2.changeImage("blueboxerFlip")
  }
  /*if (keyCode == 69) {
    boxer1.changeImage("redboxer");
  }
  if (keyCode == 69) {
    boxer1.changeImage("redboxerFlip")
  }*/
}

