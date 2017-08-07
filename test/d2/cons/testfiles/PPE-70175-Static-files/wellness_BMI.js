/* strQuery is a string that contains the window.location.search portion of the URL;    i.e. ?Age=25&Submit=begin;    strToGet is the variable to find in the strQuery and return the corresponding value.; */function strGetQueryValue(strQuery, strToGet) {   var i = 0;   var l = strQuery.length;   var value = '';   var name = '';   for (i=1; i<l; i++) {     j = strQuery.indexOf('=', i);     k = strQuery.indexOf('&', i);     name = strQuery.substring(i,j);     if (name == strToGet) {       if (k>0) {  value = strQuery.substring(j+1, k);       } else {  value = strQuery.substring(j+1, l);       }       return value;     } else if (k < 1 ) {       return '';     }   }   return ''; } /*BEGIN FUNCTIONS FROM GLOBAL CALLED IN ADJUSTHEIGHT FXN; */var strCaller=""; function gRegister(strFunctionCall){   strCaller=strFunctionCall;   return true; } function gUnregister(){   strCaller="";   return true; } function gToInches(strFeet,strInches,strMin,strMax){   /**    *gToInches(strFeet,strInches,strMin,strMax);    *strMin and strMax may be null. If not, they should be inches values.;    *if strMin and/or strMax are not null, all are converted to inches,;    *and strMin<=strDate and/or strDate<=strMax;    */   gRegister("gToInches");   if(!gIsNumber(strFeet)) { return false; }  if(!gIsNumber(strInches)) { return false; }  strInches+=(strFeet*12);   if(strMin){     if(!gIsNumber(strMin)) { return false; }    if(strInches<strMin) { return false; }  }   if(strMax){     if(!gIsNumber(strMax)) { return false; }    if(strInches>strMax) { return false; }  }   gUnregister();   return strInches; } function gMakeNumber(strNumber,strAltValue){   /**    *gMakeNumber(strNumber,strAltValue);    *If strNumber is a number, returns strNumber;    *else returns strAltValue;    */   if(gIsNumber(strNumber)) { return parseInt(strNumber); }  else { return strAltValue; }} function gIsNumber(strNumber,strMin,strMax){   /**    *gIsNumber(strNumber,strMin,strMax);    *strMin and strMax may be null.;    *if strMin and/or strMax are not null, all are verified as numbers,;    *and strMin<=strNumber and/or strNumber<=strMax;    */   gRegister("gIsNumber");   var strTempNumber=strNumber; /*make a copy; */  strTempNumber=""+strTempNumber; /*make sure copy is string; */  if(strTempNumber.length==0) { return false; }  for(i=0;i<strTempNumber.length;i++){     if(!((strTempNumber.charAt(i)=="0")||   (strTempNumber.charAt(i)=="1")||   (strTempNumber.charAt(i)=="2")||   (strTempNumber.charAt(i)=="3")||   (strTempNumber.charAt(i)=="4")||   (strTempNumber.charAt(i)=="5")||   (strTempNumber.charAt(i)=="6")||   (strTempNumber.charAt(i)=="7")||   (strTempNumber.charAt(i)=="8")||   (strTempNumber.charAt(i)=="9")||   (strTempNumber.charAt(i)=="-")||   (strTempNumber.charAt(i)=="."))){       return false;     }   }   if(strTempNumber.indexOf(".")!=-1){     var strDecident=strTempNumber.substr(strTempNumber.indexOf("."));     var blnBadDecident=false;     if(strDecident==".") { blnBadDecident=true; }    for(i=1;i<strDecident.length;i++){       if((strDecident.charAt(i)==".")||   (strDecident.charAt(i)=="-")){  blnBadDecident=true;       }     }     if(blnBadDecident){       return false;     }   }   if ( strTempNumber.indexOf("-") != -1 ) { /*if it includes a - test; */    if ( strTempNumber.length == 1 ) { return false; } /*bad if - is the only character; */    if ( strTempNumber.indexOf("-") != 0 ) { return false; } /*bad if - is not the first character; */  }   if(strMin){     var strTempMin=strMin;     strTempMin=""+strTempMin;     if(strTempMin.length==0) return false;     for(i=0;i<strTempMin.length;i++){       if(!((strTempMin.charAt(i)=="0")||     (strTempMin.charAt(i)=="1")||     (strTempMin.charAt(i)=="2")||     (strTempMin.charAt(i)=="3")||     (strTempMin.charAt(i)=="4")||     (strTempMin.charAt(i)=="5")||     (strTempMin.charAt(i)=="6")||     (strTempMin.charAt(i)=="7")||     (strTempMin.charAt(i)=="8")||     (strTempMin.charAt(i)=="9")||     (strTempMin.charAt(i)=="-")||     (strTempMin.charAt(i)=="."))){  return false;       }     }     if(strNumber<parseFloat(strMin)) { return false; }  }   if(strMax){     var strTempMax=strMax;     strTempMax=""+strTempMax;     if(strTempMax.length==0) return false;     for(i=0;i<strTempMax.length;i++){       if(!((strTempMax.charAt(i)=="0")||     (strTempMax.charAt(i)=="1")||     (strTempMax.charAt(i)=="2")||     (strTempMax.charAt(i)=="3")||     (strTempMax.charAt(i)=="4")||     (strTempMax.charAt(i)=="5")||     (strTempMax.charAt(i)=="6")||     (strTempMax.charAt(i)=="7")||     (strTempMax.charAt(i)=="8")||     (strTempMax.charAt(i)=="9")||     (strTempMax.charAt(i)=="-")||     (strTempMax.charAt(i)=="."))){  return false;       }     }     if(strNumber>parseFloat(strMax)) { return false; }  }   gUnregister();   return true; } /*END FUNCTIONS FROM GLOBAL CALLED IN ADJUSTHEIGHT FXN;   BEGIN CALC FUNCTION CALLED WHEN BMI IS CALCULATED IN ADJUSTHEIGHT FXN; */function calc (bHeight,bWeight) {   bWeightfinal=0.45359327*bWeight;   bHeightfinal=0.02540*bHeight;   var bmassIndex=bWeightfinal/ Math.pow(bHeightfinal,2);   return bmassIndex; } /*END CALC FUNCTION CALLED WHEN BMI IS CALCULATED IN ADJUSTHEIGHT FXN;   BEGIN ADJUST HEIGHT FUNCTION CALLED WHEN HEIGHT AND WEIGHT ENTERED; */function adjustHeight(callerObj) {   if( (document.BMICalculator.bFeet.value>=0 ) || (document.BMICalculator.bInch.value>=0) ) {     var bFeetVal = gMakeNumber(document.BMICalculator.bFeet.value, 0);     var bInchVal = gMakeNumber(document.BMICalculator.bInch.value, 0 );     if (bInchVal >= 12) {       var bFeetVal =bFeetVal + Math.floor(bInchVal/12);       var bInchVal =bInchVal - (Math.floor(bInchVal/12)*12);       document.BMICalculator.bFeet.value = bFeetVal;       document.BMICalculator.bInch.value = bInchVal;     }     if ((bFeetVal*12 + bInchVal) >96) {       document.BMICalculator.bFeet.value = 0;       document.BMICalculator.bInch.value = 0;       alert('Sorry, height cannot exceed 8 feet.');       document.BMICalculator.bFeet.focus();       document.BMICalculator.bFeet.select();     }   } } function Reset() {   document.BMICalculator.bWeight.value='';   document.BMICalculator.bFeet.value='';   document.BMICalculator.bInch.value='';   document.BMICalculator.bMassIndex.value='';   document.BMICalculator.bWeight.focus(); } /*END ADJUST HEIGHT FUNCTION CALLED WHEN HEIGHT AND WEIGHT ENTERED;   BEGIN FUNCTION PROCESS CALLED WHEN CALC BUTTON CLICKED; */


