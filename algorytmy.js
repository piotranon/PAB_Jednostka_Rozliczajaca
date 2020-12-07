accountNumber="PL65 1060 0076 0000 3200 0005 7153";
// accountNumber="65 1060 0076 0000 3200 0005 7153";
accountNumber = accountNumber.replaceAll(" ","").replaceAll("-","").replaceAll("_","");

if(!(accountNumber.substr(0,2).localeCompare("PL")==0))
  {
  accountNumber= "PL"+accountNumber;
  }

if(!(/^PL\d{26}$/.test(accountNumber)))
   {
     console.log("numer konta niezgodny dla banku w polsce");
   }
  


console.log(checkIban(accountNumber));
console.log(checkControllSumOfIBAN(accountNumber));
console.log(checkControllSumOfBank(accountNumber));




function checkIban(accountNumber){
  accountNumber=accountNumber.substr(4)+"2521"+accountNumber.substr(2,2);
  return mod97(accountNumber)==1;
};

function checkControllSumOfIBAN(accountNumber){
  let controllSum = accountNumber.substr(2,2);
  accountNumber=accountNumber.substr(4)+"252100";
  let value = 98-mod97(accountNumber);
  if(value<10)
    value="0"+value.toString();
  else
    value=value.toString();
  return controllSum.localeCompare(value)==0;
}

function checkControllSumOfBank(accountNumber){
  let bankNumber = accountNumber.substr(4,8);
  
  let sum=parseInt(bankNumber[0])*3+parseInt(bankNumber[1])*9+parseInt(bankNumber[2])*7+parseInt(bankNumber[3])*1+parseInt(bankNumber[4])*3+parseInt(bankNumber[5])*9+parseInt(bankNumber[6])*7;
  sum = sum%10;
  
  if(sum!=0)
    sum = 10-sum;
  sum=sum.toString();
  
  return bankNumber[7].localeCompare(sum)==0;
}

function mod97(accountNumber){
  let modulo=0;
  for(i=0;i<accountNumber.length;i++)
    {
      modulo= parseInt(modulo+accountNumber.substr(i,1))%97;
    }
  return modulo;
}