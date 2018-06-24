const now = () => timeStampFromDate(new Date())
const timeStampFromDate = (date) => Math.round((date).getTime() / 1000)

module.exports = { now, timeStampFromDate }