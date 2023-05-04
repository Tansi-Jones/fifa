// Countdown Timer
const countdown = document.getElementById('countdown-timer');

// Set the date we're counting down to
const countDownDate = new Date("May 31, 2023 23:59:59").getTime();

// Update the countdown every second
const x = setInterval(() => {

// Get today's date and time
const now = new Date().getTime();

// Find the distance between now and the count down date
const distance = countDownDate - now;

// Time calculations for days, hours, minutes and seconds
const days = Math.floor(distance / (1000 * 60 * 60 * 24));
const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((distance % (1000 * 60)) / 1000);

// Display the countdown timer
countdown.innerHTML = ${days}d ${hours}h ${minutes}m ${seconds}s;

// If the countdown is finished, show "Registration Closed" message
if (distance < 0) {
clearInterval(x);
countdown.innerHTML = "Registration Closed";
const registrationForm = document.getElementById('registration-form');
registrationForm.style.display = 'none';
const tournamentForm = document.getElementById('tournament-form');
tournamentForm.style.display = 'block';
}
}, 1000);

// Slots Remaining Counter
const slotsRemaining = document.getElementById('counter');
let slotsCount = 32;

function updateSlotsCount() {
slotsCount--;
slotsRemaining.textContent = slotsCount;
if (slotsCount === 0) {
clearInterval(slotsInterval);
slotsRemaining.textContent = 'Registration Closed';
const registrationForm = document.getElementById('registration-form');
registrationForm.style.display = 'none';
const tournamentForm = document.getElementById('tournament-form');
tournamentForm.style.display = 'block';
}
}

const slotsInterval = setInterval(updateSlotsCount, 10000);

// Tournament Bracket
const bracket = new Tournament();

function addPlayerToBracket(player) {
bracket.addPlayer(player.name);
bracket.seed();

const matches = bracket.getMatches();
const bracketDiv = document.getElementById('bracket');

// Clear the previous bracket
bracketDiv.innerHTML = '';

// Add the matches to the bracket
matches.forEach((match) => {
const matchDiv = document.createElement('div');
matchDiv.classList.add('match');
matchDiv.innerHTML = <div class="match-player">${match.p[0]}</div> <div class="match-player">${match.p[1]}</div> ;
bracketDiv.appendChild(matchDiv);
});
}

// Form Pop-up
const signUpButton = document.getElementById('sign-up');
const registrationForm = document.getElementById('registration-form');
const tournamentForm = document.getElementById('tournament-form');
const closeRegistrationButton = document.getElementById('close-registration');

signUpButton.addEventListener('click', () => {
registrationForm.style.display = 'block';
});

closeRegistrationButton.addEventListener('click', () => {
registrationForm.style.display = 'none';
});

// Form Validation
const signUpForm = document.getElementById('sign-up-form');
const tournamentFormCheckboxes = document.querySelectorAll('input[type=checkbox]');
const submitButton = document.getElementById('submit-button');

signUpForm.addEventListener('submit', (e) => {
e.preventDefault();
const name = document.getElementById('name').value;
const teamHandle = document.getElementById('team-handle').value;
const contactInfo = document.getElementById('contact-info').value;

// Validate the input fields
if (!name || !teamHandle || !contactInfo) {
alert('Please fill in all the fields');
return;
}

// Add the player to the bracket
const player = { name: name, teamHandle: teamHandle, contactInfo: contactInfo };
addPlayerToBracket(player);

// Reset the form and close the pop-up
signUpForm.reset();
registrationForm.style.display = 'none';
});

tournamentForm.addEventListener('submit', (e) => {
e.preventDefault();
const name = document.getElementById('tournament-name').value;
const gamesInterestedIn = [];
tournamentFormCheckboxes.forEach((checkbox) => {
if (checkbox.checked) {
gamesInterestedIn.push(checkbox.value);
}
});
const contactInfo = document.getElementById('tournament-contact-info').value;

// Validate the input fields
if (!name || gamesInterestedIn.length === 0 || !contactInfo) {
alert('Please fill in all the fields');
return;
}

// Reset the form and close the pop-up
tournamentForm.reset();
tournamentForm.style.display = 'none';
});

// Initialize the bracket with 32 players
for (let i = 1; i <= 32; i++) {
const player = { name: Player ${i}, teamHandle: Team ${i}, contactInfo: Contact ${i} };
addPlayerToBracket(player);
}
