// Set minimum date to today
const dateInput = document.getElementById('appointmentDate');
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

// Progress bar animation
const form = document.getElementById('medicalConsultationForm');
const progressBar = document.getElementById('progressBar');
const formCards = document.querySelectorAll('.form-card');

function updateProgress() {
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    const filled = Array.from(inputs).filter(input => {
        if (input.type === 'radio') {
            return document.querySelector(`input[name="${input.name}"]:checked`);
        }
        return input.value.trim() !== '';
    }).length;
    
    const progress = (filled / inputs.length) * 100;
    progressBar.style.width = progress + '%';
}

form.addEventListener('input', updateProgress);
form.addEventListener('change', updateProgress);

// Handle form submission
form.addEventListener('submit', function(e) {
    e.preventDefault();

    // Get values
    const treatment = document.getElementById('treatment').value;
    const patientType = document.querySelector('input[name="patientType"]:checked').value;
    const date = document.getElementById('appointmentDate').value;
    const timeSlot = document.querySelector('input[name="timeSlot"]:checked').value;
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const contact = document.getElementById('contactNumber').value;
    const age = document.getElementById('age').value;
    const nationality = document.getElementById('nationality').value;
    const country = document.getElementById('country').value;
    const city = document.getElementById('city').value;
    const visa = document.querySelector('input[name="visaAssistance"]:checked').value;
    const medical = document.getElementById('medicalHistory').value;

    // Format date
    const dateObj = new Date(date);
    const formattedDate = dateObj.toLocaleDateString('en-IN', { 
        weekday: 'long',
        day: '2-digit', 
        month: 'long', 
        year: 'numeric' 
    });

    // Create message
    let message = `*🏥 MEDICAL CONSULTATION REQUEST*\n`;
    message += `*SIRPI Fertility & Women's Centre*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    
    message += `*📋 TREATMENT DETAILS*\n`;
    message += `Seeking: ${treatment}\n`;
    message += `Patient Type: ${patientType}\n\n`;
    
    message += `*📅 APPOINTMENT SCHEDULE*\n`;
    message += `Date: ${formattedDate}\n`;
    message += `Time: ${timeSlot}\n\n`;
    
    message += `*👤 PATIENT INFORMATION*\n`;
    message += `Name: ${name}\n`;
    message += `Age: ${age} years\n`;
    message += `Email: ${email}\n`;
    message += `Phone: ${contact}\n`;
    message += `Nationality: ${nationality}\n\n`;
    
    message += `*📍 LOCATION*\n`;
    message += `Country: ${country}\n`;
    message += `City: ${city}\n`;
    message += `Visa Assistance: ${visa}\n\n`;
    
    if (medical) {
        message += `*📝 MEDICAL CONCERNS*\n`;
        message += `${medical}\n\n`;
    }
    
    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += `_Request submitted at ${new Date().toLocaleString('en-IN')}_`;

    // Send to WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/918099881940?text=${encodedMessage}`;
    window.open(whatsappURL, '_blank');

    form.reset();
    updateProgress();
    alert('✅ Your consultation request is ready!\n\nPlease send the WhatsApp message to complete your booking.\n\nOur team will contact you within 24 hours.');
});

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Back to top button
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
