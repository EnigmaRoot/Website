// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Scroll to top button
const scrollToTopBtn = document.querySelector('.scroll-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('active');
    } else {
        scrollToTopBtn.classList.remove('active');
    }
});


// Animation for skill progress bars on scroll
const progressBars = document.querySelectorAll('.progress');

function showProgress() {
    progressBars.forEach(progressBar => {
        const position = progressBar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (position < screenPosition) {
            progressBar.style.width = progressBar.parentElement.parentElement.querySelector('.stat-percentage').textContent;
        }
    });
}

// Show progress on initial load
window.addEventListener('load', showProgress);

// Show progress on scroll
window.addEventListener('scroll', showProgress);

// NEW ADDITIONS BELOW THIS LINE

// Typing effect for hero title
function typeEffect(element, speed) {
    const text = element.textContent;
    element.textContent = '';

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            // Add blinking cursor at the end
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '|';
            element.appendChild(cursor);

            // Blink the cursor
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }
    }, speed);
}

// Apply typing effect to hero title
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        typeEffect(heroTitle, 100);
    }
});

// Network particle animation for profile container
function createNetworkAnimation() {
    const networkOverlay = document.querySelector('.network-overlay');

    if (!networkOverlay) return;

    // Create dots and lines to represent a network
    for (let i = 0; i < 10; i++) {
        const dot = document.createElement('div');
        dot.className = 'network-dot';
        dot.style.left = `${Math.random() * 100}%`;
        dot.style.top = `${Math.random() * 100}%`;
        dot.style.animationDelay = `${Math.random() * 3}s`;

        networkOverlay.appendChild(dot);
    }

    // Add lines between dots
    const dots = document.querySelectorAll('.network-dot');
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            if (Math.random() > 0.7) { // Only create some connections
                const line = document.createElement('div');
                line.className = 'network-line';
                line.dataset.from = i;
                line.dataset.to = j;

                networkOverlay.appendChild(line);
            }
        }
    }

    // Add CSS for network animation
    const style = document.createElement('style');
    style.textContent = `
        .network-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
        }
        
        .network-dot {
            position: absolute;
            width: 6px;
            height: 6px;
            background-color: var(--secondary-color, #00cc99);
            border-radius: 50%;
            animation: pulse 3s infinite alternate;
        }
        
        .network-line {
            position: absolute;
            height: 1px;
            background-color: rgba(0, 204, 153, 0.3);
            transform-origin: left center;
            animation: fade 4s infinite alternate;
        }
        
        @keyframes pulse {
            0% { transform: scale(0.8); opacity: 0.4; }
            100% { transform: scale(1.2); opacity: 0.8; }
        }
        
        @keyframes fade {
            0% { opacity: 0.1; }
            100% { opacity: 0.5; }
        }
        
        .cursor {
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
    `;

    document.head.appendChild(style);

    // Update lines positions to connect dots
    function updateLines() {
        const lines = document.querySelectorAll('.network-line');
        lines.forEach(line => {
            const fromDot = dots[line.dataset.from];
            const toDot = dots[line.dataset.to];

            if (!fromDot || !toDot) return;

            const fromRect = fromDot.getBoundingClientRect();
            const toRect = toDot.getBoundingClientRect();
            const parentRect = networkOverlay.getBoundingClientRect();

            // Calculate relative positions
            const fromX = fromRect.left - parentRect.left + fromRect.width / 2;
            const fromY = fromRect.top - parentRect.top + fromRect.height / 2;
            const toX = toRect.left - parentRect.left + toRect.width / 2;
            const toY = toRect.top - parentRect.top + toRect.height / 2;

            // Calculate length and angle
            const length = Math.sqrt(Math.pow(toX - fromX, 2) + Math.pow(toY - fromY, 2));
            const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI;

            // Set line styles
            line.style.width = `${length}px`;
            line.style.left = `${fromX}px`;
            line.style.top = `${fromY}px`;
            line.style.transform = `rotate(${angle}deg)`;
        });
    }

    // Initial update
    setTimeout(updateLines, 100);
}

// Apply network animation
window.addEventListener('load', createNetworkAnimation);

