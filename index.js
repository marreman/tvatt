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
  .then(() => {
    console.log("done")
  })
