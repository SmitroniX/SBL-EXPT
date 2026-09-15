// HealthPulse Registration Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    const pwd = document.getElementById('password');
    const confirmPwd = document.getElementById('confirmPassword');
    const pwdMismatch = document.getElementById('pwdMismatch');
    const modal = document.getElementById('successModal');
    const summaryBox = document.getElementById('registrationSummary');

    // Real-time password match listener
    function checkPasswords() {
        if (confirmPwd.value && pwd.value !== confirmPwd.value) {
            pwdMismatch.style.display = 'block';
            confirmPwd.setCustomValidity('Passwords do not match');
        } else {
            pwdMismatch.style.display = 'none';
            confirmPwd.setCustomValidity('');
        }
    }

    pwd.addEventListener('input', checkPasswords);
    confirmPwd.addEventListener('input', checkPasswords);

    // Form Submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Check password matching
        if (pwd.value !== confirmPwd.value) {
            pwdMismatch.style.display = 'block';
            confirmPwd.focus();
            return;
        }

        // Validate standard HTML5 inputs
        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        // Extract Form Data
        const formData = new FormData(form);
        const selectedConditions = [];
        form.querySelectorAll('input[name="conditions"]:checked').forEach((cb) => {
            selectedConditions.push(cb.value);
        });

        // Format summary output
        const patientName = formData.get('fullName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const dob = formData.get('dob');
        const bloodGroup = formData.get('bloodGroup');
        const gender = formData.get('gender');
        const insurance = formData.get('insuranceProvider') || 'None provided';

        summaryBox.innerHTML = `
            <strong>Patient Name:</strong> ${escapeHtml(patientName)}<br/>
            <strong>Contact:</strong> ${escapeHtml(phone)} | ${escapeHtml(email)}<br/>
            <strong>DOB:</strong> ${escapeHtml(dob)} (${escapeHtml(gender)})<br/>
            <strong>Blood Group:</strong> ${escapeHtml(bloodGroup)}<br/>
            <strong>Pre-Existing Conditions:</strong> ${selectedConditions.length > 0 ? selectedConditions.join(', ') : 'None'}<br/>
            <strong>Insurance Provider:</strong> ${escapeHtml(insurance)}<br/>
            <strong>HIPAA Status:</strong> Consent Confirmed & Verified
        `;

        modal.style.display = 'flex';
    });
});

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
    document.getElementById('registrationForm').reset();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}
