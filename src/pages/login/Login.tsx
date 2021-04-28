import CustomCard from '../../components/custom-card/CustomCard'
import TextInput from '../../components/text-input/TextInput'

export default function LoginPage() {
  return (
    <div className="row justify-content-center">
      <div className="col-sm-4">
        <CustomCard>
          <form>
            <TextInput label="Email" type="text" />
            <TextInput label="Password" type="password" />
          </form>
        </CustomCard>
      </div>
    </div>
  )
}
