import { type Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  get nameInput() { return this.page.getByLabel('Nome completo', { exact: true }); }
  get emailInput() { return this.page.getByLabel('E-mail', { exact: true }); }
  get postalCodeInput() { return this.page.getByLabel('CEP', { exact: true }); }
  get confirmButton() { return this.page.getByRole('button', { name: 'Confirmar pedido', exact: true }); }
  get orderHeading() { return this.page.getByRole('heading', { name: /^Pedido VZ-\d{6}$/ }); }
  get orderSummary() { return this.page.getByRole('region', { name: 'Itens do pedido', exact: true }); }
  get subtotal() { return this.orderSummary.locator('[data-valor="subtotal"]'); }
  get discount() { return this.orderSummary.locator('[data-valor="desconto"]'); }
  get shipping() { return this.orderSummary.locator('[data-valor="frete"]'); }
  get total() { return this.orderSummary.locator('[data-valor="total"]'); }

  async fillCustomer(customer: { name: string; email: string; postalCode: string }) {
    await this.nameInput.fill(customer.name);
    await this.emailInput.fill(customer.email);
    await this.postalCodeInput.fill(customer.postalCode);
  }
}
