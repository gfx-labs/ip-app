import Cookies from 'universal-cookie'
import { useNavigate } from 'react-router'

const cookies = new Cookies()
let nav = useNavigate()

const toApp = () => {
  cookies.set('first-visit', 'not')
  nav('/', { replace: true })
}

export default toApp
