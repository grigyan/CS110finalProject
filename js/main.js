    const canvas = document.getElementById("CS110");
    const context = canvas.getContext('2d');
    canvas.width = 800;
    canvas.height = 600;
    

    //hero
    const hero = {
        x: 390,
        y: 550,
        xDelta: 0,
        yDelta: 0,
        width: 100,
        height: 20,
        draw: function() {
            
            context.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function() {
            this.x += this.xDelta;
            this.y += this.yDelta;
        }
    }

    
    //moving hero part
    const leftKey = 37;
    const upKey = 38;
    const rightKey = 39;
    const downKey = 40;

    //donw key
    document.addEventListener('keydown', function(event){
        if (event.keyCode === downKey) {
            hero.yDelta = 3;
        }
    }, false);
    document.addEventListener('keyup', function(event){
        if (event.keyCode === downKey) {
            hero.yDelta = 0;
        }
    }, false);
    //up key
    document.addEventListener('keydown', function(event){
        if (event.keyCode === upKey) {
            hero.yDelta = -3;
        }
    });
    document.addEventListener('keyup', function(event){
        if (event.keyCode === upKey) {
            hero.yDelta = 0;
        }
    });
    //right key
    document.addEventListener('keydown', function(event){
        if (event.keyCode === rightKey) {
            hero.xDelta = 3;
        }
    }, false);
    document.addEventListener('keyup', function(event){
        if (event.keyCode === rightKey) {
            hero.xDelta = 0;
        }
    }, false);
    //left key
    document.addEventListener('keydown', function(event){
        if (event.keyCode === leftKey) {
            hero.xDelta = -3;
        }
    }, false);
    document.addEventListener('keyup', function(event){
        if (event.keyCode === leftKey) {
            hero.xDelta = 0;
        }
    }, false);


    function drawBackground(){
        context.fillStyle = "grey";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "black";
    }

    const loop = function(){
        drawBackground();
        hero.draw();
        hero.update();
        requestAnimationFrame(loop);
    }
    loop();