// Оголошення класу 
export default class BasePage {
  constructor(page, context) {
    this.page = page;
    this.context = context;
  }

  // Метод для навігації на сторінку:
  async navigate(url) {
    await this.page.goto(url);
  }

  // Метод для перевірки видимості елемента:
  async isElementVisible(selector) {
    if (typeof selector === 'string') {
      return await this.page.isVisible(selector);
    } else if (selector && typeof selector.isVisible === 'function') {
      return await selector.isVisible();
    } else {
      throw new Error(`Invalid selector: expected a string or locator, but got ${typeof selector}`);
    }
  }

  // Метод для очікування елемента:
  async waitForElement(selector) {
    if (typeof selector === 'string') {
      await this.page.waitForSelector(selector);
    } else if (selector && typeof selector.waitFor === 'function') {
      await selector.waitFor();
    } else {
      throw new Error(`Invalid selector: expected a string or locator, but got ${typeof selector}`);
    }
  }

  // Метод для натискання на елемент:
  async clickElement(selector) {
    if (typeof selector === "string") {
      const element = this.page.locator(selector);
      if (!(await element.isEnabled())) {
        throw new Error(`Cannot click on disabled element: ${selector}`);
      }
      await element.click();
    } else if (selector && typeof selector.click === "function") {
      if (!(await selector.isEnabled())) {
        throw new Error("Cannot click on disabled element");
      }
      await selector.click();
    } else {
      throw new Error(`Invalid selector: expected a string or locator, but got ${typeof selector}`);
    }
  }

  // Метод для заповнення поля вводу:
  async fillField(selector, value) {
    if (typeof selector === 'string') {
      await this.page.fill(selector, value);
    } else if (selector && typeof selector.fill === 'function') {
      await selector.fill(value);
    } else {
      throw new Error(`Invalid selector: expected a string or locator, but got ${typeof selector}`);
    }
  }

}
