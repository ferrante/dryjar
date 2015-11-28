Nasz bot zlicza przekleństwa i inne kontrowersyjne słowa użyte na Slacku. Za każde nieładne słowo userowi nalicza się pewna kwota w PLN. 

Aby zredukować swój bilans, należy wesprzeć finansowo którąś z kampanii na http://siepomaga.pl. Jest to szczególnie ważne, bo kiedy user zgromadzi na swoim koncie więcej niż 30zł, będzie informowany przez naszego bota po każdej wypowiedzi, że przekroczył limit.

## Jak zredukować stan konta?

Gdy użytkownik nabił już  np. `50zł`, może zredukować stan swojego konta, wspierając finansowo dowolną kampanię z siepomaga.pl, np: https://www.siepomaga.pl/nogadlamarzeny. W specjalnym formularzu na stronie siepomaga.pl należy wpisać kwotę i swój user name na Slacku (np. http://cl.ly/image/1O1m0y2Z3G00). Gdy użytkownik wesprze akcję `20zł`, musi następnie wejść na Slacka i napisać:

`@dryjarbot check https://www.siepomaga.pl/nogadlamarzeny`

W ten sposób bot odnotuje płatność:

`Zapłaciłeś/aś 20PLN, dziękujęmy, brawo`

i odejmie ze stanu konta `20zł` przelane na akcje charytatywną. Stan konta wynosić będzie wtedy `30zł`.

Bot wspiera ujemny stan konta – można doładować daną akcję dowolną kwotą, a następnie odnotować ten fakt na Slacku. W ten sposób bilans użytkownika może być ujemny "na potem" ;-).

##Jak to zainstalować?

```
npm install
```

```
cd app
sails lift
```

##Jak to uruchomić 

W `app/config/slack.js` należy skonfigurować dane bota. Następnie wejść do `app` i wpisać `sails lift`. Uruchomi to aplikację.

## Komendy

`@dryjarbot stats`

Statystyki użytkowników z bilansem konta.

`@dryjarbot check link do akcji na siepomaga.pl`

Sprawdzenie płatności na siepomaga.pl i aktualizacja konta.

`@dryjarbot ideas`

Lista 3 wyróżnionych akcji charytatywnych, na które można dokonać płatności