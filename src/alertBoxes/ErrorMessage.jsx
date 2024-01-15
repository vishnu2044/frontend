import Swal from 'sweetalert2';

export const ErrorMessge = ({message}) => Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: message,
  })