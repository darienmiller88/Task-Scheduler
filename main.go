package main

import (
	"fmt"
	"os"
	"github.com/joho/godotenv"
)

func main()  {
	//Load env file.
	godotenv.Load()

	os.Getenv("")

	fmt.Println("Hello world")
}