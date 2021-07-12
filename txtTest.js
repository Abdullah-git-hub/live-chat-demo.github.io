function checkTxt(txt){
    var slangs = ["magix","bainsod", "bainchod", "behenchod", "magi", "madarsod", "madarchod", "madarcap", "motherchod", "kuttar", "kutta", "kutta", "halar", "hala", "hla", "hlaa", "khakir", "khankir"];
    var txtArr = txt.split(" ");
    var slangLen = slangs.length;
    var txtLen = txtArr.length;
    var finTxtArr = [];
    for(i = 0; i < txtLen; i++){
        var txtSlice1 = txtArr[i];
        var lowCase = txtArr[i].toLowerCase();
        var finTxtSlice = txtSlice1;
        console.log(lowCase);

        var isIncluded = slangs.includes(lowCase);
        if(isIncluded){
            finTxtSlice = "****";
        }
        finTxtArr.push(finTxtSlice);
    }

    return finTxtArr.join(" ");
}
