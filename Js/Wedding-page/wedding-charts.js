// Criando a função foreach, caso o javascript do browser seja desatualizado
if ( !Array.prototype.forEach ) {
    Array.prototype.forEach = function(fn, scope) {
        for(var i = 0, len = this.length; i < len; ++i) {
        fn.call(scope, this[i], i, this);
        }
    };
}

casamentosPage = {
    
    init: function() {
        casamentosPage.handleEvents();
    },

    checkFieldsWeddingYearChart: function () {

        var inputAno = $("#year-value");
        var inputEstilo = $("#style-weddings-year");
        var checkShowWithoutDate = $("#mostrar-sem-data:checked").val();

        var params = {};

        if(inputAno.val() != "todos") {
            params.ano = inputAno.val();
        }

        if(inputEstilo.val() != "todos") {
            params.estilo = inputEstilo.val();
        }

        if(checkShowWithoutDate == "on") {
            params.sem_data = true;
        }

        casamentosPage.callWeddingYear(params);
    },

    checkFieldsBudgetChart: function () {

        var initialPeriod = $('#initial-period');
        var finalPeriod = $('#final-period');
        var inputBudget = $("#budget");

        var params = {};

        if(initialPeriod.val() != "" || finalPeriod.val() != ""){
            
            if(initialPeriod.val() === "" || finalPeriod.val() === "") {
                alert("Por favor, preencha as duas datas");
                if(initialPeriod.val() === ""){
                    initialPeriod.parents("fieldset").addClass("error");
                }
                if(finalPeriod.val() === ""){
                    finalPeriod.parents("fieldset").addClass("error");
                }
                return;
            } else if(initialPeriod.val() > finalPeriod.val()) {
                alert("Data inicial maior que a data final");
                initialPeriod.parents("fieldset").addClass("error");
                finalPeriod.parents("fieldset").addClass("error");
                return;
            }

            if(initialPeriod.val() != "" && finalPeriod.val() != "") {
                params.data_de = initialPeriod.val();
                params.data_ate = finalPeriod.val();
            }

        }

        params.budget = inputBudget.val();

        casamentosPage.callWeddingBudget(params);
    },

    checkFieldsStatusChart: function () {

        var inicio = $('#inicio');
        var final = $('#final');
        var styleStatus = $("#style-status");

        var params = {};

        if(inicio.val() != "" || final.val() != ""){
            
            if(inicio.val() === "" || final.val() === "") {
                alert("Por favor, preencha as duas datas");
                if(inicio.val() === ""){
                    inicio.parents("fieldset").addClass("error");
                }
                if(final.val() === ""){
                    final.parents("fieldset").addClass("error");
                }
                return;
            } else if(inicio.val() > final.val()) {
                alert("Data inicial maior que a data final");
                inicio.parents("fieldset").addClass("error");
                final.parents("fieldset").addClass("error");
                return;
            }

            if(inicio.val() != "" && final.val() != "") {
                params.data_de = inicio.val();
                params.data_ate = final.val();
            }

        }

        if(styleStatus.val() != "todos") {
            params.estilo = styleStatus.val();
        }

        casamentosPage.callWeddingStatus(params);
    },

    callWeddingYear: function(params = {}, firstTime = false) {

        var numeroCasamentos = [];
        var labels = [];
    
        $("#weddings-during-year").addClass("loading");
    
        $.ajax({
            url: "http://localhost:8080/DashboardLejour/weddings_during_year", /* URL da servlet */
            type: 'POST', /* Tipo de requisição, igual no form [Vamos usar por padrão sempre POST] */
            data: params, /* Informações que vamos mandar para a servlet no formato chave:valor */
            success: function(data) {
        
                data.forEach(dadosCasamentos => {
    
                    //Buscando os dados da API e colocando no Array criado anteriormente.
                    
                    if(params.hasOwnProperty("sem_data")){
                        labels.push(String(dadosCasamentos.month));
                        numeroCasamentos.push(Number(dadosCasamentos.weddings));
                    }else{
                        if(dadosCasamentos.month != "s_data") {
                            labels.push(String(dadosCasamentos.month));
                            numeroCasamentos.push(Number(dadosCasamentos.weddings));
                        }
                    }
                    
                });
    
                $("#weddings-during-year").removeClass("loading");

                if(firstTime){
                    casamentosPage.drawWeddingsYearChart(labels, numeroCasamentos, firstTime);
                }else {
                    casamentosPage.drawWeddingsYearChart(labels, numeroCasamentos);
                }
                
                
            },
            error: function(e) {
                console.log(e);
            }
        });
    },

    callWeddingBudget: function(params = {}, firstTime = false){

        var labels = [];
        var quantidadePorTema = [];

        $("#budget-chart").addClass("loading");

        $.ajax({
            url: "http://localhost:8080/DashboardLejour/higher_budget_weddings", /* URL da servlet */
            type: 'POST', /* Tipo de requisição, igual no form [Vamos usar por padrão sempre POST] */
            data: params, /* Informações que vamos mandar para a servlet no formato chave:valor */
            success: function(data) {

                data.forEach(element => {
                    labels.push(String(element.weddingType));
                    quantidadePorTema.push(Number(element.weddings))
                });

                $("#budget-chart").removeClass("loading");

                if(firstTime){
                    casamentosPage.drawBudgetWeddingsChart(labels, quantidadePorTema, firstTime);
                }else {
                    casamentosPage.drawBudgetWeddingsChart(labels, quantidadePorTema);
                }

                
            },
            error: function(e) {
                console.log(e);
            }
        });
    },

    callWeddingStatus: function(params = {}, firstTime = false){

        var labels = [];
        var quantidadePorStatus = [];

        $("#status-wedding-chart").addClass("loading");
    
        $.ajax({
            url: "http://localhost:8080/DashboardLejour/wedding_status",
            type: 'POST',
            data: params,
            success: function(data){
    
                data.forEach(element => {
                    labels.push(String(element.status));
                    quantidadePorStatus.push(Number(element.weddings))
                });

                $("#status-wedding-chart").removeClass("loading");

                if(firstTime){
                    casamentosPage.drawPieWeddingStatusChart(labels, quantidadePorStatus, firstTime);
                }else {
                    casamentosPage.drawPieWeddingStatusChart(labels, quantidadePorStatus);
                }
            },
            error: function(e){
                console.log(e);
            }
        });
    },

    drawWeddingsYearChart: function(labels, numeroCasamentos, firstTime = false){

        var bar_year = document.getElementById('wedding-year').getContext('2d');
    
        var background_1 = bar_year.createLinearGradient(0, 0, 0, 300);
        background_1.addColorStop(0, '#86D0CB');
        background_1.addColorStop(1, '#84B8E2');
    
        var background_2 = bar_year.createLinearGradient(0, 0, 0, 600);
        background_2.addColorStop(0, '#E2645A');
        background_2.addColorStop(1, '#DB5D79');
    
        /* data */
        var dados = {
            labels: labels,
            datasets: [
                {
                    /* data */
                    label: "Casamentos",
                    scaleOverride: true,
                    backgroundColor: [background_2, background_1, background_2, background_1, background_2, background_1, background_2, background_1, background_2, background_1, background_2, background_1],
                    //Tentei realizar um laço pra percorrer o Array, mas sem sucesso...
                    data: numeroCasamentos
                            
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
            maintainAspectRatio: false,
            scales: {
                xAxes: [
                    {
                        stacked: false,
                        ticks: {
                            
                        },
                        gridLines: {
                            display: true
                        }
                    }
                ],
                yAxes: [
                    {
                        stacked: false,
                        gridLines: {
                            display: true
                        }
                        
                    }
                ]
            }
        };
    
        //Instanciando gráfico

        if(firstTime) {

            casamentosPage.weddingYearChart = new Chart(document.getElementById("wedding-year"), 
                {
                    type: 'bar',
                    data: dados,
                    options: options
                }
            );

            
        }else{
            
            casamentosPage.weddingYearChart.data.labels = dados.labels;
            casamentosPage.weddingYearChart.data.datasets[0].data = dados.datasets[0].data;
            casamentosPage.weddingYearChart.update();
            
        }

    },

    drawBudgetWeddingsChart: function(labels, quantidadePorTema, firstTime = false) {
        //--------------Wedding budget chart indicator---------------------
        var bar_budget = document.getElementById('wedding-budget').getContext('2d');

        var background_1 = bar_budget.createLinearGradient(0, 0, 0, 300);
        background_1.addColorStop(0, '#86D0CB');
        background_1.addColorStop(1, '#84B8E2');

        var background_2 = bar_budget.createLinearGradient(0, 0, 0, 600);
        background_2.addColorStop(0, '#E2645A');
        background_2.addColorStop(1, '#DB5D79');

        /* data */
        var dados = {
            labels: labels,
            datasets: [
                {
                    /* data */
                    label: "Casamentos",
                    backgroundColor: [background_2, background_1, background_2],
                    data: quantidadePorTema
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
            maintainAspectRatio: false,
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

        if(firstTime) {

            casamentosPage.weddingBudgetChart = new Chart(document.getElementById("wedding-budget"), 
                {
                    type: 'bar',
                    data: dados,
                    options: options
                }
            );

        }else{
            
            casamentosPage.weddingBudgetChart.data.labels = dados.labels;
            casamentosPage.weddingBudgetChart.data.datasets[0].data = dados.datasets[0].data;
            casamentosPage.weddingBudgetChart.update();
            
        }
    },

    drawPieWeddingStatusChart: function(labels, quantidadePorStatus, firstTime = false) {
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

        
        var dados = {
            labels: labels,
            datasets: [
                {
                    
                    label: "Casamentos",
                    backgroundColor: [background_1, background_2, background_3, background_4],
                    data: quantidadePorStatus
                }
            ]
        };

        var options = {

            legend: {
                display: true,
                position: 'right',
                align: 'stretch'
            },
            maintainAspectRatio: false,
            responsive: true,
            title: {
                text: 'Status dos casamentos',
                display: false
            }
        };

        //Instanciando gráfico

        if(firstTime) {

            casamentosPage.weddingStatusChart = new Chart(document.getElementById("wedding-status"), 
            {
                type: 'doughnut',
                data: dados,
                options: options
            }
        );

        }else{
            
            casamentosPage.weddingStatusChart.data.labels = dados.labels;
            casamentosPage.weddingStatusChart.data.datasets[0].data = dados.datasets[0].data;
            casamentosPage.weddingStatusChart.update();
            
        }
    },

    handleEvents: function() {

        document.querySelector("#btnYear").addEventListener("click", function(e){
            e.preventDefault();
        });
        
        document.querySelector("#btnBudget").addEventListener("click", function(e){
            e.preventDefault();
        });
        
        document.querySelector("#btnStatus").addEventListener("click", function(e){
            e.preventDefault();
        });

        $("#btnYear").on("click", function() {
            casamentosPage.checkFieldsWeddingYearChart();
        });

        $("#btnBudget").on("click", function(){
            casamentosPage.checkFieldsBudgetChart();
        });

        $("#btnStatus").on("click", function() {
            casamentosPage.checkFieldsStatusChart();
        });

        $("input, select").on("focus", function() {
            if($(this).parents("fieldset").hasClass("error")) {
                $(this).parents("fieldset").removeClass("error");
            }
        });

        var budget = document.querySelector('#budget');
        var value = document.querySelector('span');
        budget.addEventListener('input', function() {
            value.textContent = this.value;
        });

        casamentosPage.callWeddingYear({}, true);
        casamentosPage.callWeddingBudget({budget:100000}, true);
        casamentosPage.callWeddingStatus({}, true);
    }
}

casamentosPage.init();


