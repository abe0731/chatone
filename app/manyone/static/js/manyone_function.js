/* ------------------------------------------ */
/* 処理: 数字を3桁区切りにする                      */
/* 概要:                                      */
/* 備考:                                      */
/* ------------------------------------------ */
function fnc_price_separate(num){
    return String(num).replace( /(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
}
/* ------------------------------------------ */
/* 処理: リサイズ可能にする                         */
/* 概要:                                      */
/* 備考:                                      */
/* ------------------------------------------ */
function fnc_resizable(box) {
    $("#" + box).resizable({});
}
/* ------------------------------------------ */
/* 処理: ドラッグ移動可能にする                      */
/* 概要:                                      */
/* 備考:                                      */
/* ------------------------------------------ */
function fnc_draggable(box) {
    $("#" + box).draggable({});
}
/* ------------------------------------------ */
/* 処理: セレクトユーザーBOX選択                    */
/* 概要:                                      */
/* 引数: なし                                   */
/* ------------------------------------------ */
function fnc_select_user() {
    var id = document.getElementById('user_search').value
    document.getElementById('user_boxh_' + id.replace("#", "") ).click();
    setTimeout( function() {
        $("#user_scroll_content").mCustomScrollbar("scrollTo", '#user_boxh_' + id.replace("#", ""));
    }, 1000 );
};
/* ------------------------------------------ */
/* 処理: HTMLエスケープ処理                       */
/* 概要:                                      */
/* 引数: なし                                   */
/* ------------------------------------------ */
function escapeHTML(val) {
    return $('<div>').text(val).html();
};
/* ------------------------------------------ */
/* 処理: 前回ログイン時期を返す                     */
/* 概要:                                      */
/* 引数:                                      */
/* ------------------------------------------ */
function fnc_get_last_login_timing(now, last) {
    if (last == "None") { return "未ログイン"; }
    now_dtm        = new Date(now)
    last_login_dtm = new Date(last)
    var diff       = now_dtm.getTime() - last_login_dtm.getTime();
    var day        = Math.floor(diff / 1000 / 60 / 60 / 24);
    var hour       = Math.floor(diff / 1000 / 60 / 60);
    var min        = Math.floor(diff / 1000 / 60);
    var second     = Math.floor(diff / 1000);
    last_login_timing = "1分以内"
    if (day >= 365) {
        last_login_timing = "未ログイン"
    } else if (day >= 30) {
        last_login_timing = "1ヶ月以上"
    } else if (day >= 1) {
        last_login_timing = day + 1 + "日以内"
    } else if (hour >= 1) {
        last_login_timing = hour + 1 + "時間以内"
    } else if (min >= 1) {
        last_login_timing = min + 1 + "分以内"
    }
    return last_login_timing
};
/* ------------------------------------------ */
/* 処理: ログイン状況アイコン                       */
/* 概要:                                      */
/* 引数:                                      */
/* ------------------------------------------ */
function fnc_login_status_icon(state) {
    if (!state.id) { return state.text; }
    if (state.element.label == 'ONLINE') {
        var $state = $(
            // '<span><i class="fa fa-circle text-gray"></i>&nbsp' + state.text +'</span>'
            '<span><i class="fa fa-user text-green"></i>&nbsp' + state.text + '</span>'
        );
    } else {
        var $state = $(
            '<span><i class="fa fa-user text-gray"></i>&nbsp' + state.text + '</span>'
        );
    }
    return $state;
};
