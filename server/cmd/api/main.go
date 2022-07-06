package main

import (
	"log"
	"net/http"

	"github.com/senicko/image-uploader/server/pkg/storage"
)

func registerRoutes(m *http.ServeMux) {
	m.HandleFunc("/upload-image", storage.UploadImage)

	// Serve uploaded images
	dir := http.Dir("./uploads")
	fs := http.FileServer(dir)
	m.Handle("/uploads/", http.StripPrefix("/uploads/", fs))
}

func main() {
	m := http.NewServeMux()
	registerRoutes(m)

	s := &http.Server{
		Addr:    ":8080",
		Handler: m,
	}

	if err := s.ListenAndServe(); err != nil {
		log.Fatal("Failed to start the server", err)
	}
}
