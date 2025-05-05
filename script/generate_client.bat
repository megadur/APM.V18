@echo off
SET ADD_PROP=
SET ADD_PROP=%ADD_PROP%serviceSuffix=Client,
SET ADD_PROP=%ADD_PROP%serviceFileSuffix=.client,
SET ADD_PROP=%ADD_PROP%withInterface=true,


::SET INFILE="swagger.yaml"
SET INFILE="userservice.yaml"
::SET INFILE="customer-support.yaml"
::SET INFILE="customer-insights.yaml"
::SET INFILE="Customer-Credit-API.yaml"

SET OUTFILE="../src/generated/userservice-client"
::SET OUTFILE="../src/generated/arzticlient-client"
::SET OUTFILE="../src/generated/customer-support-client"
::SET OUTFILE="../src/generated/customer-insights-client"
::SET OUTFILE="../src/generated/Customer-Credit-API-client"



del %OUTFILE% /Q

openapi-generator-cli generate -i %INFILE% -g typescript-angular -o %OUTFILE% --additional-properties=%ADD_PROP%

pause
