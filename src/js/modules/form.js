import modal from "./modal"

const form = () => {
    const forms = document.querySelectorAll('form')

    const message = {
        succes: 'Отправлено',
        failure: 'Ошибка',
        loading: 'Идет отправка'
    }

    forms.forEach(item => postForm(item))

    function postForm(form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault()

                const formData = new FormData(form)

                fetch('server.php', {
                    method: 'POST',
                    body: formData
                })
                    .then(data => {
                        return data.text()
                    })
                    .then(data => {
                        console.log(data)
                    })
                    .catch(() => {
                        console.log(message.failure)
                    })
                    .finally(() => {
                        console.log('FINALLY')
                    })
            })

    }

}

export default form