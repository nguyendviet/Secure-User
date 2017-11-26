$(()=>{
    // keep scrollbar bottom
    var contentBox = $('.note-content');
    contentBox.scrollTop = contentBox.scrollHeight;

    // show note box and previous notes
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
        .done((notes)=>{
            // clear the div
            $('.old-notes').html('');

            // print out notes from server
            for (var i = 0; i < notes.length; i+=1) {
                var time = notes[i].createdAt;
                var content = notes[i].entry;
                var note = $('<div>');
                note.addClass('mb-1 pl-1 each-note');
                note.append('<p><small>' + time + '</small></p>');
                note.append('<p>' + content + '<p>');
                $('.old-notes').append(note);
            };
        });
    });

    // save new note
    $('.btn-save-note').on('click', ()=>{
        var token = localStorage.getItem('token'); // get token from localstorage
        var tokenObj = {
            token: token
        };
        var content = $('.note-content').val();
        var contentObj = {
            entry: content
        };

        $.ajax({
            url: '/note/new',
            method: 'POST',
            data: contentObj,
            headers: tokenObj
        })
        .done((notes)=>{
            // clear the div
            $('.old-notes').html('');

            // print out notes from server
            for (var i = 0; i < notes.length; i+=1) {
                var time = notes[i].createdAt;
                var content = notes[i].entry;
                var note = $('<div>');
                note.addClass('mb-1 pl-1 each-note');
                note.append('<p><small>' + time + '</small></p>');
                note.append('<p>' + content + '<p>');
                $('.old-notes').append(note);
            };

            //clear textarea
            $('.note-content').val('');
        });
    });
});