const checkInputs = () => {
    const inputTel = document.querySelectorAll('input[name="user_phone"]'),
          inputWidth = document.querySelectorAll('#width'),
          inputHeight = document.querySelectorAll('#height')

    function checkInput(input) {
        input.forEach(item => {
            item.addEventListener('input', () => {
                item.value = item.value.replace(/\D/g, '')
            })
        })
    }

    checkInput(inputTel)
    checkInput(inputHeight)
    checkInput(inputWidth)
}

export default checkInputs