// TechVault Developer Registration Form Handler
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('techVaultForm');
    const pwd = document.getElementById('password');
    const confirmPwd = document.getElementById('confirmPassword');
    const pwdMismatch = document.getElementById('pwdMismatch');
    const modal = document.getElementById('successModal');
    const summaryBox = document.getElementById('registrationSummary');

    // Real-time password matching
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

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (pwd.value !== confirmPwd.value) {
            pwdMismatch.style.display = 'block';
            confirmPwd.focus();
            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const formData = new FormData(form);
        const selectedHardware = [];
        form.querySelectorAll('input[name="hardware"]:checked').forEach((cb) => {
            selectedHardware.push(cb.value);
        });

        const fullName = formData.get('fullName');
        const orgName = formData.get('orgName');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const track = formData.get('track');
        const tier = formData.get('tier');
        const gstin = formData.get('gstin') || 'Not Applicable (Personal)';

        summaryBox.innerHTML = `
            <strong>Developer:</strong> ${escapeHtml(fullName)}<br/>
            <strong>Organization:</strong> ${escapeHtml(orgName)}<br/>
            <strong>Contact:</strong> ${escapeHtml(phone)} | ${escapeHtml(email)}<br/>
            <strong>Track:</strong> ${escapeHtml(track)}<br/>
            <strong>Account Tier:</strong> ${escapeHtml(tier)}<br/>
            <strong>Hardware Focus:</strong> ${selectedHardware.length > 0 ? selectedHardware.join(', ') : 'General'}<br/>
            <strong>Tax GSTIN:</strong> ${escapeHtml(gstin)}<br/>
            <strong>Verification Status:</strong> Verified &amp; Active
        `;

        modal.style.display = 'flex';
    });
});

function closeModal() {
    document.getElementById('successModal').style.display = 'none';
    document.getElementById('techVaultForm').reset();
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
}
