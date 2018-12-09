    
    //random untill that number
    const random = function(num) {
        return Math.floor(Math.random() * num) + 1;
    };

    //random between two different numbers
    const rand = function(min, max) {
        return Math.floor(Math.random() * (max-min+1) + min);
    };
 

    //bounce sound 
    var bounceSound = document.getElementById('bounce');
    
    // try again at the end
    var sound = document.getElementById('tryAgain');

    // random reactions
    var toAnasun = document.getElementById('toAnasun');
    var zzveliTxaya = document.getElementById('zzveliTxa');
    var imonqEn = document.getElementById('imonqEn');

    //array that stores all the sounds 
    var soundArr = [" ", toAnasun, zzveliTxaya, imonqEn];

    //function that plays given sound effect
    function play(object){

        var key = true;
        if(key){
            object.pause();
            object.currentTime = 0;
            object.play();
            key = false;
        }
    }

    //function that randomly plays
    function randomPlay(){
        var indexthSound = random(soundArr.length-1);
        console.log(indexthSound);
        var currentSound = soundArr[indexthSound];
        play(currentSound);
    }

    var canvas;
    var context;

    canvas = document.getElementById("CS110");
    context = canvas.getContext('2d');
    canvas.height = 790;
    canvas.width = 1517;

    let p1Score = 0;
    let p2Score = 0;
    const targetScore = 4;
    let showingWinScreen = false;

    paddle1 = {
        x: 2,
        y: canvas.height/2,
        speed:9,
        yDelta:0,
        width: 15,
        height: 150,
        draw: function(){
            context.fillRect(this.x, this.y, this.width, this.height);
        },
        update:function(){
            this.y += this.yDelta;
            if(this.y >= canvas.height){
                this.y = 0 - this.height
            }else if(this.y + this.height <= 0){
                this.y = canvas.height
            }
        }
    }

    paddle2 = {
        x: canvas.width - 15 - 2,
        y: canvas.height/2,
        speed:9,
        yDelta:0,
        width: 15,
        height: 150,
         draw: function(){
            context.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function(){
            this.y += this.yDelta;
            if(this.y >= canvas.height){
                this.y = 0 - this.height
            }else if(this.y + this.height <= 0){
                this.y = canvas.height
            }
        }
    }

    //1st player
    const upKey1 = 87;
    const downKey1 = 83;
    document.addEventListener('keydown', function(event) {
        if(event.keyCode === upKey1) {
        paddle1.yDelta = paddle1.speed*-1;
        }
        if(event.keyCode === downKey1){
        paddle1.yDelta = paddle1.speed;
        }
        }, false);
    document.addEventListener('keyup', function(event) {
        if(event.keyCode === downKey1){
        paddle1.yDelta = 0;
        }if( event.keyCode === upKey1){
        paddle1.yDelta = 0;
        }             
        }, false);

    //end 1st player    


    //2nd payer
    const upKey2 = 38;
    const downKey2 = 40;
    document.addEventListener('keydown', function(event) {
        if(event.keyCode === upKey2) {
        paddle2.yDelta = paddle2.speed*-1;
        }
        if(event.keyCode === downKey2){
            paddle2.yDelta = paddle2.speed;
        }
    }, false);
    document.addEventListener('keyup', function(event) {
        if(event.keyCode === downKey2){
        paddle2.yDelta = 0;
        }if( event.keyCode === upKey2){
        paddle2.yDelta = 0;
        }               
        }, false);

    //2nd player        




    ball = {
        x: canvas.width/2,
        y: canvas.height/2,
        xDelta: rand(8, 12),
        yDelta: rand(5, 9 ),
        radius: 13,

        initialXDelta: rand(8, 12), //this variable is used when starting new game
        initialYDelta: rand(5, 9), //this variable is used when starting new game
        
        draw: function(){
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            context.fill();
        },

        update: function(){
            //moving by X axis
            this.x = this.x + this.xDelta;

    //bounce from right side
    if (this.x + this.radius > canvas.width) {
        if (this.y > paddle2.y && this.y < paddle2.y+paddle2.height) {
            play(bounceSound);
            this.xDelta = -this.xDelta;
            const deltaYSpeed = this.y - (paddle2.y + paddle2.height/2);
            this.yDelta = deltaYSpeed * 0.25; 
        } else {
            p1Score++;
            if(p1Score >= targetScore){
                play(sound);
            } else{
                randomPlay();
            }
            this.reset();
        }
    } 

    //bounce from left side
    if (this.x - this.radius < 0){
        
        if (this.y > paddle1.y && this.y < paddle1.y+paddle1.height ) {
            play(bounceSound);
            this.xDelta = -this.xDelta;
            const deltaYSpeed = this.y - (paddle1.y + paddle1.height/2);
            this.yDelta = deltaYSpeed * 0.35; 
        } else {
            p2Score++;
            if(p2Score >= targetScore){
                play(sound);
            } else{
                randomPlay();
            }
            this.reset();
        }
        
    }

            //moving by Y axis
            this.y = this.y + this.yDelta;
            
            //bounce from top and bottom 
            if (this.y + this.radius > canvas.height) {
                play(bounceSound);
                this.yDelta = -this.yDelta;
            } else if (this.y - this.radius < 0){
                play(bounceSound);
                this.yDelta = -this.yDelta;
            }
        },

        reset: function(){
            this.x = canvas.width/2;
            this.y = canvas.height/2;
            this.xDelta = -this.xDelta;
            this.yDelta = 3;

            
            
            if(p1Score >= targetScore || p2Score >= targetScore) {
                showingWinScreen = true;

            }
            
        },

        stop: function(){
            if(showingWinScreen){
                context.fillText("Press space to try again", 508, 90);
                context.fillText(p1Score, 600, 175);
                context.fillText(p2Score, canvas.width-600, 175);
                if(p1Score>=targetScore){
                    context.fillText("Left player won!!!", 100, 650);
                } else if(p2Score>=targetScore){
                    context.fillText("Right player won!!!", 1040, 650);
                }
                this.xDelta = 0;
                this.yDelta = 0;
            }
        }

    }


    function displayScore(){
        context.font = "45px Arial";
        context.fillText(p1Score, 600, 175);
        context.fillText(p2Score, canvas.width-600, 175);
    }


    function showNet(){
        for (let i = 0; i < canvas.height; i += 45) {
            context.fillRect(canvas.width/2-1, i, 2, 20);
        }
    }

    
    function readySetGo(){
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'white';
        ball.draw();
        ball.update();
        ball.stop();
        paddle1.draw();
        paddle1.update();
        paddle2.draw();
        paddle2.update();
        displayScore(); 
        showNet();   
    }


    window.onload = function (){
        const fps = 55;
        setInterval(readySetGo, 1000/fps);
        const spaceKey = 32;
        document.addEventListener('keydown', function(event){
            if (event.keyCode === spaceKey) {
                    ball.x = canvas.width/2;
                    ball.y = canvas.height/2;
                    ball.xDelta = ball.initialXDelta;
                    ball.yDelta = ball.initialYDelta;
                    p1Score = 0;
                    p2Score = 0;
                    showingWinScreen = false;
                }
            }, true);
        
        
    }


    /**
     * make the score digits bigger +
     * when someone scores, ball should start with its initial speed to the opposit direction +
     * user-interface +-
     * when ending the game, final score should be as it is +
     * sometimes ball is stuck on top or in bottom, fix this - 
     * target score is 8 -
     * with each score paddle height becomes smaller and smaller -
     * multiplayer mode -
     * bounce from padlles, do not get into it -
     * (PADDLE 2 movement) when ball is far enough do not move -
     */
