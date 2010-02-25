/********************************************************************
 C&R研究所刊 「マッシュアップかんたんAtoZ」 サンプルコード
.....................................................................
 CAPTER 5 - Agito みんなの秘密基地 テンプレート管理
.....................................................................
 (C) 2007 M.HONDA
********************************************************************/

//-------------------------------------------------------------------
// グローバル変数

var _tplBuffer = new Array();
var _tplCnt = 0;

//-------------------------------------------------------------------
// テンプレートを読み込む

function readTemplate(fileName,tplName)
    {
    var request = GXmlHttp.create();
    var targetStr

    fileName += getKillCacheCode("?");

    request.open("GET", fileName , true);
    _tplCnt++;
    request.onreadystatechange = function()
        {
        if (request.readyState == 4)
            {
            _tplCnt--;
            targetStr = request.responseText.replace(/[\n\r]/g,"");
            targetStr = targetStr.replace(/\"/g,"\\\"");
            eval("_tplBuffer[\"" + tplName + "\"]" + "=\"" + targetStr + "\"");
            }
        }
    request.send(null);
    }


//-------------------------------------------------------------------
// 指定したテンプレートの読み込み完了確認

function chkTemplate() {
    return _tplCnt ? false : true;
}

//-------------------------------------------------------------------
// テンプレート内の可変部分差し替え

function replaceTemplate(tplName,arg) {
    if (chkTemplate()) {
        var sOut = _tplBuffer[tplName];
        for (tName in arg)
            {
            sOut = eval("sOut.replace(/__" + tName + "__/g,arg[tName])");
            }
        return sOut;
    }
    else {
        return "&nbsp;";
    }
}

// EOF
