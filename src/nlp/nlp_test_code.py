from nltk import tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.sentiment.util import *
from Sentiment_Analysis import Sentiment


test_sentence_pos = "The market definitely is going up tomorrow, I'm sure of it"

test_sentence_neg = "I didn't like this horrible movie at all. It was bad"

sentiment_obj = Sentiment(test_sentence_neg)

print(sentiment_obj)