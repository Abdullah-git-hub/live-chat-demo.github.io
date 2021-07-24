function checkTxt(txt){
    var slangs = [
        "magix","fuck","bainsod", "bainchod", "behenchod", "magi", "madarsod", "madarchod", "madarcap", "motherchod", "kuttar", "kutta", "kutta", "halar", "hala", "hla", "hlaa", "khakir","sex", "sexy", "bitch", "khankir"
    ];
    var txtArr = txt.split(" ");
    var slangLen = slangs.length;
    var txtLen = txtArr.length;
    var finTxtArr = [];
    for(i = 0; i < txtLen; i++){
        var txtSlice1 = txtArr[i];
        var lowCase = txtArr[i].toLowerCase();
        var finTxtSlice = txtSlice1;
        // console.log(lowCase);

        var isIncluded = slangs.includes(lowCase);
        if(isIncluded == true){
            finTxtSlice = "****";
        }else{
            // finTxtSlice = checkEmoji(finTxtSlice);
        }
        
        finTxtArr.push(finTxtSlice);
    }

    return finTxtArr.join(" ");
}

function checkEmoji(p){
    if(p === ":-)" || p === ":)"){
        return "&#128578";
    }else if(p === ";-)" || p === ";)"){
        return "&#128540";
    }else if(p === ":-(" || p === ":("){
        return "&#128577";
    }else if(p === ":-|" || p === ":|"){
        return "&#128528";
    }else if(p === "^_^"){
        return "&#128522";
    }else if(p === ':")'){
        return "&#129319";
    }else if(p === "$/"){
        return "&#128565";
    }else if(p === ":-/" || p === ":/"){
        return "&#128533";
    }else{
        return 
    }
}

// cursor styling

// let cursorDiv = document.getElementById("cursor");
// window.addEventListener("mousemove",function(e){
//     cursorDiv.style.top = `${e.pageY}px`;
//     cursorDiv.style.left = `${e.pageX}px`;
// })

// function showImg(p){
//     showingImg.setAttribute("src", p);
//     imgShowBack.style.display = "block";
//     imgShowCon.style.display = "block";
// }

// image showing

const imgShowBack = document.getElementById("imgShowBack");
const imgShowCross = document.getElementsByClassName("corss_i")[0];
const imgShowCon = document.getElementsByClassName("imgShow")[0];
const showingImg = document.getElementById("showImg");
const trgtImg = document.getElementsByClassName("sendedImg");
const imgDownloadLink = document.getElementById("imgDownload");

function initImg(){
    for(i = 0; i < trgtImg.length; i++){
        trgtImg[i].addEventListener("click", function(e){
            let link = e.target.getAttribute("src");
            showingImg.setAttribute("src", link);
            var downloadLink = getDownloadLink(link)
            imgDownloadLink.setAttribute("download", downloadLink);
            console.log(downloadLink);
            imgShowCon.style.display = "flex";
            imgShowBack.style.display = "block";
        });
    }
};

imgShowBack.addEventListener("click", function(){
    imgShowCon.style.display = "none";
    imgShowBack.style.display = "none";
})

imgShowCross.addEventListener("click", function(){
    imgShowCon.style.display = "none";
    imgShowBack.style.display = "none";
})

function getDownloadLink(p){
    var realLink = p;
    var altStart = p.search("alt");
    if(altStart != -1){
        var slStart = altStart - 1;
        var downLink = p.slice(0, slStart);
        return downLink;
    }else{
        return realLink;
    }
}
