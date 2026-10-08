import { test as base } from '@playwright/test';
import { StorePage } from './pages/store-page';
import { CheckoutPage } from './pages/checkout-page';

export const test = base.extend<{ store: StorePage; checkout: CheckoutPage }>({
  store: async ({ page }, use) => { await use(new StorePage(page)); },
  checkout: async ({ page }, use) => { await use(new CheckoutPage(page)); },
});

export { expect } from '@playwright/test';
