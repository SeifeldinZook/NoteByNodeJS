// $('.form').find('input, textarea').on('keyup blur focus', function (e) {
//     var $this = $(this),
//         label = $this.prev('label');
//     if (e.type === 'keyup') {
//         if ($this.val() === '') {
//             label.removeClass('active highlight');
//         } else {
//             label.addClass('active highlight');
//         }
//     } else if (e.type === 'blur') {
//         if ($this.val() === '') {
//             label.removeClass('active highlight');
//         } else {
//             label.removeClass('highlight');
//         }
//     } else if (e.type === 'focus') {
//         if ($this.val() === '') {
//             label.removeClass('highlight');
//         } else if ($this.val() !== '') {
//             label.addClass('highlight');
//         }
//     }
// });

// $('.tab a').on('click', function (e) {
//     e.preventDefault();
//     $(this).parent().addClass('active');
//     $(this).parent().siblings().removeClass('active');
//     target = $(this).attr('href');
//     $('.tab-content > div').not(target).hide();
//     $(target).fadeIn(600);
// });

function getNoteID(id) {
    document.getElementById('noteID').value = id
}

function editNote(id) {
    document.getElementById('editNoteTitle').value = document.getElementById('NoteTitle' + id).innerText;
    document.getElementById('editNoteBody').innerHTML = document.getElementById('NoteBody' + id).innerHTML.trim();
    document.getElementById('noteID2').value = id
}

$(".toggle-password").click(function () {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

$(".toggle-repassword").click(function () {

    $(this).toggleClass("fa-eye fa-eye-slash");
    var input = $($(this).attr("toggle"));
    if (input.attr("type") == "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});
