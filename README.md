# PlayPadel

# Opis projekta
Ovaj projekt je rezultat timskog rada u sklopu projeknog zadatka kolegija [Programsko inženjerstvo](https://www.fer.unizg.hr/predmet/proinz) na Fakultetu elektrotehnike i računarstva Sveučilišta u Zagrebu. \
Cilj ovog projekta je razviti integriranu aplikaciju koja pojednostavljuje rezervaciju termina za padel, olakšava organizaciju i sudjelovanje na turnirima, te promovira sport kroz centralizirani sustav obavijesti i praćenja rezultata.

# Funkcionalni zahtjevi
> Visoki prioritet:

F-1 Prijava u sustav: Anonimni korisnik mora imati mogućnost prijave u sustav kao administrator, igrač ili vlasnik.\
F-2 Registracija: Anonimni korisnik mora moći izvršiti registraciju kao igrač ili vlasnik.


> Srednji prioritet:

F-3 Postavljanje terena: Vlasnici moraju imati mogućnost dodavanja novih terena te uređivanja podataka o terenu.\
F-4 Organizacija termina: Sustav mora omogućiti vlasnicima definiranje termina.\
F-5 Rezervacija termina: Igrači moraju imati mogućnost rezerviranja i pregleda svojih rezervacija.\
F-6 Otkazivanje rezervacija: Igrači moraju moći otkazati vlastite rezervacije.\
F-7 Dodavanje turnira: Vlasnici moraju moći dodati nove turnire.\
F-8 Unos podataka o turniru: Vlasnici moraju imati mogućnost određivanja završetka turnira te unosa potrebnih podataka.\
F-9 Pregled turnira: Prijavljeni korisnici moraju moći pregledati prošle i otvorene turnire.\
F-10 Profil vlasnika: Vlasnici moraju imati mogućnost pregleda i uređivanja svojih profila.\
F-11	Odobravanje prijave igrača na turnir: Vlasnici moraju imati mogućnost odobravanja prijava igrača na otvorene turnire.
> Niski prioritet:

F-12 Plaćanje termina: Igrači moraju imati mogućnost plaćanja termina.\
F-13 Plaćanje članstva: Igrači moraju imati mogućnost plaćanja članstva.\
F-14 Prijave na turnir: Igrači se moraju moći prijaviti na otvorene turnire.\
F-15 Podsustav obavještavanja: Igrači moraju moći dobiti obavijest kada je novi turnir objavljen, ako žele.\
F-16 Postavljanje cijene članstva: Administratori moraju moći podešavati cijenu članstva za vlasnike.\
F-17 Upravljanje korisnicima: Sustav mora omogućiti administratorima brisanje, uređivanje i dodavanje korisnika.\
F-18	Postavljanje slika i komentara: Igrači moraju imati mogućnost postavljanja slika i komentara za odigrane mečeve turnira.

# Nefunkcionalni zahtjevi
* Visoki prioritet\
NF-1.1 - Autentifikacija i autorizacija: Korisnici moraju biti autentificirani sigurnim metodama; lozinke su šifrirane, a autorizacija je potrebna za specifične funkcionalnosti\
NF-1.2 - Sigurnost transakcija: Plaćanja putem PayPala ili kreditnih kartica moraju biti zaštićena kroz sigurne vanjske servise\
NF-3.1 - Zaštita podataka: Sve osjetljive informacije moraju biti pohranjene u skladu s GDPR zahtjevima i pravilima privatnosti\
NF-3.2 - Komunikacijski protokoli: Komunikacija između klijentskog sučelja i poslužitelja mora koristiti HTTPS protokol za sigurnost\
NF-6.1 - Održavanje: Sustav treba biti dizajniran na način koji omogućuje lako održavanje i ažuriranje koda te baze podataka\
NF-6.2 - Dokumentacija: Sustav mora biti popraćen tehničkom dokumentacijom koja uključuje opise sustava i vodiče za implementaciju i održavanje\
NF-6.3 - Testiranje: Sustav treba biti razvijen u skladu s metodama automatiziranog testiranja, uključujući funkcionalna, sigurnosna i integracijska testiranja
* Srednji prioritet\
NF-1.3 - Integracija s vanjskim sustavima: Sustav mora podržavati besprijekornu integraciju s vanjskim kalendarima (npr., Google Calendar, Calendar.online) bez smanjenja performansi\
NF-4.1 - Skalabilnost: Sustav treba biti dizajniran modularno kako bi omogućio jednostavno proširenje funkcionalnosti bez većih promjena postojeće infrastrukture\
NF-4.2 - Dostupnost: Sustav treba imati najmanje 99.5% dostupnost na godišnjoj razini, uključujući planirane prekide

# Tehnologije
Komunikacija: WhatsApp i Microsoft Teams\
UML dijagrami: Astah i Visual Paradigm\
Frontend: React\
Backend: Spring Boot\
Baza podataka: Postgres\
Deploy: Render\
Dokumentacija: Github wiki\
Vanjski servis za kalendare\

# Članovi tima 
Fran Ogrinšak\
Patrik Pašić\
Lovro Matić\
Luka Zorčić\
Filip Šturlić

# Kontribucije
>Pravila ovise o organizaciji tima i su često izdvojena u CONTRIBUTING.md



# 📝 Kodeks ponašanja [![Contributor Covenant](https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg)](CODE_OF_CONDUCT.md)
Kao studenti sigurno ste upoznati s minimumom prihvatljivog ponašanja definiran u [KODEKS PONAŠANJA STUDENATA FAKULTETA ELEKTROTEHNIKE I RAČUNARSTVA SVEUČILIŠTA U ZAGREBU](https://www.fer.hr/_download/repository/Kodeks_ponasanja_studenata_FER-a_procisceni_tekst_2016%5B1%5D.pdf), te dodatnim naputcima za timski rad na predmetu [Programsko inženjerstvo](https://wwww.fer.hr).
Očekujemo da ćete poštovati [etički kodeks IEEE-a](https://www.ieee.org/about/corporate/governance/p7-8.html) koji ima važnu obrazovnu funkciju sa svrhom postavljanja najviših standarda integriteta, odgovornog ponašanja i etičkog ponašanja u profesionalnim aktivnosti. Time profesionalna zajednica programskih inženjera definira opća načela koja definiranju  moralni karakter, donošenje važnih poslovnih odluka i uspostavljanje jasnih moralnih očekivanja za sve pripadnike zajenice.

Kodeks ponašanja skup je provedivih pravila koja služe za jasnu komunikaciju očekivanja i zahtjeva za rad zajednice/tima. Njime se jasno definiraju obaveze, prava, neprihvatljiva ponašanja te  odgovarajuće posljedice (za razliku od etičkog kodeksa). U ovom repozitoriju dan je jedan od široko prihvačenih kodeks ponašanja za rad u zajednici otvorenog koda.
>### Poboljšajte funkcioniranje tima:
>* definirajte načina na koji će rad biti podijeljen među članovima grupe
>* dogovorite kako će grupa međusobno komunicirati.
>* ne gubite vrijeme na dogovore na koji će grupa rješavati sporove primjenite standarde!
>* implicitno podrazmijevamo da će svi članovi grupe slijediti kodeks ponašanja.
 
>###  Prijava problema
>Najgore što se može dogoditi je da netko šuti kad postoje problemi. Postoji nekoliko stvari koje možete učiniti kako biste najbolje riješili sukobe i probleme:
>* Obratite mi se izravno [e-pošta](mailto:vlado.sruk@fer.hr) i  učinit ćemo sve što je u našoj moći da u punom povjerenju saznamo koje korake trebamo poduzeti kako bismo riješili problem.
>* Razgovarajte s vašim asistentom jer ima najbolji uvid u dinamiku tima. Zajedno ćete saznati kako riješiti sukob i kako izbjeći daljnje utjecanje u vašem radu.
>* Ako se osjećate ugodno neposredno razgovarajte o problemu. Manje incidente trebalo bi rješavati izravno. Odvojite vrijeme i privatno razgovarajte s pogođenim članom tima te vjerujte u iskrenost.

# 📝 Licenca
Važeča (1)
[![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

Ovaj repozitorij sadrži otvoreni obrazovni sadržaji (eng. Open Educational Resources)  i licenciran je prema pravilima Creative Commons licencije koja omogućava da preuzmete djelo, podijelite ga s drugima uz 
uvjet da navođenja autora, ne upotrebljavate ga u komercijalne svrhe te dijelite pod istim uvjetima [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License HR][cc-by-nc-sa].
>
> ### Napomena:
>
> Svi paketi distribuiraju se pod vlastitim licencama.
> Svi upotrijebleni materijali  (slike, modeli, animacije, ...) distribuiraju se pod vlastitim licencama.

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

[cc-by-nc-sa]: https://creativecommons.org/licenses/by-nc/4.0/deed.hr 
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg

Orginal [![cc0-1.0][cc0-1.0-shield]][cc0-1.0]
>
>COPYING: All the content within this repository is dedicated to the public domain under the CC0 1.0 Universal (CC0 1.0) Public Domain Dedication.
>
[![CC0-1.0][cc0-1.0-image]][cc0-1.0]

[cc0-1.0]: https://creativecommons.org/licenses/by/1.0/deed.en
[cc0-1.0-image]: https://licensebuttons.net/l/by/1.0/88x31.png
[cc0-1.0-shield]: https://img.shields.io/badge/License-CC0--1.0-lightgrey.svg

### Reference na licenciranje repozitorija
