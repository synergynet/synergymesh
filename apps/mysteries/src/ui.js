var categories = document.getElementById('mystery_category');
categories.selectedIndex = 0;
var mystery = document.getElementById('mystery_selector');
var items = [];
var values = [];
var setFilters = function (event) {
    var val = categories.options[categories.selectedIndex].value;
    if(val == ""){
        mystery.setAttribute("disabled", "disabled");
        items = ["--- Select Category First ---"];
        values = [];
    }else{
        mystery.removeAttribute("disabled");
        switch(val){
            case 'algorithms':
                items = ["Algorithms - Egg", "Algorithms - Jam"];
                values = ["algorithms-egg", "algorithms-jam"];
            break;
            case 'mathematics':
                items = ["Cat Food Conundrum", "Waltzer", "Charlies", "Dan", "School Trip", "Money Trail", "Triplets"];
                values = ["judith", "waltzer", "charlie", "dan", "school_trip", "money_trail", "triplets"];
            break;
            case 'logic':
                items = ["Dinner Disaster", "Meet Up", "Sports Day", "Swimming"];
                values = ["dinner_disaster", "meet_up", "sports_day", "swimmer"];
            break;
            case 'history':
                items = ["Mary and Archie", "Great Fire of London", "Robert Dixon", "Senghenydd Colliery Disaster", "Sneaky Sydney", "Wilf"];
                values = ["mary", "london", "robert_dixon", "senghenydd", "sneaky_sydney", "wilf"];
            break;
        }
        
    } 
    var str = ""
    var num = 0;
    for (var item of items) {
        str += "<option value='"+values[num]+"'>" + item + "</option>"
        num++;
    }
    mystery.innerHTML = str;
};

document.addEventListener("DOMContentLoaded", setFilters, false);
document.getElementById('mystery_category').addEventListener('change',setFilters, false);
