# Simple task scheduler for a client.

![](https://img.shields.io/badge/made%20by-DarienMiller-blue)
![](https://img.shields.io/badge/Golang-1.17-yellow)
![](https://img.shields.io/badge/build-passing-green)
![](https://img.shields.io/badge/MongoDB-Cloud-green)
![](https://img.shields.io/badge/Twilio-API-red)

## Landing page to view upcoming reminders
<img width="960" alt="home-page" src="https://user-images.githubusercontent.com/32966645/136648169-b764738a-57a8-407e-8951-15b2ff5b1434.PNG">

## Page to post reminders to the server.
<img width="959" alt="set-reminder-page" src="https://user-images.githubusercontent.com/32966645/137986570-7bee83ec-3925-4132-b26b-984bd733f472.PNG">

## Single occuring reminder page on mobile.
<img width="202" alt="task scheduler mobile 2" src="https://user-images.githubusercontent.com/32966645/137986738-a21a4b68-9de4-49ef-974d-393b402eb9e7.PNG">

## Reoccuring reminder page on mobile.
<img width="202" alt="task scheduler mobile" src="https://user-images.githubusercontent.com/32966645/137986759-16fcd666-407a-4c64-a739-4fffd79b5b3e.PNG">

## Description

Full stack chat application built using Golang and MongoDB in the backend, and HTML, CSS, and Javascript in the frontend. This is an app for a client requiring a personalized task scheduler for their everyday use. Features I aim to add include:

 - JWT + Google OAuth2 authentication.
 - Text reminders using the Twilio API

 There's more to come!

### Built With

* [Gin](https://github.com/gin-gonic/gin)
* [Bootstrap](https://getbootstrap.com)
* [MongoDB-Atlas](https://www.mongodb.com/cloud/atlas)
* [Twilio](https://www.twilio.com/try-twilio)

 ## Check it out here!:
https://thetaskscheduler.netlify.app/

 ## Getting Started

 ### Installation
 * [Golang-1.17](https://go.dev/learn/)
 * [MongoDB-Atlas](https://www.mongodb.com/cloud/atlas)
 * [Twilio](https://www.twilio.com/try-twilio)

### Requirements
* Clone the repository using `git clone https://github.com/darienmiller88/Task-Scheduler`
* Migrate the necessary information to your local `.env` as described in the `.env_sample` file
* Run `go build` to create a root level `task_scheduler.exe` file, and then run `.\task_scheduler` to run the executable. If an executable is not needed, simply input `go run main.go` instead, or `.\fresh` to enable a server restart on change.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Feel free to leave suggestions as well, I'm always looking for ways to improve!

<p align="right">(<a href="#top">back to top</a>)</p>

## License
[MIT](https://choosealicense.com/licenses/mit/)