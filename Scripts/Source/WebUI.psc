scriptName WebUI extends ReferenceAlias

string property WEBUI_ROOT_FOLDER = "Data/WebUI" autoReadonly
string property WEBUI_CONFIG_FILENAME = "webui.json" autoReadonly
string property WEBUI_DEFINITION_FILENAME = "webview.json" autoReadonly
string property JDB_WEBUI_ROOT_PATH = ".webUI" autoReadonly
string property JDB_WEBUI_CONFIG_PATH = ".webUI.config" autoReadonly
string property CONFIG_IGNORED_FOLDERS = "ignoreFolders" autoReadonly

;
; Configuration from WebUI/webui.json
;
int _webUI_Config_Map_ID
int property WebUI_Config_Map_ID
    int function get()
        if ! _webUI_Config_Map_ID
            _webUI_Config_Map_ID = JValue.readFromFile(WEBUI_ROOT_FOLDER + "/" + WEBUI_CONFIG_FILENAME)
            if _webUI_Config_Map_ID
                JDB.solveObjSetter(JDB_WEBUI_CONFIG_PATH, _webUI_Config_Map_ID)
            endIf
        endIf
        return _webUI_Config_Map_ID
    endFunction
endProperty

;
; Mod Installation
;
event OnInit()
    SearchForAndRegisterWebViewsFromFileSystem(WEBUI_ROOT_FOLDER)
endEvent

;
; On Save Game Loads
;
event OnPlayerLoadGame()
    _webUI_Config_Map_ID = 0
    SearchForAndRegisterWebViewsFromFileSystem(WEBUI_ROOT_FOLDER)
endEvent

bool function ShouldIgnoreFolder(string folderName)
    if WebUI_Config_Map_ID
        int ignoredFolderNamesArray = JMap.getObj(WebUI_Config_Map_ID, CONFIG_IGNORED_FOLDERS)
        if ignoredFolderNamesArray
            return JArray.findStr(ignoredFolderNamesArray, folderName) > -1
        endIf
    endIf
    return false
endFunction

function SearchForAndRegisterWebViewsFromFileSystem(string fullFolderPath)
    string[] folderNameParts = StringUtil.Split(fullFolderPath, "/")
    string folderName = folderNameParts[folderNameParts.Length - 1]
    if ShouldIgnoreFolder(folderName)
        return
    endIf

    ; Does this folder have a webview.json?
    if MiscUtil.FileExists(fullFolderPath + "/" + WEBUI_DEFINITION_FILENAME)
        int webviewDefinition = JValue.readFromFile(fullFolderPath + "/" + WEBUI_DEFINITION_FILENAME)
        if webviewDefinition
            string webviewID = JMap.getStr(webviewDefinition, "id")
            string webviewFile = JMap.getStr(webviewDefinition, "file")
            bool isMenu = JMap.getInt(webviewDefinition, "menu") != 0
            int webviewPosition = JMap.getObj(webviewDefinition, "position")
            int width = JMap.getInt(webviewPosition, "width")
            int height = JMap.getInt(webviewPosition, "height")
            int x = JMap.getInt(webviewPosition, "x")
            int y = JMap.getInt(webviewPosition, "y")
            string isMenuText = "false"
            if isMenu
                isMenuText = "true"
            endIf
            string webViewInfo = webviewID + "|" + webviewFile + "|" + x + "|" + y + "|" + width + "|" + height + "|" + isMenuText
            Debug.MessageBox(webViewInfo)
            SkyrimPlatformBridge.SendEvent( \
                eventName = webviewID + "::" + "registerwebview", \
                target = "WebUI", \
                data = webViewInfo, \
                source = "WebUI")
        endIf
    endIf

    ; Does this folder have subfolders?
    string[] foldersInFolder = MiscUtil.FoldersInFolder(fullFolderPath)
    int i = 0
    while i < foldersInFolder.Length
        SearchForAndRegisterWebViewsFromFileSystem(fullFolderPath + "/" + foldersInFolder[i])
        i += 1
    endWhile
endFunction
