// =======================================
// INITIALISATION FUNCTION (RUNS ON LOAD)
// =======================================
function init() {

    // ========================
    // NAVIGATION HIGHLIGHTING
    // ========================

    // get all navigation links
    var links = document.querySelectorAll("nav a");

    // loop through each link
    for (var i = 0; i < links.length; i++) {

        // check if link matches current page URL
        if (links[i].href == window.location.href) {

            // highlight current page
            links[i].style.backgroundColor = "red";
        }
    }

    // ========================
    // REGISTER FORM VALIDATION
    // ========================

    // get registration form
    var regForm = document.getElementById("regform");

    // attach validation function if form exists
    if (regForm != null) {
        regForm.onsubmit = validate;
    }

    // ========================
    // RESERVATION FORM VALIDATION (ADDED)
    // ========================

    // get reservation form
    var resForm = document.getElementById("resform");

    // attach validation function
    if (resForm != null) {
        resForm.onsubmit = validateReservation;
    }

    // ========================
    // RESERVATION PAGE SETUP
    // ========================

    // get date field
    var dateField = document.getElementById("date");

    // prevent past date selection
    if (dateField != null) {
        var today = new Date().toISOString().split("T")[0];
        dateField.setAttribute("min", today);
    }

    // check if restaurant was saved previously
    var savedRestaurant = localStorage.getItem("restaurant");

    if (savedRestaurant != null) {

        var dropdown = document.getElementById("restaurant");

        if (dropdown != null) {

            // loop through dropdown options
            for (var i = 0; i < dropdown.options.length; i++) {

                // match saved restaurant
                if (dropdown.options[i].text == savedRestaurant) {

                    dropdown.selectedIndex = i;
                }
            }

            // update deposit automatically
            calculateDeposit();
        }
    }
}


// =======================================
// REGISTRATION VALIDATION
// =======================================
function validate() {

    // get user input values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var pwd1 = document.getElementById("pwd1").value;
    var pwd2 = document.getElementById("pwd2").value;
    var country = document.getElementById("country").value;

    var errMsg = "";
    var result = true;

    // ========================
    // VALIDATION RULES
    // ========================

    // Username: at least 5 characters, letters/numbers/underscore
    if (!/^\w{5,}$/.test(name)) {
        errMsg += "Username must be at least 5 characters (letters, numbers, underscores only)\n";
    }

    // Email format validation using regex
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        errMsg += "Invalid email format\n";
    }

    // Phone: digits only, 8–15 digits
    if (!/^\d{8,15}$/.test(phone)) {
        errMsg += "Phone must be 8–15 digits\n";
    }

    // Password: strong password rules
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/.test(pwd1)) {
        errMsg += "Password must be 10+ chars with uppercase, lowercase, number, and special character\n";
    }

    // Confirm password match
    if (pwd1 != pwd2) {
        errMsg += "Passwords do not match\n";
    }

    // Gender selection check
    var gender = document.getElementsByName("gender");
    var genderSelected = false;

    for (var i = 0; i < gender.length; i++) {
        if (gender[i].checked) {
            genderSelected = true;
        }
    }

    if (!genderSelected) {
        errMsg += "Please select a gender\n";
    }

    // Country selection check
    if (country == "") {
        errMsg += "Please select a country\n";
    }

    // ========================
    // SHOW ERRORS
    // ========================
    if (errMsg != "") {
        alert(errMsg);
        result = false;
    }

    return result;
}


