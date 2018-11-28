    
    var canvas;
    var context;

    canvas = document.getElementById("CS110");
    context = canvas.getContext('2d');
    canvas.height = 600;
    canvas.width = 800;

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


    let p1Score = 0;
    let p2Score = 0;
    
    

    ball = {
        x: 50,
        y: 50,
        xDelta: 5,
        yDelta: 4,
        radius: 10,
        
        draw: function(){
            context.beginPath();
            context.arc(this.x, this.y, this.radius, 0, Math.PI*2, true);
            context.fill();
            
        },
        reset: function(){
            this.x = canvas.width/2;
            this.y = canvas.height/2;
            this.xDelta = -this.xDelta;
            const targetScore = 2;
            if (p1Score == targetScore) {
                
                alert('YOU WIN!!!');
                p1Score = 0;
                p2Score = 0;
            } 
            if (p2Score == targetScore) {
                
                alert('YOU LOSE(((');
                p1Score = 0;
                p2Score = 0;
            } 

        },
        update: function(){
            this.x = this.x + this.xDelta;
            if (this.x + this.radius > canvas.width) {
                if (this.y > paddle2.y && this.y < paddle2.y+paddle2.height) {
                    this.xDelta = -this.xDelta;
                    const deltaYSpeed = this.y - (paddle2.y + paddle2.height/2);
                    this.yDelta = deltaYSpeed * 0.2; 
                } else {
                    p1Score++;
                    this.reset();
                }
            } 
            
            if (this.x - this.radius < 0){
                
                if (this.y > paddle1.y && this.y < paddle1.y+paddle1.height) {
                    this.xDelta = -this.xDelta;
                    const deltaYSpeed = this.y - (paddle1.y + paddle1.height/2);
                    this.yDelta = deltaYSpeed * 0.35; 
                } else {
                    p2Score++;
                    this.reset();
                }
                
            }

            this.y = this.y + this.yDelta;
            if (this.y + this.radius > canvas.height) {
                this.yDelta = -this.yDelta;
            } else if (this.y - this.radius < 0){
                this.yDelta = -this.yDelta;
            }
        },
        
         
    }


    paddle2 = {
        x: canvas.width - 15,
        y: canvas.height/2,
        width: 15,
        height: 100,
        //YCenter: this.y + (this.height/2),
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


    function displayScore(){
        context.fillText(p1Score, 175, 175);
        context.fillText(p2Score, canvas.width-175, 175);
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
        paddle1.draw();
        paddle1.update();
        paddle2.draw();
        paddle2.update();
        displayScore(); 
        showNet();
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



    window.onload = function (){
        const fps = 50;
        setInterval(readySetGo, 1000/fps);

    canvas.addEventListener('mousemove', 
        function(evt){
            const mousePos = calculateMousePos(evt);
            paddle1.y = mousePos.y-(paddle1.height/2);
        });
    }
    
     

