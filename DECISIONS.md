# Onduidelijkheden die ik tegenkwam en de keuzes die ik heb gemaakt

## Excursieduur bepalen

- **Hoe bepaal ik de excursie duur?:**
  - Ik weet dat het gaat om een periode buiten de minimale temperatuur (minC) en de maximale temperatuur (maxC).

  - Ik kan meten vanaf de eerste meting buiten de toegestane temperaturen (dus onder minC of boven maxC) tot de laatste meting buiten de toegestane temperaturen. Dit zou betekenen dat als er elke 15 minuten wordt gemeten en er twee metingen zouden zijn met waardes buiten de toegestane temperaturen waar de eerst volgende meting weer binnen het bereik is, er 15 minuten worden berekend voor deze excursie.

    **_Het voordeel van deze optie:_** je telt alleen de tijd waarvan je zeker weet dat de temperatuur buiten bereik was.

    **_Het nadeel van deze optie:_** als slecht één meting buiten bereik is, is de starttijd gelijk aan de eindtijd en de totale tijd dus 0.

  - Ik kan ook meten vanaf de eerste meting buiten de toegestane temperaturen tot de eerste meting binnen de toegestane temperaturen. Dit zou betekenen dat als er elke 15 minuten wordt gemeten, en er twee metingen buiten het bereik zijn, het 30 minuten duurde in totaal vanaf de eerste meting tot het punt van herstel.

    **_Het voordeel van deze optie:_** als er maar één meting buiten bereik is en de volgende meting weer binnen bereik is, wordt deze tijd wel berekend.

    **_Het nadeel van deze optie:_** stel de metingen stoppen terwijl de temperatuur nog buiten het bereik is, dan is er dus geen "punt van herstel" en is de totale gemeten tijd 0.

## API routes

- **Waarom vindt hij het label niet met het meegegeven id in POST /labels/:id/readings?**
  - Ik liep tegen het probleem aan dat deze route teruggaf: "Label not found" wanneer ik hem aanriep in Postman. Ik kwam erachter dat hij id in de vorm van een string zocht in de mock database, maar als het :id in /labels/:id/readings is natuurlijk een number. Door de methodes in de mock database allemaal een getal te laten verwachten en de API route ook werkte het aanroepen wel naar behoren en worden de readings opgeslagen met een foreign labelId.

## Overig

    - Is een excursie binnen- of gelijk aan de minimum en maximum temperatuur, of alleen binnen de minimum en maximum temperatuur (dus kleiner dan maxC en groter dan min C)?

    - Moet ik een excursie na elke eindtijd resetten en waar doe ik dat het beste?

    - Wanneer stel je de piektemperatuur vast?

    - Hoe zit het met de piektemperatuur vastleggen bij waardes onder de 0?

    - Maak ik eerst een excursie object aan voor het loopen en vul ik hem dan, of maak ik hem pas aan wanneer er een excursie start?

    - Maak ik voor elke "tabel" een eigen instantie van InMemoryDatabase of komen ze allemaal in dezelfde?

    - Ik vergat de routes eerst te registreren met fastify.register(functienaam) in app.ts, waardoor het testen niet ging.
