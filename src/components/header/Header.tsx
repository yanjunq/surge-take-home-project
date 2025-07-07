
import './header.css'

type Props = {
    subTitle: string
    title: string
    text:string
}

export function Header({subTitle, title, text}: Props) {
  return (
    <div className='header'>
        <div>{subTitle}</div>
        <div className='title'>{title}</div>
        <div className='text'>{text}</div>
    </div>
  )
}