// Source of truth for DeBait's localized store copy.
// Generates public/_locales/<locale>/messages.json (short name + description
// for the manifest) and docs/store-listings.md (long copy for CWS/AMO).
// Run: node scripts/gen-i18n.mjs
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

// name = store title (SEO: keeps "DeBait", adds YouTube/thumbnails/clickbait/real)
// desc = manifest short description (<=132 chars, Chrome limit)
// long = full store-listing description
const L = {
  en:     { name: 'DeBait – Real YouTube Thumbnails, Not Clickbait',
            desc: 'Automatically replace clickbait YouTube thumbnails with the real first frame of the video. Lightweight, private, no setup.',
            long: `DeBait swaps clickbait YouTube thumbnails for the real first frame of each video, so your feed shows what videos are actually about — not the misleading bait.

It works automatically the moment you install it. No popup, no account, no settings.

• Replaces thumbnails on the home feed, search, sidebar and channel pages
• Works on both regular videos and Shorts
• Restores the original automatically when no real frame is available
• Lightweight (~3 kB) and private: no tracking, no accounts, no extra requests

DeBait only needs access to YouTube and changes thumbnails at the network layer, so the clickbait image is never even downloaded.` },
  en_GB:  { name: 'DeBait – Real YouTube Thumbnails, Not Clickbait',
            desc: 'Automatically replace clickbait YouTube thumbnails with the real first frame of the video. Lightweight, private, no setup.',
            long: `DeBait swaps clickbait YouTube thumbnails for the real first frame of each video, so your feed shows what videos are actually about — not the misleading bait.

It works automatically the moment you install it. No popup, no account, no settings.

• Replaces thumbnails on the home feed, search, sidebar and channel pages
• Works on both regular videos and Shorts
• Restores the original automatically when no real frame is available
• Lightweight (~3 kB) and private: no tracking, no accounts, no extra requests

DeBait only needs access to YouTube and changes thumbnails at the network layer, so the clickbait image is never even downloaded.` },
  en_AU:  { name: 'DeBait – Real YouTube Thumbnails, Not Clickbait',
            desc: 'Automatically replace clickbait YouTube thumbnails with the real first frame of the video. Lightweight, private, no setup.',
            long: `DeBait swaps clickbait YouTube thumbnails for the real first frame of each video, so your feed shows what videos are actually about — not the misleading bait.

It works automatically the moment you install it. No popup, no account, no settings.

• Replaces thumbnails on the home feed, search, sidebar and channel pages
• Works on both regular videos and Shorts
• Restores the original automatically when no real frame is available
• Lightweight (~3 kB) and private: no tracking, no accounts, no extra requests

DeBait only needs access to YouTube and changes thumbnails at the network layer, so the clickbait image is never even downloaded.` },
  es:     { name: 'DeBait – Miniaturas reales de YouTube, sin clickbait',
            desc: 'Reemplaza las miniaturas clickbait de YouTube por el primer fotograma real del vídeo. Ligera, privada y sin configurar.',
            long: `DeBait cambia las miniaturas clickbait de YouTube por el primer fotograma real de cada vídeo, para que tu feed muestre de qué van realmente los vídeos y no el cebo engañoso.

Funciona automáticamente nada más instalarla. Sin ventanas, sin cuenta, sin ajustes.

• Reemplaza las miniaturas en el inicio, la búsqueda, la barra lateral y los canales
• Funciona con vídeos normales y Shorts
• Restaura la original automáticamente cuando no hay un fotograma real
• Ligera (~3 kB) y privada: sin rastreo, sin cuentas, sin peticiones extra

DeBait solo necesita acceso a YouTube y cambia las miniaturas en la capa de red, así que la imagen clickbait ni siquiera se descarga.` },
  es_419: { name: 'DeBait – Miniaturas reales de YouTube, sin clickbait',
            desc: 'Reemplaza las miniaturas clickbait de YouTube por el primer fotograma real del video. Ligera, privada y sin configurar.',
            long: `DeBait cambia las miniaturas clickbait de YouTube por el primer fotograma real de cada video, para que tu feed muestre de qué tratan realmente los videos y no el cebo engañoso.

Funciona automáticamente apenas la instalas. Sin ventanas, sin cuenta, sin ajustes.

• Reemplaza las miniaturas en el inicio, la búsqueda, la barra lateral y los canales
• Funciona con videos normales y Shorts
• Restaura la original automáticamente cuando no hay un fotograma real
• Ligera (~3 kB) y privada: sin rastreo, sin cuentas, sin solicitudes extra

DeBait solo necesita acceso a YouTube y cambia las miniaturas en la capa de red, así que la imagen clickbait ni siquiera se descarga.` },
  pt_BR:  { name: 'DeBait – Miniaturas reais do YouTube, sem clickbait',
            desc: 'Substitui automaticamente as miniaturas clickbait do YouTube pelo primeiro quadro real do vídeo. Leve, privada, sem configuração.',
            long: `O DeBait troca as miniaturas clickbait do YouTube pelo primeiro quadro real de cada vídeo, para o seu feed mostrar sobre o que os vídeos realmente são — e não a isca enganosa.

Funciona automaticamente assim que você instala. Sem pop-up, sem conta, sem configurações.

• Substitui as miniaturas no início, na busca, na barra lateral e nos canais
• Funciona com vídeos normais e Shorts
• Restaura a original automaticamente quando não há um quadro real
• Leve (~3 kB) e privada: sem rastreamento, sem contas, sem requisições extras

O DeBait só precisa de acesso ao YouTube e altera as miniaturas na camada de rede, então a imagem clickbait nem chega a ser baixada.` },
  pt_PT:  { name: 'DeBait – Miniaturas reais do YouTube, sem clickbait',
            desc: 'Substitui automaticamente as miniaturas clickbait do YouTube pela primeira imagem real do vídeo. Leve, privada, sem configuração.',
            long: `O DeBait troca as miniaturas clickbait do YouTube pela primeira imagem real de cada vídeo, para que o seu feed mostre aquilo de que os vídeos realmente tratam — e não o engodo.

Funciona automaticamente assim que o instala. Sem pop-up, sem conta, sem definições.

• Substitui as miniaturas no início, na pesquisa, na barra lateral e nos canais
• Funciona com vídeos normais e Shorts
• Restaura a original automaticamente quando não existe uma imagem real
• Leve (~3 kB) e privada: sem rastreio, sem contas, sem pedidos extra

O DeBait só precisa de acesso ao YouTube e altera as miniaturas na camada de rede, por isso a imagem clickbait nem sequer é descarregada.` },
  fr:     { name: 'DeBait – Vraies miniatures YouTube, sans clickbait',
            desc: 'Remplace les miniatures clickbait de YouTube par la première image réelle de la vidéo. Légère, privée et sans réglages.',
            long: `DeBait remplace les miniatures clickbait de YouTube par la première image réelle de chaque vidéo, pour que votre fil montre de quoi parlent vraiment les vidéos — et non l'appât trompeur.

Elle fonctionne automatiquement dès l'installation. Aucune fenêtre, aucun compte, aucun réglage.

• Remplace les miniatures sur l'accueil, la recherche, la barre latérale et les chaînes
• Fonctionne avec les vidéos classiques et les Shorts
• Restaure l'originale automatiquement quand aucune image réelle n'existe
• Légère (~3 ko) et privée : aucun suivi, aucun compte, aucune requête en plus

DeBait n'a besoin que d'un accès à YouTube et modifie les miniatures au niveau réseau : l'image clickbait n'est même jamais téléchargée.` },
  de:     { name: 'DeBait – Echte YouTube-Thumbnails statt Clickbait',
            desc: 'Ersetzt Clickbait-Thumbnails auf YouTube automatisch durch das echte erste Bild des Videos. Leicht, privat, ohne Einrichtung.',
            long: `DeBait ersetzt Clickbait-Thumbnails auf YouTube durch das echte erste Bild jedes Videos, damit dein Feed zeigt, worum es wirklich geht — und nicht den irreführenden Köder.

Es funktioniert automatisch ab der Installation. Kein Popup, kein Konto, keine Einstellungen.

• Ersetzt Thumbnails auf Startseite, Suche, Seitenleiste und Kanalseiten
• Funktioniert mit normalen Videos und Shorts
• Stellt das Original automatisch wieder her, wenn kein echtes Bild existiert
• Leicht (~3 kB) und privat: kein Tracking, keine Konten, keine zusätzlichen Anfragen

DeBait braucht nur Zugriff auf YouTube und ändert Thumbnails auf Netzwerkebene — das Clickbait-Bild wird also nie heruntergeladen.` },
  it:     { name: 'DeBait – Miniature reali di YouTube, niente clickbait',
            desc: 'Sostituisce le miniature clickbait di YouTube con il primo fotogramma reale del video. Leggera, privata, senza configurazione.',
            long: `DeBait sostituisce le miniature clickbait di YouTube con il primo fotogramma reale di ogni video, così il tuo feed mostra di cosa parlano davvero i video — e non l'esca ingannevole.

Funziona automaticamente appena la installi. Nessun popup, nessun account, nessuna impostazione.

• Sostituisce le miniature su home, ricerca, barra laterale e canali
• Funziona con i video normali e gli Shorts
• Ripristina l'originale automaticamente quando non c'è un fotogramma reale
• Leggera (~3 kB) e privata: niente tracciamento, niente account, nessuna richiesta extra

DeBait richiede solo l'accesso a YouTube e modifica le miniature a livello di rete, quindi l'immagine clickbait non viene nemmeno scaricata.` },
  nl:     { name: 'DeBait – Echte YouTube-thumbnails, geen clickbait',
            desc: 'Vervangt clickbait-thumbnails op YouTube automatisch door het echte eerste beeld van de video. Licht, privé, geen instellingen.',
            long: `DeBait vervangt clickbait-thumbnails op YouTube door het echte eerste beeld van elke video, zodat je feed laat zien waar video's echt over gaan — niet het misleidende lokaas.

Het werkt automatisch zodra je het installeert. Geen pop-up, geen account, geen instellingen.

• Vervangt thumbnails op de startpagina, zoekresultaten, zijbalk en kanalen
• Werkt met gewone video's en Shorts
• Herstelt automatisch het origineel als er geen echt beeld is
• Licht (~3 kB) en privé: geen tracking, geen accounts, geen extra verzoeken

DeBait heeft alleen toegang tot YouTube nodig en wijzigt thumbnails op netwerkniveau, dus de clickbait-afbeelding wordt nooit eens gedownload.` },
  ru:     { name: 'DeBait – Настоящие превью YouTube без кликбейта',
            desc: 'Автоматически заменяет кликбейтные превью YouTube на настоящий первый кадр видео. Лёгкое, приватное, без настройки.',
            long: `DeBait заменяет кликбейтные превью YouTube на настоящий первый кадр каждого видео, чтобы лента показывала, о чём ролики на самом деле, а не вводящую в заблуждение приманку.

Работает автоматически сразу после установки. Без всплывающих окон, без аккаунта, без настроек.

• Заменяет превью на главной, в поиске, в боковой панели и на каналах
• Работает с обычными видео и Shorts
• Автоматически возвращает оригинал, если настоящего кадра нет
• Лёгкое (~3 КБ) и приватное: без слежки, без аккаунтов, без лишних запросов

DeBait нужен доступ только к YouTube и меняет превью на сетевом уровне, поэтому кликбейтное изображение даже не загружается.` },
  uk:     { name: 'DeBait – Справжні прев’ю YouTube без клікбейту',
            desc: 'Автоматично замінює клікбейтні прев’ю YouTube на справжній перший кадр відео. Легке, приватне, без налаштувань.',
            long: `DeBait замінює клікбейтні прев’ю YouTube на справжній перший кадр кожного відео, щоб ваша стрічка показувала, про що ролики насправді, а не оманливу принаду.

Працює автоматично одразу після встановлення. Без спливних вікон, без облікового запису, без налаштувань.

• Замінює прев’ю на головній, у пошуку, на бічній панелі та каналах
• Працює зі звичайними відео та Shorts
• Автоматично повертає оригінал, якщо справжнього кадру немає
• Легке (~3 КБ) і приватне: без стеження, без акаунтів, без зайвих запитів

DeBait потребує доступу лише до YouTube і змінює прев’ю на мережевому рівні, тож клікбейтне зображення навіть не завантажується.` },
  pl:     { name: 'DeBait – Prawdziwe miniatury YouTube, bez clickbaitu',
            desc: 'Automatycznie zastępuje clickbaitowe miniatury YouTube prawdziwą pierwszą klatką filmu. Lekkie, prywatne, bez konfiguracji.',
            long: `DeBait zamienia clickbaitowe miniatury YouTube na prawdziwą pierwszą klatkę każdego filmu, aby Twój feed pokazywał, o czym naprawdę są filmy — a nie mylącą przynętę.

Działa automatycznie zaraz po instalacji. Bez wyskakujących okien, bez konta, bez ustawień.

• Zastępuje miniatury na stronie głównej, w wyszukiwarce, na pasku bocznym i kanałach
• Działa ze zwykłymi filmami i Shorts
• Automatycznie przywraca oryginał, gdy brakuje prawdziwej klatki
• Lekkie (~3 kB) i prywatne: bez śledzenia, bez kont, bez dodatkowych żądań

DeBait potrzebuje dostępu tylko do YouTube i zmienia miniatury na poziomie sieci, więc clickbaitowy obrazek nawet nie zostaje pobrany.` },
  cs:     { name: 'DeBait – Skutečné náhledy YouTube, žádný clickbait',
            desc: 'Automaticky nahrazuje clickbaitové náhledy YouTube skutečným prvním snímkem videa. Lehké, soukromé, bez nastavování.',
            long: `DeBait nahrazuje clickbaitové náhledy YouTube skutečným prvním snímkem každého videa, aby váš kanál ukazoval, o čem videa opravdu jsou — ne klamavou návnadu.

Funguje automaticky hned po instalaci. Žádné okno, žádný účet, žádné nastavení.

• Nahrazuje náhledy na hlavní stránce, ve vyhledávání, v postranním panelu a na kanálech
• Funguje s běžnými videi i Shorts
• Automaticky obnoví originál, když skutečný snímek neexistuje
• Lehké (~3 kB) a soukromé: žádné sledování, žádné účty, žádné požadavky navíc

DeBait potřebuje přístup jen k YouTube a mění náhledy na síťové úrovni, takže clickbaitový obrázek se ani nestáhne.` },
  sk:     { name: 'DeBait – Skutočné náhľady YouTube, žiadny clickbait',
            desc: 'Automaticky nahrádza clickbaitové náhľady YouTube skutočným prvým snímkom videa. Ľahké, súkromné, bez nastavovania.',
            long: `DeBait nahrádza clickbaitové náhľady YouTube skutočným prvým snímkom každého videa, aby váš kanál ukazoval, o čom videá naozaj sú — nie klamlivú návnadu.

Funguje automaticky hneď po inštalácii. Žiadne okno, žiadny účet, žiadne nastavenia.

• Nahrádza náhľady na domovskej stránke, vo vyhľadávaní, na bočnom paneli a na kanáloch
• Funguje s bežnými videami aj Shorts
• Automaticky obnoví originál, keď skutočný snímok neexistuje
• Ľahké (~3 kB) a súkromné: žiadne sledovanie, žiadne účty, žiadne požiadavky navyše

DeBait potrebuje prístup len k YouTube a mení náhľady na sieťovej úrovni, takže clickbaitový obrázok sa ani nestiahne.` },
  sl:     { name: 'DeBait – Resnične sličice YouTube, brez klikvabe',
            desc: 'Samodejno zamenja klikvabne sličice YouTube s pravo prvo sličico videa. Lahka, zasebna, brez nastavitev.',
            long: `DeBait zamenja klikvabne sličice YouTube s pravo prvo sličico vsakega videa, da vaš vir pokaže, o čem videi v resnici so — in ne zavajajoče vabe.

Deluje samodejno takoj po namestitvi. Brez pojavnih oken, brez računa, brez nastavitev.

• Zamenja sličice na začetni strani, v iskanju, stranski vrstici in na kanalih
• Deluje z običajnimi videi in Shorts
• Samodejno obnovi izvirnik, ko prave sličice ni
• Lahka (~3 kB) in zasebna: brez sledenja, brez računov, brez dodatnih zahtevkov

DeBait potrebuje dostop le do YouTuba in spreminja sličice na omrežni ravni, zato se klikvabna slika sploh ne prenese.` },
  hr:     { name: 'DeBait – Prave YouTube sličice, bez clickbaita',
            desc: 'Automatski zamjenjuje clickbait sličice YouTubea pravom prvom sličicom videa. Lagano, privatno, bez postavljanja.',
            long: `DeBait zamjenjuje clickbait sličice YouTubea pravom prvom sličicom svakog videa, kako bi vaš feed pokazivao o čemu videi zaista jesu — a ne zavaravajući mamac.

Radi automatski čim ga instalirate. Bez skočnih prozora, bez računa, bez postavki.

• Zamjenjuje sličice na početnoj, u pretrazi, bočnoj traci i na kanalima
• Radi s običnim videima i Shortsima
• Automatski vraća original kada prava sličica ne postoji
• Lagano (~3 kB) i privatno: bez praćenja, bez računa, bez dodatnih zahtjeva

DeBait treba pristup samo YouTubeu i mijenja sličice na mrežnoj razini, pa se clickbait slika nikada ni ne preuzme.` },
  sr:     { name: 'DeBait – Праве YouTube сличице, без кликбејта',
            desc: 'Аутоматски замењује кликбејт сличице YouTube-а правом првом сличицом видеа. Лако, приватно, без подешавања.',
            long: `DeBait замењује кликбејт сличице YouTube-а правом првом сличицом сваког видеа, да би ваш фид показивао о чему су видеи заиста — а не обмањујући мамац.

Ради аутоматски чим га инсталирате. Без искачућих прозора, без налога, без подешавања.

• Замењује сличице на почетној, у претрази, бочној траци и на каналима
• Ради са обичним видеима и Shorts видеима
• Аутоматски враћа оригинал када права сличица не постоји
• Лако (~3 kB) и приватно: без праћења, без налога, без додатних захтева

DeBait-у је потребан приступ само YouTube-у и мења сличице на мрежном нивоу, па се кликбејт слика чак и не преузима.` },
  bg:     { name: 'DeBait – Истински миниатюри в YouTube, без кликбейт',
            desc: 'Автоматично заменя кликбейт миниатюрите в YouTube с истинския първи кадър на видеото. Леко, поверително, без настройки.',
            long: `DeBait заменя кликбейт миниатюрите в YouTube с истинския първи кадър на всяко видео, за да показва емисията ви за какво наистина са видеата — а не подвеждащата примамка.

Работи автоматично веднага след инсталиране. Без изскачащи прозорци, без акаунт, без настройки.

• Заменя миниатюрите в началото, търсенето, страничната лента и каналите
• Работи с обикновени видеа и Shorts
• Автоматично възстановява оригинала, когато няма истински кадър
• Леко (~3 kB) и поверително: без проследяване, без акаунти, без допълнителни заявки

DeBait се нуждае от достъп само до YouTube и променя миниатюрите на мрежово ниво, така че кликбейт изображението дори не се изтегля.` },
  ro:     { name: 'DeBait – Miniaturi reale YouTube, fără clickbait',
            desc: 'Înlocuiește automat miniaturile clickbait de pe YouTube cu primul cadru real al videoclipului. Ușoară, privată, fără configurare.',
            long: `DeBait înlocuiește miniaturile clickbait de pe YouTube cu primul cadru real al fiecărui videoclip, ca feedul tău să arate despre ce sunt cu adevărat videoclipurile — nu momeala înșelătoare.

Funcționează automat imediat după instalare. Fără ferestre, fără cont, fără setări.

• Înlocuiește miniaturile pe pagina principală, în căutare, în bara laterală și pe canale
• Funcționează cu videoclipuri normale și Shorts
• Restaurează automat originalul când nu există un cadru real
• Ușoară (~3 kB) și privată: fără urmărire, fără conturi, fără cereri suplimentare

DeBait are nevoie doar de acces la YouTube și schimbă miniaturile la nivel de rețea, așa că imaginea clickbait nici măcar nu este descărcată.` },
  hu:     { name: 'DeBait – Valódi YouTube-bélyegképek kattintásvadászat nélkül',
            desc: 'Automatikusan lecseréli a kattintásvadász YouTube-bélyegképeket a videó valódi első képkockájára. Könnyű, privát, beállítás nélkül.',
            long: `A DeBait lecseréli a kattintásvadász YouTube-bélyegképeket minden videó valódi első képkockájára, hogy a hírfolyamod azt mutassa, miről szólnak valójában a videók — nem a megtévesztő csalit.

Telepítés után azonnal, automatikusan működik. Nincs felugró ablak, nincs fiók, nincs beállítás.

• Lecseréli a bélyegképeket a főoldalon, a keresésben, az oldalsávban és a csatornákon
• Működik a normál videókkal és a Shorts videókkal is
• Automatikusan visszaállítja az eredetit, ha nincs valódi képkocka
• Könnyű (~3 kB) és privát: nincs követés, nincs fiók, nincsenek extra kérések

A DeBaitnek csak a YouTube-hoz kell hozzáférés, és hálózati szinten cseréli a bélyegképeket, így a kattintásvadász kép le sem töltődik.` },
  el:     { name: 'DeBait – Πραγματικές μικρογραφίες YouTube, χωρίς clickbait',
            desc: 'Αντικαθιστά τις clickbait μικρογραφίες του YouTube με το πραγματικό πρώτο καρέ του βίντεο. Ελαφριά, ιδιωτική, χωρίς ρυθμίσεις.',
            long: `Το DeBait αντικαθιστά τις clickbait μικρογραφίες του YouTube με το πραγματικό πρώτο καρέ κάθε βίντεο, ώστε η ροή σας να δείχνει για τι πραγματικά είναι τα βίντεο — όχι το παραπλανητικό δόλωμα.

Λειτουργεί αυτόματα μόλις το εγκαταστήσετε. Χωρίς αναδυόμενα, χωρίς λογαριασμό, χωρίς ρυθμίσεις.

• Αντικαθιστά μικρογραφίες στην αρχική, την αναζήτηση, την πλαϊνή μπάρα και τα κανάλια
• Λειτουργεί με κανονικά βίντεο και Shorts
• Επαναφέρει αυτόματα το πρωτότυπο όταν δεν υπάρχει πραγματικό καρέ
• Ελαφριά (~3 kB) και ιδιωτική: χωρίς παρακολούθηση, χωρίς λογαριασμούς, χωρίς επιπλέον αιτήματα

Το DeBait χρειάζεται πρόσβαση μόνο στο YouTube και αλλάζει τις μικρογραφίες σε επίπεδο δικτύου, οπότε η clickbait εικόνα ούτε καν δεν κατεβαίνει.` },
  tr:     { name: 'DeBait – Gerçek YouTube küçük resimleri, tıklama tuzağı yok',
            desc: 'YouTube’daki tıklama tuzağı küçük resimleri otomatik olarak videonun gerçek ilk karesiyle değiştirir. Hafif, gizli, kurulum yok.',
            long: `DeBait, YouTube’un tıklama tuzağı küçük resimlerini her videonun gerçek ilk karesiyle değiştirir; böylece akışınız videoların gerçekte ne hakkında olduğunu gösterir — yanıltıcı yemi değil.

Kurar kurmaz otomatik çalışır. Açılır pencere yok, hesap yok, ayar yok.

• Ana sayfa, arama, kenar çubuğu ve kanal sayfalarındaki küçük resimleri değiştirir
• Normal videolarla ve Shorts ile çalışır
• Gerçek kare yoksa orijinali otomatik olarak geri yükler
• Hafif (~3 kB) ve gizli: izleme yok, hesap yok, ek istek yok

DeBait yalnızca YouTube erişimine ihtiyaç duyar ve küçük resimleri ağ katmanında değiştirir, böylece tıklama tuzağı görseli hiç indirilmez bile.` },
  fi:     { name: 'DeBait – Aidot YouTube-pikkukuvat, ei klikkiotsikoita',
            desc: 'Korvaa klikkiansapikkukuvat YouTubessa automaattisesti videon aidolla ensimmäisellä ruudulla. Kevyt, yksityinen, ei asetuksia.',
            long: `DeBait korvaa YouTuben klikkiansapikkukuvat jokaisen videon aidolla ensimmäisellä ruudulla, jotta syötteesi näyttää, mistä videot oikeasti kertovat — eikä harhaanjohtavaa syöttiä.

Se toimii automaattisesti heti asennuksen jälkeen. Ei ponnahdusikkunaa, ei tiliä, ei asetuksia.

• Korvaa pikkukuvat etusivulla, haussa, sivupalkissa ja kanavilla
• Toimii sekä tavallisten videoiden että Shortsien kanssa
• Palauttaa alkuperäisen automaattisesti, jos aitoa ruutua ei ole
• Kevyt (~3 kt) ja yksityinen: ei seurantaa, ei tilejä, ei ylimääräisiä pyyntöjä

DeBait tarvitsee pääsyn vain YouTubeen ja vaihtaa pikkukuvat verkkotasolla, joten klikkiansakuvaa ei ladata lainkaan.` },
  sv:     { name: 'DeBait – Äkta YouTube-miniatyrer, inget clickbait',
            desc: 'Ersätter automatiskt clickbait-miniatyrer på YouTube med videons äkta första bildruta. Lätt, privat, ingen konfiguration.',
            long: `DeBait byter ut clickbait-miniatyrer på YouTube mot den äkta första bildrutan i varje video, så att ditt flöde visar vad videorna faktiskt handlar om — inte det vilseledande betet.

Det fungerar automatiskt så fort du installerar det. Ingen popup, inget konto, inga inställningar.

• Ersätter miniatyrer på startsidan, i sökningen, i sidofältet och på kanaler
• Fungerar med vanliga videor och Shorts
• Återställer originalet automatiskt när ingen äkta bildruta finns
• Lätt (~3 kB) och privat: ingen spårning, inga konton, inga extra förfrågningar

DeBait behöver bara åtkomst till YouTube och ändrar miniatyrer på nätverksnivå, så clickbait-bilden laddas aldrig ens ner.` },
  da:     { name: 'DeBait – Ægte YouTube-miniaturer, intet clickbait',
            desc: 'Erstatter automatisk clickbait-miniaturer på YouTube med videoens ægte første billede. Let, privat, ingen opsætning.',
            long: `DeBait erstatter clickbait-miniaturer på YouTube med det ægte første billede af hver video, så dit feed viser, hvad videoerne faktisk handler om — ikke det vildledende lokkemiddel.

Det virker automatisk, så snart du installerer det. Ingen pop-op, ingen konto, ingen indstillinger.

• Erstatter miniaturer på forsiden, i søgning, i sidepanelet og på kanaler
• Virker med almindelige videoer og Shorts
• Gendanner automatisk originalen, når der ikke findes et ægte billede
• Let (~3 kB) og privat: ingen sporing, ingen konti, ingen ekstra forespørgsler

DeBait skal kun have adgang til YouTube og ændrer miniaturer på netværksniveau, så clickbait-billedet hentes aldrig.` },
  no:     { name: 'DeBait – Ekte YouTube-miniatyrer, ingen clickbait',
            desc: 'Erstatter automatisk clickbait-miniatyrer på YouTube med videoens ekte første bilde. Lett, privat, ingen oppsett.',
            long: `DeBait erstatter clickbait-miniatyrer på YouTube med det ekte første bildet av hver video, slik at strømmen din viser hva videoene faktisk handler om — ikke det villedende agnet.

Det fungerer automatisk så snart du installerer det. Ingen pop-up, ingen konto, ingen innstillinger.

• Erstatter miniatyrer på forsiden, i søk, i sidefeltet og på kanaler
• Fungerer med vanlige videoer og Shorts
• Gjenoppretter originalen automatisk når et ekte bilde mangler
• Lett (~3 kB) og privat: ingen sporing, ingen kontoer, ingen ekstra forespørsler

DeBait trenger bare tilgang til YouTube og endrer miniatyrer på nettverksnivå, så clickbait-bildet lastes aldri ned.` },
  et:     { name: 'DeBait – Tõelised YouTube’i pisipildid, ilma clickbait’ita',
            desc: 'Asendab YouTube’i clickbait-pisipildid automaatselt video tõelise esimese kaadriga. Kerge, privaatne, seadistuseta.',
            long: `DeBait asendab YouTube’i clickbait-pisipildid iga video tõelise esimese kaadriga, et su voog näitaks, millest videod tegelikult räägivad — mitte eksitavat sööta.

See töötab automaatselt kohe pärast paigaldamist. Ei mingeid hüpikaknaid, kontot ega seadeid.

• Asendab pisipildid avalehel, otsingus, külgribal ja kanalitel
• Töötab nii tavavideote kui ka Shortsidega
• Taastab automaatselt originaali, kui tõelist kaadrit pole
• Kerge (~3 kB) ja privaatne: ei jälgimist, ei kontosid, ei lisapäringuid

DeBait vajab juurdepääsu ainult YouTube’ile ja muudab pisipilte võrgutasandil, nii et clickbait-pilti isegi ei laadita alla.` },
  lt:     { name: 'DeBait – Tikros „YouTube“ miniatiūros, jokio spustelėjimų jauko',
            desc: 'Automatiškai pakeičia „YouTube“ spustelėjimų jauko miniatiūras tikru pirmuoju vaizdo įrašo kadru. Lengva, privatu, be nustatymų.',
            long: `„DeBait“ pakeičia „YouTube“ spustelėjimų jauko miniatiūras tikru pirmuoju kiekvieno vaizdo įrašo kadru, kad jūsų sraute matytumėte, apie ką iš tikrųjų yra įrašai — o ne klaidinantį jauką.

Jis veikia automatiškai vos įdiegus. Jokių iškylančių langų, jokios paskyros, jokių nustatymų.

• Pakeičia miniatiūras pradžios puslapyje, paieškoje, šoninėje juostoje ir kanaluose
• Veikia su įprastais vaizdo įrašais ir „Shorts“
• Automatiškai atkuria originalą, kai tikro kadro nėra
• Lengva (~3 kB) ir privatu: jokio sekimo, jokių paskyrų, jokių papildomų užklausų

„DeBait“ reikia prieigos tik prie „YouTube“ ir keičia miniatiūras tinklo lygmenyje, todėl jauko paveikslėlis net neatsiunčiamas.` },
  lv:     { name: 'DeBait – Īsti YouTube sīktēli, bez clickbait',
            desc: 'Automātiski aizstāj YouTube clickbait sīktēlus ar video patieso pirmo kadru. Viegls, privāts, bez iestatīšanas.',
            long: `DeBait aizstāj YouTube clickbait sīktēlus ar katra video patieso pirmo kadru, lai tava plūsma rāda, par ko video patiešām ir — nevis maldinošo ēsmu.

Tas darbojas automātiski, tiklīdz to instalē. Bez uznirstošajiem logiem, bez konta, bez iestatījumiem.

• Aizstāj sīktēlus sākumlapā, meklēšanā, sānjoslā un kanālos
• Darbojas ar parastiem video un Shorts
• Automātiski atjauno oriģinālu, ja patiesa kadra nav
• Viegls (~3 kB) un privāts: bez izsekošanas, bez kontiem, bez papildu pieprasījumiem

DeBait nepieciešama piekļuve tikai YouTube un tas maina sīktēlus tīkla līmenī, tāpēc clickbait attēls pat netiek lejupielādēts.` },
  ca:     { name: 'DeBait – Miniatures reals de YouTube, sense clickbait',
            desc: 'Substitueix les miniatures clickbait de YouTube pel primer fotograma real del vídeo. Lleugera, privada, sense configuració.',
            long: `DeBait substitueix les miniatures clickbait de YouTube pel primer fotograma real de cada vídeo, perquè el teu feed mostri de què van realment els vídeos — i no l'esquer enganyós.

Funciona automàticament tan bon punt l'instal·les. Sense finestres, sense compte, sense ajustaments.

• Substitueix les miniatures a l'inici, la cerca, la barra lateral i els canals
• Funciona amb vídeos normals i Shorts
• Restaura l'original automàticament quan no hi ha un fotograma real
• Lleugera (~3 kB) i privada: sense seguiment, sense comptes, sense peticions extra

DeBait només necessita accés a YouTube i canvia les miniatures a la capa de xarxa, així que la imatge clickbait ni tan sols es descarrega.` },
  ar:     { name: 'DeBait – صور يوتيوب المصغّرة الحقيقية بلا نقر مخادع',
            desc: 'يستبدل تلقائيًا صور يوتيوب المصغّرة المخادعة بأول إطار حقيقي من الفيديو. خفيف وخاص وبلا إعداد.',
            long: `يستبدل DeBait صور يوتيوب المصغّرة المخادعة بأول إطار حقيقي من كل فيديو، حتى يعرض موجزك ما تدور حوله مقاطع الفيديو فعليًا — لا الطُّعم المضلِّل.

يعمل تلقائيًا فور تثبيته. بلا نوافذ منبثقة، ولا حساب، ولا إعدادات.

• يستبدل الصور المصغّرة في الصفحة الرئيسية والبحث والشريط الجانبي والقنوات
• يعمل مع الفيديوهات العادية ومقاطع Shorts
• يستعيد الأصل تلقائيًا عند عدم توفّر إطار حقيقي
• خفيف (~3 كيلوبايت) وخاص: بلا تتبُّع، ولا حسابات، ولا طلبات إضافية

يحتاج DeBait إلى الوصول إلى يوتيوب فقط، ويغيّر الصور المصغّرة على مستوى الشبكة، لذا لا تُنزَّل الصورة المخادعة أصلًا.` },
  he:     { name: 'DeBait – תמונות ממוזערות אמיתיות ביוטיוב, בלי קליקבייט',
            desc: 'מחליף אוטומטית תמונות ממוזערות קליקבייט ביוטיוב בפריים הראשון האמיתי של הסרטון. קל, פרטי, ללא הגדרות.',
            long: `‏DeBait מחליף את התמונות הממוזערות מסוג קליקבייט ביוטיוב בפריים הראשון האמיתי של כל סרטון, כדי שהפיד שלך יראה במה הסרטונים באמת עוסקים — ולא את הפיתיון המטעה.

הוא פועל אוטומטית מרגע ההתקנה. בלי חלון קופץ, בלי חשבון, בלי הגדרות.

• מחליף תמונות ממוזערות בדף הבית, בחיפוש, בסרגל הצד ובערוצים
• עובד עם סרטונים רגילים ועם Shorts
• משחזר אוטומטית את המקור כשאין פריים אמיתי
• קל (~3 ק"ב) ופרטי: בלי מעקב, בלי חשבונות, בלי בקשות נוספות

‏DeBait זקוק לגישה ליוטיוב בלבד ומשנה את התמונות הממוזערות ברמת הרשת, כך שתמונת הקליקבייט אפילו לא יורדת.` },
  fa:     { name: 'DeBait – تصاویر بندانگشتی واقعی یوتیوب، بدون کلیک‌بیت',
            desc: 'تصاویر بندانگشتی کلیک‌بیت یوتیوب را به‌طور خودکار با نخستین فریم واقعی ویدیو جایگزین می‌کند. سبک، خصوصی، بدون تنظیمات.',
            long: `‏DeBait تصاویر بندانگشتی کلیک‌بیت یوتیوب را با نخستین فریم واقعی هر ویدیو جایگزین می‌کند تا فید شما نشان دهد ویدیوها واقعاً دربارهٔ چه هستند — نه طعمهٔ گمراه‌کننده.

به‌محض نصب، خودکار کار می‌کند. بدون پنجرهٔ بازشو، بدون حساب، بدون تنظیمات.

• تصاویر بندانگشتی را در صفحهٔ اصلی، جست‌وجو، نوار کناری و کانال‌ها جایگزین می‌کند
• با ویدیوهای معمولی و Shorts کار می‌کند
• وقتی فریم واقعی وجود نداشته باشد، خودکار نسخهٔ اصلی را بازمی‌گرداند
• سبک (~۳ کیلوبایت) و خصوصی: بدون ردیابی، بدون حساب، بدون درخواست اضافی

‏DeBait فقط به دسترسی یوتیوب نیاز دارد و تصاویر بندانگشتی را در لایهٔ شبکه تغییر می‌دهد، بنابراین تصویر کلیک‌بیت اصلاً دانلود نمی‌شود.` },
  hi:     { name: 'DeBait – असली YouTube थंबनेल, कोई क्लिकबेट नहीं',
            desc: 'YouTube के क्लिकबेट थंबनेल को अपने आप वीडियो के असली पहले फ़्रेम से बदल देता है। हल्का, निजी, बिना सेटअप।',
            long: `DeBait YouTube के क्लिकबेट थंबनेल को हर वीडियो के असली पहले फ़्रेम से बदल देता है, ताकि आपका फ़ीड दिखाए कि वीडियो असल में किस बारे में हैं — भ्रामक चारा नहीं।

इंस्टॉल करते ही यह अपने आप काम करता है। कोई पॉपअप नहीं, कोई अकाउंट नहीं, कोई सेटिंग नहीं।

• होम फ़ीड, सर्च, साइडबार और चैनल पेजों पर थंबनेल बदलता है
• सामान्य वीडियो और Shorts दोनों पर काम करता है
• असली फ़्रेम उपलब्ध न हो तो अपने आप मूल थंबनेल लौटा देता है
• हल्का (~3 kB) और निजी: कोई ट्रैकिंग नहीं, कोई अकाउंट नहीं, कोई अतिरिक्त रिक्वेस्ट नहीं

DeBait को सिर्फ़ YouTube की एक्सेस चाहिए और यह थंबनेल को नेटवर्क लेयर पर बदलता है, इसलिए क्लिकबेट इमेज कभी डाउनलोड ही नहीं होती।` },
  bn:     { name: 'DeBait – আসল YouTube থাম্বনেল, কোনো ক্লিকবেট নয়',
            desc: 'YouTube-এর ক্লিকবেট থাম্বনেল স্বয়ংক্রিয়ভাবে ভিডিওর আসল প্রথম ফ্রেম দিয়ে বদলে দেয়। হালকা, ব্যক্তিগত, সেটআপ ছাড়াই।',
            long: `DeBait YouTube-এর ক্লিকবেট থাম্বনেলকে প্রতিটি ভিডিওর আসল প্রথম ফ্রেম দিয়ে বদলে দেয়, যাতে আপনার ফিড দেখায় ভিডিওগুলো আসলে কী নিয়ে — বিভ্রান্তিকর টোপ নয়।

ইনস্টল করার সঙ্গে সঙ্গেই এটি স্বয়ংক্রিয়ভাবে কাজ করে। কোনো পপআপ নেই, অ্যাকাউন্ট নেই, সেটিং নেই।

• হোম ফিড, সার্চ, সাইডবার ও চ্যানেল পেজে থাম্বনেল বদলায়
• সাধারণ ভিডিও ও Shorts—দুটোতেই কাজ করে
• আসল ফ্রেম না থাকলে স্বয়ংক্রিয়ভাবে আসলটি ফিরিয়ে আনে
• হালকা (~3 kB) ও ব্যক্তিগত: কোনো ট্র্যাকিং নেই, অ্যাকাউন্ট নেই, বাড়তি রিকোয়েস্ট নেই

DeBait-এর শুধু YouTube-এর অ্যাক্সেস দরকার এবং এটি নেটওয়ার্ক স্তরে থাম্বনেল বদলায়, তাই ক্লিকবেট ছবিটি কখনও ডাউনলোডই হয় না।` },
  gu:     { name: 'DeBait – અસલી YouTube થંબનેલ, કોઈ ક્લિકબેટ નહીં',
            desc: 'YouTube ના ક્લિકબેટ થંબનેલને આપમેળે વિડિયોના અસલી પ્રથમ ફ્રેમથી બદલે છે. હલકું, ખાનગી, સેટઅપ વગર.',
            long: `DeBait YouTube ના ક્લિકબેટ થંબનેલને દરેક વિડિયોના અસલી પ્રથમ ફ્રેમથી બદલે છે, જેથી તમારું ફીડ બતાવે કે વિડિયો ખરેખર શેના વિશે છે — ભ્રામક લાલચ નહીં.

ઇન્સ્ટોલ કરતાં જ તે આપમેળે કામ કરે છે. કોઈ પૉપઅપ નહીં, કોઈ એકાઉન્ટ નહીં, કોઈ સેટિંગ નહીં.

• હોમ ફીડ, સર્ચ, સાઇડબાર અને ચેનલ પેજ પર થંબનેલ બદલે છે
• સામાન્ય વિડિયો અને Shorts બંને પર કામ કરે છે
• અસલી ફ્રેમ ન હોય ત્યારે આપમેળે મૂળ થંબનેલ પાછું લાવે છે
• હલકું (~3 kB) અને ખાનગી: કોઈ ટ્રેકિંગ નહીં, એકાઉન્ટ નહીં, વધારાની વિનંતી નહીં

DeBait ને માત્ર YouTube ની ઍક્સેસ જોઈએ છે અને તે થંબનેલને નેટવર્ક સ્તરે બદલે છે, તેથી ક્લિકબેટ ઇમેજ ક્યારેય ડાઉનલોડ જ થતી નથી.` },
  kn:     { name: 'DeBait – ನಿಜವಾದ YouTube ಥಂಬ್‌ನೇಲ್‌ಗಳು, ಕ್ಲಿಕ್‌ಬೈಟ್ ಇಲ್ಲ',
            desc: 'YouTube ನ ಕ್ಲಿಕ್‌ಬೈಟ್ ಥಂಬ್‌ನೇಲ್‌ಗಳನ್ನು ವೀಡಿಯೊದ ನಿಜವಾದ ಮೊದಲ ಫ್ರೇಮ್‌ನಿಂದ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಬದಲಾಯಿಸುತ್ತದೆ. ಹಗುರ, ಖಾಸಗಿ, ಸೆಟಪ್ ಇಲ್ಲ.',
            long: `DeBait YouTube ನ ಕ್ಲಿಕ್‌ಬೈಟ್ ಥಂಬ್‌ನೇಲ್‌ಗಳನ್ನು ಪ್ರತಿ ವೀಡಿಯೊದ ನಿಜವಾದ ಮೊದಲ ಫ್ರೇಮ್‌ನಿಂದ ಬದಲಾಯಿಸುತ್ತದೆ, ಇದರಿಂದ ನಿಮ್ಮ ಫೀಡ್ ವೀಡಿಯೊಗಳು ನಿಜವಾಗಿ ಯಾವುದರ ಕುರಿತು ಎಂದು ತೋರಿಸುತ್ತದೆ — ದಾರಿತಪ್ಪಿಸುವ ಆಮಿಷವಲ್ಲ.

ಇನ್‌ಸ್ಟಾಲ್ ಮಾಡಿದ ಕೂಡಲೇ ಇದು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಕೆಲಸ ಮಾಡುತ್ತದೆ. ಪಾಪ್‌ಅಪ್ ಇಲ್ಲ, ಖಾತೆ ಇಲ್ಲ, ಸೆಟ್ಟಿಂಗ್‌ಗಳಿಲ್ಲ.

• ಹೋಮ್ ಫೀಡ್, ಹುಡುಕಾಟ, ಸೈಡ್‌ಬಾರ್ ಮತ್ತು ಚಾನೆಲ್ ಪುಟಗಳಲ್ಲಿ ಥಂಬ್‌ನೇಲ್‌ಗಳನ್ನು ಬದಲಾಯಿಸುತ್ತದೆ
• ಸಾಮಾನ್ಯ ವೀಡಿಯೊಗಳು ಮತ್ತು Shorts ಎರಡರಲ್ಲೂ ಕೆಲಸ ಮಾಡುತ್ತದೆ
• ನಿಜವಾದ ಫ್ರೇಮ್ ಇಲ್ಲದಿದ್ದಾಗ ಮೂಲವನ್ನು ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಮರುಸ್ಥಾಪಿಸುತ್ತದೆ
• ಹಗುರ (~3 kB) ಮತ್ತು ಖಾಸಗಿ: ಟ್ರ್ಯಾಕಿಂಗ್ ಇಲ್ಲ, ಖಾತೆಗಳಿಲ್ಲ, ಹೆಚ್ಚುವರಿ ವಿನಂತಿಗಳಿಲ್ಲ

DeBait ಗೆ YouTube ಪ್ರವೇಶ ಮಾತ್ರ ಬೇಕು ಮತ್ತು ಅದು ಥಂಬ್‌ನೇಲ್‌ಗಳನ್ನು ನೆಟ್‌ವರ್ಕ್ ಮಟ್ಟದಲ್ಲಿ ಬದಲಾಯಿಸುತ್ತದೆ, ಆದ್ದರಿಂದ ಕ್ಲಿಕ್‌ಬೈಟ್ ಚಿತ್ರ ಎಂದಿಗೂ ಡೌನ್‌ಲೋಡ್ ಆಗುವುದಿಲ್ಲ.` },
  ml:     { name: 'DeBait – യഥാർത്ഥ YouTube തംബ്നെയിലുകൾ, ക്ലിക്ക്ബെയ്റ്റ് ഇല്ല',
            desc: 'YouTube-ന്റെ ക്ലിക്ക്ബെയ്റ്റ് തംബ്നെയിലുകൾ വീഡിയോയുടെ യഥാർത്ഥ ആദ്യ ഫ്രെയിം കൊണ്ട് സ്വയം മാറ്റുന്നു. ലഘു, സ്വകാര്യം, സജ്ജീകരണമില്ല.',
            long: `DeBait YouTube-ന്റെ ക്ലിക്ക്ബെയ്റ്റ് തംബ്നെയിലുകൾ ഓരോ വീഡിയോയുടെയും യഥാർത്ഥ ആദ്യ ഫ്രെയിം കൊണ്ട് മാറ്റുന്നു, അങ്ങനെ വീഡിയോകൾ യഥാർത്ഥത്തിൽ എന്തിനെക്കുറിച്ചാണെന്ന് നിങ്ങളുടെ ഫീഡ് കാണിക്കും — തെറ്റിദ്ധരിപ്പിക്കുന്ന ചൂണ്ടയല്ല.

ഇൻസ്റ്റാൾ ചെയ്ത ഉടൻ ഇത് സ്വയം പ്രവർത്തിക്കും. പോപ്പ്അപ്പ് ഇല്ല, അക്കൗണ്ട് ഇല്ല, ക്രമീകരണങ്ങൾ ഇല്ല.

• ഹോം ഫീഡ്, തിരയൽ, സൈഡ്ബാർ, ചാനൽ പേജുകൾ എന്നിവയിൽ തംബ്നെയിലുകൾ മാറ്റുന്നു
• സാധാരണ വീഡിയോകളിലും Shorts-ലും പ്രവർത്തിക്കുന്നു
• യഥാർത്ഥ ഫ്രെയിം ഇല്ലാത്തപ്പോൾ യഥാർത്ഥം സ്വയം പുനഃസ്ഥാപിക്കുന്നു
• ലഘു (~3 kB), സ്വകാര്യം: ട്രാക്കിംഗ് ഇല്ല, അക്കൗണ്ടുകൾ ഇല്ല, അധിക അഭ്യർത്ഥനകൾ ഇല്ല

DeBait-ന് YouTube ആക്സസ് മാത്രമേ വേണ്ടൂ, അത് തംബ്നെയിലുകൾ നെറ്റ്‌വർക്ക് തലത്തിൽ മാറ്റുന്നു, അതിനാൽ ക്ലിക്ക്ബെയ്റ്റ് ചിത്രം ഒരിക്കലും ഡൗൺലോഡ് ചെയ്യപ്പെടുന്നില്ല.` },
  mr:     { name: 'DeBait – खरे YouTube थंबनेल, क्लिकबेट नाही',
            desc: 'YouTube चे क्लिकबेट थंबनेल आपोआप व्हिडिओच्या खऱ्या पहिल्या फ्रेमने बदलते. हलके, खाजगी, सेटअपशिवाय.',
            long: `DeBait YouTube चे क्लिकबेट थंबनेल प्रत्येक व्हिडिओच्या खऱ्या पहिल्या फ्रेमने बदलते, जेणेकरून तुमचा फीड व्हिडिओ खरोखर कशाबद्दल आहेत हे दाखवेल — दिशाभूल करणारे आमिष नाही.

इन्स्टॉल करताच ते आपोआप काम करते. पॉपअप नाही, खाते नाही, सेटिंग्ज नाहीत.

• होम फीड, शोध, साइडबार आणि चॅनेल पेजवर थंबनेल बदलते
• सामान्य व्हिडिओ आणि Shorts दोन्हींवर काम करते
• खरी फ्रेम उपलब्ध नसल्यास मूळ थंबनेल आपोआप परत आणते
• हलके (~3 kB) आणि खाजगी: ट्रॅकिंग नाही, खाती नाहीत, अतिरिक्त विनंत्या नाहीत

DeBait ला फक्त YouTube चा प्रवेश हवा असतो आणि ते थंबनेल नेटवर्क स्तरावर बदलते, त्यामुळे क्लिकबेट प्रतिमा कधीही डाउनलोडच होत नाही.` },
  ta:     { name: 'DeBait – உண்மையான YouTube சிறுபடங்கள், கிளிக்பெய்ட் இல்லை',
            desc: 'YouTube இன் கிளிக்பெய்ட் சிறுபடங்களை வீடியோவின் உண்மையான முதல் ஃபிரேமால் மாற்றுகிறது. இலகுவானது, தனிப்பட்டது, அமைப்பு தேவையில்லை.',
            long: `DeBait YouTube இன் கிளிக்பெய்ட் சிறுபடங்களை ஒவ்வொரு வீடியோவின் உண்மையான முதல் ஃபிரேமால் மாற்றுகிறது, இதனால் வீடியோக்கள் உண்மையில் எதைப் பற்றியவை என்பதை உங்கள் ஃபீட் காட்டும் — தவறாக வழிநடத்தும் தூண்டில் அல்ல.

நிறுவியவுடன் இது தானாகவே செயல்படும். பாப்அப் இல்லை, கணக்கு இல்லை, அமைப்புகள் இல்லை.

• முகப்பு ஃபீட், தேடல், பக்கப்பட்டி மற்றும் சேனல் பக்கங்களில் சிறுபடங்களை மாற்றுகிறது
• சாதாரண வீடியோக்கள் மற்றும் Shorts இரண்டிலும் செயல்படுகிறது
• உண்மையான ஃபிரேம் இல்லாதபோது மூலத்தைத் தானாகவே மீட்டெடுக்கிறது
• இலகுவானது (~3 kB), தனிப்பட்டது: கண்காணிப்பு இல்லை, கணக்குகள் இல்லை, கூடுதல் கோரிக்கைகள் இல்லை

DeBait க்கு YouTube அணுகல் மட்டுமே தேவை, அது சிறுபடங்களை நெட்வொர்க் மட்டத்தில் மாற்றுகிறது, எனவே கிளிக்பெய்ட் படம் ஒருபோதும் பதிவிறக்கப்படுவதில்லை.` },
  te:     { name: 'DeBait – అసలైన YouTube థంబ్‌నెయిల్‌లు, క్లిక్‌బెయిట్ లేదు',
            desc: 'YouTube క్లిక్‌బెయిట్ థంబ్‌నెయిల్‌లను వీడియో అసలైన మొదటి ఫ్రేమ్‌తో ఆటోమేటిక్‌గా మారుస్తుంది. తేలికైనది, ప్రైవేట్, సెటప్ అవసరం లేదు.',
            long: `DeBait YouTube క్లిక్‌బెయిట్ థంబ్‌నెయిల్‌లను ప్రతి వీడియో అసలైన మొదటి ఫ్రేమ్‌తో మారుస్తుంది, తద్వారా వీడియోలు నిజంగా దేని గురించి అన్నది మీ ఫీడ్ చూపిస్తుంది — తప్పుదారి పట్టించే ఎరను కాదు.

ఇన్‌స్టాల్ చేసిన వెంటనే ఇది ఆటోమేటిక్‌గా పనిచేస్తుంది. పాపప్ లేదు, ఖాతా లేదు, సెట్టింగ్‌లు లేవు.

• హోమ్ ఫీడ్, సెర్చ్, సైడ్‌బార్ మరియు ఛానెల్ పేజీలలో థంబ్‌నెయిల్‌లను మారుస్తుంది
• సాధారణ వీడియోలు మరియు Shorts రెండింటిలోనూ పనిచేస్తుంది
• అసలైన ఫ్రేమ్ లేనప్పుడు ఒరిజినల్‌ను ఆటోమేటిక్‌గా పునరుద్ధరిస్తుంది
• తేలికైనది (~3 kB), ప్రైవేట్: ట్రాకింగ్ లేదు, ఖాతాలు లేవు, అదనపు అభ్యర్థనలు లేవు

DeBait కు YouTube యాక్సెస్ మాత్రమే అవసరం, ఇది థంబ్‌నెయిల్‌లను నెట్‌వర్క్ స్థాయిలో మారుస్తుంది, కాబట్టి క్లిక్‌బెయిట్ చిత్రం ఎప్పుడూ డౌన్‌లోడ్ కానేకాదు.` },
  am:     { name: 'DeBait – እውነተኛ የYouTube ድንክዬዎች፣ ያለ ጠቅታ ማታለያ',
            desc: 'የYouTube ጠቅታ ማታለያ ድንክዬዎችን በቪዲዮው እውነተኛ የመጀመሪያ ፍሬም በራስ-ሰር ይተካል። ቀላል፣ ግላዊ፣ ያለ ማዋቀር።',
            long: `DeBait የYouTube ጠቅታ ማታለያ ድንክዬዎችን በእያንዳንዱ ቪዲዮ እውነተኛ የመጀመሪያ ፍሬም ይተካል፣ ስለዚህ ፊድዎ ቪዲዮዎቹ በእውነቱ ስለ ምን እንደሆኑ ያሳያል — የሚያሳስት ማጥመጃ አይደለም።

እንደተጫነ ወዲያውኑ በራስ-ሰር ይሰራል። ምንም ብቅ-ባይ መስኮት የለም፣ መለያ የለም፣ ቅንብሮች የሉም።

• በመነሻ ገጽ፣ በፍለጋ፣ በጎን አሞሌና በቻናሎች ላይ ድንክዬዎችን ይተካል
• ከመደበኛ ቪዲዮዎችና ከShorts ጋር ይሰራል
• እውነተኛ ፍሬም በማይኖርበት ጊዜ መነሻውን በራስ-ሰር ይመልሳል
• ቀላል (~3 kB) እና ግላዊ፦ ክትትል የለም፣ መለያዎች የሉም፣ ተጨማሪ ጥያቄዎች የሉም

DeBait የሚያስፈልገው የYouTube መዳረሻ ብቻ ነው፣ ድንክዬዎችንም በኔትወርክ ደረጃ ይቀይራል፣ ስለዚህ የጠቅታ ማታለያ ምስሉ ጭራሽ አይወርድም።` },
  sw:     { name: 'DeBait – Vijipicha halisi vya YouTube, bila clickbait',
            desc: 'Hubadilisha kiotomatiki vijipicha vya clickbait vya YouTube na fremu halisi ya kwanza ya video. Nyepesi, faragha, bila usanidi.',
            long: `DeBait hubadilisha vijipicha vya clickbait vya YouTube na fremu halisi ya kwanza ya kila video, ili mlisho wako uonyeshe video zinahusu nini hasa — si chambo cha kupotosha.

Hufanya kazi kiotomatiki mara tu unaposakinisha. Hakuna kidirisha ibukizi, hakuna akaunti, hakuna mipangilio.

• Hubadilisha vijipicha kwenye ukurasa wa nyumbani, utafutaji, upau wa kando na chaneli
• Hufanya kazi na video za kawaida na Shorts
• Hurejesha asili kiotomatiki wakati fremu halisi haipo
• Nyepesi (~3 kB) na ya faragha: hakuna ufuatiliaji, hakuna akaunti, hakuna maombi ya ziada

DeBait inahitaji ufikiaji wa YouTube pekee na hubadilisha vijipicha katika tabaka la mtandao, hivyo picha ya clickbait haipakuliwi hata kidogo.` },
  th:     { name: 'DeBait – ภาพขนาดย่อ YouTube ของจริง ไม่มีคลิกเบต',
            desc: 'แทนที่ภาพขนาดย่อคลิกเบตบน YouTube ด้วยเฟรมแรกจริงของวิดีโอโดยอัตโนมัติ เบา เป็นส่วนตัว ไม่ต้องตั้งค่า',
            long: `DeBait แทนที่ภาพขนาดย่อคลิกเบตบน YouTube ด้วยเฟรมแรกจริงของแต่ละวิดีโอ เพื่อให้ฟีดของคุณแสดงว่าวิดีโอเกี่ยวกับอะไรจริง ๆ ไม่ใช่เหยื่อล่อที่ทำให้เข้าใจผิด

มันทำงานอัตโนมัติทันทีที่ติดตั้ง ไม่มีป๊อปอัป ไม่มีบัญชี ไม่มีการตั้งค่า

• แทนที่ภาพขนาดย่อในหน้าแรก การค้นหา แถบด้านข้าง และหน้าช่อง
• ใช้ได้ทั้งวิดีโอทั่วไปและ Shorts
• คืนค่าภาพต้นฉบับอัตโนมัติเมื่อไม่มีเฟรมจริง
• เบา (~3 kB) และเป็นส่วนตัว: ไม่มีการติดตาม ไม่มีบัญชี ไม่มีคำขอเพิ่มเติม

DeBait ต้องการสิทธิ์เข้าถึงเฉพาะ YouTube และเปลี่ยนภาพขนาดย่อที่ชั้นเครือข่าย ดังนั้นภาพคลิกเบตจึงไม่ถูกดาวน์โหลดเลยด้วยซ้ำ` },
  vi:     { name: 'DeBait – Hình thu nhỏ YouTube thật, không câu khách',
            desc: 'Tự động thay hình thu nhỏ câu khách trên YouTube bằng khung hình đầu tiên thật của video. Nhẹ, riêng tư, không cần thiết lập.',
            long: `DeBait thay hình thu nhỏ câu khách trên YouTube bằng khung hình đầu tiên thật của mỗi video, để bảng tin của bạn cho thấy video thực sự nói về điều gì — không phải mồi nhử gây hiểu lầm.

Nó tự động hoạt động ngay khi bạn cài đặt. Không cửa sổ bật lên, không tài khoản, không cài đặt.

• Thay hình thu nhỏ trên trang chủ, tìm kiếm, thanh bên và trang kênh
• Hoạt động với cả video thường và Shorts
• Tự động khôi phục hình gốc khi không có khung hình thật
• Nhẹ (~3 kB) và riêng tư: không theo dõi, không tài khoản, không yêu cầu thừa

DeBait chỉ cần quyền truy cập YouTube và thay hình thu nhỏ ở tầng mạng, nên hình câu khách thậm chí không bao giờ được tải về.` },
  id:     { name: 'DeBait – Thumbnail YouTube asli, bukan umpan klik',
            desc: 'Otomatis mengganti thumbnail umpan klik YouTube dengan frame pertama asli video. Ringan, privat, tanpa pengaturan.',
            long: `DeBait mengganti thumbnail umpan klik YouTube dengan frame pertama asli setiap video, sehingga feed Anda menampilkan isi video yang sebenarnya — bukan umpan yang menyesatkan.

Bekerja otomatis begitu dipasang. Tanpa pop-up, tanpa akun, tanpa pengaturan.

• Mengganti thumbnail di beranda, pencarian, bilah samping, dan halaman channel
• Bekerja untuk video biasa dan Shorts
• Memulihkan aslinya secara otomatis saat frame asli tidak tersedia
• Ringan (~3 kB) dan privat: tanpa pelacakan, tanpa akun, tanpa permintaan tambahan

DeBait hanya butuh akses ke YouTube dan mengubah thumbnail di lapisan jaringan, jadi gambar umpan klik bahkan tidak pernah diunduh.` },
  ms:     { name: 'DeBait – Lakaran kecil YouTube sebenar, tiada umpan klik',
            desc: 'Menggantikan lakaran kecil umpan klik YouTube dengan bingkai pertama sebenar video. Ringan, peribadi, tiada persediaan.',
            long: `DeBait menggantikan lakaran kecil umpan klik YouTube dengan bingkai pertama sebenar setiap video, supaya suapan anda menunjukkan kandungan sebenar video — bukan umpan yang mengelirukan.

Ia berfungsi secara automatik sebaik sahaja dipasang. Tiada pop timbul, tiada akaun, tiada tetapan.

• Menggantikan lakaran kecil di laman utama, carian, bar sisi dan halaman saluran
• Berfungsi dengan video biasa dan Shorts
• Memulihkan yang asal secara automatik apabila bingkai sebenar tiada
• Ringan (~3 kB) dan peribadi: tiada penjejakan, tiada akaun, tiada permintaan tambahan

DeBait hanya memerlukan akses ke YouTube dan menukar lakaran kecil pada lapisan rangkaian, jadi imej umpan klik tidak pernah dimuat turun pun.` },
  fil:    { name: 'DeBait – Tunay na thumbnail sa YouTube, walang clickbait',
            desc: 'Awtomatikong pinapalitan ang clickbait na thumbnail sa YouTube ng tunay na unang frame ng video. Magaan, pribado, walang setup.',
            long: `Pinapalitan ng DeBait ang clickbait na thumbnail sa YouTube ng tunay na unang frame ng bawat video, para ipakita ng iyong feed kung tungkol saan talaga ang mga video — hindi ang nakakalinlang na pain.

Awtomatiko itong gumagana sa sandaling i-install. Walang pop-up, walang account, walang settings.

• Pinapalitan ang mga thumbnail sa home feed, search, sidebar at mga channel page
• Gumagana sa regular na video at Shorts
• Awtomatikong ibinabalik ang orihinal kapag walang tunay na frame
• Magaan (~3 kB) at pribado: walang tracking, walang account, walang dagdag na request

Kailangan lang ng DeBait ng access sa YouTube at binabago nito ang mga thumbnail sa network layer, kaya hindi man lang nada-download ang clickbait na larawan.` },
  ja:     { name: 'DeBait – 本物のYouTubeサムネイル、釣りサムネなし',
            desc: 'YouTubeの釣りサムネを動画の本物の最初のフレームに自動で置き換えます。軽量・プライベート・設定不要。',
            long: `DeBaitはYouTubeの釣りサムネイルを各動画の本物の最初のフレームに置き換え、フィードに動画の実際の内容を表示します。誤解を招く「釣り」ではありません。

インストールするだけで自動的に動作します。ポップアップなし、アカウントなし、設定なし。

• ホーム、検索、サイドバー、チャンネルページのサムネイルを置き換え
• 通常の動画とShortsの両方に対応
• 本物のフレームがない場合は自動で元のサムネイルに戻す
• 軽量（約3 kB）でプライベート：トラッキングなし、アカウントなし、余計な通信なし

DeBaitに必要なのはYouTubeへのアクセスだけ。ネットワーク層でサムネイルを差し替えるため、釣り画像はそもそもダウンロードされません。` },
  ko:     { name: 'DeBait – 진짜 유튜브 썸네일, 낚시성 썸네일 제거',
            desc: '유튜브의 낚시성 썸네일을 영상의 진짜 첫 프레임으로 자동 교체합니다. 가볍고, 비공개이며, 설정이 필요 없습니다.',
            long: `DeBait는 유튜브의 낚시성 썸네일을 각 영상의 진짜 첫 프레임으로 바꿔, 피드가 영상의 실제 내용을 보여 주도록 합니다 — 오해를 부르는 미끼가 아니라요.

설치하는 순간부터 자동으로 작동합니다. 팝업 없음, 계정 없음, 설정 없음.

• 홈 피드, 검색, 사이드바, 채널 페이지의 썸네일을 교체
• 일반 영상과 Shorts 모두에서 작동
• 진짜 프레임이 없을 때 원본을 자동으로 복원
• 가볍고(~3 kB) 비공개: 추적 없음, 계정 없음, 추가 요청 없음

DeBait는 유튜브 접근 권한만 필요하며 네트워크 계층에서 썸네일을 바꾸므로, 낚시성 이미지는 아예 다운로드되지 않습니다.` },
  zh_CN:  { name: 'DeBait – 真实的 YouTube 缩略图，告别标题党',
            desc: '自动将 YouTube 的标题党缩略图替换为视频真实的第一帧。轻量、隐私、无需设置。',
            long: `DeBait 将 YouTube 的标题党缩略图替换为每个视频真实的第一帧，让你的信息流呈现视频的真实内容，而不是误导性的诱饵。

安装后即自动生效。没有弹窗、无需账号、无需设置。

• 替换首页、搜索、侧边栏和频道页面的缩略图
• 同时适用于普通视频和 Shorts
• 当没有真实帧时自动恢复原图
• 轻量（约 3 kB）且注重隐私：无跟踪、无账号、无额外请求

DeBait 只需访问 YouTube，并在网络层替换缩略图，因此标题党图片根本不会被下载。` },
  zh_TW:  { name: 'DeBait – 真實的 YouTube 縮圖，拒絕標題黨',
            desc: '自動將 YouTube 的標題黨縮圖替換成影片真實的第一個影格。輕量、隱私、免設定。',
            long: `DeBait 將 YouTube 的標題黨縮圖替換成每部影片真實的第一個影格，讓你的動態顯示影片真正的內容，而不是誤導人的誘餌。

安裝後即自動運作。沒有彈出視窗、不需帳號、不必設定。

• 替換首頁、搜尋、側邊欄與頻道頁面的縮圖
• 同時支援一般影片與 Shorts
• 沒有真實影格時自動還原原圖
• 輕量（約 3 kB）且重視隱私：不追蹤、不需帳號、不發送額外請求

DeBait 只需要存取 YouTube，並在網路層替換縮圖，因此標題黨圖片根本不會被下載。` },
};

