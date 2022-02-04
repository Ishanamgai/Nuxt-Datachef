const isNullish = function (v) {
  return v === null || v === undefined
}

const filters = {
  filteredDate (date) {
    if (isNullish(date)) { return '--' }
    if (date === '') { return '' }
    const a = date.split('T')[0]
    const d = a.split('-')[2]
    const m = a.split('-')[1]
    const y = a.split('-')[0]
    const formatedyear = y.toString()
    return `${m}-${d}-${formatedyear}`
  },

  dateTime () {
    const dt = new Date('2021-11-22T14:12:16.113724Z')
    const dformat = `${(dt.getMonth() + 1).toString().padStart(2, '0')}/${
        dt.getDate().toString().padStart(2, '0')}/${
        dt.getFullYear().toString().padStart(4, '0')} ${
        dt.getHours().toString().padStart(2, '0')}:${
        dt.getMinutes().toString().padStart(2, '0')}`
    return dformat
  },
}

export {
  isNullish,
  filters,
}
