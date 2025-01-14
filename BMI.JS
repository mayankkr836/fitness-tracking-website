// script.js

document.getElementById('bmi-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Convert height to meters

    if (!weight || !height || height <= 0 || weight <= 0) {
        alert('Please enter valid weight and height values.');
        return;
    }

    const bmi = weight / (height * height);
    const bmiResult = document.getElementById('bmi-result');
    const bmiCategory = document.getElementById('bmi-category');

    bmiResult.textContent = bmi.toFixed(2);

    // BMI Categories
    let category = '';
    if (bmi < 18.5) {
        category = 'Underweight';
    } else if (bmi >= 18.5 && bmi < 24.9) {
        category = 'Normal weight';
    } else if (bmi >= 25 && bmi < 29.9) {
        category = 'Overweight';
    } else {
        category = 'Obese';
    }

    bmiCategory.textContent = `Category: ${category}`;
});
