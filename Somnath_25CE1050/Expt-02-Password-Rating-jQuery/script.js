// Experiment 02: TechVault jQuery Password Strength & Product Star Rating
$(document).ready(function () {
    
    // ==========================================
    // MODULE 1: PASSWORD STRENGTH ANALYZER
    // ==========================================
    const $pwdInput = $('#passwordInput');
    const $strengthBar = $('#strengthBar');
    const $strengthText = $('#strengthText');
    const $toggleBtn = $('#togglePasswordBtn');

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

    $pwdInput.on('input keyup', function () {
        const val = $(this).val();
        let score = 0;

        const hasLength = val.length >= 8;
        const hasLower = /[a-z]/.test(val);
        const hasUpper = /[A-Z]/.test(val);
        const hasNumber = /[0-9]/.test(val);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(val);

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

        const strengthConfig = [
            { text: 'None', color: '#6b7280', percent: '0%' },
            { text: 'Very Weak', color: '#ef4444', percent: '20%' },
            { text: 'Weak', color: '#f97316', percent: '40%' },
            { text: 'Medium', color: '#eab308', percent: '60%' },
            { text: 'Strong', color: '#84cc16', percent: '80%' },
            { text: 'Very Strong (Military Grade)', color: '#10b981', percent: '100%' }
        ];

        if (val.length === 0) {
            $strengthBar.css({ width: '0%', backgroundColor: 'transparent' });
            $strengthText.text('None').css('color', '#6b7280');
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
    // MODULE 2: HARDWARE PRODUCT STAR RATING
    // ==========================================
    let selectedRating = 0;
    const ratingLabels = {
        1: 'Poor (1 Star) — Defective panel or substandard quality',
        2: 'Fair (2 Stars) — Noticeable ghosting / poor ergonomics',
        3: 'Good (3 Stars) — Decent coding & multi-window display',
        4: 'Very Good (4 Stars) — Crisp text resolution & high refresh rate',
        5: 'Exceptional (5 Stars) — Ultimate developer battle-station dream!'
    };

    const $stars = $('.star');
    const $ratingStatus = $('#ratingStatus');
    const $starsContainer = $('#starsContainer');

    $stars.on('mouseenter', function () {
        const hoverVal = parseInt($(this).data('value'), 10);
        highlightStars(hoverVal, 'hovered');
        $ratingStatus.text(ratingLabels[hoverVal] || '').css('color', '#fbbf24');
    });

    $starsContainer.on('mouseleave', function () {
        $stars.removeClass('hovered');
        if (selectedRating > 0) {
            highlightStars(selectedRating, 'active');
            $ratingStatus.text(`Locked: ${ratingLabels[selectedRating]}`).css('color', '#34d399');
        } else {
            $stars.removeClass('active');
            $ratingStatus.text('Click on stars to rate this hardware').css('color', '#f59e0b');
        }
    });

    $stars.on('click', function () {
        selectedRating = parseInt($(this).data('value'), 10);
        highlightStars(selectedRating, 'active');
        $ratingStatus.text(`Locked: ${ratingLabels[selectedRating]}`).css('color', '#34d399');
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

    $('#submitFeedbackBtn').on('click', function () {
        if (selectedRating === 0) {
            alert('Please select a star rating (1-5) before submitting your hardware review.');
            return;
        }

        const comments = $('#feedbackComments').val().trim() || 'No detailed written comments provided.';
        const starsStr = '★'.repeat(selectedRating) + '☆'.repeat(5 - selectedRating);

        $('#reviewSummaryText').html(`
            <strong>Product:</strong> Titan-X 49" UltraWide Curved OLED<br/>
            <strong>Rating Given:</strong> ${selectedRating}/5 ${starsStr}<br/>
            <strong>Reviewer Feedback:</strong> <em>"${escapeHtml(comments)}"</em><br/>
            <strong>Status:</strong> Verified Purchase Review Published
        `);

        $('#reviewSuccessBanner').hide().fadeIn(400);
    });

    $('#resetRatingBtn').on('click', function () {
        selectedRating = 0;
        $stars.removeClass('active hovered');
        $ratingStatus.text('Click on stars to rate this hardware').css('color', '#f59e0b');
        $('#feedbackComments').val('');
        $('#reviewSuccessBanner').fadeOut(200);
    });

    function escapeHtml(text) {
        return $('<div>').text(text).html();
    }
});
