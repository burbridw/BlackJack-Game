let cash = 200
let currentBet = 0
let cards = []
let dealerCards = []
let sum = 0
let dealerSum = 0
let hasBlackJack = false
let dealerHasBlackJack = false
let isAlive = false
let dealerIsAlive = false
let message = ""
let playerHolds = false
let playerAceCount = 0
let dealerAceCount = 0
const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const cashEl = document.getElementById("cash")
const betEl = document.getElementById("bet")
const dealerEl = document.getElementById("dealer-cards")
const dealerSumEl = document.getElementById("dealer-sum")
const dealerPlaying = document.getElementById("dealer-playing")

cashEl.textContent = "$" + cash

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    currentBet = betEl.value
    if (cash >= currentBet && betEl.value !== "" && betEl.value > 0) {
    hasBlackJack = false
    dealerHasBlackJack = false
    isAlive = true
    playerHolds = false
    dealerIsAlive = true
    playerAceCount = 0
    dealerAceCount = 0
    cash = cash - currentBet
    cashEl.textContent = "$" + cash
    dealerPlaying.textContent = ""
    dealerEl.textContent = ""
    dealerSumEl.textContent = ""
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] === 11) {
            playerAceCount += 1
        }
    }
    
    renderGame()
    } else {
        message = "You can't make that bet"
        messageEl.textContent = message
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    sumEl.textContent = "Sum: " + sum
    if (cards.length === 5 && sum <= 21) {
        hasBlackJack = true
        message = "Winner! 5 Card Trick - Hit NEW GAME to begin"
        messageEl.textContent = message
        cash = cash + (currentBet*2)
        cashEl.textContent = "$" + cash

    } else if (sum <= 20) {
        message = "Draw or Hold?"
    } else if (sum === 21 && cards.length === 2) {
        message = "Blackjack! You're a winner!"
        hasBlackJack = true
        cash = cash + (currentBet*2.5)
        cashEl.textContent = "$" + cash
    } else if (sum === 21 && cards.length > 2) {
        hold()
    } else if (sum > 21 && playerAceCount > 0) {
        sum -= 10
        playerAceCount -= 1
        sumEl.textContent = "Sum: " + sum
        message = "Draw or Hold?"
    } 
    else {
        message = "Game Over - Hit NEW GAME to begin"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false && playerHolds === false) {
        let card = getRandomCard()
        if (card === 11 && sum > 10) {
            card = 1
        } else if (card === 11 && sum <= 10) {
            playerAceCount += 1
        }
        sum += card
        cards.push(card)
        renderGame()        
    }
}
function hold() {
    if (isAlive === true && playerHolds === false && hasBlackJack === false) {
    playerHolds = true

    message = "Dealer's turn"
    messageEl.textContent = message
    dealerIsAlive = true
    let dealerFirstCard = getRandomCard()
    let dealerSecondCard = getRandomCard()
    dealerCards = [dealerFirstCard, dealerSecondCard]
    dealerSum = dealerFirstCard + dealerSecondCard
    for (let i = 0; i < dealerCards.length; i++) {
        if (dealerCards[i] === 11) {
            dealerAceCount += 1
            
        }
    }
    renderDealer()
    }
}

function renderDealer() {
    dealerPlaying.textContent = "Dealer Playing"
    dealerEl.textContent = "Dealer's Cards: "
    for (let i = 0; i < dealerCards.length; i++) {
        dealerEl.textContent += dealerCards[i] + " "
    } 
    dealerSumEl.textContent = "Sum: " + dealerSum
    if (dealerCards.length === 5 && dealerSum <= 21) {
        dealerPlaying.textContent = "5 Card Trick"
        message = "Game Over - Hit NEW GAME to begin"
        isAlive = false
        messageEl.textContent = message
    } else if (dealerSum < 17 && dealerSum < sum) {
        dealerPlaying.textContent = "Dealer draws"
        setTimeout(function(){
        dealerNewCard()
        }, 3000)
    } else if (dealerSum < 21) {
        if (sum > dealerSum){
            message = "You're a winner"
            messageEl.textContent = message
            cash = cash + (currentBet*2)
            cashEl.textContent = "$" + cash
        } else if (sum === dealerSum) {
            message = "Push, all bets refunded - Hit NEW GAME to begin"
            messageEl.textContent = message
            cash = cash + (currentBet*1)
            cashEl.textContent = "$" + cash
            isAlive = false
        } else {
            message = "Game Over - Hit NEW GAME to begin"
            isAlive = false
            dealerPlaying.textContent = "Dealer wins"
            messageEl.textContent = message
        }
    } else if (dealerSum === 21 && dealerCards.length > 2) {
        dealerPlaying.textContent = "Dealer has 21"
        if (dealerSum === sum) {
            message = "Push, all bets refunded - Hit NEW GAME to begin"
            messageEl.textContent = message
            cash = cash + (currentBet*1)
            cashEl.textContent = "$" + cash
        } else if (dealerSum > sum) {
            message = "Game Over - Hit NEW GAME to begin"
            messageEl.textContent = message
            isAlive = false
        }
    } else if (dealerSum === 21) {
        dealerPlaying.textContent = "Dealer has blackjack"
        dealerHasBlackJack = true
        if (dealerHasBlackJack === true && hasBlackJack === true) {
            message = "Push, all bets refunded - Hit NEW GAME to begin"
            messageEl.textContent = message
            cash = cash + (currentBet*1)
            cashEl.textContent = "$" + cash
        } else if (dealerHasBlackJack === true && hasBlackJack !== true) {
            message = "Game Over - Hit NEW GAME to begin"
            messageEl.textContent = message
            isAlive = false
        }
    } else if (dealerSum > 21 && dealerAceCount > 0) {
        dealerSum -= 10
        dealerAceCount -= 1 
        dealerSumEl.textContent = "Sum: " + dealerSum
        renderDealer()
    } else {
        message = "Dealer Bust - Hit NEW GAME to begin"
        dealerPlaying.textContent = "Dealer is bust"
        dealerIsAlive = false
        cash = cash + (currentBet*2)
        cashEl.textContent = "$" + cash
    }
    messageEl.textContent = message
}

function dealerNewCard() {
    if (dealerIsAlive === true && dealerHasBlackJack === false) {
        let card = getRandomCard()
        if (card === 11 && dealerSum > 10) {
            card = 1
        } 
        dealerSum += card
        dealerCards.push(card)
        renderDealer()        
    }
}