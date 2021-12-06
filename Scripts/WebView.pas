.info
  .source "WebView.psc"
  .modifyTime 1638761723
  .compileTime 1638761725
  .user "mrowr"
  .computer "MROWR-PURR"
.endInfo
.userFlagsRef
  .flag conditional 1
  .flag hidden 0
.endUserFlagsRef
.objectTable
  .object WebView SkyrimPlatformConnection
    .userFlags 0
    .docString ""
    .autoState 
    .variableTable
      .variable ::WebViewID_var string
        .userFlags 0
        .initialValue None
      .endVariable
      .variable ::URL_var string
        .userFlags 0
        .initialValue None
      .endVariable
      .variable ::X_var int
        .userFlags 0
        .initialValue None
      .endVariable
      .variable ::Y_var int
        .userFlags 0
        .initialValue None
      .endVariable
      .variable ::Width_var int
        .userFlags 0
        .initialValue None
      .endVariable
      .variable ::Height_var int
        .userFlags 0
        .initialValue None
      .endVariable
      .variable ::UseJsonFile_var bool
        .userFlags 0
        .initialValue None
      .endVariable
    .endVariableTable
    .propertyTable
	  .property WebViewID string auto
	    .userFlags 0
	    .docString ""
	    .autoVar ::WebViewID_var
	  .endProperty
	  .property URL string auto
	    .userFlags 0
	    .docString ""
	    .autoVar ::URL_var
	  .endProperty
	  .property X int auto
	    .userFlags 0
	    .docString ""
	    .autoVar ::X_var
	  .endProperty
	  .property Y int auto
	    .userFlags 0
	    .docString ""
	    .autoVar ::Y_var
	  .endProperty
	  .property Width int auto
	    .userFlags 0
	    .docString ""
	    .autoVar ::Width_var
	  .endProperty
	  .property Height int auto
	    .userFlags 0
	    .docString ""
	    .autoVar ::Height_var
	  .endProperty
	  .property UseJsonFile bool auto
	    .userFlags 0
	    .docString ""
	    .autoVar ::UseJsonFile_var
	  .endProperty
    .endPropertyTable
    .stateTable
      .state
        .function GetState
          .userFlags 0
          .docString "Function that returns the current state"
          .return String
          .paramTable
          .endParamTable
          .localTable
          .endLocalTable
          .code
            RETURN ::state
          .endCode
        .endFunction
        .function GotoState
          .userFlags 0
          .docString "Function that switches this object to the specified state"
          .return None
          .paramTable
            .param newState String
          .endParamTable
          .localTable
            .local ::NoneVar None
          .endLocalTable
          .code
            CALLMETHOD onEndState self ::NoneVar
            ASSIGN ::state newState
            CALLMETHOD onBeginState self ::NoneVar
          .endCode
        .endFunction
        .function OnSetupWebView 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
          .endLocalTable
          .code
          .endCode
        .endFunction
        .function OnSetup 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
            .local ::temp0 string
            .local ::nonevar none
          .endLocalTable
          .code
            ASSIGN ::Width_var 100 ;@line 15
            ASSIGN ::Height_var 100 ;@line 16
            ASSIGN ::temp0 "WebUI" ;@line 18
            PROPSET ConnectionName self ::temp0 ;@line 18
            CALLMETHOD OnSetupWebView self ::nonevar  ;@line 19
          .endCode
        .endFunction
        .function OnWebViewConnected 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
          .endLocalTable
          .code
          .endCode
        .endFunction
        .function OnConnected 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
            .local ::temp1 bool
            .local ::temp2 string
            .local ::temp3 string
            .local ::nonevar none
            .local webViewInfo string
          .endLocalTable
          .code
            NOT ::temp1 ::UseJsonFile_var ;@line 26
            JUMPF ::temp1 label1 ;@line 26
            STRCAT ::temp2 ::WebViewID_var "|" ;@line 27
            STRCAT ::temp2 ::temp2 ::URL_var ;@line 27
            STRCAT ::temp2 ::temp2 "|" ;@line 27
            CAST ::temp3 ::X_var ;@line 27
            STRCAT ::temp3 ::temp2 ::temp3 ;@line 27
            STRCAT ::temp2 ::temp3 "|" ;@line 27
            CAST ::temp3 ::Y_var ;@line 27
            STRCAT ::temp3 ::temp2 ::temp3 ;@line 27
            STRCAT ::temp2 ::temp3 "|" ;@line 27
            CAST ::temp3 ::Width_var ;@line 27
            STRCAT ::temp3 ::temp2 ::temp3 ;@line 27
            STRCAT ::temp2 ::temp3 "|" ;@line 27
            CAST ::temp3 ::Height_var ;@line 27
            STRCAT ::temp3 ::temp2 ::temp3 ;@line 27
            ASSIGN webViewInfo ::temp3 ;@line 27
            CALLMETHOD SendEvent self ::nonevar "RegisterWebView" webViewInfo "" "" ;@line 28
            JUMP label0
            label1:
            label0:
            CALLMETHOD OnWebViewConnected self ::nonevar  ;@line 30
          .endCode
        .endFunction
        .function SetupWebView 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
            .param id string
            .param url string
            .param x int
            .param y int
            .param width int
            .param height int
          .endParamTable
          .localTable
            .local ::temp4 string
            .local ::temp5 int
          .endLocalTable
          .code
            ASSIGN ::WebViewID_var id ;@line 34
            ASSIGN ::temp4 ::URL_var ;@line 35
            PROPSET URL self ::temp4 ;@line 35
            ASSIGN ::temp5 ::X_var ;@line 36
            PROPSET X self ::temp5 ;@line 36
            ASSIGN ::temp5 ::Y_var ;@line 37
            PROPSET Y self ::temp5 ;@line 37
            ASSIGN ::temp5 ::Width_var ;@line 38
            PROPSET Width self ::temp5 ;@line 38
            ASSIGN ::temp5 ::Height_var ;@line 39
            PROPSET Height self ::temp5 ;@line 39
          .endCode
        .endFunction
        .function OnEvent 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
            .param eventName string
            .param data string
          .endParamTable
          .localTable
            .local ::nonevar none
          .endLocalTable
          .code
            CALLSTATIC debug MessageBox ::nonevar "Sweet, got an event!" ;@line 43
          .endCode
        .endFunction
        .function SendEvent 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
            .param eventName string
            .param data string
            .param target string
            .param source string
          .endParamTable
          .localTable
            .local ::temp6 string
            .local ::nonevar none
          .endLocalTable
          .code
            STRCAT ::temp6 ::WebViewID_var "::" ;@line 47
            STRCAT ::temp6 ::temp6 eventName ;@line 47
            CALLMETHOD Send self ::nonevar ::temp6 data target source ;@line 47
          .endCode
        .endFunction
        .function FetchData 
          .userFlags 0
          .docString ""
          .return string
          .paramTable
            .param query string
            .param data string
            .param target string
            .param source string
            .param waitInterval float
            .param timeout float
          .endParamTable
          .localTable
            .local ::temp7 string
          .endLocalTable
          .code
            STRCAT ::temp7 ::WebViewID_var "::" ;@line 51
            STRCAT ::temp7 ::temp7 query ;@line 51
            CALLMETHOD Request self ::temp7 ::temp7 data target source waitInterval timeout ;@line 51
            RETURN ::temp7 ;@line 51
          .endCode
        .endFunction
        .function AddToUI 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
            .local ::nonevar none
          .endLocalTable
          .code
            CALLMETHOD SendEvent self ::nonevar "AddToUI" "" "" "" ;@line 55
          .endCode
        .endFunction
        .function RemoveFromUI 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
            .local ::nonevar none
          .endLocalTable
          .code
            CALLMETHOD SendEvent self ::nonevar "RemoveFromUI" "" "" "" ;@line 59
          .endCode
        .endFunction
        .function ToggleUI 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
            .local ::nonevar none
          .endLocalTable
          .code
            CALLMETHOD SendEvent self ::nonevar "ToggleUI" "" "" "" ;@line 63
          .endCode
        .endFunction
        .function Show 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
          .endLocalTable
          .code
          .endCode
        .endFunction
        .function Hide 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
          .endLocalTable
          .code
          .endCode
        .endFunction
        .function Toggle 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
          .endLocalTable
          .code
          .endCode
        .endFunction
      .endState
    .endStateTable
  .endObject
.endObjectTable