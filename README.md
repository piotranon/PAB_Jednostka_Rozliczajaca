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