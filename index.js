const baseurl="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdown=document.querySelectorAll(".selecter");
const fromCurr=document.querySelector(".from .select select");
const toCurr=document.querySelector(".to .select select");
const msg=document.querySelector(".msg");
for(let select of dropdown)
{
    for(currcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD")
        {
            newOption.selected="selected";
            
        }
        else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
   let img= element.parentElement.querySelector("img");
   img.src=newSrc;
};

let btn=document.querySelector("button");
btn.addEventListener("click",async (eve)=>{
    eve.preventDefault();//when we click to button then defaulty plage reload to stop this we use preventDefault();
    let amount=document.querySelector("input");
   let amtvalue=amount.value;
   if(amtvalue===""|| amtvalue<1)
   {
    amtvalue=1;
   }
   console.log(fromCurr.value.toLowerCase())
 const URL=`${baseurl}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
 let response=await fetch(URL);
 let data=await response.json();
 console.log(data);
 let rate=data[toCurr.value.toLowerCase()];
 let finalamount=rate*amtvalue;
 msg.innerText=`${amtvalue}${fromCurr.value.toUpperCase()} = ${finalamount} ${toCurr.value.toUpperCase()}`;
});
