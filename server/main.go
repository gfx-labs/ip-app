package main

import (
	"log"
	"os"
	"time"

	"github.com/valyala/fasthttp"
)

func main() {
	fs := &fasthttp.FS{
		// Path to directory to serve.
		Root:          "dist",
		IndexNames:    []string{"index.html"},
		CacheDuration: 24 * time.Hour,
		// Enable transparent compression to save network traffic.
		Compress: true,
	}
	if os.Getenv("ROOTDIR") != "" {
		fs.Root = os.Getenv("ROOTDIR")
	}

	if len(os.Args) > 1 {
		if os.Args[1] != "" {
			fs.Root = os.Args[1]
		}
	}

	// Create request handler for serving static files.
	h := fs.NewRequestHandler()

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Println("starting to listen on " + port)
	// Start the server.
	if err := fasthttp.ListenAndServe(":"+port, h); err != nil {
		log.Fatalf("error in ListenAndServe: %v", err)
	}
}
