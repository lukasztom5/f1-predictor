Historie użytkownika

1. Jako kibic chcę, żeby można było przeglądać wyniki ze wszystkich sezonów formuły 1 jakie rozegrano
     Kryteria akceptacji:
	    - blokada jeśli użytkownik wybierze rok, w którym nie było sezonu np. 1948 lub 2055
		- wyświetli wyniki wybranego sezonu - lista wyścigów, zwycięzca (kierowca i konstruktow), klasyfikacja kierowców (od 1950), klasyfikacja konstruktorów (od 1958)
		- Po podaniu nowego roku, wyświetli sezon z wybranego roku
		- brak wyników przy wyścigu bez wyników
		
2. Jako kibic chcę, żeby wyświetliło wyniki z wybranego Grand prix
   
   kryteria akceptacji:

		- po wybraniu grand prix wyświetli listę wszystkich zwycięzców - kierowców,zespół i rok np. grand prix Wielkiej Brytanii

		
3. Jako kibic chcę, żeby wyświetliło wyniki wyścigów rozgrywanym na wybranym torze
  
   kryteria akceptacji:
        - po wyborze wyświetli listę wszystkie grand prix i zwycięzców - np. tor Monza
		- po wybraniu innego toru, wyświetla wyniki z innego toru

		
4. Jako kibic chcę, żeby była możliwość typowania mistrza świata kierowców i konstruktorów

	kryteria akceptacji:
	    - blokada jeśli wybrano kierowcę lub zespół, którego nie ma w tym sezonie - np. gdy zespół zrezygnował ze startów
		- reguła roztrzygnięcia tytułu przy remisie - najpierw zwycięstwa, potem drugie miejsca itd.
		- blokada jeśli, mistrz świata kierowców lub konstruktorów jest znany przed końcem sezonu
		- gdy korekta wyniku sprawi, że tytuł nie jest rozstrzygnięty, typowanie otwiera się ponownie i zamyka się tydzień po końcu sezonu - tylko dla tych, którzy jeszcze nie typowali
		- mistrza świata kierowców i konstruktorów można wybrać tylko raz
		- typowanie otwiera się na tydzień przed rozpoczęciem sezonu

		
5. Jako kibic chcę aby, mógł typować podium dla nadchodzącego grand prix

    kryteria akceptacji:
	    - blokada jeśli wybrano kierowcę, którego nie ma starcie tego wyścigu np. zawieszenie, zamian kierowcy lub śmierć
		- po wybraniu zespołu wyświetli aktualnych kierowców do wyboru
		- podano czas, do którego można typować wyniki - uwzględnienie różnic stref czasowych np 15:00 CET
		- granica czasu - T-1s - typ przyjęty, T, T+1s - typ odrzucony
		- zgłoszenie przyjmowane jest na podstawie czasu serwera - mniejszy niż czas planowanego startu
		- blokada, jeśli jest próba typowania grand prix, którego nie ma w kalendarzu
		- Można typować tylko najbliższy wyścig
		- kolejny wyścig można typować po starcie poprzedniego
		- blokada, gdy nie ma kolejnego wyścigu np. po 06.12.2026
		- po zatwierdzeniu kalendarza na 2027 typowany jest wyścig z 14.03.2027
	    - blokada, jeśli ktoś próbuje typować wynik podczas wyścigu - np. wyścig zaczął się o 13, a chce typować o 14
		- kierowcę można wybrać tylko raz - 1. Lewis Hamilton, 2. Kimi Antonelli, 3. Max Verstappen - zły przykład - 1. Charles Leclerc, 2. George Russell, 3. George Russell

6. Jako kibic chcę, abym mógł edytować lub usuwać swoje typy:

	kryteria akceptacji:
		- tylko własne typy po wejściu na konto
	    - blokada gdy edycja lub usuwania jest robione po starcie wyścigu 
		- typu mistrza nie można edytować lub usuwać
		- po usunieciu typu resetuje wszystkie pola
		
