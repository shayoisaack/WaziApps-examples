$(function(){
    $('#dashboard-expand').on('click', function(){
        $('#dashboard-box').toggleClass('dashboard-box-full');
        $('#user').toggle();
        $('.dashboard-expand').toggleClass('dashboard-minimize');
    });
});