// Experiment 02: jQuery Password Strength & Star Rating System
$(document).ready(function () {
    
    // ==========================================
    // MODULE 1: PASSWORD STRENGTH INDICATOR
    // ==========================================
    const $pwdInput = $('#passwordInput');
    const $strengthBar = $('#strengthBar');
    const $strengthText = $('#strengthText');
    const $toggleBtn = $('#togglePasswordBtn');

    // Toggle Password Visibility
    $toggleBtn.on('click', function () {
        const currentType = $pwdInput.attr('type');
        if (currentType === 'password') {
            $pwdInput.attr('type', 'text');
            $(this).text('🔒');
        } else {
            $pwdInput.attr('type', 'password');
            $(this).text('👁️');
        }
    });

    // Password evaluation rules
    $pwdInput.on('input keyup', function () {
        const val = $(this).val();
        let score = 0;

        // Rule Checks
        const hasLength = val.length >= 8;
        const hasLower = /[a-z]/.test(val);
        const hasUpper = /[A-Z]/.test(val);
        const hasNumber = /[0-9]/.test(val);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

        // Update UI checklist dynamically
        updateRule('#rule-length', hasLength);
        updateRule('#rule-lower', hasLower);
        updateRule('#rule-upper', hasUpper);
        updateRule('#rule-number', hasNumber);
        updateRule('#rule-special', hasSpecial);

        if (hasLength) score++;
        if (hasLower) score++;
        if (hasUpper) score++;
        if (hasNumber) score++;
        if (hasSpecial) score++;

        // Strength levels
        const strengthConfig = [
            { text: 'None', color: '#64748b', percent: '0%' },
            { text: 'Very Weak', color: '#ef4444', percent: '20%' },
            { text: 'Weak', color: '#f97316', percent: '40%' },
            { text: 'Medium', color: '#eab308', percent: '60%' },
            { text: 'Strong', color: '#84cc16', percent: '80%' },
            { text: 'Very Strong (Secure)', color: '#10b981', percent: '100%' }
        ];

        if (val.length === 0) {
            $strengthBar.css({ width: '0%', backgroundColor: 'transparent' });
            $strengthText.text('None').css('color', '#64748b');
        } else {
            const config = strengthConfig[score];
            $strengthBar.css({
                width: config.percent,
                backgroundColor: config.color
            });
            $strengthText.text(config.text).css('color', config.color);
        }
    });

    function updateRule(selector, isValid) {
        const $el = $(selector);
        if (isValid) {
            $el.removeClass('invalid').addClass('valid');
            $el.find('.rule-icon').text('✓');
        } else {
            $el.removeClass('valid').addClass('invalid');
            $el.find('.rule-icon').text('✕');
        }
    }


    // ==========================================
    // MODULE 2: DOCTOR STAR RATING SYSTEM
    // ==========================================
    let selectedRating = 0;
    const ratingLabels = {
        1: 'Poor (1 Star) — Needs significant improvement',
        2: 'Fair (2 Stars) — Below average consultation',
        3: 'Good (3 Stars) — Satisfactory medical care',
        4: 'Very Good (4 Stars) — Thorough diagnosis & attentive',
        5: 'Exceptional (5 Stars) — Outstanding clinical expertise'
    };

    const $stars = $('.star');
    const $ratingStatus = $('#ratingStatus');
    const $starsContainer = $('#starsContainer');

    // Hover effect
    $stars.on('mouseenter', function () {
        const hoverVal = parseInt($(this).data('value'), 10);
        highlightStars(hoverVal, 'hovered');
        $ratingStatus.text(ratingLabels[hoverVal] || '').css('color', '#d97706');
    });

    // Mouse leave stars container
    $starsContainer.on('mouseleave', function () {
        $stars.removeClass('hovered');
        if (selectedRating > 0) {
            highlightStars(selectedRating, 'active');
            $ratingStatus.text(`Selected: ${ratingLabels[selectedRating]}`).css('color', '#15803d');
        } else {
            $stars.removeClass('active');
            $ratingStatus.text('Click on stars to submit your rating').css('color', '#b45309');
        }
    });

    // Click selection
    $stars.on('click', function () {
        selectedRating = parseInt($(this).data('value'), 10);
        highlightStars(selectedRating, 'active');
        $ratingStatus.text(`Locked: ${ratingLabels[selectedRating]}`).css('color', '#15803d');
    });

    function highlightStars(count, className) {
        $stars.each(function () {
            const val = parseInt($(this).data('value'), 10);
            if (val <= count) {
                $(this).addClass(className);
            } else {
                $(this).removeClass(className);
            }
        });
    }

    // Submit Feedback
    $('#submitFeedbackBtn').on('click', function () {
        if (selectedRating === 0) {
            alert('Please select a star rating (1-5) before submitting your feedback.');
            return;
        }

        const comments = $('#feedbackComments').val().trim() || 'No additional comments provided.';
        const starsStr = '★'.repeat(selectedRating) + '☆'.repeat(5 - selectedRating);

        $('#reviewSummaryText').html(`
            <strong>Rating Given:</strong> ${selectedRating}/5 ${starsStr}<br/>
            <strong>Remarks:</strong> <em>"${escapeHtml(comments)}"</em><br/>
            <strong>Doctor:</strong> Dr. Amarsinh V. Vidhate (HealthPulse Director)
        `);

        $('#reviewSuccessBanner').hide().fadeIn(400);
    });

    // Reset Rating
    $('#resetRatingBtn').on('click', function () {
        selectedRating = 0;
        $stars.removeClass('active hovered');
        $ratingStatus.text('Click on stars to submit your rating').css('color', '#b45309');
        $('#feedbackComments').val('');
        $('#reviewSuccessBanner').fadeOut(200);
    });

    function escapeHtml(text) {
        return $('<div>').text(text).html();
    }
});
