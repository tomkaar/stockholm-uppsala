import "dayjs/locale/sv"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"

import dayjs from "dayjs"

dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.locale("sv")
dayjs.tz.setDefault("Europe/Stockholm")

export default dayjs
