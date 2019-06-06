
  
     document.getElementById("name-input").addEventListener('keyup', function(){validateName("name-input", "name-error")})
    document.getElementById("text-input").addEventListener('keyup', function() {validateName("text-input", "text-error")})
function validateName(fieldId, errorId){
  const nameInput = document.getElementById(fieldId)
  console.log(nameInput)
  const input = nameInput.value
  const isValid = nameIsValid(input)
  const message =document.getElementById(errorId)
  const sendButton = document.getElementById("button")
  if(isValid){
    message.innerHTML = ""
    sendButton.disabled=false
  }
  else{
    message.innerHTML ="Text input must be two or more letters."
    sendButton.disabled=true
  }
}
    function nameIsValid(name){
      if(name.length < 2 ){
        return false;
      }
      else{
        return true
}
      const checker = /^[a-zA-Z]+$/
      return checker.test(name)
    }
    