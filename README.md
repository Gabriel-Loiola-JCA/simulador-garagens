# Custo de KM ocioso

Comparativo enxuto para apresentar o custo adicional da mudança da garagem Cometa para a UTIL, partindo da Rodoviária de Juiz de Fora.

## Abrir

Baixe `index.html` e abra no navegador. As imagens estão incorporadas; não há dependências externas.

## Informar

- Distâncias por trecho: inicialmente 1,7 km (Cometa) e 10,8 km (UTIL), conforme imagens fornecidas.
- Viagens por dia e frequência dos acessos à garagem.
- Custo por KM ocioso em R$/km.
- Dias de operação por semana e mês e meses por ano.
- Opcionalmente, passageiros pagantes por dia, tarifa média e margem disponível por passagem.

O painel mostra custo atual, custo UTIL e diferença no dia, semana, mês e horizonte de 1, 2, 3, 5 ou 10 anos. As projeções multiplicam um dia padrão pelos períodos informados, sem inflação automática. Os dias informados são premissas editáveis; não há calendário de viagens individuais.

A seção opcional de diesel estima **somente combustível** por quilômetro: preço por litro × (1 + variação percentual) ÷ km/L. Preço de R$ 6,20 e consumo de 2,5 km/L são exemplos, sem cotação externa.

## Cálculos

KM ocioso/dia = distância por trecho × acessos à garagem.

Custo/dia = KM ocioso/dia × R$/km. Semana = dia × dias/semana. Mês = dia × dias/mês. Ano = mês × meses/ano.

Adicional por passageiro = diferença diária de custo ÷ passageiros pagantes/dia. O percentual sobre a tarifa mostra o peso do adicional. A avaliação de capacidade de absorção usa a margem informada após os custos atuais da linha; a tarifa, sozinha, não indica lucro disponível.

São considerados apenas custos incluídos no valor/km informado. Não são incluídos percurso comercial nem investimento da mudança. O aumento estimado é arredondado para cima no centavo e cobre apenas o adicional calculado.

## Interface e dados

Interface em cinza, sem ícone no cabeçalho, com impressão e modo claro. Os dois mapas ficam no topo. Logo abaixo de cada imagem, aparecem a distância editável e os cálculos de KM ocioso e custo por dia, semana, mês e anos. Os mapas podem ser ampliados, sem os painéis das capturas e com bordas arredondadas. Dados são salvos somente no navegador quando disponível. Não há envio automático de simulações a um servidor.

## Verificação

```sh
node tests/engine.cjs
```

Os testes cobrem quilometragem, custos, projeções, frequência dos acessos, diesel, passagem, margem e validação das premissas.