// Animate skill cards on scroll
function animateSkillCards() {
    const skillCards = document.querySelectorAll('.skill-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    skillCards.forEach(card => {
        observer.observe(card);
    });

    // Add CSS for skill card animations
    const style = document.createElement('style');
    style.textContent = `
        .skill-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;

    document.head.appendChild(style);
}

// Apply skill card animations
window.addEventListener('load', animateSkillCards);

// Animate project cards with stagger effect
function animateProjectCards() {
    const projectCards = document.querySelectorAll('.project-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger the animation of each card
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Add CSS for project card animations
    const style = document.createElement('style');
    style.textContent = `
        .project-card {
            opacity: 0;
            transform: translateX(-30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .project-card.animate {
            opacity: 1;
            transform: translateX(0);
        }
    `;

    document.head.appendChild(style);
}

// Apply project card animations
window.addEventListener('load', animateProjectCards);

// Timeline animation
function animateTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    timelineItems.forEach(item => {
        observer.observe(item);
    });

    // Add CSS for timeline animations
    const style = document.createElement('style');
    style.textContent = `
        .timeline-item {
            opacity: 0;
            transform: translateX(-50px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .timeline-item:nth-child(even) {
            transform: translateX(50px);
        }
        
        .timeline-item.animate {
            opacity: 1;
            transform: translateX(0);
        }
    `;

    document.head.appendChild(style);
}

// Apply timeline animations
window.addEventListener('load', animateTimeline);

// Parallax effect for header background
function parallaxEffect() {
    const cyberPattern = document.querySelector('.cyber-pattern');

    if (!cyberPattern) return;

    window.addEventListener('scroll', () => {
        const scrollValue = window.scrollY;
        cyberPattern.style.transform = `translateY(${scrollValue * 0.3}px)`;
    });
}

// Apply parallax effect
window.addEventListener('load', parallaxEffect);

// Interactive stats on hover
function interactiveStats() {
    const statItems = document.querySelectorAll('.stat-item');

    statItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('highlight');
            const progress = item.querySelector('.progress');

            // Create pulse effect
            const pulse = document.createElement('div');
            pulse.className = 'stat-pulse';
            progress.appendChild(pulse);

            // Remove pulse after animation
            setTimeout(() => {
                if (pulse.parentNode) {
                    pulse.parentNode.removeChild(pulse);
                }
            }, 1000);
        });

        item.addEventListener('mouseleave', () => {
            item.classList.remove('highlight');
        });
    });

    // Add CSS for interactive stats
    const style = document.createElement('style');
    style.textContent = `
        .stat-item {
            transition: transform 0.3s ease;
        }
        
        .stat-item.highlight {
            transform: translateX(10px);
        }
        
        .stat-pulse {
            position: absolute;
            right: 0;
            top: 0;
            height: 100%;
            width: 10px;
            background-color: rgba(255, 255, 255, 0.6);
            animation: statPulse 1s ease-out;
        }
        
        @keyframes statPulse {
            0% { width: 10px; opacity: 0.8; }
            100% { width: 100%; opacity: 0; }
        }
    `;

    document.head.appendChild(style);
}

// Apply interactive stats
window.addEventListener('load', interactiveStats);

// Form validation
function setupFormValidation() {
    const form = document.querySelector('.contact-form');
    
    if (!form) return;
    
    // Add validation styles
    const style = document.createElement('style');
    style.textContent = `
        .form-error {
            color: #dc2626;
            font-size: 0.875rem;
            margin-top: -0.5rem;
            margin-bottom: 0.75rem;
            display: none;
        }
        
        .form-error.show {
            display: block;
        }
        
        .contact-form input.error,
        .contact-form textarea.error {
            border-color: #dc2626;
            outline-color: #dc2626;
        }
        
        .contact-form input.success,
        .contact-form textarea.success {
            border-color: #16a34a;
        }
        
        .form-message {
            padding: 1rem;
            margin-bottom: 1rem;
            border-radius: 8px;
            display: none;
            font-size: 0.95rem;
        }
        
        .form-message.show {
            display: block;
        }
        
        .form-message.success {
            background-color: #dcfce7;
            color: #15803d;
            border: 1px solid #86efac;
        }
        
        .form-message.error {
            background-color: #fee2e2;
            color: #991b1b;
            border: 1px solid #fca5a5;
        }
        
        .btn-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
    `;
    document.head.appendChild(style);
    
    // Create error message elements for each field
    const fields = form.querySelectorAll('input, textarea');
    fields.forEach(field => {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'form-error';
        errorDiv.id = `${field.name}-error`;
        field.parentNode.insertBefore(errorDiv, field.nextSibling);
    });
    
    // Create form message div
    const messageDiv = document.createElement('div');
    messageDiv.className = 'form-message';
    messageDiv.id = 'form-message';
    form.insertBefore(messageDiv, form.firstChild);
    
    // Validation functions
    function validateName(name) {
        const trimmed = name.trim();
        if (trimmed.length === 0) {
            return 'Name is required';
        }
        if (trimmed.length < 2) {
            return 'Name must be at least 2 characters';
        }
        if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
            return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return null;
    }
    
    function validateEmail(email) {
        const trimmed = email.trim();
        if (trimmed.length === 0) {
            return 'Email is required';
        }
        // More comprehensive email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(trimmed)) {
            return 'Please enter a valid email address';
        }
        return null;
    }
    
    function validateSubject(subject) {
        const trimmed = subject.trim();
        if (trimmed.length === 0) {
            return 'Subject is required';
        }
        if (trimmed.length < 3) {
            return 'Subject must be at least 3 characters';
        }
        return null;
    }
    
    function validateMessage(message) {
        const trimmed = message.trim();
        if (trimmed.length === 0) {
            return 'Message is required';
        }
        if (trimmed.length < 10) {
            return 'Message must be at least 10 characters';
        }
        return null;
    }
    
    function showError(field, message) {
        const errorDiv = document.getElementById(`${field.name}-error`);
        errorDiv.textContent = message;
        errorDiv.classList.add('show');
        field.classList.add('error');
        field.classList.remove('success');
    }
    
    function clearError(field) {
        const errorDiv = document.getElementById(`${field.name}-error`);
        errorDiv.textContent = '';
        errorDiv.classList.remove('show');
        field.classList.remove('error');
    }
    
    function showSuccess(field) {
        field.classList.add('success');
        field.classList.remove('error');
    }
    
    function showFormMessage(message, type) {
        const messageDiv = document.getElementById('form-message');
        messageDiv.textContent = message;
        messageDiv.className = `form-message ${type} show`;
        
        // Auto-hide after 5 seconds
        setTimeout(() => {
            messageDiv.classList.remove('show');
        }, 5000);
    }
    
    // Real-time validation
    const nameField = form.querySelector('[name="name"]');
    const emailField = form.querySelector('[name="email"]');
    const subjectField = form.querySelector('[name="subject"]');
    const messageField = form.querySelector('[name="message"]');
    
    nameField.addEventListener('blur', () => {
        const error = validateName(nameField.value);
        if (error) {
            showError(nameField, error);
        } else {
            clearError(nameField);
            showSuccess(nameField);
        }
    });
    
    emailField.addEventListener('blur', () => {
        const error = validateEmail(emailField.value);
        if (error) {
            showError(emailField, error);
        } else {
            clearError(emailField);
            showSuccess(emailField);
        }
    });
    
    subjectField.addEventListener('blur', () => {
        const error = validateSubject(subjectField.value);
        if (error) {
            showError(subjectField, error);
        } else {
            clearError(subjectField);
            showSuccess(subjectField);
        }
    });
    
    messageField.addEventListener('blur', () => {
        const error = validateMessage(messageField.value);
        if (error) {
            showError(messageField, error);
        } else {
            clearError(messageField);
            showSuccess(messageField);
        }
    });
    
    // Clear errors on input
    fields.forEach(field => {
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                clearError(field);
            }
        });
    });
    
    // Form submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Validate all fields
        const nameError = validateName(nameField.value);
        const emailError = validateEmail(emailField.value);
        const subjectError = validateSubject(subjectField.value);
        const messageError = validateMessage(messageField.value);
        
        // Show errors if any
        let hasErrors = false;
        
        if (nameError) {
            showError(nameField, nameError);
            hasErrors = true;
        } else {
            clearError(nameField);
            showSuccess(nameField);
        }
        
        if (emailError) {
            showError(emailField, emailError);
            hasErrors = true;
        } else {
            clearError(emailField);
            showSuccess(emailField);
        }
        
        if (subjectError) {
            showError(subjectField, subjectError);
            hasErrors = true;
        } else {
            clearError(subjectField);
            showSuccess(subjectField);
        }
        
        if (messageError) {
            showError(messageField, messageError);
            hasErrors = true;
        } else {
            clearError(messageField);
            showSuccess(messageField);
        }
        
        if (hasErrors) {
            showFormMessage('Please fix the errors above before submitting.', 'error');
            return;
        }
        
        // Disable submit button during submission
        const submitButton = form.querySelector('.btn-submit');
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...';
        
        // Prepare form data with trimmed values
        const formData = new FormData();
        formData.append('name', nameField.value.trim());
        formData.append('email', emailField.value.trim());
        formData.append('subject', subjectField.value.trim());
        formData.append('message', messageField.value.trim());
        
        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                form.reset();
                // Clear all success states
                fields.forEach(field => {
                    field.classList.remove('success');
                    clearError(field);
                });
            } else {
                showFormMessage('Oops! There was a problem sending your message. Please try again.', 'error');
            }
        } catch (error) {
            showFormMessage('Oops! There was a problem sending your message. Please try again.', 'error');
        } finally {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.innerHTML = 'Submit <i class="fas fa-arrow-right" aria-hidden="true"></i>';
        }
    });
}

// Apply form validation
window.addEventListener('load', setupFormValidation);