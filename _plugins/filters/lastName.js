//
// CUSTOMIZED FILE
// New filter to support better PDF running heads
//
/**
 * @param     {Object} person or array of people
 * @property  {Object} full_name
 * @property  {Object} last_name
 * @param     {Object} options
 *
 * @return {String} Last name, or fullname
 * @example "Johnson"
 */

module.exports = (person, options) => {
  const {
    full_name: fullName,
    last_name: lastName
  } = person
  if (lastName) {
    return lastName;
  } else if (fullName) {
    return fullName;
  }
}
