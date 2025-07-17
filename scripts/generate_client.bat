@echo off
SET ADD_PROP=
SET ADD_PROP=%ADD_PROP%serviceSuffix=ApiClient,
SET ADD_PROP=%ADD_PROP%serviceFileSuffix=.apiclient,
SET ADD_PROP=%ADD_PROP%withInterface=true,
SET ADD_PROP=%ADD_PROP%apiModulePrefix=Gutachtenportal,
SET ADD_PROP=%ADD_PROP%configurationPrefix=Gutachtenportal,
SET ADD_PROP=%ADD_PROP%fileNaming=kebab-case,
SET ADD_PROP=%ADD_PROP%generateAliasAsModel=true,
::apiModulePrefix=${PascalCaseModuleName},configurationPrefix=${PascalCaseModuleName},fileNaming=kebab-case,generateAliasAsModel=true

::SET INFILE="swagger.yaml"
SET INFILE="userservice.yaml"
::SET INFILE="gutachten.yaml"
::SET INFILE="..\openapi\gutachtenportalservice.yaml"
::SET INFILE="customer-support.yaml"
::SET INFILE="customer-insights.yaml"
::SET INFILE="Customer-Credit-API.yaml"

::SET OUTFILE="../src/generated/userservice-client"
::SET OUTFILE="../src/api/gutachtenportal/v1"
SET OUTFILE="../src/api/user/v1"
::SET OUTFILE="../src/generated/gutachtenservice-client"
::SET OUTFILE="../src/generated/arzticlient-client"
::SET OUTFILE="../src/generated/customer-support-client"
::SET OUTFILE="../src/generated/customer-insights-client"
::SET OUTFILE="../src/generated/Customer-Credit-API-client"



del %OUTFILE% /Q

openapi-generator-cli generate -i %INFILE% -g typescript-angular -o %OUTFILE% --additional-properties=%ADD_PROP%

pause
