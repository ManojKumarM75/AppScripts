//WORKED-2023.04.30 in a active googlesheet, it saves filename, folderPath, url of all files in root folder and all sub-folder  reccursively.
//deploy as webapp. Just run then.
function listFolderContents(folder, sheet, parentName, path) {
  var contents = folder.getFiles();
  var subfolders = folder.getFolders();
  var file, data;

  while(contents.hasNext()) {
    file = contents.next();
    data = [      file.getName(),      path + "/" + parentName,      file.getUrl()    ];
    sheet.appendRow(data);
  }
  
  while(subfolders.hasNext()) {
    var subfolder = subfolders.next();
    listFolderContents(subfolder, sheet, subfolder.getName(), path + "/" + parentName);
  }
}

function listAllFolderContents() {
  var folderId = '1Y_ajVV1zLlAP3Ak_oMhXLuFZ3DlOn4Hg'; // replace with the ID of the folder you want to list
  var folder = DriveApp.getFolderById(folderId);
  var sheet = SpreadsheetApp.getActiveSheet(); //this selects the active sheet whereas the below coe selects Sheet3
  /*
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet3'); // Replace with your sheet name
  sheet.getRange(2, 1, sheet.getLastRow(), 2).clearContent();
  sheet.getRange(2, 1, data.length, 2).setValues(data);
  */
  
  sheet.clear();
  sheet.appendRow(["File Name", "Folder Path", "URL"]);

  listFolderContents(folder, sheet, folder.getName(), "");
};
