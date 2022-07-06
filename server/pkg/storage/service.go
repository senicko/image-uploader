package storage

import (
	"fmt"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"path/filepath"
	"time"
)

// IsImage checks if file is jpeg or png file.
func IsImage(file multipart.File) error {
	buff := make([]byte, 512)
	if _, err := file.Read(buff); err != nil {
		return err
	}

	fileType := http.DetectContentType(buff)
	if fileType != "image/png" && fileType != "image/jpeg" {
		return fmt.Errorf("%s is not a supported file type", fileType)
	}

	if _, err := file.Seek(0, io.SeekStart); err != nil {
		return err
	}

	return nil
}

// SaveImage saves uploaded image.
func SaveImage(file multipart.File, fileHeader *multipart.FileHeader) (string, error) {
	err := os.MkdirAll("./uploads", os.ModePerm)
	if err != nil {
		return "", err
	}

	fileName := fmt.Sprintf("%d%s", time.Now().UnixNano(), filepath.Ext(fileHeader.Filename))

	dst, err := os.Create("./uploads/" + fileName)
	if err != nil {
		return "", err
	}
	defer dst.Close()

	_, err = io.Copy(dst, file)
	if err != nil {
		return "", err
	}

	return fileName, nil
}