7a. Jako kibic chcę, abym widział ranking typujących po wyścigu

	kryteria akceptacji:
	    - wyświetli ranking wszystkich typujących
		- osobny ranking dla wyścigu - tylko ci co wytypowali
		- punktacja uwzględniała obecny system punktowy FIA - za pierwsze 25, drugi 18, trzecie 15
		- przy kierowcy obstawionym, ale na innym miejscu to połowa punktów, zaokrąglenie w górę
		- brak kierowcy wytypowanego - 0 punktów
		- dodatkowe 20 punktów za prawidłowe obstawienie podium
		- reguła remisów - idealne podia, trafienia miejsc
		- Wspólne miejsca przy remisie w rankingu np. 1 - 2 - 3 - 3 - 5 - 6 - 7 - 7 - 7 - 10
		- przykład punktacji - 1. A, 2. B. 3. C , wynik 1. B, 2. A., 3. D - wynik daje 22 punkty
		- przykład remisu - 1. 78 pkt, 2. 43 pkt, 2. 43 pkt, 4. 15 pkt - 1. 1 idealne, 3 trafienia, 2. 2 trafienia, 2. 2 trafienia, 4. 1 trafienie
		- przykład remisu - 1. 33 pkt 1. 33 pkt, 4 15 pkt - 1. dwa trafienia (18+15), 1. jedno trafienie (25+8), 4. jedno trafienie (15)
		- przeliczanie wyników co godzinę przez 7 dni		
		
7b Jako kibc chcę, abym widział ranking typujących z całego sezonu

	kryteria akceptacji:
	    - wyświetli ranking wszystkich typujących
		- osobny ranking dla całego sezonu - suma ze wszystkich wyścigów plus 50 + 50 za mistrzów
		- punktacja uwzględniała obecny system punktowy FIA - za pierwsze 25, drugi 18, trzecie 15
		- przy kierowcy obstawionym, ale na innym miejscu to połowa punktów, zaokrąglenie w górę
		- brak kierowcy wytypowanego - 0 punktów
		- dodatkowe 20 punktów za prawidłowe obstawienie podium
		- po 50 dodatkowe za mistrza świata kierowców i konstruktorów - tydzień po zakończeniu sezonu
		- reguła remisów - idealne podia, trafienia miejsc
		- Wspólne miejsca przy remisie w rankingu np. 1 - 2 - 3 - 3 - 5 - 6 - 7 - 7 - 7 - 10
		- przykład remisu - 1. 156 pkt, 2. 103 pkt, 2. 103 pkt, 4. 43 pkt - 1. 2 idealne, 6 trafień, 2. 1 idealne, 4 trafienia, 2. 1 idealne, 4 trafienia, 4. 0 idealnych, 2 trafienia

		
8. Jako kibic chcę, żeby można było używać konta:

	kryteria akceptacji:
		- pseudonim jest unikalny
		- dozwolone są litery, cyfry i znaki specjalne lub np. <b>x</b>
		- pseudonim składa się od 4 do 20 znaków - wielkość liter nie ma znaczenia, nie mogą być spacje czy emotki
		- nowy pseudonim - drugie pole PIN i komunikat "Utworzono nowe konto", istniejące jedno pole.
		- nadawanie PIN od 4 do 8 znaków - ma mieć litery i cyfry
		- PIN jest potwierdzany przez drugie wpisanie przy zakładaniu konta
		- liczba prób przy błędnym logowaniu wynosi 5
		- blokada na 10 minut, reset licznika po upływie blokady
		- przy prawidłowym logowaniu licznik błędów restartuje się np. gdy były 2 błędne próba, a kolejna to prawidłowe logowanie
		- brak możliwości odzyskania zapomnianego PINu
		
9. Lista ograniczeń
	
	Kryteria akceptacji:
		- okrążenie formujące czy opóźnienia w starcie - brak odblokowania typowania
		- blokada cudzego psedonimu błędnymi PIN-ami
		- wycofany kierowca po złożeniu typu - wtedy przyznawane jest 0 punktów
		- powiadomienia
		- statystyki np. prawdopodobieństwo z poprzednich sezonów