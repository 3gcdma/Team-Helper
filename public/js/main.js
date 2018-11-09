

function make_home() {
    var home_title = document.getElementById('home');
    var doc = document.getElementById('home_list');
    database.ref('USER/' + auth.currentUser.uid).once('value').then((snap) => {
        home_title.innerText = snap.val().name + '님 오늘도 좋은하루 보내세요!\n' + '마지막 로그인날짜 : ' + new Date(snap.val().last_login);

        var to_do_list = new Array;
        var to_read_list = new Array;

        for (var prop in snap.val().GROUP_LIST) {
            database.ref('GROUP/' + prop + '/').once('value').then((gsnap) => {

                var cnt = 0;
                for (var pprop in gsnap.val().CHAT) {
                    if (gsnap.val().CHAT[pprop].time > snap.val().last_login) {
                        cnt++;
                    }
                }
                to_read_list.push([gsnap.val().name, cnt]);

                for (var pprop in gsnap.val().Calendar) {
                    var end = new Date(gsnap.val().Calendar[pprop].enddate);
                    var start = new Date(gsnap.val().Calendar[pprop].startdate);
                    console.log(end, start);
                    if (end > Date.now() && start < Date.now()) {
                        doc.innerHTML += '<li>' +
                            '<a>' + gsnap.val().Calendar[pprop].title + '</a>' +
                            '<a class="float-right">' + gsnap.val().Calendar[pprop].enddate + '</a>' +
                            '<p>' + gsnap.val().name + '</p>' +
                            '</li>'
                    }
                }

            })
        }
    })
}