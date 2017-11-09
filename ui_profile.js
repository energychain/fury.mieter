if(!$('#steuern').exists()) {
		
	window.localStorage.setItem("address_"+"0xE7159EA1d72625c53749e19C3fB9093d2Dea2a53".toLowerCase(),"Mieter: Musterfamilie");
	window.localStorage.setItem("address_"+"0x666C7b36432A977320792C4B198B283Ae21c0048".toLowerCase(),"Mieter: 1P Haushalt");
	window.localStorage.setItem("address_"+"0x5EC43eE47affb1E0D7705D675E7F451Da26Ea08c".toLowerCase(),"eMobil");
	window.localStorage.setItem("address_"+"0x3a6259CD89AFbA086DC09676310F29f15FB67aCc".toLowerCase(),"Stromspeicher");
	window.localStorage.setItem("address_"+"0x164c9ee802256820b44668A2F1665F67E36531d2".toLowerCase(),"Photovoltaik");
	window.localStorage.setItem("address_"+"0x0b00dD24e5EAB94B590EeD4B1CC0634a648290C3".toLowerCase(),"Sekundär EE Vermarktung");
	window.localStorage.setItem("address_"+"0x3Dfb31fF5111B98947B8f527f387cbC0637e66E1".toLowerCase(),"Speicherladung");
	
			var html="<hr/><h4><a href='#' id='steuern'>Steuern, Abgaben und Umlagen <span id='tkl_steuern'>&raquo;</span></a></h4>";
			html+="<table class='table' style='display:none' id='tbl_energy'>";
			html+="<tr><td>EEG Umlage</td><td><span class='based-kwh'></span></td><td style='text-align:right' id='eeg'></td></tr>";			
			html+="<tr><td>Umsatzsteuer</td><td><span class='based-eur'></span></td><td style='text-align:right' id='ust'></td></tr>";			
			html+="<tr><td>Konzessionsabgabe</td><td><span class='based-kwh'></span></td><td style='text-align:right' id='konz'></td></tr>";	
			html+="<tr><td>KWK Umlage</td><td><span class='based-kwh'></span></td><td style='text-align:right' id='kwk'></td></tr>";	
			html+="<tr><td>Strom NEV §19</td><td><span class='based-kwh'></span></td><td style='text-align:right' id='stromnev'></td></tr>";	
			html+="</table>";			
			$('#add_energie').html(html);
			
			var html="<hr/><h4><a href='#' id='steuern_infra'>Steuern, Abgaben und Umlagen <span id='tkl_infra'>&raquo;</span></a></h4>";
			html+="<table class='table' style='display:none' id='tbl_infra'>";		
			html+="<tr><td>EEG Umlage (Gutschrift)</td><td><span class='infra-kwh'></span></td><td style='text-align:right' id='eeg_infra'></td></tr>";	
			html+="<tr><td>Umsatzsteuer</td><td><span class='infra-eur'></span></td><td style='text-align:right' id='ust_infra'></td></tr>";		
			html+="<tr><td>Konzessionsabgabe (Gutschrift)</td><td><span class='infra-kwh'></span></td><td style='text-align:right' id='konz_infra'></td></tr>";			
			html+="<tr><td>KWK Umlage (Gutschrift)</td><td><span class='infra-kwh'></span></td><td style='text-align:right' id='kwk_infra'></td></tr>";	
			html+="<tr><td>Strom NEV §19 (Gutschrift)</td><td><span class='infra-kwh'></span></td><td style='text-align:right' id='stromnev_infra'></td></tr>";	
			html+="</table>";			
			$('#add_infra').html(html);
			
			$('#steuern').click(function() {
					invest_calc();
					$('#tbl_energy').toggle();	
					$('#tkl_steuern').toggle();		
			});
			$('#steuern_infra').click(function() {
					invest_calc();
					$('#tbl_infra').toggle();			
					$('#tkl_infra').toggle();
			});
			$('#initial_header').html("<h4>Anschluss</h4>Max Mustermann<br/>Gerhard Weiser Ring 29<br/>69256 Mauer");
		}
		var invest_calc_old=invest_calc;
		var invest_calc=function() {
				var eeg=$('#balance').attr('data-base')*679.2;
				$('#eeg').html((eeg/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				var konz=$('#balance').attr('data-base')*132;
				$('#konz').html((konz/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				var kwk=$('#balance').attr('data-base')*46.3;
				$('#kwk').html((kwk/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				var stromnev=$('#balance').attr('data-base')*38.8;
				$('#stromnev').html((stromnev/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				invest_calc_old();
				var ust=($('#balance').attr('data')/1.19)*0.19;
				$('#ust').html((ust/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				
				var ust=($('#infra_saldo').attr('data')/1.19)*0.19;
				$('#ust_infra').html((ust/-10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				
				$('.based-kwh').html("für "+($('#balance').attr('data-base')/-1000).toLocaleString(undefined, { minimumFractionDigits:3, maximumFractionDigits:3 })+" KWh");
				$('.based-eur').html("für "+($('#balance').attr('data')/-10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				var sum=0;
				$.each($('.base_balance'),function() {sum+=1*$(this).attr('data'); });	
				var eeg=sum*679.2;
				$('#eeg_infra').html((eeg/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				var konz=sum*132;
				$('#konz_infra').html((konz/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				
				var kwk=sum*46.3;
				$('#kwk_infra').html((kwk/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				
				var stromnev=sum*38.8;
				$('#stromnev_infra').html((stromnev/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
		
				$('.infra-kwh').html("für "+(sum/1000).toLocaleString(undefined, { minimumFractionDigits:3, maximumFractionDigits:3 })+" KWh");
				$('.infra-eur').html("für "+($('#infra_saldo').attr('data')/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
		}
