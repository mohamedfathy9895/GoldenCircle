/**
 * Golden Circle: Purpose to Impact - Game Simulation JavaScript
 * Handles the interactive game simulation walkthrough
 */

/**
 * Initialize the game simulation functionality
 */
function initSimulation() {
    setupSimulationControls();
    initializeGameState();
}

/**
 * Setup simulation control buttons
 */
function setupSimulationControls() {
    const nextBtn = document.getElementById('sim-next');
    const prevBtn = document.getElementById('sim-prev');
    const resetBtn = document.getElementById('sim-reset');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => advanceSimulation());
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => rewindSimulation());
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => resetSimulation());
    }
}

/**
 * Get alignment status based on alignment score
 * @param {number} alignment - The alignment score
 * @returns {string} Alignment status
 */
function getAlignmentStatus(alignment) {
    if (alignment >= 9) return 'High Alignment';
    if (alignment >= 6) return 'Moderate Alignment';
    if (alignment >= 3) return 'Low Alignment';
    return 'Misaligned';
}

/**
 * Get board zone based on position
 * @param {number} position - The board position
 * @returns {string} Zone name
 */
function getBoardZone(position) {
    if (position <= 8) return 'STARTUP';
    if (position <= 16) return 'GROWTH';
    if (position <= 24) return 'CHALLENGE';
    if (position <= 32) return 'EXPANSION';
    return 'LEGACY';
}

/**
 * Update the step indicator
 */
