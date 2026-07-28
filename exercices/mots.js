/* =========================================================
   Les mots des exercices — FACILE À MODIFIER !
   =========================================================
   Pour ajouter un mot, copiez une ligne existante et changez :
     avant   : le début du mot (avant le trou)
     reponse : ce qu'il faut écrire dans le trou
     apres   : la fin du mot (après le trou)
   Le mot complet = avant + reponse + apres.
   Exemple : { avant: "cha", reponse: "m", apres: "bre" }  → chambre
   Enregistrez le fichier, rechargez la page : c'est tout !
   ========================================================= */

const MODULES = [
  {
    id: "nm",
    titre: "n ou m ?",
    emoji: "🐘",
    sousTitre: "La règle du m devant m, b, p",
    options: ["n", "m"],
    mots: [
      { avant: "cha",    reponse: "m", apres: "bre" },      // chambre
      { avant: "to",     reponse: "m", apres: "ber" },      // tomber
      { avant: "i",      reponse: "m", apres: "portant" },  // important
      { avant: "ti",     reponse: "m", apres: "bre" },      // timbre
      { avant: "po",     reponse: "m", apres: "pier" },     // pompier
      { avant: "ja",     reponse: "m", apres: "be" },       // jambe
      { avant: "déce",   reponse: "m", apres: "bre" },      // décembre
      { avant: "nove",   reponse: "m", apres: "bre" },      // novembre
      { avant: "o",      reponse: "m", apres: "bre" },      // ombre
      { avant: "la",     reponse: "m", apres: "pe" },       // lampe
      { avant: "va",     reponse: "m", apres: "pire" },     // vampire
      { avant: "tro",    reponse: "m", apres: "pette" },    // trompette
      { avant: "fra",    reponse: "m", apres: "boise" },    // framboise
      { avant: "co",     reponse: "m", apres: "prendre" },  // comprendre
      { avant: "e",      reponse: "m", apres: "mener" },    // emmener
      { avant: "ca",     reponse: "m", apres: "pagne" },    // campagne
      { avant: "gri",    reponse: "m", apres: "per" },      // grimper
      { avant: "ta",     reponse: "m", apres: "bour" },     // tambour
      { avant: "mo",     reponse: "n", apres: "tagne" },    // montagne
      { avant: "cha",    reponse: "n", apres: "son" },      // chanson
      { avant: "ora",    reponse: "n", apres: "ge" },       // orange
      { avant: "gra",    reponse: "n", apres: "dir" },      // grandir
      { avant: "dima",   reponse: "n", apres: "che" },      // dimanche
      { avant: "cha",    reponse: "n", apres: "ter" },      // chanter
      { avant: "mo",     reponse: "n", apres: "ter" },      // monter
      { avant: "pa",     reponse: "n", apres: "talon" },    // pantalon
      { avant: "e",      reponse: "n", apres: "fant" },     // enfant
      { avant: "me",     reponse: "n", apres: "ton" },      // menton
      { avant: "vaca",   reponse: "n", apres: "ces" },      // vacances
      { avant: "bra",    reponse: "n", apres: "che" },      // branche
      { avant: "pri",    reponse: "n", apres: "ce" },       // prince
      { avant: "mo",     reponse: "n", apres: "de" },       // monde
      { avant: "ve",     reponse: "n", apres: "dredi" },    // vendredi
      { avant: "si",     reponse: "n", apres: "ge" }        // singe
    ]
  },
  {
    id: "aiia",
    titre: "ai ou ia ?",
    emoji: "🎹",
    sousTitre: "On écrit les lettres dans l'ordre où on les entend",
    options: ["ai", "ia"],
    mots: [
      { avant: "m",     reponse: "ai", apres: "son" },   // maison
      { avant: "fr",    reponse: "ai", apres: "se" },    // fraise
      { avant: "ch",    reponse: "ai", apres: "se" },    // chaise
      { avant: "sem",   reponse: "ai", apres: "ne" },    // semaine
      { avant: "l",     reponse: "ai", apres: "ne" },    // laine
      { avant: "bal",   reponse: "ai", apres: "" },      // balai
      { avant: "pal",   reponse: "ai", apres: "s" },     // palais
      { avant: "r",     reponse: "ai", apres: "sin" },   // raisin
      { avant: "",      reponse: "ai", apres: "mer" },   // aimer
      { avant: "f",     reponse: "ai", apres: "re" },    // faire
      { avant: "l",     reponse: "ai", apres: "t" },     // lait
      { avant: "vr",    reponse: "ai", apres: "" },      // vrai
      { avant: "écl",   reponse: "ai", apres: "r" },     // éclair
      { avant: "p",     reponse: "ia", apres: "no" },    // piano
      { avant: "d",     reponse: "ia", apres: "mant" },  // diamant
      { avant: "d",     reponse: "ia", apres: "ble" },   // diable
      { avant: "gén",   reponse: "ia", apres: "l" },     // génial
      { avant: "spéc",  reponse: "ia", apres: "l" },     // spécial
      { avant: "av",    reponse: "ia", apres: "teur" },  // aviateur
      { avant: "p",     reponse: "ia", apres: "niste" }, // pianiste
      { avant: "d",     reponse: "ia", apres: "logue" }, // dialogue
      { avant: "f",     reponse: "ia", apres: "ble" },   // fiable
      { avant: "cav",   reponse: "ia", apres: "r" }      // caviar
    ]
  },
  {
    id: "ainian",
    titre: "ain ou ian ?",
    emoji: "🚂",
    sousTitre: "On écrit les lettres dans l'ordre où on les entend",
    options: ["ain", "ian"],
    mots: [
      { avant: "m",      reponse: "ain", apres: "" },     // main
      { avant: "p",      reponse: "ain", apres: "" },     // pain
      { avant: "b",      reponse: "ain", apres: "" },     // bain
      { avant: "tr",     reponse: "ain", apres: "" },     // train
      { avant: "dem",    reponse: "ain", apres: "" },     // demain
      { avant: "cop",    reponse: "ain", apres: "" },     // copain
      { avant: "gr",     reponse: "ain", apres: "" },     // grain
      { avant: "terr",   reponse: "ain", apres: "" },     // terrain
      { avant: "vil",    reponse: "ain", apres: "" },     // vilain
      { avant: "écriv",  reponse: "ain", apres: "" },     // écrivain
      { avant: "n",      reponse: "ain", apres: "" },     // nain
      { avant: "s",      reponse: "ain", apres: "t" },    // saint
      { avant: "v",      reponse: "ian", apres: "de" },   // viande
      { avant: "tr",     reponse: "ian", apres: "gle" },  // triangle
      { avant: "étud",   reponse: "ian", apres: "t" },    // étudiant
      { avant: "mend",   reponse: "ian", apres: "t" },    // mendiant
      { avant: "conf",   reponse: "ian", apres: "ce" },   // confiance
      { avant: "amb",    reponse: "ian", apres: "ce" },   // ambiance
      { avant: "pl",     reponse: "ian", apres: "t" },    // pliant
      { avant: "sour",   reponse: "ian", apres: "t" }     // souriant
    ]
  }
];
