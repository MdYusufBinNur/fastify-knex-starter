'use strict'

const EMAIL = '[a-z0-9]+@[a-z]+.[a-z]{2,3}'
const PASSWORD =
  '^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!@#$%^&?*])[a-zA-Z0-9!@#$%^&?*]{8,20}$'
const PHONE_NUMBER = '^\\+91[6789][0-9]{9}$'

module.exports = {
  EMAIL,
  PASSWORD,
  PHONE_NUMBER
}
