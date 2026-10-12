# Homeric Code

Ιστοσελίδα της **Homeric Code** — σχεδιασμός, κατασκευή και διαχείριση ιστοσελίδων και web εφαρμογών. Χίος, Ελλάδα.

Static site (HTML/CSS/JS, χωρίς build step), δίγλωσσο (ΕΛ/EN).

## Δομή

```
index.html      Περιεχόμενο (ελληνικά ως προεπιλογή)
styles.css      Στυλ
script.js       Μεταφράσεις EN, μενού κινητού, animations, φόρμα επικοινωνίας
logo.svg Λογότυπο / favicon
```

## Τοπική προβολή

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Δημοσίευση (GitHub Pages)

Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.

## Επεξεργασία κειμένων

- Ελληνικά: απευθείας στο `index.html`.
- Αγγλικά: στο αντικείμενο `en` μέσα στο `script.js` (ίδια κλειδιά με τα `data-i18n`).

Η φόρμα επικοινωνίας ανοίγει την εφαρμογή email του επισκέπτη (mailto) προς `homericcode@gmail.com`, ώστε να μη χρειάζεται backend.
