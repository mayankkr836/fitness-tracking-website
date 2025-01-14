document.addEventListener('DOMContentLoaded', function() {
    // Load saved user data
    loadUserData();

    // Handle menu item clicks
    const menuItems = document.querySelectorAll('.account-menu li a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all menu items
            menuItems.forEach(mi => mi.parentElement.classList.remove('active'));
            
            // Add active class to clicked menu item
            this.parentElement.classList.add('active');

            // Handle logout
            if (this.parentElement.classList.contains('logout')) {
                // Clear stored data on logout
                localStorage.removeItem('userData');
                console.log('Logging out...');
                window.location.href = 'index.html';
                return;
            }

            // Show corresponding section
            const sectionId = this.getAttribute('href').substring(1);
            document.querySelectorAll('.account-section').forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(sectionId)?.classList.add('active');
        });
    });

    // Handle profile image upload
    const editPhotoBtn = document.querySelector('.edit-photo');
    editPhotoBtn?.addEventListener('click', function() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    const imgSrc = event.target.result;
                    document.querySelector('.profile-image img').src = imgSrc;
                    // Save profile image to localStorage
                    saveUserData('profileImage', imgSrc);
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });

    // Handle form submission
    const profileForm = document.querySelector('.profile-form');
    profileForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get all form data
        const formData = {
            fullName: this.querySelector('input[placeholder="Enter your full name"]').value,
            age: this.querySelector('input[placeholder="Enter your age"]').value,
            gender: this.querySelector('select').value,
            email: this.querySelector('input[type="email"]').value,
            phone: this.querySelector('input[type="tel"]').value,
            height: this.querySelector('input[placeholder="Enter your height"]').value,
            weight: this.querySelector('input[placeholder="Enter your weight"]').value,
            goals: this.querySelector('textarea').value
        };
        
        // Save form data
        saveUserData('formData', formData);
        
        // Update display name in the sidebar
        const userNameElement = document.querySelector('.user-profile h3');
        if (userNameElement && formData.fullName) {
            userNameElement.textContent = formData.fullName;
        }
        
        // Update display email in the sidebar
        const userEmailElement = document.querySelector('.user-email');
        if (userEmailElement && formData.email) {
            userEmailElement.textContent = formData.email;
        }

        // Show success message
        const saveBtn = this.querySelector('.save-btn');
        const originalText = saveBtn.textContent;
        saveBtn.textContent = 'Changes Saved!';
        saveBtn.style.background = '#28a745';
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.background = '';
        }, 2000);
    });
});

// Function to save user data to localStorage
function saveUserData(key, data) {
    let userData = JSON.parse(localStorage.getItem('userData') || '{}');
    userData[key] = data;
    localStorage.setItem('userData', JSON.stringify(userData));
}

// Function to load saved user data
function loadUserData() {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    // Load profile image if exists
    if (userData.profileImage) {
        document.querySelector('.profile-image img').src = userData.profileImage;
    }
    
    // Load form data if exists
    if (userData.formData) {
        const formData = userData.formData;
        const form = document.querySelector('.profile-form');
        
        if (form) {
            form.querySelector('input[placeholder="Enter your full name"]').value = formData.fullName || '';
            form.querySelector('input[placeholder="Enter your age"]').value = formData.age || '';
            form.querySelector('select').value = formData.gender || 'male';
            form.querySelector('input[type="email"]').value = formData.email || '';
            form.querySelector('input[type="tel"]').value = formData.phone || '';
            form.querySelector('input[placeholder="Enter your height"]').value = formData.height || '';
            form.querySelector('input[placeholder="Enter your weight"]').value = formData.weight || '';
            form.querySelector('textarea').value = formData.goals || '';
            
            // Update sidebar display
            const userNameElement = document.querySelector('.user-profile h3');
            if (userNameElement && formData.fullName) {
                userNameElement.textContent = formData.fullName;
            }
            
            const userEmailElement = document.querySelector('.user-email');
            if (userEmailElement && formData.email) {
                userEmailElement.textContent = formData.email;
            }
        }
    }
}
