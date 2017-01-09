const env = require("dotenv")
const getLaundrySlots = require("./get-laundry-slots")

env.config()

getLaundrySlots(slots => {
  console.log(slots)
})
