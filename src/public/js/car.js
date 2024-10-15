const btnCar = document.querySelector('.car-profile')
const containerCarPrd = document.querySelector('.container-car-prd')

btnCar.addEventListener('click', () => {
    containerCarPrd.classList.toggle('hidden-car');
});