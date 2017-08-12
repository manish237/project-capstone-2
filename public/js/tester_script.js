$('#filter-rest-sort-by-open-at-date-time').datetimepicker({
    defaultDate: "11/1/2013"
});

val = []
val.push(parseInt("0"))
val.push(parseInt("100"))
console.log(val)
str = "[100, 200]"
$("#filter-vac-price-range").slider({
    value : val //[100, 200]
});

console.log($('#filter-vac-price-range'))

$('#filter-crm-dist-range').slider({
    value : parseInt("15"),
    formatter: function(value) {
        return 'Current value: ' + value;
    }
});