// Initialize local storage with default values if not exists
if (!localStorage.getItem('workouts')) {
    localStorage.setItem('workouts', JSON.stringify([]));
}

if (!localStorage.getItem('userProfile')) {
    localStorage.setItem('userProfile', JSON.stringify({
        name: '',
        age: '',
        height: '',
        weight: '',
        goal: 'weight-loss'
    }));
}

// Common Functions
function formatDate(date) {
    return new Date(date).toLocaleDateString();
}

// Workout Page Functions
if (document.querySelector('.workout-page')) {
    let workoutStartTime = null;
    let exercises = [];

    const exerciseContainer = document.getElementById('exerciseContainer');
    const addExerciseBtn = document.getElementById('addExercise');
    const finishWorkoutBtn = document.getElementById('finishWorkout');
    const durationElement = document.getElementById('duration');
    const exerciseCountElement = document.getElementById('exerciseCount');

    function updateDuration() {
        if (workoutStartTime) {
            const duration = Math.floor((Date.now() - workoutStartTime) / 1000);
            const minutes = Math.floor(duration / 60);
            const seconds = duration % 60;
            durationElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }

    function createExerciseElement() {
        const exerciseDiv = document.createElement('div');
        exerciseDiv.className = 'exercise-item';
        exerciseDiv.innerHTML = `
            <input type="text" placeholder="Exercise name" class="exercise-name">
            <input type="number" placeholder="Sets" class="exercise-sets" min="1">
            <input type="number" placeholder="Reps" class="exercise-reps" min="1">
            <button class="btn secondary remove-exercise">Remove</button>
        `;

        exerciseDiv.querySelector('.remove-exercise').addEventListener('click', () => {
            exerciseDiv.remove();
            updateExerciseCount();
        });

        exerciseContainer.appendChild(exerciseDiv);
        updateExerciseCount();
    }

    function updateExerciseCount() {
        const count = document.querySelectorAll('.exercise-item').length;
        exerciseCountElement.textContent = count;
    }

    function startWorkout() {
        if (!workoutStartTime) {
            workoutStartTime = Date.now();
            setInterval(updateDuration, 1000);
        }
    }

    function saveWorkout() {
        const exerciseElements = document.querySelectorAll('.exercise-item');
        const exercises = Array.from(exerciseElements).map(element => ({
            name: element.querySelector('.exercise-name').value,
            sets: element.querySelector('.exercise-sets').value,
            reps: element.querySelector('.exercise-reps').value
        }));

        const workout = {
            date: new Date().toISOString(),
            duration: durationElement.textContent,
            type: document.getElementById('workoutType').value,
            exercises: exercises
        };

        const workouts = JSON.parse(localStorage.getItem('workouts'));
        workouts.push(workout);
        localStorage.setItem('workouts', JSON.stringify(workouts));

        window.location.href = 'progress.html';
    }

    addExerciseBtn?.addEventListener('click', () => {
        createExerciseElement();
        startWorkout();
    });

    finishWorkoutBtn?.addEventListener('click', saveWorkout);
}

// Progress Page Functions
if (document.querySelector('.progress-page')) {
    function updateStats() {
        const workouts = JSON.parse(localStorage.getItem('workouts'));
        
        // Update total workouts
        document.getElementById('totalWorkouts').textContent = workouts.length;

        // Update weekly workouts
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const weeklyWorkouts = workouts.filter(workout => 
            new Date(workout.date) > oneWeekAgo
        ).length;
        document.getElementById('weeklyWorkouts').textContent = weeklyWorkouts;

        // Update streak
        let streak = 0;
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        for (let i = 0; i < 7; i++) {
            const checkDate = new Date(today);
            checkDate.setDate(checkDate.getDate() - i);
            
            const hasWorkout = workouts.some(workout => {
                const workoutDate = new Date(workout.date);
                return workoutDate.toDateString() === checkDate.toDateString();
            });

            if (hasWorkout) {
                streak++;
            } else {
                break;
            }
        }
        document.getElementById('streak').textContent = streak + ' days';

        // Update workout history
        const historyContainer = document.getElementById('workoutHistory');
        const recentWorkouts = workouts.slice(-5).reverse();
        
        historyContainer.innerHTML = recentWorkouts.map(workout => `
            <div class="workout-entry">
                <h3>${formatDate(workout.date)}</h3>
                <p>Type: ${workout.type}</p>
                <p>Duration: ${workout.duration}</p>
                <p>Exercises: ${workout.exercises.length}</p>
            </div>
        `).join('');

        // Create charts if Chart.js is loaded
        if (typeof Chart !== 'undefined') {
            createWorkoutChart(workouts);
        }
    }

    function createWorkoutChart(workouts) {
        const ctx = document.getElementById('workoutChart').getContext('2d');
        const dates = workouts.slice(-7).map(w => formatDate(w.date));
        const exerciseCounts = workouts.slice(-7).map(w => w.exercises.length);

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Exercises per Workout',
                    data: exerciseCounts,
                    borderColor: '#4CAF50',
                    tension: 0.1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    updateStats();
}

// Profile Page Functions
if (document.querySelector('.profile-page')) {
    const profileForm = document.getElementById('profileForm');
    const userProfile = JSON.parse(localStorage.getItem('userProfile'));

    // Fill form with existing data
    document.getElementById('name').value = userProfile.name;
    document.getElementById('age').value = userProfile.age;
    document.getElementById('height').value = userProfile.height;
    document.getElementById('weight').value = userProfile.weight;
    document.getElementById('goal').value = userProfile.goal;

    profileForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const updatedProfile = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            height: document.getElementById('height').value,
            weight: document.getElementById('weight').value,
            goal: document.getElementById('goal').value
        };

        localStorage.setItem('userProfile', JSON.stringify(updatedProfile));
        alert('Profile updated successfully!');
    });

    // Handle dark mode toggle
    const darkModeToggle = document.getElementById('darkMode');
    darkModeToggle?.addEventListener('change', (e) => {
        document.body.classList.toggle('dark-mode', e.target.checked);
    });

    // Profile Image Handling
    document.addEventListener('DOMContentLoaded', function() {
        const profileImage = document.getElementById('profileImage');
        const fileInput = document.getElementById('fileInput');
        const uploadPhoto = document.getElementById('uploadPhoto');
        const takeSelfie = document.getElementById('takeSelfie');
        const selfieModal = document.getElementById('selfieModal');
        const closeModal = document.querySelector('.close');
        const videoElement = document.getElementById('videoElement');
        const canvasElement = document.getElementById('canvasElement');
        const captureSelfie = document.getElementById('captureSelfie');
        const saveSelfie = document.getElementById('saveSelfie');
        let stream = null;

        // Handle gallery upload
        uploadPhoto.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Handle selfie capture
        takeSelfie.addEventListener('click', async () => {
            selfieModal.style.display = 'block';
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true });
                videoElement.srcObject = stream;
            } catch (err) {
                console.error('Error accessing camera:', err);
                alert('Unable to access camera. Please make sure you have granted camera permissions.');
            }
        });

        closeModal.addEventListener('click', () => {
            selfieModal.style.display = 'none';
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            videoElement.srcObject = null;
            saveSelfie.style.display = 'none';
            captureSelfie.style.display = 'block';
        });

        captureSelfie.addEventListener('click', () => {
            canvasElement.width = videoElement.videoWidth;
            canvasElement.height = videoElement.videoHeight;
            canvasElement.getContext('2d').drawImage(videoElement, 0, 0);
            saveSelfie.style.display = 'block';
            captureSelfie.style.display = 'none';
        });

        saveSelfie.addEventListener('click', () => {
            const imageData = canvasElement.toDataURL('image/jpeg');
            profileImage.src = imageData;
            selfieModal.style.display = 'none';
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
            videoElement.srcObject = null;
            saveSelfie.style.display = 'none';
            captureSelfie.style.display = 'block';
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === selfieModal) {
                closeModal.click();
            }
        });
    });
}

