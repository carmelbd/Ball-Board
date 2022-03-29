var adele = 'adele'
var aAge = getAge(4)

data = [
    {name: 'riki', age: getAge(), childs : [{name: 'roz', age: 8 }, {name: adele, age: aAge}]},
    {name: 'Shlomit', age: getAge(), childs : [{name: 'roz', age: 8 }, {name: adele, age: aAge}]},
    {name: 'Daniel', age: getAge(), childs : [{name: 'roz', age: 8 }, {name: adele, age: aAge}]}
]

function getAge(num = 28) {
    return num
}

// ======================================================================
var gNums = []

gNums = getArray(6)
function getArray(length) {
    var tempArr =[]
    for (var i = 1; i <= length; i++) {
        tempArr.push(i);
    }
    return tempArr.slice()
}

