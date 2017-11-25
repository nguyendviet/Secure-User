$(()=>{
    $('.btn-save-note').on('click', ()=>{
        var token = localStorage.getItem('token'); // get token from localstorage
        var tokenObj = {
            token: token
        };
        var content = $('textarea').val();
        var contentObj = {
            entry: content
        };

        $.ajax({
            url: '/note/new',
            method: 'POST',
            data: contentObj,
            headers: tokenObj
        })
        .done((result)=>{
            console.log(result);
        });
    });
});