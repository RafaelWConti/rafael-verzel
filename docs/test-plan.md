# Plano de testes

Vou conferir se o cupom e o frete seguem as regras da entrega VZS-142, versão 2.3.0, publicada em 30/09/2026.

Começaria pelo carrinho sem cupom para ter uma referência dos valores. Depois aplicaria o BEMVINDO10 e compararia subtotal, desconto, frete e total com uma conta feita à parte.

Também testaria cupons inválidos e expirados, variações de maiúsculas e espaços e a remoção do cupom. Para o frete, usaria carrinhos abaixo de R$ 200,00, exatamente nesse valor e acima dele. O desconto não pode tirar o frete grátis de uma compra que já atingiu o limite.

Na exploração, mudaria quantidades e removeria produtos depois de aplicar o cupom. Conferiria se os valores e a mensagem do frete acompanham essas mudanças. Por fim, faria um pedido fictício e verificaria se os valores da confirmação são os mesmos do carrinho.

Os maiores riscos são cobrar o total errado, aplicar um desconto indevido, cobrar frete quando deveria ser grátis e aceitar mais de cinco unidades do mesmo produto.

## API e automação

Usaria o Postman com validações em JavaScript para conferir os cálculos e os limites direto na API. Isso é importante porque bloquear uma quantidade na tela não garante que a API também bloqueie.

Depois da execução manual, começaria a automação com Playwright e TypeScript por estes cenários:

- Cupom válido em uma compra abaixo de R$ 200,00, mantendo o frete de R$ 19,90.
- Frete grátis com subtotal de exatamente R$ 200,00, mesmo com cupom.
- Cupom inválido sem desconto.
- Limite de cinco unidades pela tela.

Os testes terão sessão própria, seletores por nome acessível quando disponíveis e verificações do resultado. Vou usar Page Objects pequenos, getters e fixtures simples. Se encontrar um bug, o teste deve continuar verificando a regra correta.

## Cuidados com o ambiente

Vou usar dados fictícios. Não vou fazer testes de carga, estresse ou segurança, que estão fora do escopo.

Também não fazem parte da entrega login, cadastro, pagamento online ou consulta de pedidos. O carrinho separado por aba, a falta de estoque, de envio de e-mail e de armazenamento dos pedidos são limitações documentadas, não bugs.

No cálculo do carrinho, cupom inválido ou expirado deve retornar 200 sem desconto. Na confirmação do pedido, esses mesmos casos devem retornar 422. Vou respeitar essa diferença ao avaliar os resultados.

## Como vou registrar

Cada cenário terá o resultado da execução e a evidência correspondente. Se houver um bug, vou registrar os passos, o que aconteceu, o que deveria acontecer e o motivo da severidade e prioridade sugeridas.

Quando a documentação não explicar um comportamento, vou registrar minha interpretação. Não vou tratar uma preferência pessoal como regra do sistema.

## Observações sobre as regras

Há apenas um cupom válido documentado. Para verificar a troca, vou remover o BEMVINDO10 e aplicá-lo novamente. A troca entre dois códigos válidos diferentes fica limitada pelos dados disponíveis.

Para chegar perto do limite do frete, usarei R$ 199,90, que é possível montar com o catálogo. Não vou alterar preços para criar um subtotal de R$ 199,99.

Vou conferir valores com centavos e duas casas na tela. Um número JSON como 19.9 representa R$ 19,90 e não é um erro de formatação. Casos de arredondamento em meio centavo precisam de uma regra mais específica e de dados que permitam esse cálculo; não vou inventar um resultado para eles.

Referência: https://verzel-store.qa-test-verzel-store.workers.dev/documentacao
