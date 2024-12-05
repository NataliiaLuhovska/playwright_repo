import { test, expect } from "@playwright/test";
import { RegistrationPage } from "/Users/n.luhovska/automation/playwright_repo/pageObjects/ RegistrationPage.js";

test.describe("Registration Tests", () => {
  let registrationPage;

  test.beforeEach(async ({ browser }) => {
    // Створення нового контексту з HTTP-креденшалами
    const context = await browser.newContext({
      httpCredentials: {
        username: "guest",
        password: "welcome2qauto",
      },
    });

    // Створення нової сторінки та ініціалізація RegistrationPage
    const page = await context.newPage();
    registrationPage = new RegistrationPage(page);

    // Навігація на сайт
    await registrationPage.navigate("https://qauto.forstudy.space/");
  });

  test("User can register successfully", async () => {
    // Відкриття форми реєстрації
    await registrationPage.openSignUpForm();

    // Заповнення форми
    const userData = {
      name: "Test",
      lastName: "User",
      email: `aqa-${Date.now()}@test.com`, // Динамічний email з унікальним префіксом
      password: "Password123",
    };
    await registrationPage.fillRegistrationForm(userData);

    // Надсилання форми
    await registrationPage.submitForm();

    // Перевірка, чи юзер перенаправлений на панель
    await expect(registrationPage.page).toHaveURL(
      "https://qauto.forstudy.space/panel/garage"
    );
  });

  test("User cannot register with invalid email", async () => {
    // Відкриття форми реєстрації
    await registrationPage.openSignUpForm();
  
    // Заповнення форми з правильними даними, крім email
    const invalidUserData = {
      name: "John", 
      lastName: "Doe", 
      email: "invalid-email", // Некоректний формат email
      password: "Password123", 
    };
    await registrationPage.fillRegistrationForm(invalidUserData);
  
    // Надсилання форми
    await registrationPage.submitForm();
  
    // Перевірка для поля "Email"
    const emailError = registrationPage.page.locator('div.invalid-feedback p');
    await expect(emailError).toHaveText("Email is incorrect");
  
    // Перевірка, що кнопка "Register" залишається заблокованою
    const registerButton = registrationPage.page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  });

  test("User cannot register with invalid password", async () => {
    // Відкриття форми реєстрації
    await registrationPage.openSignUpForm();
  
    // Заповнення форми з правильними даними, крім password
    const invalidUserData = {
      name: "John", 
      lastName: "Doe", 
      email: `aqa-${Date.now()}@test.com`, 
      password: "wrongpass", // Неправильний пароль
    };
    await registrationPage.fillRegistrationForm(invalidUserData);
  
    // Надсилання форми
    await registrationPage.submitForm();
  
    // Перевірка для поля "Password"
    const passwordError = registrationPage.page.locator('input#signupPassword ~ div.invalid-feedback p');
    await expect(passwordError).toHaveText(
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    );

    // Перевірка, що кнопка "Register" залишається заблокованою
    const registerButton = registrationPage.page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  });

  test("User cannot register with invalid name", async () => {
    // Відкриття форми реєстрації
    await registrationPage.openSignUpForm();
  
    // Заповнення форми з правильними даними, крім name
    const invalidUserData = {
      name: "John Doe", // НЕправильне ім'я
      lastName: "Doe", 
      email: `aqa-${Date.now()}@test.com`, 
      password: "Password123",
    };
    await registrationPage.fillRegistrationForm(invalidUserData);
  
    // Надсилання форми
    await registrationPage.submitForm();
  
    // Перевірка для поля "Name"
    const nameError = registrationPage.page.locator('input#signupName ~ div.invalid-feedback p');
    await expect(nameError).toHaveText(
      "Name is invalid"
    );

    // Перевірка, що кнопка "Register" залишається заблокованою
    const registerButton = registrationPage.page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  });

  test("User cannot register with invalid Last name", async () => {
    // Відкриття форми реєстрації
    await registrationPage.openSignUpForm();
  
    // Заповнення форми з правильними даними, крім Last name
    const invalidUserData = {
      name: "John", 
      lastName: "dfs fd", // Неправильне прізвище
      email: `aqa-${Date.now()}@test.com`, 
      password: "Password123", 
    };
    await registrationPage.fillRegistrationForm(invalidUserData);
  
    // Надсилання форми
    await registrationPage.submitForm();
  
    // Перевірка для поля "Name"
    const lastNameError = registrationPage.page.locator('input#signupLastName ~ div.invalid-feedback p');
    await expect(lastNameError).toHaveText(
      "Last name is invalid"
    );

    // Перевірка, що кнопка "Register" залишається заблокованою
    const registerButton = registrationPage.page.locator('button:has-text("Register")');
    await expect(registerButton).toBeDisabled();
  });
  
});
