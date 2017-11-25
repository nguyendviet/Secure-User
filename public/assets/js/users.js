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

    // toggle options
    $('.btn-wheel').on('click', ()=>{
        $('.options-box').toggle();
        $('.profile').hide();
    });

    // delete account
    $('.btn-delete-account').on('click', ()=>{
        $('.btn-delete-account').hide();
        $('.confirm-delete').show();
    });

    // cancel delete account
    $('.btn-cancel-delete-account').on('click', ()=>{
        $('.btn-delete-account').show();
        $('.confirm-delete').hide();
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

    // toggle edit profile
    $('.btn-edit').on('click', ()=>{
        $('.profile').toggle();
    });

    // change password
    $('.btn-save-password').on('click', (e)=>{
        e.preventDefault();

        var newPassword = $('.password-new1').val().trim();
        var confirmPassword = $('.password-new2').val().trim();

        // if entered passwords don't match
        if (newPassword !== confirmPassword) {
            $('.change-password-notice').html('<div class="alert alert-danger" role="alert">The passwords you entered don\'t match.</div>');
        }
        // if entered passwords match
        else {
            var token = localStorage.getItem('token'); // get token from localstorage
            var tokenObj = {
                token: token
            };
            var newPassObj = {
                password: newPassword
            };
            
            // send request to update password
            $.ajax({
                url: '/user',
                method: 'PUT',
                data: newPassObj,
                headers: tokenObj,
                error: (err)=>{
                    message = err.responseJSON.message;
                    $('.login-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
                }
            })
            .done((newpass)=>{
                $('.change-password-notice').html('<div class="alert alert-success" role="alert">Your new password has been successfully saved.</div>');
            });
        }
    });

    // confirm delete account
    $('.btn-confirm-delete-account').on('click', ()=>{
        var token = localStorage.getItem('token'); // get token from localstorage
        var tokenObj = {
            token: token
        };

        // send delete request
        $.ajax({
            url: '/user',
            method: 'DELETE',
            headers: tokenObj,
            error: (err)=>{
                message = err.responseJSON.message;
                $('.login-notice').html('<div class="alert alert-danger" role="alert">' + message + '</div>');
            }
        })
        .done((confirm)=>{
            // if get confirm == 1
            if(confirm) {
                // send request to render deleted page
                $.ajax({
                    url: '/deleted',
                    method: 'GET'
                })
                .done((content)=>{
                    $('body').html(content);
                });
            }
            else {
                $('.notice').html('<div class="alert alert-danger" role="alert">There\'s an error. Please try again.</div>');
            }
        });
    });
});