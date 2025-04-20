/**
 * Golden Circle: Purpose to Impact - Main JavaScript
 * Handles core functionality and initialization
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    loadGameBoard();
    loadCardSystem();
    loadRules();
    loadSimulation();
});

/**
 * Initialize the smooth scrolling navigation
 */
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Load the game board
 */
function loadGameBoard() {
    const boardDisplay = document.getElementById('board-display');
    
    // Fetch the board HTML
    fetch('board/game-board.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            boardDisplay.innerHTML = html;
            // After loading the board, initialize board functionality
            if (typeof initBoard === 'function') {
                initBoard();
            }
        })
        .catch(error => {
            console.error('Error loading the game board:', error);
            boardDisplay.innerHTML = `
                <div class="error-message">
                    <p>Sorry, we couldn't load the game board.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        });
}

/**
 * Load the card system
 */
function loadCardSystem() {
    const cardContainer = document.getElementById('card-container');
    const cardNavButtons = document.querySelectorAll('.card-nav-btn');
    
    // Set default card type to WHY
    let currentCardType = 'why';
    loadCardType(currentCardType);
    
    // Add event listeners to card navigation buttons
    cardNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            cardNavButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get card type from data attribute
            currentCardType = this.getAttribute('data-card-type');
            
            // Load the selected card type
            loadCardType(currentCardType);
        });
    });
    
    /**
     * Load a specific card type
     * @param {string} cardType - The type of card to load
     */
    function loadCardType(cardType) {
        // Show loading indicator
        cardContainer.innerHTML = '<div class="loading">Loading cards...</div>';
        
        // Fetch the card HTML
        fetch(`cards/${cardType}-cards.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                cardContainer.innerHTML = html;
                // After loading cards, initialize card viewer functionality
                if (typeof initCardViewer === 'function') {
                    initCardViewer();
                }
            })
            .catch(error => {
                console.error(`Error loading ${cardType} cards:`, error);
                cardContainer.innerHTML = `
                    <div class="error-message">
                        <p>Sorry, we couldn't load the ${cardType} cards.</p>
                        <p>Error: ${error.message}</p>
                    </div>
                `;
            });
    }
}

/**
 * Load the rules
 */
function loadRules() {
    const rulesContainer = document.getElementById('rules-container');
    const ruleTabs = document.querySelectorAll('.rule-tab');
    
    // Set default rule to overview
    let currentRule = 'overview';
    loadRuleType(currentRule);
    
    // Add event listeners to rule tabs
    ruleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            ruleTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Get rule type from data attribute
            currentRule = this.getAttribute('data-rule');
            
            // Load the selected rule type
            loadRuleType(currentRule);
        });
    });
    
    /**
     * Load a specific rule type
     * @param {string} ruleType - The type of rule to load
     */
    function loadRuleType(ruleType) {
        // Show loading indicator
        rulesContainer.innerHTML = '<div class="loading">Loading rules...</div>';
        
        // Fetch the rule HTML
        fetch(`rules/${ruleType}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                rulesContainer.innerHTML = html;
            })
            .catch(error => {
                console.error(`Error loading ${ruleType} rules:`, error);
                rulesContainer.innerHTML = `
                    <div class="error-message">
                        <p>Sorry, we couldn't load the ${ruleType} rules.</p>
                        <p>Error: ${error.message}</p>
                    </div>
                `;
            });
    }
}

/**
 * Load the game simulation
 */
function loadSimulation() {
    const simulationContainer = document.getElementById('simulation-container');
    
    // Fetch the simulation HTML
    fetch('simulation/game-simulation.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(html => {
            simulationContainer.innerHTML = html;
            // After loading simulation, initialize simulation functionality
            if (typeof initSimulation === 'function') {
                initSimulation();
            }
        })
        .catch(error => {
            console.error('Error loading the game simulation:', error);
            simulationContainer.innerHTML = `
                <div class="error-message">
                    <p>Sorry, we couldn't load the game simulation.</p>
                    <p>Error: ${error.message}</p>
                </div>
            `;
        });
}

/**
 * Helper function to create error messages
 * @param {string} message - The error message to display
 * @returns {string} HTML for the error message
 */
function createErrorMessage(message) {
    return `
        <div class="error-message">
            <p>${message}</p>
        </div>
    `;
}