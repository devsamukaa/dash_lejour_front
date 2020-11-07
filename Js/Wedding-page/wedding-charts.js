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
                    data: [40, 60, 80, 100, 210, 50, 30, 150, 200, 170, 90, 55]
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
                    data: [40, 60, 80 ]
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