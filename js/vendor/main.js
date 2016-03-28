jQuery(document).ready(function($){
	var tabs = $('.cd-tabs');
	
	tabs.each(function(){
		var tab = $(this),
			tabItems = tab.find('ul.cd-tabs-navigation'),
			tabContentWrapper = tab.children('ul.cd-tabs-content'),
			tabNavigation = tab.find('nav');

		tabItems.on('click', 'a', function(event){
			event.preventDefault();
			var selectedItem = $(this);
			if( !selectedItem.hasClass('selected') ) {
				var selectedTab = selectedItem.data('content'),
					selectedContent = tabContentWrapper.find('li[data-content="'+selectedTab+'"]'),
					slectedContentHeight = selectedContent.innerHeight();
				
				tabItems.find('a.selected').removeClass('selected');
				selectedItem.addClass('selected');
				selectedContent.addClass('selected').siblings('li').removeClass('selected');
				//animate tabContentWrapper height when content changes 
				tabContentWrapper.animate({
					'height': slectedContentHeight
				}, 200);
			}
		});

		//hide the .cd-tabs::after element when tabbed navigation has scrolled to the end (mobile version)
		checkScrolling(tabNavigation);
		tabNavigation.on('scroll', function(){ 
			checkScrolling($(this));
		});
	});
	
	$(window).on('resize', function(){
		tabs.each(function(){
			var tab = $(this);
			checkScrolling(tab.find('nav'));
			tab.find('.cd-tabs-content').css('height', 'auto');
		});
	});

	function checkScrolling(tabs){
		var totalTabWidth = parseInt(tabs.children('.cd-tabs-navigation').width()),
		 	tabsViewport = parseInt(tabs.width());
		if( tabs.scrollLeft() >= totalTabWidth - tabsViewport) {
			tabs.parent('.cd-tabs').addClass('is-ended');
		} else {
			tabs.parent('.cd-tabs').removeClass('is-ended');
		}
	}
});


//---------------------------------------------------------------------------------------------------------------


