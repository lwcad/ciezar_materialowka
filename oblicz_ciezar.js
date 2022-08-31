//-------------------------------------------------------------------------------------------
// przy starcie zapamietuje ustawdocument.kalk.masaienia jednostek - są na pozycji 5 więc index = 4 (index od 0)
function StartStrony() {
  // bez - var - bo maja byc globalne zmienne
  // bez - var - globalne, z - var - lokalne
  old_jedn_dlug_a_index = 4 ;  // [mm]
  old_jedn_dlug_b_index = 4 ;  // [mm]  
  old_jedn_dlug_l_index = 4 ;  // [mm]
  old_jedn_dlug_g_index = 4 ;  // [mm]
  old_jedn_gest_mas_index = 0 ; // [kg]
  old_jedn_gest_obj_index = 0 ; // [m3]
  old_jedn_masa_wynik_index = 0 ; // [kg]
  old_jedn_masa1szt_wynik_index = 0 ; // [kg]
  a_SI = 0 ; // wymiar a w jednostkach SI - wartość tu chyba dowolna i tak liczy
  b_SI = 0 ; 
  g_SI = 0 ; 
  l_SI = 0 ; 
  gest_SI = 0 ;
  sztuk_Glob = 0 ; // aby byla zmienna globalna
  
  // aby na starcie wyswietlala sie odpowiednia ilosc zer po przec
  aktual_po_przec_all() ;
  
  // gasze wymiar B i jego jednostki - bo pierwsza opcja kolo wiec nie potrzebny
  document.kalk.dlug_b.disabled      = true ;
  document.kalk.jedn_dlug_b.disabled = true ;
  
  // gasze wymiar g i jego jednostki - bo pierwsza opcja kolo wiec nie potrzebny
  document.kalk.dlug_g.disabled      = true ;
  document.kalk.jedn_dlug_g.disabled = true ;  
  
}

/*
//-------------------------------------------------------------------------------------------
// zapamietuje ustawienia jednostek itp.
function AktualneJednostki(param1) {
  // bez - var - bo maja byc globalne zmienne
  // bez - var - globalne, z - var - lokalne
  old_jedn_dlug_a_index = document.kalk.jedn_dlug_a.selectedIndex ;
  old_jedn_dlug_b_index = document.kalk.jedn_dlug_b.selectedIndex ;  
  old_jedn_dlug_l_index = document.kalk.jedn_dlug_l.selectedIndex ;
  old_jedn_dlug_g_index = document.kalk.jedn_dlug_g.selectedIndex ;  
  
  var po_przec = document.kalk.po_przecinku.selectedIndex ;

  param1.value = roundToDec(old_jedn_dlug_a_index, po_przec) + ", " + roundToDec(old_jedn_dlug_b_index, po_przec) + ", " + roundToDec(old_jedn_dlug_l_index, po_przec) + ", " + roundToDec(old_jedn_dlug_l_index, po_przec);
  //param1.value = document.kalk.dlug_a.name ;
}
*/

//-------------------------------------------------------------------------------------------
// przy zmianie "po_przecinku" zmienia wszystkie pola
function aktual_po_przec_all() {
  licz_dlug(document.kalk.dlug_a, document.kalk.jedn_dlug_a);
  //alert('a')
  licz_dlug(document.kalk.dlug_b, document.kalk.jedn_dlug_b);
  //alert('b')
  licz_dlug(document.kalk.dlug_l, document.kalk.jedn_dlug_l);
  //alert('l')
  licz_dlug(document.kalk.dlug_g, document.kalk.jedn_dlug_g);
  //alert('g')
  licz_sztuki(document.kalk.ilosc) ;
  //alert('ilosc')
  licz_gest(document.kalk.gestosc, document.kalk.jedn_gest_mas,  document.kalk.jedn_gest_obj) ;
  //alert('gestosc')
}  

