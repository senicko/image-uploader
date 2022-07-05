package main

import (
	"fmt"
	"log"
	"net/http"
)

func HelloWorldHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, World!")
}

func RegisterRoutes(m *http.ServeMux) {
	m.HandleFunc("/hello", HelloWorldHandler)
}

func main() {
	m := http.NewServeMux()
	RegisterRoutes(m)

	s := &http.Server{
		Addr:    ":8080",
		Handler: m,
	}

	if err := s.ListenAndServe(); err != nil {
		log.Fatal("Failed to start the server", err)
	}
}
