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

    // register new user
    $('.btn-confirm-register').on('click', (e)=>{
        e.preventDefault();

        var name = $('.name-register').val().trim();
        var email = $('.email-register').val().trim();
        var password = $('.password-register').val().trim();

        // check if all fields filled
        if (!name || !email || !password) {
            message = 'All fields are required.';
            $('.register-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
            return;
        }
        else {
            var newUser = {
                name: name,
                email: email,
                password: password
            };

            // send register request
            $.ajax({
                url: '/register',
                method: 'POST',
                data: newUser,
                error: (err)=>{
                    message = err.responseJSON.message;
                    $('.login-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
                }
            })
            .done((register)=>{
                // save token to localstorage
                localStorage.setItem('token', register.token);

                var userName = newUser.name.replace(/\s/g,''); // remove spaces from user's name
                var token = localStorage.getItem('token'); // get token from localstorage
                var tokenObj = {
                    token: token
                };

                // send request to authenticate user
                $.ajax({
                    url: '/auth/' + userName,
                    method: 'POST',
                    headers: tokenObj,
                    error: (err)=>{
                        message = err.responseJSON.message;
                        $('.login-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
                    }
                })
                .done((content)=>{
                    // render page with content received from server
                    $('body').html(content);
                });
            });
        }
    });

    // sign in registered user
    $('.btn-confirm-signin').on('click', (e)=>{
        e.preventDefault();

        var email = $('.email-signin').val().trim();
        var password = $('.password-signin').val().trim();
        var user = {
            email: email,
            password: password
        };

        $.ajax({
            url: '/signin',
            method: 'POST',
            data: user,
            error: (err)=>{
                message = err.responseJSON.message;
                $('.signin-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
            }
        })
        .done((signin)=>{
            console.log(signin);
            // save token to localstorage
            localStorage.setItem('token', signin.token);

            var userName = signin.name.replace(/\s/g,''); // remove spaces from user's name
            var token = localStorage.getItem('token'); // get token from localstorage
            var tokenObj = {
                token: token
            };

            // send request to authenticate user
            $.ajax({
                url: '/auth/' + userName,
                method: 'POST',
                headers: tokenObj,
                error: (err)=>{
                    message = err.responseJSON.message;
                    $('.login-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
                }
            })
            .done((content)=>{
                // render page with content received from server
                $('body').html(content);
            });
        });
    });

    // sign out user
    $('.btn-signout').on('click', ()=>{
        // send request to logout
        $.ajax({
            url: '/signout',
            method: 'POST'
        })
        .done((content)=>{
            $('body').html(content);
        });
    });
});