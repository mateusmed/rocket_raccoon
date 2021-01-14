

SE ESTÁ NA INTERNET É PUBLICO


informações importantes.
div{ponto}{className}
o {;} significa que temos um split de finds no cheerio
então, sempre que queremos uma div, dentro de uma div, usamos assim:
div.col-md-4.center;div.no-mobile;a


{page} -> pagina da URL


todo:

gerar um arquivo de download para imagens, pensar em um parametro

payload exemplo:

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