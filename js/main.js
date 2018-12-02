    
    const rand = function(num) {
        return Math.floor(Math.random() * num) + 1;
    };
    
    var canvas;
    var context;

    canvas = document.getElementById("CS110");
    context = canvas.getContext('2d');
    canvas.height = 600;
    canvas.width = 800;

    let p1Score = 0;
    let p2Score = 0;
    const targetScore = 3;
    let showingWinScreen = false;

    paddle1 = {
        x: 0,
        y: 50,
        width: 15,
        height: 100,
        draw: function(){
            context.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function(){

        }
    }

    paddle2 = {
        x: canvas.width - 15,
        y: canvas.height/2,
        width: 15,
        height: 100,
        draw: function(){
            context.fillRect(this.x, this.y, this.width, this.height);
        },
        update: function(){
            if (this.y + (this.height/2) < ball.y - 35) {
                this.y += 6;
            } else if (this.y + (this.height/2) > ball.y + 35) {
                this.y -= 6;
            }
        }
    }

    ball = {
        x: canvas.width/2,
        y: canvas.height/2,
        xDelta: rand(4),
        yDelta: rand(4),
        radius: 10,

        initialXDelta: 3, //this variable is used when starting new game
        initialYDelta: 4, //this variable is used when starting new game
        
        draw: function(){
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            context.fill();
        },


        update: function(){
            //moving by X axis
            this.x = this.x + this.xDelta;

            //bounce from left side
            if (this.x + this.radius > canvas.width) {
                if (this.y > paddle2.y && this.y < paddle2.y+paddle2.height) {
                    this.xDelta = -this.xDelta;
                    const deltaYSpeed = this.y - (paddle2.y + paddle2.height/2);
                    this.yDelta = deltaYSpeed * 0.25; 
                } else {
                    p1Score++;
                    this.reset();
                }
            } 

            //bounce from rigth side
            if (this.x - this.radius < 0){
                
                if (this.y > paddle1.y && this.y < paddle1.y+paddle1.height ) {
                    this.xDelta = -this.xDelta;
                    const deltaYSpeed = this.y - (paddle1.y + paddle1.height/2);
                    this.yDelta = deltaYSpeed * 0.35; 
                } else {
                    p2Score++;
                    this.reset();
                }
                
            }

            //moving by Y axis
            this.y = this.y + this.yDelta;
            
            //bounce from top and bottom 
            if (this.y + this.radius > canvas.height) {
                this.yDelta = -this.yDelta;
            } else if (this.y - this.radius < 0){
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
                context.fillText("press space to continue", 100, 100);
                context.fillText(p1Score, 175, 175);
                context.fillText(p2Score, canvas.width-175, 175);
                if(p1Score>=targetScore){
                    context.fillText("Left player won!!!", 50, 500);
                } else if(p2Score>=targetScore){
                    context.fillText("Right player won!!!", 420, 500);
                }
                this.xDelta = 0;
                this.yDelta = 0;
               
            }
        }

    }


    function displayScore(){
        context.font = "45px Arial";
        context.fillText(p1Score, 175, 175);
        context.fillText(p2Score, canvas.width-175, 175);
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
     * bounce from padlles, do not get into it -
     * make the score digits bigger +
     * when someone scores, ball should start with its initial speed to the opposit direction +
     * (PADDLE 2 movement) when ball is far enough do not move -
     * user-interface +-
     * when ending the game, final score should be as it is +
     * sometimes ball is stuck on top or in bottom, fix this - 
     * target score is 8 -
     * with each score paddle height becomes smaller and smaller -
     * multiplayer mode -
     * 
     */