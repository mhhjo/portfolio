
const title = document.querySelector(".navbar-brand");
const titleTxt = title.textContent;
const titleTxtSplit = titleTxt.split("");
title.textContent = "";
console.log(titleTxtSplit);

for(let i = 0; i < titleTxtSplit.length; i ++){
    title.innerHTML += "<span>"+titleTxtSplit[i]+"</span>"
}



title.addEventListener('mouseover', function(){
    let char = 0; // 글자 수
    let timer = setInterval(mEnter, 50);

    function mEnter(){
        const span = title.querySelectorAll('span')[char];
        span.style.color = "#9FD948";
        char++
          
        if(char === titleTxtSplit.length){ // 글자 수만큼의 반복 이후
            complete();            
            return;            
        }
    }

    function complete(){
        
        clearInterval(timer);        
        timer = null;
    }
})

title.addEventListener('mouseleave', function(){
    let char = 0; // 글자 수
    let timer = setInterval(mEnter, 50);

    function mEnter(){
        const span = title.querySelectorAll('span')[char];
        span.style.color = "#60BF81";        
        char++
          
        if(char === titleTxtSplit.length){ // 글자 수만큼의 반복 이후
            complete();            
            return;            
        }
    }

    function complete(){
        
        clearInterval(timer);        
        timer = null;
    }
})

