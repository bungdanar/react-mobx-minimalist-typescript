interface CustomDividerProps {
  color?: string
}

export default function CustomDivider({ color }: CustomDividerProps) {
  let colorStyle = color ?? '#ffffff'

  return (
    <div
      style={{
        borderTop: '1px dashed #e7eaec',
        color: '#ffffff',
        backgroundColor: colorStyle,
        height: '1px',
        margin: '20px 0',
      }}
    ></div>
  )
}
