if(!$('#steuern').exists()) {
			var html="<hr/><h4><a href='#' id='steuern'>Steuern, Abgaben und Umlagen <span id='tkl_steuern'>&raquo;</span></a></h4>";
			html+="<table class='table' style='display:none' id='tbl_energy'>";
			html+="<tr><td>EEG-Umlage</td><td><span class='based-kwh'></span></td><td style='text-align:right' id='eeg'></td></tr>";			
			html+="<tr><td>Umsatzsteuer</td><td><span class='based-eur'></span></td><td style='text-align:right' id='ust'></td></tr>";			
			html+="<tr><td>Konzessionsabgabe</td><td><span class='based-kwh'></span></td><td style='text-align:right' id='konz'></td></tr>";	
			html+="<tr><td>KWK Umlage</td><td><span class='based-kwh'></span></td><td style='text-align:right' id='kwk'></td></tr>";	
			html+="<tr><td>Strom NEV §19</td><td><span class='based-kwh'></span></td><td style='text-align:right' id='stromnev'></td></tr>";	
			html+="</table>";			
			$('#add_energie').html(html);
			
			var html="<hr/><h4><a href='#' id='steuern_infra'>Steuern, Abgaben und Umlagen <span id='tkl_infra'>&raquo;</span></a></h4>";
			html+="<table class='table' style='display:none' id='tbl_infra'>";		
			html+="<tr><td>EEG-Umlage (Gutschrift)</td><td><span class='infra-kwh'></span></td><td style='text-align:right' id='eeg_infra'></td></tr>";	
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
