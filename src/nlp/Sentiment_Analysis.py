'''

Author: Giovanni Kastanja

Python: 3.6.0

Performing sentiment analysis on a piece of text
''' 

from nltk.corpus import subjectivity
from nltk.sentiment import SentimentAnalyzer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.sentiment.util import * 


# we get a piece of text, so we read it in

# then we tokenize the piece of text, 
# do some other preprocessing
