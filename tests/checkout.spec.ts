import { test, expect } from './fixtures';

test('CT14 - Confirma pedido com os mesmos valores do carrinho', async ({ store, checkout }) => {
  await store.open();
  await store.addProduct('Mochila Urbana 20L');
  await store.cartLink.click();
  await store.applyCoupon('BEMVINDO10');
  await expect(store.total).toHaveText('R$ 109,90');
  await store.checkoutLink.click();
  await checkout.fillCustomer({ name: 'Cliente Teste', email: 'rafael.teste@example.com', postalCode: '01310-100' });
  await checkout.confirmButton.click();

  await expect(checkout.orderHeading).toBeVisible();
  await expect(checkout.subtotal).toHaveText('R$ 100,00');
  await expect(checkout.discount).toHaveText('- R$ 10,00');
  await expect(checkout.shipping).toHaveText('R$ 19,90');
  await expect(checkout.total).toHaveText('R$ 109,90');
  await expect(checkout.orderSummary).toContainText('1x Mochila Urbana 20L');
});
