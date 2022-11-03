eslint = yarn run eslint --ignore-path .gitignore
prettier = yarn run prettier --ignore-path .gitignore
stylelint = yarn run stylelint --ignore-path .gitignore
typecheck = yarn run tsc --noEmit

node_modules: package.json yarn.lock
	yarn install
	@touch node_modules

format: node_modules
	$(prettier) --write .

format.check: node_modules
	$(prettier) --check .

lint: node_modules
	$(eslint) .
	$(stylelint) '**/*.{css,scss}'

lint.fix: node_modules
	$(eslint) --fix .
	$(stylelint) --fix '**/*.{css,scss}'

autofix: format lint.fix

dev.chrome: node_modules
	NODE_ENV=development BROWSER_ENV=chrome yarn run webpack --watch

dev.firefox: node_modules
	NODE_ENV=development BROWSER_ENV=firefox yarn run webpack --watch

build.chrome: node_modules clear
	NODE_ENV=production BROWSER_ENV=chrome yarn run webpack

build.firefox: node_modules clear
	NODE_ENV=production BROWSER_ENV=firefox yarn run webpack

build.all: build.chrome build.firefox

sign.firefox: node_modules
	yarn run web-ext sign -s dist --api-key=${AMO_JWT_ISSUER} --api-secret=${AMO_JWT_SECRET}

clear: node_modules
	yarn run rimraf dist

typecheck: node_modules
	$(typecheck)

typecheck.watch: node_modules
	$(typecheck) --watch
