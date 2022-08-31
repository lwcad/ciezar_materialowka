// zaokragla liczbe - liczba - do - dec -  miejsc po przecinku
// i zamienia liczbe na lancuch
function roundToDec ( liczba, dec )
{
  var po_przec, wynik ;

  var znak      = "" ;
  var wykladnik = "" ;

  if ( liczba < 0 )
  {
    znak       = "-" ;
    var liczba = Math.abs( liczba ) ;
  } ;

  var Lancoch  = "" + liczba ;
  var dlugLanc = Lancoch.length ;

    // pozycja znaku e w liczbie wykladniczej np. 3.456e-5
  var pozycja_e = Lancoch.indexOf("e",1) ;

  if ( pozycja_e > -1) // jesli jest wykladnik w liczbie
  {
      // w moim przykladzie to by bylo "e-5"
    wykladnik = Lancoch.substring ( pozycja_e, dlugLanc ) ;
      // przed_wykladnikiem
    Lancoch  = Lancoch.substring ( 0, pozycja_e ) ;
    dlugLanc = Lancoch.length ;
  }

    // tu juz usuniety wykladnik jesli byl

  var liczbaTmp   = eval ( Lancoch ) ;

  liczbaTmp = liczbaTmp * Math.pow (10 , dec ) ;
  liczbaTmp = Math.round ( liczbaTmp ) ;
  liczbaTmp = liczbaTmp / Math.pow (10 , dec ) ;

  var przed_przec = Math.floor ( liczbaTmp ) ;
  po_przec        = liczbaTmp - przed_przec ;

// jeszcze raz bo sie mylil np. zamiast 0.15 bylo 0.149999
//  i po ycieciu 2 miejsc wychodilo 0.14
  po_przec = po_przec * Math.pow (10 , dec ) ;
  po_przec = Math.round ( po_przec ) ;
  po_przec = po_przec / Math.pow (10 , dec ) ;

  if ( po_przec != 0 )
  {
    po_przec = "" + po_przec ;
     // usuwam 0 przed kropka
    po_przec = po_przec.substring( 1, dec + 2 ) ;
  }
  else      // po_przec == 0
  {
    po_przec = "." ;
  }

    // uzupelniam 0 na koncu
  while ( po_przec.length < dec + 1 )
  { po_przec = po_przec + "0" }

  wynik = znak + przed_przec + po_przec + wykladnik ;

  return wynik ;
}

