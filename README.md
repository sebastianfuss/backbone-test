backbone-test
=============

Wir haben im Zuge des "Coding Wochenendes 02.2013" eine Anwendung in [Backbone.js](documentcloud/backbone) entwicklet.


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

Struktur von Backbone
=====================

Das MCV Pattern wird von Backbone durch Model-Objekte (Model), HTML-Inhalt (View) und View- bzw. Router-Objekte (Controller) abgebildet.

Model
-----

Unter `js/myapp/model.js` wurde das Modell erzeugt.
Es wurden drei Modelle erzeugt: Personenmodell, Adressmodell und Zusammmenfassungsmodell

Innerhalb jedes Modells wurden "defaults" definiert, die die Grundstruktur definieren sollen.
Auf diese Attribute wird in jedem Modell, die Validierung angesetzt.

Im Standardfall von Backbone muss hierzu eine "validator" Funktion in das Modell gehangen werden. 
Diese wird bei jedem "change" Event auf dem Modell aufgerufen und führt die Validierung aus.
Da dies zu viel selbst geschriebenen Code führen würde, haben wir uns für das Plugin "[backbone-validation.js](thedersen/backbone.validation)" entschieden.
Dies ermöglicht es Validationsregeln je Feld in "validation" zu definieren.
Leider ist die Standard-Implementierung nicht mit unserem [Bootstrap](twitter/Bootstrap)-Layout kompatibel.
Deshalb muss der Selector sowie die "valid" und "invalid" Funktion überschrieben werden.

Des Weiteren haben wir im Modell den "sync"-Mechnanismus definiert. 
Dies ermöglicht es, mittels "fetch" oder "save" die Daten des Modells zu laden oder zu speichern.
In unserer Implementierung wurden die Daten immer im "sessionStorage" abgelegt.
Mit einer anderen Implementierung in dem Modell der Zusammenfassung kann hier ein abschließender REST-Call erzeugt werden.
Dies wäre zwar eine Vermischung der einzelnen Implementierungen würde aber zeigen, wie einfach eine unterschiedliche Persistenzschicht erzeugt werden kann.
(Anm.: Da der REST-Call eine Funktion der View wäre, sollte sie auch als "Submit"-Funktion implementiert sein.)





