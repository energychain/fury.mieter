if(!$('#steuern').exists()) {
			var html="<hr/><h4 id='steuern'>Steuern, Abgaben und Umlagen</h4>";
			html+="<table class='table'>";
			html+="<tr><td>EEG-Umlage</td><td style='text-align:right' id='eeg'></td></tr>";			
			html+="<tr><td>Umsatzsteuer</td><td style='text-align:right' id='ust'></td></tr>";			
			html+="</table>";			
			$('#add_energie').html(html);
			
			var html="<hr/><h4 id='steuern'>Steuern, Abgaben und Umlagen</h4>";
			html+="<table class='table'>";		
			html+="<tr><td>EEG-Umlage (Gutschrift)</td><td style='text-align:right' id='eeg_infra'></td></tr>";	
			html+="<tr><td>Umsatzsteuer</td><td style='text-align:right' id='ust_infra'></td></tr>";			
			html+="</table>";			
			$('#add_infra').html(html);
		}
		var invest_calc_old=invest_calc;
		var invest_calc=function() {
				var eeg=$('#balance').attr('data-base')*679.2;
				$('#eeg').html((eeg/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				invest_calc_old();
				var ust=($('#balance').attr('data')/1.19)*0.19;
				$('#ust').html((ust/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				
				var ust=($('#infra_saldo').attr('data')/1.19)*0.19;
				$('#ust_infra').html((ust/-10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
				var sum=0;
				$.each($('.base_balance'),function() {sum+=1*$(this).attr('data'); });	
				var eeg=sum*679.2;
				$('#eeg_infra').html((eeg/10000000).toLocaleString(undefined, { minimumFractionDigits:2, maximumFractionDigits:2 })+" €");
		}