//-------------------------------------------------------------------------------------------
// sprawdza czy wprowadzono liczbę a nie znaki - w okienkach danych
// przelicza na zmienione ewentualnie jednostki
// i ustala odpowiednią ilosc miejsc po przecinku
function licz_dlug(param_dlug, param_jedn)
{
  var tmp_dlug = param_dlug ;
  
  //var TabNazwyJednostek = ["m",   "km", "dm", "cm",  "mm", "mikrometr",   "Angstrem",  "cal", "stopa", "jard",   "mila", "mila_morska"] ;
  var TabWspDlug =          [  1, 1000.0,  0.1, 0.01, 0.001, 0.000001   , 0.0000000001, 0.0254,  0.3048, 0.9144, 1609.344,       1852.0 ] ;

  // $$$ tu sprawdzic czy nie są równe indexy akt i old aby nie przeliczać nie potrzebnie

  // Wartosc NaN jest skrótem Not a Number - to nie liczba
  if ( isNaN(param_dlug.value) )
    { tmp_dlug = 0 }
  else  // jesli wprowadzona liczbe (nie znaki np.literowe)
    { 
	  if (param_dlug.name == document.kalk.dlug_a.name) 
	  {
        tmp_dlug = ( eval(param_dlug.value) * TabWspDlug[old_jedn_dlug_a_index]) / TabWspDlug[param_jedn.selectedIndex] ;
		a_SI = tmp_dlug * TabWspDlug[param_jedn.selectedIndex] ; 
		// alert("a= " + tmp_dlug + " , a w SI=" + a_SI + " , index old =" + old_jedn_dlug_a_index ) ;
		old_jedn_dlug_a_index = param_jedn.selectedIndex ;
	  }
	  else if (param_dlug.name == document.kalk.dlug_b.name) 
	  {
        tmp_dlug = eval(param_dlug.value) * TabWspDlug[old_jedn_dlug_b_index] / TabWspDlug[param_jedn.selectedIndex] ;
		b_SI = tmp_dlug * TabWspDlug[param_jedn.selectedIndex] ; 
		//alert("b= " + tmp_dlug + " , b w SI=" + b_SI + " , index old =" + old_jedn_dlug_b_index ) ;
		old_jedn_dlug_b_index = param_jedn.selectedIndex ;
	  }
      else if (param_dlug.name == document.kalk.dlug_g.name) 
	  {
        tmp_dlug = eval(param_dlug.value) * TabWspDlug[old_jedn_dlug_g_index] / TabWspDlug[param_jedn.selectedIndex] ;
		g_SI = tmp_dlug * TabWspDlug[param_jedn.selectedIndex] ; 
		//alert("g= " + tmp_dlug + " , g w SI=" + g_SI + " , index old =" + old_jedn_dlug_g_index ) ;
		old_jedn_dlug_g_index = param_jedn.selectedIndex ;		
	  }
 	  else if (param_dlug.name == document.kalk.dlug_l.name) 
	  {
        tmp_dlug = eval(param_dlug.value) * TabWspDlug[old_jedn_dlug_l_index] / TabWspDlug[param_jedn.selectedIndex] ;
		l_SI = tmp_dlug * TabWspDlug[param_jedn.selectedIndex] ; 
		//alert("l= " + tmp_dlug + " , l w SI=" + l_SI + " , index old =" + old_jedn_dlug_l_index ) ;
		old_jedn_dlug_l_index = param_jedn.selectedIndex ;		
	  }

    } ;

  licz_mase(document.kalk.masa) ; 
  
  var po_przec = document.kalk.po_przecinku.selectedIndex ;
  param_dlug.value = roundToDec(tmp_dlug, po_przec) ;
  
}

