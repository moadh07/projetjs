let timerInterval; //variable bech yestori fehom timer interval id , lel start w stop mtaa timer
let timerRemainingTime = 0; //yetraki l wakt li mazel b secs


const timerInput = document.getElementById('timer-input'); //field win bech thot l wakt
const timerDisplay = document.getElementById('timer-display'); //field win el countdown bech yetra
const startTimerBtn = document.getElementById('start-timer'); //button bech tebda bih timer

// Function to Update Minuterie Display
function updateTimerDisplay() {
    const minutes = Math.floor(timerRemainingTime / 60); // tehseb lehne les nombres mtaa les minutes
    const seconds = timerRemainingTime % 60; // tehseb l wakt li kaad b secondes
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`; //ykharajlek l wakt b minutes w secondes
}

startTimerBtn.addEventListener('click', () => {
    const inputSeconds = parseInt(timerInput.value, 10); // yekhou w yconverti l input li hatou l user l number

    if (!isNaN(inputSeconds) && inputSeconds > 0) {
        clearInterval(timerInterval); // clear l intervalle w ywakef timer to avoid the overlap
        timerRemainingTime = inputSeconds; // set timer hasb l input li hatou user
        updateTimerDisplay(); // Updati display toul

        timerInterval = setInterval(() => {
            if (timerRemainingTime > 0) { // hedha bech yzid wela ynakes bih time b seconde
                timerRemainingTime--;
                updateTimerDisplay(); // to update display bel wakt jdid
            } else {
                clearInterval(timerInterval); // hedha bech ywakef l intervalle ki yousel l zero
                timerDisplay.textContent = 'Temps écoulé !'; //w ykharej msg ykoul l wakt wfe
            }
        }, 1000); // hedha bech update timer kol second
    } else {
        timerDisplay.textContent = 'Veuillez entrer un temps valide.'; // to inform l user idha l input li hatou invalide wela feragh
    }
});
