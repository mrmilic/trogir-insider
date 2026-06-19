#!/bin/bash
# ============================================================
# Visit Trogir / Trogir Insider – Bilder-Download-Skript
# ============================================================
# Lädt alle aktuell verwendeten Platzhalter-Fotos (Unsplash,
# lizenzfrei für kommerzielle Nutzung) in den Ordner images/
# herunter. Die HTML-Dateien verweisen bereits lokal auf
# images/<dateiname>.jpg – nach dem Ausführen funktioniert
# alles ohne externe Abhängigkeit zu Unsplash.
#
# Verwendung:
#   chmod +x download-images.sh
#   ./download-images.sh
#
# Voraussetzung: curl muss installiert sein (ist es auf
# macOS/Linux standardmäßig; auf Windows ggf. Git Bash nutzen).
# ============================================================

set -e
mkdir -p images
cd images

echo "Lade Bilder herunter..."

# Format: "Dateiname|Unsplash-Foto-ID|Breite"
IMAGES="
restaurant-dish.jpg|1414235077428-338989a2e8c0|1600
boat-tour.jpg|1530841344095-c8eb47fb2c25|1600
hotel-infinity-pool.jpg|1534612899740-55c821a90129|1200
sea-water.jpg|1545403842-6b8149e2759e|1200
old-town-cathedral.jpg|1555990793-da11153b2473|1600
beach.jpg|1559827260-dc66d52bef19|1600
coastal-view.jpg|1565008447742-97f6f38c985c|1600
restaurant-table.jpg|1569623803819-2db1d5cf8f16|1200
seafood-bowl.jpg|1571167366136-b57e07761625|1200
pool-trees.jpg|1586739807089-5f978d168cfa|1200
hotel-exterior.jpg|1601581875309-fafbf2d3ed3a|1600
food-table.jpg|1650435489945-96b2b19b943b|1200
apartment-pool.jpg|1661098716612-eb2e12fbf601|1200
indoor-pool.jpg|1678960591129-ff8db00462e2|1200
blue-lagoon.jpg|1695173849152-c506198aaf90|1200
wine-and-food.jpg|1703849103523-e89b24b70ef0|1200
hotel-pool-loungers.jpg|1716667282993-cd8f2bffb91f|1200
food-plate.jpg|1717158499326-bb38255fd353|1200
aerial-pool-forest.jpg|1731080647259-879ee314af81|1200
resort-pool.jpg|1731080647266-85cf1bc27162|1200
wooden-dock.jpg|1731080647322-f9cf691d40ab|1200
"

count=0
total=$(echo "$IMAGES" | grep -c "|")

while IFS='|' read -r filename photo_id width; do
  [ -z "$filename" ] && continue
  count=$((count + 1))
  echo "[$count/$total] $filename"
  curl -sL "https://images.unsplash.com/photo-${photo_id}?w=${width}&q=80&fm=jpg&fit=crop" -o "$filename"
done <<< "$IMAGES"

echo ""
echo "Fertig! $count Bilder liegen jetzt in images/"
echo ""
echo "Hinweis: Diese Fotos sind Platzhalter (Unsplash-Lizenz, kostenlos"
echo "für kommerzielle Nutzung, keine Attribution nötig). Ersetze sie nach"
echo "und nach durch echte Fotos deiner Partner (Hotels, Restaurants,"
echo "Bootsverleiher) für mehr Authentizität."
