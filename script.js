// State variables
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const progressBar = document.getElementById('progressBar');
const slideIndicator = document.getElementById('slideIndicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Navigation functions
function updateNavigation() {
    // Update slides visibility
    slides.forEach((slide, index) => {
        if (index === currentSlideIndex) {
            slide.classList.add('active');
        } else {
            slide.classList.remove('active');
        }
    });

    // Update Progress Bar
    const progressPercent = ((currentSlideIndex + 1) / totalSlides) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Update Indicators
    slideIndicator.textContent = `Slide ${currentSlideIndex + 1} de ${totalSlides}`;

    // Update Button Disabled States
    prevBtn.disabled = currentSlideIndex === 0;
    nextBtn.disabled = currentSlideIndex === totalSlides - 1;
}

function nextSlide() {
    if (currentSlideIndex < totalSlides - 1) {
        currentSlideIndex++;
        updateNavigation();
    }
}

function prevSlide() {
    if (currentSlideIndex > 0) {
        currentSlideIndex--;
        updateNavigation();
    }
}

function restartPresentation() {
    currentSlideIndex = 0;
    updateNavigation();
}

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === ' ') {
        // Spacebar or right arrow to go forward
        nextSlide();
        e.preventDefault();
    } else if (e.key === 'ArrowLeft') {
        // Left arrow to go back
        prevSlide();
        e.preventDefault();
    }
});

// Interactive Code Hover (Slide 4)
const codeHighlights = document.querySelectorAll('.code-line-highlight');
const explanationPlaceholder = document.querySelector('.explanation-placeholder');
const explanationItems = document.querySelectorAll('.explanation-item');

codeHighlights.forEach(line => {
    line.addEventListener('mouseenter', () => {
        const expId = line.getAttribute('data-explanation');
        
        // Hide placeholder and all explanation items
        explanationPlaceholder.style.display = 'none';
        explanationItems.forEach(item => item.style.display = 'none');
        
        // Highlight active line
        codeHighlights.forEach(l => l.classList.remove('active-hover'));
        line.classList.add('active-hover');
        
        // Show target explanation
        const targetExp = document.getElementById(`exp-${expId}`);
        if (targetExp) {
            targetExp.style.display = 'block';
        }
    });
    
    line.addEventListener('mouseleave', () => {
        // Keep the active explanation or reset if left completely? 
        // We will leave the last one open so it's readable.
    });
});

// Interactive Dog Creator Widget (Slide 5)
const dogNameInput = document.getElementById('dog-name');
const dogBreedInput = document.getElementById('dog-breed');
const valNome = document.getElementById('val-nome');
const valRaca = document.getElementById('val-raca');
const barkBubble = document.getElementById('barkBubble');
const dogAvatar = document.querySelector('.dog-avatar');

function updateDogData() {
    const name = dogNameInput.value.trim() || 'Rex';
    const breed = dogBreedInput.value.trim() || 'Labrador';
    
    valNome.textContent = `"${name}"`;
    valRaca.textContent = `"${breed}"`;
    barkBubble.textContent = `${name} diz: Au au!`;
}

// Event Listeners for inputs
dogNameInput.addEventListener('input', updateDogData);
dogBreedInput.addEventListener('input', updateDogData);

// Simulated method action trigger
function triggerBark() {
    const name = dogNameInput.value.trim() || 'Rex';
    barkBubble.textContent = `${name} diz: Au au!`;
    
    // Add animations
    dogAvatar.classList.add('bark-animation');
    barkBubble.classList.add('show');
    
    // Remove animations after duration
    setTimeout(() => {
        dogAvatar.classList.remove('bark-animation');
    }, 250);
    
    setTimeout(() => {
        barkBubble.classList.remove('show');
    }, 2000);
}

// Initialize navigation
updateNavigation();
