# Datové struktury

## Pravidlo
* Středisko, fixní částka, procentní podíl, zbytek

## Sada pravidel
* Název
* Četnost použití
* Podmínky
  * Dodavatel
  * Popis
  * Cenový interval
* Uspořádaný seznam pravidel

# Usecase
1. V ABRA Flexi kliknu na "Rozúčtovat fakturu"
2. Přesměruje mě to do React aplikace a předá mi to sessionId a objectId
3. Přes REST API načtu fakturu
4. Ověřím, zda existuje sada pravidel které odpovídá faktuře 
   1. Existuje právě jedna
      1. Rozúčtuju podle něj fakturu na střediska
         1. Postupně se prochází pravidla v sadě a aplikují se na částku
         2. 
      2. Zobrazím uživateli seznam středisek s částkami (a eventuálně detaily k pravidlu)
      3. Uživatel upraví/potvrdí
      4. Uložím fakturu pomocí RESP API
   2. Existuje více
      1. Nabídnu uživateli seznam vhodných pravidel k výběru (nebo + na vytvoření nového)
      2. Uživatel vybere konkértní pravidlo
      3. goto 1
   3. Neexistuje žádná
      1. Uživatel rozúčtuje fakturu ručně
      2. Uložím fakturu pomocí RESP API
      3. Podle ručního rozúčtování se chytře (wtf jak) vytvoří pravidlo samo!!!
      4. A nabídne se editace sady s návrhy pravidel
      5. Nová sada se uloží pomocí RESP API
