import React from 'react'
import styles from './TextInput.module.css'

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

export default function TextInput(props: TextInputProps) {
  const inputStyles = ['mb-3', styles.textInput]

  return (
    <div className={inputStyles.join(' ')}>
      <label className='form-label'>{props.label}</label>
      <input className='form-control' {...props} />
    </div>
  )
}