// Download functionality
function showDownloadModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Download Palestra App</h2>
            <div class="download-options">
                <a href="#" class="download-btn android-btn" onclick="handleDownload('android')">
                    <i class="fab fa-android"></i>
                    <div class="download-text">
                        <span class="small-text">Get it on</span>
                        <span class="large-text">Google Play</span>
                    </div>
                </a>
                <a href="#" class="download-btn ios-btn" onclick="handleDownload('ios')">
                    <i class="fab fa-apple"></i>
                    <div class="download-text">
                        <span class="small-text">Download on the</span>
                        <span class="large-text">App Store</span>
                    </div>
                </a>
                <a href="#" class="download-btn windows-btn" onclick="handleDownload('windows')">
                    <i class="fab fa-windows"></i>
                    <div class="download-text">
                        <span class="small-text">Get it for</span>
                        <span class="large-text">Windows</span>
                    </div>
                </a>
            </div>
            <div class="qr-section">
                <p>Or scan QR code to download</p>
                <div class="qr-code">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://palestra-app.com/download" alt="Download QR Code">
                </div>
            </div>
            <button class="close-button">&times;</button>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector('.close-button').onclick = () => modal.remove();
}

function handleDownload(platform) {
    const downloadLinks = {
        android: 'https://play.google.com/store/apps/details?id=com.palestra.app',
        ios: 'https://apps.apple.com/app/palestra/id123456789',
        windows: 'https://palestra-app.com/download/windows'
    };

    const platformNames = {
        android: 'Android',
        ios: 'iOS',
        windows: 'Windows'
    };

    // Simulate download start
    showToast(`Starting download for ${platformNames[platform]}...`);
    
    // In a real app, this would redirect to the actual store/download page
    window.open(downloadLinks[platform], '_blank');
}