// --- write _locales/<locale>/messages.json ---
let count = 0;
for (const [loc, v] of Object.entries(L)) {
  const dir = resolve(root, 'public/_locales', loc);
  mkdirSync(dir, { recursive: true });
  const msgs = {
    extName: { message: v.name, description: 'Extension name / store title (shown in browser and store).' },
    extDescription: { message: v.desc, description: 'Short description (manifest; Chrome caps at 132 chars).' },
  };
  writeFileSync(resolve(dir, 'messages.json'), JSON.stringify(msgs, null, 2) + '\n');
  count++;
}

// --- write docs/store-listings.md ---
const order = Object.keys(L);
let md = `# DeBait — store listings\n\n`;
md += `Localized title + full description for the Chrome Web Store and Firefox Add-ons\n`;
md += `dashboards. Short manifest strings (name + 132-char description) live in\n`;
md += `[../public/_locales](../public/_locales) and are generated from the same source\n`;
md += `([../scripts/gen-i18n.mjs](../scripts/gen-i18n.mjs)). Edit the script, then run\n`;
md += `\`node scripts/gen-i18n.mjs\` to regenerate both.\n\n`;
md += `> ${order.length} locales. Translations for less common locales are a starting\n`;
md += `> point — have a native speaker review before submission.\n\n`;
md += `---\n\n`;
for (const loc of order) {
  const v = L[loc];
  md += `## ${loc}\n\n`;
  md += `**Title**\n\n${v.name}\n\n`;
  md += `**Short description** (${v.desc.length} chars)\n\n${v.desc}\n\n`;
  md += `**Description**\n\n${v.long}\n\n`;
  md += `---\n\n`;
}
writeFileSync(resolve(root, 'docs/store-listings.md'), md);

console.log(`Wrote ${count} locales to public/_locales/ and docs/store-listings.md`);

// sanity: flag any short description over Chrome's 132-char limit
const tooLong = Object.entries(L).filter(([, v]) => v.desc.length > 132);
if (tooLong.length) {
  console.warn('WARNING: description >132 chars:', tooLong.map(([l, v]) => `${l}=${v.desc.length}`).join(', '));
} else {
  console.log('All short descriptions within 132-char limit.');
}
