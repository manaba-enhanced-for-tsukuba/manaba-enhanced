eslint = yarn run eslint --ignore-path .gitignore
prettier = yarn run prettier --ignore-path .gitignore
stylelint = yarn run stylelint --ignore-path .gitignore
typecheck = yarn run tsc --noEmit
web-ext = yarn run web-ext -s dist

node_modules: package.json yarn.lock
ifeq ($(MAKE_YARN_FROZEN_LOCKFILE), 1)
	yarn install --frozen-lockfile
else
	yarn install
endif
	@touch node_modules

.PHONY: format
format: node_modules
	$(prettier) --write .

.PHONY: format.check
format.check: node_modules
	$(prettier) --check .

.PHONY: lint
lint: node_modules
	$(eslint) .
	$(stylelint) '**/*.{css,scss}'

.PHONY: lint.fix
lint.fix: node_modules
	$(eslint) --fix .
	$(stylelint) --fix '**/*.{css,scss}'

.PHONY: autofix
autofix: format lint.fix

.PHONY: typecheck
typecheck: node_modules
	$(typecheck)

.PHONY: typecheck.watch
typecheck.watch: node_modules
	$(typecheck) --watch

.PHONY: test
test: node_modules
	yarn run test

.PHONY: dev.chrome
dev.chrome: node_modules
	NODE_ENV=development BROWSER_ENV=chrome yarn run webpack --watch

.PHONY: dev.firefox
dev.firefox: node_modules
	NODE_ENV=development BROWSER_ENV=firefox yarn run webpack --watch

.PHONY: build.chrome
build.chrome: node_modules clear
	NODE_ENV=production BROWSER_ENV=chrome yarn run webpack

.PHONY: build.firefox
build.firefox: node_modules clear
	NODE_ENV=production BROWSER_ENV=firefox yarn run webpack

.PHONY: lint.web-ext
lint.web-ext: node_modules
	$(web-ext) lint --self-hosted

.PHONY: sign.firefox
sign.firefox: node_modules
	$(web-ext) sign --channel unlisted --api-key=${AMO_JWT_ISSUER} --api-secret=${AMO_JWT_SECRET}

.PHONY: publish.firefox
publish.firefox: build.firefox sign.firefox
	rm -rf dist-firefox
	git clone git@github.com:manaba-enhanced-for-tsukuba/dist-firefox.git dist-firefox
	./bin/publishFirefoxVersion.sh

.PHONY: clear
clear: node_modules
	yarn run rimraf dist
