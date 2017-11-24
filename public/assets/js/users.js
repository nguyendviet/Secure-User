$(()=>{
    var message = '';

    $('.btn-register').on('click', ()=>{
        // switch button colours
        $('.btn-register').attr('class', 'btn btn-outline-secondary btn-register');
        $('.btn-signin').attr('class', 'btn btn-outline-success btn-signin');
        // show register form
        $('.register-box').show();
        $('.signin-box').hide();
    });

    $('.btn-signin').on('click', ()=>{
        // switch button colours
        $('.btn-register').attr('class', 'btn btn-outline-success btn-register');
        $('.btn-signin').attr('class', 'btn btn-outline-secondary btn-signin');
        // show signin form
        $('.register-box').hide();
        $('.signin-box').show();
    });
});