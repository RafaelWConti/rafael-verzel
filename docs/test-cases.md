# Cenários de teste

Base: documentação da entrega VZS-142, versão 2.3.0.

Os valores abaixo são os resultados esperados. A execução de 07/10/2026 está registrada em [resultados](test-results.md).

## Pela loja

### CT01 - Carrinho sem cupom
Regra: CA07 e fórmula do total.

Dado que coloquei uma mochila P005 no carrinho

Quando confiro o resumo sem aplicar cupom

Então o subtotal deve ser R$ 100,00, o desconto zero, o frete R$ 19,90 e o total R$ 119,90.

A mensagem deve informar que faltam R$ 100,00 para o frete grátis.

### CT02 - Aplicar o desconto sem descontar o frete
Regras: CA01, CA09 e CA11.

Dado que coloquei uma camiseta P001 no carrinho

Quando aplico BEMVINDO10

Então o subtotal deve ser R$ 59,90, o desconto R$ 5,99, o frete R$ 19,90 e o total R$ 73,81.

Conferir se os valores aparecem com duas casas decimais.

### CT03 - Usar maiúsculas, minúsculas e espaços no cupom
Regra: CA02.

Dado que tenho uma mochila P005 no carrinho, sem cupom

Quando aplico o código usando uma das variações abaixo

Então o desconto deve ser R$ 10,00 e o total R$ 109,90.

Testar separadamente: `bemvindo10`, `BeMvInDo10` e `  BEMVINDO10  `. Remover o cupom antes de testar a próxima variação.

### CT04 - Cupom inexistente
Regra: CA03.

Dado que tenho uma mochila P005 no carrinho, sem cupom

Quando tento aplicar NAOEXISTE123

Então devo ver “Cupom inválido.”, com desconto zero e total de R$ 119,90.

### CT05 - Cupom expirado
Regra: CA04.

Dado que tenho uma mochila P005 no carrinho, sem cupom

Quando tento aplicar VERAO2026

Então devo ver “Cupom expirado.”, com desconto zero e total de R$ 119,90.

### CT06 - Não acumular cupons
Regra: CA05.

Dado que tenho uma mochila P005 com BEMVINDO10 aplicado

Quando tento aplicar outro código sem remover o atual

Então não devo conseguir trocar nem acumular descontos; o desconto deve continuar em R$ 10,00.

Se a tela impedir uma nova aplicação, registrar esse comportamento. O enunciado não define uma mensagem obrigatória para essa situação.

### CT07 - Remover e reaplicar o cupom
Regra: CA05.

Dado que tenho uma mochila P005 com BEMVINDO10 aplicado

Quando removo o cupom

Então o desconto deve voltar a zero e o total a R$ 119,90.

Aplicar BEMVINDO10 novamente e conferir desconto de R$ 10,00 e total de R$ 109,90.

### CT08 - Ficar logo abaixo do frete grátis
Regras: CA07, CA09 e CA11.

Dado que tenho três garrafas P008 e um boné P004 no carrinho

Quando aplico BEMVINDO10

Então o subtotal deve ser R$ 199,90, o desconto R$ 19,99, o frete R$ 19,90 e o total R$ 199,81.

A mensagem deve informar que faltam R$ 0,10 para o frete grátis.

### CT09 - Atingir exatamente R$ 200,00
Regras: CA06 e CA08.

Dado que tenho duas mochilas P005 no carrinho

Quando aplico BEMVINDO10

Então o subtotal deve ser R$ 200,00, o desconto R$ 20,00, o frete zero e o total R$ 180,00.

O frete deve continuar grátis mesmo com o total abaixo de R$ 200,00 após o desconto.

### CT10 - Ficar acima de R$ 200,00
Regras: CA06 e CA08.

Dado que tenho duas mochilas P005 e uma garrafa P008 no carrinho

Quando aplico BEMVINDO10

Então o subtotal deve ser R$ 250,00, o desconto R$ 25,00, o frete zero e o total R$ 225,00.

Não deve aparecer um valor negativo de quanto falta para o frete grátis.

### CT11 - Atualizar o frete ao mudar a quantidade
Regras: CA01, CA06, CA07 e CA08.

Dado que tenho uma mochila P005 com BEMVINDO10 aplicado

Quando aumento a quantidade para duas

Então o desconto deve mudar para R$ 20,00, o frete deve ficar grátis e o total deve ser R$ 180,00.

Voltar para uma unidade e conferir desconto de R$ 10,00, frete de R$ 19,90 e total de R$ 109,90.

### CT12 - Atualizar os valores ao remover um produto
Regras: CA01 e CA07.

Dado que tenho uma mochila P005 e uma garrafa P008 com BEMVINDO10 aplicado

Quando removo a garrafa

