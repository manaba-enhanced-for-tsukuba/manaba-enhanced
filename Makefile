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
	yarn run webpack --mode=development --watch --config config/webpack.dev.js

build: install clear
	yarn run webpack --mode=production --config config/webpack.prod.js

clear: install
	yarn run rimraf build

typecheck: install
	yarn run tsc --noEmit

typecheck.watch: install
	yarn run tsc --noEmit --watch
