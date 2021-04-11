install:
	yarn install

format:
	yarn run prettier --write .

format.check:
	yarn run prettier --check .

lint:
	yarn run eslint .

lint.fix:
	yarn run eslint --fix .

autofix: format lint.fix

dev: install
	NODE_ENV=development yarn run webpack --watch

build: install clear
	NODE_ENV=production yarn run webpack

clear: install
	yarn run rimraf build

typecheck: install
	yarn run tsc --noEmit

typecheck.watch: install
	yarn run tsc --noEmit --watch
