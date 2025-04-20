/**
 * Golden Circle: Purpose to Impact - Card Viewer JavaScript
 * Handles card display and interaction
 */

/**
 * Initialize the card viewer functionality
 */
function initCardViewer() {
    setupCardModal();
    setupCardFilters();
    setupCardSearch();
}

/**
 * Setup the card modal for enlarged card viewing
 */
function setupCardModal() {
    // Create modal container if it doesn't exist
    let cardModal = document.querySelector('.card-modal');
    if (!cardModal) {
        cardModal = document.createElement('div');
        cardModal.classList.add('card-modal');
        
        const modalContent = document.createElement('div');
        modalContent.classList.add('modal-card');
        
        const closeButton = document.createElement('div');
        closeButton.classList.add('modal-close');
        closeButton.innerHTML = '&times;';
        closeButton.addEventListener('click', () => {
            cardModal.classList.remove('active');
        });
        
        cardModal.appendChild(modalContent);
        cardModal.appendChild(closeButton);
        document.body.appendChild(cardModal);
        
        // Close modal when clicking outside the card
        cardModal.addEventListener('click', function(e) {
            if (e.target === cardModal) {
                cardModal.classList.remove('active');
            }
        });
    }
    
    // Add click event to all cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const modalContent = document.querySelector('.modal-card');
            modalContent.innerHTML = this.outerHTML;
            cardModal.classList.add('active');
        });
    });
}

/**
 * Setup card filtering by category or type
 */
function setupCardFilters() {
    const filterContainer = document.querySelector('.card-filters');
    if (!filterContainer) return;
    
    const filterButtons = filterContainer.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Show all cards if filter is 'all'
            if (filterValue === 'all') {
                cards.forEach(card => {
                    card.style.display = 'flex';
                });
                return;
            }
            
            // Handle special case for pivot cards, crisis cards, etc.
            if (filterValue === 'pivot') {
                cards.forEach(card => {
                    if (card.classList.contains('pivot-card')) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
                return;
            }
            
            if (filterValue === 'why') {
                cards.forEach(card => {
                    if (card.classList.contains('why-card')) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
                return;
            }
            
            if (filterValue === 'how') {
                cards.forEach(card => {
                    if (card.classList.contains('how-card')) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
                return;
            }
            
            if (filterValue === 'what') {
                cards.forEach(card => {
                    if (card.classList.contains('what-card')) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
                return;
            }
            
            // Filter cards based on data attribute
            cards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const cardType = card.getAttribute('data-type');
                
                if (cardCategory === filterValue || cardType === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Setup card search functionality
 */
function setupCardSearch() {
    const searchInput = document.querySelector('.card-search');
    if (!searchInput) return;
    
    const cards = document.querySelectorAll('.card');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase().trim();
        
        if (searchTerm === '') {
            // Show all cards if search is empty
            cards.forEach(card => {
                card.style.display = 'flex';
            });
            return;
        }
        
        // Search in card title, subtitle, and content
        cards.forEach(card => {
            const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
            const subtitle = card.querySelector('.card-subtitle')?.textContent.toLowerCase() || '';
            const content = card.querySelector('.card-content')?.textContent.toLowerCase() || '';
            
            if (title.includes(searchTerm) || subtitle.includes(searchTerm) || content.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

/**
 * Sort cards by a specific property
 * @param {string} sortBy - Property to sort by ('name', 'type', etc.)
 * @param {boolean} ascending - Sort in ascending order if true
 */
function sortCards(sortBy, ascending = true) {
    const cardContainer = document.querySelector('.card-grid');
    if (!cardContainer) return;
    
    const cards = Array.from(cardContainer.querySelectorAll('.card'));
    
    cards.sort((a, b) => {
        let valueA, valueB;
        
        switch (sortBy) {
            case 'name':
                valueA = a.querySelector('.card-title')?.textContent || '';
                valueB = b.querySelector('.card-title')?.textContent || '';
                break;
            case 'type':
                valueA = a.getAttribute('data-type') || '';
                valueB = b.getAttribute('data-type') || '';
                break;
            case 'category':
                valueA = a.getAttribute('data-category') || '';
                valueB = b.getAttribute('data-category') || '';
                break;
            default:
                valueA = a.querySelector('.card-title')?.textContent || '';
                valueB = b.querySelector('.card-title')?.textContent || '';
        }
        
        return ascending ? 
            valueA.localeCompare(valueB) : 
            valueB.localeCompare(valueA);
    });
    
    // Remove all cards from container
    cards.forEach(card => card.remove());
    
    // Append sorted cards
    cards.forEach(card => cardContainer.appendChild(card));
}

/**
 * Group cards by a specific property
 * @param {string} groupBy - Property to group by ('type', 'category', etc.)
 */
function groupCards(groupBy) {
    const cardContainer = document.querySelector('.card-grid');
    if (!cardContainer) return;
    
    const cards = Array.from(cardContainer.querySelectorAll('.card'));
    
    // Get all unique group values
    const groups = new Set();
    cards.forEach(card => {
        const groupValue = card.getAttribute(`data-${groupBy}`) || 'Other';
        groups.add(groupValue);
    });
    
    // Clear container
    cardContainer.innerHTML = '';
    
    // Create group containers and add cards
    groups.forEach(group => {
        // Create group header
        const groupHeader = document.createElement('h3');
        groupHeader.classList.add('card-group-header');
        groupHeader.textContent = group;
        cardContainer.appendChild(groupHeader);
        
        // Create group container
        const groupContainer = document.createElement('div');
        groupContainer.classList.add('card-group');
        
        // Add cards to group
        cards.forEach(card => {
            const cardGroup = card.getAttribute(`data-${groupBy}`) || 'Other';
            if (cardGroup === group) {
                groupContainer.appendChild(card.cloneNode(true));
            }
        });
        
        cardContainer.appendChild(groupContainer);
    });
    
    // Reinitialize card modal for the new cards
    setupCardModal();
}