window.onload = function() {

//------WEEDINGS / YEAR
var btnFilter = document.querySelector('#btnYear');
var yearValue = document.querySelector("#year-value");
var styleValue =  document.querySelector("#style-value");
//-------BUDGET
var initialPeriod = document.querySelector('#initial-period')
var finalPeriod = document.querySelector('#final-period')
var budget = document.querySelector('#budget');
var btnBudget = document.querySelector("#btnBudget");
var value = document.querySelector('span');

var inicio = document.querySelector('#inicio');
var final = document.querySelector('#final');
var btnStatus = document.querySelector('#btnStatus');

budget.addEventListener('input', function() {
  value.textContent = this.value;
});

//Função que valida os campos de data informados
const checkFields = () => {
    if(initialPeriod.value === "" && finalPeriod.value === ""){
        alert("Por favor, preencha todos os campos (Período Inicial e Final)!")
    }else{
        while(initialPeriod.value > finalPeriod.value){
            initialPeriod.value = "";
            finalPeriod.value = "";
            initialPeriod.style.border = "3px solid red";
            finalPeriod.style.border = "3px solid red";
        }
    }
}

const checkFields2 = () => {
    if(inicio.value === "" && final.value === ""){
        alert("Por favor, preencha todos os campos (Período Inicial e Final)!")
    } else {
        while(inicio.value > final.value) {
            inicio.value = "";
            final.value = "";
        }
    }
}


//Criando Array que irá armazenar o número de casamentos no ano de 2020
var numeroCasamentos = []

//Criando Array que irá armazendo o número de casamentos por tema
var quantidadePorTema = []

function callWeddingYear() {
        // Criando a função foreach, caso o javascript do browser seja desatualizado
        if ( !Array.prototype.forEach ) {
            Array.prototype.forEach = function(fn, scope) {
                for(var i = 0, len = this.length; i < len; ++i) {
                fn.call(scope, this[i], i, this);
                }
            };
        }

        var ano = 2020  
        var estilo = `clássico`;

        $.ajax({
			url: "https://testeshttps.herokuapp.com/weddings/", /* URL da servlet */
			type: 'POST', /* Tipo de requisição, igual no form [Vamos usar por padrão sempre POST] */
			data: { /* Informações que vamos mandar para a servlet no formato chave:valor */
                "ano" : ano,
                "estilo" : estilo
            },
			success: function(data) {
                console.log("Dados em json:");
                console.log(data);
        
				data.forEach(dadosCasamentos => {

                    //Buscando os dados da API e colocando no Array criado anteriormente.
                    numeroCasamentos.push(Number(dadosCasamentos.weddings));
                    
                });
                
			},
			error: function(e) {
				console.log(e);
			}
		});
}

//Chamando a API
callWeddingYear()

//Definindo um time de 2s para a renderização dos gráficos
setTimeout(function(){callCharts()}, 2000)


btnBudget.onclick = function(){
    checkFields();
}

function callWeddingBudget(){
     // Criando a função foreach, caso o javascript do browser seja desatualizado
     if ( !Array.prototype.forEach ) {
        Array.prototype.forEach = function(fn, scope) {
            for(var i = 0, len = this.length; i < len; ++i) {
            fn.call(scope, this[i], i, this);
            }
        };
    }

    var ano = 2020  
    var estilo = `clássico`;

    $.ajax({
        url: "https://testeshttps.herokuapp.com/weddings-budget/", /* URL da servlet */
        type: 'POST', /* Tipo de requisição, igual no form [Vamos usar por padrão sempre POST] */
        data: { /* Informações que vamos mandar para a servlet no formato chave:valor */
            "ano" : ano,
            "estilo" : estilo
        },
        success: function(data) {
            console.log("Dados em json:");
            console.log(data);

            data.forEach(element => {
                    quantidadePorTema.push(Number(element.weddings))
            });
        },
        error: function(e) {
            console.log(e);
        }
    });
}

callWeddingBudget();

function callWeddingStatus(){
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function(fn, scope) {
            for(var i = 0, len = this.length; i < len; ++i) {
                fn.call(scope, this[i], i, this);
            }
        };
    }

    var periodo_inicial = 00/00/0000;
    var periodo_final = 00/00/0000;
    var estilo = 'Clássico';

    $.ajax({
        url: "http://testeshttps.herokuapp.com/weddings-status/",
        type: 'POST',
        data: {
            "periodo_inicial" : periodo_inicial,
            "periodo_final" : periodo_final,
            "estilo" : estilo
        },
        success: function(data){
            console.log("Dados em json:");
            console.log(data);

            data.forEach(element => {
                quantidadePorTema.push(Number(element.weddings))
            });
        },
        error: function(e){
            console.log(e);
        }
    });
}

callWeddingStatus();

btnStatus.onClick = function(){
    checkFields2();
}

