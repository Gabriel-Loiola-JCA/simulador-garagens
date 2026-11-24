# Simulador de decisão de garagem

Comparativo operacional da garagem atual da Viação Cometa e da garagem UTIL, partindo da Rodoviária de Juiz de Fora. Interface em português, sem ícone no cabeçalho, com tons de cinza e mapas ampliáveis com bordas arredondadas. O recorte da interface mostra somente a área do mapa, retirando o painel lateral e a barra superior da captura fornecida.

## Abrir

Baixe o arquivo `index.html` e abra no navegador. O arquivo contém as imagens e funciona sem dependências externas. Também pode ser servido por qualquer hospedagem estática.

Para uma prévia local:

```sh
python -m http.server 8080
```

Depois abra `http://localhost:8080`.

## Usar

1. Configure as distâncias, os consumos, os custos fixos e o percurso comercial da linha.
2. Informe viagens e passageiros totais em cada dia da semana e a frequência dos acessos à garagem.
3. Defina o diesel base e altere seu percentual ou o preço simulado.
4. Compare custos diários, semanais e mensais, o impacto acumulado e o reajuste por passagem.
5. Cadastre custos adicionais e cálculos próprios. As fórmulas aceitam soma, subtração, multiplicação, divisão, porcentagem e parênteses. Resultados anteriores podem ser usados por `calc_1`, `calc_2` etc.

As distâncias iniciais são 1,7 km para a Cometa e 10,8 km para a UTIL, por trecho, conforme as imagens fornecidas. Diesel de R$ 6,20/L e consumo de 2,5 km/L são premissas demonstrativas editáveis, sem cotação externa. O botão **Carregar exemplo** preenche uma simulação ilustrativa.

## Cálculos

- O calendário mensal conta as ocorrências reais dos dias da semana.
- A programação semanal é repetida nos meses do horizonte escolhido, de 1 a 120 meses.
- O comparativo separa mudança de garagem e aumento do diesel.
- O reajuste da mudança considera a diferença recorrente, a recuperação do investimento e os percentuais de passageiros reajustáveis e receita retida.
- A tarifa de equilíbrio da linha considera todos os custos cadastrados; preencha o percurso comercial e os demais gastos para analisar a linha completa.
- O investimento inicial entra uma única vez no custo acumulado.
- Custos mensais são rateados por dias corridos nas visões diária e semanal.
- As fórmulas são interpretadas por um analisador matemático restrito, sem executar código JavaScript informado pelo usuário.

## Dados

As simulações ficam no armazenamento local do navegador, quando disponível. **Salvar simulação** e **Abrir simulação** exportam e importam JSON. O relatório pode ser exportado em CSV ou impresso. Não há envio automático de dados a um servidor.

## Verificação

Com Node.js instalado:

```sh
node tests/engine.cjs
```

O conjunto verifica calendário, custo, diesel, tarifa, rateio, investimento, horizonte, retorno, fórmulas e validação de arquivos importados.
