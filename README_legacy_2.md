
###  SE ESTÁ NA INTERNET É PUBLICO

--- 

Esse é um exemplo de payload:

```
{
    "browser": true,
    "name": "boadica",
    "host": "https://www.boadica.com.br",
    "page": "/pesquisa/compu_notebook/precos?ClasseProdutoX=1&CodCategoriaX=2&XT=2&XE=6&XJ=5&curpage={page}",
    "content": "div.row.preco.detalhe",
    "item": {
        "name": "div.pull-left",
        "price": "div.col-md-1.preco",
        "description": "div.col-md-4.center",
        "link": "div.col-md-4.center;div.no-mobile;a"
    },
    "numberPages": 1
}
```

---

### BROWSER - SPA

O comando:

```
"browser": true,
```

significa que o programa abrirá um navegador devido a tecnologia SPA \
aguardando a pagina renderizar para depois fazer o scraping



---

### PAGINAÇÃO

O host  será concatenado com a pagina ao fazer a requisição:

```
host + page
```

se sua pagina tem o identificador de paginação adicionar a seguinte tag:

```
{page}
```

conforme o examplo:
```
"/pesquisa/compu_notebook/precos?ClasseProdutoX=1&CodCategoriaX=2&XT=2&XE=6&XJ=5&curpage={page}",
```

o parametro:

```
"numberPages": 1
```

indica o numero de loops que acontecerá para trazer os dados, \
incrementando o numero de pagina até atingir o limite do "numberPages"

---
### CONTENT

no parametro "content":

```
"content": "div.row.preco.detalhe",
```


Você deve buscar a tag da linha da lista que deseja filtar.

Inpecione o elemento, e click com o botão direito:
```
copy -> copy selector
```
Você obterá alguma coisa parecida com:
```
#ngb-nav-0-panel > div:nth-child(1)
```

Remova a variação de "loop", da seguinte forma:

```
#ngb-nav-0-panel > div
```

assim o sistema vai buscar todas as tags no mesmo padrão.

---

### ITEM

O parametro item, significa exatamente a lista de objetos jsons \
que você vai receber como resposta caso o scraping tenha tido sucesso.

Não existem limites para o numero de atributos aplicados aqui.
```
"item": {
        "name": "div.pull-left",
        "price": "div.col-md-1.preco",
        "description": "div.col-md-4.center",
        "link": "div.col-md-4.center;div.no-mobile;a"
},
```

Existe rotinas específicas para 
```
- price
- link
```
Nada a se preocupar


---

### REGRAS:

- classes CSS não tem espaço, então substituir por ponto
exemplo:

antes:
```
div.src__ProductContainer-sc-7qsif4-3 cFwTod
```

depois: (adicao do ponto no lugar do espaço)

```
div.src__ProductContainer-sc-7qsif4-3.cFwTod
```

--- 