banregio.api.init({
        config: {
            host: 'http://10.64.64.60:8000/',
            clientId: 'WDyWb8wRDyr2sgp7IlJtZe9vTZxBHdbzyDBmWy5N',
            clientSecret: 'IWbk5GJ93TpHrmKKBcOuyTiXtoQ4fN1dyhRjdpm86lG99alY5Wk4gaGv1mVcb96jHCsow77LApucIhisOtneoJFgvyQJiace4N7RQU8a1C7qVDE9nVwGG8Oi44S0EXHj',
            redirectUri: 'http://localhost:8090/pagos-servicios-aguaydrenajedemonterrey-configurar.html'
        },
        onLogin: function() {
            console.log('Logged in');
            fillAccountsSelect();
            //fillTargetAccountsSelect();
        },
        onLogout: function() {
            console.log('Logged out');
        }
    });

    function brgLogin() {
        banregio.api.login();
    }

    function brgLogout() {
        banregio.api.logout();
    }

    function brgTarAcc() {
        banregio.api.getTarAccUri();
    }

    function getAccounts() {
        banregio.api.getAccounts()
        .done(function(data) {
            console.log('data:')
            console.log(data)
            console.log('data.accounts:')
            console.log(data.accounts);
        })
        .fail(function() {
            console.log('Error while retrieving accounts');
        });
    }

    function addAccount(JQuery) {
        var type=$('#acc-type'), accn = $('#acc-number'), tarl = $('#tar-last'), nip=$('#nip');
        console.log(accn.val());
        console.log(tarl.val());
        banregio.api.addAccount(type.val(), accn.val(), tarl.val(), nip.val())
        .done(function(data) {
            console.log(data);
            window.account_id = data.account.id;
        })
        .fail(function(data) {
            console.log('Error while adding a new account');
            console.log(data);
        });
    }

    function getTransactions(JQuery) {
        var accid = $('#acc-id').val(), maxdate = $('#max-date').val(), mindate = $('#min-date').val();

        banregio.api.getTransactions(accid, mindate, maxdate)
        .done(function(data) {
            console.log('done');
            console.log(data);
        })
        .fail(function(data) {
            console.log('Error while loading account transactions');
            console.log(data);
        });
    }

    function getTransfers(JQuery) {
        var accid = $('#acc-id').val();
        banregio.api.getTransfers(accid)
        .done(function(data) {
            console.log('done');
            console.log(data);
        })
        .fail(function(data) {
            console.log('Error while loading account transactions');
            console.log(data);
        });
    }

    function getAccount(JQuery){
        var accid = $('#acc-id').val();
        banregio.api.getAccount(accid)
        .done(function(data) {
            console.log('done');
            console.log(data);
        })
        .fail(function(data) {
            
            console.log('Error while loading account transactions');
            console.log(data);
        });   
    }

    function getToken(JQuery){
        var taccid = $('#target-account').val(),
        amount = $('#amount').val();
        banregio.api.getTargetAccount(taccid, amount)
        .done(function(data) {
            console.log('done');
            console.log(data);
        })
        .fail(function(data) {
            
            console.log('Error while loading account transactions');
            console.log(data);
        });   
    }

    function cancelTransfer(JQuery){
        var transfer = $('#tra-id').val();
        var acctid = $('#acct-id').val();
        banregio.api.cancelTransfer(transfer, acctid)
        .done(function(data) {
            console.log('done');
            console.log(data);
        })
        .fail(function(data) {
            
            console.log('Error while loading account transactions');
            console.log(data);
        });   
    }

    function deleteTargetAccount(JQuery){
        var taccid = $('#target-account').val();
        banregio.api.deleteTargetAccount(taccid)
        .done(function(data) {
            console.log('done');
            console.log(data);
        })
        .fail(function(data) {
            
            console.log('Error while loading account transactions');
            console.log(data);
        });   
    }

    function deleteAccount(JQuery){
        var accid = $('#acc-id').val();
        banregio.api.deleteAccount(accid)
        .done(function(data) {
            console.log('done');
            console.log(data);
        })
        .fail(function(data) {
            
            console.log('Error while loading account transactions');
            console.log(data);
        });   
    }

    function postTransfer(JQuery) {
        var accountId = $('#accounts'), targetaccount = $('#target-account'), tiposolicitud = $('#request-type'), 
        cantidad = $('#amount'), concepto = $('#concept'), tipotransferencia = $('#trans-type'), 
        frecuencia = $('#frequency'), fechaprimerenvio = $('#ini-date'), tipoduracion = $('#dur-type'), 
        duraciontransferencia = $('#trans-length'), duracionfecha = $('#end-date'), diasanterioresenviomail = $('#mail-date'), 
        token = $('#token');
        //fechaprimerenvio = fechaprimerenvio.val()
        banregio.api.postTransfer(accountId.val(), targetaccount.val(), tiposolicitud.val(),
            cantidad.val(), concepto.val(), tipotransferencia.val(),
            frecuencia.val(), fechaprimerenvio.val(), tipoduracion.val(),
            duraciontransferencia.val(), duracionfecha.val(), diasanterioresenviomail.val(),
            token.val())
        .done(function(data) {
            console.log('done')
            console.log(data);
        })
        .fail(function(data) {
            console.log('Error while making transfer');
            console.log(data);
        });
    }

    function currencyFormat (num) { 
    	return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") 
    }

    function fillAccountsSelect(JQuery){       
        banregio.api.getAccounts().done(function (data) {
        	console.log('accounts:');
        	console.log(data);
        	
            for (var i = 0; i < data.accounts.length ; i++) {
                var acc_info = '$ ' + data.accounts[i].balance + ' -   ';
                acc_info += '( ' +data.accounts[i].card_number + ' )';
                acc_info += ' MXN'

                $('#accounts').append($('<option>', {
                    value: data.accounts[i].id,
                    text: acc_info
                }));
            };    
            
        });
    }

    function fillTargetAccountsSelect(JQuery){       
        banregio.api.getTargetAccounts().done(function (data) {
        	console.log('que pedo!');
            console.log(data);
            for (var i = 0; i < data.targetaccounts.length ; i++) {


                $('#target-accounts').append($('<option>', {
                    value: data.targetaccounts[i].id,
                    text: data.targetaccounts[i].cuentadestino
                }));
            };    
        });
    }

    function payService(JQuery){
    	var accounts = $('#accounts'), reference = $('#configurarNumRef'), amount = $('#configurarCantidad');
    	banregio.api.payService(accounts.val(), reference.val(), amount.val()).done(function(data){
    		console.log(data);
            mostrarComprobante(data);
    	});
    }

