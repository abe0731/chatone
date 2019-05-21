/* ------------------------------------------ */
/* グローバル変数                                 */
/* ------------------------------------------ */
_SELECT_ORG_ID  ="";
_SELECT_USER_ID ="";
_SELECT_GRP_ID ="";
/* ------------------------------------------ */
/* DOMツリー構築後処理                           */
/* ------------------------------------------ */
$(document).ready(function () {
    /* ------------------------------------------ */
    /* select2 セレクトBOX            　              */
    /* ------------------------------------------ */
    $(".select2").select2()
    /* 状況変更に伴う対応が難しい。誤解を招く
    $(".select2").select2({
         templateResult: fnc_login_status_icon
        ,templateSelection: fnc_login_status_icon
    });
    */
    // タイトルを削除する
    $('.select2-selection__rendered').removeAttr('title');
    $('.select2').on('change', function(evt) {
        $('.select2-selection__rendered').removeAttr('title');
    });


    /* ------------------------------------------ */
    /* レイアウト制御                  　              */
    /* ------------------------------------------ */
    function fnc_layout_ctl() {
        var w_height        = $(window).height();
        var w_scroll_h      = w_height - 105
        var w_sidebar_h     = w_height - 10
        var w_scroll_h_harf = (w_height / 2) - 75
        // MYメニュー 内枠の白い部分 スクロール部分
        $("#sidebar-my-voice").css("height", w_scroll_h + "px");
        $("#sidebar-my-setting").css("height", w_scroll_h + "px");
        $("#sidebar-my-analyze").css("height", w_scroll_h + "px");
        $("#sidebar-my-data").css("height", w_scroll_h + "px");
        // MYメニュー 外枠の黒い部分
        $("#my_user_sidebar").css("height", w_sidebar_h + "px");

        // ユーザーモード
        if (_LAYOUT_MODE == 'USER') {

            // ユーザーモード共通
            $('#col-user').css("display","")
            $('#col-voice').css("display","")
            $('#col-talk').css("display","")
            $('#col-video').css('display','')
            $('#col-group').css("display","none")
            $('#col-group-talk-info').css("display","none")
            $('#col-group-talk').css("display","none")

            $('#select_user_box').css("display","")

            // MYMENU制御
            if( _LAYOUT_MYMENU == 'OPEN' ){
                // 1 USER  + VOICE + TALK
                if (_LAYOUT_USER_MODE_STATUS == 1) {
                     // 2　USER  + VOICE + TALK + MYMENU
                    _LAYOUT_USER_MODE_STATUS = 2
                // 3 USER  + VOICE + TALK + AUDIO
                } else if(_LAYOUT_USER_MODE_STATUS == 3) {
                    // 4 AUDIO + MYMENU
                    _LAYOUT_USER_MODE_STATUS = 4
                }
            } else if (_LAYOUT_MYMENU == 'CLOSE') {
                // 2　USER  + VOICE + TALK + MYMENU
                if (_LAYOUT_USER_MODE_STATUS == 2) {
                    // 1 USER  + VOICE + TALK
                    _LAYOUT_USER_MODE_STATUS = 1
                // 4 AUDIO + MYMENU
                } else if (_LAYOUT_USER_MODE_STATUS == 4) {
                    // 3 USER  + VOICE + TALK + AUDIO
                    _LAYOUT_USER_MODE_STATUS = 3
                }
            }

            // 1:[ユーザーモード]USER  + VOICE + TALK
            if ( _LAYOUT_USER_MODE_STATUS == 1 ){
                // 高さ調整
                $("#user_scroll_content").css("height", w_scroll_h + "px");
                $("#voice_scroll_content").css("height", w_scroll_h + "px");
                $("#talk_scroll_content").css("height", w_scroll_h + "px");
                // コンテンツ表示調整
                $('#col-user').css('display','')
                $('#col-talk').css('display','')
                $('#col-voice').css('display','')
                $('#col-video').css('display','none')
                // コンテンツ位置調整
                $("#col-talk").append($("#talk_content_box"))
                // コンテンツ幅調整
                $("#col-voice").css("padding-right", "15px");
                $("#col-talk").removeClass("col-xs-3");
                $("#col-talk").addClass("col-xs-6");
            // 2:[ユーザーモード]USER  + VOICE + TALK + MYMENU
            } else if (_LAYOUT_USER_MODE_STATUS == 2) {
                // 高さ調整
                $("#user_scroll_content").css("height", w_scroll_h + "px");
                $("#voice_scroll_content").css("height", w_scroll_h_harf + "px");
                $("#talk_scroll_content").css("height", w_scroll_h_harf + "px");
                // コンテンツ表示調整
                $('#col-user').css('display','')
                $('#col-talk').css('display','none')
                $('#col-voice').css('display','')
                $('#col-video').css('display','none')
                // コンテンツ位置調整
                $("#col-center-row-2").append($("#talk_content_box"))
                // コンテンツ幅調整
                $("#col-voice").css("padding-right", "15px");
                $("#col-talk").removeClass("col-xs-6")
                $("#col-talk").addClass("col-xs-3");
            // 3:[ユーザーモード]USER  + VOICE + TALK + AUDIO
            } else if (_LAYOUT_USER_MODE_STATUS == 3) {
                // 高さ調整
                $("#voice_scroll_content").css("height", w_scroll_h_harf + "px");
                $("#video_scroll_content").css("height", w_scroll_h + "px");
                $("#talk_scroll_content").css("height", w_scroll_h_harf + "px");
                // コンテンツ表示調整
                $('#col-user').css('display','')
                $('#col-talk').css('display','none')
                $('#col-voice').css('display','')
                $('#col-video').css('display','')
                // コンテンツ位置調整
                $("#col-center-row-2").append($("#talk_content_box"))
                // コンテンツ幅調整
                $("#col-voice").css("padding-right", "35px");
                $("#col-video").css("padding-left", "1px");
            // 4:[ユーザーモード]AUDIO + MYMENU
            } else if (_LAYOUT_USER_MODE_STATUS == 4) {
                // 高さ調整
                $("#video_scroll_content").css("height", w_scroll_h + "px");
                // コンテンツ表示調整
                $('#col-user').css('display','none')
                $('#col-talk').css('display','none')
                $('#col-voice').css('display','none')
                $('#col-video').css('display','')
                // コンテンツ幅調整
                $("#col-video").css("padding-left", "20px");
            }
        // グループモード
        } else if ( _LAYOUT_MODE == 'GROUP') {

            // グループモード共通
            $('#col-user').css("display","none")
            $('#col-voice').css("display","none")
            $('#col-talk').css("display","none")
            $('#col-video').css('display','none')
            $('#col-group').css("display","")
            $('#col-group-talk-info').css("display","")
            $('#col-group-talk').css("display","")

            $('#select_user_box').css("display","none")

            // MYMENU制御
            if( _LAYOUT_MYMENU == 'OPEN' ){
                // 1 GROUP + GROUPMENBER + GROUPTALK
                if (_LAYOUT_GROUP_MODE_STATUS == 1) {
                     // 2　GROUP + GROUPMENBER + GROUPTALK　+ MYMENU
                    _LAYOUT_GROUP_MODE_STATUS = 2
                }
            } else if (_LAYOUT_MYMENU == 'CLOSE') {
                // 2　GROUP + GROUPMENBER + GROUPTALK　+ MYMENU
                if (_LAYOUT_GROUP_MODE_STATUS == 2) {
                    // 1 GROUP + GROUPMENBER + GROUPTALK
                    _LAYOUT_GROUP_MODE_STATUS = 1
                }
            }

            // 1:[グループモード]GROUP + GROUPMENBER + GROUPTALK
            if ( _LAYOUT_GROUP_MODE_STATUS == 1 ){

                // 高さ調整
                $("#grp_scroll_content").css("height", w_scroll_h + "px");
                $("#talk_info_scroll_content").css("height", w_scroll_h + "px");
                $("#grp_talk_scroll_content").css("height", w_scroll_h + "px");
                // コンテンツ表示調整
                $('#col-group').css('display','')
                $('#col-group-talk-info').css('display','')
                $('#col-group-talk').css('display','')
                // コンテンツ位置調整
                $("#col-group-talk").append($("#grp_talk_content_box"))
                // コンテンツ幅調整
                $("#col-group-talk").css('padding-left','0px');
                $("#col-group-talk").css('padding-right','20px');
                $("#col-group-talk").removeClass("col-xs-3");
                $("#col-group-talk").addClass("col-xs-6");

            // 2:[グループモード]GROUP + GROUPMENBER + GROUPTALK　+ MYMENU
            } else if ( _LAYOUT_GROUP_MODE_STATUS == 2 ){

                // 高さ調整
                $("#grp_scroll_content").css("height", w_scroll_h + "px");
                $("#talk_info_scroll_content").css("height", w_scroll_h_harf + "px");
                $("#grp_talk_scroll_content").css("height", w_scroll_h_harf + "px");

                // コンテンツ表示調整
                $('#col-group').css('display','')
                $('#col-group-talk-info').css('display','')
                $('#col-group-talk').css('display','')
                // コンテンツ位置調整
                $("#col-center-grp-row-2").append($("#grp_talk_content_box"))
                // コンテンツ幅調整
                $("#col-group-talk").removeClass("col-xs-6")
                $("#col-group-talk").addClass("col-xs-3");

            }

        }
    }

    /* ------------------------------------------ */
    /* ユーザーモード切替               　              */
    /* ------------------------------------------ */
    $("#chg_user_mode").on('click',function() {
        _LAYOUT_MODE   = 'USER'
        fnc_layout_ctl()
    })
    /* ------------------------------------------ */
    /* グループモード切替               　              */
    /* ------------------------------------------ */
    $("#chg_group_mode").on('click',function() {
        _LAYOUT_MODE   = 'GROUP'
        fnc_layout_ctl()
    })
    /* ------------------------------------------ */
    /* MYメニュー表示                　              */
    /* ------------------------------------------ */
    $("#nav_user_prof").on('click', function () {
        if( $('#my_user_sidebar').hasClass('control-sidebar-open') ){
          // OPEN
          _LAYOUT_MYMENU = 'OPEN'
           fnc_layout_ctl()

          /* ------------------------------------------ */
          /* [個人集計]ボイス集計取得                       */
          /* ------------------------------------------ */
          _SOK.emit('sok_cli_common_my_voice_tatal_get',{});
          /* ------------------------------------------ */
          /* [個人集計]トーク集計取得                        */
          /* ------------------------------------------ */
          _SOK.emit('sok_cli_common_my_talk_tatal_get',{});
          /* ------------------------------------------ */
          /* [個人集計]ビデオ集計取得                       */
          /* ------------------------------------------ */
          _SOK.emit('sok_cli_common_my_video_tatal_get',{});


        } else {
          // CLOSE
          _LAYOUT_MYMENU = 'CLOSE'
          fnc_layout_ctl()
        }
    })
    /* ------------------------------------------ */
    /* AUDIO開始                   　              */
    /* ------------------------------------------ */
    $("#start_audio_video").on('click',function() {
        if (_LAYOUT_USER_MODE_STATUS == 1) {
            _LAYOUT_USER_MODE_STATUS = 3
        } else if (_LAYOUT_USER_MODE_STATUS == 2) {
            _LAYOUT_USER_MODE_STATUS = 4
        }
        fnc_layout_ctl()
    })
    /* ------------------------------------------ */
    /* AUDIO終了                   　              */
    /* ------------------------------------------ */
    $("#stop_audio_video").on('click',function() {
        if (_LAYOUT_USER_MODE_STATUS == 3) {
            _LAYOUT_USER_MODE_STATUS = 1
        } else if (_LAYOUT_USER_MODE_STATUS == 4) {
            _LAYOUT_USER_MODE_STATUS = 2
        }
        fnc_layout_ctl()
    })
    /* ------------------------------------------ */
    /* ビデオサイズ変更                　              */
    /* ------------------------------------------ */
    $("#chg_width_audio_video").on('click',function() {
        /* Pendding
        $('#my-video-test-h').css("width","50%")
        $('#test-video').css("width","50%")
        $('#my-video-test-f').css("width","50%")
        */
    })

    /*
    $("#nav_user_prof").on('click', function () {
        if( $('#my_user_sidebar').hasClass('control-sidebar-open') ){
            // open
            // 1 通常 → 2　MYメニュー
            if (_LAYOUT_STATUS == 1) {
                _LAYOUT_STATUS = 2
                fnc_layout_ctl()
            // 3 AUDIO → 4　AUDIO & AUDIO & MYメニュー
            } else if(_LAYOUT_STATUS == 3) {
                _LAYOUT_STATUS = 4
                fnc_layout_ctl()
            }
        } else {
            // close
            // 2 通常MYメニュー → 1　通常
            if (_LAYOUT_STATUS == 2) {
                _LAYOUT_STATUS = 1
                fnc_layout_ctl()
            // 4 AUDIO & MYメニュー → 3　AUDIO
            } else if (_LAYOUT_STATUS == 4) {
                _LAYOUT_STATUS = 3
                fnc_layout_ctl()
            }
        }
    })
    */

    /* ------------------------------------------ */
    /* レイアウト設定                  　              */
    /* ------------------------------------------ */
    /* ==========================================
      _LAYOUT_MODE
        USER: ユーザーモード
        GROUP: グループモード
      _LAYOUT_MYMENU
        OPEN: 開いている状態
        CLOSE: 閉じている状態
      _LAYOUT_USER_MODE_STATUS
        1: USER  + VOICE + TALK
        2: USER  + VOICE + TALK + MYMENU
        3: USER  + VOICE + TALK + AUDIO
        4: AUDIO + MYMENU
      _LAYOUT_GROUP_MODE_STATUS
        1: GROUP + GROUPMENBER + GROUPTALK
        2: GROUP + GROUPMENBER + GROUPTALK + MYMENU
       ========================================== */
    _LAYOUT_MODE              = 'USER'
    _LAYOUT_MYMENU            = 'CLOSE'
    _LAYOUT_USER_MODE_STATUS  = 1
    _LAYOUT_GROUP_MODE_STATUS = 1
    // 初期表示レイアウト
    fnc_layout_ctl()
    $(window).resize(function() {
        // ウィンドウリサイズ時
        fnc_layout_ctl()
    });






    /* ------------------------------------------ */
    /* [ユーザーBOX]状況変更 ログイン    　              */
    /* ------------------------------------------ */
    _SOK.on('sok_cli_user_login', function(msg) {
        var w_org_id     = msg.org_id
        var w_user_id    = msg.user_id
        $('#user_box_status_' + w_org_id + '_' + w_user_id).empty()
        $('#user_box_status_' + w_org_id + '_' + w_user_id).append(
            "<small class='label label-primary'>ログイン中</small>"
        )
        // 点滅
        /*
        var cnt = 0
        var id = setInterval(
                     function(){$('#user_box_status_' + w_org_id + '_' + w_user_id).fadeOut(1500,function(){$(this).fadeIn(500)});
                        if(cnt > 150) {clearInterval(id)} cnt++;} // about 5min
                    ,1000
                );
        $('#user_boxh_' + w_org_id + '_' + w_user_id).on('click', function(){
            // 点滅解除
            clearInterval(id)
        })
        */
    })
    /* ------------------------------------------ */
    /* [ユーザーBOX]状況変更 ログアウト                  */
    /* ------------------------------------------ */
    _SOK.on('sok_cli_user_logout', function(msg) {
        var w_org_id     = msg.org_id
        var w_user_id    = msg.user_id
        $('#user_box_status_' + w_org_id + '_' + w_user_id).empty()
        $('#user_box_status_' + w_org_id + '_' + w_user_id).append(
            "<small class='label bg-gray'>ログアウト</small>"
        )
        // 点滅
        /*
        var cnt = 0
        var id = setInterval(
                     function(){$('#user_box_status_' + w_org_id + '_' + w_user_id).fadeOut(1500,function(){$(this).fadeIn(500)});
                        if(cnt > 150) {clearInterval(id)} cnt++;} // about 5min
                    ,1000
                );
        $('#user_boxh_' + w_org_id + '_' + w_user_id).on('click', function(){
            // 点滅解除
            clearInterval(id)
        })
        */
    })
    /* ------------------------------------------ */
    /* [ユーザーBOX]ホバー設定                         */
    /* ------------------------------------------ */
    $("[id^=user_boxh_]").hover(
      function () {
        if ( _SELECT_ORG_ID == this.id.split("_")[2] && _SELECT_USER_ID == this.id.split("_")[3]) {
            $(this).css("background","rgba(255, 0, 0, 0.2)");
        } else {
            $(this).css("background","#EEEEEE");
        }
      },
      function () {
        if ( _SELECT_ORG_ID == this.id.split("_")[2] && _SELECT_USER_ID == this.id.split("_")[3]) {
            $(this).css("background","rgba(255, 0, 0, 0.3)");
        } else {
            $(this).css("background","#fff");
        }
      }
    );
    /* ------------------------------------------ */
    /* [グループBOX]ホバー設定                         */
    /* ------------------------------------------ */
    $("[id^=grp_boxh_]").hover(
      function () {
        if ( _SELECT_GRP_ID == this.id.split("_")[2]) {
            $(this).css("background","rgba(255, 0, 0, 0.2)");
        } else {
            $(this).css("background","#EEEEEE");
        }
      },
      function () {
        if ( _SELECT_GRP_ID == this.id.split("_")[2]) {
            $(this).css("background","rgba(255, 0, 0, 0.3)");
        } else {
            $(this).css("background","#fff");
        }
      }
    );
    /* ------------------------------------------ */
    /* [ユーザーBOX]ユーザーBOX選択                    */
    /* ------------------------------------------ */
    $("[id^=user_boxh_]").on('click', function () {
        // 選択ユーザー情報を変数に設定
        _SELECT_ORG_ID  = this.id.split("_")[2];
        _SELECT_USER_ID = this.id.split("_")[3];
        var w_user_boxh = "user_boxh_" + _SELECT_ORG_ID + "_" + _SELECT_USER_ID
        var w_user_boxb = "user_boxb_" + _SELECT_ORG_ID + "_" + _SELECT_USER_ID

        // 他ユーザーのBOXを初期値に戻す
        $("[id^=user_boxh_]").css({
             'background-color':'white'
            ,'opacity': 1
            ,'color':'#444'
        })
        $("[id^=user_boxb_]").css({
             'border-color':'white'
        })
        // 選択したユーザーBOXの色調整
        $("#" + w_user_boxh ).css({
             'background-color':'rgba(255,0,0,0.3)'
            ,'color':'white'
        })
        $("#" + w_user_boxb ).css({
             'border-color':'rgba(255,0,0,0.3)'
        })
        // 選択したユーザー情報を送信
        _SOK.emit('sok_srv_user_visit', {
             visit_org_id  : this.id.split("_")[2]
            ,visit_user_id : this.id.split("_")[3]
        });
        /* ------------------------------------------ */
        /* [ボイスBOX]ユーザーBOX選択時処理                 */
        /* ------------------------------------------ */
        $('div#voice').empty();
        $('div#voice').append(
            "<div id='voice_not_exist_msg' style='color: #BBBBBB;text-align: center'>"
          +      "<i class='fa fa-commenting-o fa-5x'></i>"
          +      "<h1 style='color:#BBBBBB'>ボイスがありません</h1>"
          + "</div>"
        )
         _SOK.emit('sok_srv_get_voice', {
              org_id:  this.id.split("_")[2]
             ,user_id: this.id.split("_")[3]
             ,voice_id: ""
         });
        /* ------------------------------------------ */
        /* [トークBOX]ユーザーBOX選択時処理                 */
        /* ------------------------------------------ */
        $('div#send_right_talk').empty();
        $('div#new_talk').empty();
        $('div#new_talk').append(
            "<div id='talk_not_exist_msg' style='color: #BBBBBB;text-align: center'>"
          +      "<i class='fa fa-comments-o fa-5x'></i>"
          +      "<h1 style='color:#BBBBBB'>トークがありません</h1>"
          + "</div>"
        )
        $('div#talk').empty();
         _SOK.emit('sok_srv_get_talk', {
              org_id:  this.id.split("_")[2]
             ,user_id: this.id.split("_")[3]
             ,talk_id: ""
         });

         $('div#send_right_talk').append(
             "<div class='direct-chat-info clearfix'>"
            +    "<span class='direct-chat-name pull-right'>" + _LOGIN_USER_NM + "</span>"
            + "</div>"
            + "<img class='direct-chat-img' src='/static/img/user/" + _LOGIN_USER_IMG + "'>"
            + "<div class='direct-chat-text'>"
            +     "<div class='emoji-picker-container'>"
            +         "<textarea id='text_send_talk' rows=2 placeholder='トークを入力...' class='form-control' data-emojiable='true'></textarea>"
            +         "<div style='text-align:left'>"
            +            "<button id='talk_text_size_chg' type='button' style='margin-top:5px;border-radius:10px' class='btn btn-primary btn-flat'><i class='fa fa-angle-double-down'></i></button>"
            +            "<button id='btn_send_talk' type='button' style='float:right;margin:5px;border-radius:10px' class='btn btn-primary btn-flat'>送信</button>"
            +         "</div>"
            +     "</div>"
            + "</div>"
        );

        // [トーク]絵文字
        window.emojiPicker = new EmojiPicker({
          emojiable_selector: '[data-emojiable=true]',
          assetsPath: '/static/img/',
          popupButtonClasses: 'fa fa-smile-o'
        });
        window.emojiPicker.discover();
        // [トーク]テキスト幅
        $("#talk_text_size_chg").on('click', function () {
            var w_height = $("#text_send_talk").next().height()
            if ( w_height > 55) {
                $("#talk_text_size_chg").empty()
                $("#talk_text_size_chg").append("<i class='fa fa-angle-double-down'></i>")
                $("#text_send_talk").next().height(35)
            } else {
                $("#talk_text_size_chg").empty()
                $("#talk_text_size_chg").append("<i class='fa fa-angle-double-up'></i>")
                $("#text_send_talk").next().height(275)
            }
        })
        // 連続クリックで閉じないよう、collapseを削除する
        // 0.35秒開くのを待ってから削除する
        setTimeout( function() {
            $("#" + w_user_boxh ).removeAttr("data-widget");
        }, 400 );
    });


    /* ------------------------------------------ */
    /* [グループBOX]グループBOX選択                    */
    /* ------------------------------------------ */
    $("[id^=grp_boxh_]").on('click', function () {
        // 選択ユーザー情報を変数に設定
        _SELECT_GRP_ID  = this.id.split("_")[2];
        var w_grp_boxh = "grp_boxh_" + _SELECT_GRP_ID

        // 他ユーザーのBOXを初期値に戻す
        $("[id^=grp_boxh_]").css({
             'background-color':'white'
            ,'opacity': 1
            ,'color':'#444'
        })
        // 選択したユーザーBOXの色調整
        $("#" + w_grp_boxh ).css({
             'background-color':'rgba(255,0,0,0.3)'
            ,'color':'white'
        })

        $('#select_talk_info_list').empty();
        $('#select_talk_info_list').css({
             'border':'solid 1px #BBBBBB'
        })
        /* ありえないから削除
        $('#select_talk_info_list').append(
            "<div id='grp_user_not_exist_msg' style='color: #BBBBBB;text-align: center'>"
          +      "<i class='fa fa-commenting-o fa-5x'></i>"
          +      "<h1 style='color:#BBBBBB'>メンバーがいません</h1>"
          + "</div>"
        )
        */

        $('#send_right_grp_talk').empty();
        $('#new_grp_talk').empty();
        $('#new_grp_talk').append(
            "<div id='grp_talk_not_exist_msg' style='color: #BBBBBB;text-align: center'>"
          +      "<i class='fa fa-comments-o fa-5x'></i>"
          +      "<h1 style='color:#BBBBBB'>グループトークがありません</h1>"
          + "</div>"
        )
        $('#grp_talk').empty();

         $('#send_right_grp_talk').append(
             "<div class='direct-chat-info clearfix'>"
            +    "<span class='direct-chat-name pull-right'>" + _LOGIN_USER_NM + "</span>"
            + "</div>"
            + "<img class='direct-chat-img' src='/static/img/user/" + _LOGIN_USER_IMG + "'>"
            + "<div class='direct-chat-text'>"
            +     "<div class='emoji-picker-container'>"
            +         "<textarea id='text_send_grp_talk' rows=2 placeholder='グループトークを入力...' class='form-control' data-emojiable='true'></textarea>"
            +         "<div style='text-align:left'>"
            +            "<button id='grp_talk_text_size_chg' type='button' style='margin-top:5px;border-radius:10px' class='btn btn-primary btn-flat'><i class='fa fa-angle-double-down'></i></button>"
            +            "<button id='btn_send_grp_talk' type='button' style='float:right;margin:5px;border-radius:10px' class='btn btn-primary btn-flat'>送信</button>"
            +         "</div>"
            +     "</div>"
            + "</div>"
        );

        // [グループトーク]絵文字
        window.emojiPicker = new EmojiPicker({
          emojiable_selector: '[data-emojiable=true]',
          assetsPath: '/static/img/',
          popupButtonClasses: 'fa fa-smile-o'
        });
        window.emojiPicker.discover();
        // [グループトーク]テキスト幅
        $("#grp_talk_text_size_chg").on('click', function () {
            var w_height = $("#text_send_grp_talk").next().height()
            if ( w_height > 55) {
                $("#grp_talk_text_size_chg").empty()
                $("#grp_talk_text_size_chg").append("<i class='fa fa-angle-double-down'></i>")
                $("#text_send_grp_talk").next().height(35)
            } else {
                $("#grp_talk_text_size_chg").empty()
                $("#grp_talk_text_size_chg").append("<i class='fa fa-angle-double-up'></i>")
                $("#text_send_grp_talk").next().height(275)
            }
        })

        // グループメンバーを取得
         _SOK.emit('sok_srv_get_grp_user', {
              grp_id:  this.id.split("_")[2]
         });
        // グループトークを取得
         _SOK.emit('sok_srv_get_grp_talk', {
              grp_id:  this.id.split("_")[2]
             ,grp_talk_id:  ""
         });
    });


    /* ------------------------------------------ */
    /* [ボイス]ボイス受信イベント                        */
    /* ------------------------------------------ */
     _SOK.on('sok_cli_res_get_voice', function(msg) {
        // 初期メッセージ削除
　       $('#voice_not_exist_msg').empty();
        var w_org_id            = msg.org_id
        var w_org_nm            = msg.org_nm
        var w_user_id           = msg.user_id
        var w_user_nm           = msg.user_nm
        if (!msg.profile_img_file) {
            var w_profile_img_file = "noimage.png"
        } else {
            var w_profile_img_file = msg.profile_img_file
        }
        var w_voice_id          = msg.voice_id
        var w_voice_dtm         = msg.voice_dtm
        var w_voice             = msg.voice
        var w_voice             = w_voice.replace(/\r?\n/g, '<br>');
        var w_voice             = window.emojiPicker.appendUnicodeAsImageToElement($("#EMOJI_DUMMY"),w_voice)
        var w_voice_comment_cnt = msg.voice_comment_cnt
        /* ------------------------------------------ */
        /* [ボイス][個人]ボイス配置                        */
        /* ------------------------------------------ */
        if ( _LOGIN_ORG_ID == w_org_id && _LOGIN_USER_ID == w_user_id ) {
            $('div#my_voice').append(
                "<div id='my_voice_box_" + w_voice_id + "' class='box collapsed-box' style='margin-bottom: 10px;border:solid 1px #BBBBBB'>"
              +      "<div id='my_voice_boxh_" + w_voice_id + "' class='box-header' data-widget='collapse'>"
              +          "<span class='text-muted' style='margin-left: 10px'>"
              +              "<small>" + w_voice_dtm + "</small>"
              +          "</span>"
              +          "<img style='margin-left:5px;' class='img-circle img-sm' src='/static/img/user/" + w_profile_img_file + "'>"
              +          "<div style='margin-left:45px'>"
              +              "<span>"+ w_voice + "</span>"
              +          "</div>"
              +          "<div class='box-tools'>"
              +              "<i class='fa fa-retweet' aria-hidden='true'></i> " + w_voice_comment_cnt
              +          "</div>"
              +      "</div>"
              +      "<div id='my_voice_boxb_" + w_voice_id + "' class='box-body'>"
              +          "<div id='my_voice_comment_area_"+ w_voice_id + "'>"
              +          "</div>"
              +      "</div>"
              +  "</div>"
            );
            /* ------------------------------------------ */
            /* [ボイスコメント]ヘッダー押下                        */
            /* ------------------------------------------ */
            $(document).off('click', '#my_voice_boxh_' + w_voice_id )
            $(document).on('click', '#my_voice_boxh_' + w_voice_id , function(){
                if ($('#my_voice_box_' + w_voice_id).hasClass('collapsed-box')) {
                  $('#my_voice_comment_area_' + w_voice_id).empty()
                  // ボイスコメント取得
                  _SOK.emit('sok_srv_get_voice_comment', {
                     target_voice_id: w_voice_id
                  });
                }
            });

            /* ------------------------------------------ */
            /* [ボイス]ホバー設定                             */
            /* ------------------------------------------ */
            $("#my_voice_boxh_" + w_voice_id).hover(
              function () {
                $(this).css("background","#EEEEEE");
              },
              function () {
                $(this).css("background","#fff");
              }
            );


        /* ------------------------------------------ */
        /* [ボイス][ボイスBOX]ボイス配置                    */
        /* ------------------------------------------ */
        } else {
            /*
            $('div#voice').append(
                "<div style='padding-top:10px; margin-bottom: 10px; min-height: 40px; border-top: #BBBBBB; border-top-style: solid; border-top-width: 1px;'>"
              +     "<span class='text-muted' style='margin-left: 10px'>"
              +         "<small>" + w_voice_dtm  + "</small>"
              +     "</span>"
              +     "<img style='margin-left:5px;' class='img-circle img-sm' src='/static/img/user/" + w_profile_img_file + "'>"
              +     "<div style='margin-left:45px'>"
              +         "<span>" + w_voice + "</span>"
              +     "</div>"
              +  "</div>"
            );
            */
            $('div#voice').append(
                "<div id='voice_box_" + w_voice_id + "' class='box collapsed-box' style='margin-bottom: 10px;border:solid 1px #BBBBBB'>"
              +      "<div id='voice_boxh_" + w_voice_id + "' class='box-header' data-widget='collapse'>"
              +          "<span class='text-muted' style='margin-left: 10px'>"
              +              "<small>" + w_voice_dtm + "</small>"
              +          "</span>"
              +          "<img style='margin-left:5px;' class='img-circle img-sm' src='/static/img/user/" + w_profile_img_file + "'>"
              +          "<div style='margin-left:45px'>"
              +              "<span>"+ w_voice + "</span>"
              +          "</div>"
              +          "<div class='box-tools'>"
              +              "<i class='fa fa-retweet' aria-hidden='true'></i> " + w_voice_comment_cnt
              +          "</div>"
              +      "</div>"
              +      "<div id='voice_boxb_" + w_voice_id + "' class='box-body'>"
              +          "<div id='voice_my_comment_area_"+ w_voice_id + "'>"
              +          "</div>"
              +          "<div id='voice_comment_area_"+ w_voice_id + "'>"
              +          "</div>"
              +      "</div>"
              +  "</div>"
            )

            /* ------------------------------------------ */
            /* [ボイスコメント]ヘッダー押下                        */
            /* ------------------------------------------ */
            $(document).off('click', '#voice_boxh_' + w_voice_id )
            $(document).on('click', '#voice_boxh_' + w_voice_id , function(){
                if ($('#voice_box_' + w_voice_id).hasClass('collapsed-box')) {
                  $('#voice_comment_area_' + w_voice_id).empty()
                  $('#voice_my_comment_area_' + w_voice_id).empty()
                  $('#voice_my_comment_area_' + w_voice_id).append(
                           "<div class='direct-chat-msg right'>"
                    +          "<div class='direct-chat-info clearfix'>"
                    +               "<span class='direct-chat-name pull-right'>"
                    +                    _LOGIN_USER_NM
                    +               "</span>"
                    +          "</div>"
                    +          "<img class='direct-chat-img' src='/static/img/user/" + _LOGIN_USER_IMG + "'>"
                    +          "<div class='direct-chat-text'>"
                    +              "<div class='emoji-picker-container'>"
                    +                  "<textarea id='text_send_voice_comment_" + w_voice_id + "' rows=2 placeholder='コメントを入力...' class='form-control' data-emojiable='true'></textarea>"
                    +                  "<div style='text-align:left'>"
                    +                     "<button id='voice_comment_text_size_chg_" + w_voice_id + "' type='button' style='margin-top:5px;border-radius:10px' class='btn btn-primary btn-flat'><i class='fa fa-angle-double-down'></i></button>"
                    +                     "<button id='btn_send_voice_comment_" + w_voice_id + "' type='button' style='float:right;margin:5px;border-radius:10px' class='btn btn-primary btn-flat'>送信</button>"
                    +                  "</div>"
                    +              "</div>"
                    +          "</div>"
                    +      "</div>"
                  )
                  // [ボイスコメント]絵文字
                  window.emojiPicker = new EmojiPicker({
                    emojiable_selector: '[data-emojiable=true]',
                    assetsPath: '/static/img/',
                    popupButtonClasses: 'fa fa-smile-o'
                  });
                  // [ボイスコメント]テキスト幅
                  window.emojiPicker.discover();
                  $("#voice_comment_text_size_chg_" + w_voice_id).on('click', function () {
                      var w_height = $("#text_send_voice_comment_" + w_voice_id).next().height()
                      if ( w_height > 55) {
                          $("#voice_comment_text_size_chg_" + w_voice_id).empty()
                          $("#voice_comment_text_size_chg_" + w_voice_id).append("<i class='fa fa-angle-double-down'></i>")
                          $("#text_send_voice_comment_" + w_voice_id).next().height(35)
                      } else {
                          $("#voice_comment_text_size_chg_" + w_voice_id).empty()
                          $("#voice_comment_text_size_chg_" + w_voice_id).append("<i class='fa fa-angle-double-up'></i>")
                          $("#text_send_voice_comment_" + w_voice_id).next().height(275)
                      }
                  })
                  // ボイスコメント取得
                  _SOK.emit('sok_srv_get_voice_comment', {
                     target_voice_id: w_voice_id
                  });
                }
            });

            /* ------------------------------------------ */
            /* [ボイスコメント]送信ボタン押下                     */
            /* ------------------------------------------ */
            $(document).off('click', '#btn_send_voice_comment_' + w_voice_id )
            $(document).on('click', '#btn_send_voice_comment_' + w_voice_id , function(){
                voice_comment = escapeHTML($("#text_send_voice_comment_" + w_voice_id).val())
                if (voice_comment != "") {
                    // ボイスコメント登録
                    _SOK.emit('sok_srv_add_voice_comment', {
                        voice_comment: encodeURIComponent(voice_comment)
                       ,target_voice_id: w_voice_id
                    });
                }
                return false;
            });

            /* ------------------------------------------ */
            /* [ボイス]ホバー設定                             */
            /* ------------------------------------------ */
            $("#voice_boxh_" + w_voice_id).hover(
              function () {
                $(this).css("background","#EEEEEE");
              },
              function () {
                $(this).css("background","#fff");
              }
            );

/*
              +          "<div class='direct-chat-msg right'>"
              +              "<div class='direct-chat-info clearfix'>"
              +                  "<span class='direct-chat-name pull-right'>森口 亜矢</span>"
              +                  "<span class='direct-chat-timestamp pull-left'>2017/12/09 13:56:54</span>"
              +              "</div>"
              +              "<img class='direct-chat-img' src='/static/img/user/noimage.png'>"
              +              "<div class='direct-chat-text'>ggfs</div>"
              +          "</div>"
*/

         }
    });

    /* ------------------------------------------ */
    /* [ボイス]続きを読込むボタン                        */
    /* ------------------------------------------ */
     _SOK.on('sok_cli_res_get_voice_read_more_btn', function(msg) {
        var w_org_id   = msg.org_id
        var w_user_id  = msg.user_id
        var w_voice_id = msg.voice_id
        if ( _LOGIN_ORG_ID == w_org_id && _LOGIN_USER_ID == w_user_id ) {
            $('div#my_voice').append(
                "<div id='voice_read_more_" + w_voice_id + "_" + w_org_id + "_" + w_user_id + "' style='text-align:center'>"
             +     "<button type='button' class='btn btn-primary btn-box-tool' style='color:white; border: 1px solid #BBBBBB ;width:100%'>"
             +         "更に読込む"
             +     "</button>"
             +  "</div>"
            )
            $('#voice_read_more_' + w_voice_id + "_" + w_org_id + "_" + w_user_id).on('click', function () {
                $('#voice_read_more_' + w_voice_id + "_" + w_org_id + "_" + w_user_id).remove();
                _SOK.emit('sok_srv_get_voice', {
                     voice_id:  this.id.split("_")[3]
                    ,org_id:  this.id.split("_")[4]
                    ,user_id: this.id.split("_")[5]
                });
            })
        } else {
            $('div#voice').append(
                "<div id='voice_read_more_" + w_voice_id + "_" + w_org_id + "_" + w_user_id + "' style='text-align:center'>"
             +     "<button type='button' class='btn btn-primary btn-box-tool' style='color:white;border: 1px solid #BBBBBB ;width:100%'>"
             +         "更に読込む"
             +     "</button>"
             +  "</div>"
            )
            $('#voice_read_more_' + w_voice_id + "_" + w_org_id + "_" + w_user_id).on('click', function () {
                $('#voice_read_more_' + w_voice_id + "_" + w_org_id + "_" + w_user_id).remove();
                _SOK.emit('sok_srv_get_voice', {
                     voice_id:  this.id.split("_")[3]
                    ,org_id:  this.id.split("_")[4]
                    ,user_id: this.id.split("_")[5]
                });
            })
        }
    })
    /* ------------------------------------------ */
    /* [トーク]続きを読込むボタン                        */
    /* ------------------------------------------ */
     _SOK.on('sok_cli_res_get_talk_read_more_btn', function(msg) {
        var w_org_id   = msg.org_id
        var w_user_id  = msg.user_id
        var w_talk_id = msg.talk_id
        $('div#talk').append(
            "<div id='talk_read_more_" + w_talk_id + "_" + w_org_id + "_" + w_user_id + "' style='text-align:center'>"
         +     "<button type='button' class='btn btn-primary btn-box-tool' style='color:white;border: 1px solid #BBBBBB ;width:100%'>"
         +         "更に読込む"
         +     "</button>"
         +  "</div>"
        )
        $('#talk_read_more_' + w_talk_id + "_" + w_org_id + "_" + w_user_id).on('click', function () {
            $('#talk_read_more_' + w_talk_id + "_" + w_org_id + "_" + w_user_id).remove();
            _SOK.emit('sok_srv_get_talk', {
                 talk_id:  this.id.split("_")[3]
                ,org_id:  this.id.split("_")[4]
                ,user_id: this.id.split("_")[5]
            });
        })
    })
    /* ------------------------------------------ */
    /* [グループトーク]続きを読込むボタン                   */
    /* ------------------------------------------ */
     _SOK.on('sok_cli_res_get_grp_talk_read_more_btn', function(msg) {
        var w_grp_id  = msg.grp_id
        var w_grp_talk_id = msg.grp_talk_id
        $('div#grp_talk').append(
            "<div id='grp_talk_read_more_" + w_grp_talk_id + "_" + w_grp_id + "' style='text-align:center'>"
         +     "<button type='button' class='btn btn-primary btn-box-tool' style='color:white;border: 1px solid #BBBBBB ;width:100%'>"
         +         "更に読込む"
         +     "</button>"
         +  "</div>"
        )
        $('#grp_talk_read_more_' + w_grp_talk_id + "_" + w_grp_id).on('click', function () {
            $('#grp_talk_read_more_' + w_grp_talk_id + "_" + w_grp_id).remove();
            _SOK.emit('sok_srv_get_grp_talk', {
                 grp_talk_id:  this.id.split("_")[4]
                ,grp_id:  this.id.split("_")[5]
            });
        })
    })

    /* ------------------------------------------ */
    /* [ボイスコメント]ボイスコメント受信イベント               */
    /* ------------------------------------------ */
     _SOK.on('sok_cli_res_get_voice_comment', function(msg) {
        var w_voice_comment_org_id            = msg.voice_comment_org_id
        var w_voice_comment_user_id           = msg.voice_comment_user_id
        var w_voice_comment_user_nm           = msg.voice_comment_user_nm
        if (!msg.voice_comment_profile_img_file) {
            var w_voice_comment_profile_img_file = "noimage.png"
        } else {
            var w_voice_comment_profile_img_file = msg.voice_comment_profile_img_file
        }
        var w_voice_org_id            = msg.voice_org_id
        var w_voice_user_id           = msg.voice_user_id
        var w_voice_user_nm           = msg.voice_user_nm
        if (!msg.voice_profile_img_file) {
            var w_voice_profile_img_file = "noimage.png"
        } else {
            var w_voice_profile_img_file = msg.voice_profile_img_file
        }
        var w_voice_id          = msg.voice_id
        var w_voice_comment_dtm = msg.voice_comment_dtm
        var w_voice_comment     = msg.voice_comment
        var w_voice_comment     = w_voice_comment.replace(/\r?\n/g, '<br>');
        var w_voice_comment     =   window.emojiPicker.appendUnicodeAsImageToElement($("#EMOJI_DUMMY"),w_voice_comment)
        /* ------------------------------------------ */
        /* [ボイスコメント]ボイスコメント配置                    */
        /* ------------------------------------------ */

        // コメントしたユーザー自身
        if ( _LOGIN_ORG_ID == w_voice_comment_org_id && _LOGIN_USER_ID == w_voice_comment_user_id) {
            // コメント送信フォームを削除する
            $('#voice_my_comment_area_' + w_voice_id).empty()
            // コメントを追加
            $('#voice_my_comment_area_' + w_voice_id).append(
                 "<div class='direct-chat-msg right'>"
              +      "<div class='direct-chat-info clearfix'>"
              +          "<span class='direct-chat-name pull-right'>"
              +          w_voice_comment_user_nm
              +          "</span>"
              +          "<span class='direct-chat-timestamp pull-left'>"
              +          w_voice_comment_dtm
              +          "</span>"
              +      "</div>"
              +      "<img class='direct-chat-img mCS_img_loaded' src='/static/img/user/" + w_voice_comment_profile_img_file + "'>"
              +      "<div class='direct-chat-text'>"
              +           w_voice_comment
              +      "</div>"
              +  "</div>"
            )
        // 個人のコメント取得
        } else if ( _LOGIN_ORG_ID == w_voice_org_id && _LOGIN_USER_ID == w_voice_user_id) {
            $('#my_voice_comment_area_' + w_voice_id).append(
                 "<div class='direct-chat-msg right'>"
              +      "<div class='direct-chat-info clearfix'>"
              +          "<span class='direct-chat-name pull-right'>"
              +          w_voice_comment_user_nm
              +          "</span>"
              +          "<span class='direct-chat-timestamp pull-left'>"
              +          w_voice_comment_dtm
              +          "</span>"
              +      "</div>"
              +      "<img class='direct-chat-img mCS_img_loaded' src='/static/img/user/" + w_voice_comment_profile_img_file + "'>"
              +      "<div class='direct-chat-text'>"
              +           w_voice_comment
              +      "</div>"
              +  "</div>"
            )
        } else {
            $('#voice_comment_area_' + w_voice_id).append(
                 "<div class='direct-chat-msg right'>"
              +      "<div class='direct-chat-info clearfix'>"
              +          "<span class='direct-chat-name pull-right'>"
              +          w_voice_comment_user_nm
              +          "</span>"
              +          "<span class='direct-chat-timestamp pull-left'>"
              +          w_voice_comment_dtm
              +          "</span>"
              +      "</div>"
              +      "<img class='direct-chat-img mCS_img_loaded' src='/static/img/user/" + w_voice_comment_profile_img_file + "'>"
              +      "<div class='direct-chat-text'>"
              +           w_voice_comment
              +      "</div>"
              +  "</div>"
            )
        }





        /* ------------------------------------------ */
        /* [ボイス][ボイスBOX]ボイス配置                    */
        /* ------------------------------------------ */
            /*
            $('div#voice').append(
                "<div style='padding-top:10px; margin-bottom: 10px; min-height: 40px; border-top: #BBBBBB; border-top-style: solid; border-top-width: 1px;'>"
              +     "<span class='text-muted' style='margin-left: 10px'>"
              +         "<small>" + w_voice_dtm  + "</small>"
              +     "</span>"
              +     "<img style='margin-left:5px;' class='img-circle img-sm' src='/static/img/user/" + w_profile_img_file + "'>"
              +     "<div style='margin-left:45px'>"
              +         "<span>" + w_voice + "</span>"
              +     "</div>"
              +  "</div>"
            );
            */
    });



    /* ------------------------------------------ */
    /* [ボイス]ボイス追加イベント                        */
    /* ------------------------------------------ */
    _SOK.on('sok_cli_res_add_voice', function(msg) {
        var w_voice_org_id  = msg.voice_org_id
        var w_voice_user_id = msg.voice_user_id
        var w_voice         = msg.voice
        var w_voice         = w_voice.replace(/\r?\n/g, '<br>');
        var w_voice         = window.emojiPicker.appendUnicodeAsImageToElement($("#EMOJI_DUMMY"),w_voice)
        var w_voice_dtm     = msg.now_dtm
        var w_voice_id      = msg.voice_id
        /* ------------------------------------------ */
        /* [ボイス][個人]ボイス配置                        */
        /* ------------------------------------------ */
        if ( _LOGIN_ORG_ID == w_voice_org_id && _LOGIN_USER_ID == w_voice_user_id ) {
            $('div#my_voice').prepend(

                "<div id='my_voice_box_" + w_voice_id + "' class='box collapsed-box' style='margin-bottom: 10px;border:solid 1px #BBBBBB'>"
              +      "<div id='my_voice_boxh_" + w_voice_id + "' class='box-header' data-widget='collapse'>"
              +          "<span class='text-muted' style='margin-left: 10px'>"
              +              "<small>" + w_voice_dtm + "</small>"
              +          "</span>"
              +          "<img style='margin-left:5px;' class='img-circle img-sm' src='/static/img/user/" + _LOGIN_USER_IMG + "'>"
              +          "<div style='margin-left:45px'>"
              +              "<span>"+ w_voice + "</span>"
              +          "</div>"
              +          "<div class='box-tools'>"
              +              "<i class='fa fa-retweet' aria-hidden='true'></i> 0"
              +          "</div>"
              +      "</div>"
              +      "<div id='my_voice_boxb_" + w_voice_id + "' class='box-body'>"
              +          "<div id='my_voice_comment_area_"+ w_voice_id + "'>"
              +          "</div>"
              +      "</div>"
              +  "</div>"
            );
            $("#text_send_voice").next().empty();
            $("#my_voice_boxh_" + w_voice_id).hover(
              function () {
                $(this).css("background","#EEEEEE");
              },
              function () {
                $(this).css("background","#fff");
              }
            );

        /* ------------------------------------------ */
        /* [ボイス][ユーザーBOX]ログインユーザー宛のお知らせ      */
        /* ------------------------------------------ */
        } else {
            var cnt = 1
            if ($('#voice_info_' + w_voice_org_id + '_' + w_voice_user_id)[0]) {
                str_cnt = $('#voice_info_' + w_voice_org_id + '_' + w_voice_user_id).text()
                cnt = Number(str_cnt) + 1;
            } else {
                $('#user_box_tool_' + w_voice_org_id + '_' + w_voice_user_id).append(
                    "<span id='voice_info_" + w_voice_org_id + "_" + w_voice_user_id+ "'"
                  + "class='label label-info'>"
                  + "</span>"
                )
            }
            $('#voice_info_' + w_voice_org_id + '_' + w_voice_user_id).empty()
            $('#voice_info_' + w_voice_org_id + '_' + w_voice_user_id).append(cnt)
        }
    });


    /* ------------------------------------------ */
    /* [ボイスコメント]ボイスコメント追加イベント               */
    /* ------------------------------------------ */
    _SOK.on('sok_cli_res_add_voice_comment', function(msg) {
        var w_voice_id          = msg.voice_id
        var w_comment_org_id    = msg.comment_org_id
        var w_comment_user_id   = msg.comment_user_id
        var w_voice_comment     = msg.voice_comment
        var w_voice_comment     = w_voice_comment.replace(/\r?\n/g, '<br>');
        var w_voice_comment     =   window.emojiPicker.appendUnicodeAsImageToElement($("#EMOJI_DUMMY"),w_voice_comment)
        var w_voice_comment_dtm = msg.now_dtm
        /* ------------------------------------------ */
        /* [ボイスコメント]送信フォーム削除、コメント配置           */
        /* ------------------------------------------ */
        if ( _LOGIN_ORG_ID == w_comment_org_id && _LOGIN_USER_ID == w_comment_user_id ) {
            $('#voice_my_comment_area_' + w_voice_id).empty()
            $('#voice_my_comment_area_' + w_voice_id).append(
                 "<div class='direct-chat-msg right'>"
              +      "<div class='direct-chat-info clearfix'>"
              +          "<span class='direct-chat-name pull-right'>"
              +          _LOGIN_USER_NM
              +          "</span>"
              +          "<span class='direct-chat-timestamp pull-left'>"
              +          w_voice_comment_dtm
              +          "</span>"
              +      "</div>"
              +      "<img class='direct-chat-img' src='/static/img/user/" + _LOGIN_USER_IMG + "'>"
              +      "<div class='direct-chat-text'>"
              +           w_voice_comment
              +      "</div>"
              +  "</div>"
            )
        /* ------------------------------------------ */
        /* [ボイスコメント]コメント者以外                      */
        /* ------------------------------------------ */
        } else {
            /* Pendding */
        }
    });

    /* ------------------------------------------ */
    /* [トーク]トーク受信イベント                        */
    /* ------------------------------------------ */
    _SOK.on('sok_cli_res_talk', function(msg) {
　       $('#talk_not_exist_msg').empty();
        var w_org_id           =   msg.org_id
        var w_org_nm           =   msg.org_nm
        var w_user_id          =   msg.user_id
        var w_user_nm          =   msg.user_nm
        if (!msg.profile_img_file) {
            var w_profile_img_file = "noimage.png"
        } else {
            var w_profile_img_file = msg.profile_img_file
        }
        var w_talk_id  =   msg.talk_id
        var w_talk_dtm =   msg.talk_dtm
        var w_talk     =   msg.talk
        var w_talk     =   w_talk.replace(/\r?\n/g, '<br>');
        var w_talk     =   window.emojiPicker.appendUnicodeAsImageToElement($("#EMOJI_DUMMY"),w_talk)

        var w_position =   msg.position
        /* ------------------------------------------ */
        /* [トーク][トークBOX]ログインユーザーではないトーク配置     */
        /* ------------------------------------------ */
        if (w_position == 'left') {
            $('div#talk').append(
                 "<div id='left_talk' class='direct-chat-msg'>"
              +     "<div class='direct-chat-info clearfix'>"
              +         "<span class='direct-chat-name pull-left'>" + w_user_nm + "</span>"
              +         "<span class='direct-chat-timestamp pull-right'>" + w_talk_dtm + "</span>"
              +     "</div>"
              +     "<img class='direct-chat-img' src='/static/img/user/" + w_profile_img_file + "'>"
              +     "<div class='direct-chat-text'>"
              +         w_talk
              +     "</div>"
              +  "</div>"
            );
        /* ------------------------------------------ */
        /* [トーク][トークBOX]ログインユーザーのトーク配置         */
        /* ------------------------------------------ */
        } else {
            $('div#talk').append(
                "<div id='right_talk' class='direct-chat-msg right'>"
              +     "<div class='direct-chat-info clearfix'>"
              +         "<span class='direct-chat-name pull-right'>" + _LOGIN_USER_NM + "</span>"
              +         "<span class='direct-chat-timestamp pull-left'>" + w_talk_dtm + "</span>"
              +     "</div>"
              +     "<img class='direct-chat-img' src='/static/img/user/" + w_profile_img_file + "'>"
              +     "<div class='direct-chat-text'>"
              +         w_talk
              +     "</div>"
              + "</div>"
            );
        }

    });
    /* ------------------------------------------ */
    /* [トーク]トーク追加イベント                         */
    /* ------------------------------------------ */
    _SOK.on('sok_cli_add_talk', function(msg) {
         var w_talk         = msg.talk
         var w_talk         = w_talk.replace(/\r?\n/g, '<br>');
         var w_talk         =   window.emojiPicker.appendUnicodeAsImageToElement($("#EMOJI_DUMMY"),w_talk)
         var w_now_dtm      = msg.now_dtm
         var w_send_org_id  = msg.send_org_id
         var w_send_user_id = msg.send_user_id
         var w_send_user_nm = msg.send_user_nm
         if (!msg.send_user_img) {
             var w_send_user_img = "noimage.png"
         } else {
             var w_send_user_img = msg.send_user_img
         }
         var w_resv_org_id   = msg.resv_org_id
         var w_resv_user_id  = msg.resv_user_id
        /* ------------------------------------------ */
        /* [トーク][トークBOX]ログインユーザーが送信したトーク配置   */
        /* ------------------------------------------ */
        if ( (_LOGIN_ORG_ID == w_send_org_id) && (_LOGIN_USER_ID == w_send_user_id)) {
   　       $('#talk_not_exist_msg').empty();
            $('div#new_talk').prepend(
                "<div id='right_talk' class='direct-chat-msg right'>"
              +     "<div class='direct-chat-info clearfix'>"
              +         "<span class='direct-chat-name pull-right'>" + _LOGIN_USER_NM + "</span>"
              +         "<span class='direct-chat-timestamp pull-left'>" + w_now_dtm + "</span>"
              +     "</div>"
              +     "<img class='direct-chat-img' src='/static/img/user/" + _LOGIN_USER_IMG + "'>"
              +     "<div class='direct-chat-text'>"
              +         w_talk
              +     "</div>"
              + "</div>"
            );
            $("#text_send_talk").next().empty();
        }
        /* ------------------------------------------ */
        /* [トーク][ユーザーBOX]ログインユーザーあてのお知らせ      */
        /* ------------------------------------------ */
        if ( (_LOGIN_ORG_ID == w_resv_org_id) && (_LOGIN_USER_ID == w_resv_user_id)) {
            if ((_SELECT_ORG_ID == w_send_org_id) && (_SELECT_USER_ID == w_send_user_id)) {
                // トークBOX
                $('#talk_not_exist_msg').empty();
                $('div#new_talk').prepend(
                     "<div id='left_talk' class='direct-chat-msg'>"
                  +     "<div class='direct-chat-info clearfix'>"
                  +         "<span class='direct-chat-name pull-left'>" + w_send_user_nm + "</span>"
                  +         "<span class='direct-chat-timestamp pull-right'>" + w_now_dtm + "</span>"
                  +     "</div>"
                  +     "<img class='direct-chat-img' src='/static/img/user/" + w_send_user_img + "'>"
                  +     "<div class='direct-chat-text'>"
                  +         w_talk
                  +     "</div>"
                  +  "</div>"
                );
                // 効果音
                var audio = new Audio('/static/audio/notice_talk_2.mp3');
                audio.play();

            } else {
                // ユーザーBOX 未読件数
                var cnt = 1
                if ($('#talk_info_' + w_send_org_id + '_' + w_send_user_id)[0]) {
                    str_cnt = $('#talk_info_' + w_send_org_id + '_' + w_send_user_id).text()
                    cnt = Number(str_cnt) + 1;
                } else {
                    $('#user_box_tool_' + w_send_org_id + '_' + w_send_user_id).append(
                        "<span id='talk_info_" + w_send_org_id + "_" + w_send_user_id+ "'"
                      + "class='label label-warning'>"
                      + "</span>"
                    )
                }
                $('#talk_info_' + w_send_org_id + '_' + w_send_user_id).empty()
                $('#talk_info_' + w_send_org_id + '_' + w_send_user_id).append(cnt)
                // デスクトップ通知
                var Notification = window.Notification || window.mozNotification || window.webkitNotification;
                var n = new Notification(
                     "トークを受信しました"
                    ,{
                     body: w_send_user_nm + "\r\n" + w_talk.substr(0,20)
                    ,icon: "/static/img/manyone_icon.ico"
                    }
                );
                // 効果音
                var audio = new Audio('/static/audio/notise_talk.mp3');
                audio.play();
            }

        }
    });

    /* ------------------------------------------ */
    /* [トーク]送信ボタン押下                           */
    /* ------------------------------------------ */
    $(document).on('click', '#btn_send_talk', function(){
        talk = escapeHTML($("#text_send_talk").val())
        if (talk != "") {
            _SOK.emit('sok_srv_add_talk', {
                talk: encodeURIComponent(talk)
               ,target_org_id: _SELECT_ORG_ID
               ,target_user_id: _SELECT_USER_ID
            });
        }
        return false;
    });
    /* ------------------------------------------ */
    /* [グループトーク]送信ボタン押下                     */
    /* ------------------------------------------ */
    $(document).on('click', '#btn_send_grp_talk', function(){
        grp_talk = escapeHTML($("#text_send_grp_talk").val())
        if (grp_talk != "") {
            _SOK.emit('sok_srv_add_grp_talk', {
                grp_talk: encodeURIComponent(grp_talk)
               ,target_grp_id: _SELECT_GRP_ID
            });
        }
        return false;
    });
    /* ------------------------------------------ */
    /* [ボイス個人]送信フォーム                         */
    /* ------------------------------------------ */
    $('div#send_my_voice').append(
         "<div style='border:1px solid #BBBBBB; padding:5px;margin-bottom:5px;background-color:#d2d6de;border-radius:3px'>"
        +    "<div class='emoji-picker-container'>"
        +         "<textarea id='text_send_voice' rows=2 placeholder='ボイスを入力...' class='form-control' data-emojiable='true'></textarea>"
        +         "<div style='text-align:left'>"
        +            "<button id='voice_text_size_chg' type='button' style='margin-top:5px;border-radius:10px' class='btn btn-primary btn-flat'><i class='fa fa-angle-double-down'></i></button>"
        +            "<button id='btn_send_voice' type='button' style='float:right;margin:5px;border-radius:10px' class='btn btn-primary btn-flat'>送信</button>"
        +         "</div>"
        +     "</div>"
        + "</div>"
    );
    // [ボイス]絵文字
    window.emojiPicker = new EmojiPicker({
      emojiable_selector: '[data-emojiable=true]',
      assetsPath: '/static/img/',
      popupButtonClasses: 'fa fa-smile-o'
    });
    window.emojiPicker.discover();
    // [ボイス]テキスト幅
    $("#voice_text_size_chg").on('click', function () {
        var w_height = $("#text_send_voice").next().height()
        if ( w_height > 55) {
            $("#voice_text_size_chg").empty()
            $("#voice_text_size_chg").append("<i class='fa fa-angle-double-down'></i>")
            $("#text_send_voice").next().height(35)
        } else {
            $("#voice_text_size_chg").empty()
            $("#voice_text_size_chg").append("<i class='fa fa-angle-double-up'></i>")
            $("#text_send_voice").next().height(275)
        }
    })

    /*
          "<div class='input-group'>"
        +     "<textarea id='text_send_voice' placeholder='ボイスを入力...' class='form-control'  maxlength='400' style='height:53px'></textarea>"
        +     "<span id='btn_send_voice' class='input-group-btn'>"
        +         "<button type='button' class='btn btn-primary btn-flat' style='height:53px'>送信</button>"
        +     "</span>"
        + "</div>"
    */

    /* ------------------------------------------ */
    /* [ボイス個人]ボイス取得処理                       */
    /* ------------------------------------------ */
    _SOK.emit('sok_srv_get_voice', {
         org_id:  _LOGIN_ORG_ID
        ,user_id: _LOGIN_USER_ID
        ,voice_id: ""
    });
    /* ------------------------------------------ */
    /* [ボイス個人]送信ボタン押下                       */
    /* ------------------------------------------ */
    $(document).on('click', '#btn_send_voice', function(){
        voice = escapeHTML($("#text_send_voice").val())
        if (voice != "") {
            $("#text_send_voice").val("");
            _SOK.emit('sok_srv_add_voice', {
                voice: encodeURIComponent(voice)
            });
        }
        return false;
    });



    /* ------------------------------------------ */
    /* [グループ]グループメンバー受信イベント                */
    /* ------------------------------------------ */
    _SOK.on('sok_cli_get_grp_user', function(msg) {
        $('#grp_user_not_exist_msg').empty();
        var w_grp_id           =   msg.grp_id
        var w_org_id           =   msg.org_id
        var w_user_id          =   msg.user_id
        var w_user_nm          =   msg.user_nm
        if (!msg.profile_img_file) {
            var w_profile_img_file = "noimage.png"
        } else {
            var w_profile_img_file = msg.profile_img_file
        }
        var w_auth_cd =   msg.auth_cd
        var w_status  =   msg.status
        if (w_status == 'ONLINE') {
            var w_status_html  =   "<small class='label label-primary'>ログイン中</small>"
        } else {
            var w_status_html  =   "<small class='label bg-gray'>ログアウト</small>"
        }


        $('#select_talk_info_list').append(
               "<li class='item' style='padding:0px;'>"
            +      "<div id='grp_user_boxhb_" + w_org_id + "_" + w_user_id + "' class='box collapsed-box' style='margin-bottom: 0px;border-top:none'>"
            +      "<div id='grp_user_boxh_" + w_org_id + "_" + w_user_id + "' class='box-header'>"
            +          "<div class='user-block fa-minus'>"
            +              "<img class='img-circle mCS_img_loaded' src='/static/img/user/"+ w_profile_img_file + "' onerror='this.src=\"/static/img/user/noimage.png\"'>"
            +              "<span class='username' style='color: black'>"
            +                  w_user_nm
            +              "</span>"
            +              "<span class='description'>"
            +                  "<span id='grp_user_box_status_" + w_org_id + "_" + w_user_id + "' style='overflow:hidden; white-space:nowrap; width:300px; height:20px; text-overflow:ellipsis;'>"
            +                      w_status_html
            +                  "</span>"
            +              "</span>"
            +          "</div>"
            +          "<div id='grp_user_box_tool_" + w_org_id + "_" + w_user_id + "' class='box-tools'></div>"
            +      "</div>"
            +  "</li>"
        )
    });

    /* ------------------------------------------ */
    /* [グループ]グループトーク受信イベント                */
    /* ------------------------------------------ */
    _SOK.on('sok_cli_get_grp_talk', function(msg) {
        $('#grp_talk_not_exist_msg').empty();
        var w_grp_id           =   msg.grp_id
        var w_org_id           =   msg.org_id
        var w_user_id          =   msg.user_id
        var w_user_nm          =   msg.user_nm
        if (!msg.profile_img_file) {
            var w_profile_img_file = "noimage.png"
        } else {
            var w_profile_img_file = msg.profile_img_file
        }
        var w_grp_talk         =   msg.grp_talk
        var w_grp_talk         =   w_grp_talk.replace(/\r?\n/g, '<br>');
        var w_grp_talk         =   window.emojiPicker.appendUnicodeAsImageToElement($("#EMOJI_DUMMY"),w_grp_talk)
        var w_grp_talk_dtm     =   msg.grp_talk_dtm

        /* ------------------------------------------ */
        /* [グループ][グループトーク]ログインユーザー              */
        /* ------------------------------------------ */
        if ( w_org_id == _LOGIN_ORG_ID　&& w_user_id == _LOGIN_USER_ID) {
            $('#grp_talk').append(
                "<div class='direct-chat-msg right'>"
              +     "<div class='direct-chat-info clearfix'>"
              +         "<span class='direct-chat-name pull-right'>" + _LOGIN_USER_NM + "</span>"
              +         "<span class='direct-chat-timestamp pull-left'>" + w_grp_talk_dtm + "</span>"
              +     "</div>"
              +     "<img class='direct-chat-img' src='/static/img/user/" + _LOGIN_USER_IMG + "'>"
              +     "<div class='direct-chat-text'>"
              +         w_grp_talk
              +     "</div>"
              + "</div>"
            );
        /* ------------------------------------------ */
        /* [グループ][グループトーク]ログインユーザー以外          */
        /* ------------------------------------------ */
        } else {
            $('#grp_talk').append(
                 "<div class='direct-chat-msg'>"
              +     "<div class='direct-chat-info clearfix'>"
              +         "<span class='direct-chat-name pull-left'>" + w_user_nm + "</span>"
              +         "<span class='direct-chat-timestamp pull-right'>" + w_grp_talk_dtm + "</span>"
              +     "</div>"
              +     "<img class='direct-chat-img' src='/static/img/user/" + w_profile_img_file + "'>"
              +     "<div class='direct-chat-text'>"
              +         w_grp_talk
              +     "</div>"
              +  "</div>"
            );
        }

    });


    /* ------------------------------------------ */
    /* [グループトーク]グループトーク追加イベント              */
    /* ------------------------------------------ */
    _SOK.on('sok_cli_add_grp_talk', function(msg) {
         var w_grp_id   = msg.grp_id
         var w_grp_talk = msg.grp_talk
         var w_grp_talk = w_grp_talk.replace(/\r?\n/g, '<br>');
         var w_grp_talk = window.emojiPicker.appendUnicodeAsImageToElement($("#EMOJI_DUMMY"),w_grp_talk)
         var w_now_dtm  = msg.now_dtm
         var w_org_id   = msg.org_id
         var w_user_id  = msg.user_id
         var w_user_nm  = msg.user_nm
         if (!msg.user_img) {
             var w_user_img = "noimage.png"
         } else {
             var w_user_img = msg.send_user_img
         }
         console.log(w_grp_talk)
        /* ------------------------------------------ */
        /* [グループトークBOX]ログインユーザーが送信したトーク配置   */
        /* ------------------------------------------ */
        if ( _LOGIN_ORG_ID == w_org_id && _LOGIN_USER_ID == w_user_id) {
   　       $('#grp_talk_not_exist_msg').empty();
            $('#new_grp_talk').prepend(
                "<div class='direct-chat-msg right'>"
              +     "<div class='direct-chat-info clearfix'>"
              +         "<span class='direct-chat-name pull-right'>" + _LOGIN_USER_NM + "</span>"
              +         "<span class='direct-chat-timestamp pull-left'>" + w_now_dtm + "</span>"
              +     "</div>"
              +     "<img class='direct-chat-img' src='/static/img/user/" + _LOGIN_USER_IMG + "'>"
              +     "<div class='direct-chat-text'>"
              +         w_grp_talk
              +     "</div>"
              + "</div>"
            );
            $("#text_send_grp_talk").next().empty();
        /* ------------------------------------------ */
        /* [グループユーザーBOX]ログインユーザーあてのお知らせ      */
        /* ------------------------------------------ */
        } else if (_SELECT_GRP_ID == w_grp_id) {
                // トークBOX
                $('#grp_talk_not_exist_msg').empty();
                $('#new_grp_talk').prepend(
                     "<div class='direct-chat-msg'>"
                  +     "<div class='direct-chat-info clearfix'>"
                  +         "<span class='direct-chat-name pull-left'>" + w_user_nm + "</span>"
                  +         "<span class='direct-chat-timestamp pull-right'>" + w_now_dtm + "</span>"
                  +     "</div>"
                  +     "<img class='direct-chat-img' src='/static/img/user/" + w_user_img + "'>"
                  +     "<div class='direct-chat-text'>"
                  +         w_grp_talk
                  +     "</div>"
                  +  "</div>"
                );
                // 効果音
                var audio = new Audio('/static/audio/notice_talk_2.mp3');
                audio.play();
        /*
            } else {
                // ユーザーBOX 未読件数
                var cnt = 1
                if ($('#talk_info_' + w_send_org_id + '_' + w_send_user_id)[0]) {
                    str_cnt = $('#talk_info_' + w_send_org_id + '_' + w_send_user_id).text()
                    cnt = Number(str_cnt) + 1;
                } else {
                    $('#user_box_tool_' + w_send_org_id + '_' + w_send_user_id).append(
                        "<span id='talk_info_" + w_send_org_id + "_" + w_send_user_id+ "'"
                      + "class='label label-warning'>"
                      + "</span>"
                    )
                }
                $('#talk_info_' + w_send_org_id + '_' + w_send_user_id).empty()
                $('#talk_info_' + w_send_org_id + '_' + w_send_user_id).append(cnt)
                // デスクトップ通知
                var Notification = window.Notification || window.mozNotification || window.webkitNotification;
                var n = new Notification(
                     "トークを受信しました"
                    ,{
                     body: w_send_user_nm + "\r\n" + w_talk.substr(0,20)
                    ,icon: "/static/img/manyone_icon.ico"
                    }
                );
                // 効果音
                var audio = new Audio('/static/audio/notise_talk.mp3');
                audio.play();
*/
        }

    });


})
