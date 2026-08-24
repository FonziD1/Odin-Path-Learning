document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signup_form');
    if (!form) return;

    const firstNameInput = document.getElementById('first_name');
    const lastNameInput = document.getElementById('last_name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');

    // Helper functions to show and clear errors
    function showError(input, message) {
        const inputGroup = input.closest('.input-group') || input.parentElement;
        const errorSpan = inputGroup.querySelector('.error_msg');
        inputGroup.classList.add('error');
        if (errorSpan) {
            errorSpan.textContent = message;
        }
    }

    function clearError(input) {
        const inputGroup = input.closest('.input-group') || input.parentElement;
        const errorSpan = inputGroup.querySelector('.error_msg');
        inputGroup.classList.remove('error');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    }

    // Validation functions for individual fields
    function validateFirstName() {
        if (!firstNameInput.value.trim()) {
            showError(firstNameInput, '* First name is required');
            return false;
        }
        clearError(firstNameInput);
        return true;
    }

    function validateLastName() {
        if (!lastNameInput.value.trim()) {
            showError(lastNameInput, '* Last name is required');
            return false;
        }
        clearError(lastNameInput);
        return true;
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailValue) {
            showError(emailInput, '* Email is required');
            return false;
        } else if (!emailPattern.test(emailValue)) {
            showError(emailInput, '* Please enter a valid email address');
            return false;
        }
        clearError(emailInput);
        return true;
    }

    function validatePassword() {
        const passValue = passwordInput.value;
        if (!passValue) {
            showError(passwordInput, '* Password is required');
            return false;
        } else if (passValue.length < 6) {
            showError(passwordInput, '* Password must be at least 6 characters');
            return false;
        }
        clearError(passwordInput);
        return true;
    }

    function validateConfirmPassword() {
        const passValue = passwordInput.value;
        const confirmValue = confirmPasswordInput.value;

        if (!confirmValue) {
            showError(confirmPasswordInput, '* Please confirm your password');
            return false;
        } else if (passValue !== confirmValue) {
            showError(confirmPasswordInput, '* Passwords do not match');
            return false;
        }
        clearError(confirmPasswordInput);
        return true;
    }

    // Real-time validation when typing (clears error as soon as user fixes it)
    firstNameInput.addEventListener('input', validateFirstName);
    lastNameInput.addEventListener('input', validateLastName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', () => {
        validatePassword();
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
    });
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    // Form submit validation
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const isFirstNameValid = validateFirstName();
        const isLastNameValid = validateLastName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        const isFormValid = isFirstNameValid &&
                            isLastNameValid &&
                            isEmailValid &&
                            isPasswordValid &&
                            isConfirmPasswordValid;

        if (isFormValid) {
            alert('Account created successfully!');
            form.reset();
        }
    });
});
