<script>
    const newPasswordInput = document.getElementById("newPassword");
    const confirmPasswordInput = document.getElementById("confirmPassword");
    
    const reqLength = document.getElementById("reqLength");
    const reqUpper = document.getElementById("reqUpper");
    const reqNumber = document.getElementById("reqNumber");
    const reqSpecial = document.getElementById("reqSpecial");

    // Live Checklist Validation
    newPasswordInput.addEventListener("input", function() {
        let val = newPasswordInput.value;

        if (val.length >= 😎 {
            reqLength.classList.add("valid");
            reqLength.innerHTML = '<i class="fa-solid fa-circle-check"></i> At least 8 characters';
        } else {
            reqLength.classList.remove("valid");
            reqLength.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> At least 8 characters';
        }

        if (/[A-Z]/.test(val)) {
            reqUpper.classList.add("valid");
            reqUpper.innerHTML = '<i class="fa-solid fa-circle-check"></i> At least one uppercase letter (A-Z)';
        } else {
            reqUpper.classList.remove("valid");
            reqUpper.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> At least one uppercase letter (A-Z)';
        }

        if (/[0-9]/.test(val)) {
            reqNumber.classList.add("valid");
            reqNumber.innerHTML = '<i class="fa-solid fa-circle-check"></i> At least one number (0-9)';
        } else {
            reqNumber.classList.remove("valid");
            reqNumber.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> At least one number (0-9)';
        }

        if (/[!@#$%^&*(),.?":{}|<>]/.test(val)) {
            reqSpecial.classList.add("valid");
            reqSpecial.innerHTML = '<i class="fa-solid fa-circle-check"></i> At least one special character (!@#$%^&*)';
        } else {
            reqSpecial.classList.remove("valid");
            reqSpecial.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> At least one special character (!@#$%^&*)';
        }
    });

    // Toggle Password Visibility
    const toggleNewPassword = document.querySelector('#toggleNewPassword');
    if (toggleNewPassword) {
        toggleNewPassword.addEventListener('click', function () {
            const type = newPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            newPasswordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function () {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    }

    // Password Updated Function with Green Button and 1-second redirect
    function passwordUpdated() {
        let newPassword = newPasswordInput.value.trim();
        let confirmPassword = confirmPasswordInput.value.trim();
        let submitBtn = document.getElementById("submitBtn");

        let hasLength = newPassword.length >= 8;
        let hasUpper = /[A-Z]/.test(newPassword);
        let hasNumber = /[0-9]/.test(newPassword);
        let hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

        if (newPassword === "" || confirmPassword === "") {
            alert("Please fill in all fields before submitting.");
        } else if (!hasLength || !hasUpper || !hasNumber || !hasSpecial) {
            alert("Please meet all password requirements before proceeding.");
        } else if (newPassword !== confirmPassword) {
            alert("Passwords do not match! Please check and try again.");
        } else {
            submitBtn.innerText = "PASSWORD UPDATED ✓";
            submitBtn.style.setProperty("background", "#10b981", "important");
            submitBtn.style.color = "#ffffff";
            submitBtn.style.cursor = "default";
            submitBtn.disabled = true;

            setTimeout(function() {
                window.location.href = "loginfinal.html";
            }, 1000);
        }
    }

    </script>
