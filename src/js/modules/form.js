import checkInputs from "./checkInputs";

const form = (state) => {
    const forms = document.querySelectorAll('form'),
        modalStatus = document.createElement('div'),
        modalSubmit = document.querySelectorAll('[data-modal]')

    checkInputs()


    const message = {
        success: 'Данные отправлены успешно!',
        failure: 'Произошла ошибка при отправке данных!',
        loading: 'Идет отправка...'
    }

    function modalClose(modal) {
        modal.forEach(item => {
            item.style.display = 'none'
            document.body.style.overflow = ''
        });
    }

    function showStatusModal(statusMessage) {
        modalStatus.innerHTML = `
            <div class="popup_dialog">
                <div class="popup_content text-center">
                    <div class="popup_message">${statusMessage}</div>
                </div>
            </div> 
        `;

        // Отображаем модальное окно
        modalStatus.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
    // Функция для обновления статуса модального окна
    function updateStatusModal(newMessage) {
        const messageElement = modalStatus.querySelector('.popup_message');
        if (messageElement) {
            messageElement.textContent = newMessage;
        }
    }

    modalStatus.classList.add('popup')
    document.querySelector('body').append(modalStatus)

    forms.forEach(item => postForm(item))

    async function postForm(form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const formData = new FormData(form);

            for (let key in state) {
                if (state[key] !== undefined && state[key] !== '') {
                    formData.append(key, state[key]);
                }
            }
    
            // Отображение статуса загрузки
            showStatusModal(message.loading)

            try {
                // Отправка данных на сервер
                const response = await fetch('server.php', {
                    method: 'POST',
                    body: formData
                });

                if (!response.ok) {
                    throw new Error(`Ошибка: ${response.status}`);
                }

                const data = await response.text(); // Или `response.json()` для JSON
                console.log(message.success);
                console.log('Ответ сервера:', data);

                // Закрываем текущие модальные окна
                modalClose(modalSubmit);

                // Отображаем статус успешной отправки
                updateStatusModal(message.success);

            } catch (error) {
                console.error(message.failure);
                console.error('Ошибка:', error);

                // Отображаем сообщение об ошибке
                updateStatusModal(message.failure);
            } finally {
                console.log('FINALLY');
                form.reset(); // Очистка формы
                // Закрываем модальное окно статуса через 2 секунды
                setTimeout(() => {
                    modalStatus.style.display = 'none';
                    document.body.style.overflow = '';
                }, 2000);
            }
        });
    }
};

export default form;
