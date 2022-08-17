import moment from 'moment';

function tick() {
    $('div.time-ago').each(function() {
        const value = $(this).attr('value');
        const text = moment(value).fromNow();
        $(this).html(text);
    });
}

setInterval(tick, 5 * 1000);