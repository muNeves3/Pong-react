import React from 'react';
import './styles.css'

class Pong extends React.Component {
    componentDidMount() {
        var canvas = document.getElementById("myCanvas");
        var context = canvas.getContext("2d");

        var keys = {};

        var ball = {
            x: canvas.width / 2 - 15,
            y: canvas.height / 2 - 15,
            height: 30,
            width: 30,
            dirX: -1,
            dirY: 1,
            speed: 1,
            mod: 0
        };

        var left = {
            x: 10,
            y: canvas.height / 2 - 60,
            height: 120,
            width: 30,
            score: 0,
            speed: 10
        };

        var right = {
            x: 560,
            y: canvas.height / 2 - 60,
            height: 120,
            width: 30,
            score: 0,
            speed: 10
        };

        document.addEventListener("keydown", e => {
            keys[e.keyCode] = true;
            //  console.log([e.keyCode]);
        }, false);

        document.addEventListener("keyup", e => {
            delete keys[e.keyCode];
        }, false);

        function moveBlocks() {
            if (87 in keys && left.y > 0)
                left.y -= left.speed;

            else if (83 in keys && left.y + left.height < canvas.height)
                left.y += left.speed;

            if (38 in keys && right.y > 0)
                right.y -= right.speed;
            else if (40 in keys && right.y + right.height < canvas.height)
                right.y += right.speed;
        }

        function moveBall() {
            if (ball.y + ball.height >= left.y && ball.y <= left.y + left.height && ball.x <= left.x + left.width) {
                ball.dirX = 1;
                ball.mod += 0.2
            }

            else if (ball.y + ball.height >= right.y && ball.y <= right.y + right.height && ball.x + ball.width >= right.x) {
                ball.dirX = -1;
                ball.mod += 0.2;
            }

            if (ball.y <= 0)
                ball.dirY = 1;
            else if (ball.y + ball.height >= canvas.height)
                ball.dirY = -1;

            ball.x += (ball.speed + ball.mod) * ball.dirX;
            ball.y += (ball.speed + ball.mod) * ball.dirY;

            if (ball.x < left.x + left.width - 15)
                newGame("player 2");
            else if (ball.x + ball.width > right.x + 15)
                newGame("player 1");
        }

        function newGame(winner) {
            if (winner === "player 1")
                ++left.score;
            else
                ++right.score;

            left.y = canvas.height / 2 - left.height / 2;
            right.y = left.y;
            ball.y = canvas.height / 2 - ball.height / 2;
            ball.x = canvas.width / 2 - ball.width / 2;
            ball.mod = 0;
        }

        function draw() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            moveBall();
            moveBlocks();

            context.fillStyle = "white";
            context.fillRect(left.x, left.y, left.width, left.height);
            context.fillRect(right.x, right.y, right.width, right.height);
            context.fillRect(ball.x, ball.y, ball.width, ball.height);

            context.font = "20px Arial";
            context.fillText(`player 1: ${left.score}`, 50, 20);
            context.fillText(`player 1: ${right.score}`, canvas.width - 150, 20);
        }

        setInterval(draw, 10);
    } 
    render() {
        return (<div className="content">
            <canvas id="myCanvas" height={600} width={600}>
                O seu browser não suporta esse elemento
            </canvas>
        </div>
        );

    }
}

export default Pong;