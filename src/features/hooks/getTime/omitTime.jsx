import { useCallback } from "react"
import useTimeFunc from "./useTimeFunc"

const omitTime = (compareTime) => {
  const dt = useTimeFunc()
  if (!dt || !compareTime) return ''

  let data

  // 年
  if (dt.slice(0, 5) === compareTime.slice(0, 5)) {
    data = compareTime.replace(compareTime.slice(0, 5), '')
  } else {
    return
  }

  // 月日
  // 10~12月の場合
  if (dt.slice(5, 7) === '10' || dt.slice(5, 7) === '11' || dt.slice(5, 7) === '12') {
    // 日付が二桁の場合
    if (Number(dt.slice(8,10)) > 10) {
      if (dt.slice(5, 14) === compareTime.slice(5, 14)) {
        data = data.replace(compareTime.slice(5, 14), '')
      }
    }
    // 日付が一桁の場合
    else {
      if (dt.slice(5, 13) === compareTime.slice(5, 13)) {
        data = data.replace(compareTime.slice(5, 13), '')
      }
    }
  }
  // 1～9月の場合
  else {
    // 日付が二けたの場合
    if (typeof dt.slice(7, 9) === Number) {
      if (dt.slice(5, 13) === compareTime.slice(5, 13)) {
        data = data.replace(compareTime.slice(5, 13), '')
      }
    }
    // 日付が一桁の場合
    else {
      if (dt.slice(5, 12) === compareTime.slice(5, 12)) {
        data = data.replace(compareTime.slice(5, 12), '')
      }
    }
  }
  return data
}

export default omitTime
