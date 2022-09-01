let gamesPlayed = 0

let cash = 200
let currentBet = 0
let bankrupt = false

let cards = []
let dealerCards = []

let playerSum = 0
let playerSumAtHold = 0
let dealerSum = 0

let hasBlackJack = false
let dealerHasBlackJack = false

let isAlive = false
let dealerIsAlive = false
let playerHolds = false

let playerAceCount = 0
let dealerAceCount = 0

let message = ""

let currentLoan = 0
let loanPayment = 0
let loanTotalPayment = 0
let loanAmount = 0
let bankIsOpen = false

const gameCountEl = document.getElementById("gameCounter")
const startBtn = document.getElementById("start-btn")
const holdBtn = document.getElementById("hold-btn")
const drawBtn = document.getElementById("draw-btn")
const messageEl = document.getElementById("message-el")
const sumEl = document.getElementById("sum-el")
const cardsEl = document.getElementById("cards-el")
const cashEl = document.getElementById("cash")
const betEl = document.getElementById("bet")
const dealerEl = document.getElementById("dealer-cards")
const dealerSumEl = document.getElementById("dealer-sum")
const dealerPlaying = document.getElementById("dealer-playing")
const bankEl = document.getElementById("bank")
let maxBet = betEl.getAttribute("max")

const gotoBankBtn = document.getElementById("goto-bank-btn")
const loanBtn = document.getElementById("take-loan-btn")
const repayBtn = document.getElementById("repay-loan-btn")
const leaveBankBtn = document.getElementById("leave-bank-btn")
const bankInput = document.getElementById("bank-input")
const bankMessage = document.getElementById("bank-message")
const loanDisp = document.getElementById("loan-disp")
const paymentDisp = document.getElementById("payment-disp")


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

maxBet = Number(cash)

bankEl.style.display = "none"
cashEl.textContent = `Cash: $${cash}`
loanDisp.textContent = `Current Loans: $${currentLoan}`
paymentDisp.textContent = `Payment per round: $${loanTotalPayment}`

startBtn.addEventListener("click", function(){
    startGame()
})
holdBtn.addEventListener("click",function(){
    hold()
})
drawBtn.addEventListener("click",function(){
    newCard(isAlive, hasBlackJack, false, playerAceCount, playerSum, cards, renderGame)
})
gotoBankBtn.addEventListener("click",function(){
    if (bankIsOpen) {
    bankEl.style.display ="none"
    bankInput.value = ""
    bankIsOpen = false
    } else {
    bankEl.style.display = "block"
    bankIsOpen = true
    }
})
leaveBankBtn.addEventListener("click",function(){
    bankEl.style.display ="none"
    bankInput.value = ""
    bankIsOpen = false
})

function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1;
    return randomNumber
}

function cycleLoan() {
    bankInput.value = ""
    if (betEl.value > maxBet && betEl.value <= Number(cash)) {
        message = "Your loan payments make that bet impossible"
        messageEl.textContent = message
    } else if (loanTotalPayment === currentLoan && loanTotalPayment <= cash) {
        cash = Number(cash) - Number(loanTotalPayment)
        cashEl.textContent = `Cash: $${cash}`
        currentLoan = Number(currentLoan) - Number(loanTotalPayment)
        loanDisp.textContent = `Current Loans: $${currentLoan}`
        paymentDisp.textContent = `Payment per round: $0`
    } else if (loanTotalPayment < currentLoan && loanTotalPayment <= cash) {
        cash = Number(cash) - Number(loanTotalPayment)
        cashEl.textContent = `Cash: $${cash}`
        currentLoan = Number(currentLoan) - Number(loanTotalPayment)
        loanDisp.textContent = `Current Loans: $${currentLoan}`
    } else if (loanTotalPayment > currentLoan && currentLoan <= cash) {
        loanTotalPayment = currentLoan
        cash = Number(cash) - Number(loanTotalPayment)
        cashEl.textContent = `Cash: $${cash}`
        currentLoan = Number(currentLoan) - Number(loanTotalPayment)
        loanDisp.textContent = `Current Loans: $${currentLoan}`
        paymentDisp.textContent = `Payment per round: $0`
    } else if (loanTotalPayment > cash && currentLoan > 0) {
        message = "You cannot make your loan payment!"
        messageEl.textContent = message
        isAlive = false
    } 
}

