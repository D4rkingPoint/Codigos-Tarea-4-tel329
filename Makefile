CONTIKI_PROJECT = websense-cloud
all: $(CONTIKI_PROJECT)

CONTIKI = ../..
PROJECT_SOURCEFILES += httpd-simple.c


include $(CONTIKI)/Makefile.include
