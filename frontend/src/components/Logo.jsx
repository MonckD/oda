import logo from '../assets/logo_oda.png'

export default function Logo({ className = 'h-12 w-12' }) {
  return <img src={logo} alt="Logo Orange Digital Center" className={`${className} object-contain`} />
}