function startGame() {
    console.log(Number(maxBet))
    maxBet =  Number(cash) - Number(loanTotalPayment)
    isAlive = true
    cycleLoan()
    if (isAlive) {
    gamesPlayed += 1
    gameCountEl.textContent = "Games played: " + gamesPlayed
    currentBet = betEl.value
    console.log(cash)
    console.log(currentBet)
    console.log(maxBet)
    if ( Number(cash) >= Number(currentBet) && Number(currentBet) <= Number(maxBet) && Number(currentBet) > 0 ) {
    hasBlackJack = false
    dealerHasBlackJack = false
    isAlive = true
    playerHolds = false
    dealerIsAlive = true
    playerAceCount = 0
    dealerAceCount = 0
    dealerSum = 0
    cash = cash - currentBet
    cashEl.textContent = `Cash: $${cash}`
    dealerPlaying.textContent = ""
    dealerEl.textContent = ""
    dealerSumEl.textContent = ""
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    playerSum = cardValue[cards[0]] + cardValue[cards[1]]
    for (let i = 0; i < cards.length; i++) {
        if (cards[i] === 1) {
            playerAceCount += 1
        }
    } renderGame()
    } else {
        message = "You can't make that bet due to insufficient cash or loan payments"
        messageEl.textContent = message
        gamesPlayed -= 1
        gameCountEl.textContent = "Games played: " + gamesPlayed
        betEl.value = maxBet
    }
}}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
       /* cardsEl.textContent += cards[i] + " "*/
       if (Math.floor( Math.random()*4 ) === 0) {
        cardsEl.append(cardImgArrS[cards[i]-1].cloneNode(true))
       } else if (Math.floor( Math.random()*4 ) === 1) {
        cardsEl.append(cardImgArrH[cards[i]-1].cloneNode(true))
       } else if (Math.floor( Math.random()*4 ) === 2) {
        cardsEl.append(cardImgArrC[cards[i]-1].cloneNode(true))
       } else {
        cardsEl.append(cardImgArrD[cards[i]-1].cloneNode(true))
       }
    }
    sumEl.textContent = "Sum: " + playerSum
    if (cards.length === 5 && playerSum <= 21) {
        hasBlackJack = true
        message = "Winner! 5 Card Trick - Hit NEW GAME to begin"
        messageEl.textContent = message
        cash = cash + (currentBet*2)
        cashEl.textContent = `Cash: $${cash}`

    } else if (playerSum <= 20) {
        message = "Draw or Hold?"
    } else if (playerSum === 21 && cards.length === 2) {
        message = "Blackjack! You're a winner!"
        hasBlackJack = true
        cash = cash + (currentBet*2.5)
        cashEl.textContent = `Cash: $${cash}`
    } else if (playerSum === 21 && cards.length > 2) {
        hold()
    } else if (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10
        playerAceCount -= 1
        sumEl.textContent = "Sum: " + playerSum
        message = "Draw or Hold?"
    } 
    else {
        message = "Game Over - Hit NEW GAME to begin"
        isAlive = false
    }
    messageEl.textContent = message
}

function newCard(aliveState, blackjackState, holdState, aceCount, sumCount, cardSet, renderFunc) {
    if(aliveState === true && blackjackState === false && playerHolds === holdState) {
        let card = getRandomCard()
        if (card === 1 && sumCount > 10) {
            card = 14
        } else if (card === 1 && sumCount <= 10) {
            aceCount += 1
        }
        sumCount += cardValue[card]
        playerSum = sumCount
        dealerSum = sumCount
        cardSet.push(card)
        renderFunc()
    }
}

