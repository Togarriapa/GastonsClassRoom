const ageForm = document.getElementById('ageForm');

ageForm.addEventListener('click', (event) => {
  event.preventDefault();

  const myAge = document.getElementById('realAge');

  event.preventDefault();
  const message = myAge.value;

  localStorage.setItem('age',myAge.value);

  if (message) {
    console.log("Saved age: " + myAge.value);

    window.location.href = `ClassRoom.html?age=${myAge.value}`;
  }
});
