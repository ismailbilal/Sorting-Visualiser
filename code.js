var inputs = document.querySelectorAll("input");
var buttons = document.querySelectorAll("button");
var navs = document.querySelectorAll("nav");

var viewSelect = navs[0];
var viewBulle = navs[1];
var viewInsert = navs[2];
var viewQuick = navs[3];

var em = new Array();
var numbersToSort = new Array();

var range = inputs[0];
var resetAll = buttons[0];
var sortAll = buttons[1];
var resetSelect = buttons[2];
var sortSelect = buttons[3];
var resetBulle = buttons[4];
var sortBulle = buttons[5];
var resetInsert = buttons[6];
var sortInsert = buttons[7];
var resetQuick = buttons[8];
var sortQuick = buttons[9];

var check = true;

var speed = 500;

var x = parseFloat(range.value);


document.addEventListener("DOMContentLoaded", function(){
    
    reloadeAll();

    sortSelect.addEventListener("click", function(){
        sort_select();
    })
    sortBulle.addEventListener("click", function(){
        sort_bulle();
    })
    sortAll.addEventListener("click", function(){
        sort_select();
        sort_bulle();
        sort_insert();
        sort_quick();
    })
    resetSelect.addEventListener("click", function(){
        loadView(viewSelect, check, 0);
    })
    resetBulle.addEventListener("click", function(){
        loadView(viewBulle, check, x);
    })
    resetInsert.addEventListener("click", function(){
        loadView(viewInsert, check, 2*x);
    })
    sortInsert.addEventListener("click", function(){
        sort_insert();
    })
    resetQuick.addEventListener("click", function(){
        loadView(viewQuick, check, 3*x);
    })
    sortQuick.addEventListener("click", function(){
        sort_quick();
    })
    resetAll.addEventListener("click", reloadeAll)
    range.addEventListener("change", reloadeAll)
})