//-------------------------------------------------------------------------------------------
// sprawdza czy wprowadzono liczbę a nie znaki - w okienku 'ilosc' 'sztuk'
// i ustala odpowiednią ilosc miejsc po przecinku
function licz_sztuki(param_szt)
{
  var tmp_szt = param_szt ;
  
  // Wartosc NaN jest skrótem Not a Number - to nie liczba
  if ( isNaN(param_szt.value) )
    { tmp_szt = 0 }
  else  // jesli wprowadzona liczbe (nie znaki np.literowe)
    { 
	  tmp_szt = eval(param_szt.value) ;
    } ;

  sztuk_Glob = tmp_szt ;
  
  licz_mase(document.kalk.masa) ;

  var po_przec = document.kalk.po_przecinku.selectedIndex ;
  param_szt.value = roundToDec(tmp_szt, po_przec) ;
}



//-------------------------------------------------------------------------------------------
// funkcja zamienia wartość danej-gestosc po zmianie jednostek
function licz_gest(param_gestosc, param_jedn_gest_mas,  param_jedn_gest_obj)
{
  var tmp_gest ;

  // tabela wspolczynnikow przeliczania masy np. 3 pozycja gram - 1g=0.001 kg
  //                  [kg], [dag],   [g],    [funt] , [uncja], [karat],    [gran], [cetnarUSA], [cetnar ang], [tona szer.USA], [tona dluga ang]
  var TabWspMasa =    [  1,  0.01, 0.001, 0.45359237, 0.02835,  0.0002, 0.0000648,   45.359237,    50.802345,       907.18474, 1016.0469 ] ;

  // tabela wspolczynnikow przeliczania objetosci np. 3 pozycja dm^3 - 1dm3=0.001 m3
  //                  [m3],    [km3]    , [dm3] ,  [cm3]  ,    [mm3]   ,    [cal3]     ,      [stopa3]  ,  [jard3]      , [gal USA]     ,  [gal ang] ,  [gal dry] , [bu USA]  , [bu ang], [barylka USA wine], [barylka ang], [barylka Petro]
  var TabWspObjet =   [  1, 1000000000.0,  0.001, 0.000001, 0.000000001, 0.000016387064,  0.028316846592, 0.764554857984, 0.003785411784,  0.00454609, 0.004404884, 0.03523907, 0.036369,         0.11923713,       0.16366,        0.158987   ] ;


  // Wartosc NaN jest skrótem Not a Number - to nie liczba
  if ( isNaN(param_gestosc.value) )
    { tmp_gest = 0 }
  else  // jesli wprowadzona liczbe (nie znaki np.literowe)
    { 
	  {
		tmp_gest = ( eval(param_gestosc.value) * ( TabWspMasa[old_jedn_gest_mas_index] / TabWspMasa[param_jedn_gest_mas.selectedIndex] )) ; // przeliczylem zmiane jedn masy
		tmp_gest = tmp_gest / ( TabWspObjet[old_jedn_gest_obj_index] / TabWspObjet[param_jedn_gest_obj.selectedIndex] ) ; // przeliczylem zmiane jedn objetosci

		gest_SI = tmp_gest * TabWspMasa[param_jedn_gest_mas.selectedIndex] ;
		gest_SI = gest_SI / TabWspObjet[param_jedn_gest_obj.selectedIndex] ;
		
		// alert("gest= " + tmp_gest + " , gest w SI=" + gest_SI + " , index old =" + old_jedn_gest_mas_index ) ;

		old_jedn_gest_mas_index = param_jedn_gest_mas.selectedIndex ;
		old_jedn_gest_obj_index = param_jedn_gest_obj.selectedIndex ;
	  }
	}  

  licz_mase(document.kalk.masa) ; 
  
  var po_przec = document.kalk.po_przecinku.selectedIndex ;
  param_gestosc.value = roundToDec(tmp_gest, po_przec) ;

}


