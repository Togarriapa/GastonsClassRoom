const ageForm = document.getElementById('ageForm');

ageForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const myAge = document.getElementById('realAge');

  event.preventDefault();
  const message = myAge.value;

  localStorage.setItem('age', myAge.value);

  if (message) {
    localStorage.setItem('age', myAge.value);
    console.log("Saved age: " + localStorage.getItem('age'));

    window.location.href = 'ClassRoom.html';
  }
});
