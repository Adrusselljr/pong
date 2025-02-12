// Set Query Params
const urlSearchParams = new URLSearchParams(window.location.search)
const params = Object.fromEntries(urlSearchParams.entries())

const difficulty = params.difficulty

// Size of the game area (in px)
const GAME_AREA_WIDTH = 700
const GAME_AREA_HEIGHT = 500

// Size of the paddles (in px)
const PADDLE_HEIGHT = 100
const PADDLE_WIDTH = 20

// Size of the ball (in px)
const BALL_SIZE = 20

// Get random velocity
const randomV = () => {
    let num = [3, 4, 5, 6, 7]
    return num[Math.ceil(Math.random() * num.length - 1)]
}

const randomSign = () => {
    let sign = [0, 1, 2, 3]
    return sign[Math.ceil(Math.random() * sign.length - 1)]
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
let computerPaddleXPosition = 679

// The player paddle start position / velocity
let playerPaddleYPosition = 200
let playerPaddleYVelocity = 0
let playerPaddleXPosition = 25

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

    if(randomSign() === 1) {
        xVelocity = -randomV()
        yVelocity = -randomV()
    }
    else if(randomSign() === 2) {
        xVelocity = -randomV()
        yVelocity = randomV()
    }
    else if(randomSign() === 3) {
        xVelocity = randomV()
        yVelocity = -randomV()
    }
    else {
        xVelocity = randomV()
        yVelocity = randomV()
    }
    
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
    if(yPosition > 485) {
        yPosition = 485
        if(difficulty === "hard") {
            yVelocity = 12
        }
        else {
            yVelocity = randomV()
        }
    }

    // Ball hits right border
    if(xPosition > 685) {
        // xPosition = 680
        // xVelocity = randomV()
        playerCount++
        playerScore.innerText = playerCount
        reset()
    }

    // Ball hits top border
    if(yPosition < 6) {
        yPosition = 6
        if(difficulty === "hard") {
            yVelocity = -12
        }
        else {
            yVelocity = -randomV()
        }
    }

    // Ball hits left border
    if(xPosition < 7) {
        // xPosition = 0
        // xVelocity = -randomV()
        computerCount++
        computerScore.innerText = computerCount
        reset()
    }

    // Ball hits computer paddle
    if(yPosition + 10 >= computerPaddleYPosition &&
        yPosition <= computerPaddleYPosition + 100 &&
        xPosition + 10 >= computerPaddleXPosition
    ) {
        yVelocity *= -1
        xVelocity *= -1
    }


    // Ball hits player paddle
    if(yPosition + 10 >= playerPaddleYPosition &&
        yPosition <= playerPaddleYPosition + 100 &&
        xPosition + 10 <= playerPaddleXPosition
    ) {
        yVelocity *= -1
        xVelocity *= -1
    }

    // Update the computer paddle's position

    if(difficulty === "hard") {
        computerPaddleYPosition = yPosition
    }
    else {
        computerPaddleYPosition += computerPaddleYVelocity
    }

    // BOTTOM
    if(computerPaddleYPosition > 400) {
        computerPaddleYPosition = 400
        computerPaddleYVelocity = -randomV()
    }
    // TOP
    if(computerPaddleYPosition < 0) {
        computerPaddleYPosition = 0
        computerPaddleYVelocity = randomV()
    }

    // Update the player paddle's position

    // BOTTOM
    if(playerPaddleYPosition > 397) {
        playerPaddleYPosition = 393
    }
    // TOP
    if(playerPaddleYPosition < 3) {
        playerPaddleYPosition = 6
    }

    // Update the player paddle's position
    playerPaddleYPosition += playerPaddleYVelocity

    // Apply the paddle's y-position 
    computerPaddle.style.top = `${computerPaddleYPosition}px`
    playerPaddle.style.top = `${playerPaddleYPosition}px`

}

// Call the update() function every 35ms
setInterval(update, 35)

// Event listener for key down
document.addEventListener("keydown", function (e) {
    if(e.key === "ArrowUp") {
        playerPaddleYVelocity = -6
    }
    else if(e.key === "ArrowDown") {
        playerPaddleYVelocity = 6
    }
})