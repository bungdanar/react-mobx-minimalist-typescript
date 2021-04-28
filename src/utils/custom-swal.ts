import Swal from 'sweetalert2'

const baseSwal = Swal.mixin({
  allowEscapeKey: false,
  allowOutsideClick: false,
})

const successSwal = (title: string = 'Success', text: string = '') =>
  baseSwal.fire({
    icon: 'success',
    title,
    text,
  })

const errorSwal = (title: string = 'Error', text: string = '') =>
  baseSwal.fire({
    icon: 'error',
    title,
    text,
  })

const confirmSwal = (
  title: string = 'Question?',
  text: string = '',
  confirmButtonText: string = 'Ok'
) =>
  baseSwal.fire({
    icon: 'question',
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
  })

const loadingSwal = (loadingText: string = 'Loading...') =>
  baseSwal.fire({
    html: loadingText,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading()
    },
  })

// IF YOU WANT TO PROGRAMMATICALLY CLOSE SWAL INSTANCE
// DO NOT AWAIT THOSE SWAL INSTANCE
const handleCloseSwal = () => {
  Swal.close()
}

export {
  baseSwal,
  successSwal,
  errorSwal,
  confirmSwal,
  loadingSwal,
  handleCloseSwal,
}
