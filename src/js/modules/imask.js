import IMask from 'imask';

const maskForTel = () => {
    const elements = document.querySelectorAll('#phone'); 

    elements.forEach(element => {
        element.addEventListener('input', () => {
            const maskOptions = {
                mask: '+{7}(000)000-00-00'
            };
            IMask(element, maskOptions);
        })
    });
};

export default maskForTel;
