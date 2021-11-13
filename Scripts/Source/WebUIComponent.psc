scriptName WebUIComponent extends ReferenceAlias

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

event OnInit()
    OnComponentInit()
    RegisterForModEvent("WebUI:Component:" + ComponentId, "OnComponentMessageReceived")
endEvent

event OnPlayerLoadGame()
    OnComponentInit()
    RegisterForModEvent("WebUI:Component:" + ComponentId, "OnComponentMessageReceived")
endEvent

event OnComponentInit()
    ; Intended to be overriden
endEvent

event OnComponentLoad()
    ; Intended to be overriden
endEvent

event OnMessage(string sender, string eventName, int eventData)
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

event OnComponentMessageReceived(string modEventName, string _, float eventDataId, Form senderForm)
    int eventRef = eventDataId as int
    string eventName = JMap.getStr(eventRef, "event")
    string sender    = JMap.getStr(eventRef, "sender")
    
    Debug.MessageBox("On Component Message Received " + sender + " " + eventName)

    ; if eventName == "OnLoad" && sender == ComponentId
    ;     OnComponentLoad()
    ; else
    ;     JValue.retain(eventData)
    ;     OnMessage(sender, eventName, eventData)
    ;     JValue.release(eventData)
    ; endIf
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
