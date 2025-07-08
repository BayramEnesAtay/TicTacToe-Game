let states=new Map([
  ["topleft",-1],
  ["topmiddle",-1],
  ["topright",-1],
  ["middleleft",-1],
  ["middlemiddle",-1],
  ["middleright",-1],
  ["bottomleft",-1],
  ["bottommiddle",-1],
  ["bottomright",-1]
  //ulasmak ıstersek get ıle ulasıcaz.

]);


const wincombos=[
  ["topleft", "topmiddle", "topright"],
  ["middleleft", "middlemiddle", "middleright"],
  ["bottomleft", "bottommiddle", "bottomright"],
  ["topleft", "middleleft", "bottomleft"],
  ["topmiddle", "middlemiddle", "bottommiddle"],
  ["topright", "middleright", "bottomright"],
  ["topleft", "middlemiddle", "bottomright"],
  ["topright", "middlemiddle", "bottomleft"]
];

let resetbtn=document.querySelector("#reset");

resetbtn.addEventListener("click",resetclick);



let divs=document.querySelector(".container");
//genel dıve erısıp ıcındekı dıvlere tek tek tıklama ozellıgı ekleme.
//ardından tıklanıldıgındakı olayları kontrol etme.

let childdiv=divs.children;//bize htmlcollectıon dodndurur.
 let player=1;
Array.from(childdiv).forEach(function(div)
{
  div.addEventListener("click",handleFunction);
});

function resetclick()
{
  for(let key of states.keys())
  {
    states.set(key,-1);
  }

  Array.from(childdiv).forEach(function(div)
{
  div.textContent="";
  div.addEventListener("click",handleFunction);

});
}


const pargbox=document.querySelector(".paragrafhbox");


//parente ulasmadan dırek ona ulasabılırız.
document.querySelector(".parg1").style.fontWeight="bold";
document.querySelector(".parg2").style.opacity="0.5";

function handleFunction(event) {
  const clickedDiv = event.currentTarget;
  
  const idname = clickedDiv.id;
     
  if(states.get(idname)!=-1)
  {
    alert("You have clicked this div");
    return;//fonk sonlandırır.
  }
    else
    {
      document.querySelector(".parg1").style.fontWeight="normal";
      document.querySelector(".parg2").style.fontWeight="normal";
      document.querySelector(".parg1").style.opacity="1";
      document.querySelector(".parg2").style.opacity="1";

      if(player%2!=0)//cıft tek olma durumu
      {
        states.set(idname,1);
        clickedDiv.textContent="X";
      
        document.querySelector(".parg2").style.fontWeight="bold";
        document.querySelector(".parg1").style.opacity="0.5";
    }
    else if(player%2==0)//cift tek olma durumu
    { //burayı degıstırcem.
      states.set(idname,0);
      clickedDiv.textContent="O";
      document.querySelector(".parg1").style.fontWeight="bold";
      document.querySelector(".parg2").style.opacity="0.5";

    }
    player++;
    
    let result=winnerstate();
    if(result==1)
    {
      alert("Game is over, The winner is PLAYER1");

      Array.from(childdiv).forEach(function(div)
    {
      div.removeEventListener("click",handleFunction);
    });
      
    }
    else if(result ==0 )
    {
      alert("Game is over, The winner is PLAYER2");
      Array.from(childdiv).forEach(function(div)
    {
      div.removeEventListener("click",handleFunction);
    });//bu sayede oyun bıtınce tıklama ozellıgını kapattık.kaldırdık.
    }

  }

}



function winnerstate()
{

    for(let winner of wincombos )
    {
        let a=winner[0];
        let b=winner[1];
        let c=winner[2];

        const vala=states.get(a);
        const valb=states.get(b);
        const valc=states.get(c);

        if(vala ==1 && valb==1 && valc==1 && vala!=-1)
        {
          return vala;//1.oyuncunun kazandıgını gostermek ıcın.
        }
        else if(vala==0 && valb==0 && valc==0 && vala!=-1)
        {
          return vala;
        }
        

      
    }
    return null;//eger hepsının sonucunnda bulunamamıssa.


}



