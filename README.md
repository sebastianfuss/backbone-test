backbone-test
=============

Wir haben im Zuge des "Coding Wochenendes 02.2013" eine Anwendung in [Backbone.js](http://www.github.com/documentcloud/backbone) entwicklet.


Anwendungsdetails
=================

Vorab wurde die Anwendung wie folgt definiert:

* Die App hat drei Seiten: 
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

Das MVC Pattern wird von Backbone durch Model-Objekte (Model), HTML-Inhalt (View) und View- bzw. Router-Objekte (Controller) abgebildet.

Model
-----

Unter `js/myapp/models.js` wurde das Modell erzeugt.
Es wurden drei Modelle erzeugt: Personenmodell, Adressmodell und Zusammmenfassungsmodell

Innerhalb jedes Modells wurden "defaults" definiert, die die Grundstruktur definieren sollen.
Auf diese Attribute wird in jedem Modell, die Validierung angesetzt.

Im Standardfall von Backbone muss hierzu eine "validator" Funktion in das Modell gehangen werden. 
Diese wird bei jedem "change" Event auf dem Modell aufgerufen und führt die Validierung aus.
Da dies zu viel selbst geschriebenen Code führen würde, haben wir uns für das Plugin "[backbone-validation.js](http://www.github.com/thedersen/backbone.validation)" entschieden.
Dies ermöglicht es Validationsregeln je Feld in "validation" zu definieren.
Leider ist die Standard-Implementierung nicht mit unserem [Bootstrap](http://www.github.com/twitter/Bootstrap)-Layout kompatibel.
Deshalb muss der Selector sowie die "valid" und "invalid" Funktion überschrieben werden.

Des Weiteren haben wir im Modell den "sync"-Mechnanismus definiert. 
Dies ermöglicht es, mittels "fetch" oder "save" die Daten des Modells zu laden oder zu speichern.
In unserer Implementierung wurden die Daten immer im "sessionStorage" abgelegt.
Mit einer anderen Implementierung in dem Modell der Zusammenfassung kann hier ein abschließender REST-Call erzeugt werden.
Dies wäre zwar eine Vermischung der einzelnen Implementierungen würde aber zeigen, wie einfach eine unterschiedliche Persistenzschicht erzeugt werden kann.
(Anm.: Da der REST-Call eine Funktion der View wäre, sollte sie auch als "Submit"-Funktion implementiert sein.)

View (Controller)
-----------------

Unter `js/myapp/views.js` wurden die Controller erzeugt.
(Anm.: Backbone bezeichnet diese Objekte als View. Innerhalb des MVC-Pattern haben wir festgestellt, 
dass es sich eher um Controller handelt. Deshalb wird nachfolgend von Controllern gesprochen.)

Jede Seite hat einen solchen Controller bekommen.
Jeder Controller hat Events, die ihm mitgeteilt werden. Zu jedem Event werden Funktion definiert, die bei diesem Event
ausgeführt werden sollen. Diese Funktionen werden an den Controller gehangen.
Außerdem erhält der Controller die Informationen seines Aussehens. Dies wird in Form der "render" Funktion gemacht.
Ziel der "render" Funktion ist die Erzeugung des HTML-Teils. D.h. bei jedem Aufruf von "render" wird von dem
Controller der HTML-Inhalt zu der Seite erzeugt. Dies geschieht mit Underscore Templating. Dem Templating wird bei 
Erzeugung des HTMLs auch das Modell mitgeteilt. Damit dieses Model eine Instanz ist, erzeugen wird zum Start des Controllers
ein entsprechendes Objekt, laden seine eventuell vorhandenen Daten und weisen dem Controller das Modell zu.

Die Wertzuweisung zwischen HTML und Modell wird von uns durch das 
[Backbone Modellbinding](http://github.com/derickbailey/backbone.modelbinding)-Plugin erledigt. Das ist nicht der
Weg der von Standard-Backbone. Wie das genau funktioniert, haben wir uns nicht angeguckt.

HTML (View)
-----------

In `index.html` ist der komplette HTML Inhalt unserer Anwendung. Alle drei Seiten haben hier als "script"-Tags hinterlegte
Templates. Diese werden durch ihre Ids von den entsprechenden Controllern angesprochen, ausgelesen und zum Erzeugen des 
sichtbaren HTMLs genutzt.

Fazit
=====
Anfänglich verwirrend war die Rolle der View in Backbone. 
Hierbei ist nicht das HTML Markup gemeint, sondern die view.js.
Schaut man sich diese an, stellt man schnell fest, dass hier Code zu Modelbinding, Validierung, Eventdefinition und -abarbeitung enthalten ist. 
Dinge die eher als Aufgabe eines Controller zu interpretieren wären. 
Doch diesen gibt es in Backbone nicht.
Man könnte hier anführen, dass der Router eine ähnliche Position einehmen kann.
Durch die Implementierungsfreiheiten bei Backbone.js wird nicht klar, für welche Fälle welche Benutzung sinnvoll wäre.
Innerhalb unserer Einarbeitung haben wir erst spät den Router benutzt. Was zu einer Vermischung der o.g. Aufgaben im Router und den Views führte.
Dennoch kann festgestellt werden, dass die view.js nicht frei von Controller-Aufgaben bleiben wird.

Für die Umsetzung der o.g. doch relativ überschaubaren UseCases mussten weitere externe Plugins eingebunden werden. 
Zusammenfassend waren das backbone.modellbinding, backbone-validation und underscore. 
Das schafft einerseits Flexibilität, während der Einarbeitung hat es uns jedoch einiges an Zeit gekostet. 
Auf der Homepage von backbone war Dokumentation und API Beschreibung zu finden, jedoch für die Einarbeitung und Umsetzung nicht ausreichend. 
Insbesondere für die Einbindung der Plugins haben wir zum größten Teil auf Blogposts zurückgegriffen.

Mit etwas Einarbeitungszeit und der ein oder anderen Codezeile haben wir ganz gute Ergebnisse erzielt.     


Offene Punkte
=============
* Bei der Implementierung des Routings haben sich Seiteneffekte auf die Validierung ergeben. So gelangt man aktuell auch bei Validierungsfehlern auf die nachfolgende Seite. Problem: Der Router prüft das Ergebnis der Validierung nicht, sondern leitet einfach auf die nachfolgende Seite weiter. 
* Bei einer Eingabe von "Wohnhaft seit" von unter 2 Jahren soll ein zusätzliches Adressfeld eingeblendet werden.
* Es soll eine Dokumentation erzeugt werden
* "Abschicken" soll einen REST-Call ausführen (minimale Änderung an der save-Funktion des Models)
* Validierung und PageFlow sollen getestet werden







