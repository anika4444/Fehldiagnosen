import sys
import json
import re
from presidio_analyzer import AnalyzerEngine, PatternRecognizer, Pattern, RecognizerRegistry
from presidio_analyzer.nlp_engine import NlpEngineProvider

configuration = {
    "nlp_engine_name": "spacy",
    "models": [{"lang_code": "de", "model_name": "de_core_news_lg"}],
}
provider = NlpEngineProvider(nlp_configuration=configuration)
nlp_engine = provider.create_engine()

address_regex = r"\b(?:[A-ZÄÖÜ][a-zäöüßA-Z0-aligned]*?(?:straße|strasse|weg|gasse|platz|markt|allee|ring|pfad|dorfstrasse)\b\s+\d+[a-zA-Z]?(?:[-\s/]+\d+)?)[,\s]+(?:\b\d{4,5}\b)\s+[A-ZÄÖÜ][a-zäöüß]+\b"
address_pattern = Pattern(name="address_pattern", regex=address_regex, score=1.0)
address_recognizer = PatternRecognizer(supported_entity="FULL_ADDRESS", patterns=[address_pattern], supported_language="de")

patient_regex = r"(?:An\s+Frau|Patient|Herrn|Herr|Name)[:\s-]+([A-ZÄÖÜ][a-zäöüß]+\s+[A-ZÄÖÜ][a-zäöüß]+)"
patient_pattern = Pattern(name="patient_pattern", regex=patient_regex, score=0.95)
patient_recognizer = PatternRecognizer(supported_entity="PATIENT_NAME", patterns=[patient_pattern], supported_language="de")

at_svnr_regex = r"(?i)(?:sv[-_\s]?nr|sozialversicherung|sv)[:\s-]*(\b\d{4}[\s-]?\d{6}\b)"
at_svnr_pattern = Pattern(name="at_svnr_pattern", regex=at_svnr_regex, score=0.95)
at_svnr_recognizer = PatternRecognizer(supported_entity="AT_SVNR", patterns=[at_svnr_pattern], supported_language="de")

date_regex = r"\b\d{1,2}\.\s?\d{1,2}\.\s?\d{2,4}\b"
date_pattern = Pattern(name="date_pattern", regex=date_regex, score=0.95)
date_recognizer = PatternRecognizer(supported_entity="CUSTOM_DATE", patterns=[date_pattern], supported_language="de")

registry = RecognizerRegistry()
registry.load_predefined_recognizers(nlp_engine=nlp_engine, languages=["de"])
registry.add_recognizer(address_recognizer)
registry.add_recognizer(patient_recognizer)
registry.add_recognizer(at_svnr_recognizer)
registry.add_recognizer(date_recognizer)

analyzer = AnalyzerEngine(nlp_engine=nlp_engine, registry=registry)

raw_input = sys.stdin.read()
input_text = raw_input.encode('utf-8', 'surrogateescape').decode('utf-8', 'ignore')

if input_text.strip():
    analysis_results = analyzer.analyze(
        text=input_text, 
        language="de", 
        entities=["PERSON", "LOCATION", "AT_SVNR", "CUSTOM_DATE", "FULL_ADDRESS", "PATIENT_NAME"],
        score_threshold=0.80  
    )

    sorted_analysis = sorted(analysis_results, key=lambda x: (x.start, -(x.end - x.start)))
    filtered_results = []
    last_end = -1

    for result in sorted_analysis:
        if result.start < last_end:
            continue
            
        entity_text = input_text[result.start:result.end].strip()
        entity_text_lower = entity_text.lower()

        if result.entity_type == "PERSON":
            if any(ext in entity_text_lower for ext in ["therapie", "befund", "status", "kurve", "wert", "level", "abklärung", "sitzung", "funktion"]):
                continue
            if " " not in entity_text and len(entity_text) > 10 and not entity_text.isupper():
                continue
            if entity_text.isupper() and len(entity_text) <= 5:
                continue

        if result.entity_type == "LOCATION":
            if "strasse" not in entity_text_lower and "markt" not in entity_text_lower and "dorf" not in entity_text_lower:
                if any(ext in entity_text_lower for ext in ["bewegung", "ebene", "gelenk", "muskel", "status", "verlagerung"]):
                    continue
                if len(entity_text.split()) > 1:
                    continue

        filtered_results.append(result)
        last_end = result.end

    mapping_table = {}
    counters = {}
    sorted_results = sorted(filtered_results, key=lambda x: x.start, reverse=True)
    anonymized_text = input_text
    
    for result in sorted_results:
        entity_type = result.entity_type
        original_value = input_text[result.start:result.end].strip()
        
        if entity_type == "PATIENT_NAME":
            original_value = re.sub(r"^(An\s+Frau|Patient|Herrn|Herr|Name)[:\s-]+", "", original_value, flags=re.IGNORECASE)
            entity_type = "PERSON"
            
        if entity_type == "AT_SVNR":
            just_numbers = re.search(r"\d{4}[\s-]?\d{6}", original_value)
            if just_numbers:
                original_value = just_numbers.group(0)

        display_type = "LOCATION" if entity_type == "FULL_ADDRESS" else entity_type
        
        existing_placeholder = None
        for placeholder, mapped_value in mapping_table.items():
            if display_type == "PERSON":
                if original_value in mapped_value or mapped_value in original_value:
                    existing_placeholder = placeholder
                    if len(original_value) > len(mapped_value):
                        mapping_table[placeholder] = original_value
                    break
            elif mapped_value == original_value:
                existing_placeholder = placeholder
                break
        
        if existing_placeholder:
            placeholder = existing_placeholder
        else:
            counters[display_type] = counters.get(display_type, 0) + 1
            placeholder = f"[{display_type}_{counters[display_type]}]"
            mapping_table[placeholder] = original_value
        
        anonymized_text = anonymized_text[:result.start] + placeholder + anonymized_text[result.end:]

    output_data = {
        "anonymized_text": anonymized_text,
        "mapping": mapping_table
    }
    print(json.dumps(output_data, ensure_ascii=False), flush=True)