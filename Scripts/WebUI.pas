.info
  .source "WebUI.psc"
  .modifyTime 1638762022
  .compileTime 1638762024
  .user "mrowr"
  .computer "MROWR-PURR"
.endInfo
.userFlagsRef
  .flag conditional 1
  .flag hidden 0
.endUserFlagsRef
.objectTable
  .object WebUI ReferenceAlias
    .userFlags 0
    .docString ""
    .autoState 
    .variableTable
      .variable _webUI_Config_Map_ID int
        .userFlags 0
        .initialValue None
      .endVariable
    .endVariableTable
    .propertyTable
	  .property WEBUI_ROOT_FOLDER string
	    .userFlags 0
	    .docString ""
	    .function get 
	      .userFlags 0
	      .docString ""
	      .return string
	      .paramTable
	      .endParamTable
	      .localTable
	      .endLocalTable
	      .code
	        RETURN "Data/WebUI" ;@line 3
	      .endCode
	    .endFunction
	  .endProperty
	  .property WEBUI_CONFIG_FILENAME string
	    .userFlags 0
	    .docString ""
	    .function get 
	      .userFlags 0
	      .docString ""
	      .return string
	      .paramTable
	      .endParamTable
	      .localTable
	      .endLocalTable
	      .code
	        RETURN "webui.json" ;@line 4
	      .endCode
	    .endFunction
	  .endProperty
	  .property WEBUI_DEFINITION_FILENAME string
	    .userFlags 0
	    .docString ""
	    .function get 
	      .userFlags 0
	      .docString ""
	      .return string
	      .paramTable
	      .endParamTable
	      .localTable
	      .endLocalTable
	      .code
	        RETURN "webview.json" ;@line 5
	      .endCode
	    .endFunction
	  .endProperty
	  .property JDB_WEBUI_ROOT_PATH string
	    .userFlags 0
	    .docString ""
	    .function get 
	      .userFlags 0
	      .docString ""
	      .return string
	      .paramTable
	      .endParamTable
	      .localTable
	      .endLocalTable
	      .code
	        RETURN ".webUI" ;@line 6
	      .endCode
	    .endFunction
	  .endProperty
	  .property JDB_WEBUI_CONFIG_PATH string
	    .userFlags 0
	    .docString ""
	    .function get 
	      .userFlags 0
	      .docString ""
	      .return string
	      .paramTable
	      .endParamTable
	      .localTable
	      .endLocalTable
	      .code
	        RETURN ".webUI.config" ;@line 7
	      .endCode
	    .endFunction
	  .endProperty
	  .property CONFIG_IGNORED_FOLDERS string
	    .userFlags 0
	    .docString ""
	    .function get 
	      .userFlags 0
	      .docString ""
	      .return string
	      .paramTable
	      .endParamTable
	      .localTable
	      .endLocalTable
	      .code
	        RETURN "ignoreFolders" ;@line 8
	      .endCode
	    .endFunction
	  .endProperty
	  .property WebUI_Config_Map_ID int
	    .userFlags 0
	    .docString ""
	    .function get 
	      .userFlags 0
	      .docString ""
	      .return int
	      .paramTable
	      .endParamTable
	      .localTable
	        .local ::temp0 bool
	        .local ::temp1 string
	        .local ::temp2 string
	        .local ::temp3 int
	        .local ::temp4 bool
	      .endLocalTable
	      .code
	        NOT ::temp0 _webUI_Config_Map_ID ;@line 16
	        JUMPF ::temp0 label3 ;@line 16
	        PROPGET WEBUI_ROOT_FOLDER self ::temp1 ;@line 17
	        STRCAT ::temp1 ::temp1 "/" ;@line 17
	        PROPGET WEBUI_CONFIG_FILENAME self ::temp2 ;@line 17
	        STRCAT ::temp1 ::temp1 ::temp2 ;@line 17
	        CALLSTATIC jvalue readFromFile ::temp3 ::temp1 ;@line 17
	        ASSIGN _webUI_Config_Map_ID ::temp3 ;@line 17
	        JUMPF _webUI_Config_Map_ID label2 ;@line 18
	        PROPGET JDB_WEBUI_CONFIG_PATH self ::temp2 ;@line 19
	        CALLSTATIC jdb solveObjSetter ::temp4 ::temp2 _webUI_Config_Map_ID false ;@line 19
	        JUMP label1
	        label2:
	        label1:
	        JUMP label0
	        label3:
	        label0:
	        RETURN _webUI_Config_Map_ID ;@line 22
	      .endCode
	    .endFunction
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
        .function OnInit 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
            .local ::temp5 string
            .local ::nonevar none
          .endLocalTable
          .code
            PROPGET WEBUI_ROOT_FOLDER self ::temp5 ;@line 30
            CALLMETHOD SearchForAndRegisterWebViewsFromFileSystem self ::nonevar ::temp5 ;@line 30
          .endCode
        .endFunction
        .function OnPlayerLoadGame 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
          .endParamTable
          .localTable
            .local ::temp6 string
            .local ::nonevar none
          .endLocalTable
          .code
            ASSIGN _webUI_Config_Map_ID 0 ;@line 37
            PROPGET WEBUI_ROOT_FOLDER self ::temp6 ;@line 38
            CALLMETHOD SearchForAndRegisterWebViewsFromFileSystem self ::nonevar ::temp6 ;@line 38
          .endCode
        .endFunction
        .function ShouldIgnoreFolder 
          .userFlags 0
          .docString ""
          .return bool
          .paramTable
            .param folderName string
          .endParamTable
          .localTable
            .local ::temp7 int
            .local ::temp8 int
            .local ::temp9 string
            .local ignoredFolderNamesArray int
            .local ::temp10 bool
          .endLocalTable
          .code
            PROPGET WebUI_Config_Map_ID self ::temp7 ;@line 42
            JUMPF ::temp7 label7 ;@line 42
            PROPGET WebUI_Config_Map_ID self ::temp8 ;@line 43
            PROPGET CONFIG_IGNORED_FOLDERS self ::temp9 ;@line 43
            CALLSTATIC jmap getObj ::temp8 ::temp8 ::temp9 0 ;@line 43
            ASSIGN ignoredFolderNamesArray ::temp8 ;@line 43
            JUMPF ignoredFolderNamesArray label6 ;@line 44
            CALLSTATIC jarray findStr ::temp8 ignoredFolderNamesArray folderName 0 ;@line 45
            COMPAREGT ::temp10 ::temp8 -1 ;@line 45
            RETURN ::temp10 ;@line 45
            JUMP label5
            label6:
            label5:
            JUMP label4
            label7:
            label4:
            RETURN false ;@line 48
          .endCode
        .endFunction
        .function SearchForAndRegisterWebViewsFromFileSystem 
          .userFlags 0
          .docString ""
          .return NONE
          .paramTable
            .param fullFolderPath string
          .endParamTable
          .localTable
            .local ::temp11 string[]
            .local ::temp12 int
            .local ::temp13 string
            .local ::temp14 bool
            .local ::temp15 string
            .local folderNameParts string[]
            .local folderName string
            .local webviewDefinition int
            .local ::nonevar none
            .local webviewID string
            .local webviewFile string
            .local webviewPosition int
            .local width int
            .local height int
            .local x int
            .local y int
            .local webViewInfo string
            .local foldersInFolder string[]
            .local i int
          .endLocalTable
          .code
            CALLSTATIC stringutil Split ::temp11 fullFolderPath "/" ;@line 52
            ASSIGN folderNameParts ::temp11 ;@line 52
            ARRAYLENGTH ::temp12 folderNameParts ;@line 53
            ISUBTRACT ::temp12 ::temp12 1 ;@line 53
            ARRAYGETELEMENT ::temp13 folderNameParts ::temp12 ;@line 53
            ASSIGN folderName ::temp13 ;@line 53
            CALLMETHOD ShouldIgnoreFolder self ::temp14 folderName ;@line 54
            JUMPF ::temp14 label9 ;@line 54
            RETURN none ;@line 55
            JUMP label8
            label9:
            label8:
            STRCAT ::temp13 fullFolderPath "/" ;@line 59
            PROPGET WEBUI_DEFINITION_FILENAME self ::temp15 ;@line 59
            STRCAT ::temp13 ::temp13 ::temp15 ;@line 59
            CALLSTATIC miscutil FileExists ::temp14 ::temp13 ;@line 59
            JUMPF ::temp14 label13 ;@line 59
            STRCAT ::temp15 fullFolderPath "/" ;@line 60
            PROPGET WEBUI_DEFINITION_FILENAME self ::temp13 ;@line 60
            STRCAT ::temp15 ::temp15 ::temp13 ;@line 60
            CALLSTATIC jvalue readFromFile ::temp12 ::temp15 ;@line 60
            ASSIGN webviewDefinition ::temp12 ;@line 60
            JUMPF webviewDefinition label12 ;@line 61
            CALLSTATIC jmap getStr ::temp13 webviewDefinition "id" "" ;@line 62
            ASSIGN webviewID ::temp13 ;@line 62
            CALLSTATIC jmap getStr ::temp15 webviewDefinition "file" "" ;@line 63
            ASSIGN webviewFile ::temp15 ;@line 63
            CALLSTATIC jmap getObj ::temp12 webviewDefinition "position" 0 ;@line 64
            ASSIGN webviewPosition ::temp12 ;@line 64
            CALLSTATIC jmap getInt ::temp12 webviewPosition "width" 0 ;@line 65
            ASSIGN width ::temp12 ;@line 65
            CALLSTATIC jmap getInt ::temp12 webviewPosition "height" 0 ;@line 66
            ASSIGN height ::temp12 ;@line 66
            CALLSTATIC jmap getInt ::temp12 webviewPosition "x" 0 ;@line 67
            ASSIGN x ::temp12 ;@line 67
            CALLSTATIC jmap getInt ::temp12 webviewPosition "y" 0 ;@line 68
            ASSIGN y ::temp12 ;@line 68
            STRCAT ::temp13 webviewID "|" ;@line 69
            STRCAT ::temp15 ::temp13 webviewFile ;@line 69
            STRCAT ::temp13 ::temp15 "|" ;@line 69
            CAST ::temp15 x ;@line 69
            STRCAT ::temp15 ::temp13 ::temp15 ;@line 69
            STRCAT ::temp13 ::temp15 "|" ;@line 69
            CAST ::temp15 y ;@line 69
            STRCAT ::temp15 ::temp13 ::temp15 ;@line 69
            STRCAT ::temp13 ::temp15 "|" ;@line 69
            CAST ::temp15 width ;@line 69
            STRCAT ::temp15 ::temp13 ::temp15 ;@line 69
            STRCAT ::temp13 ::temp15 "|" ;@line 69
            CAST ::temp15 height ;@line 69
            STRCAT ::temp15 ::temp13 ::temp15 ;@line 69
            ASSIGN webViewInfo ::temp15 ;@line 69
            STRCAT ::temp13 webviewID "::" ;@line 71
            STRCAT ::temp15 ::temp13 "registerwebview" ;@line 71
            CALLSTATIC skyrimplatformbridge SendEvent ::nonevar ::temp15 "WebUI" webViewInfo "WebUI" ;@line 70
            JUMP label11
            label12:
            label11:
            JUMP label10
            label13:
            label10:
            CALLSTATIC miscutil FoldersInFolder ::temp11 fullFolderPath ;@line 79
            ASSIGN foldersInFolder ::temp11 ;@line 79
            ASSIGN i 0 ;@line 80
            label14:
            ARRAYLENGTH ::temp12 foldersInFolder ;@line 81
            COMPARELT ::temp14 i ::temp12 ;@line 81
            JUMPF ::temp14 label15 ;@line 81
            STRCAT ::temp13 fullFolderPath "/" ;@line 82
            ARRAYGETELEMENT ::temp15 foldersInFolder i ;@line 82
            STRCAT ::temp13 ::temp13 ::temp15 ;@line 82
            CALLMETHOD SearchForAndRegisterWebViewsFromFileSystem self ::nonevar ::temp13 ;@line 82
            IADD ::temp12 i 1 ;@line 83
            ASSIGN i ::temp12 ;@line 83
            JUMP label14
            label15:
          .endCode
        .endFunction
      .endState
    .endStateTable
  .endObject
.endObjectTable