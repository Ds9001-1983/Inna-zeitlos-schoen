// ERZEUGT von farben-berechnen.py – nicht von Hand ändern.
// Hex aus docs/design-plan.md, CMYK in Prozent je Flyeralarm-Profil (relativ farbmetrisch, Tiefenkompensierung).
// tinteText = Separation von Tinte für kleine Schrift, reines K (keine neue Markenfarbe).
export const farbtabelle = {
  "quelle": "docs/design-plan.md",
  "profile": {
    "isoCoatedV2": {
      "datei": "ISOcoated_v2_eci.icc",
      "farben": {
        "leinen": {
          "hex": "#F6F3EE",
          "cmyk": [
            4,
            4,
            7,
            0
          ],
          "summe": 15,
          "lab": [
            96.5,
            0,
            3
          ]
        },
        "sand": {
          "hex": "#D8C8B5",
          "cmyk": [
            16,
            20,
            29,
            3
          ],
          "summe": 68,
          "lab": [
            81.6,
            4,
            11
          ]
        },
        "greige": {
          "hex": "#B4ABA1",
          "cmyk": [
            29,
            27,
            32,
            9
          ],
          "summe": 97,
          "lab": [
            71.0,
            2,
            6
          ]
        },
        "kupfer": {
          "hex": "#A56A43",
          "cmyk": [
            22,
            55,
            71,
            26
          ],
          "summe": 174,
          "lab": [
            52.2,
            21,
            29
          ]
        },
        "kupferTief": {
          "hex": "#8F5A38",
          "cmyk": [
            28,
            58,
            74,
            35
          ],
          "summe": 195,
          "lab": [
            45.5,
            18,
            26
          ]
        },
        "kupferDunkel": {
          "hex": "#6E4429",
          "cmyk": [
            36,
            64,
            78,
            50
          ],
          "summe": 228,
          "lab": [
            36.1,
            15,
            20
          ]
        },
        "kupferHell": {
          "hex": "#C98A5E",
          "cmyk": [
            14,
            47,
            63,
            11
          ],
          "summe": 135,
          "lab": [
            64.3,
            21,
            33
          ]
        },
        "tinte": {
          "hex": "#2F2F2F",
          "cmyk": [
            71,
            61,
            58,
            67
          ],
          "summe": 257,
          "lab": [
            24.3,
            0,
            0
          ]
        },
        "tinteText": {
          "hex": "#2F2F2F",
          "cmyk": [
            0,
            0,
            0,
            94
          ],
          "summe": 94,
          "lab": [
            24.3,
            0,
            0
          ],
          "hinweis": "reines K, L* 24.3 gegen L* 24.3 der vierfarbigen Tinte"
        }
      }
    },
    "isoCoatedV2_300": {
      "datei": "ISOcoated_v2_300_eci.icc",
      "farben": {
        "leinen": {
          "hex": "#F6F3EE",
          "cmyk": [
            4,
            4,
            7,
            0
          ],
          "summe": 15,
          "lab": [
            96.5,
            0,
            3
          ]
        },
        "sand": {
          "hex": "#D8C8B5",
          "cmyk": [
            15,
            19,
            28,
            4
          ],
          "summe": 66,
          "lab": [
            82.4,
            3,
            11
          ]
        },
        "greige": {
          "hex": "#B4ABA1",
          "cmyk": [
            28,
            26,
            31,
            11
          ],
          "summe": 96,
          "lab": [
            71.0,
            2,
            6
          ]
        },
        "kupfer": {
          "hex": "#A56A43",
          "cmyk": [
            20,
            53,
            70,
            28
          ],
          "summe": 171,
          "lab": [
            52.5,
            20,
            29
          ]
        },
        "kupferTief": {
          "hex": "#8F5A38",
          "cmyk": [
            24,
            56,
            72,
            38
          ],
          "summe": 190,
          "lab": [
            45.9,
            18,
            26
          ]
        },
        "kupferDunkel": {
          "hex": "#6E4429",
          "cmyk": [
            31,
            60,
            74,
            54
          ],
          "summe": 219,
          "lab": [
            36.1,
            14,
            20
          ]
        },
        "kupferHell": {
          "hex": "#C98A5E",
          "cmyk": [
            13,
            47,
            62,
            13
          ],
          "summe": 135,
          "lab": [
            63.9,
            21,
            32
          ]
        },
        "tinte": {
          "hex": "#2F2F2F",
          "cmyk": [
            65,
            55,
            52,
            71
          ],
          "summe": 243,
          "lab": [
            24.7,
            0,
            0
          ]
        },
        "tinteText": {
          "hex": "#2F2F2F",
          "cmyk": [
            0,
            0,
            0,
            94
          ],
          "summe": 94,
          "lab": [
            24.3,
            0,
            0
          ],
          "hinweis": "reines K, L* 24.3 gegen L* 24.7 der vierfarbigen Tinte"
        }
      }
    }
  }
}