//-------------------------------------------------------------------------------------------
// funkcja liczy masę elementu
function licz_mase(param_masa)
{
  var tmp_masa_SI ; // czyli w kg

  // tabela wspolczynnikow przeliczania masy np. 3 pozycja gram - 1g=0.001 kg
  //                  [kg], [dag],   [g],    [funt] , [uncja], [karat],    [gran], [cetnarUSA], [cetnar ang], [tona szer.USA], [tona dluga ang]
  var TabWspMasa =    [  1,  0.01, 0.001, 0.45359237, 0.02835,  0.0002, 0.0000648,   45.359237,    50.802345,       907.18474, 1016.0469 ] ;

  
  // sprawdzam która opcja kształtu zaznaczona - 6 - ilosc radio
  // ta wartość jest już sprawdzana w wyświetlaniu obrazka, ale tu na wszelki przypadek umieszcze jeszcze raz
  for (i = 0; i < 6 ; i++) 
  {
    if ( kalk.opcja_typ_el[i].checked == true ) 
	{ 
      var i_zaznaczone = i ; 
	}
  }

  switch (i_zaznaczone) {
    case 0: tmp_masa_SI = 0.25 * Math.PI * a_SI * a_SI ; // kolo
	        //  alert( "a_SI= " + a_SI + " , l_SI=" + l_SI + " , tmp_masa_SI=" + tmp_masa_SI + " , i_zaznaczone=" + i_zaznaczone ) ; 
      break;
    case 1: tmp_masa_SI = a_SI * a_SI ; // kwadrat
      break;
    case 2: tmp_masa_SI = a_SI * b_SI ; // prostokat
      break;
    case 3: tmp_masa_SI = 0.5 * a_SI * a_SI * Math.sqrt(3) ; // szesciokat $$$$$ sprawdzic
      break;
    case 4: tmp_masa_SI = 0.25 * Math.PI * ( a_SI * a_SI - ( a_SI - 2 * g_SI) * ( a_SI - 2 * g_SI) ) ; // pierscien, tuleja
      break;
    case 5: tmp_masa_SI = a_SI * b_SI - ( a_SI - 2 * g_SI) * ( b_SI - 2 * g_SI)  ; // prostokat pusty
      break;
    default: tmp_masa_SI = 0 ;
  }

  var po_przec = document.kalk.po_przecinku.selectedIndex ;
  
  // dla 1 sztuki
  tmp_masa_SI = tmp_masa_SI * l_SI * gest_SI ;
  document.kalk.masa1szt.value = roundToDec(tmp_masa_SI, po_przec) ; // $$$$ tu zrobiłem na sztywno nie przez przekazannie parametrem - przemyśleć może jest wystarczająco OK

  // TODO: 
  //alert(sztuk_Glob) ;
 
  // dla wielu sztuk 
  tmp_masa_SI = tmp_masa_SI * sztuk_Glob ;  
  param_masa.value = roundToDec(tmp_masa_SI, po_przec) ;

}



//-------------------------------------------------------------------------------------------
// funkcja wyswietla obrazek (przekrój materialu) i ustawia które dane-wymiary dostępne
function wysw_obrazek(nazwa_obrazka)
{
  // tu wyswietlam obrazek 
  document.getElementById("obrazek").src = nazwa_obrazka ;	

  // a tu poniżej wygaszam (niedostepny) lub zapalam (dostepny) wymiar B 
  //   który dla kwadratu, kola, szesciokata - nie jest potrzebny
  //   przy okazji jego jednostki tez
  // podobnie dla g
  
  // najpierw gasze wymiary B i g - zawsze
  document.kalk.dlug_b.disabled      = true ;
  document.kalk.jedn_dlug_b.disabled = true ;

  document.kalk.dlug_g.disabled      = true ;
  document.kalk.jedn_dlug_g.disabled = true ;

  // $$$$$ jeśli zmienie obrazek to może zerować wynik
  // sprawdzam która opcja kształtu zaznaczona - 6 - ilosc radio
  for (i = 0; i < 6 ; i++) 
  {
    if ( kalk.opcja_typ_el[i].checked == true ) 
	{ 
      var i_zaznaczone = i ; 
	}
  }

  // teraz w zaleznosci od opcji - zapalam B (i jego jednostki) 
  // dla prostokat i prostokat profil - wlaczam dane - B
  if (( i_zaznaczone == 2) || ( i_zaznaczone == 5))
  {
    document.kalk.dlug_b.disabled      = false ;
    document.kalk.jedn_dlug_b.disabled = false ;	
  }

  // teraz w zaleznosci od opcji - zapalam g (i jego jednostki) 
  // dla tuleja i prostokat profil - wlaczam dane - B
  if (( i_zaznaczone == 4) || ( i_zaznaczone == 5))
  {
    document.kalk.dlug_g.disabled      = false ;
    document.kalk.jedn_dlug_g.disabled = false ;	
  }

  licz_mase(document.kalk.masa) ; 
  
}


