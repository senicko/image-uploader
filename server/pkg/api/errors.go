package api

import (
	"log"
	"net/http"
)

func Error(w http.ResponseWriter, err error, s int) {
	log.Println(err.Error())
	http.Error(w, http.StatusText(s), s)
}