// Add event listener for download button
document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', showDownloadModal);
    }

    // User Authentication
    let isLoggedIn = false;

    function updateAuthUI() {
        const loginBtn = document.getElementById('loginBtn');
        const signupBtn = document.getElementById('signupBtn');
        const profileBtn = document.getElementById('profileBtn');
        const logoutBtn = document.getElementById('logoutBtn');
        const userBtn = document.getElementById('userBtn');

        if (isLoggedIn) {
            loginBtn.style.display = 'none';
            signupBtn.style.display = 'none';
            profileBtn.style.display = 'block';
            logoutBtn.style.display = 'block';
            userBtn.innerHTML = `<i class="fas fa-user-circle"></i> <span>My Account</span>`;
            document.body.classList.add('logged-in');
        } else {
            loginBtn.style.display = 'block';
            signupBtn.style.display = 'block';
            profileBtn.style.display = 'none';
            logoutBtn.style.display = 'none';
            userBtn.innerHTML = `<i class="fas fa-user-circle"></i> <span>Account</span>`;
            document.body.classList.remove('logged-in');
        }
    }

    function showLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Login to Palestra</h2>
                <form id="loginForm">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit" class="primary-button">Login</button>
                    <p class="text-center">
                        <a href="#" id="forgotPassword">Forgot Password?</a>
                    </p>
                </form>
                <button class="close-button">&times;</button>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-button').onclick = () => modal.remove();
        modal.querySelector('#loginForm').onsubmit = (e) => {
            e.preventDefault();
            // Add your login logic here
            isLoggedIn = true;
            updateAuthUI();
            modal.remove();
            showToast('Successfully logged in!');
        };
    }

    function showSignupModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Create Account</h2>
                <form id="signupForm">
                    <div class="form-group">
                        <label for="name">Full Name</label>
                        <input type="text" id="name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" required>
                    </div>
                    <div class="form-group">
                        <label for="password">Password</label>
                        <input type="password" id="password" required>
                    </div>
                    <button type="submit" class="primary-button">Sign Up</button>
                </form>
                <button class="close-button">&times;</button>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-button').onclick = () => modal.remove();
        modal.querySelector('#signupForm').onsubmit = (e) => {
            e.preventDefault();
            // Add your signup logic here
            isLoggedIn = true;
            updateAuthUI();
            modal.remove();
            showToast('Account created successfully!');
        };
    }

    function logout() {
        isLoggedIn = false;
        updateAuthUI();
        showToast('Successfully logged out!');
    }

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        setTimeout(() => toast.classList.add('show'), 100);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    // Social Login Handlers
    function handleGoogleLogin() {
        // Implement Google OAuth login
        showToast('Logging in with Google...');
        // Simulate successful login
        setTimeout(() => {
            isLoggedIn = true;
            updateAuthUI();
            showToast('Successfully logged in with Google!');
        }, 1000);
    }

    function handleAppleLogin() {
        // Implement Apple Sign-in
        showToast('Logging in with Apple...');
        // Simulate successful login
        setTimeout(() => {
            isLoggedIn = true;
            updateAuthUI();
            showToast('Successfully logged in with Apple!');
        }, 1000);
    }

    function showPhoneLoginModal() {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>Login with Phone</h2>
                <form id="phoneLoginForm">
                    <div class="form-group">
                        <label for="phoneNumber">Phone Number</label>
                        <div class="phone-input">
                            <select id="countryCode">
                                <option value="+1">+1 (US)</option>
                                <option value="+44">+44 (UK)</option>
                                <option value="+91">+91 (IN)</option>
                                <option value="+61">+61 (AU)</option>
                            </select>
                            <input type="tel" id="phoneNumber" required pattern="[0-9]{10}" placeholder="Enter phone number">
                        </div>
                    </div>
                    <button type="submit" class="primary-button">Send OTP</button>
                    <div id="otpSection" style="display: none;">
                        <div class="form-group">
                            <label for="otp">Enter OTP</label>
                            <input type="text" id="otp" maxlength="6" pattern="[0-9]{6}" placeholder="Enter 6-digit OTP">
                        </div>
                        <button type="button" class="primary-button" onclick="verifyOTP()">Verify & Login</button>
                    </div>
                </form>
                <button class="close-button">&times;</button>
            </div>
        `;
        document.body.appendChild(modal);

        modal.querySelector('.close-button').onclick = () => modal.remove();
        modal.querySelector('#phoneLoginForm').onsubmit = (e) => {
            e.preventDefault();
            const phoneNumber = document.getElementById('countryCode').value + 
                              document.getElementById('phoneNumber').value;
            // Simulate OTP send
            showToast('OTP sent to ' + phoneNumber);
            document.getElementById('otpSection').style.display = 'block';
        };
    }

    function verifyOTP() {
        // Simulate OTP verification
        showToast('Verifying OTP...');
        setTimeout(() => {
            isLoggedIn = true;
            updateAuthUI();
            document.querySelector('.modal').remove();
            showToast('Successfully logged in!');
        }, 1000);
    }

    // Event Listeners
    document.getElementById('googleLoginBtn').addEventListener('click', handleGoogleLogin);
    document.getElementById('appleLoginBtn').addEventListener('click', handleAppleLogin);
    document.getElementById('phoneLoginBtn').addEventListener('click', showPhoneLoginModal);
    document.getElementById('loginBtn').addEventListener('click', showLoginModal);
    document.getElementById('signupBtn').addEventListener('click', showSignupModal);
    document.getElementById('logoutBtn').addEventListener('click', logout);
});
