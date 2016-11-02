$.ajax({
				type: 'GET',
				dataType: "json",
				url: serverUrl + "/api/get_events.php",
				success: function (responseData, textStatus, jqXHR) {
					//console.log("in");
					var data = jQuery.parseJSON( responseData );
				    //console.log(data.provider_bulletin.Events);
					$.each(data.provider_bulletin.Events, function(eventsKey, eventField) {		
						//console.log(eventsKey + ': ' + eventField);
						var date = convertToDate(eventField[3]);
						$("<div>------------------------------------------------------</div>").appendTo("#maclar");
						$("<div>KOD:"+eventsKey+"</div>").appendTo("div#maclar");
						$("<div>TAKIMLAR:"+eventField[4]+"</div>").appendTo("#maclar");
						$("<div>ayin gunu:" + date.getDate()+"</div>").appendTo("#maclar");
						$("<div>ay:" + date.getMonth()+"</div>").appendTo("#maclar");
						$("<div>yil:" + date.getFullYear()).appendTo("#maclar");
						$("<div>haftanin gunu:" + date.getDay()).appendTo("#maclar");
						$("<div>saat:" + date.getHours()+"</div>").appendTo("#maclar");
						$("<div>dakika:" + date.getMinutes()+"</div>").appendTo("#maclar");
						$("<div>LIG:" + data.provider_bulletin.Filter.Leagues[eventField[7]][2]+"</div>").appendTo("#maclar");
						$("<div>LIG KODU:" + data.provider_bulletin.Filter.Leagues[eventField[7]][1]+"</div>").appendTo("#maclar");
						$("<div>ULKE:" + data.provider_bulletin.Filter.Countries[eventField[6]][1]+"</div>").appendTo("#maclar");
						$("<div>MBS:"+eventField[5]+"</div>").appendTo("#maclar");
						
						/*console.log("KOD:"+eventsKey);
						console.log("TAKIMLAR:"+eventField[4]);
						console.log("ayin gunu:" + date.getDate());
						console.log("ay:" + date.getMonth() );
						console.log("yil:" + date.getFullYear());
						console.log("haftanin gunu:" + date.getDay() );
						console.log("saat:" + date.getHours());
						console.log("dakika:" + date.getMinutes());
						console.log("LIG:" + data.provider_bulletin.Filter.Leagues[eventField[7]][2]);
						console.log("LIG KODU:" + data.provider_bulletin.Filter.Leagues[eventField[7]][1]);
						console.log("ULKE:" + data.provider_bulletin.Filter.Countries[eventField[6]][1]);
						console.log("MBS:"+eventField[5]);*/
						//console.log("ORANLAR:"+value[8]);
						$.each(eventField[8], function(ratioType, ratioValue) {
							//console.log("girdi1:"+ratioType);
							if (ratioType == 8){
					
								$("<div>**************************</div>").appendTo("#maclar");
								$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>KG VAR:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>KG YOK:"+ratioValue[1]+"</div>").appendTo("#maclar");
								
								/*console.log("MBS INHERITED:"+eventField[5]+"</div>");
								console.log("KG VAR:"+ratioValue[0]+"</div>");
								console.log("KG YOK:"+ratioValue[1]+"</div>");*/
							}
							else if (ratioType == 16){
								
								$("<div>**************************</div>").appendTo("#maclar");
								$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>HANDIKAP:"+eventField[9].ExtraH[1]+":"+eventField[9].ExtraH[0]+"</div>").appendTo("#maclar");//ornek A:1 AWAY 1
								$("<div>HANDIKAPLI MAC SONUCU 1:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>HANDIKAPLI MAC SONUCU X:"+ratioValue[1]+"</div>").appendTo("#maclar");
								$("<div>HANDIKAPLI MAC SONUCU 2:"+ratioValue[2]+"</div>").appendTo("#maclar");
								
								/*console.log("MBS INHERITED:"+eventField[5]);
								console.log("h MAC SONUCU 1:"+ratioValue[0]);
								console.log("h MAC SONUCU X:"+ratioValue[1]);
								console.log("h MAC SONUCU 2:"+ratioValue[2]);*/
								//console.log("handikap degeri:"+ratioValue[9].ExtraH[1]+ratioValue[9].ExtraH[0]);
								
							}
							else if (ratioType == 10){
						
								$("<div>**************************</div>").appendTo("#maclar");
								$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>CIFTE SANS 1X:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>CIFTE SANS 12:"+ratioValue[1]+"</div>").appendTo("#maclar");
								$("<div>CIFTE SANS X2:"+ratioValue[2]+"</div>").appendTo("#maclar");
								
								/*console.log("MBS INHERITED:"+eventField[5]);
								console.log("CIFTE SANS 1X:"+ratioValue[0]);
								console.log("CIFTE SANS 12:"+ratioValue[1]);
								console.log("CIFTE SANS 2X:"+ratioValue[2]);*/
							}
							else if (ratioType == 9){
				
								$("<div>**************************</div>").appendTo("#maclar");
								$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>MAC SONUCU 1:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>MAC SONUCU X:"+ratioValue[1]+"</div>").appendTo("#maclar");
								$("<div>MAC SONUCU 2:"+ratioValue[2]+"</div>").appendTo("#maclar");
								
								/*console.log("MBS INHERITED:"+eventField[5]);
								console.log("MAC SONUCU 1:"+ratioValue[0]);
								console.log("MAC SONUCU X:"+ratioValue[1]);
								console.log("MAC SONUCU 2:"+ratioValue[2]);*/
							}
							else if (ratioType == 11){
								
								$("<div>**************************</div>").appendTo("#maclar");
								//$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>MBS SPECIAL:"+2+"</div>").appendTo("#maclar");
								$("<div>ILK YARI ve MS 11:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI ve MS 1X:"+ratioValue[1]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI ve MS 12:"+ratioValue[2]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI ve MS X1:"+ratioValue[3]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI ve MS XX:"+ratioValue[4]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI ve MS X2:"+ratioValue[5]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI ve MS 21:"+ratioValue[6]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI ve MS 2X:"+ratioValue[7]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI ve MS 22:"+ratioValue[8]+"</div>").appendTo("#maclar");
								
								/*console.log("ILK YARI ve MS 11:"+ratioValue[0]);
								console.log("ILK YARI ve MS 1X:"+ratioValue[1]);
								console.log("ILK YARI ve MS 12:"+ratioValue[2]);
								console.log("ILK YARI ve MS X1:"+ratioValue[3]);
								console.log("ILK YARI ve MS XX:"+ratioValue[4]);
								console.log("ILK YARI ve MS X2:"+ratioValue[5]);
								console.log("ILK YARI ve MS 21:"+ratioValue[6]);
								console.log("ILK YARI ve MS 2X:"+ratioValue[7]);
								console.log("ILK YARI ve MS 22:"+ratioValue[8]);*/
							
							}
							else if (ratioType == 12){
						
								$("<div>**************************</div>").appendTo("#maclar");
								//$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>MBS SPECIAL:"+1+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 00:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 01:"+ratioValue[1]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 02:"+ratioValue[2]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 03:"+ratioValue[3]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 04:"+ratioValue[4]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 05:"+ratioValue[5]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 10:"+ratioValue[6]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 11:"+ratioValue[7]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 12:"+ratioValue[8]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 13:"+ratioValue[9]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 14:"+ratioValue[10]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 15:"+ratioValue[11]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 20:"+ratioValue[12]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 21:"+ratioValue[13]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 22:"+ratioValue[14]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 23:"+ratioValue[15]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 24:"+ratioValue[16]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 25:"+ratioValue[17]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 30:"+ratioValue[18]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 31:"+ratioValue[19]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 32:"+ratioValue[20]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 33:"+ratioValue[21]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 34:"+ratioValue[22]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 35:"+ratioValue[23]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 40:"+ratioValue[24]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 41:"+ratioValue[25]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 42:"+ratioValue[26]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 43:"+ratioValue[27]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 44:"+ratioValue[28]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 45:"+ratioValue[29]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 50:"+ratioValue[30]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 51:"+ratioValue[31]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 52:"+ratioValue[32]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 53:"+ratioValue[33]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 54:"+ratioValue[34]+"</div>").appendTo("#maclar");
								$("<div>MAC SKORU 55:"+ratioValue[35]+"</div>").appendTo("#maclar");
								
								/*console.log("MAC SKORU 00:"+ratioValue[0]);
								console.log("MAC SKORU 01:"+ratioValue[1]);
								console.log("MAC SKORU 02:"+ratioValue[2]);
								console.log("MAC SKORU 03:"+ratioValue[3]);
								console.log("MAC SKORU 04:"+ratioValue[4]);
								console.log("MAC SKORU 05:"+ratioValue[5]);
								console.log("MAC SKORU 10:"+ratioValue[6]);
								console.log("MAC SKORU 11:"+ratioValue[7]);
								console.log("MAC SKORU 12:"+ratioValue[8]);
								console.log("MAC SKORU 13:"+ratioValue[9]);
								console.log("MAC SKORU 14:"+ratioValue[10]);
								console.log("MAC SKORU 15:"+ratioValue[11]);
								console.log("MAC SKORU 20:"+ratioValue[12]);
								console.log("MAC SKORU 21:"+ratioValue[13]);
								console.log("MAC SKORU 22:"+ratioValue[14]);
								console.log("MAC SKORU 23:"+ratioValue[15]);
								console.log("MAC SKORU 24:"+ratioValue[16]);
								console.log("MAC SKORU 25:"+ratioValue[17]);
								console.log("MAC SKORU 30:"+ratioValue[18]);
								console.log("MAC SKORU 31:"+ratioValue[19]);
								console.log("MAC SKORU 32:"+ratioValue[20]);
								console.log("MAC SKORU 33:"+ratioValue[21]);
								console.log("MAC SKORU 34:"+ratioValue[22]);
								console.log("MAC SKORU 35:"+ratioValue[23]);
								console.log("MAC SKORU 40:"+ratioValue[24]);
								console.log("MAC SKORU 41:"+ratioValue[25]);
								console.log("MAC SKORU 42:"+ratioValue[26]);
								console.log("MAC SKORU 43:"+ratioValue[27]);
								console.log("MAC SKORU 44:"+ratioValue[28]);
								console.log("MAC SKORU 45:"+ratioValue[29]);
								console.log("MAC SKORU 50:"+ratioValue[30]);
								console.log("MAC SKORU 51:"+ratioValue[31]);
								console.log("MAC SKORU 52:"+ratioValue[32]);
								console.log("MAC SKORU 53:"+ratioValue[33]);
								console.log("MAC SKORU 54:"+ratioValue[34]);
								console.log("MAC SKORU 55:"+ratioValue[35]);*/
							}
							else if (ratioType == 13){

								$("<div>**************************</div>").appendTo("#maclar");
								$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>MAC SONU ALTI(2,5):"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>MAC SONU USTU(2,5):"+ratioValue[1]+"</div>").appendTo("#maclar");
								
								/*console.log("MAC SONU ALTI(2,5):"+ratioValue[0]);
								console.log("MAC SONU USTU(2,5):"+ratioValue[1]);*/
							}
							else if (ratioType == 14){
								
								$("<div>**************************</div>").appendTo("#maclar");
								$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI SONUCU 1:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI SONUCU X:"+ratioValue[1]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI SONUCU 2:"+ratioValue[2]+"</div>").appendTo("#maclar");
							
								/*console.log("ILK YARI SONUCU 1:"+ratioValue[0]);
								console.log("ILK YARI SONUCU X:"+ratioValue[1]);
								console.log("ILK YARI SONUCU 2:"+ratioValue[2]);*/
							}
							else if (ratioType == 15){
								$("<div>**************************</div>").appendTo("#maclar");
								$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>TOPLAM GOL 0-1:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>TOPLAM GOL 2-3:"+ratioValue[1]+"</div>").appendTo("#maclar");
								$("<div>TOPLAM GOL 4-6:"+ratioValue[2]+"</div>").appendTo("#maclar");
								$("<div>TOPLAM GOL 7+ :"+ratioValue[3]+"</div>").appendTo("#maclar");
								
								/*console.log("TOPLAM GOL 0-1:"+ratioValue[0]);
								console.log("TOPLAM GOL 2-3:"+ratioValue[1]);
								console.log("TOPLAM GOL 4-6:"+ratioValue[2]);
								console.log("TOPLAM GOL 7+ :"+ratioValue[3]);*/
							}
							else if (ratioType == 5){
								
								console.log("ILK YARI 1,5 ALT:"+ratioValue[0]);
								console.log("ILK YARI 1,5 UST:"+ratioValue[1]);
								$("<div>**************************</div>").appendTo($("#maclar"));
								$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo($("#maclar"));
								$("<div>ILK YARI 1,5 ALT:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>ILK YARI 1,5 UST:"+ratioValue[1]+"</div>").appendTo("#maclar");
								
							
							}
							else if (ratioType == 6){
								$("<div>**************************</div>").appendTo("#maclar");
								$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>MAC SONU 1,5 ALT:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>MAC SONU 1,5 UST:"+ratioValue[1]+"</div>").appendTo("#maclar");
								
							    /*console.log("MAC SONU 1,5 ALT:"+ratioValue[0]);
								console.log("MAC SONU 1,5 UST:"+ratioValue[1]);*/
							}
							else if (ratioType == 7){
								$("<div>**************************</div>").appendTo("#maclar");
								$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>MAC SONU 3,5 ALT:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>MAC SONU 3,5 UST:"+ratioValue[1]+"</div>").appendTo("#maclar");
								
								/*console.log("MAC SONU 3,5 ALT:"+ratioValue[0]);
								console.log("MAC SONU 3,5 UST:"+ratioValue[1]);*/
							}
							else if (ratioType == -1){
								$("<div>**************************</div>").appendTo("#maclar");
								$("<div>MBS INHERITED:"+eventField[5]+"</div>").appendTo("#maclar");
								$("<div>OZEL ETKINLIK ORANI:"+ratioValue[0]+"</div>").appendTo("#maclar");
								$("<div>OZEL ETKINLIK ORANI:"+ratioValue[1]+"</div>").appendTo("#maclar");
								$("<div>OZEL ETKINLIK ORANI:"+ratioValue[2]+"</div>").appendTo("#maclar");
								
								/*console.log("OZEL ETKINLIK ORANI:"+ratioValue[0]);
								console.log("OZEL ETKINLIK ORANI:"+ratioValue[1]);
								console.log("OZEL ETKINLIK ORANI:"+ratioValue[2]);*/
							}
						});
						console.log("-------------------------------------------------------------");
					});
				hideWaitScreen();
				console.log("ajax bitti");
				},
				error: function (responseData, textStatus, errorThrown) {
					alert('POST failed.'+textStatus);
				}
			});