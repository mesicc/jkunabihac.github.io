document.addEventListener('DOMContentLoaded', () => {
    // --- 1. GALERIJA FILTER LOGIKA ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden-row');
    const itemsPerRow = 4; // Pretpostavljamo 4 kolone za desktop

    // Inicijalno sakrivanje svih hidden-row elemenata
    hiddenItems.forEach(item => item.style.display = 'none');

    // Funkcija za primenu filtera
    const applyFilter = (filter) => {
        // Resetujemo dugme "Vidi Više"
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'block';
        }

        galleryItems.forEach(item => {
            const category = item.dataset.category;
            const isHiddenRow = item.classList.contains('hidden-row');

            // Sakrivanje svih slika na početku filtriranja
            item.style.display = 'none';

            if (filter === 'all' || category === filter) {
                // Prikazujemo samo one koje NISU 'hidden-row' ili one koje su u prva tri reda
                if (!isHiddenRow) {
                    item.style.display = 'block';
                    item.classList.add('visible');
                } else {
                    // Ako su sakriveni redovi, provjeravamo da li se uopšte pojavljuju
                    // Ako nema skrivenih redova u trenutnom filteru, sakrivamo dugme "Vidi Više"
                    const remainingHidden = document.querySelectorAll(`.gallery-item.hidden-row[data-category="${filter}"]`);
                    if (filter !== 'all' && remainingHidden.length === 0) {
                        if (loadMoreBtn) {
                            loadMoreBtn.style.display = 'none';
                        }
                    }
                }
            }
        });
        
        // Provera da li ima preostalih skrivenih slika za "all" kategoriju
        if (filter === 'all' && hiddenItems.length === 0) {
             if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
        }
    };


    // Event listeneri za filter dugmad
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Ažuriraj aktivno dugme
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;
            applyFilter(filter);
        });
    });

    // --- 2. LOGIKA "VIDI VIŠE" ---
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
            
            // Pronađi sve trenutno skrivene slike za aktivni filter
            const currentlyHidden = Array.from(galleryItems).filter(item => {
                const category = item.dataset.category;
                const isHidden = item.classList.contains('hidden-row');
                const isVisible = item.style.display === 'block'; 

                return isHidden && !isVisible && (activeFilter === 'all' || category === activeFilter);
            });

            // Odredi koliko slika da prikaže (npr. 4, što je jedan red)
            const toShow = currentlyHidden.slice(0, itemsPerRow);

            toShow.forEach(item => {
                // Prikazivanje sa fade-in efektom
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
                item.classList.remove('hidden-row'); // Uklanjamo klasu da ne budu više 'hidden'
            });

            // Sakrij dugme ako više nema skrivenih slika
            if (currentlyHidden.length <= itemsPerRow) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }


    // --- 3. MODAL / LIGHTBOX LOGIKA ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentImageIndex = 0;
    let visibleImages = []; // Lista trenutno prikazanih slika

    // Otvori modal
    const openModal = (item, index) => {
        modal.style.display = 'block';
        modalImg.src = item.querySelector('img').src;
        currentImageIndex = index;
    };

    // Zatvori modal
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Navigacija
    const navigate = (direction) => {
        currentImageIndex = (currentImageIndex + direction + visibleImages.length) % visibleImages.length;
        modalImg.src = visibleImages[currentImageIndex].querySelector('img').src;
    };
    prevBtn.onclick = () => navigate(-1);
    nextBtn.onclick = () => navigate(1);

    // Event listeneri za svaku sliku u galeriji
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Ažuriraj listu vidljivih slika pre otvaranja modala
            visibleImages = Array.from(document.querySelectorAll('.gallery-item')).filter(i => i.style.display === 'block');
            const clickedIndex = visibleImages.indexOf(item);
            if (clickedIndex !== -1) {
                openModal(item, clickedIndex);
            }
        });
    });

    // Inicijalno primeni 'all' filter da bi se sve vidljive slike ispravno postavile
    applyFilter('all');
});