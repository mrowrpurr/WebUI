scriptName WebUI_Impl extends ReferenceAlias

string WEBUI_ROOT_WEB_COMPONENT_FOLDER = "Data/WebUI"
string JDB_PATH_WEB_COMPONENTS         = ".webUI.components"

; On Mod Installation
event OnInit()
    ListenForRefresh()
    RegisterWebComponentsFromFileSystem(WEBUI_ROOT_WEB_COMPONENT_FOLDER)
endEvent

; On Save Game Load
event OnPlayerLoadGame()
    ListenForRefresh()
    RegisterWebComponentsFromFileSystem(WEBUI_ROOT_WEB_COMPONENT_FOLDER)
endEvent

function ListenForRefresh()
    RegisterForKey(19) ; R
endFunction

event OnKeyDown(int keyCode)
    if Input.IsKeyPressed(42) && keyCode == 19 ; Shift + R
        PapyrusToSkyrimPlatform.GetAPI().SendObject("WebUI:Refresh", 0) ; TODO allow simple events without objects!
    endIf
endEvent

function RegisterWebComponentsFromFileSystem(string rootFolder)
    Utility.WaitMenuMode(0.1)

    ; Gives back simple folder names, e.g. "Foo", not whole paths
    string[] uiFolders = MiscUtil.FoldersInFolder(rootFolder)
    int i = 0
    while i < uiFolders.Length
        string folderName = uiFolders[i]
        if folderName != ".Temp"
            string webUiJsonFilePath = rootFolder + "/" + folderName + "/" + "webui.json"
            ; Does this folder contain a webui.json
            if MiscUtil.FileExists(webUiJsonFilePath)
                RegisterWebComponentFolder(rootFolder + "/" + folderName)
            else
                RegisterWebComponentsFromFileSystem(rootFolder + "/" + folderName)
            endIf
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
            if ! JMap.hasKey(webUiJson, "id")
                string[] folderNameParts = StringUtil.Split(folderPath, "/")
                string folderName = folderNameParts[folderNameParts.Length - 1]
                JMap.setStr(webUiJson, "id", folderName)
            endIf
            string id = JMap.getStr(webUiJson, "id")
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
            Utility.WaitMenuMode(0.05) ; Hmmmmmm
            PapyrusToSkyrimPlatform.GetAPI().SendObject("WebUI:RegisterComponent", webUiJson)
        endIf
    endIf
endFunction
