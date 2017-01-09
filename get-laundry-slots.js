const Nightmare = require("nightmare")

module.exports = callback => {
  Nightmare({ show: process.env.ENV === "development" })
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
      const laundrySlotInputRegex = /_ctl0:ContentPlaceHolder1:(\d),\d,\d,/
      const createLaundrySlot = rawData => {
        const [_0, weekDay] = rawData.name.match(laundrySlotInputRegex)
        const [_1, timePeriod, title] = rawData.title.match(/^(\d\d:\d\d-\d\d:\d\d) \((.*)\)/)

        return {
          weekDay,
          timePeriod,
          available: title === "Ledigt",
          originalFormName: rawData.name
        }
      }

      return Array.prototype.slice.call(candidates)
        .filter(candidate => laundrySlotInputRegex.test(candidate.name))
        .map(createLaundrySlot)
    })
    .then(callback)
    .catch(err => console.log(err))
}
