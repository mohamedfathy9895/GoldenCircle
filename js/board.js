/**
 * Golden Circle: Purpose to Impact - Board JavaScript
 * Handles game board visualization and interaction
 */

/**
 * Initialize the game board functionality
 */
function initBoard() {
    createSpiralPath();
    positionSpaces();
    setupBoardControls();
}

/**
 * Create the spiral path SVG
 */
function createSpiralPath() {
    const svgContainer = document.getElementById('spiral-svg');
    if (!svgContainer) return;
    
    const width = svgContainer.clientWidth;
    const height = svgContainer.clientHeight;
    const centerX = width / 2;
    const centerY = height / 2;
    
    // Calculate spiral points
    const spiralPoints = calculateSpiralPoints(centerX, centerY, 40);
    
    // Create the SVG path
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let pathData = `M ${spiralPoints[0].x} ${spiralPoints[0].y}`;
    
    for (let i = 1; i < spiralPoints.length; i++) {
        pathData += ` L ${spiralPoints[i].x} ${spiralPoints[i].y}`;
    }
    
    path.setAttribute("d", pathData);
    path.setAttribute("class", "spiral-path");
    svgContainer.appendChild(path);
    
    // Store the spiral points for space positioning
    window.spiralPoints = spiralPoints;
}

/**
 * Calculate points for a spiral
 * @param {number} centerX - X coordinate of the center
 * @param {number} centerY - Y coordinate of the center
 * @param {number} numPoints - Number of points to calculate
 * @returns {Array} Array of {x, y} coordinates
 */
function calculateSpiralPoints(centerX, centerY, numPoints) {
    const points = [];
    const maxRadius = Math.min(centerX, centerY) * 0.9;
    const minRadius = maxRadius * 0.25;
    const radiusStep = (maxRadius - minRadius) / numPoints;
    
    for (let i = 0; i < numPoints; i++) {
        const angle = (i / numPoints) * Math.PI * 8; // 4 full turns
        const radius = maxRadius - (radiusStep * i);
        
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);
        
        points.push({ x, y });
    }
    
    // Reverse the points so we start from the outer edge
    return points.reverse();
}

/**
 * Position the game spaces along the spiral
 */
function positionSpaces() {
    const spaces = document.querySelectorAll('.space');
    if (!spaces.length || !window.spiralPoints) return;
    
    spaces.forEach((space, index) => {
        if (index < window.spiralPoints.length) {
            const point = window.spiralPoints[index];
            space.style.left = `${point.x}px`;
            space.style.top = `${point.y}px`;
        }
    });
}

/**
 * Setup the board control buttons
 */
function setupBoardControls() {
    const zoomInBtn = document.getElementById('zoom-in');
    const zoomOutBtn = document.getElementById('zoom-out');
    const resetBtn = document.getElementById('reset-board');
    const gameBoard = document.querySelector('.game-board');
    
    if (!zoomInBtn || !zoomOutBtn || !resetBtn || !gameBoard) return;
    
    let scale = 1;
    const minScale = 0.5;
    const maxScale = 2;
    const scaleStep = 0.1;
    
    zoomInBtn.addEventListener('click', () => {
        if (scale < maxScale) {
            scale += scaleStep;
            gameBoard.style.transform = `scale(${scale})`;
        }
    });
    
    zoomOutBtn.addEventListener('click', () => {
        if (scale > minScale) {
            scale -= scaleStep;
            gameBoard.style.transform = `scale(${scale})`;
        }
    });
    
    resetBtn.addEventListener('click', () => {
        scale = 1;
        gameBoard.style.transform = `scale(${scale})`;
    });
}

/**
 * Create a simulated game piece on the board
 * @param {number} spaceIndex - The index of the space to place the piece on
 * @param {string} playerColor - The color of the player piece
 */
function createGamePiece(spaceIndex, playerColor) {
    const spaces = document.querySelectorAll('.space');
    if (!spaces[spaceIndex]) return;
    
    const piece = document.createElement('div');
    piece.classList.add('game-piece');
    piece.style.backgroundColor = playerColor;
    
    // Remove any existing pieces of this color
    const existingPieces = document.querySelectorAll(`.game-piece[style*="background-color: ${playerColor}"]`);
    existingPieces.forEach(p => p.remove());
    
    spaces[spaceIndex].appendChild(piece);
}

/**
 * Highlight a specific path on the board
 * @param {number} startIndex - The starting space index
 * @param {number} endIndex - The ending space index
 */
function highlightPath(startIndex, endIndex) {
    if (!window.spiralPoints) return;
    
    const svgContainer = document.getElementById('spiral-svg');
    if (!svgContainer) return;
    
    // Remove any existing highlighted paths
    const existingHighlights = document.querySelectorAll('.highlight-path');
    existingHighlights.forEach(p => p.remove());
    
    // Create a new path
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let pathData = `M ${window.spiralPoints[startIndex].x} ${window.spiralPoints[startIndex].y}`;
    
    for (let i = startIndex + 1; i <= endIndex; i++) {
        if (window.spiralPoints[i]) {
            pathData += ` L ${window.spiralPoints[i].x} ${window.spiralPoints[i].y}`;
        }
    }
    
    path.setAttribute("d", pathData);
    path.setAttribute("class", "highlight-path");
    svgContainer.appendChild(path);
    
    // Make the highlight pulse briefly
    setTimeout(() => {
        path.remove();
    }, 3000);
}

/**
 * Show a zone tooltip
 * @param {string} zoneId - The ID of the zone element
 * @param {string} zoneInfo - The information to display
 */
function showZoneInfo(zoneId, zoneInfo) {
    const zone = document.getElementById(zoneId);
    if (!zone) return;
    
    // Create tooltip element if it doesn't exist
    let tooltip = document.getElementById(`${zoneId}-tooltip`);
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = `${zoneId}-tooltip`;
        tooltip.classList.add('zone-tooltip');
        document.body.appendChild(tooltip);
    }
    
    // Set tooltip content and position
    tooltip.innerHTML = zoneInfo;
    
    const zoneRect = zone.getBoundingClientRect();
    tooltip.style.left = `${zoneRect.left + zoneRect.width / 2}px`;
    tooltip.style.top = `${zoneRect.top - 10}px`;
    tooltip.style.transform = 'translate(-50%, -100%)';
    tooltip.style.opacity = '1';
    
    // Hide tooltip after 3 seconds
    setTimeout(() => {
        tooltip.style.opacity = '0';
        setTimeout(() => {
            tooltip.remove();
        }, 300);
    }, 3000);
}

// Export functions for testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        calculateSpiralPoints
    };
}