# NerdCorner
1.1. Sistemos paskirtis

Projekto tikslas – sukurti patogią vietą, kur žmonės galėtų dalintis savo nuomonėmis, teikti klausimus bei diskutuoti apie įvairius žaidimus.
Sistema yra paremta internetinės diskusijų (angl. forum) svetainės pagrindu. Svetainėje naudotojai galės pasirinkti apie kokį žaidimą nori diskutuoti ir ten kurti įrašus, o įrašuose palikti komentarus arba peržiūrėti kitų naudotojų. Sistema turės 3 naudotojų tipus: svečias, prisiregistravęs naudotojas ir administratorius. Kiekviena rolė turės tam tikrus apribojimus kaip jos leidžia rolės atstovams naudotis sistema.


1.2. Funkciniai reikalavimai

Svečio (neprisiregistravusio naudotojo) galimybės:
1.	Peržiūrėti: •	Žaidimų katalogą •	Įrašus •	Komentarus
4.	Užsiregistruoti prie sistemos

Prisiregistravusio naudotojo galimybės:
1.	Prisijungti prie sistemos
2.	Atsijungti nuo sistemos
3.	Peržiūrėti: •	Žaidimų katalogą •	Įrašus •	Komentarus
4.	Sukurti: •	Įrašą •	Komentarą
5.	Redaguoti savo: •	Įrašą •	Komentarą
6.	Ištrinti savo:•	Įrašą •	Komentarą

Administratoriaus galimybės:
1.	Prisijungti prie sistemos
2.	Atsijungti nuo sistemos
3.	Peržiūrėti: •	Žaidimų katalogą •	Įrašus •	Komentarus
4.	Sukurti žaidimą
5.	Redaguoti žaidimą
6.	Ištrinti žaidimą


2. TECHNOLOGIJŲ APRAŠYMAS
Sistemą sudaro:
•	Kliento pusė (angl. frontend) – naudoja React.js karkasą
•	Serverio pusė (angl. backend) – naudoja Express.js karkasą
•	Duomenų bazė – naudoja MySQL

Sistemos architektūra:
 
1 pav. Sistemos diegimo diagrama

Šiame paveikslėlyje yra parodytos visos sistemos dalys, naudojamos technologijos joms sukurti bei ryšiai vaizduojantys kaip jos yra sujungtos tarpusavyje. Kliento prisijungimui prie svetainės yra naudojamas HTTPS protokolas, sąveikavimui tarp kliento ir serverio pusių taip pat yra naudojamas HTTPS protokolas, o duomenų perdavimui su duomenų baze naudojamas TCP/IP protokolas. Taip pat galima pastebėti, jog sistema slypi „Azure“ serveryje naudojant kompiuterinių debesijų technologijas.


