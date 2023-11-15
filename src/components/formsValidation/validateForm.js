function validateForm(formData) {

  if(!formData.userName.trim() || !formData.email.trim() || !formData.password.trim()){
    return false
  } else return true
}

export default validateForm
