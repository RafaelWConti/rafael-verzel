import { type Page } from '@playwright/test';

export class StorePage {
  constructor(private readonly page: Page) {}

  get products() { return this.page.getByRole('article'); }
  get cartLink() { return this.page.getByRole('link', { name: /^Carrinho \d+ itens no carrinho$/ }); }
  get couponInput() { return this.page.getByLabel('Cupom de desconto', { exact: true }); }
  get applyCouponButton() { return this.page.getByRole('button', { name: 'Aplicar cupom', exact: true }); }
  get invalidCouponMessage() { return this.page.getByText('Cupom inválido.', { exact: true }); }
  get summary() { return this.page.getByRole('region', { name: 'Resumo do pedido', exact: true }); }
  get subtotal() { return this.summary.locator('[data-valor="subtotal"]'); }
  get discount() { return this.summary.locator('[data-valor="desconto"]'); }
  get shipping() { return this.summary.locator('[data-valor="frete"]'); }
  get total() { return this.summary.locator('[data-valor="total"]'); }
  get increaseBackpackButton() { return this.page.getByRole('button', { name: 'Aumentar quantidade de Mochila Urbana 20L', exact: true }); }
  get backpackAddButton() { return this.products.filter({ has: this.page.getByRole('heading', { name: 'Mochila Urbana 20L', exact: true }) }).getByRole('button', { name: 'Adicionar ao carrinho', exact: true }); }
  get productsLink() { return this.page.getByRole('link', { name: 'Produtos', exact: true }); }
  get checkoutLink() { return this.page.getByRole('link', { name: 'Finalizar compra', exact: true }); }

  async open() { await this.page.goto('/'); }

  async addProduct(name: string, quantity = 1) {
    const product = this.products.filter({ has: this.page.getByRole('heading', { name, exact: true }) });
    for (let count = 0; count < quantity; count++) {
      await product.getByRole('button', { name: 'Adicionar ao carrinho', exact: true }).click();
    }
  }

  async applyCoupon(code: string) {
    await this.couponInput.fill(code);
    await this.applyCouponButton.click();
  }
}
