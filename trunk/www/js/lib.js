/********************************************************************
 C&R研究所刊 「マッシュアップかんたんAtoZ」 サンプルコード
.....................................................................
 CAPTER 5 - Agito みんなの秘密基地 汎用関数（Agito専用版）
.....................................................................
 (C) 2007 M.HONDA
********************************************************************/

//-------------------------------------------------------------------
// JSONP対応APIの呼び出し

function callJsonp(url) {
    readScriptFile(url);
}

//-------------------------------------------------------------------
// 外部スクリプトファイル(UTF-8)の読み込みタグを追加する

function readScriptFile(url) {
    var s = document.createElement("script");
    s.charset = "UTF-8";
    s.type = "text/javascript";
    s.src = url;
    document.body.appendChild(s);
}

//-------------------------------------------------------------------
// APIアクセス中継（「XML2JSON」利用）

function xml2Json(url,callback) {
    var proxyUrl = "http://app.drk7.jp/xml2json/";
    var url = proxyUrl + "var=" + callback + "&url=" + escape(url);
    callJsonp(url)
}

//-------------------------------------------------------------------
// REST方式のHTTPリクエスト発行(Googleマップの利用が前提)

function requestRest(method, url, flag, callback) {
    var request = GXmlHttp.create();
    request.open(method, url, flag);
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            callback(request);
            }
        }
    request.send(null);
}

//-------------------------------------------------------------------
// キャッシュ対策のユニーク文字列を作る

function getKillCacheCode(cSep) {
    var tDate = new Date();
    return cSep + tDate.getTime();
}

//-------------------------------------------------------------------
// 指定ブロックにhtmlコードを挿入

function _d(id, htmlText) {
    document.getElementById(id).innerHTML = htmlText;
}

//-------------------------------------------------------------------
// divブロック挿入

function createDiv(id, left, top, width, height) {
    var outDiv;
    outDiv =document.createElement('div');
    outDiv.id = id;
    document.body.appendChild(outDiv);

    var tgdStyle = document.getElementById(id).style;
    tgdStyle.position = "absolute";
    tgdStyle.left = left + "px";
    tgdStyle.top = top + "px";
    tgdStyle.background = "white";
}
    
//-------------------------------------------------------------------
// divブロックの不可視化

function hideDiv(id) {
    document.getElementById(id).style.visibility ="hidden";
}

//-------------------------------------------------------------------
// div ブロックの削除

function removeDiv(id) {
    var outDiv = document.getElementById(id);
    document.body.removeChild(outDiv);
}

//-------------------------------------------------------------------
// 要素のタイプを確認する

function varChk(tgd,type) {
    return typeof(tgd) == type ? true : false;
}

// EOF
