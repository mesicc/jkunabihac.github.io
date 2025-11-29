document.addEventListener('DOMContentLoaded', function() {
    
    // --- FILTRIRANJE I "VIDI VIŠE" LOGIKA ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const itemsPerRow = 4;
    const initialRows = 3; 
    
    let allGalleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    let currentFilter = 'all';

    const updateVisibility = (filter) => {
        let itemsToShow = [];

        // 1. Filtriranje elemenata
        allGalleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const isMatch = (filter === 'all' || filter === itemCategory);

            item.style.display = 'none';
            item.classList.add('hidden-row'); 

            if (isMatch) {
                itemsToShow.push(item);
            }
        });
        
        // 2. Prikaz prve tri reda (12 slika)
        itemsToShow.forEach((item, index) => {
            if (index < initialRows * itemsPerRow) {
                 item.style.display = 'block';
                 item.classList.remove('hidden-row');
            } else {
                 item.classList.add('hidden-row');
                 item.removeAttribute('data-visible');
            }
        });
        
        // 3. Ažuriranje dugmeta "Vidi Više"
        const visibleCount = itemsToShow.length - itemsToShow.filter(item => item.classList.contains('hidden-row')).length;

        if (itemsToShow.length > visibleCount) {
            loadMoreBtn.style.display = 'block';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    };


    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            currentFilter = button.getAttribute('data-filter');
            updateVisibility(currentFilter);
        });
    });

    loadMoreBtn.addEventListener('click', () => {
        let itemsToLoad = itemsPerRow;
        let stillHidden = 0;

        allGalleryItems.forEach(item => {
            const itemCategory = item.getAttribute('data-category');
            const isMatch = (currentFilter === 'all' || currentFilter === itemCategory);
            
            if (isMatch && item.classList.contains('hidden-row') && itemsToLoad > 0) {
                item.style.display = 'block';
                item.classList.remove('hidden-row');
                itemsToLoad--;
            } else if (isMatch && item.classList.contains('hidden-row')) {
                stillHidden++;
            }
        });

        if (stillHidden === 0) {
            loadMoreBtn.style.display = 'none';
        }
    });
    
    // Inicijalno učitavanje
    updateVisibility('all');


    // --- MODALNI PRIKAZ SLIKE (Lightbox) ---
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentImageIndex = 0;
    
    const getVisibleImages = () => {
        return Array.from(document.querySelectorAll('.gallery-item:not(.hidden-row):not([style*="none"]) img'));
    };

    document.querySelector('.gallery-grid').addEventListener('click', function(e) {
        if (e.target.tagName === 'IMG') {
            const allImages = getVisibleImages();
            
            currentImageIndex = allImages.findIndex(img => img.src === e.target.src);
            
            modal.style.display = 'block';
            modalImage.src = e.target.src;
        }
    });

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };
    
    const showImage = (index) => {
        const images = getVisibleImages();
        
        if (images.length === 0) return;
        
        if (index >= images.length) {
            currentImageIndex = 0;
        } else if (index < 0) {
            currentImageIndex = images.length - 1;
        } else {
            currentImageIndex = index;
        }
        
        modalImage.src = images[currentImageIndex].src;
    };

    prevBtn.onclick = () => showImage(currentImageIndex - 1);
    nextBtn.onclick = () => showImage(currentImageIndex + 1);

    document.addEventListener('keydown', function(e) {
        if (modal.style.display === 'block') {
            if (e.key === "Escape") {
                modal.style.display = 'none';
            } else if (e.key === "ArrowLeft") {
                showImage(currentImageIndex - 1);
            } else if (e.key === "ArrowRight") {
                showImage(currentImageIndex + 1);
            }
        }
    });
});