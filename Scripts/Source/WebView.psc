scriptName WebView extends SkyrimPlatformConnection

string property WebViewID auto
string property URL auto
int property X auto
int property Y auto
int property Width auto
int property Height auto

event OnSetupWebView()
endEvent

event OnSetup()
    Width = 100
    Height = 100
    ; TODO - default WebViewID based on the Script Name or .esp
    ConnectionName = "WebUI"
    OnSetupWebView()
endEvent

event OnConnected()
    string webViewInfo = WebViewID + "|" + URL + "|" + X + "|" + Y + "|" + Width + "|" + Height
    Send("RegisterWebView", webViewInfo)
endEvent

function SetupWebView(string id, string url, int x = 0, int y = 0, int width = 100, int height = 100)
    WebViewID = id
    self.URL = url
    self.X = x
    self.Y = y
    self.Width = width
    self.Height = height
endFunction
