function getInputVal()
{
    var inputs = jQuery('form').find('input'),
        name = [],
        value = [];

    inputs.each(function(){
        if( jQuery(this).is(':checked') ) {
            name.push(jQuery(this).attr('name'));
            value.push(jQuery(this).attr('value'));
        }
    })

    jQuery.post('/archives/', {
        ajax: '1', 
        propName: name, 
        propValue: value,
        fromDate: jQuery( '#fromDate' ).val(),
        toDate: jQuery( '#toDate' ).val()
    }, function(data){
        var section = jQuery(data).find('section.search').html();
        jQuery('section.search').empty().append(section);
        stButtons.locateElements();
    });
};
jQuery(document).ready(function(){
    var inputs = jQuery('aside.search form').find('input');
        if(window.startDateFn){
            var defaultDate = startDateFn();
        }
        if (inputs) {
            inputs.on('click', getInputVal);
        }

    var respond = jQuery('#respond').hide();
        if(respond) {
            jQuery('a.post-comment').on('click', function(){
                respond.fadeToggle();
            })
        }

    jQuery( "#fromDate" ).datepicker({
        defaultDate: new Date(defaultDate),
        minDate: new Date(defaultDate),
        maxDate: "Now",
        changeMonth: false,
        numberOfMonths: 1,
        onSelect: function( selectedDate ) {
            jQuery( "#toDate" ).datepicker( "option", "minDate", selectedDate );
            getInputVal();
        }
    }).datepicker("setDate", new Date(defaultDate));

    jQuery( "#toDate" ).datepicker({
        defaultDate: "Now",
        minDate: new Date(defaultDate),
        maxDate: "+1",
        changeMonth: false,
        numberOfMonths: 1,
        onSelect: function( selectedDate ) {
            jQuery( "#fromDate" ).datepicker( "option", "maxDate", selectedDate );
            getInputVal();
        }
    }).datepicker("setDate", "0");
});