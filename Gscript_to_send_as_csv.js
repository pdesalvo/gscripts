function onOpen(e) {
   SpreadsheetApp.getUi()
       .createMenu('Custom')
       .addItem('Send Email', 'SendEmail')
       .addToUi();
 }

/* ---- Script to send an E-Mail ---- */

function onlyToAddTheDriveScope() {
	DriveApp.getRootFolder();
}

function getDate() {
	var date = new Date();
	var dateofDay = new Date(date.getTime());
	return Utilities.formatDate(dateofDay, "GMT+05:30", "dd-MM-yyyy hh:mm:ss a"); // IST
}

function SendEmail()
{
  var ssID = SpreadsheetApp.getActiveSpreadsheet().getId();
  var sheetName = SpreadsheetApp.getActiveSpreadsheet().getName();

  var email = Session.getActiveUser().getEmail();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  var range = sheet.getRange("C1:C1");
  var cell = range.getValue();
  var subject = "Auto generated Google Analytics report "+getDate();
  var body = "Please see attached report";
  var requestData = {"method": "GET", "headers":{"Authorization":"Bearer "+ScriptApp.getOAuthToken()}};
  var url = "https://docs.google.com/spreadsheets/d/1evXktgY5K8OGNxc09esRNOCW-Gi1FfZYikUdzo7N_rw/export?format=csv&gid=2038325175";
  var result = UrlFetchApp.fetch(url, requestData);
  var contents = result.getContent();

	MailApp.sendEmail(cell, subject, body, {attachments:[{fileName:sheetName+".txt", content:contents, mimeType:"application//txt"}]});
}
