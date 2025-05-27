# api/translate.py
from transformers import MarianMTModel, MarianTokenizer
import json

def handler(request):
    try:
        body = request.get_json()
        text = body["text"]
        src = body["src"]
        tgt = body["tgt"]

        model_name = f"Helsinki-NLP/opus-mt-{src}-{tgt}"
        tokenizer = MarianTokenizer.from_pretrained(model_name)
        model = MarianMTModel.from_pretrained(model_name)

        inputs = tokenizer(text, return_tensors="pt", padding=True, truncation=True)
        translated = model.generate(**inputs)
        translated_text = tokenizer.decode(translated[0], skip_special_tokens=True)

        return {
            "statusCode": 200,
            "headers": {"Content-Type": "application/json"},
            "body": json.dumps({"translated_text": translated_text})
        }

    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": str(e)})
        }
