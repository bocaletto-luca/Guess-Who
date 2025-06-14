   const board = document.getElementById('board');
      const resetButton = document.getElementById('resetButton');
      const questionResultEl = document.getElementById('questionResult');

      // Array di 18 personaggi con attributi
      const characters = [
        { name: "Anna",        emoji: "😊", attributes: { occhiali: false, cappello: true,  barba: false, capelli_lunghi: true,  sorridente: true } },
        { name: "Marco",       emoji: "😎", attributes: { occhiali: true,  cappello: false, barba: true,  capelli_lunghi: false, sorridente: false } },
        { name: "Luisa",       emoji: "😄", attributes: { occhiali: false, cappello: false, barba: false, capelli_lunghi: true,  sorridente: true } },
        { name: "Gianni",      emoji: "🤠", attributes: { occhiali: false, cappello: true,  barba: true,  capelli_lunghi: false, sorridente: false } },
        { name: "Sara",        emoji: "😇", attributes: { occhiali: false, cappello: false, barba: false, capelli_lunghi: true,  sorridente: true } },
        { name: "Paolo",       emoji: "😏", attributes: { occhiali: true,  cappello: true,  barba: true,  capelli_lunghi: false, sorridente: false } },
        { name: "Luca",        emoji: "😃", attributes: { occhiali: false, cappello: false, barba: false, capelli_lunghi: false, sorridente: true } },
        { name: "Federica",    emoji: "🤩", attributes: { occhiali: true,  cappello: false, barba: false, capelli_lunghi: true,  sorridente: true } },
        { name: "Roberto",     emoji: "🧐", attributes: { occhiali: true,  cappello: true,  barba: true,  capelli_lunghi: false, sorridente: false } },
        { name: "Elisa",       emoji: "😌", attributes: { occhiali: false, cappello: false, barba: false, capelli_lunghi: false, sorridente: true } },
        { name: "Matteo",      emoji: "😐", attributes: { occhiali: true,  cappello: true,  barba: false, capelli_lunghi: false, sorridente: false } },
        { name: "Claudia",     emoji: "😃", attributes: { occhiali: false, cappello: true,  barba: false, capelli_lunghi: true,  sorridente: true } },
        { name: "Giulia",      emoji: "😉", attributes: { occhiali: false, cappello: false, barba: false, capelli_lunghi: true,  sorridente: true } },
        { name: "Stefano",     emoji: "😅", attributes: { occhiali: true,  cappello: false, barba: true,  capelli_lunghi: false, sorridente: false } },
        { name: "Martina",     emoji: "😁", attributes: { occhiali: false, cappello: false, barba: false, capelli_lunghi: true,  sorridente: true } },
        { name: "Alessandro",  emoji: "😃", attributes: { occhiali: true,  cappello: false, barba: true,  capelli_lunghi: false, sorridente: false } },
        { name: "Sofia",       emoji: "😊", attributes: { occhiali: false, cappello: false, barba: false, capelli_lunghi: true,  sorridente: true } },
        { name: "Davide",      emoji: "😏", attributes: { occhiali: true,  cappello: true,  barba: true,  capelli_lunghi: false, sorridente: false } }
      ];

      // Seleziona casualmente il personaggio segreto (il giocatore non ne conosce l'identità)
      const secretCharacter = characters[Math.floor(Math.random() * characters.length)];

      // Variabile per i filtri attivi
      let activeFilters = {};

      // Funzione per aggiornare le card in base ai filtri attivi
      function updateCardsBasedOnFilters() {
        document.querySelectorAll('.character-card').forEach(card => {
          // Non modificare la secret card
          if (card.id === 'secretCard') return;
          let idx = card.dataset.index;
          let character = characters[idx];
          let matches = true;
          for (let key in activeFilters) {
            if (character.attributes[key] !== activeFilters[key]) {
              matches = false;
              break;
            }
          }
          if (!matches) {
            card.classList.add('disabled');
          } else {
            card.classList.remove('disabled');
          }
        });
      }

      // Creazione dinamica delle card del tabellone
      characters.forEach((character, index) => {
        const card = document.createElement('div');
        card.className = 'character-card';
        card.dataset.index = index;
        card.innerHTML = `<div style="font-size: 40px;">${character.emoji}</div>
                          <div>${character.name}</div>`;
        board.appendChild(card);

        // Al click sulla card, controlla se corrisponde al personaggio segreto
        card.addEventListener('click', () => {
          if (character.name === secretCharacter.name) {
            const winModalElement = document.getElementById('winModal');
            const winModal = new bootstrap.Modal(winModalElement);
            winModal.show();
            anime({
              targets: card,
              scale: [1, 1.2],
              duration: 300,
              direction: 'alternate',
              easing: 'easeInOutQuad'
            });
          } else {
            card.classList.add('disabled');
            card.dataset.guessed = "true";
          }
        });
      });

      // Pulsante di reset per ricaricare la pagina
      resetButton.addEventListener('click', () => {
        location.reload();
      });

      // Funzione per applicare una domanda filtrante
      window.askQuestion = function(attribute, friendlyName) {
        activeFilters[attribute] = secretCharacter.attributes[attribute];
        questionResultEl.innerHTML += `<div><strong>${friendlyName}:</strong> ${secretCharacter.attributes[attribute] ? "Sì" : "No"}</div>`;
        updateCardsBasedOnFilters();
      }

      // Funzione per svuotare i filtri attivi
      window.clearFilters = function() {
        activeFilters = {};
        questionResultEl.innerHTML = "";
        document.querySelectorAll('.character-card').forEach(card => {
          if (card.id === 'secretCard') return;
          if (card.dataset.guessed !== "true") {
            card.classList.remove('disabled');
          }
        });
      }
    });