// =======================================
// RESERVATION VALIDATION (FULLY ADDED)
// =======================================
function validateReservation() {

    // get input values
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var people = document.getElementById("people").value;
    var date = document.getElementById("date").value;

    var errMsg = "";

    // Email format check
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        errMsg += "Invalid email format\n";
    }

    // Phone must be at least 10 digits
    if (!/^\d{10,}$/.test(phone)) {
        errMsg += "Phone must have at least 10 digits\n";
    }

    // Number of people must be valid
    if (people <= 0 || isNaN(people)) {
        errMsg += "Number of people must be greater than 0\n";
    }

    // Date must not be empty (past already blocked in init)
    if (date == "") {
        errMsg += "Please select a reservation date\n";
    }

    // ========================
    // PAYMENT VALIDATION
    // ========================

    var payment = document.querySelector('input[name="payment"]:checked');

    // check if payment selected
    if (payment == null) {
        errMsg += "Please select a payment method\n";
    }

    // validate card only if NOT voucher
    else if (payment.value != "voucher") {

        var card = document.getElementById("cardNumber").value;

        // digits only
        if (!/^\d+$/.test(card)) {
            errMsg += "Card must contain digits only\n";
        }

        // correct length check
        else if (!(card.length == 15 || card.length == 16)) {
            errMsg += "Card must be 15 (Amex) or 16 (Visa/Mastercard) digits\n";
        }
    }

    // ========================
    // SHOW ERRORS
    // ========================
    if (errMsg != "") {
        alert(errMsg);
        return false;
    }

    return true;
}


// =======================================
// RESTAURANT RECOMMENDATION SYSTEM
// =======================================
let selectedRestaurant = "";

function recommend() {

    // get user inputs
    var diet = document.getElementById("diet").value;
    var budget = document.getElementById("budget").value;
    var purpose = document.getElementById("purpose").value;

    var result = "";

    // apply rule-based logic
    if (diet == "vegan") {
        result = "Vegan Delight";
    }
    else if (diet == "halal") {
        result = "Curry Place";
    }
    else if (budget == "low") {
        result = "Burger Hub";
    }
    else if (budget == "medium") {
        result = "Mario Pizza";
    }
    else if (budget == "high") {
        if (purpose == "date") {
            result = "Sushi House";
        } else {
            result = "BBQ Grill";
        }
    }
    else if (purpose == "family") {
        result = "Mario Pizza";
    }
    else if (purpose == "date") {
        result = "Sushi House";
    }
    else if (purpose == "business") {
        result = "BBQ Grill";
    }
    else {
        result = "Mario Pizza";
    }

    selectedRestaurant = result;

    // display result
    document.getElementById("result").innerHTML =
        "Recommended Restaurant: <strong>" + result + "</strong>";
}


// =======================================
// GO TO RESERVATION PAGE
// =======================================
function goToReservation() {

    // ensure recommendation was selected
    if (selectedRestaurant == "") {
        alert("Please get a recommendation first!");
        return;
    }

    // save to local storage
    localStorage.setItem("restaurant", selectedRestaurant);

    // redirect page
    window.location.href = "Reservation.html";
}


// =======================================
// DEPOSIT CALCULATION
// =======================================
function calculateDeposit() {

    var restaurant = document.getElementById("restaurant");
    var depositPerPerson = parseInt(restaurant.value);

    var people = parseInt(document.getElementById("people").value);

    // validate people input
    if (isNaN(people) || people <= 0) {
        document.getElementById("deposit").innerHTML =
            "Please enter a valid number of people";
        return;
    }

    var totalDeposit = depositPerPerson * people;

    // display deposit info
    document.getElementById("deposit").innerHTML =
        "Deposit per person: $" + depositPerPerson +
        "<br>Total Deposit: $" + totalDeposit;
}


// =======================================
// PAYMENT TOGGLE
// =======================================
function togglePayment() {

    var selected = document.querySelector('input[name="payment"]:checked');

    if (selected == null) {
        return;
    }

    var method = selected.value;

    // hide both sections first
    document.getElementById("voucherBox").style.display = "none";
    document.getElementById("cardBox").style.display = "none";

    // show correct section
    if (method == "voucher") {
        document.getElementById("voucherBox").style.display = "block";
    } else {
        document.getElementById("cardBox").style.display = "block";
    }
}


// =======================================
// COPY EMAIL FUNCTION
// =======================================
function copyEmail() {

    var email = document.getElementById("email").value;
    document.getElementById("billEmail").value = email;
}


// =======================================
// BONUS BILL CALCULATOR
// =======================================
function calcBill() {

    var price = document.getElementById("price").value;
    var people = document.getElementById("numPeople").value;

    var total = price * people;
    var perPerson = total / people;

    document.getElementById("bill").innerText =
        "Total: $" + total + " Per person: $" + perPerson;
}


// =======================================
// RUN INIT ON PAGE LOAD
// =======================================
window.onload = init;