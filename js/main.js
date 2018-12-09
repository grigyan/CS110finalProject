    
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
    
    // try again sound at the end
    var sound = document.getElementById('tryAgain');
    var ser = document.getElementById('ser');

    // random sound reactions
    var toAnasun = document.getElementById('toAnasun');
    var zzveliTxaya = document.getElementById('zzveliTxa');
    var imonqEn = document.getElementById('imonqEn');
    

    //array that stores all the reaction sounds 
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
        width: 15,
        height: 150,
        draw: function(){
            context.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function(){

        }
    }

    paddle2 = {
        x: canvas.width - 15 - 2,
        y: canvas.height/2,
        width: 15,
        height: 150,
        speed: 8,
        draw: function(){
            context.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function(){
            if (this.y + (this.height/2) < ball.y - 35) {
                this.y += this.speed;
            } else if (this.y + (this.height/2) > ball.y + 35) {
                this.y -= this.speed;
            }
        }
    }

    ball = {
        x: canvas.width/2,
        y: canvas.height/2,
        xDelta: rand(8, 12),
        yDelta: rand(6, 10 ),
        radius: 13,

        initialXDelta: rand(8, 12), //this variable is used when starting new game
        initialYDelta: rand(6, 10), //this variable is used when starting new game
        
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
                        play(ser);
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


    //moving using mouse 
    function calculateMousePos(evt){
        const  rect = canvas.getBoundingClientRect();
        const root = document.documentElement;
        const mouseX = evt.clientX - rect.left - root.scrollLeft;
        const mouseY = evt.clientY - rect.top - root.scrollTop;
        return {
            x: mouseX,
            y: mouseY
        };
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

        canvas.addEventListener('mousemove', 
            function(evt){
                const mousePos = calculateMousePos(evt);
                paddle1.y = mousePos.y-(paddle1.height/2);
            });


        const spaceKey = 32;
        document.addEventListener('keyup', function(event){
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
     * multiplayer mode +
     * 
     * 
     * sometimes ball is stuck on top or in bottom, fix this - 
     * with each score paddle height becomes smaller and smaller -
     * finalize reaction part
     * 
     * 
     *      =====Andre Part=====
     *          cange colors-
     *          make buttons symmetric-
     *          add "GO Back" button-
     * 
     *  =====Alen Part=====
     * 
     *  =====Grig Part=====
     * 
     */





     /**
      * 
      * 
      * ai+
      * ball movement+
      * 
      * 
      * 
      * 
      * mknik+
      * multiplayer
      * ball movement
      * sound effects
      * interface
      * 
      * 
      * GRIG - ai, ball movement
      * Alen - sound, knopkeqov  
      * Andre - mouse movement, interface, html, css, key-responsive functions  
      */