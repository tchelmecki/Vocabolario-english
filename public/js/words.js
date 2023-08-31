const wordsContainer = document.getElementById('words-container');

        // Parsowanie parametrów z adresu URL
        const urlParams = new URLSearchParams(window.location.search);
        const categoryParam = urlParams.get('category');
// Obsługa kliknięcia w divy
const divs = document.querySelectorAll('.tile1');
divs.forEach((div) => {
  div.addEventListener('click', () => {
    const category = div.dataset.category;
    window.location.href = `/words?category=${category}`;
  });
});

        // Pobieranie zawartości pliku JSON
        /*fetch('words.json')
            .then(response => response.json())
            .then(data => {
                // Wyszukiwanie kategorii w pliku JSON
                const category = data.categories.find(c => c.name === categoryParam);

                // Wyciąganie słów z wybranej kategorii
                const words = category.words;

                // Usuwanie informacji o ładowaniu
                wordsContainer.innerHTML = '';

                // Wyświetlanie słów w tabeli
                words.forEach(word => {
                    const row = document.createElement('tr');
                    const polishCell = document.createElement('td');
                    const englishCell = document.createElement('td');

                    polishCell.textContent = word.polish;
                    englishCell.textContent = word.english;

                    row.appendChild(polishCell);
                    row.appendChild(englishCell);

                    wordsContainer.appendChild(row);
                });
            })
            .catch(error => console.error('Błąd ładowania pliku JSON:', error));
           */
            //const form = document.querySelector('#myform');
            
/*form.addEventListener('submit', event => {
  event.preventDefault();

  const polish = form.elements['polish'].value;
  const english = form.elements['english'].value;

  fetch('/words/:categoryId', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ polish, english })
  })
    .then(response => response.text())
    .then(data => {
      console.log(data);
    });
});*/