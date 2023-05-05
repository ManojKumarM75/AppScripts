//WORKED 2023.04.30 
//StandAlone script. filesnames etc to some other gsheet file, to particular sheetname.
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
  var folderId = '1Go5j_6NzAkRSN92nOgw8uKYdG64k_PeI'; // replace with the ID of the folder you want to list
  var folder = DriveApp.getFolderById(folderId);
  //var sheet = SpreadsheetApp.getActiveSheet();
   
  var file, data, sheet = SpreadsheetApp.openById('1VeKoUqA8UKqdAozol8W_W-1m56K99vitZ8NNNxmhS8s').getSheetByName('Sheet3'); 
  //   Replace with your sheet name
  //sheet.getRange(2, 1, sheet.getLastRow(), 2).clearContent();
  //sheet.getRange(2, 1, data.length, 2).setValues(data);
  
  sheet.clear();
  sheet.appendRow(["File Name", "Folder Path", "URL"]);

  listFolderContents(folder, sheet, folder.getName(), "");
};
