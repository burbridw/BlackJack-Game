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
const cardAs = document.getElementById("cardAs")
const card2s = document.getElementById("card2s")
const card3s = document.getElementById("card3s")
const card4s = document.getElementById("card4s")
const card5s = document.getElementById("card5s")
const card6s = document.getElementById("card6s")
const card7s = document.getElementById("card7s")
const card8s = document.getElementById("card8s")
const card9s = document.getElementById("card9s")
const card10s = document.getElementById("card10s")
const cardJs = document.getElementById("cardJs")
const cardQs = document.getElementById("cardQs")
const cardKs = document.getElementById("cardKs")

const cardAh = document.getElementById("cardAh")
const card2h = document.getElementById("card2h")
const card3h = document.getElementById("card3h")
const card4h = document.getElementById("card4h")
const card5h = document.getElementById("card5h")
const card6h = document.getElementById("card6h")
const card7h = document.getElementById("card7h")
const card8h = document.getElementById("card8h")
const card9h = document.getElementById("card9h")
const card10h = document.getElementById("card10h")
const cardJh = document.getElementById("cardJh")
const cardQh = document.getElementById("cardQh")
const cardKh = document.getElementById("cardKh")

const cardAc = document.getElementById("cardAc")
const card2c = document.getElementById("card2c")
const card3c = document.getElementById("card3c")
const card4c = document.getElementById("card4c")
const card5c = document.getElementById("card5c")
const card6c = document.getElementById("card6c")
const card7c = document.getElementById("card7c")
const card8c = document.getElementById("card8c")
const card9c = document.getElementById("card9c")
const card10c = document.getElementById("card10c")
const cardJc = document.getElementById("cardJc")
const cardQc = document.getElementById("cardQc")
const cardKc = document.getElementById("cardKc")

const cardAd = document.getElementById("cardAd")
const card2d = document.getElementById("card2d")
const card3d = document.getElementById("card3d")
const card4d = document.getElementById("card4d")
const card5d = document.getElementById("card5d")
const card6d = document.getElementById("card6d")
const card7d = document.getElementById("card7d")
const card8d = document.getElementById("card8d")
const card9d = document.getElementById("card9d")
const card10d = document.getElementById("card10d")
const cardJd = document.getElementById("cardJd")
const cardQd = document.getElementById("cardQd")
const cardKd = document.getElementById("cardKd")

const cardValue = {
    1: 11,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
    11: 10,
    12: 10,
    13: 10,
    14: 1
}
const cardImgArrS = [cardAs,card2s,card3s,card4s,card5s,card6s,card7s,card8s,card9s,card10s,cardJs,cardQs,cardKs,cardAs]
const cardImgArrH = [cardAh,card2h,card3h,card4h,card5h,card6h,card7h,card8h,card9h,card10h,cardJh,cardQh,cardKh,cardAh]
const cardImgArrC = [cardAc,card2c,card3c,card4c,card5c,card6c,card7c,card8c,card9c,card10c,cardJc,cardQc,cardKc,cardAc]
const cardImgArrD = [cardAd,card2d,card3d,card4d,card5d,card6d,card7d,card8d,card9d,card10d,cardJd,cardQd,cardKd,cardAd]

cashEl.textContent = "$" + cash

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1;
    return randomNumber
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
    sum = cardValue[cards[0]] + cardValue[cards[1]]
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] === 1) {
            playerAceCount += 1
        }
    } renderGame()
    } else {
        message = "You can't make that bet"
        messageEl.textContent = message
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
       /* cardsEl.textContent += cards[i] + " "*/
       if (Math.floor( Math.random()*4 ) === 0) {
        cardsEl.appendChild(cardImgArrS[cards[i]-1].cloneNode(true))
       } else if (Math.floor( Math.random()*4 ) === 1) {
        cardsEl.appendChild(cardImgArrH[cards[i]-1].cloneNode(true))
       } else if (Math.floor( Math.random()*4 ) === 2) {
        cardsEl.appendChild(cardImgArrC[cards[i]-1].cloneNode(true))
       } else {
        cardsEl.appendChild(cardImgArrD[cards[i]-1].cloneNode(true))
       }
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
        if (card === 1 && sum > 10) {
            card = 14
        } else if (card === 1 && sum <= 10) {
            playerAceCount += 1
        }
        sum += cardValue[card]
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
    dealerSum = cardValue[dealerCards[0]] + cardValue[dealerCards[1]]
    for (let i = 0; i < dealerCards.length; i++) {
        if (dealerCards[i] === 1) {
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
       /* dealerEl.textContent += dealerCards[i] + " "*/
       if (Math.floor( Math.random()*2) !== 1) {
        dealerEl.appendChild(cardImgArrS[dealerCards[i]-1].cloneNode(true))
       } else {
        dealerEl.appendChild(cardImgArrH[dealerCards[i]-1].cloneNode(true))
       }
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
            dealerPlaying.textContent = "Dealer loses"
            cash = cash + (currentBet*2)
            cashEl.textContent = "$" + cash

        } else if (sum === dealerSum) {
            message = "Push, all bets refunded - Hit NEW GAME to begin"
            messageEl.textContent = message
            dealerPlaying.textContent = "Push"
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
        if (card === 1 && dealerSum > 10) {
            card = 14
        } 
        dealerSum += cardValue[card]
        dealerCards.push(card)
        renderDealer()        
    }
}