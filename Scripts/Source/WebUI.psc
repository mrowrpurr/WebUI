scriptName WebUI extends Quest

PapyrusToSkyrimPlatform skyrimPlatform

WebUI function GetAPI() global
    return Game.GetFormFromFile(0x800, "WebUI.esp") as WebUI
endFunction

event OnInit()
    skyrimPlatform = PapyrusToSkyrimPlatform.GetAPI()
endEvent

function AddComponent(string id, string uri)
endFunction

function RemoveComponent(string id)
endFunction

function ShowComponent(string id)
endFunction

function HideComponent(string id)
endFunction

function SendComponentMessage(string id)
endFunction
