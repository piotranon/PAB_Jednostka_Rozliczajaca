# PAB_Jednostka_Rozliczajaca
 
## Autorzy
Bochaczyk Krzysztof, Bury Karol, Dyndał Patryk, Długosz Piotr, Filar Kamil

## Spis treści

## Procesy biznesowe

https://lucid.app/invitations/accept/87655b43-2da9-4736-95b8-61e859310afe

1. Dodanie nowego banku jeśli nie istnieje.
    1. Utworzenie numeru rachunku zgodnie z wzorem ```SK BBBB BBBB 0000 0000 0000 0000```  
    **SK** - suma kontrolna wyliczana podczas rejestracji   
    **BBBB BBBB** - unikalny numer bannku
    
1. Przyjęcie operacji przelewów do innych banków.  
    1. Przyjęcie listy obiektów przelewów.  
        1. Bank_Info - informacje odnośnie banku.
        1. Outgoing_Transfers - przelewy wychodzące z banku.
        1. Incorrect_Transfers - przelewy błędne wychodzące z banku.
        ```json
        {
            "Bank_Info":{
                "Bank_Number":"SK BBBB",
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
            "Incorrect_Transfers":{
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
    1. Weryfikacja czy numer konta zleceniodawcy jest zgodny z numerem konta banku.
        1. Jeśli zgodny to zapisuje do wykonania.
        1. Jeśli nie zgodny zapisuje do zwrotu.
    1. 
1. Wyświetlanie informacji odnośnie danych banku.  
    1. Aktualny stan konta
    1. Historia operacji (uznania/obciążenia)