import Port from "../Port/Port"

const base =  window.location.hostname === "localhost" ? `http://localhost:${Port}/api/v1/reminders/` : `https://thetaskscheduler.herokuapp.com/api/v1/reminders/`

export default base 