scriptName WebUI_Impl extends ReferenceAlias

string WEBUI_ROOT_WEB_COMPONENT_FOLDER = "Data/WebUI"
string JDB_PATH_WEB_COMPONENTS         = ".webUI.components"

; On Mod Installation
event OnInit()
    RegisterWebComponentsFromFileSystem()
endEvent

; On Save Game Load
event OnPlayerLoadGame()
    RegisterWebComponentsFromFileSystem()
endEvent

function RegisterWebComponentsFromFileSystem()
    ; Gives back simple folder names, e.g. "Foo", not whole paths
    string[] uiFolders = MiscUtil.FoldersInFolder(WEBUI_ROOT_WEB_COMPONENT_FOLDER)
    int i = 0
    while i < uiFolders.Length
        string folderName = uiFolders[i]
        string webuiJsonFilePath = WEBUI_ROOT_WEB_COMPONENT_FOLDER + "/" + folderName + "/" + "webui.json"
        ; Does this folder contain a webui.json
        if MiscUtil.FileExists(webuiJsonFilePath)
            RegisterWebComponentFromJson(webuiJsonFilePath)
        else
            ; Check for subfolders
            Debug.MessageBox("TODO")
        endIf
        i += 1
    endWhile
endFunction

function GetWebComponentsMap()
    int map = JDB.solveObj(JDB_PATH_WEB_COMPONENTS)
    if ! map
        map = JMap.object()
        JDB.solveObjSetter(JDB_PATH_WEB_COMPONENTS, map, createMissingKeys = true)
    endIf
    return map
endFunction

function RegisterWebComponentFromJson(string filepath)
    int webuiJson = JValue.readFromFile(filepath)
    if webuiJson
        
        ; int componentMap = 
    endIf
endFunction
