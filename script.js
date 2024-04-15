// form submission and tax calculation function
function FormSubmit() {
    // fetch input values
    var grossIncome = parseFloat($('#grossIncome').val());
    var extraIncome = parseFloat($('#extraIncome').val());
    var deductions = parseFloat($('#deductions').val());
    var age = $('#age').val();

    // Validating inputs
    var isValid = true;

    // Validate gross income
    if (isNaN(grossIncome) || grossIncome < 0) {
        showError('grossIncomeError', 'Gross income is required or invalid');
        isValid = false;
        var element = document.getElementById("GrossAnnualIncome");
  element.classList.remove("visually-hidden");
    }
    else{
        var element = document.getElementById("GrossAnnualIncome");
  element.classList.add("visually-hidden");
    }

    // Validating extra income
    if (isNaN(extraIncome) || extraIncome < 0) {
        showError('extraIncomeError', 'Extra income is required or invalid');
        isValid = false;
        var element = document.getElementById("ExtraAnnualIncome");
  element.classList.remove("visually-hidden");
    }
    else{
        var element = document.getElementById("ExtraAnnualIncome");
  element.classList.add("visually-hidden");
    }

    // Validating age group selection
    if (age === '') {
        showError('ageError', 'Age group is required');
        isValid = false;
        var element = document.getElementById("AgeGroup");
  element.classList.remove("visually-hidden");
    }
    else{
        var element = document.getElementById("AgeGroup");
  element.classList.add("visually-hidden");
    }

    // Validating deductions
    if (isNaN(deductions) || deductions < 0) {
        showError('deductionsError', 'Deductions are required or invalid');
        isValid = false;
        var element = document.getElementById("AnnualDeductions");
  element.classList.remove("visually-hidden");
    }

    else{
        var element = document.getElementById("AnnualDeductions");
  element.classList.add("visually-hidden");
    }

    //  tax calculation
    if (isValid) {
        var taxRate;

        //  tax rate calculation based on age group
        switch (age) {
            case 'below40':
                // Tax rate 30%
                taxRate = 0.3;  
                break;
            case '40to60':
                // Tax rate 40% 
                taxRate = 0.4; 
                break;
            case 'above60':
                // Tax rate 10% 
                taxRate = 0.1; 
                break;
        }

        // Calculate  income
        var overallIncome = grossIncome + extraIncome - deductions;

        var taxableIncome = Math.max(0, overallIncome - 800000);

        var taxAmount = taxRate * taxableIncome;

        var netIncome = overallIncome - taxAmount;

        //  result 
        $('#resultBody').html('<h2>Your overall income will be</h2><h4>' + netIncome.toFixed(2) + '</h4> <h6>after tax deduction</h6>');
        $('#resultModal').modal('show');

        //form reset
        var element = document.getElementById("taxForm");
        element.reset()
    }
}


// Function to show error icon and tooltip
function showError(elementId, errorMessage) {
    // Show error icon and set tooltip with error message
    $('#' + elementId).css('display', 'inline').attr('title', errorMessage);
}

// Function to hide all error icons