function hold() {
    if (isAlive === true && playerHolds === false && hasBlackJack === false) {
    playerHolds = true
    playerSumAtHold = playerSum
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
       if (Math.floor( Math.random()*4 ) === 0) {
        dealerEl.appendChild(cardImgArrS[dealerCards[i]-1].cloneNode(true))
       } else if (Math.floor( Math.random()*4 ) === 1) {
        dealerEl.appendChild(cardImgArrH[dealerCards[i]-1].cloneNode(true))
       } else if (Math.floor( Math.random()*4 ) === 2) {
        dealerEl.appendChild(cardImgArrC[dealerCards[i]-1].cloneNode(true))
       } else {
        dealerEl.appendChild(cardImgArrD[dealerCards[i]-1].cloneNode(true))
       }
    }
    dealerSumEl.textContent = "Sum: " + dealerSum
    if (dealerCards.length === 5 && dealerSum <= 21) {
        dealerPlaying.textContent = "5 Card Trick"
        message = "Game Over - Hit NEW GAME to begin"
        isAlive = false
        messageEl.textContent = message
    } else if (dealerSum < 17 && dealerSum <= playerSumAtHold) {
        dealerPlaying.textContent = "Dealer draws"
        setTimeout(function(){
        newCard(dealerIsAlive, dealerHasBlackJack, true, dealerAceCount, dealerSum, dealerCards, renderDealer)
        }, 3000)
    } else if (dealerSum < 21) {
        if (playerSumAtHold > dealerSum){
            message = "You're a winner"
            messageEl.textContent = message
            dealerPlaying.textContent = "Dealer loses"
            cash = cash + (currentBet*2)
            cashEl.textContent = `Cash: $${cash}`

        } else if (playerSumAtHold === dealerSum) {
            message = "Push, all bets refunded - Hit NEW GAME to begin"
            messageEl.textContent = message
            dealerPlaying.textContent = "Push"
            cash = cash + (currentBet*1)
            cashEl.textContent = `Cash: $${cash}`
            isAlive = false
        } else {
            message = "Game Over - Hit NEW GAME to begin"
            isAlive = false
            dealerPlaying.textContent = "Dealer wins"
            messageEl.textContent = message
        }
    } else if (dealerSum === 21 && dealerCards.length > 2) {
        dealerPlaying.textContent = "Dealer has 21"
        if (dealerSum === playerSumAtHold) {
            message = "Push, all bets refunded - Hit NEW GAME to begin"
            messageEl.textContent = message
            cash = cash + (currentBet*1)
            cashEl.textContent = `Cash: $${cash}`
        } else if (dealerSum > playerSumAtHold) {
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
            cashEl.textContent = `Cash: $${cash}`
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
        cashEl.textContent = `Cash: $${cash}`
    }
    messageEl.textContent = message
}

loanBtn.addEventListener("click", function() {
    takeLoan()
})
repayBtn.addEventListener("click", function() {
    repayLoan()
})

function takeLoan () {
    let loanAmount = bankInput.value
    cash = Number(cash) + Number(loanAmount)
    let interest = Number(loanAmount/10)
    currentLoan = Number(currentLoan) + Number(loanAmount) + Number(interest)
    loanPayment = Number(currentLoan) /10
    loanTotalPayment = Number(loanTotalPayment) + Number(loanPayment)
    betEl.setAttribute("max", cash - loanTotalPayment)
    cashEl.textContent = `Cash: $${cash}`
    paymentDisp.textContent = `Payment per round: $${loanTotalPayment}`
    loanDisp.textContent = `Current Loans: $${currentLoan}`
    bankrupt === false
}

function repayLoan() {
    let repayAmount = bankInput.value
    if (Number(repayAmount) === Number(currentLoan) && Number(repayAmount) <= Number(cash)) {
        cash = Number(cash) - Number(repayAmount)
        currentLoan = Number(currentLoan) - Number(repayAmount)
        loanTotalPayment = currentLoan
        cashEl.textContent = `Cash: $${cash}`
        loanDisp.textContent = `Current Loans: $${currentLoan}`
        bankMessage.textContent = "Thank you for your payment"
        paymentDisp.textContent = `Payment per round: $0`
    } else if (repayAmount <= cash && repayAmount < currentLoan) {
        cash = Number(cash) - Number(repayAmount)
        currentLoan = Number(currentLoan) - Number(repayAmount)
        loanTotalPayment = Number(currentLoan) / 10
        paymentDisp.textContent = `Payment per round: $${loanTotalPayment}`
        cashEl.textContent = `Cash: $${cash}`
        loanDisp.textContent = `Current Loans: $${currentLoan}`
        bankMessage.textContent = "Thank you for your payment"
    } else if (repayAmount > cash && repayAmount <= currentLoan) {
        bankMessage.textContent = "You do not have enough cash"
    } else if (repayAmount > currentLoan) {
        bankMessage.textContent = "That amount exceeds your loan!"
        bankInput.value = currentLoan
    }
}

