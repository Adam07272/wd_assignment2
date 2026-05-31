JavaScript Validation Logic

Page Initialization

When the page loads, the `init()` function runs automatically. It:

* Highlights the current page in the navigation menu.
* Connects form submission to validation functions.
* Prevents users from selecting past dates for reservations.
* Loads previously selected restaurant choices from local storage.

Registration Form Validation

The `validate()` function checks all inputs in the registration form before submission:

* **Username**
  * Must be at least 5 characters long.
  * Can only contain letters, numbers, and underscores.

* **Email**
  * Must follow a valid email format (e.g., <name@email.com>).

* **Phone Number**
  * Must contain only digits.
  * Must be between 8 and 15 digits long.

* **Password**
  * Must be at least 10 characters long.
  * Must include:
    * At least one uppercase letter
    * One lowercase letter
    * One number
    * One special character

* **Confirm Password**
  * Must match the original password.

* **Gender**
  * The user must select one option.

* **Country**
  * The user must choose a country from the dropdown.

👉 If any of these checks fail, an error message is shown and the form is not submitted.



Reservation Form Validation

The `validateReservation()` function checks inputs on the reservation form:

* **Email**
  * Must be in valid format.

* **Phone Number**
  * Must contain only digits and be at least 10 digits long.

* **Number of People**
  * Must be a number greater than 0.

* **Reservation Date**
  * Cannot be empty.
  * Past dates are already blocked using the date picker.

* **Payment Method**
  * The user must select a payment option.

* **Card Details (if card payment selected)**
  * Card number must contain digits only.
  * Must be either:
    * 15 digits (American Express), or
    * 16 digits (Visa/Mastercard).

👉 If any validation fails, an error message is displayed and the form submission is stopped.

***

Additional Features

* **Restaurant Recommendation**
  * Based on user preferences (diet, budget, purpose), a restaurant is suggested using simple decision rules.

* **Local Storage**
  * The selected restaurant is saved and automatically pre-selected on the reservation page.

* **Deposit Calculation**
  * Calculates total deposit based on number of people and restaurant pricing.

* **Payment Toggle**
  * Shows or hides input fields depending on selected payment method.

* **Copy Email**
  * Automatically copies the user’s email into the billing field.

* **Bill Calculator**
  * Calculates total cost and cost per person.