Então devem restar uma mochila, subtotal de R$ 100,00, desconto de R$ 10,00, frete de R$ 19,90 e total de R$ 109,90.

### CT13 - Limite de cinco unidades na tela
Regra: CA10.

Dado que tenho uma mochila P005 no carrinho

Quando aumento a quantidade até cinco e tento adicionar mais uma

Então não devo conseguir ultrapassar cinco unidades do produto.

Conferir as formas disponíveis na tela, como o controle de quantidade e adicionar o mesmo produto novamente pelo catálogo.

### CT14 - Confirmar um pedido com os valores do carrinho
Regra: fechamento do pedido e cálculos da entrega.

Dado que tenho uma mochila P005 com BEMVINDO10 aplicado

Quando informo Cliente Teste, rafael.teste@example.com e CEP 01310-100 e confirmo o pedido

Então devo receber um número no formato VZ-000000, com subtotal de R$ 100,00, desconto de R$ 10,00, frete de R$ 19,90 e total de R$ 109,90.

Não é esperado e-mail, cobrança ou consulta posterior do pedido.

### CT15 - Dados do cliente
Regra: validações já existentes da loja.

Dado que tenho um produto no carrinho e estou preenchendo os dados do pedido

Quando tento confirmar com um dos dados inválidos abaixo

Então o pedido não deve ser confirmado e o campo com problema deve ser indicado.

Testar uma alteração por vez, mantendo o restante válido: nome “Cliente” sem sobrenome, e-mail “cliente@”, CEP com sete dígitos e campos vazios. Conferir também que CEP válido com e sem hífen é aceito.

## Direto na API

Usar JSON e Content-Type: application/json. Cada chamada recebe seus próprios itens; não existe carrinho salvo no servidor.

### CT16 - Conferir os cálculos
Regras: CA01, CA06 a CA09 e CA11.

Enviar POST /api/carrinho/calcular com os carrinhos dos CT02, CT08, CT09 e CT10. Esperar status 200 e os mesmos valores calculados em cada cenário. Conferir também freteGratis e valorFaltanteFreteGratis.

### CT17 - Cupom inválido e expirado no cálculo
Regras: CA03, CA04 e contrato do cálculo.

Enviar uma mochila P005 com NAOEXISTE123 e repetir com VERAO2026. Esperar 200 nas duas chamadas, desconto zero, total 119.90, cupom.aplicado false e a mensagem correspondente: “Cupom inválido.” ou “Cupom expirado.”.

### CT18 - Validar quantidade na API
Regra: CA10 e contrato de quantidade.

No cálculo, enviar P005 com quantidade 1 e depois 5: esperar 200. Enviar 6: esperar 422 e QUANTIDADE_MAXIMA_EXCEDIDA. Enviar 0 e depois 1.5: esperar 422 e QUANTIDADE_INVALIDA.

Repetir as quantidades inválidas em POST /api/pedidos, com os demais dados válidos. A confirmação também não pode aceitar esses valores.

### CT19 - Confirmar pedido pela API
Regra: contrato de pedidos.

Enviar POST /api/pedidos com os dados e itens do CT14. Esperar 201, número no formato VZ-000000, os mesmos valores do carrinho e CEP normalizado para 01310100.

### CT20 - Impedir pedido com cupom inválido ou expirado
Regra: contrato de pedidos.

Com dados válidos de cliente e uma mochila P005, enviar POST /api/pedidos com NAOEXISTE123 e repetir com VERAO2026. Esperar 422, com CUPOM_INVALIDO e CUPOM_EXPIRADO, respectivamente. Nenhum dos dois deve retornar uma confirmação de pedido.

### CT21 - Validar a lista de itens
Regra: contrato da API.

No cálculo e no pedido, testar separadamente: lista vazia, produto inexistente e P005 repetido em duas linhas. Manter os outros dados válidos. Esperar 422, com ITENS_OBRIGATORIOS, PRODUTO_NAO_ENCONTRADO e ITEM_DUPLICADO, respectivamente.

## Exploração

Depois dos cenários, vou usar o carrinho alternando aplicação e remoção de cupom, quantidade e exclusão de itens. Também vou observar carrinho vazio, mensagens e valores após atualizar a mesma aba. O que não tiver regra clara será registrado como observação ou dúvida, sem assumir que é bug.

## Caso acrescentado durante os testes

### CT22 - Calcular o frete antes do desconto
Regra: CA08.

Adicionar três garrafas P008 e uma camiseta P001 e aplicar BEMVINDO10. Esperar subtotal R$ 209,90, desconto R$ 20,99, frete grátis e total R$ 188,91. Conferir também pela API.

Esse caso verifica a regra de frete antes do desconto sem depender do limite exato de R$ 200,00.
