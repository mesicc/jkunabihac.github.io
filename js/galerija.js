document.addEventListener('DOMContentLoaded', () => {
    // --- 1. GALERIJA FILTER LOGIKA ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenItems = document.querySelectorAll('.gallery-item.hidden-row');
    const itemsPerRow = 4; 

    // Inicijalno sakrivanje svih hidden-row elemenata
    hiddenItems.forEach(item => item.style.display = 'none');

    // Funkcija za primenu filtera
    const applyFilter = (filter) => {
        if (loadMoreBtn) {
            loadMoreBtn.style.display = 'block';
        }

        galleryItems.forEach(item => {
            const category = item.dataset.category;
            const isHiddenRow = item.classList.contains('hidden-row');

            item.style.display = 'none';

            if (filter === 'all' || category === filter) {
                if (!isHiddenRow) {
                    item.style.display = 'block';
                    item.classList.add('visible');
                } else {
                    const remainingHidden = document.querySelectorAll(`.gallery-item.hidden-row[data-category="${filter}"]`);
                    if (filter !== 'all' && remainingHidden.length === 0) {
                        if (loadMoreBtn) {
                            loadMoreBtn.style.display = 'none';
                        }
                    }
                }
            }
        });
        
        if (filter === 'all' && hiddenItems.length === 0) {
             if (loadMoreBtn) {
                loadMoreBtn.style.display = 'none';
            }
        }
    };


    // Event listeneri za filter dugmad
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
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
            
            const currentlyHidden = Array.from(galleryItems).filter(item => {
                const category = item.dataset.category;
                const isHidden = item.classList.contains('hidden-row');
                const isVisible = item.style.display === 'block'; 

                return isHidden && !isVisible && (activeFilter === 'all' || category === activeFilter);
            });

            const toShow = currentlyHidden.slice(0, itemsPerRow);

            toShow.forEach(item => {
                item.style.display = 'block';
                setTimeout(() => item.style.opacity = '1', 10);
                item.classList.remove('hidden-row'); 
            });

            if (currentlyHidden.length <= itemsPerRow) {
                loadMoreBtn.style.display = 'none';
            }
        });
    }


    // --- 3. MODAL / LIGHTBOX LOGIKA (KORIŠTENJE is-open KLASE) ---
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentImageIndex = 0;
    let visibleImages = []; 

    // Zatvori modal
    const closeModal = () => {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    // Navigacija
    const navigate = (direction) => {
        // Ponovno prikupljanje vidljivih slika, uključujući one učitane sa "Vidi Više"
        visibleImages = Array.from(document.querySelectorAll('.gallery-item')).filter(i => i.style.display === 'block');
        currentImageIndex = (currentImageIndex + direction + visibleImages.length) % visibleImages.length;
        modalImg.src = visibleImages[currentImageIndex].querySelector('img').src;
    };

    // Otvori modal
    const openModal = (item, index) => {
        modal.classList.add('is-open'); // Koristimo klasu is-open
        modalImg.src = item.querySelector('img').src;
        currentImageIndex = index;
        document.body.style.overflow = 'hidden'; // Sprečava skrolovanje pozadine
    };

    closeBtn.onclick = closeModal;
    window.onclick = (event) => {
        if (event.target === modal) {
            closeModal();
        }
    };

    prevBtn.onclick = () => navigate(-1);
    nextBtn.onclick = () => navigate(1);

    // Event listeneri za svaku sliku u galeriji
    galleryItems.forEach((item) => {
        item.addEventListener('click', () => {
            visibleImages = Array.from(document.querySelectorAll('.gallery-item')).filter(i => i.style.display === 'block');
            const clickedIndex = visibleImages.indexOf(item);
            if (clickedIndex !== -1) {
                openModal(item, clickedIndex);
            }
        });
    });

    // Navigacija strelicama na tastaturi
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('is-open')) {
            if (e.key === 'ArrowLeft') {
                navigate(-1);
            } else if (e.key === 'ArrowRight') {
                navigate(1);
            } else if (e.key === 'Escape') {
                closeModal();
            }
        }
    });

    // Inicijalno primeni 'all' filter
    applyFilter('all');
});