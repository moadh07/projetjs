let stopwatchInterval; // variable bech testori id returned mel sentinterval
let stopwatchElapsedTime = 0; // tetraki l wakt meli tenzel al button en millisecondes bech tkoun precise akther
let isStopwatchRunning = false; // tetraki stopwatch kaaeda active

const stopwatchDisplay = document.getElementById('stopwatch-display'); // hedha win time bech yetra
const startStopwatchBtn = document.getElementById('start-stopwatch'); // buuton bech yebda l timer
const pauseStopwatchBtn = document.getElementById('pause-stopwatch'); // button bech ypausi l timer
const resetStopwatchBtn = document.getElementById('reset-stopwatch'); // button bech yaawdou l timer melowel (reset)

function updateStopwatchDisplay() {
    const hours = Math.floor(stopwatchElapsedTime / (1000 * 60 * 60)); // calcul mtaa lwakt bel heures
    const minutes = Math.floor((stopwatchElapsedTime % (1000 * 60 * 60)) / (1000 * 60)); // calcul mtaa lwakt li kaaaed bel minute
    const seconds = Math.floor((stopwatchElapsedTime % (1000 * 60)) / 1000); // calcul mtaa lwakt li kaaaed bel seconde
    stopwatchDisplay.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; // format mtaa lwakt bel minute w seconde w milliseconde
}
// fonction bech tebda timer
startStopwatchBtn.addEventListener('click', () => {
    if (!isStopwatchRunning) { // ythabet fel timer mouch kaaed yekhdem deja
        isStopwatchRunning = true; // indication li howa yekhdem
        const startTime = Date.now() - stopwatchElapsedTime; // calcul l start time
        stopwatchInterval = setInterval(() => {
            stopwatchElapsedTime = Date.now() - startTime; // update lel wakt
            updateStopwatchDisplay(); // refresh e display
        }, 1000); // update l kol second
    }
});

// fonction pause
pauseStopwatchBtn.addEventListener('click', () => {
    if (isStopwatchRunning) { // yassuri li heya tekhdem kbal mayaamel pause
        isStopwatchRunning = false; // indication li heya pausé
        clearInterval(stopwatchInterval); // twakef l interval
    }
});

// fonction bech taawed men jdid timer
resetStopwatchBtn.addEventListener('click', () => {
    isStopwatchRunning = false; // indication li heya mouch tekhdem
    clearInterval(stopwatchInterval); // twakef ay intervalle
    stopwatchElapsedTime = 0; // yaawed l intervalle m sfer
    updateStopwatchDisplay(); // updati display l 00:00;00
});
