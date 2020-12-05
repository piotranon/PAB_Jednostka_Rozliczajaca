# PAB_Jednostka_Rozliczajaca
 
## Autorzy
Bochaczyk Krzysztof, Bury Karol, Dyndał Patryk, Długosz Piotr, Filar Kamil

## Spis treści
1. [Procesy biznesowe](https://github.com/piotranon/PAB_Jednostka_Rozliczajaca#procesy-biznesowe)

## Procesy biznesowe
[<img src="./img/procesyBiznesowe.svg">](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1CxdqwrclNktHwcE07UlyG85WAzIhZnhK%26export%3Ddownload)

## [Link do BPMN](https://viewer.diagrams.net/?highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1CxdqwrclNktHwcE07UlyG85WAzIhZnhK%26export%3Ddownload)

1. Rozliczanie płatności pomiędzy bankami.  

    Jednostka rozliczeniowa przyjmuję informację odnośnie banku, przelewów danego banku, natomiast zwraca dane odnośnie przelewów wykonanych do danego banku.

      * Format danych odbieranych:   
        * Bank_Info - informacje odnośnie banku (służą do identyfikacji banku)
        * Outgoing_Transfers - przelewy wychodzące (przelewy wykonane przez użytkowników banku)
        * Outgoing_Incorrect_Transfers - przelewy wychodzące błędne (przelewy które zostały przysłane do banku lecz nie są poprawne (nie ma takiego konta, nie zgadzaja sie dane))
        ```json
            {
                "Bank_Info":{
                    "Bank_Number":"BBBB BBBB",
                    "Total_Transfer_Amount":0.00
                },
                "Outgoing_Transfers":{
                    "Transfers_Amount": 0.00,
                    "Transfers":[
                        {  
                        "Payer":{
                            "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                            "Name": "imie nazwisko",
                            "Address": "adres odbiorcy"
                        },
                        "Recipient":{
                            "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                            "Name": "imie nazwisko",
                            "Address": "adres odbiorcy"
                        },
                        "Title":"tytuł przelewu",
                        "Transfer_Amount": 0.00
                        }
                    ]
                },
                "Outgoing_Incorrect_Transfers":{
                    "Transfers_Amount": 0.00,
                    "Transfers":[
                        {  
                        "Payer":{
                            "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                            "Name": "imie nazwisko",
                            "Address": "adres odbiorcy"
                        },
                        "Recipient":{
                            "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                            "Name": "imie nazwisko",
                            "Address": "adres odbiorcy"
                        },
                        "Title":"tytuł przelewu",
                        "Transfer_Amount": 0.00
                        }
                    ]
                }
            }
        ```
    * Format danych zwracanych:  
        *  Total_Transfer_Amount - całkowita kwota przelewów
        *  Incoming_Transfers - przelewy przychodzące do banku
        *  Incoming_Incorrect_Transfers - przelewy zawrócone (przelewy zwrocone przez inne banki, nie istnieje bank odbierający w systemie)
        ```json
            {
                "Total_Transfer_Amount":0.00,
                "Incoming_Transfers":{
                    "Transfers_Amount": 0.00,
                    "Transfers":[
                        {  
                        "Payer":{
                            "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                            "Name": "imie nazwisko",
                            "Address": "adres odbiorcy"
                        },
                        "Recipient":{
                            "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                            "Name": "imie nazwisko",
                            "Address": "adres odbiorcy"
                        },
                        "Title":"tytuł przelewu",
                        "Transfer_Amount": 0.00
                        }
                    ]
                },
                "Incoming_Incorrect_Transfers":{
                    "Transfers_Amount": 0.00,
                    "Transfers":[
                        {  
                        "Payer":{
                            "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                            "Name": "imie nazwisko",
                            "Address": "adres odbiorcy"
                        },
                        "Recipient":{
                            "Account_Number": "SK BBBB BBBB 0000 0000 0000 0000",
                            "Name": "imie nazwisko",
                            "Address": "adres odbiorcy"
                        },
                        "Title":"tytuł przelewu",
                        "Transfer_Amount": 0.00
                        }
                    ]
                }
            }
        ```

## Opis struktury

### Bank ma 2 konta  
	1. konto do przelewów obciążenia (przelewy wykonane z danego banku)  
	2. konto do przelewów uznania (przelewy odebrane dla danego banku)

## Opis algorytmu sesji w postaci kroków
1. przy przysłaniu danych weryfikacja czy rachunek istnieje 
    1. nie  
		Weryfikujemy czy numer banku jest poprawny? (algorytm Cyfra kontrolna dla numeru oddziału banku w Polsce) https://romek.info/ut/banki.html  
	    1. nie    
	        1. komunikat niepoprawny numer konta banku  
			1. koniec działania  
		1. tak  
			1. tworzymy obiekt banku oraz 2 konta
                1. konto obciążeń (przelewy wykonane z danego banku)  
                1. konto uznań (przelewy odebrane dla danego banku)
	1. tak  
	    1. idziemy dalej

2. sprawdzamy sumy przelewow poprawnych, błędnych wracajacych
	1. poprawne
	    1. idziemy dalej
	1. błędne
	    1. komunikat niepoprawna suma przelewow
	    1. koniec działania

3. weryfikacja sumy przelewów poprawnych (iteracja po wszystkich przelewach przysłanych poprawnych dodanie kosztu ich do zmiennej i porownanie z Total_Amounts przelewów poprawnych)
	1. poprawne
	    1. idziemy dalej
	1. błędne
	    1. komunikat niepoprawna kwota całkowita przelewów poprawnych
	    1. koniec działania

4. weryfikacja sumy przelewów błędnych (iteracja po wszystkich przelewach przesłanych błędnych dodanie kosztu do zmiennej i porownanie z Total_Amounts przelewów błędnych)
	1. poprawne
	    1. idziemy dalej
	1. błędne
		1. komunikat niepoprawna kwota całkowita przelewów błędnych
		1. koniec działania

5. weryfikacja przelewów (iteracja po każdym przelewie poprawnym)
	1. sprawdzenie czy numer  konta banku z którego został wysłany przelew jest zgodny z numerem konta klienta wykonujacego przelew
		1. poprawny
			1. idziemy dalej
		2. błędny
			1. komunikat przelew ($object) ma niezgodny numer konta bankowego z numerem konta waszego banku (banku który wysłał przelew)
			1. koniec działania  
	1.  sprawdzanie sum kontrolnych numeru konta osoby wysyłającej przelew (Payer) 
		1. poprawny
			1. idziemy dalej
		2. błędny
			1. komunikat przelew ($object) ma niezgodny numer konta bankowego płacącego z domyślnym standardem numerów IBAN obowiązujących w Polsce
			1. koniec działania
	1. sprawdzanie czy bank odbiorcy istnieje u nas w systemie (Recipient)
		1. poprawny
			1. idziemy dalej
		2. błędny
			1. komunikat przelew ($object) bank odbiorcy nie istnieje u nas w systemie
			1. koniec działania
	1.  sprawdzanie sum kontrolnych numeru konta osoby odbierajacej przelew (Recipient)
		1. poprawny
			1. idziemy dalej
		2. błędny
			1. komunikat przelew ($object) numer banku odbiorcy nie jest zgodny z domyślnym standardem IBAN
			1. koniec działania

6. zapis przelewów poprawnych (wszystkich poprawnych)
	1. Iterujemy po wszystkich przelewach poprawnych
		1. przypisujemy wszystkie przelewy poprawne do konta przelewów obciążenia (status = 1 ["zapisano"])

7. zapis przelewów błędnych (wszysytkich błędnych)
	1. Iterujemy po wszystkich przelewach błędnych

		1. Szukamy banku nadawcy po numerze banku z numeru konta nadawcy;
		2. Szukamy przelewu w przelewach obciazenia danego banku;
			1. zmieniamy mu status na (status = 3["zawrocono"]) 

8. pobranie przelewów wykonanych do danego banku.
	1. pobranie przelewów uznania danego banku gdzie (status = 1 ["zapisano"])
		1. (iteracja po kazdym)
			1. zmiana statusu na (status = 2["wysłano"])
			1. dodanie przelewu do Incoming_Transfers>Transfers
			1. dodanie kwoty przelewu do Incoming_Transfers.Transfers_Amount


	1. pobranie przelewów obciazenia do danego banku gdzie (status = 3 ["zawrocono"]).
		1. (iteracja po kazdym)
			1. zmiana statusu na (status = 4["powrocono do nadawcy"])
			1. dodanie przelewu do Incoming_Incorrect_Transfers.Transfers
			1. dodanie kwoty przelewu do Incoming_Incorrect_Transfers.Transfers_Amount

9. obliczenie sumy transakcji  
    ```Total_Transfer_Amount = Incoming_Transfers.Transfers_Amount + Incoming_Incorrect_Transfers.Transfers_Amount;```
10. zwrocenie obiektu z przelewami