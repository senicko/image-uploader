package storage

import (
	"encoding/json"
	"net/http"

	"github.com/senicko/image-uploader/server/pkg/api"
)

type UploadResponse struct {
	Url string `json:"url"`
}

// UploadImage is a http handler that handles image upload.
func UploadImage(w http.ResponseWriter, r *http.Request) {
	r.ParseMultipartForm(10 << 20)

	file, header, err := r.FormFile("payload")
	if err != nil {
		api.Error(w, err, http.StatusBadRequest)
		return
	}
	defer file.Close()

	if err := IsImage(file); err != nil {
		api.Error(w, err, http.StatusBadRequest)
		return
	}

	fileName, err := SaveImage(file, header)
	if err != nil {
		api.Error(w, err, http.StatusInternalServerError)
		return
	}

	res, _ := json.Marshal(UploadResponse{Url: "http://localhost:3000/uploads/" + fileName})

	w.Header().Add("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	w.Write([]byte(res))
}
