scriptName WebUIComponent extends ReferenceAlias

string _componentId
string[] _tempFilenames
int _nextTempFileIndex

; TODO
string property ComponentId
    string function get()
        ; GET FROM NAME
        return _componentId
    endFunction
    function set(string value)
        _componentId = value
    endFunction
endProperty

event OnInit()
    OnComponentInit()
    RegisterForModEvent("WebUI:ComponentEvent:" + ComponentId, "OnComponentMessageReceived")
    _tempFilenames = new string[100]
    int i = 0
    while i < 100
        _tempFilenames[i] = "Data/WebUI/.Temp/JsonSerialization/temp_" + i + ".json"
        i += 1
    endWhile
endEvent

event OnPlayerLoadGame()
    OnComponentInit()
    RegisterForModEvent("WebUI:ComponentEvent:" + ComponentId, "OnComponentMessageReceived")
endEvent

event OnComponentInit()
    ; Intended to be overriden
endEvent

event OnComponentLoad()
    ; Intended to be overriden
endEvent

event OnMessage_String(string sender, string eventName, string value)
    ; Intended to be overriden
endEvent

function SendMessage(string eventName, int dataRef = 0, string target = "")
    if ! target
        target = ComponentId
    endIf
    int componentMessage = JMap.object()
    JMap.setStr(componentMessage, "event", eventName)
    JMap.setObj(componentMessage, "data", dataRef)
    JMap.setStr(componentMessage, "sender", ComponentId)
    JMap.setStr(componentMessage, "target", target)
    PapyrusToSkyrimPlatform.GetAPI().SendObject("WebUI:SendMessage", componentMessage)
endFunction

event OnComponentMessageReceived(string modEventName, string jsonData, float _, Form senderForm)
    ; Write received JSON to temporary file
    int tempFileIndex = _nextTempFileIndex
    _nextTempFileIndex += 1
    string tempFilename = _tempFilenames[tempFileIndex]
    MiscUtil.WriteToFile(tempFilename, jsonData, append = false)

    ; Read JSON into JContainers object
    int jsonDataRef = JValue.readFromFile(tempFilename)

    ; Read event info
    string eventName = JMap.getStr(jsonDataRef, "event")
    string sender = JMap.getStr(jsonDataRef, "sender")
    string valueType = JMap.getStr(jsonDataRef, "valueType")

    if valueType == "string"
        OnMessage_String(sender, eventName, JMap.getStr(jsonDataRef, "value"))
    else
        ; TODO
    endIf
endEvent

function Show()
    SendMessage("WebUI:Show")
endFunction

function Hide()
    SendMessage("WebUI:Hide")
endFunction

function Toggle()
    SendMessage("WebUI:Toggle")
endFunction

; bool property IsVisible
;     bool function get()
;         ; SendMessage("Toggle")
;         ; ...
;         return true
;     endFunction
; endProperty
