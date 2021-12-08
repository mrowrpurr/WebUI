scriptName WebUI extends ReferenceAlias

string property WEBUI_RELOAD_SKSE_MOD_EVENT = "WEBUI_RELOAD_JSON" autoReadonly
string property WEBUI_ROOT_FOLDER = "Data/WebUI" autoReadonly
string property WEBUI_CONFIG_FILENAME = "webui.json" autoReadonly
string property WEBUI_DEFINITION_FILENAME = "webview.json" autoReadonly
string property JDB_WEBUI_ROOT_PATH = ".webUI" autoReadonly
string property JDB_WEBUI_CONFIG_PATH = ".webUI.config" autoReadonly
string property CONFIG_IGNORED_FOLDERS = "ignoreFolders" autoReadonly
int property KEY_REFRESH_ALL = 48 autoReadonly
int property KEY_LEFT_SHIFT = 42 autoReadonly

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
    RegisterForKey(KEY_REFRESH_ALL)
    RegisterForModEvent(WEBUI_RELOAD_SKSE_MOD_EVENT, "ReloadWebViewsFromFileSystem")
endEvent

;
; On Save Game Loads
;
event OnPlayerLoadGame()
    _webUI_Config_Map_ID = 0
    SearchForAndRegisterWebViewsFromFileSystem(WEBUI_ROOT_FOLDER)
    RegisterForKey(KEY_REFRESH_ALL)
endEvent

event ReloadWebViewsFromFileSystem()
    SearchForAndRegisterWebViewsFromFileSystem(WEBUI_ROOT_FOLDER)
endEvent

event OnKeyDown(int keyCode) 
    if keyCode == KEY_REFRESH_ALL && Input.IsKeyPressed(KEY_LEFT_SHIFT)
        SkyrimPlatformBridge.SendEvent( \
            eventName = "refreshall", \
            target = "WebUI", \
            source = "WebUI")
    endIf
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

    ;;;;; TODO !!!! Update this to NOT JValue.readFromFile. Use MiscUtil.ReadFile and PASS THE JSON CODE DIRECTLY ALONG? Maybe? Easier to let the JSON grow? I dunno.

    ; Does this folder have a webview.json?
    if MiscUtil.FileExists(fullFolderPath + "/" + WEBUI_DEFINITION_FILENAME)
        int webviewDefinition = JValue.readFromFile(fullFolderPath + "/" + WEBUI_DEFINITION_FILENAME)
        if webviewDefinition
            string webviewID = JMap.getStr(webviewDefinition, "id")
            string webviewFile = JMap.getStr(webviewDefinition, "file")
            bool isMenu = JMap.getInt(webviewDefinition, "menu") != 0
            int webviewPosition = JMap.getObj(webviewDefinition, "position")
            int width = JMap.getInt(webviewPosition, "width", 100)
            int height = JMap.getInt(webviewPosition, "height", 100)
            int x = JMap.getInt(webviewPosition, "x")
            int y = JMap.getInt(webviewPosition, "y")
            string isMenuText = "false"
            if isMenu
                isMenuText = "true"
            endIf
            bool visible = JMap.getInt(webviewDefinition, "visible") != 0
            string visibleText = "false"
            if visible
                visibleText = "true"
            endIf
            string webViewInfo = webviewID + "|" + webviewFile + "|" + x + "|" + y + "|" + width + "|" + height + "|" + isMenuText + "|" + visibleText
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