function updateStepIndicator() {
    const stepIndicators = document.querySelectorAll('.step-indicator');
    
    stepIndicators.forEach((indicator, index) => {
        if (index === simulationState.currentStep) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

/**
 * Advance to the next simulation step
 */
function advanceSimulation() {
    if (simulationState.currentStep < simulationState.totalSteps - 1) {
        simulationState.currentStep++;
        updateSimulationGameState();
        updateSimulationDisplay();
    }
}

/**
 * Go back to the previous simulation step
 */
function rewindSimulation() {
    if (simulationState.currentStep > 0) {
        simulationState.currentStep--;
        updateSimulationGameState();
        updateSimulationDisplay();
    }
}

/**
 * Reset the simulation to the beginning
 */
function resetSimulation() {
    simulationState.currentStep = 0;
    initializeGameState();
    updateSimulationDisplay();
}

// Global simulation state
const simulationState = {
    currentStep: 0,
    totalSteps: 10,
    gameData: {
        player: {
            name: 'Sarah',
            industry: 'Tech',
            marketShare: 5,
            publicTrust: 5,
            innovationPoints: 5,
            alignment: 5,
            resources: {
                staff: 5,
                capital: 5,
                brand: 5
            },
            cards: {
                why: [
                    { name: 'INNOVATION', level: 1, type: 'Core Value' },
                    { name: 'FUTURE GENERATIONS', level: 1, type: 'Beneficiary' },
                    { name: 'THROUGH TECHNOLOGY', level: 1, type: 'Method' }
                ],
                how: [
                    { name: 'Agile Development', type: 'adaptive' },
                    { name: 'Customer Co-Creation', type: 'collaborative' }
                ],
                what: [
                    { name: 'Mobile App Platform', type: 'platform' },
                    { name: 'AI Assistant', type: 'product' },
                    { name: 'Cloud Service', type: 'service' }
                ],
                pivot: [
                    { name: 'Purpose Evolution', type: 'why' },
                    { name: 'Strategic Overhaul', type: 'how' }
                ],
                opportunity: [
                    { name: 'Tech Industry Expansion', type: 'market' },
                    { name: 'Digital Transformation Surge', type: 'trend' }
                ]
            },
            playedCards: {
                how: [],
                what: [],
                pivot: [],
                opportunity: []
            }
        },
        boardPosition: 0,
        round: 1,
        crisisSurvived: 0,
        pivotUsed: false
    }
};

/**
 * Initialize game state and display
 */
function initializeGameState() {
    // Reset to initial state
    simulationState.gameData = {
        player: {
            name: 'Sarah',
            industry: 'Tech',
            marketShare: 5,
            publicTrust: 5,
            innovationPoints: 5,
            alignment: 5,
            resources: {
                staff: 5,
                capital: 5,
                brand: 5
            },
            cards: {
                why: [
                    { name: 'INNOVATION', level: 1, type: 'Core Value' },
                    { name: 'FUTURE GENERATIONS', level: 1, type: 'Beneficiary' },
                    { name: 'THROUGH TECHNOLOGY', level: 1, type: 'Method' }
                ],
                how: [
                    { name: 'Agile Development', type: 'adaptive' },
                    { name: 'Customer Co-Creation', type: 'collaborative' }
                ],
                what: [
                    { name: 'Mobile App Platform', type: 'platform' },
                    { name: 'AI Assistant', type: 'product' },
                    { name: 'Cloud Service', type: 'service' }
                ],
                pivot: [
                    { name: 'Purpose Evolution', type: 'why' },
                    { name: 'Strategic Overhaul', type: 'how' }
                ],
                opportunity: [
                    { name: 'Tech Industry Expansion', type: 'market' },
                    { name: 'Digital Transformation Surge', type: 'trend' }
                ]
            },
            playedCards: {
                how: [],
                what: [],
                pivot: [],
                opportunity: []
            }
        },
        boardPosition: 0,
        round: 1,
        crisisSurvived: 0,
        pivotUsed: false
    };
    
    // Initialize player piece on board if board visualization exists
    if (typeof createGamePiece === 'function') {
        createGamePiece(simulationState.gameData.boardPosition, '#4caf50');
    }
}

/**
 * Update game state based on current step
 */
function updateSimulationGameState() {
    // Reset to initial state first
    initializeGameState();
    
    const { currentStep } = simulationState;
    
    // Apply changes for each step up to current step
    for (let step = 1; step <= currentStep; step++) {
        applyStepChanges(step);
    }
    
    // Update board visualization if available
    if (typeof createGamePiece === 'function') {
        createGamePiece(simulationState.gameData.boardPosition, '#4caf50');
    }
}

/**
 * Apply changes for a specific step
 * @param {number} step - The step number
 */
function applyStepChanges(step) {
    const { gameData } = simulationState;
    
    switch(step) {
        case 1: // Round 1
            gameData.boardPosition = 4;
            gameData.player.marketShare = 7;
            gameData.player.alignment = 6;
            gameData.player.innovationPoints = 6;
            gameData.player.resources.staff -= 2;
            gameData.player.resources.capital -= 1;
            gameData.player.cards.why.push({ name: 'SUSTAINABILITY', level: 1, type: 'Core Value' });
            gameData.player.playedCards.how.push({ name: 'Agile Development', type: 'adaptive' });
            gameData.player.playedCards.what.push({ name: 'Mobile App Platform', type: 'platform' });
            gameData.round = 1;
            break;
            
        case 2: // Round 2
            gameData.boardPosition = 7;
            gameData.player.marketShare = 8;
            gameData.player.publicTrust = 6;
            gameData.player.alignment = 8;
            gameData.player.innovationPoints = 8;
            gameData.player.resources.staff -= 1;
            gameData.player.resources.capital -= 2;
            gameData.player.playedCards.how.push({ name: 'Customer Co-Creation', type: 'collaborative' });
            gameData.player.playedCards.what.push({ name: 'AI Assistant', type: 'product' });
            gameData.round = 2;
            gameData.crisisSurvived += 1;
            break;
            
        case 3: // Round 3
            gameData.boardPosition = 12;
            gameData.player.marketShare = 10;
            gameData.player.publicTrust = 7;
            gameData.player.alignment = 10;
            gameData.player.innovationPoints = 14;
            gameData.player.cards.why[0].level = 2; // Upgrade INNOVATION to Level 2
            gameData.player.playedCards.what.push({ name: 'Cloud Service', type: 'service' });
            gameData.round = 3;
            break;
            
        case 4: // Round 4
            gameData.boardPosition = 14;
            gameData.player.marketShare = 12;
            gameData.player.publicTrust = 8;
            gameData.player.alignment = 10;
            gameData.player.innovationPoints = 15;
            gameData.player.resources.capital -= 1.5; // Partnership cost
            gameData.player.cards.why[2].level = 2; // Upgrade THROUGH TECHNOLOGY to Level 2
            gameData.player.playedCards.opportunity.push({ name: 'Tech Industry Expansion', type: 'market' });
            gameData.round = 4;
            break;
            
        case 5: // Round 5
            gameData.boardPosition = 20;
            gameData.player.publicTrust = 9;
            gameData.player.innovationPoints = 12; // Lost 3 for crisis mitigation
            gameData.player.playedCards.how.push({ name: 'Ethical Data Practices', type: 'long-term' });
            gameData.round = 5;
            gameData.crisisSurvived += 1;
            break;
            
        case 6: // Round 6 (Crisis & Pivot)
            gameData.boardPosition = 27;
            gameData.player.publicTrust = 8; // Lost 1 from crisis
            gameData.player.marketShare = 13; // Gained 1 from pivot
            gameData.player.innovationPoints = 15; // Gained 3 from pivot
            gameData.player.alignment = 9; // Lost 1 from crisis, gained 1 in step resolution
            // Use a pivot card to recover
            gameData.player.playedCards.pivot.push({ name: 'Purpose Evolution', type: 'why' });
            gameData.player.cards.why[1].name = 'SUSTAINABLE WORLD'; // Changed from FUTURE GENERATIONS
            gameData.round = 6;
            gameData.crisisSurvived += 1;
            gameData.pivotUsed = true;
            break;
            
        case 7: // Round 7 (Milestone & Opportunity)
            gameData.boardPosition = 31; // Milestone: Breakthrough Strategy
            gameData.player.marketShare = 15;
            gameData.player.publicTrust = 10;
            gameData.player.innovationPoints = 18;
            gameData.player.alignment = 10;
            gameData.player.resources.staff += 1;
            gameData.player.resources.capital += 2;
            gameData.player.resources.brand += 1;
            // Play an opportunity card
            gameData.player.playedCards.opportunity.push({ name: 'Digital Transformation Surge', type: 'trend' });
            gameData.round = 7;
            break;
            
        case 8: // Round 8 (Path to Victory)
            gameData.boardPosition = 36; 
            gameData.player.marketShare = 18;
            gameData.player.publicTrust = 12;
            gameData.player.innovationPoints = 20;
            gameData.player.alignment = 10;
            gameData.player.playedCards.what.push({ name: 'Blockchain Supply Chain', type: 'disruptive' });
            gameData.round = 8;
            break;
            
        case 9: // Final Round & Victory Condition
            gameData.boardPosition = 40; // Golden Circle Center
            gameData.player.marketShare = 22;
            gameData.player.publicTrust = 15;
            gameData.player.innovationPoints = 24;
            gameData.player.alignment = 10;
            gameData.player.cards.why[1].level = 3; // Upgrade SUSTAINABLE WORLD to Level 3
            gameData.round = 9;
            break;
    }
}

/**
 * Update the simulation display with current game state
 */
function updateSimulationDisplay() {
    const playerStats = document.getElementById('player-stats');
    const playerCards = document.getElementById('player-cards');
    const simulationNarrative = document.getElementById('simulation-narrative');
    const gameBoard = document.getElementById('sim-board');
    
    if (playerStats) {
        playerStats.innerHTML = createPlayerStatsHTML();
    }
    
    if (playerCards) {
        playerCards.innerHTML = createPlayerCardsHTML();
    }
    
    if (simulationNarrative) {
        simulationNarrative.innerHTML = getStepNarrative(simulationState.currentStep);
    }
    
    // Update step indicator
    updateStepIndicator();
}

/**
 * Create HTML for player stats display
 * @returns {string} HTML string
 */
function createPlayerStatsHTML() {
    const { player } = simulationState.gameData;
    
    return `
        <div class="stat-group">
            <h3>${player.name}'s Stats (${player.industry})</h3>
            <div class="stat-row">
                <div class="stat">
                    <div class="stat-label">Market Share</div>
                    <div class="stat-value">${player.marketShare}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Public Trust</div>
                    <div class="stat-value">${player.publicTrust}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Innovation</div>
                    <div class="stat-value">${player.innovationPoints}</div>
                </div>
            </div>
            <div class="stat-row">
                <div class="stat">
                    <div class="stat-label">Alignment</div>
                    <div class="stat-value">${player.alignment}</div>
                    <div class="stat-status">${getAlignmentStatus(player.alignment)}</div>
                </div>
            </div>
        </div>
        
        <div class="stat-group">
            <h3>Resources</h3>
            <div class="stat-row">
                <div class="stat">
                    <div class="stat-label">Staff</div>
                    <div class="stat-value">${player.resources.staff}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Capital</div>
                    <div class="stat-value">${player.resources.capital}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Brand</div>
                    <div class="stat-value">${player.resources.brand}</div>
                </div>
            </div>
        </div>
        
        <div class="stat-group">
            <h3>Game Status</h3>
            <div class="stat-row">
                <div class="stat">
                    <div class="stat-label">Round</div>
                    <div class="stat-value">${simulationState.gameData.round}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Position</div>
                    <div class="stat-value">${simulationState.gameData.boardPosition}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Zone</div>
                    <div class="stat-value">${getBoardZone(simulationState.gameData.boardPosition)}</div>
                </div>
            </div>
            <div class="stat-row">
                <div class="stat">
                    <div class="stat-label">Crises Survived</div>
                    <div class="stat-value">${simulationState.gameData.crisisSurvived}</div>
                </div>
                <div class="stat">
                    <div class="stat-label">Pivot Used</div>
                    <div class="stat-value">${simulationState.gameData.pivotUsed ? 'Yes' : 'No'}</div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Create HTML for player cards display
 * @returns {string} HTML string
 */
function createPlayerCardsHTML() {
    const { player } = simulationState.gameData;
    
    let whyHTML = '<div class="card-section"><h3>WHY Components</h3><div class="mini-cards">';
    player.cards.why.forEach(card => {
        whyHTML += `
            <div class="mini-card why-card">
                <div class="mini-card-header">WHY: ${card.type}</div>
                <div class="mini-card-content">
                    <div class="mini-card-title">${card.name}</div>
                    <div class="mini-card-level">Level ${card.level}</div>
                </div>
            </div>
        `;
    });
    whyHTML += '</div></div>';
    
    let howPlayedHTML = '<div class="card-section"><h3>HOW Strategies (Played)</h3><div class="mini-cards">';
    if (player.playedCards.how.length === 0) {
        howPlayedHTML += '<div class="empty-cards">No HOW cards played yet</div>';
    } else {
        player.playedCards.how.forEach(card => {
            howPlayedHTML += `
                <div class="mini-card how-card">
                    <div class="mini-card-header">HOW</div>
                    <div class="mini-card-content">
                        <div class="mini-card-title">${card.name}</div>
                        <div class="mini-card-type">${card.type}</div>
                    </div>
                </div>
            `;
        });
    }
    howPlayedHTML += '</div></div>';
    
    let whatPlayedHTML = '<div class="card-section"><h3>WHAT Products (Played)</h3><div class="mini-cards">';
    if (player.playedCards.what.length === 0) {
        whatPlayedHTML += '<div class="empty-cards">No WHAT cards played yet</div>';
    } else {
        player.playedCards.what.forEach(card => {
            whatPlayedHTML += `
                <div class="mini-card what-card">
                    <div class="mini-card-header">WHAT</div>
                    <div class="mini-card-content">
                        <div class="mini-card-title">${card.name}</div>
                        <div class="mini-card-type">${card.type}</div>
                    </div>
                </div>
            `;
        });
    }
    whatPlayedHTML += '</div></div>';
    
    // Add pivot cards section
    let pivotPlayedHTML = '';
    if (player.playedCards.pivot && player.playedCards.pivot.length > 0) {
        pivotPlayedHTML = '<div class="card-section"><h3>Pivot Cards (Played)</h3><div class="mini-cards">';
        player.playedCards.pivot.forEach(card => {
            pivotPlayedHTML += `
                <div class="mini-card pivot-card">
                    <div class="mini-card-header">PIVOT</div>
                    <div class="mini-card-content">
                        <div class="mini-card-title">${card.name}</div>
                        <div class="mini-card-type">${card.type}</div>
                    </div>
                </div>
            `;
        });
        pivotPlayedHTML += '</div></div>';
    }
    
    // Add opportunity cards section
    let opportunityPlayedHTML = '';
    if (player.playedCards.opportunity && player.playedCards.opportunity.length > 0) {
        opportunityPlayedHTML = '<div class="card-section"><h3>Opportunity Cards (Played)</h3><div class="mini-cards">';
        player.playedCards.opportunity.forEach(card => {
            opportunityPlayedHTML += `
                <div class="mini-card opportunity-card">
                    <div class="mini-card-header">OPPORTUNITY</div>
                    <div class="mini-card-content">
                        <div class="mini-card-title">${card.name}</div>
                        <div class="mini-card-type">${card.type}</div>
                    </div>
                </div>
            `;
        });
        opportunityPlayedHTML += '</div></div>';
    }
    
    let handHTML = '<div class="card-section"><h3>Hand (Unplayed Cards)</h3><div class="mini-cards">';
    let howHand = player.cards.how.filter(card => !player.playedCards.how.some(played => played.name === card.name));
    let whatHand = player.cards.what.filter(card => !player.playedCards.what.some(played => played.name === card.name));
    let pivotHand = player.cards.pivot.filter(card => !player.playedCards.pivot || !player.playedCards.pivot.some(played => played.name === card.name));
    let opportunityHand = player.cards.opportunity.filter(card => !player.playedCards.opportunity || !player.playedCards.opportunity.some(played => played.name === card.name));
    
    if (howHand.length === 0 && whatHand.length === 0 && pivotHand.length === 0 && opportunityHand.length === 0) {
        handHTML += '<div class="empty-cards">No cards in hand</div>';
    } else {
        howHand.forEach(card => {
            handHTML += `
                <div class="mini-card how-card">
                    <div class="mini-card-header">HOW</div>
                    <div class="mini-card-content">
                        <div class="mini-card-title">${card.name}</div>
                        <div class="mini-card-type">${card.type}</div>
                    </div>
                </div>
            `;
        });
        
        whatHand.forEach(card => {
            handHTML += `
                <div class="mini-card what-card">
                    <div class="mini-card-header">WHAT</div>
                    <div class="mini-card-content">
                        <div class="mini-card-title">${card.name}</div>
                        <div class="mini-card-type">${card.type}</div>
                    </div>
                </div>
            `;
        });
        
        pivotHand.forEach(card => {
            handHTML += `
                <div class="mini-card pivot-card">
                    <div class="mini-card-header">PIVOT</div>
                    <div class="mini-card-content">
                        <div class="mini-card-title">${card.name}</div>
                        <div class="mini-card-type">${card.type}</div>
                    </div>
                </div>
            `;
        });
        
        opportunityHand.forEach(card => {
            handHTML += `
                <div class="mini-card opportunity-card">
                    <div class="mini-card-header">OPPORTUNITY</div>
                    <div class="mini-card-content">
                        <div class="mini-card-title">${card.name}</div>
                        <div class="mini-card-type">${card.type}</div>
                    </div>
                </div>
            `;
        });
    }
    handHTML += '</div></div>';
    
    return whyHTML + howPlayedHTML + whatPlayedHTML + pivotPlayedHTML + opportunityPlayedHTML + handHTML;
}

/**
 * Get the narrative text for a specific simulation step
 * @param {number} step - The step number
 * @returns {string} HTML narrative
 */
function getStepNarrative(step) {
    const narratives = [
        // Step 0: Initial setup
        `
            <h3>Game Setup</h3>
            <p>Sarah has selected the Tech Industry Focus card and received her starting WHY components, resources, and cards.</p>
            <p>Her initial WHY components are: "INNOVATION" (Core Value), "FUTURE GENERATIONS" (Beneficiary), and "THROUGH TECHNOLOGY" (Method), all at Level 1.</p>
            <p>She begins with 5 Market Share points, 5 Public Trust points, 5 Innovation Points, and a neutral Alignment of 5.</p>
            <p>Her starting resources are 5 Staff, 5 Capital, and 5 Brand.</p>
            <p>She has drawn 2 HOW Strategy cards: "Agile Development" and "Customer Co-Creation", and 3 WHAT Product cards: "Mobile App Platform," "AI Assistant," and "Cloud Service".</p>
            <p>Sarah's pawn is placed at the starting position on the board, ready to begin her journey.</p>
        `,
        
        // Step 1: Round 1
        `
            <h3>Round 1: Starting the Journey</h3>
            <p><strong>Roll and Move:</strong> Sarah rolls a 4 and moves to Space 4 in the STARTUP Zone. This is a WHY Space, so she draws a WHY Component card.</p>
            <p><strong>Card Draw:</strong> She draws "SUSTAINABILITY" (Core Value, Level 1). She can't use this now but keeps it for a possible WHY pivot later.</p>
            <p><strong>Action Phase (5 Action Points):</strong> Sarah decides to:</p>
            <ul>
                <li>Implement "Agile Development" HOW strategy (1 AP) - This gives her +1 Innovation Point per turn and synergizes with Tech products</li>
                <li>Play her "Mobile App Platform" WHAT card (2 AP) - This costs 2 Staff resources, 1 Capital</li>
                <li>Save 2 Action Points for her next turn</li>
            </ul>
            <p><strong>Alignment Check:</strong> The "Mobile App Platform" aligns with her "THROUGH TECHNOLOGY" method component, so she gains +1 to Alignment (now 6).</p>
            <p><strong>Update Trackers:</strong></p>
            <ul>
                <li>Gain 2 Market Share (now 7)</li>
                <li>Gain 1 Innovation Point from "Agile Development" (now 6)</li>
                <li>No change to Public Trust</li>
            </ul>
        `,
        
        // Step 2: Round 2
        `
            <h3>Round 2: Growth and First Crisis</h3>
            <p><strong>Roll and Move:</strong> Sarah rolls a 3 and lands on Space 7, a Crisis Space.</p>
            <p><strong>Crisis Card:</strong> She draws "Tech Obsolescence Threat" Crisis Card:</p>
            <p class="quote">"A competitor has launched a superior technology. Lose 2 Market Share unless you have an Innovation-focused WHY OR can spend 3 Innovation Points."</p>
            <p><strong>Crisis Resolution:</strong> Sarah has "INNOVATION" in her WHY, so she's protected from the penalty.</p>
            <p><strong>Action Phase (5 AP + 2 saved = 7 AP):</strong> She decides to:</p>
            <ul>
                <li>Play "Customer Co-Creation" HOW strategy (1 AP) - This gives +2 Public Trust for Service-based products</li>
                <li>Play "AI Assistant" WHAT card (2 AP) - This costs 1 Staff, 2 Capital</li>
                <li>Begin upgrading her "INNOVATION" Core Value to Level 2 (3 AP) - This is a multi-turn process</li>
                <li>Save 1 AP</li>
            </ul>
            <p><strong>Alignment Check:</strong> The "AI Assistant" aligns with her "INNOVATION" Core Value and "THROUGH TECHNOLOGY" Method, so she gains +2 Alignment (now 8).</p>
            <p><strong>Update Trackers:</strong></p>
            <ul>
                <li>Gain 1 Market Share from "AI Assistant" (now 8)</li>
                <li>Gain 2 Innovation Points from "AI Assistant" (now 8)</li>
                <li>Gain 1 Public Trust from "Customer Co-Creation" (now 6)</li>
            </ul>
        `,
        
        // Step 3: Round 3
        `
            <h3>Round 3: Milestone and WHY Evolution</h3>
            <p><strong>Roll and Move:</strong> Sarah rolls a 5 and reaches Space 12, a Milestone Corner (Vision Launch).</p>
            <p><strong>Milestone Effect:</strong> At Vision Launch, she gets to:</p>
            <ul>
                <li>Complete her WHY Component upgrade ("INNOVATION" is now Level 2)</li>
                <li>Gain 3 of any resource (she chooses Innovation Points)</li>
                <li>Draw an Opportunity Card</li>
            </ul>
            <p><strong>Opportunity Card:</strong> "Market Trend Shift"</p>
            <p class="quote">"Choose one WHAT card you've played. It gains +2 on its primary track if aligned with your WHY."</p>
            <p>She chooses "AI Assistant," gaining +2 Innovation Points.</p>
            <p><strong>Action Phase (5 AP + 1 saved = 6 AP):</strong> Sarah decides to:</p>
            <ul>
                <li>Play "Cloud Service" WHAT card (2 AP)</li>
                <li>Begin upgrading "THROUGH TECHNOLOGY" Method to Level 2 (3 AP)</li>
                <li>Prepare for future crises by spending 1 Innovation Point on Crisis Insurance (1 AP)</li>
            </ul>
            <p><strong>Alignment Check:</strong> "Cloud Service" perfectly aligns with her WHY, giving +2 Alignment (now 10 - she's now at High Alignment).</p>
            <p><strong>Update Trackers:</strong></p>
            <ul>
                <li>Gain 2 Market Share from "Cloud Service" (now 10)</li>
                <li>Gain 1 Innovation Points from "Agile Development" (now 14)</li>
                <li>Gain 1 Public Trust from "Customer Co-Creation" (now 7)</li>
                <li>High Alignment unlocks her WHY ability: "When at High Alignment, gain +1 Innovation Point for each WHAT card played."</li>
            </ul>
        `,
        
        // Step 4: Round 4
        `
            <h3>Round 4: Market Challenges & Strategic Partnerships</h3>
            <p><strong>Roll and Move:</strong> Sarah rolls a 2 and lands on Space 14, a Market Space.</p>
            <p><strong>Market Opportunity:</strong> She draws a Market Opportunity: "Tech Industry Expansion"</p>
            <p class="quote">"Pay 3 Capital to gain +3 Market Share OR form a Partnership with another player to share the cost and gain +2 each."</p>
            <p>Sarah decides to form a partnership with another player, Alex, who has a Sustainability-focused company. They each pay 1.5 Capital and gain +2 Market Share.</p>
            <p><strong>Action Phase (5 AP):</strong> She decides to:</p>
            <ul>
                <li>Complete upgrading "THROUGH TECHNOLOGY" Method to Level 2 (2 AP)</li>
                <li>Invest in Crisis Protection specifically for Market Disruptions (1 AP)</li>
                <li>Save 2 AP for next turn</li>
            </ul>
            <p><strong>Alignment Check:</strong> The partnership with Alex doesn't contradict her WHY, so alignment remains at 10.</p>
            <p><strong>Update Trackers:</strong></p>
            <ul>
                <li>Gain 2 Market Share from "Tech Industry Expansion" (now 12)</li>
                <li>Gain 1 Innovation Point from "Agile Development" (now 15)</li>
                <li>Gain 1 Public Trust from "Customer Co-Creation" (now 8)</li>
            </ul>
        `,
        
        // Step 5: Round 5
        `
            <h3>Round 5: Complex Crisis Management</h3>
            <p><strong>Roll and Move:</strong> Sarah rolls a 6 and lands on Space 20, another Crisis Space.</p>
            <p><strong>Crisis Card:</strong> She draws "Data Privacy Scandal" Crisis Card:</p>
            <p class="quote">"A major data breach has occurred. Lose 3 Public Trust points unless you have a Trust-focused HOW strategy OR pay 4 Innovation Points to mitigate the damage."</p>
            <p><strong>Crisis Resolution:</strong> Sarah doesn't have a Trust-focused HOW, but decides to spend 4 Innovation Points to resolve the crisis.</p>
            <p>Because she had Crisis Insurance for Market Disruptions, the Innovation Point cost is reduced to 3.</p>
            <p><strong>Action Phase (5 AP + 2 saved = 7 AP):</strong> She decides to:</p>
            <ul>
                <li>Draw a new HOW card using the "Innovation" space ability (1 AP)</li>
                <li>Play "Ethical Data Practices" HOW card (1 AP)</li>
                <li>Begin developing a new WHAT card: "Data Protection Suite" (3 AP)</li>
                <li>Allocate 2 Innovation Points to boost her next product launch (2 AP)</li>
            </ul>
            <p><strong>Alignment Check:</strong> Adding "Ethical Data Practices" aligns with her WHY's future-focused beneficiary, so Alignment remains high at 10.</p>
            <p><strong>Update Trackers:</strong></p>
            <ul>
                <li>No change to Market Share</li>
                <li>Lose 3 Innovation Points for crisis mitigation (now 12)</li>
                <li>Gain 1 Public Trust from "Ethical Data Practices" (now 9)</li>
            </ul>
        `,
        
        // Step 6: Round 6 (Crisis & Pivot)
        `
            <h3>Round 6: Strategic Pivot</h3>
            <p><strong>Roll and Move:</strong> Sarah rolls a 7 and lands on Space 27, a Crisis Space again.</p>
            <p><strong>Crisis Card:</strong> She draws "Market Disruption" Crisis Card:</p>
            <p class="quote">"A new competitor with a radically different business model is taking market share. Lose 2 Market Share and 1 Public Trust unless you have a Disruptive HOW strategy or WHY component."</p>
            <p><strong>Crisis Effect:</strong> Sarah doesn't have protection against this type of crisis, so she loses 2 Market Share and 1 Public Trust.</p>
            <p><strong>Pivot Decision:</strong> With her market position weakening, Sarah decides to use the "Purpose Evolution" Pivot card to redefine part of her WHY statement.</p>
            <p><strong>Pivot Effect:</strong> She replaces "FUTURE GENERATIONS" with "SUSTAINABLE WORLD" - this gives her better protection against market disruptions while maintaining alignment with her tech-focused core values.</p>
            <p><strong>Action Phase (5 AP):</strong> With this pivot, she:</p>
            <ul>
                <li>Gains +2 Alignment (but since she's already at 10, it remains at 10)</li>
                <li>Gains +3 Innovation Points from the pivot</li>
                <li>Recovers +1 Market Share as the pivot helps her position against the new competitor</li>
                <li>Spends 3 AP to begin developing a new product that aligns with her refreshed WHY</li>
                <li>Spends 2 AP to strengthen her partnership with Alex (whose sustainability focus now aligns even better with her "SUSTAINABLE WORLD" beneficiary)</li>
            </ul>
            <p><strong>Update Trackers:</strong></p>
            <ul>
                <li>Market Share: 12 - 2 + 1 = 11</li>
                <li>Public Trust: 9 - 1 = 8</li>
                <li>Innovation Points: 12 + 3 = 15</li>
                <li>The pivot counter is updated to "Yes" - a pivot can only be used once per game</li>
            </ul>
        `,
        
        // Step 7: Round 7 (Milestone & Opportunity)
        `
            <h3>Round 7: Milestone Achievement</h3>
            <p><strong>Roll and Move:</strong> Sarah rolls a 4 and lands on Space 31, a Milestone Corner (Breakthrough Strategy).</p>
            <p><strong>Milestone Effect:</strong> At the Breakthrough Strategy milestone, Sarah:</p>
            <ul>
                <li>Recovers resources: +1 Staff, +2 Capital, +1 Brand</li>
                <li>Gains +4 Market Share from her breakthrough innovation</li>
                <li>Draws an Opportunity Card: "Digital Transformation Surge"</li>
            </ul>
            <p><strong>Opportunity Card Effect:</strong> "Digital Transformation Surge" gives a +2 Market Share and +2 Innovation Points bonus to players with Technology in their WHY.</p>
            <p><strong>Action Phase (5 AP):</strong> Sarah decides to:</p>
            <ul>
                <li>Complete developing her new product aligned with her refreshed WHY (2 AP)</li>
                <li>Upgrade her "Ethical Data Practices" HOW strategy (2 AP)</li>
                <li>Invest in further Innovation by allocating resources to her R&D department (1 AP)</li>
            </ul>
            <p><strong>Alignment Check:</strong> All actions strongly support her WHY statement, keeping her at High Alignment (10).</p>
            <p><strong>Update Trackers:</strong></p>
            <ul>
                <li>Market Share: 11 + 4 (milestone) + 2 (opportunity) = 15</li>
                <li>Public Trust: 8 + 2 (milestone bonus) = 10 </li>
                <li>Innovation Points: 15 + 3 (R&D) + 2 (opportunity) = 20</li>
            </ul>
        `,
        
        // Step 8: Round 8 (Path to Victory)
        `
            <h3>Round 8: Path to Victory</h3>
            <p><strong>Roll and Move:</strong> Sarah rolls a 5 and lands on Space 36, a Market Space.</p>
            <p><strong>Market Opportunity:</strong> She draws "First-Mover Advantage" which lets her implement her next WHAT card at reduced cost.</p>
            <p><strong>Strategic Decision:</strong> Sarah decides to play her most innovative product yet - the "Blockchain Supply Chain" - a disruptive platform that brings radical transparency to supply chains.</p>
            <p><strong>Action Phase (5 AP):</strong> Sarah focuses on:</p>
            <ul>
                <li>Implementing "Blockchain Supply Chain" at reduced cost thanks to First-Mover Advantage (2 AP instead of 3)</li>
                <li>Launching a supporting marketing campaign highlighting the sustainability aspects (2 AP)</li>
                <li>Enhancing her partnership with Alex to integrate their sustainability expertise (1 AP)</li>
            </ul>
            <p><strong>Product Impact:</strong> The Blockchain Supply Chain platform delivers:</p>
            <ul>
                <li>+2 Market Share from direct adoption</li>
                <li>+1 Market Share from the supporting campaign</li>
                <li>+2 Public Trust from transparency benefits</li>
                <li>+4 Innovation Points from the breakthrough technology</li>
            </ul>
            <p><strong>Alignment Status:</strong> This product perfectly embodies Sarah's "INNOVATION for SUSTAINABLE WORLD through TECHNOLOGY" purpose, maintaining her High Alignment status.</p>
        `,
        
        // Step 9: Final Round & Victory Condition
        `
            <h3>Round 9: Purpose Fulfillment</h3>
            <p><strong>Roll and Move:</strong> Sarah rolls a 4 and reaches Space 40, the Golden Circle Center.</p>
            <p><strong>Purpose Journey Completion:</strong> By reaching the center with High Alignment (10), Sarah achieves the "Purpose Fulfillment" victory condition.</p>
            <p><strong>Final Developments:</strong></p>
            <ul>
                <li>Her "SUSTAINABLE WORLD" WHY component gets upgraded to Level 3</li>
                <li>Her company gains significant market momentum, reaching 22 Market Share</li>
                <li>Public Trust reaches 15 points as stakeholders recognize the authentic alignment between purpose and actions</li>
                <li>Innovation continues to flourish with a total of 24 Innovation Points</li>
            </ul>
            <p><strong>Victory Assessment:</strong> Sarah has achieved:</p>
            <ul>
                <li>"Purpose Fulfillment" - Reached the Golden Circle Center with High Alignment</li>
                <li>"Market Dominance" - Exceeding 20 Market Share</li>
                <li>"Triple Crown" - Having 15+ on all three tracks</li>
            </ul>
            <p><strong>Final Score:</strong> 22 + 15 + 24 + 10 (Alignment Bonus) + 4 (WHY Level Bonus) + 3 (Crisis Survival Bonus) = <strong>78 Points</strong></p>
            <p>Sarah's organization has become a purpose-driven market leader that demonstrates how innovation technology can create a more sustainable world.</p>
        `
    ];
    
    return narratives[step] || '<p>No narrative available for this step.</p>';
}

// If Node.js environment (for testing)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getAlignmentStatus,
        getBoardZone,
        getStepNarrative
    };
}