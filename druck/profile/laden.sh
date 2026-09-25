#!/bin/sh
# Lädt die ECI-Profile, die Flyeralarm vorgibt (Checkliste zur Druckdatenerstellung):
#   ISO Coated v2 300 % (ECI) – Visitenkarten und alle Nicht-Werbetechnik-Produkte
#   ISO Coated v2 (ECI)       – Werbetechnik und Plakate im Digitaldruck (Schild)
# Die Profile gehören der ECI (eci.org) und liegen nicht im Repo.
set -e
cd "$(dirname "$0")"
curl -sSfL -o eci_offset_2009.zip "https://www.eci.org/lib/exe/eci_offset_2009.zip"
unzip -o -j -q eci_offset_2009.zip '*ISOcoated_v2_eci.icc' '*ISOcoated_v2_300_eci.icc'
rm -f eci_offset_2009.zip
ls -l *.icc
