package api

import "net/http"

func HttpMethod(method string, next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		if r.Method == method {
			next.ServeHTTP(w, r)
			return
		}

		s := http.StatusMethodNotAllowed
		http.Error(w, http.StatusText(s), s)
	}
}
