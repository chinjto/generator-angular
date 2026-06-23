include .env
export

DEPLOY_SCRIPT = echo "Undefined deploy script for this project."

include ~/.make/angular.mk

# TODO create `publish` for publishing into gh npm @chinjto
