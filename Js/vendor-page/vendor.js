// Criando a função foreach, caso o javascript do browser seja desatualizado
if ( !Array.prototype.forEach ) {
    Array.prototype.forEach = function(fn, scope) {
        for(var i = 0, len = this.length; i < len; ++i) {
        fn.call(scope, this[i], i, this);
        }
    };
}

vendorPage = {
    
    init: function() {
        vendorPage.handleEvents();
    },

    checkFieldsRentabilityVendors: function () {

        var initialPeriod = $('#rentability-date-start');
        var finalPeriod = $('#rentability-date-final');

        var inputOrderBy = $("#rentability-orderby");
        var inputOrder = $("#rentability-order");

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

        params.ordernar_por = inputOrderBy.val();
        params.ordem = inputOrder.val();

        if(params.ordem == "asc" && $("#rentability-disregard-zero:checked").val() == "on"){
            params.desconsiderar_zero = true;
        }

        params.mode = "rentability";

        vendorPage.callHigherVendors(params);
    },

    checkFieldsInvoiceVendors: function () {

        var initialPeriod = $('#invoices-date-start');
        var finalPeriod = $('#invoices-date-final');

        var inputOrderBy = $("#invoices-orderby");
        var inputOrder = $("#invoices-order");

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

        params.ordernar_por = inputOrderBy.val();
        params.ordem = inputOrder.val();

        if(params.ordem == "asc" && $("#invoices-disregard-zero:checked").val() == "on"){
            params.desconsiderar_zero = true;
        }

        params.mode = "invoices";

        vendorPage.callHigherVendors(params);
    },

    callHigherVendors: function(params = {}) {
        
        if(params.mode == "rentability") {
            $("#rentability-ranking").addClass("loading");
            $("#rentability-ranking .box-vendor-bar").addClass("toZero");
        } else if(params.mode == "invoices") {
            $("#invoices-ranking").addClass("loading");
            $("#invoices-ranking .box-vendor-bar").addClass("toZero");
        }
        
        $.ajax({
            url: "http://localhost:8080/DashboardLejour/higher_vendors", /* URL da servlet */
            type: 'POST', /* Tipo de requisição, igual no form [Vamos usar por padrão sempre POST] */
            data: params, /* Informações que vamos mandar para a servlet no formato chave:valor */
            success: function(data) {

                if(params.mode == "rentability") {
                    $("#rentability-ranking").removeClass("loading");
                    $("#rentability-ranking .box-vendor-bar").removeClass("toZero");
                    vendorPage.drawRentabilityRanking(data);
                } else if(params.mode == "invoices") {
                    $("#invoices-ranking").removeClass("loading");
                    $("#invoices-ranking .box-vendor-bar").removeClass("toZero");
                    vendorPage.drawInvoicesVendorsRanking(data);
                }
                
                
            },
            error: function(e) {
                console.log(e);
            }
        });
    },

    drawRentabilityRanking: function(vendors){
        $("#rent-id-vendor-first").html(vendors[0] != undefined ? vendors[0].vendorId : "N/A");
        $("#rent-total-first").html(vendors[0] != undefined ? vendors[0].totalAmount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-total-vendor-first").html(vendors[0] != undefined ? vendors[0].totalVendorAmount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-profit-vendor-first").html(vendors[0] != undefined ? vendors[0].totalProfit.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-margin-vendor-first").html(vendors[0] != undefined ? vendors[0].profitMargin+"%" : "N/A");

        $("#rent-id-vendor-seccond").html(vendors[1] != undefined ? vendors[1].vendorId : "N/A");
        $("#rent-total-seccond").html(vendors[1] != undefined ? vendors[1].totalAmount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-total-vendor-seccond").html(vendors[1] != undefined ? vendors[1].totalVendorAmount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-profit-vendor-seccond").html(vendors[1] != undefined ? vendors[1].totalProfit.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-margin-vendor-seccond").html(vendors[1] != undefined ? vendors[1].profitMargin+"%" : "N/A");

        $("#rent-id-vendor-third").html(vendors[2] != undefined ? vendors[2].vendorId : "N/A");
        $("#rent-total-third").html(vendors[2] != undefined ? vendors[2].totalAmount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-total-vendor-third").html(vendors[2] != undefined ? vendors[2].totalVendorAmount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-profit-vendor-third").html(vendors[2] != undefined ? vendors[2].totalProfit.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-margin-vendor-third").html(vendors[2] != undefined ? vendors[2].profitMargin+"%" : "N/A");

        $("#rent-id-vendor-fourty").html(vendors[3] != undefined ? vendors[3].vendorId : "N/A");
        $("#rent-total-fourty").html(vendors[3] != undefined ? vendors[3].totalAmount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-total-vendor-fourty").html(vendors[3] != undefined ? vendors[3].totalVendorAmount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-profit-vendor-fourty").html(vendors[3] != undefined ? vendors[3].totalProfit.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-margin-vendor-fourty").html(vendors[3] != undefined ? vendors[3].profitMargin+"%" : "N/A");

        $("#rent-id-vendor-fifty").html(vendors[4] != undefined ? vendors[4].vendorId : "N/A");
        $("#rent-total-fifty").html(vendors[4] != undefined ? vendors[4].totalAmount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-total-vendor-fifty").html(vendors[4] != undefined ? vendors[4].totalVendorAmount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-profit-vendor-fifty").html(vendors[4] != undefined ? vendors[4].totalProfit.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) : "N/A");
        $("#rent-margin-vendor-fifty").html(vendors[4] != undefined ? vendors[4].profitMargin+"%" : "N/A");
    },

    drawInvoicesVendorsRanking: function(vendors) {
        $("#invoice-id-vendor-first").html(vendors[0] != undefined ? vendors[0].vendorId : "N/A");
        $("#invoice-accepted-vendor-first").html(vendors[0] != undefined ? vendors[0].acceptedInvoices : "N/A");
        $("#invoice-declined-vendor-first").html(vendors[0] != undefined ? vendors[0].declinedInvoices : "N/A");

        $("#invoice-id-vendor-seccond").html(vendors[1] != undefined ? vendors[1].vendorId : "N/A");
        $("#invoice-accepted-vendor-seccond").html(vendors[1] != undefined ? vendors[1].acceptedInvoices : "N/A");
        $("#invoice-declined-vendor-seccond").html(vendors[1] != undefined ? vendors[1].declinedInvoices : "N/A");

        $("#invoice-id-vendor-third").html(vendors[2] != undefined ? vendors[2].vendorId : "N/A");
        $("#invoice-accepted-vendor-third").html(vendors[2] != undefined ? vendors[2].acceptedInvoices : "N/A");
        $("#invoice-declined-vendor-third").html(vendors[2] != undefined ? vendors[2].declinedInvoices : "N/A");

        $("#invoice-id-vendor-fourty").html(vendors[3] != undefined ? vendors[3].vendorId : "N/A");
        $("#invoice-accepted-vendor-fourty").html(vendors[3] != undefined ? vendors[3].acceptedInvoices : "N/A");
        $("#invoice-declined-vendor-fourty").html(vendors[3] != undefined ? vendors[3].declinedInvoices : "N/A");

        $("#invoice-id-vendor-fifty").html(vendors[4] != undefined ? vendors[4].vendorId : "N/A");
        $("#invoice-accepted-vendor-fifty").html(vendors[4] != undefined ? vendors[4].acceptedInvoices : "N/A");
        $("#invoice-declined-vendor-fifty").html(vendors[4] != undefined ? vendors[4].declinedInvoices : "N/A");
    },

    handleEvents: function() {

        document.querySelector("#btnRentabilityVendors").addEventListener("click", function(e){
            e.preventDefault();
        });
        
        document.querySelector("#btnInvoicesVendors").addEventListener("click", function(e){
            e.preventDefault();
        });

        $("#btnRentabilityVendors").on("click", function() {
            vendorPage.checkFieldsRentabilityVendors();
        });

        $("#btnInvoicesVendors").on("click", function(){
            vendorPage.checkFieldsInvoiceVendors();
        });

        $("#rentability-order").on("change", function() {

            console.log($(this).val());

            if($(this).val() == "asc") {
                $("#rentability-disregard-zero").parents(".label-custom").attr("style","display:in-line");
            }else if($(this).val() == "desc") {
                $("#rentability-disregard-zero").parents(".label-custom").attr("style","display:none");
            }
        });

        $("#invoices-order").on("change", function() {

            console.log($(this).val());

            if($(this).val() == "asc") {
                $("#invoices-disregard-zero").parents(".label-custom").attr("style","display:in-line");
            }else if($(this).val() == "desc") {
                $("#invoices-disregard-zero").parents(".label-custom").attr("style","display:none");
            }
        });

        $("input, select").on("focus", function() {
            if($(this).parents("fieldset").hasClass("error")) {
                $(this).parents("fieldset").removeClass("error");
            }
        });

        vendorPage.callHigherVendors({mode:"rentability"});
        vendorPage.callHigherVendors({mode:"invoices", ordernar_por:"accepted_invoices", ordem:"desc"});
    }
}

vendorPage.init();


