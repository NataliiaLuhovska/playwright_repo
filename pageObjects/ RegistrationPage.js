import BasePage from "./BasePage.js";

export class RegistrationPage extends BasePage {
  constructor(page) {
    super(page);
    this.signUpButton = page.getByText("Sign up"); 
    this.nameField = page.locator('input#signupName');
    this.lastNameField = page.locator('input#signupLastName');
    this.emailField = page.locator('input#signupEmail');
    this.passwordField = page.locator('input#signupPassword'); 
    this.rePasswordField = page.locator('input#signupRepeatPassword'); 
    this.registerButton = page.getByText("Register");
  }

  async openSignUpForm() {
    await this.clickElement(this.signUpButton);
  }

  async fillRegistrationForm(userData) {
    await this.fillField(this.nameField, userData.name);
    await this.fillField(this.lastNameField, userData.lastName);
    await this.fillField(this.emailField, userData.email);
    await this.fillField(this.passwordField, userData.password);
    await this.fillField(this.rePasswordField, userData.password);
  }

  async submitForm() {
    const registerButton = this.page.locator('button:has-text("Register")');
    if (!(await registerButton.isEnabled())) {
      console.warn("Cannot submit form: Register button is disabled");
      return; // Просто повертаємося, якщо кнопка заблокована
    }
    await registerButton.click();
  }
  
}
