import { useEffect, useState } from 'react'

const useCurrentTime = () => {
  const [date, setDate] = useState(new Date())
  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  })

  return date
}

export default useCurrentTime
