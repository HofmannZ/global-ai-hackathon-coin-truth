'''

Author: Giovanni Kastanja

Python: 3.6.0

Performing sentiment analysis on a piece of text
''' 

from nltk.corpus import subjectivity
from nltk.sentiment import SentimentAnalyzer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.sentiment.util import * 

from profilehooks import coverage, timecall

print(nltk.sentiment.vader.NEGATE)

class Sentiment(object):
	"""docstring for Sentiment"""
	def __init__(self, data):
		''' 
			In what format is the information passed:
			- json with metadata?
			- array with words?
		''' 

		self.sentiment = self.sent_analysis(data)

	# we get a piece of text, so we read it in
	def _read_in_text(self):
		''' 
			In what format is the text passed?
		'''
		pass

	# then we tokenize the piece of text, 
	def _tokenize_text(self):
		pass

	# do some preprocessing on the text
	def _preprocessing(self):
		pass

	# do the sentiment analysis
	@timecall
	def sent_analysis(self):
		return None

	def __repr__(self):
		return """ 
				Sentiment_obj: text:{} sentiment:{} sentiment intensity:{}
				""".format(self.text, self.sentiment, self.sentiment_intensity)
	# return the dominant sentiment of the piece of text




