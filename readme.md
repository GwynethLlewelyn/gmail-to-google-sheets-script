# Gmail to Google Sheet Script

This Google Script can do any search on your Gmail account, and store the results on a Google Sheet.

The search will be made on your Gmail account, from your Google Script. All data will be changed inside your account, with **no external access** to your data.

## How to use

1. Create a **new** Google Sheet
1. Access menu **Extension** > **App Script**
1. Copy the content from [gmailt-to-sheets.gs](gmailt-to-sheets.gs) to the Google Script editor, replacing the sample code there
1. Replace the value on `SEARCH_QUERY` to your real query
  - Do your search on Gmail first
  - Copy and paste the search terms there
  - A good alternative is to make use of tags/labels to filter the results, and then the query is just for that label (more efficient).
1. Click on the **Save** button (the one that looks like a floppy disk: 💾)
1. Select **saveEmails** on menu (after the **run** and **debug** buttons)
1. Click on the **Run** button
1. It will ask for authorisation at first run; proceed to accept it (it's your Gmail account authorizing your Google Script account)
1. After run, the results will be applied to your sheet

## Changing fields

If you want to save different message attributes, take a look at [gmail-message class](https://developers.google.com/apps-script/reference/gmail/gmail-message) and change your script file the code below comments with a pencil (✏️)

---
***Note:** This is a fork of [TiagoGouvea/gmail-to-google-sheets-script](https://github.com/TiagoGouvea/gmail-to-google-sheets-script)*