function process(callerObj) {   
	if (!gIsNumber(document.BMICalculator.bFeet.value) || (document.BMICalculator.bFeet.value.indexOf("-")!=-1)) {
		alert("Please enter your height in feet.");
		document.BMICalculator.bFeet.focus();
		document.BMICalculator.bFeet.select();
		return false;
		}   
	if (!gIsNumber(document.BMICalculator.bInch.value) || (document.BMICalculator.bInch.value.indexOf("-")!=-1)) {
		alert("Please enter your height in inches.");
		document.BMICalculator.bInch.focus();
		document.BMICalculator.bInch.select();
		return false;
		}   
	if (!gIsNumber(document.BMICalculator.bWeight.value) || (document.BMICalculator.bWeight.value.indexOf("-")!=-1)) {
		alert("Please enter your weight.");
		document.BMICalculator.bWeight.focus();
		document.BMICalculator.bWeight.select();
		return false;
		}
	var bFeetVal = gMakeNumber(document.BMICalculator.bFeet.value, 0);   
	var bInchVal = gMakeNumber(document.BMICalculator.bInch.value, 0);   
	var mNewFeetVal = Math.floor(bInchVal/12);   bInchVal = (bInchVal%12);
	document.BMICalculator.bInch.value=bInchVal;
	bFeetVal+=mNewFeetVal;
	bweight=parseInt( stripLeadingZeros( document.BMICalculator.bWeight.value ) );
	var cW = gMakeNumber(bweight, 0);   
	
	/* must have weight and height info; */  
	if (document.BMICalculator.bWeight.value == 0){
		alert('Please enter your weight again');
		document.BMICalculator.bWeight.focus();
		document.BMICalculator.bWeight.select();
		return;
		}
	if ((bFeetVal == 0) && (bInchVal == 0)){
		alert('Please enter your height again');
		document.BMICalculator.bFeet.focus();
		document.BMICalculator.bFeet.select();
		return;
		}   
		
	var rs = 0;   
	var bH = gToInches(bFeetVal, bInchVal);   
	rs=calc(bH,cW); 
	rs = roundToPennies(rs);
	//document.BMICalculator.bMassIndex.value=roundToPennies(rs);  This was used when result was shown on the same page.
	
	https://healthmanager.webmd.com/webmd/goWebMD.aspx?z=3628_81000_0000_99_23&startid=447 
	
	var v1, v2, v3;
	parent.window.location = '/www/content/tools/1/calc_bmi.htm?' + 'v1=' + bFeetVal + '&v2=' + bInchVal + '&v3=' + cW + '&v4=' + rs;
	
	} 
/*END FUNCTION PROCESS CALLED WHEN CALC BUTTON CLICKED; */
function stripLeadingZeros( number ) {   /* convert to string; */  number = "" + number;   /* strip out any leading zeros that might be interpreted as octal; */  if ( number.indexOf("0") != -1 ) { /*if it includes a 0 test; */    while ( number.indexOf("0") == 0 ) {       number = number.substring( 1 );     }   }   return number; } function roundToPennies(n) {   pennies = n * 100;   pennies = Math.round(pennies);   strp = "" + pennies;   len = strp.length;   return strp.substring(0,len-2) + "." + strp.substring(len-2,len); }