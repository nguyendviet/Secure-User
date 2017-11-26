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
            console.log(result[0]);
            for (var i = 0; i < result.length; i+=1) {
                var content = result[i].entry;
                console.log(content);
                $('.show-notes').html(content);
            }
        });
    });
});