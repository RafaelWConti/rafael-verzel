# Resultado dos testes — 07/10/2026

Verzel Store, documentação VZS-142.

Dos 22 casos, 18 passaram e 4 apresentaram falhas relacionadas ao BUG01 ou BUG02. No CT06, só foi possível testar com o único cupom válido disponível.

| Caso | Resultado | O que aconteceu |
| --- | --- | --- |
| CT01 | Passou | Mochila sem cupom: frete de R$ 19,90 e total de R$ 119,90. Faltam R$ 100,00 para frete grátis. |
| CT02 | Passou | Camiseta com cupom: desconto de R$ 5,99, frete de R$ 19,90 e total de R$ 73,81. |
| CT03 | Passou | Cupom aceito com minúsculas, maiúsculas misturadas e espaços nas pontas. Total de R$ 109,90. |
| CT04 | Passou | NAOEXISTE123 mostrou “Cupom inválido.”. Desconto zero e total de R$ 119,90. |
| CT05 | Passou | VERAO2026 mostrou “Cupom expirado.”. Desconto zero e total de R$ 119,90. |
| CT06 | Passou no caso disponível | Com cupom ativo, a tela mostra “Remover cupom” e impede outra aplicação. |
| CT07 | Passou | Remover o cupom voltou o total para R$ 119,90. Reaplicar voltou para R$ 109,90. |
| CT08 | Passou | Subtotal de R$ 199,90, desconto de R$ 19,99, frete de R$ 19,90 e total de R$ 199,81. Faltam R$ 0,10. |
| CT09 | Falhou — BUG01 | Em R$ 200,00 com cupom, cobrou frete. Total de R$ 199,90, em vez de R$ 180,00. |
| CT10 | Passou | Subtotal de R$ 250,00, desconto de R$ 25,00, frete grátis e total de R$ 225,00. |
| CT11 | Falhou — BUG01 | Aumentar para duas mochilas manteve o frete indevido. Voltar para uma recalculou corretamente para R$ 109,90. |
| CT12 | Passou | Remover a garrafa deixou uma mochila com desconto de R$ 10,00 e total de R$ 109,90. |
| CT13 | Passou | Bloqueou a sexta mochila no carrinho e no catálogo. |
| CT14 | Passou | Confirmou o pedido com os mesmos valores do carrinho: total de R$ 109,90. |
| CT15 | Passou | Bloqueou campos vazios, nome sem sobrenome, e-mail inválido e CEP curto. Aceitou CEP com e sem hífen. |
| CT16 | Falhou — BUG01 | Cálculos de R$ 59,90, R$ 199,90 e R$ 250,00 passaram. Em R$ 200,00, cobrou frete com e sem cupom. |
| CT17 | Passou | Cálculo com cupom inexistente ou expirado retornou 200, sem desconto e com a mensagem esperada. |
| CT18 | Falhou — BUG02 | Aceitou 1 e 5 unidades no cálculo. Rejeitou 0 e 1,5 nos dois endpoints, mas aceitou 6 no cálculo e no pedido. |
| CT19 | Passou | Pedido retornou 201, número no formato esperado, CEP normalizado e total de R$ 109,90. |
| CT20 | Passou | Pedido com cupom inexistente ou expirado retornou 422 com o erro esperado. |
| CT21 | Passou | Lista vazia, produto inexistente e item duplicado retornaram 422 nos dois endpoints. |
| CT22 | Passou | Subtotal de R$ 209,90 com cupom manteve o frete grátis. Total de R$ 188,91. |

Os CT01 a CT15 foram conferidos pela tela. Os CT16 a CT21 foram feitos pela API. O CT22 foi verificado na automação de interface e na API.

## Outras observações

Esvaziar o carrinho mostrou a mensagem de carrinho vazio. Recarregar a mesma aba manteve o produto e o cupom. Após confirmar o pedido, o carrinho ficou vazio.

Com R$ 200,00 sem cupom, também houve cobrança de frete: total de R$ 219,90. A troca entre dois cupons válidos diferentes não foi testada, pois só há um disponível.

## Execução automatizada

Playwright: 5 passaram e 1 falhou pelo BUG01. API: 30 chamadas passaram e 4 falharam pelos BUG01 e BUG02.

[Casos de teste](test-cases.md) · [Bugs](bugs.md) · [Evidências](evidence.md) · [Exploração de 08/10](exploratory-tests.md)
