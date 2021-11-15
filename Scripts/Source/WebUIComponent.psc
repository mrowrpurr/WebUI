scriptName WebUIComponent extends ConnectedToSkyrimPlatform

event OnConnectedInit()
    OnComponentInit()
endEvent

; RegisterForModEvent("WebUI:ComponentEvent:" + ComponentId, "OnComponentMessageReceived")

string _componentId

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

event OnComponentInit()
    ; Intended to be overriden
endEvent

event OnComponentLoad()
    ; Intended to be overriden
endEvent

event OnMessage_String(string sender, string eventName, string value)
    ; Intended to be overriden
endEvent

; function SendMessage(string eventName, int dataRef = 0, string target = "")
;     if ! target
;         target = ComponentId
;     endIf
;     int componentMessage = JMap.object()
;     JMap.setStr(componentMessage, "event", eventName)
;     JMap.setObj(componentMessage, "data", dataRef)
;     JMap.setStr(componentMessage, "sender", ComponentId)
;     JMap.setStr(componentMessage, "target", target)
;     PapyrusToSkyrimPlatform.GetAPI().SendObject("WebUI:SendMessage", componentMessage)
; endFunction

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
