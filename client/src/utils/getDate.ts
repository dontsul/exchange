export const getDate = (dateString: string) => {
  const date = new Date(dateString)

  const year = date.getFullYear()
  const month = date.getMonth() + 1 // Месяцы в JavaScript нумеруются с 0
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")}`
  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`

  return {
    formattedDate,
    formattedTime,
  }
}
