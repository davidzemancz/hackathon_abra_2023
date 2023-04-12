# Usecase
1. V ABRA Flexi kliknu na "Rozúčtovat fakturu"
2. Přesměruje mě to do React aplikace a předá mi to sessionId a objectId
3. Přes REST API načtu fakturu
4. Ověřím, zda existuje pravidlo které odpovídá faktuře [Pravidla]
   1. Existuje právě jedno
      1. Rozúčtuju podle něj fakturu a zobrazím ji uživateli
      2. Uživatel potvrdí/upraví
      3. Uložím pravidlo
   2. Existuje více
   3. Neexistuje žádné
5. 