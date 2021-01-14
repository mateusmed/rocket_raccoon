


let produtos = [
    {
        name: "boadica",
        host: "https://www.boadica.com.br",
        page: "/pesquisa/compu_notebook/precos?ClasseProdutoX=1&CodCategoriaX=2&XT=2&XE=6&XJ=5&curpage={page}",
        content: "div.row.preco.detalhe",
        item: {
            name: "div.pull-left",
            price: "div.col-md-1.preco",
            description: "div.col-md-4.center",
            link: "div.col-md-4.center;div.no-mobile;a"
        },
        numberPages: 1
    },
    {
        name: "boadica-busca",
        host: "https://www.boadica.com.br",
        page: "/busca-resultado?q=amd+ryzen+7",
        content: "div.row.produto",
        item: {

            name: "h3.titulo",
            price: "div.preco",
            description: "p.especificacao.block-with-text",
            link: "div.col-md-10;h3.titulo;a"
        },
        numberPages: 5
    },
    {
        name: "olx",
        page: "https://rj.olx.com.br/rio-de-janeiro-e-regiao/computadores-e-acessorios/notebook-e-netbook?o={page}&pe=800&ps=300",
        content: "li.item",
        item: {
            name: "h2.OLXad-list-title",
            price: "p.OLXad-list-price"
        },
        numberPages: 5
    },
    {
        name: "buscape",
        page: "https://www.buscape.com.br/notebook?pagina={page}",
        content: "div.inner",
        item: {
            name: "div.card--product__name.u-truncate-multiple-line",
            price: "span.price--big.bui-price__value"
        },
        numberPages: 5
    },
    {
        name: "mercadolivre",
        page: "https://informatica.mercadolivre.com.br/portateis/notebook/lenovo/thinkpad/thinkpad_Desde_{page}",
        content: "li.results-item highlighted article grid product item-info-height-195",
        item: {
            name: "span.main-title",
            price : "div.item__price"
        },
        numberPages: 5
    },

];

exports.produtos = produtos;