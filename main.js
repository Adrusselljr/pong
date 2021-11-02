// Size of the game area (in px)
const GAME_AREA_WIDTH = 700
const GAME_AREA_HEIGHT = 500

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100
const PADDLE_WIDTH = 20

// Size of the ball (in px)
const BALL_SIZE = 20

// Get random velocity
const random = () => {
    let num = [3, 4, 5, 6, 7]
    return num[Math.ceil(Math.random() * num.length - 1)]
}

// Get the elements
const computerPaddle = document.querySelector('.computer-paddle')
const playerPaddle = document.querySelector(".player-paddle")
const ball = document.querySelector(".ball")
const playerScore = document.querySelector(".playerScore")
const computerScore = document.querySelector(".computerScore")

// The computer paddle start position / velocity
let computerPaddleYPosition = 200
let computerPaddleYVelocity = 3

// The player paddle start position / velocity
let playerPaddleYPosition = 200
let playerPaddleYVelocity = 0

// Update the pong world

let xPosition
let yPosition
let xVelocity
let yVelocity

let playerCount = 0
let computerCount = 0

playerScore.innerText = playerCount
computerScore.innerText = computerCount

const reset = () => {

    xPosition = 350
    yPosition = 250
    xVelocity = random()
    yVelocity = random()

    if(playerCount === 20 || computerCount === 20) {
        playerCount = 0
        computerCount = 0
    }
    
}
reset()

function update() {

    // Update the ball's position
    yPosition -= yVelocity
    ball.style.top = `${yPosition}px`
    xPosition -= xVelocity
    ball.style.left = `${xPosition}px`

    // Ball hits bottom border
    if(yPosition > 480) {
        yPosition = 480
        yVelocity = random()
    }

    // Ball hits right border
    if(xPosition > 680) {
        // xPosition = 680
        // xVelocity = random()
        playerScore.innerText = playerCount++
        reset()
    }

    // Ball hits top border
    if(yPosition < 0) {
        yPosition = 0
        yVelocity = -random()
    }

    // Ball hits left border
    if(xPosition < 0) {
        // xPosition = 0
        // xVelocity = -random()
        computerScore.innerText = computerCount++
        reset()
    }

    // Ball hits computer paddle

    // Update the computer paddle's position
    computerPaddleYPosition += computerPaddleYVelocity

    if(computerPaddleYPosition > 400) {
        computerPaddleYPosition = 400
        computerPaddleYVelocity = -random()
    }
    if(computerPaddleYPosition < 0) {
        computerPaddleYPosition = 0
        computerPaddleYVelocity = random()
    }

    // Update the player paddle's position
    playerPaddleYPosition += playerPaddleYVelocity

    // Apply the paddle's y-position 
    computerPaddle.style.top = `${computerPaddleYPosition}px`
    playerPaddle.style.top = `${playerPaddleYPosition}px`
}

// Call the update() function every 35ms
setInterval(update, 35)
