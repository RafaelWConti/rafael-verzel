import { test, expect } from './fixtures';

test.beforeEach(async ({ store }) => { await store.open(); });

test('CT02 - Aplica 10% nos produtos e mantém o frete', async ({ store }) => {
  await store.addProduct('Camiseta Essencial');
  await store.cartLink.click();
  await store.applyCoupon('BEMVINDO10');

  await expect(store.subtotal).toHaveText('R$ 59,90');
  await expect(store.discount).toHaveText('- R$ 5,99');
  await expect(store.shipping).toHaveText('R$ 19,90');
  await expect(store.total).toHaveText('R$ 73,81');
});

test('CT04 - Recusa cupom inexistente sem aplicar desconto', async ({ store }) => {
  await store.addProduct('Mochila Urbana 20L');
  await store.cartLink.click();
  await store.applyCoupon('NAOEXISTE123');

  await expect(store.invalidCouponMessage).toBeVisible();
  await expect(store.discount).toHaveText('R$ 0,00');
  await expect(store.total).toHaveText('R$ 119,90');
});

test('CT09 - Libera frete grátis ao atingir R$ 200 com cupom', async ({ store }) => {
  await store.addProduct('Mochila Urbana 20L', 2);
  await store.cartLink.click();
  await store.applyCoupon('BEMVINDO10');

  await expect(store.subtotal).toHaveText('R$ 200,00');
  await expect(store.discount).toHaveText('- R$ 20,00');
  await expect.soft(store.shipping).toHaveText('Grátis');
  await expect.soft(store.total).toHaveText('R$ 180,00');
});

test('CT13 - Impede mais de cinco unidades no carrinho e no catálogo', async ({ store }) => {
  await store.addProduct('Mochila Urbana 20L');
  await store.cartLink.click();
  for (let count = 1; count < 5; count++) { await store.increaseBackpackButton.click(); }

  await expect(store.subtotal).toHaveText('R$ 500,00');
  await expect(store.increaseBackpackButton).toBeDisabled();
  await store.productsLink.click();
  await expect(store.backpackAddButton).toBeDisabled();
});

test('CT22 - Mantém frete grátis quando o desconto reduz o valor abaixo de R$ 200', async ({ store }) => {
  await store.addProduct('Garrafa Térmica 750ml', 3);
  await store.addProduct('Camiseta Essencial');
  await store.cartLink.click();
  await store.applyCoupon('BEMVINDO10');

  await expect(store.subtotal).toHaveText('R$ 209,90');
  await expect(store.discount).toHaveText('- R$ 20,99');
  await expect(store.shipping).toHaveText('Grátis');
  await expect(store.total).toHaveText('R$ 188,91');
});