/*---------------------functions--------------------*/
function loadView(vi_ew, check_2, start){
    x = parseFloat(range.value);
    var emElement = "<em></em>";
    vi_ew.innerHTML = "";
    for(var i=start; i<x+start; i++){
        vi_ew.innerHTML += emElement;
    }
    if(check_2){
        for(var k=start; k<x+start; k++){
            numbersToSort[k] = nbAlea(12, 99);
        }
    }
    em = document.querySelectorAll("em");
    var aideWidgth = x*Math.log(x);
    var width = parseFloat(250 / (aideWidgth));
    var margin_right = parseFloat((100 / (x)) - width);
    var aideFontSise = parseFloat(2000 / x);
    for(var j=start; j<x+start; j++){
        em[j].style.fontSize = ""+aideFontSise+"%";
        em[j].innerHTML = numbersToSort[j];
        em[j].style.width = ""+width+"%";    
        em[j].style.height = ""+(numbersToSort[j]-2)+"%";
    }
    for(var ind=start; ind<x+start; ++ind){
        em[ind].style.marginRight = ""+margin_right+"%";
    }
}
function nbAlea(min, max) {
    return Math.floor(min +(max - min + 1)*Math.random());
}
/*---------------changes colores---------------*/
function makeItRed(i){
    em[i].style.backgroundColor = "rgb(255, 59, 59)";
}
function makeItPurple(i){
    em[i].style.backgroundColor = "#9b59bf9f";
}
function makeItBlue(i){
    em[i].style.backgroundColor = "rgb(31, 184, 204)";
}
function makeItOrange(i){
    em[i].style.backgroundColor = "rgb(255, 119, 78)";
}
/*--------------------------------------------*/
function reloadeAll(){//to reset all
    loadView(viewSelect, check, 0);
    loadView(viewBulle, check, x);
    loadView(viewInsert, check, 2*x);
    loadView(viewQuick, check, 3*x);
}
/*--------------------algorithms----------------------*/
function sort_select(){

    resetSelect.disabled = true;
    range.disabled = true;
    resetAll.disabled = true;
    sortAll.disabled = true;
    sortSelect.disabled = true;

    for(var h = 0; h < x; h++){
        makeItBlue(h);
    }
    var timaider = parseFloat((1 / (Math.exp(x/15)))*speed);
    var aideJ = 0;
    var j;
    var s = 0;
    var posMin;
    var fac = fact(x);
    var i = 1;

    j = aideJ+1;
    posMin = aideJ; 
    
    while(i < fac){
        
        i++;
                       
        setTimeout(function(){
            makeItOrange(aideJ);
        }, parseFloat((s++)*timaider));

        setTimeout(function(){
            makeItOrange(j);
        }, parseFloat((s++)*timaider));

        setTimeout(function(){
            if(numbersToSort[j] < numbersToSort[posMin]){
                if(posMin != aideJ){
                    makeItBlue(posMin);
                }
                makeItRed(j);
                posMin = j;
            }
        }, parseFloat((s++)*timaider));

        setTimeout(function(){
            if(j != posMin){
                makeItBlue(j);
            }
        }, parseFloat((s++)*timaider));

        setTimeout(function(){
            if( j == x-1){
                makeItBlue(posMin);
                if( aideJ != posMin ){
                    swap(numbersToSort, aideJ, posMin);
                }
                check = false;
                loadView(viewSelect, check, 0);
                check = true;
                j = aideJ++;

                posMin = aideJ;
                
                for(var lakhdar = 0; lakhdar<aideJ; lakhdar++){
                    makeItPurple(lakhdar);
                }
            }
            j++;
            if(aideJ == x-1){
                resetSelect.disabled = false;
                sortSelect.disabled = false;
                range.disabled = checkDisabled();
                resetAll.disabled = checkDisabled();
                sortAll.disabled = checkDisabled();
            }
        }, parseFloat((s++)*timaider));
    }
}
function sort_bulle(){

    resetBulle.disabled = true;
    range.disabled = true;
    resetAll.disabled = true;
    sortAll.disabled = true;
    sortBulle.disabled = true;

    var timaider = parseFloat((1 / (Math.exp(x/15)))*speed);
    
    var aideJ = 0;
    var j;
    var s_b = 0;
    var fac = fact(x-1);
    var i = 0;
    var i_a = 0;
    var echange = false;
    var stopSort = true;

    var set1 = new Array();
    var set2 = new Array();
    var set3 = new Array();
    var set4 = new Array();
    var set5 = new Array();

    j = x;
    
    while(i <= fac){
        i++;
        set1[i] = setTimeout(function(){
            i_a++;
            if(j != x ){
                makeItBlue(j-1);
            }
            makeItOrange(j+1);
            makeItOrange(j);
        }, parseFloat((s_b++)*timaider));

        set2[i] = setTimeout(function(){
            if( numbersToSort[j] > numbersToSort[j+1]){
                stopSort = false;
                echange = true;
                makeItRed(j+1);
                makeItRed(j);
                swap(numbersToSort, j+1, j);
            }
        }, parseFloat((s_b++)*timaider));

         set3[i] = setTimeout(function(){
            check = false;
            loadView(viewBulle, check, x);
            check = true;
            for(var lakhdar = 2*x-1; lakhdar >= 2*x-aideJ; lakhdar--){
                makeItPurple(lakhdar);
            }
            if(aideJ == x-1){
                makeItPurple(aideJ+1);
            }
        }, parseFloat((s_b++)*timaider));

        set4[i] = setTimeout(function(){
            if(echange){
                echange = false;
                makeItPurple(j);
                makeItPurple(j+1);
            }
        }, parseFloat((s_b++)*timaider));

        set5[i] = setTimeout(function(){
            j++;
            if(j == (2*x-1)-aideJ){
                makeItBlue(j-1);
                j = x;
                aideJ++;
                if(stopSort){
                    for(var stopAider = i_a+1; stopAider<=fac+1; stopAider++){
                        clearTimeout(set1[stopAider]);
                        clearTimeout(set2[stopAider]);
                        clearTimeout(set3[stopAider]);
                        clearTimeout(set4[stopAider]);
                        clearTimeout(set5[stopAider]);
                    }
                    for(var lakhdar = x; lakhdar < 2*x; lakhdar++){
                        makeItPurple(lakhdar);
                    }
                    resetBulle.disabled = false;
                    sortBulle.disabled = false;
                    range.disabled = checkDisabled();
                    resetAll.disabled = checkDisabled();
                    sortAll.disabled = checkDisabled();
                }
                stopSort = true;
            }
        }, parseFloat((s_b++)*timaider));

    }

}
function sort_insert(){
    
    resetInsert.disabled = true;
    range.disabled = true;
    resetAll.disabled = true;
    sortAll.disabled = true;
    sortInsert.disabled = true;

    var aideJ = 2*x+1;
    var j = aideJ;

    var fac = fact(x-1);
    var i = 0;
    var i_i = 0;

    var timaider = parseFloat((1 / (Math.exp(x/15)))*speed);
    var s_i = 0;

    var change = false;

    var set1 = new Array();
    var set2 = new Array();
    var set3 = new Array();
    var set4 = new Array();
    var set5 = new Array();

    while( i < fac){
        i++;
        set1[i] = setTimeout(function(){
            if(j == aideJ){
                for(var lazra9 = 2*x; lazra9 < 3*x; lazra9++){
                    makeItBlue(lazra9);
                }
            }
            makeItOrange(aideJ);
        }, parseFloat((s_i++)*timaider));
        
        set2[i] = setTimeout(function(){
            makeItOrange(j-1);
        }, parseFloat((s_i++)*timaider));

        set3[i] = setTimeout(function(){
            if(numbersToSort[j-1]>numbersToSort[j]){
                makeItRed(j);
                makeItRed(j-1);
                change = true;
            }
        }, parseFloat((s_i++)*timaider));

        set4[i] = setTimeout(function(){
            if(change){
                swap(numbersToSort, j-1, j);
                check = false;
                loadView(viewInsert, check, 2*x);
                check = true;
                makeItRed(j-1);
                makeItOrange(aideJ);
            }
            j--;
        }, parseFloat((s_i++)*timaider));

        set5[i] = setTimeout(function(){
            if(j == 2*x || change == false){
                if(aideJ == 3*x-1){
                    for(var stopAider = i_i+1; stopAider<fac+1; stopAider++){
                        clearTimeout(set1[stopAider]);
                        clearTimeout(set2[stopAider]);
                        clearTimeout(set3[stopAider]);
                        clearTimeout(set4[stopAider]);
                        clearTimeout(set5[stopAider]);
                    }
                    for( var lakhdar = 2*x; lakhdar < 3*x; lakhdar++){
                        makeItPurple(lakhdar);
                    }
                    resetInsert.disabled = false;
                    sortInsert.disabled = false;
                    range.disabled = checkDisabled();
                    resetAll.disabled = checkDisabled();
                    sortAll.disabled = checkDisabled();
                }
                aideJ++;
                j = aideJ;
            }
            change = false;
            i_i++;
        }, parseFloat((s_i++)*timaider));
    }
}
function sort_quick(){

    resetQuick.disabled = true;
    sortQuick.disabled = true;
    sortAll.disabled = true;
    resetAll.disabled = true;
    range.disabled = true;

    var start = 3*x;
    var end = 4*x;

    var index_sorted = new Array();
    var in_de = 0;
    var in_end = 0;
    var largenum = start;

    var pivot = end-1;
    index_sorted[in_de++] = pivot+1;
    var j = start;

    let change = false;
    let pass = true;

    let fac = fact(x);
    var i = 0;
    let i_q = 0;

    var timaider = parseFloat((1 / (Math.exp(x/15)))*speed);
    var s_q = 0;

    var set1 = new Array();
    var set2 = new Array();
    var set3 = new Array();
    var set4 = new Array();

    while(i < fac){
        i++;

        set1[i] = setTimeout(function(){
            makeItOrange(pivot);
        }, parseFloat((s_q++)*timaider));

        set2[i] = setTimeout(function(){
            if(numbersToSort[j] > numbersToSort[pivot]){
                makeItRed(j);
            }else{
                change = true;
                makeItOrange(j);
            }
        }, parseFloat((s_q++)*timaider));

        set3[i] = setTimeout(function(){
            if(change){
                swap(numbersToSort, j, largenum);
                largenum++;
                change = false;
                pass = false;
            }
            check = false;
            loadView(viewQuick, check, 3*x);
            check = true;

            /*
            for(var k = start; k < largenum; k++){
                makeItOrange(k);
            }
            */
            
            for(var k = largenum; k <= j; k++){
                makeItRed(k);
            }
            for(var index = 0; index < in_de-1; index++){
                makeItPurple(index_sorted[index]);
            }
            for(var k = 3*x; k < start; k++){
                makeItPurple(k);
            }
        }, parseFloat((s_q++)*timaider));

        set4[i] = setTimeout(function(){
            j++;
            if(j >= end){
                index_sorted[in_de] = largenum-1;
                index_sorted.sort(function(a, b){return a - b;});
                in_de++;
                if(end - start < 2 || pass || pivot - start < 2 || j > pivot+1){
                    in_end++;
                    start = index_sorted[in_end];
                    in_end++;
                    start++;
                    largenum = start;
                    end = index_sorted[in_end];
                }else{
                    end = largenum-1;
                    largenum = start;
                }
                pass = false;
                if(end > start){
                    pivot = end-1;
                }
                j = start;
                if(start >= 4*x){
                    for(let k = i_q; k <= fac; k++){
                        clearTimeout(set1[k]);
                        clearTimeout(set2[k]);
                        clearTimeout(set3[k]);
                        clearTimeout(set4[k]);
                    }
                    for(let k = 3*x; k < start-1; k++){
                        makeItPurple(k);
                    }
                    resetQuick.disabled = false;
                    sortQuick.disabled = false;
                    sortAll.disabled = checkDisabled();
                    resetAll.disabled = checkDisabled();
                    range.disabled = checkDisabled();
                }
            }
            i_q++;
        }, parseFloat((s_q++)*timaider));
    }
}
/*-----------------------------------------------------*/



/*--------aide sort------------*/
function swap(table, x, y){
    let c = table[x];
    table[x] = table[y];
    table[y] = c;
}
function fact(n){
    return (n == 1) ? 1: n+fact(n-1);
}
function checkDisabled(){
    return (sortSelect.disabled || sortBulle.disabled || sortInsert.disabled || sortQuick.disabled) ? true:false;
}
/*-------------------------------*/