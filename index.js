const env = require("dotenv")
const Nightmare = require("nightmare")

env.config()


Nightmare({ show: true })
  .goto(process.env.URL)
  .type("input[name='_ctl0:ContentPlaceHolder1:tbUsername']", process.env.USERNAME)
  .type("input[name='_ctl0:ContentPlaceHolder1:tbPassword']", process.env.PASSWORD)
  .click("input[name='_ctl0:ContentPlaceHolder1:btOK']")
  .wait("a#_ctl0_LinkBooking")
  .click("a#_ctl0_LinkBooking")
  .wait("#_ctl0_ContentPlaceHolder1_dgForval tr:last-child a")
  .click("#_ctl0_ContentPlaceHolder1_dgForval tr:last-child a")
  .wait("#_ctl0_ContentPlaceHolder1_infostatus input")
  .evaluate(() => {
    const candidates = document.querySelectorAll("#_ctl0_ContentPlaceHolder1_infostatus input")
    const bookingTimeInputRegex = /_ctl0:ContentPlaceHolder1:(\d),(\d),(\d),/
    const createBookingTime = rawData => {
      const [_, weekDay, timePeriod, machinePair] = rawData.name.match(bookingTimeInputRegex)

      return {
        weekDay,
        timePeriod,
        machinePair,
        originalFormName: rawData.name,
        text: rawData.title
      }
    }

    return Array.prototype.slice.call(candidates)
      .filter(candidate => bookingTimeInputRegex.test(candidate.name))
      .map(createBookingTime)
  })
  .then(times => {
    console.log("done", times)
  })
