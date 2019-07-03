// LINE developersのメッセージ送受信設定から発行するアクセストークン
var ACCESS_TOKEN = '<ACCESS_TOKEN>';

function doGet(e) {
  doPost(e);  
}
function doPost(e) {
  var id = "<SPREAD_SHEET_ID>";  
  var spreadSheets = SpreadsheetApp.openById(id);  
  var sheetName = "log";
  var spreadSheet = spreadSheets.getSheetByName(sheetName)
  var ss_url = "<URL>";
  var events = JSON.parse(e.postData.contents).events;
  var msgEvents;
  events.forEach(function(event) {
    if(event.type = "message") {
      msgEvent = event;
    }
  });

  try {
    // WebHookで受信した応答用Token
    var replyToken = msgEvent.replyToken;
    // ユーザーのメッセージ
    var userMessage = msgEvent.message.text;
    var items = userMessage.split('\n');
    if (items[0] == 'ぬるぽ') {
      return replay(replyToken, 'ｶﾞｯ');
    }
    if (items[0] != '注文') {
      // 注文起動メッセージではない場合、処理終了
      return;
    }
    if (items.length != 6 && items.length != 7) {
      return replay(replyToken, 'フォーマットが誤っています');
    }
    spreadSheet.appendRow(
      [new Date(), items[1],items[2],items[3],items[4],items[5],items[6]]
    );      

    return replay(replyToken, '追加しました。以下URLを確認してください。\n' + ss_url);
  } catch(exp) {
    spreadSheet.appendRow(
      [new Date(), exp]
    );
    return 500;
  }
}

function replay(replyToken, message) {
  var url = 'https://api.line.me/v2/bot/message/reply';
  var resCode = UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': message,
      }],
    }),
  });
  return resCode.getResponseCode();
}
