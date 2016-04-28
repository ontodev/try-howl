VERSION := 0.2.0
RELEASES := https://github.com/ontodev/howl/releases
LINK := $(RELEASES)/download/v$(VERSION)/howl-$(VERSION).js

.PHONY: all
all:
	rm js/howl.js
	curl -o js/howl.js -L $(LINK)
