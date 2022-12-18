package main

import (
	"fmt"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
	"log"
	"os"
	"path"
	"strings"
)

func moveToS3(filePath string, bucket string) (string, error) {
	// The session the S3 Uploader will use
	sess := session.Must(session.NewSession())

	// Create an uploader with the session and default options, yo!
	uploader := s3manager.NewUploader(sess)

	f, err := os.Open(filePath)
	if err != nil {
		return "", fmt.Errorf("failed to open file %q, %v", filePath, err)
	}

	// Upload the file to S3.
	result, err := uploader.Upload(&s3manager.UploadInput{
		Bucket: aws.String(bucket),
		Key:    aws.String(filePath),
		Body:   f,
	})
	if err != nil {
		return "", fmt.Errorf("failed to upload file, %v", err)
	}

	return fmt.Sprintf("file uploaded to, %s\n", aws.String(result.Location)), nil
}

// traverse recursively directory and print all files
func traverse(dirPath string, bucket string, handler func(string, string) (string, error)) {
	var err error

	if strings.TrimSpace(dirPath)[:2] == ".." {
		if err := os.Chdir(dirPath); err != nil {
			log.Fatal(err)
		}

		dirPath, err = os.Getwd()
		if err != nil {
			log.Fatal(err)
		}
	}

	files, err := os.ReadDir(dirPath)
	if err != nil {
		log.Fatal(err)
	}

	for _, file := range files {
		filePath := path.Join(dirPath, file.Name())

		handler(filePath, bucket)
		if file.IsDir() {
			traverse(filePath, bucket, handler)
		}
	}
}

func main() {
	//distDir := os.Getenv("INPUT_DIST-DIR")
	bucket := os.Getenv("INPUT_BUCKET")

	traverse(path.Join("..", "..", "..", "dist"), bucket, moveToS3)
}
