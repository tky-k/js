// LINE developersのメッセージ送受信設定から発行するアクセストークン
var ACCESS_TOKEN = '<ACCESS_TOKEN>';

function doGet(e) {
  doPost(e);  
}
function doPost(e) {
  var id = "<SPREADSHEET_ID>";  
  var spreadSheets = SpreadsheetApp.openById(id);  
  var sheetName = "log";
  var spreadSheet = spreadSheets.getSheetByName(sheetName)
  var ss_url = "<SPREAD_SHEET_URL>";
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
    spreadSheet.appendRow(
      [new Date(), items[0],items[1],items[2],items[3],items[4],items[5]]
    );      
    // 応答メッセージ用のAPI
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
          'text': '追加しました。以下URLを確認してください。\n' + ss_url,
        }],
      }),
    });
    return resCode.getResponseCode();
  } catch(exp) {
    spreadSheet.appendRow(
      [new Date(), exp]
    );
    return 500;

  }
}