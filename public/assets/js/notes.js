$(()=>{
    $('.btn-note').on('click', ()=>{
        var token = localStorage.getItem('token'); // get token from localstorage
        var tokenObj = {
            token: token
        };

        $('.note-box').toggle();

        $.ajax({
            url: '/note/show',
            method: 'POST',
            headers: tokenObj
        })
        .done((result)=>{
            $('.old-notes').html('');

            for (var i = 0; i < result.length; i+=1) {
                var content = result[i].entry;
                var note = $('<div>');
                note.append(content);
                $('.old-notes').append(note);
            };
        });
    });

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
            $('.old-notes').html('');
            for (var i = 0; i < result.length; i+=1) {
                var content = result[i].entry;
                var note = $('<div>');
                note.append(content);
                console.log(content);
                $('.old-notes').append(note);
            };
        });
    });
});