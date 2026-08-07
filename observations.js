/*
 * ============================================================
 * GrammatikLupe
 * observations.js
 *
 * Zentrales Vokabular aller sprachlichen Beobachtungen.
 *
 * Wichtig:
 * - Hier werden KEINE Diagnosen formuliert.
 * - Hier werden KEINE Fehler bewertet.
 * - Hier werden nur Beobachtungstypen definiert.
 *
 * Datenfluss:
 *
 * Text
 *   ↓
 * Parser / Regelmodule
 *   ↓
 * OBSERVATIONS
 *   ↓
 * Hex-Graph / Learning Topics
 *   ↓
 * Lernempfehlung
 * ============================================================
 */

const OBS = Object.freeze({

  /*
   * ==========================================================
   * 1. GRUNDELEMENTE
   * ==========================================================
   */

  WORD_FOUND:
    "WORD_FOUND",

  SENTENCE_FOUND:
    "SENTENCE_FOUND",

  COMMA_FOUND:
    "COMMA_FOUND",

  QUESTION_FOUND:
    "QUESTION_FOUND",


  /*
   * ==========================================================
   * 2. WORTARTEN
   * ==========================================================
   */

  ARTICLE_FOUND:
    "ARTICLE_FOUND",

  NOUN_FOUND:
    "NOUN_FOUND",

  ADJECTIVE_FOUND:
    "ADJECTIVE_FOUND",

  PRONOUN_FOUND:
    "PRONOUN_FOUND",

  VERB_FOUND:
    "VERB_FOUND",

  FINITE_VERB_FOUND:
    "FINITE_VERB_FOUND",

  PREPOSITION_FOUND:
    "PREPOSITION_FOUND",

  CONJUNCTION_FOUND:
    "CONJUNCTION_FOUND",


  /*
   * ==========================================================
   * 3. NOMINALGRUPPEN
   * ==========================================================
   */

  ARTICLE_NOUN_PATTERN:
    "ARTICLE_NOUN_PATTERN",

  ADJECTIVE_NOUN_PATTERN:
    "ADJECTIVE_NOUN_PATTERN",

  ARTICLE_ADJECTIVE_NOUN_PATTERN:
    "ARTICLE_ADJECTIVE_NOUN_PATTERN",


  /*
   * ==========================================================
   * 4. PRÄPOSITIONALGRUPPEN
   * ==========================================================
   */

  PREPOSITION_ARTICLE_PATTERN:
    "PREPOSITION_ARTICLE_PATTERN",

  PREPOSITION_NOUN_PATTERN:
    "PREPOSITION_NOUN_PATTERN",

  PREPOSITION_ARTICLE_NOUN_PATTERN:
    "PREPOSITION_ARTICLE_NOUN_PATTERN",


  /*
   * ==========================================================
   * 5. PRÄPOSITIONEN MIT FESTEM KASUS
   * ==========================================================
   */

  FIXED_DATIVE_PREPOSITION_FOUND:
    "FIXED_DATIVE_PREPOSITION_FOUND",

  FIXED_DATIVE_PREPOSITION_UNCERTAIN:
    "FIXED_DATIVE_PREPOSITION_UNCERTAIN",

  FIXED_ACCUSATIVE_PREPOSITION_FOUND:
    "FIXED_ACCUSATIVE_PREPOSITION_FOUND",

  FIXED_ACCUSATIVE_PREPOSITION_UNCERTAIN:
    "FIXED_ACCUSATIVE_PREPOSITION_UNCERTAIN",

  FIXED_GENITIVE_PREPOSITION_FOUND:
    "FIXED_GENITIVE_PREPOSITION_FOUND",

  FIXED_GENITIVE_PREPOSITION_UNCERTAIN:
    "FIXED_GENITIVE_PREPOSITION_UNCERTAIN",


  /*
   * ==========================================================
   * 6. WECHSELPRÄPOSITIONEN
   * ==========================================================
   */

  TWO_WAY_PREPOSITION_FOUND:
    "TWO_WAY_PREPOSITION_FOUND",

  TWO_WAY_PREPOSITION_LOCATION:
    "TWO_WAY_PREPOSITION_LOCATION",

  TWO_WAY_PREPOSITION_DIRECTION:
    "TWO_WAY_PREPOSITION_DIRECTION",

  TWO_WAY_LOCATION_UNCERTAIN:
    "TWO_WAY_LOCATION_UNCERTAIN",

  TWO_WAY_DIRECTION_UNCERTAIN:
    "TWO_WAY_DIRECTION_UNCERTAIN",


  /*
   * ==========================================================
   * 7. TEMPORALE PRÄPOSITIONEN
   * ==========================================================
   */

  TEMPORAL_PREPOSITION_FOUND:
    "TEMPORAL_PREPOSITION_FOUND",

  TEMPORAL_DURATION_FOUND:
    "TEMPORAL_DURATION_FOUND",

  TEMPORAL_PERIOD_FOUND:
    "TEMPORAL_PERIOD_FOUND",

  TEMPORAL_POINT_FOUND:
    "TEMPORAL_POINT_FOUND",

  TEMPORAL_DURATION_UNCERTAIN:
    "TEMPORAL_DURATION_UNCERTAIN",

  TEMPORAL_PERIOD_UNCERTAIN:
    "TEMPORAL_PERIOD_UNCERTAIN",

  TEMPORAL_POINT_UNCERTAIN:
    "TEMPORAL_POINT_UNCERTAIN",


  /*
   * ==========================================================
   * 8. LOKALE PRÄPOSITIONEN
   * ==========================================================
   */

  LOCAL_PREPOSITION_FOUND:
    "LOCAL_PREPOSITION_FOUND",

  LOCAL_LOCATION_FOUND:
    "LOCAL_LOCATION_FOUND",

  LOCAL_DIRECTION_FOUND:
    "LOCAL_DIRECTION_FOUND",

  LOCAL_ORIGIN_FOUND:
    "LOCAL_ORIGIN_FOUND",

  LOCAL_PREPOSITION_UNCERTAIN:
    "LOCAL_PREPOSITION_UNCERTAIN",


  /*
   * ==========================================================
   * 9. KAUSALE PRÄPOSITIONEN
   * ==========================================================
   */

  CAUSAL_PREPOSITION_FOUND:
    "CAUSAL_PREPOSITION_FOUND",

  CAUSAL_PREPOSITION_UNCERTAIN:
    "CAUSAL_PREPOSITION_UNCERTAIN",


  /*
   * ==========================================================
   * 10. MODALE PRÄPOSITIONEN
   * ==========================================================
   */

  MODAL_PREPOSITION_FOUND:
    "MODAL_PREPOSITION_FOUND",

  MODAL_PREPOSITION_UNCERTAIN:
    "MODAL_PREPOSITION_UNCERTAIN",


  /*
   * ==========================================================
   * 11. FINALE PRÄPOSITIONEN
   * ==========================================================
   */

  FINAL_PREPOSITION_FOUND:
    "FINAL_PREPOSITION_FOUND",

  FINAL_PREPOSITION_UNCERTAIN:
    "FINAL_PREPOSITION_UNCERTAIN",


  /*
   * ==========================================================
   * 12. VERB + PRÄPOSITION
   * ==========================================================
   */

  VERB_PREPOSITION_PATTERN:
    "VERB_PREPOSITION_PATTERN",

  VERB_PREPOSITION_UNCERTAIN:
    "VERB_PREPOSITION_UNCERTAIN",


  /*
   * ==========================================================
   * 13. ADJEKTIV + PRÄPOSITION
   * ==========================================================
   */

  ADJECTIVE_PREPOSITION_PATTERN:
    "ADJECTIVE_PREPOSITION_PATTERN",

  ADJECTIVE_PREPOSITION_UNCERTAIN:
    "ADJECTIVE_PREPOSITION_UNCERTAIN",


  /*
   * ==========================================================
   * 14. PRÄPOSITIONALPRONOMEN
   * ==========================================================
   */

  PREPOSITIONAL_PRONOUN_FOUND:
    "PREPOSITIONAL_PRONOUN_FOUND",

  PREPOSITIONAL_PRONOUN_UNCERTAIN:
    "PREPOSITIONAL_PRONOUN_UNCERTAIN",


  /*
   * ==========================================================
   * 15. VERBALE MUSTER
   * ==========================================================
   */

  MODAL_VERB_PATTERN:
    "MODAL_VERB_PATTERN",

  PERFECT_PATTERN:
    "PERFECT_PATTERN",

  SEPARABLE_VERB_PATTERN:
    "SEPARABLE_VERB_PATTERN",

  PASSIVE_PATTERN:
    "PASSIVE_PATTERN",

  INFINITIVE_ZU_PATTERN:
    "INFINITIVE_ZU_PATTERN",


  /*
   * ==========================================================
   * 16. SATZSTRUKTUR
   * ==========================================================
   */

  MAIN_CLAUSE_FOUND:
    "MAIN_CLAUSE_FOUND",

  SUBORDINATE_CLAUSE_FOUND:
    "SUBORDINATE_CLAUSE_FOUND",

  SUBORDINATING_CONJUNCTION_FOUND:
    "SUBORDINATING_CONJUNCTION_FOUND",

  RELATIVE_CLAUSE_PATTERN:
    "RELATIVE_CLAUSE_PATTERN",

  VERB_SECOND_OBSERVED:
    "VERB_SECOND_OBSERVED",

  VERB_FINAL_OBSERVED:
    "VERB_FINAL_OBSERVED",

  SENTENCE_BRACKET_OBSERVED:
    "SENTENCE_BRACKET_OBSERVED",


  /*
   * ==========================================================
   * 17. SATZSTRUKTUR – UNSICHERHEITEN
   * ==========================================================
   */

  MAIN_CLAUSE_VERB_POSITION_UNCERTAIN:
    "MAIN_CLAUSE_VERB_POSITION_UNCERTAIN",

  SUBORDINATE_VERB_POSITION_UNCERTAIN:
    "SUBORDINATE_VERB_POSITION_UNCERTAIN",

  SENTENCE_BRACKET_UNCERTAIN:
    "SENTENCE_BRACKET_UNCERTAIN",

  RELATIVE_CLAUSE_UNCERTAIN:
    "RELATIVE_CLAUSE_UNCERTAIN",

  INFINITIVE_ZU_UNCERTAIN:
    "INFINITIVE_ZU_UNCERTAIN",


  /*
   * ==========================================================
   * 18. NOMINALMORPHOLOGIE
   *
   * Noch nicht aktiv, aber vorbereitet.
   * ==========================================================
   */

  GENUS_PATTERN_FOUND:
    "GENUS_PATTERN_FOUND",

  GENUS_UNCERTAIN:
    "GENUS_UNCERTAIN",

  ARTICLE_CASE_UNCERTAIN:
    "ARTICLE_CASE_UNCERTAIN",

  ARTICLE_GENUS_UNCERTAIN:
    "ARTICLE_GENUS_UNCERTAIN",

  ADJECTIVE_DECLENSION_UNCERTAIN:
    "ADJECTIVE_DECLENSION_UNCERTAIN",

  PLURAL_FORM_UNCERTAIN:
    "PLURAL_FORM_UNCERTAIN",

  N_DECLENSION_UNCERTAIN:
    "N_DECLENSION_UNCERTAIN",


  /*
   * ==========================================================
   * 19. POSITIVE EVIDENZ
   *
   * Diese Observationen werden später wichtig:
   * GrammatikLupe soll nicht nur Unsicherheiten sammeln,
   * sondern auch korrekt verwendete Strukturen berücksichtigen.
   * ==========================================================
   */

  FIXED_DATIVE_PREPOSITION_SECURE:
    "FIXED_DATIVE_PREPOSITION_SECURE",

  FIXED_ACCUSATIVE_PREPOSITION_SECURE:
    "FIXED_ACCUSATIVE_PREPOSITION_SECURE",

  TWO_WAY_LOCATION_SECURE:
    "TWO_WAY_LOCATION_SECURE",

  TWO_WAY_DIRECTION_SECURE:
    "TWO_WAY_DIRECTION_SECURE",

  TEMPORAL_DURATION_SECURE:
    "TEMPORAL_DURATION_SECURE",

  TEMPORAL_PERIOD_SECURE:
    "TEMPORAL_PERIOD_SECURE",

  VERB_SECOND_SECURE:
    "VERB_SECOND_SECURE",

  SUBORDINATE_VERB_POSITION_SECURE:
    "SUBORDINATE_VERB_POSITION_SECURE",

  SENTENCE_BRACKET_SECURE:
    "SENTENCE_BRACKET_SECURE"
});