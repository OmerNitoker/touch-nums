'use strict'

var gNums
var gSize = 16
var gNextNum = 1
var gTimes
var gIntervalId

function initGame() {
    gNums = buildNums()
    gTimes = [0, 0, 0] //milisecs, secs, mins, hrs
    renderTime()
    renderBoard()
}

function setBoardSize(btn) {
    var level = btn.innerText
    if (level === 'Hard (36)') gSize = 36
    else if (level === 'Medium (25)') gSize = 25
    else gSize = 16
    gNextNum = 1
    initGame()
}

function buildNums() {
    var nums = []
    var shuffledNums = []
    for (var i = 0; i < gSize; i++) {
        nums.push(i + 1)
    }
    for (var i = 0; i < gSize; i++) {
        var randIdx = getRandomInt(0, nums.length)
        shuffledNums[i] = nums[randIdx]
        nums.splice(randIdx, 1)
    }
    return shuffledNums
}


function renderBoard() {
    var strHTML = ''
    const rowSize = Math.sqrt(gSize)
    var numsCopy = gNums.slice()
    for (var i = 0; i < rowSize; i++) {
        strHTML += `<tbody>\n<tr>\n`
        for (var j = 0; j < rowSize; j++) {
            var num = numsCopy.pop()
            strHTML += `\t<td class= "cell" data-i="${i}" data-j="${j}" onclick="checkIfNext(this ,${i}, ${j})">${num}</td>\n`
        }
        strHTML += `</tr>\n`

    }
    strHTML += `</tbody>`

    const elTable = document.querySelector('.board')
    elTable.innerHTML = strHTML
}

function checkIfNext(cell, rowIdx, colIdx) {
    var inCell = cell.innerText
    if (+inCell === gNextNum) {
        if (gNextNum === 1) startTime()
        if (gNextNum === gSize) stopTime()
        cell.style.backgroundColor = 'rgb(191, 98, 62)'
        gNextNum++
    }
}

function startTime() {
    gIntervalId = setInterval(renderTime, 10)

}

function stopTime() {
    clearInterval(gIntervalId)
    gIntervalId = 0

}

function displayTimer() {
    gTimes[0] += 10
    if (gTimes[0] == 1000) {
        gTimes[0] = 0
        gTimes[1]++
        if (gTimes[1] == 60) {
            gTimes[1] = 0
            gTimes[2]++
        }
    }
}

function renderTime() {
    
    const mins = gTimes[2]<10 ? '0' + gTimes[2] : gTimes[2]
    const secs = gTimes[1]<10 ? '0' + gTimes[1] : gTimes[1]
    const miliSecs = gTimes[0]
    
    var elTimer = document.querySelector('.timerDisplay')
    var strTime = `⏰:   ${mins}:${secs}.${miliSecs}`
    elTimer.innerText = strTime
    displayTimer()
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

