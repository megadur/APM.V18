@echo off
SET ADD_PROP=
::SET ADD_PROP=%ADD_PROP%classModifier=abstract,
::SET ADD_PROP=%ADD_PROP%swashbuckleVersion=5.0.0,
::SET ADD_PROP=%ADD_PROP%operationResultTask=true,
::SET ADD_PROP=%ADD_PROP%targetFramework=v4.5.2,
::SET ADD_PROP=%ADD_PROP%packageName=ArzTiClient,
::SET ADD_PROP=%ADD_PROP%operationIsAsync=true,
::SET ADD_PROP=%ADD_PROP%buildTarget=library,
::SET ADD_PROP=%ADD_PROP%isLibrary=true,


SET INFILE="swagger.yaml"
SET INFILE="userservice.yaml"
SET INFILE="customer-support.yaml"
::SET INFILE="customer-insights.yaml"
::SET INFILE="Customer-Credit-API.yaml"

SET OUTFILE="../src/generated/arzticlient-client"
SET OUTFILE="../src/generated/customer-support-client"
::SET OUTFILE="../src/generated/customer-insights-client"
::SET OUTFILE="../src/generated/Customer-Credit-API-client"



::del %OUTFILE% /Q

openapi-generator-cli generate -i %INFILE% -g typescript-angular -o %OUTFILE% --additional-properties=%ADD_PROP%

pause
