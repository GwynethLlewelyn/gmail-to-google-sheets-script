// This Google Script searchs on your Gmail account, and store the results on a Google Sheet file
// Original: https://github.com/TiagoGouvea/gmail-to-google-sheets-script/

// Add here your search query. Do your search on gmail first, copy and paste the search terms here
// Samples: "label: hiring-process", "to: sales@mycompany.com"
var SEARCH_QUERY = 'from:(gmail.com OR secondlife.com) subject:(NNVM: DAILY REPORT)';

// Main function, the one that you must select before run
function saveContent() {
  console.log("Entering function...");
  // SpreadsheetApp.getActiveSheet().clear();

  console.log(`Searching for: "${SEARCH_QUERY}"`);
  var start = 0;
  var max = 500;

  var threads = GmailApp.search(SEARCH_QUERY, start, max);
  if (threads != null) {
    console.log("Threads found 🎉");
    console.log("Paginating to collect email addresses...");
  } else {
    console.warn("No emails found within search criteria 😢");
    return;
  }

  var totalEmails = 0;
  var emails = [];
  while (threads.length > 0) {
    for (var i in threads) {
      var thread = threads[i];
      var data = thread.getLastMessageDate();
      var msgs = threads[i].getMessages();
      for (var j in msgs) {
        var msg = msgs[j];

        // Values to get and store ✏️
        var data = msg.getDate();
        var from = msg.getFrom();
        var to = msg.getTo();
        // var subject = msg.getSubject();
        var dataLine = [data, from, to];

        // Add values to array
        if (!AVOID_REPEATED_ADDRESS || (AVOID_REPEATED_ADDRESS && !addresses.includes(to))) {
          emails.push(dataLine);
          // addresses.push(to);
        }
      }
    }

    totalEmails = totalEmails + emails.length;

    // Add emails to sheet
    // appendData(2, emails);

    if (threads.length == max) {
      console.log("Reading next page...");
    } else {
      console.log("Last page readed 🏁");
    }
    start = start + max;
    threads = GmailApp.search(SEARCH_QUERY, start, max);
  }

  console.info(totalEmails + " emails added to sheet 🎉");
}

// Add contents to sheet
function appendData(newRowData) {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getActiveSheet();

  // The first three rows are reserved, so we want to insert at row 4.
  var targetRow = 4;

  // Insert one new row before the targetRow.
  // This will shift all existing data from row 4 downwards.
  sheet.insertRowsBefore(targetRow, 1);

  // Now, get the range for the newly inserted row (which is now row 4)
  // and populate it with your new data.
  // Assuming you have an array of values for the new row.
  // var newRowData = ["New Value 1", "New Value 2", "New Value 3", "New Value 4", "New Value 5"]; // Adjust column count as needed

  // Get the range for the new row (row 4, all columns that have data)
  // You might want to specify the exact number of columns if it's fixed.
  var lastColumn = sheet.getLastColumn();
  var newRowRange = sheet.getRange(targetRow, 1, 1, lastColumn);

  // Set the values for the new row
  newRowRange.setValues([newRowData]);

  // Optional: You might want to apply formatting or other operations to the new row.
}
