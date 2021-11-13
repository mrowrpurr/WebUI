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
    Utility.WaitMenuMode(0.1)

    ; Gives back simple folder names, e.g. "Foo", not whole paths
    string[] uiFolders = MiscUtil.FoldersInFolder(WEBUI_ROOT_WEB_COMPONENT_FOLDER)
    int i = 0
    while i < uiFolders.Length
        string folderName = uiFolders[i]
        string webUiJsonFilePath = WEBUI_ROOT_WEB_COMPONENT_FOLDER + "/" + folderName + "/" + "webui.json"
        ; Does this folder contain a webui.json
        if MiscUtil.FileExists(webUiJsonFilePath)
            RegisterWebComponentFolder(WEBUI_ROOT_WEB_COMPONENT_FOLDER + "/" + folderName)
        else
            ; Check for subfolders
            Debug.MessageBox("TODO")
        endIf
        i += 1
    endWhile
endFunction

int function GetWebComponentsMap()
    int map = JDB.solveObj(JDB_PATH_WEB_COMPONENTS)
    if ! map
        map = JMap.object()
        JDB.solveObjSetter(JDB_PATH_WEB_COMPONENTS, map, createMissingKeys = true)
    endIf
    return map
endFunction

function RegisterWebComponentFolder(string folderPath)
    string webUiJsonPath = folderPath + "/webui.json"
    int webUiJson = JValue.readFromFile(webUiJsonPath)
    if webUiJson
        if JMap.hasKey(webUiJson, "id")
            string id = JMap.getStr(webUiJson, "id")
            if id
                if ! JMap.hasKey(webUiJson, "file")
                    if MiscUtil.FileExists(folderPath + "/index.html")
                        JMap.setStr(webUiJson, "file", "index.html")
                    else
                        return
                    endIf
                endIf
                JMap.setStr(webUiJson, "path", folderPath)
                JMap.setStr(webUiJson, "filepath", folderPath + "/" + JMap.getStr(webUiJson, "file"))
                JMap.setObj(GetWebComponentsMap(), id, webUiJson)
                PapyrusToSkyrimPlatform.GetAPI().SendObject("WebUI:RegisterComponent", webUiJson)
            endIf
        endIf
    endIf
endFunction
