# Testes exploratórios — 08/10/2026

Testei mudanças no carrinho, cupons e finalização do pedido. Também conferi outras entradas na API.

## Resultados pela tela

| Caso | Teste | Resultado |
| --- | --- | --- |
| EXP01 | Remover o último produto com cupom e adicionar uma camiseta. | O cupom continuou aplicado. Desconto de R$ 5,99 e total de R$ 73,81. Ficou como observação. |
| EXP02 | Remover o cupom, tentar VERAO2026 e finalizar a compra. | Passou. Mostrou “Cupom expirado.” e confirmou a camiseta sem desconto, por R$ 79,80. |
| EXP03 | Confirmar com CEP abc01310100 e os outros dados válidos. | Passou. Bloqueou o pedido e mostrou “Informe um CEP com 8 dígitos.”. |
| EXP04 | Voltar do checkout, aumentar de uma para duas garrafas e remover o cupom. | Passou. O checkout atualizou de R$ 64,90 para R$ 119,90, com desconto zero. |
| EXP05 | Esvaziar o carrinho com cupom, abrir /checkout e depois adicionar uma mochila. | Passou. Impediu a compra vazia. A nova mochila ficou sem cupom, com total de R$ 119,90. |
| EXP06 | Reduzir de cinco para quatro mochilas e adicionar outra pelo catálogo. | Passou. Permitiu voltar a cinco e bloqueou o aumento. |
| EXP07 | Adicionar uma garrafa quando já havia cinco mochilas. | Passou. Aceitou os seis itens, respeitando o limite por produto. Total de R$ 550,00 e frete grátis. |
| EXP08 | Abrir o carrinho em outra aba. | Passou. A nova aba começou vazia, conforme a documentação. |
| EXP09 | Confirmar duas mochilas com BEMVINDO10. | Falhou — BUG01. Confirmou com frete de R$ 19,90 e total de R$ 199,90. O esperado era frete grátis e total de R$ 180,00. |

Sete passaram, um apresentou o BUG01 e um ficou como observação.

## Observação sobre o cupom

Remover o último produto manteve o cupom para o próximo item. Usar “Esvaziar carrinho” removeu o cupom.

A documentação não explica essa diferença. Deixei como dúvida para confirmar com o time, sem abrir outro bug.

## Resultados da API

Foram 23 chamadas: 22 passaram e uma apresentou o BUG01.

| Teste | Resultado |
| --- | --- |
| Corpo null ou array, no cálculo e no pedido | Passou. 400 com JSON_INVALIDO. |
| Itens ausentes, nos dois endpoints | Passou. 422 com ITENS_OBRIGATORIOS. |
| Item null, nos dois endpoints | Passou. 422 com ITEM_INVALIDO. |
| Quantidade -1, texto "2" ou null, nos dois endpoints | Passou. 422 com QUANTIDADE_INVALIDA. |
| Nome sem sobrenome com espaços, nome em branco ou e-mail sem domínio | Passou. 422 com DADOS_INVALIDOS. |
| CEP com letras ou nove números | Passou. 422 com DADOS_INVALIDOS. |
| Pedido com cupom usando espaços e maiúsculas misturadas | Passou. 201, desconto de R$ 5,99 e total de R$ 73,81. |
| Cinco camisetas e cinco kits de meias com cupom | Passou. Subtotal de R$ 449,00, desconto de R$ 44,90 e total de R$ 404,10. |
| Pedido de R$ 199,90 com cupom | Passou. Desconto de R$ 19,99, frete de R$ 19,90 e total de R$ 199,81. |
| Pedido de R$ 200,00 com cupom | Falhou — BUG01. Total de R$ 199,90, em vez de R$ 180,00. |

Não houve outro bug confirmado. Acrescentei ao BUG01 que o frete errado também aparece no pedido finalizado.

## Evidências

[Print do pedido](../evidence/ui/BUG01-order.png) · [Dados do pedido](../evidence/ui/BUG01-order.json) · [Resultados da API](../evidence/api/exploration-2026-10-08.json) · [Coleção Postman](../api/exploration-collection.json)
