import { Link } from 'react-router-dom'
import CustomCard from '../../components/custom-card/CustomCard'

export default function HomePage() {
  return (
    <div className='row justify-content-center'>
      <div className='col-sm-5'>
        <CustomCard>
          <div>Home Page</div>
          <ul>
            <li>
              <Link to='/client-table'>client side table example</Link>
            </li>
            <li>
              <Link to='/server-table'>server side table example</Link>
            </li>
          </ul>
        </CustomCard>
      </div>
    </div>
  )
}
