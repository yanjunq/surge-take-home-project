
import './header.css'

type Props = {
    subTitle: string
    title: string
    text:string
}

export function Header({subTitle, title, text}: Props) {
  return (
    <div className='header'>
        <h2 className='sub-title'>{subTitle}</h2>
        <h1 className='title'>{title}</h1>
        <p className='text'>{text}</p>
    </div>
  )
}