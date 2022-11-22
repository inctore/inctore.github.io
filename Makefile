all: build
	git add .
	git commit -m"push"


build:
	cd js && npm run build