function callCharts(){
//--------------Weddings/ year chart indicator---------------------
var bar_year = document.getElementById('wedding-year').getContext('2d');

        var background_1 = bar_year.createLinearGradient(0, 0, 0, 300);
        background_1.addColorStop(0, '#86D0CB');
        background_1.addColorStop(1, '#84B8E2');

        var background_2 = bar_year.createLinearGradient(0, 0, 0, 600);
        background_2.addColorStop(0, '#E2645A');
        background_2.addColorStop(1, '#DB5D79');

        /* data */
        var data = {
            labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
            datasets: [
                {
                    /* data */
                    label: "Casamentos",
                    backgroundColor: [background_2, background_1, background_2, background_1, background_2, background_1, background_2, background_1, background_2, background_1, background_2, background_1],
                    //Tentei realizar um laço pra percorrer o Array, mas sem sucesso...
                    data: [numeroCasamentos[0],
                           numeroCasamentos[1],
                           numeroCasamentos[2],
                           numeroCasamentos[3],
                           numeroCasamentos[4],
                           numeroCasamentos[5],
                           numeroCasamentos[6],
                           numeroCasamentos[7],
                           numeroCasamentos[8],
                           numeroCasamentos[9],
                           numeroCasamentos[10],
                           numeroCasamentos[11]]
                }
            ]
        };

        var options = {

            legend: {
                display: false
            },
            responsive: true,
            title: {
                text: 'Casamentos durante o ano',
                display: false
            },
            scales: {
                xAxes: [
                    {
                        stacked: true,
                        ticks: {
                            
                        },
                        gridLines: {
                            display: true
                        }
                    }
                ],
                yAxes: [
                    {
                        stacked: true,
                        gridLines: {
                            display: true
                        }
                        
                    }
                ]
            }
        };

        //Instanciando gráfico
        var weddingYear = new Chart(document.getElementById("wedding-year"), 
            {
                type: 'bar',
                data: data,
                options: options
            }
        );

//--------------Wedding budget chart indicator---------------------
var bar_budget = document.getElementById('wedding-budget').getContext('2d');

        var background_1 = bar_budget.createLinearGradient(0, 0, 0, 300);
        background_1.addColorStop(0, '#86D0CB');
        background_1.addColorStop(1, '#84B8E2');

        var background_2 = bar_budget.createLinearGradient(0, 0, 0, 600);
        background_2.addColorStop(0, '#E2645A');
        background_2.addColorStop(1, '#DB5D79');

        /* data */
        var data = {
            labels: ["Clássico", "Moderno", "Rústico"],
            datasets: [
                {
                    /* data */
                    label: "Casamentos",
                    backgroundColor: [background_2, background_1, background_2],
                    data: [quantidadePorTema[0],
                           quantidadePorTema[1],
                           quantidadePorTema[2]]
                }
            ]
        };

        var options = {

            legend: {
                display: false
            },
            responsive: true,
            title: {
                text: 'Estilos de casamento',
                display: false
            },
            scales: {
                xAxes: [
                    {
                        stacked: true,
                        ticks: {
                            
                        },
                        gridLines: {
                            display: true
                        }
                    }
                ],
                yAxes: [
                    {
                        stacked: true,
                        gridLines: {
                            display: true
                        }
                        
                    }
                ]
            }
        };

        //Instanciando gráfico
        var weddingBudget = new Chart(document.getElementById("wedding-budget"), 
            {
                type: 'bar',
                data: data,
                options: options
            }
        );

//--------------Wedding status chart indicator---------------------
var pie_status = document.getElementById('wedding-status').getContext('2d');

        var background_1 = pie_status.createLinearGradient(0, 0, 0, 300);
        background_1.addColorStop(0, '#86D0CB');

        var background_2 = pie_status.createLinearGradient(0, 0, 0, 600);
        background_2.addColorStop(0, '#FFB854');

        var background_3 = pie_status.createLinearGradient(0, 0, 0, 600);
        background_3.addColorStop(0, '#84B8E2');

        var background_4 = pie_status.createLinearGradient(0, 0, 0, 600);
        background_4.addColorStop(0, '#db5d79');

        
        var data = {
            labels: ["Criado", "Em pesquisa", "Em agendamento", "Em Pagamento"],
            datasets: [
                {
                  
                    label: "Casamentos",
                    backgroundColor: [background_1, background_2, background_3, background_4],
                    data: [25, 40, 60, 100]
                }
            ]
        };

        var options = {

            legend: {
                display: true,
                position: 'right',
                align: 'stretch'
            },
            responsive: true,
            title: {
                text: 'Status dos casamentos',
                display: false
            }
        };

        //Instanciando gráfico
        var weddingStatus = new Chart(document.getElementById("wedding-status"), 
            {
                type: 'doughnut',
                data: data,
                options: options
            }
        );
}



}
