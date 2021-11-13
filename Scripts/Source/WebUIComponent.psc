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

; TODO sending message to diff components
function SendMessageInt(string eventName, int value)             ; string componentId = "")
    PapyrusToSkyrimPlatform.GetAPI().SendInt(eventName, value)
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
