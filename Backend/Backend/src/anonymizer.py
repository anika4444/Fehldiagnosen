import sys
import json
from presidio_analyzer import AnalyzerEngine, PatternRecognizer, Pattern, RecognizerRegistry
from presidio_analyzer.nlp_engine import NlpEngineProvider
from presidio_anonymizer import AnonymizerEngine 
from presidio_anonymizer.entities import OperatorConfig

configuration = {
    "nlp_engine_name": "spacy",
    "models": [{"lang_code": "de", "model_name": "de_core_news_lg"}],
}
provider = NlpEngineProvider(nlp_configuration=configuration)
nlp_engine = provider.create_engine()

at_svnr_pattern = Pattern(name="at_svnr_pattern", regex=r"\b\d{4}[\s-]?\d{6}\b", score=0.95)
at_svnr_recognizer = PatternRecognizer(supported_entity="AT_SVNR", patterns=[at_svnr_pattern], supported_language="de")

date_pattern = Pattern(name="date_pattern", regex=r"\b\d{1,2}\.\s?\d{1,2}\.\s?\d{2,4}\b", score=0.95)
date_recognizer = PatternRecognizer(supported_entity="CUSTOM_DATE", patterns=[date_pattern], supported_language="de")

registry = RecognizerRegistry()
registry.load_predefined_recognizers(nlp_engine=nlp_engine, languages=["de"])
registry.add_recognizer(at_svnr_recognizer)
registry.add_recognizer(date_recognizer)

analyzer = AnalyzerEngine(nlp_engine=nlp_engine, registry=registry)
anonymizer = AnonymizerEngine()

input_text = sys.stdin.read()

if input_text.strip():
    analysis_results = analyzer.analyze(
        text=input_text, 
        language="de", 
        entities=["PERSON", "LOCATION", "ORGANIZATION", "AT_SVNR", "CUSTOM_DATE"]
    )
    
    mapping_table = {}
    counters = {}
    
    sorted_results = sorted(analysis_results, key=lambda x: x.start, reverse=True)
    anonymized_text = input_text
    
    for result in sorted_results:
        entity_type = result.entity_type
        original_value = input_text[result.start:result.end]
        
        counters[entity_type] = counters.get(entity_type, 0) + 1
        placeholder = f"[{entity_type}_{counters[entity_type]}]"
        
        mapping_table[placeholder] = original_value
        
        anonymized_text = anonymized_text[:result.start] + placeholder + anonymized_text[result.end:]

    output_data = {
        "anonymized_text": anonymized_text,
        "mapping": mapping_table
    }
    
    print(json.dumps(output_data, ensure_ascii=False), flush=True)