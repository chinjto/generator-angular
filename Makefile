include .env
export

DEPLOY_SCRIPT = echo "Undefined deploy script for this project."

include ~/.make/angular.mk

publish: deploy
ifndef VERSION
	$(error VERSION is required. Usage: make publish VERSION=0.2.1)
endif
	@current_ref=$$(git rev-parse --abbrev-ref HEAD); \
	trap 'git checkout $$current_ref' EXIT; \
	git checkout v$(VERSION); \
	npm pack; \
	npm publish
