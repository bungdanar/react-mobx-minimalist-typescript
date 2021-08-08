import Loader from 'react-loader-spinner'

interface CustomLoaderProps {
  size?: number
  color?: string
}

export default function CustomLoader({
  size = 22,
  color = '#ae4d3b',
}: CustomLoaderProps): JSX.Element {
  return <Loader type='Bars' color={color} height={size} width={size} />
}
