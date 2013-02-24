backbone-test
=============

Wir haben im Zuge des "Coding Wochenendes 02.2013" eine Anwendung in Backbone.js entwicklet.


Anwendungsdetails
=================

Vorab wurde die Anwendung wie folgt definiert:

* Die App hat drei Seite: 
 * Personendaten (Name, Vorname, Gebursdatum, Kreditkarte)
 * Adressdaten (Land, Strasse, PLZ, Ort, Wohnhaft seit)
 * Zusammenfassung (Anzeige aller eingebenen Daten mit "Abschicken")
* Es soll Validierung auf dem Feld ausgeführt werden (Alle Personendaten sind Pflichtfelder)
* Bei einer Eingabe von "Wohnhaft seit" von unter 2 Jahren soll ein zusätzliches Adressfeld eingeblendet werden.
* Es soll eine OnePage App sein (PageFlow sicherstellen: Person <-> Adresse <-> Zusammenfassung)
* Es soll eine Dokumentation erzeugt werden
* "Abschicken" soll einen REST-Call ausführen
* Validierung und PageFlow sollen getestet werden

