// listner lel button
document.getElementById('get-time').addEventListener('click', () => {
    // field win bech tethat el pays
    const country = document.getElementById('country-input').value.trim();
    // Element win bech yodhher l wakt
    const timeDisplay = document.getElementById('country-time');
    // hedha apikey mtei f geonames ( aamelt compte f geonames bech khdhyt access lel local time mtaa l bolden li yhothom l user based ala hajet tebaa site )
    const apiKey = 'srasra';

    // lena nchouf si l'utilisateur dakhel pays
    if (country) {
        // bech ychouf leblasa exact mtaa lebled li dakhelha l'utlisateur
        fetch(`http://api.geonames.org/searchJSON?name=${country}&featureClass=A&maxRows=1&username=${apiKey}`)
            .then(response => {
                // ychouf idha reponse valid lena
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des coordonnées.');
                }
                return response.json(); // Parse the JSON data
            })
            .then(data => {
                // ychouf idha lebled mawjouda wele
                if (data.geonames && data.geonames.length > 0) {
                    const { lat, lng } = data.geonames[0];
                    // ychouf timezone mtaa lebled hasb les informations li aandou
                    return fetch(`http://api.geonames.org/timezoneJSON?formatted=true&lat=${lat}&lng=${lng}&username=${apiKey}`);
                } else {
                    // hedhy lel bled ken mouch mawjouda ykharej pays introuvable
                    throw new Error('Pays introuvable.');
                }
            })
            .then(response => {
                // Check idha the timezone API response mteou valide (staut el code)
                if (!response.ok) {
                    // idha l API failed wela mayalkach serveur ykharejlou l 'erreur hedha
                    throw new Error('Erreur lors de la récupération de l’heure.');
                }
                return response.json(); // Parse the JSON data
            })
            .then(data => {
                // ychouf idha time data mtaa lbelasa mawjoud w yaatyk l wakt
                if (data.time) {
                    const localTime = new Date(data.time).toLocaleTimeString();
                    timeDisplay.textContent = `L'heure locale en ${country} est : ${localTime}`;
                } else {
                    // sinon ken fama exception ykolek l commentaire hedha
                    timeDisplay.textContent = 'Impossible de récupérer l’heure.';
                }
            })
            .catch(error => {
                // handle les erreurs fel process kemel
                console.error(error);
                timeDisplay.textContent = error.message;
            });
    } else {
        // ykoul lel utilisateur lezmou yhot esm mtaa bled
        timeDisplay.textContent = 'Veuillez entrer un pays.';
    }
});