/*

//--------------------------------------------------------------------------------
  if ( form.opcja_typ_el[0].checked == true )  // na ekran lista punktow
    {

      dxf = false ;

      wyniki( DR, DSM , DSD, PRZES, HRURY, HSTOZ, L, KATSP, NPODZ ) ;

    }
	


//--------------------------------------------------------------------------------
// a tu zmian obrazka co iles sekund - przykłąd

<script type="text/javascript">
var obrazki = new Array();
obrazki[1] = "images/a.JPG";
obrazki[2] = "images/b.JPG";
var sekund = 11; //co ile sekund ma sie zmieniac obrazek
  
var a = 1;
  
function zmien()
{
var ile = obrazki.length;
document.getElementById("obrazek").src = obrazki[a];
if (a<2)
{
 a++;
}
  
}
  
  
setInterval("zmien()", sekund*1000);
  
</script>
<img src="images/a.JPG" id="obrazek" />





//--------------------------------------------------------------------------------
// drugi przykład	

$(document).ready(function() {
   ('img#id_obrazka').click(function() {
      if ( ! $('input[name=nazwa_radia]:checked').val())
      {
         $(this).src('new_image.jpg');
         $('input[name=nazwa_radia]').attr('checked', 'checked');
      }
      else
      {
         $(this).src('old_image.jpg');
         $('input[name=nazwa_radia]').removeAttr('checked');
      }
   });
});


//--------------------------------------------------------------------------------	

a=new AudioContext() // browsers limit the number of concurrent audio contexts, so you better re-use'em

function beep(vol, freq, duration){
  v=a.createOscillator()
  u=a.createGain()
  v.connect(u)
  v.frequency.value=freq
  v.type="square"
  u.connect(a.destination)
  u.gain.value=vol*0.01
  v.start(a.currentTime)
  v.stop(a.currentTime+duration*0.001)
}

//--------------------------------------------------------------------------------	
	
switch (i) {
  case 0: alert("i jest równe 0");
    break;
  case 1: alert("i jest równe 1");
    break;
  case 2: alert("i jest równe 2");
    break;
  default: alert("nie wiem ile jest równe i");
}
//--------------------------------------------------------------------------------	
<td>
				<select id="gestoscValue">
					<option value="7.85" selected>7.85 kg/dm3</option>
					<option value="7.5">7.5 kg/dm3</option>
					<option value="7.7">7.7 kg/dm3</option>
					<option value="7.8">7.8 kg/dm3</option>
					<option value="7.9">7.9 kg/dm3</option>
					<option value="8.0">8.0 kg/dm3</option>
					<option value="8.1">8.1 kg/dm3</option>
				</select>
			</td>
	
	
alert("Hello\nHow are you?");
alert("Hello\nHow are you?"+1);	
//--------------------------------------------------------------------------------		

READONLY ?

<td><label for="res_m">Łączna masa</label></td>
<td><input type="text" id="res_m" value="0" readonly />&nbsp;[kg]</td>

//--------------------------------------------------------------------------------		
//--------------------------------------------------------------------------------		
//--------------------------------------------------------------------------------		
//--------------------------------------------------------------------------------		
//--------------------------------------------------------------------------------		
//--------------------------------------------------------------------------------		

*/




