document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.team-tab');
    const profiles = document.querySelectorAll('.coach-profile');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const coachId = tab.getAttribute('data-coach-id');

            // 1. Ukloni 'active' klasu sa svih tabova
            tabs.forEach(t => t.classList.remove('active'));
            
            // 2. Dodaj 'active' klasu kliknutom tabu
            tab.classList.add('active');

            // 3. Sakrij sve profile
            profiles.forEach(profile => {
                profile.classList.remove('active');
            });

            // 4. Pokaži odgovarajući profil
            const activeProfile = document.getElementById(coachId);
            if (activeProfile) {
                activeProfile.classList.add('active');
            }
        });
    });
});