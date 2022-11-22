'use strict'


var qLevel = 4  //easy = 4 ; medium = 5 ; hard = 6
var gBoard
var gCounter = 0
var gInterval
var gSeconds = 0
var gMilliseconds = 0
var isGameOn = false


// var ellInputs = document.querySelectorAll('.level')
// console.log('ellInputs', ellInputs)


function onInit() {

    if (gInterval) clearInterval(gInterval)
    playGame()
    // if (gCounter === (qLevel * qLevel)) gameEnd()
}

function playGame() {
    gCounter = 0
    gSeconds = 0
    gMilliseconds = 0
    gBoard = createBoard()
    renderBoard(gBoard)

}


function onCellClicked(elTd, cellI, cellJ) {
    if (!isGameOn) {
        startWatch()
        isGameOn = true
    }
    // console.log('hi', cellI,cellJ)
    var num = +elTd.innerText
    if (!elTd.classList.contains('clicked') && (num === (gCounter + 1))) {
        elTd.classList.add('clicked')
        gCounter++
    }
    console.log('gCounter', gCounter)
    if (gCounter === (qLevel * qLevel)) gameEnd()
}


function gameEnd() {
    isGameOn = false
    stopWatch()

}

function createBoard() {
    var amountOfCells = qLevel * qLevel
    var nums = getRandBoard()
    var board = []
    for (var i = 0; i < amountOfCells; i++) {
        var rand = (getRandomInt(1, (nums.length)) - 1)
        var num = nums.splice(rand, 1)
        board.push(num[0])
    }
    return board
}

function getRandBoard() {
    var amountOfCells = qLevel * qLevel
    var nums = []
    for (var i = 0; i < amountOfCells; i++) {
        nums.push(i + 1)
    }
    return nums
}

function renderBoard(board) {
    var elBoard = document.querySelector('.board')
    var elTimer = document.querySelector('.timer')
    var counter = 0
    var strHTML = ''
    for (var i = 0; i < qLevel; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < qLevel; j++) {
            var cell = board[counter]
            var cellData = 'data-i="' + i + '" data-j="' + j + '"'
            strHTML += `<td class="cell" ${cellData}
            onclick="onCellClicked(this,${i},${j})">
            ${cell}</td>`
            counter++
        }
        strHTML += '</tr>\n'
    }
    elBoard.innerHTML = strHTML
    elTimer.innerHTML = `Timer:`   
}

function onChooseLevel() {
    if (isGameOn) return
    var list = document.querySelector('.levelsList').value
    // console.log('list', list)
    qLevel = +list
    playGame()
}

function startWatch() {
    if (gInterval) clearInterval(gInterval)
    // displayTimer()
    gInterval = setInterval(displayTimer, 10)


}

function stopWatch() {
    clearInterval(gInterval)
}

function resetWatch() {
    clearInterval(gInterval)
    displayTimer()
}

function displayTimer() {
    var elTimer = document.querySelector('.timer')
    gMilliseconds += 10 //if dont want to show 3 digits after dot can change to: gMilliseconds += 10 
    if (gMilliseconds == 1000) {
        gMilliseconds = 0
        gSeconds++
    }
    var s = (gSeconds < 10) ? "0" + gSeconds : gSeconds
    // var ms = gMilliseconds < 10 ? "00" + gMilliseconds : (gMilliseconds < 100) ? "0" + gMilliseconds : gMilliseconds
    var ms = gMilliseconds
    if(ms<10){
        ms = '00' + gMilliseconds
    }else if(ms<100){
        ms = '0' + gMilliseconds
    }
    elTimer.innerHTML = `Timer: <span class="digits">${s}.${ms}</span>`

}