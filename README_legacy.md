

SE ESTÁ NA INTERNET É PUBLICO

informações importantes.

```
div{ponto}{className}
o {;} significa que temos um split de finds no cheerio
então, sempre que queremos uma div, dentro de uma div, usamos assim:
div.col-md-4.center;div.no-mobile;a
```


{page} -> pagina da URL


todo:
```
Gerar um arquivo de download para imagens, pensar em um parametro
```

payload exemplo:

```
{
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


classe não tem espaço, então substituir por ponto

```
{
    "name": "americanas",
    "host": "https://www.americanas.com.br/",
    "page": "",
    "content": "div.src__ProductContainer-sc-7qsif4-3.cFwTod",
    "item": {
        "name": "span.src__Text-sc-154pg0p-0.product__ProductName-vep9u6-9.iryANd"
    },
    "numberPages": 1
}
```

---

ESTUDO

==> entender melhor a mecanica de busca para melhorar os inputs do payload

```
$('.apple', '#fruits').text();
//=> Apple

$('ul .pear').attr('class');
//=> pear

$('li[class=orange]').html();
//=> Orange   


li[class=orange]

"content": "table[height=\"4298\"] tbody",

```


continuar testando para diferentes tipos de inputs

    

IMPORTANTE --> O CONTENT DEVE SER O A REFERENCIA PRO CARD DO ITEM
EXEMPLO:

<div id="lista">
    <div id="card">
        attr1
        attr2
    </div>

    <div id="card2">
        attr1
        attr2
    </div> ...
</div>


- Não funciona com sites SPA(angular,react )
  por isso iniciei a abertura de um navegador, 
  usando puppeteer.


```
    {
        "browser": true,
        "name": "motoclub",
        "host": "https://www.revistamotoclubes.com.br/",
        "page": "/Motoclubes/Motoclubes_rj.htm",
        "content": "td[height=\"18\"]",
        "item": {
            "name": "td a"
        },
        "numberPages": 1
    }
```


input example: OLX

```
    {
        "name": "olx",
        "host": "https://rj.olx.com.br",
        "page": "/rio-de-janeiro-e-regiao/computadores-e-acessorios?q=gforce",
        "content": "li.sc-1fcmfeb-2.juiJqh",
        "item": {
            "name": "h2.sc-1iuc9a2-1.daMDOK.sc-ifAKCX.eKQLlb",
            "price": "div.sc-hmzhuo.sc-1iuc9a2-7.CYgas.sc-jTzLTM.iwtnNi",
            "link": "a"
        },
        "numberPages": 1
    }
```

```
curl --location --request POST 'http://localhost:3090/test' \
--header 'Content-Type: application/json' \
--data-raw ' {
        "name": "olx_RJ - RX",
        "host": "https://rj.olx.com.br",
        "page": "/computadores-e-acessorios/pecas-e-acessorios?q=RX",
        "content": "li.sc-1fcmfeb-2.dvcyfD",
        "item": {
            "name": "h2.kgl1mq-0.eFXRHn.sc-ifAKCX.iUMNkO",
            "price": "div.sc-1kn4z61-1.dGMPPn",
            "link": "a"
        },
        "numberPages": 1
    }'
```
