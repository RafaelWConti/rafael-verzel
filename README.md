# Teste técnico QA Júnior — Verzel

Testes de cupom e frete grátis da [Verzel Store](https://verzel-store.qa-test-verzel-store.workers.dev/), com base na [documentação VZS-142](https://verzel-store.qa-test-verzel-store.workers.dev/documentacao).

## Resultado

Execução em 07/10/2026. Foram encontrados dois bugs: cobrança de frete com subtotal de exatamente R$ 200,00 e aceitação de seis unidades pela API.

Playwright: 5 testes passaram e 1 falhou. API: 30 chamadas passaram e 4 falharam. As falhas estão explicadas em [bugs](docs/bugs.md).

Em 08/10/2026, aprofundei a exploração com nove verificações pela tela e 23 chamadas adicionais à API. Não houve outro bug confirmado. O BUG01 também apareceu na confirmação do pedido. Os detalhes estão em [exploração adicional](docs/exploratory-tests.md).

## Documentos

- [Plano de testes](docs/test-plan.md)
- [Cenários](docs/test-cases.md)
- [Resultados por cenário](docs/test-results.md)
- [Exploração adicional de 08/10](docs/exploratory-tests.md)
- [Bugs e passos para reproduzir](docs/bugs.md)
- [Evidências](docs/evidence.md)

## Rodar os testes

Requisitos: Node.js 22 ou superior, npm e acesso à internet. Dentro da pasta do projeto:

```sh
npm ci
npx playwright install chromium
npm run typecheck
npm test
```

Para acompanhar a execução com o navegador aberto, usar `npm run test:headed`. Para abrir o relatório HTML, usar `npm run report`.

O CT09 deve falhar enquanto o BUG01 existir. Ele compara o frete e o total com a regra documentada. Cada teste começa com uma sessão própria e um carrinho vazio.

Os testes estão em `tests`. Os Page Objects ficam em `tests/pages` e as fixtures em `tests/fixtures.ts`. Os seletores usam nomes acessíveis; os valores do resumo usam o atributo `data-valor` que a página fornece.

## API com Postman

Importar [api/collection.json](api/collection.json) no Postman e executar a coleção. A variável `baseUrl` já aponta para a API do desafio. As validações são em JavaScript.

Para executar a mesma coleção pelo terminal:

```sh
npm run test:api
```

O comando gera `evidence/api/latest-run.json` e retorna falha enquanto houver asserções reprovadas. Os relatórios de 07/10/2026 estão preservados em `evidence`.

Todos os pedidos usam dados fictícios no ambiente do desafio.

A coleção adicional de 08/10 está em [api/exploration-collection.json](api/exploration-collection.json). Pode ser importada no Postman ou executada com `npx newman run api/exploration-collection.json`. Ela contém 23 chamadas e mantém a validação do frete correto no pedido.

## Apoio de IA

O Codex foi usado para ajudar no planejamento, escrever e revisar os arquivos, executar os testes e organizar as evidências. Os resultados registrados vieram das execuções na loja e na API.
