'''

Author: Giovanni Kastanja

Python: 3.6.0

Performing sentiment analysis on a piece of text


!Important!:
install nltk
in commandline use command: 'nltk.download' to download
	- vader, under the models ta

ToDo:
 - add learning for the sentiment analysis
''' 

from nltk.corpus import subjectivity
from nltk.sentiment import SentimentAnalyzer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize
from nltk.sentiment.util import * 

from profilehooks import coverage, timecall

POSITIVE = list()
NEGATIVE = list()
BUZZWORDS = dict()

class Sentiment(object):
	"""docstring for Sentiment"""

	version = '0.0.1'
	def __init__(self, data):
		''' 
			In what format is the information passed:
			- json with metadata?
			- array with words?

			assume that data passed is in JSON, but
			for now we assume that the passed data is a String
			data = String()
		''' 
		self.text = data
		self.sentiment = self.sent_analysis(data)
		self.sentiment_intensity = self.sentiment_intensity_analysis(data)

	# then we tokenize the piece of text, 
	@timecall
	def _tokenize_text(self, text):
		return word_tokenize(text)

	# do some preprocessing on the text
	def _preprocessing(self):
		# remove punctuation
		# remove capital letters
		# word_error handling?
		pass

	# do the sentiment analysis
	@timecall
	def sent_analysis(self, text):
		return None

	def sentiment_intensity_analysis(self, text):
		''' 
			Calculates the intensity of the text passed as argument
			parameters:
				text (String), a string of the text we want to analyze
			returns:
				sentiment_intensity (dict), a dict contaning the different intensity-scores of the text
		''' 
		sid = SentimentIntensityAnalyzer()
		sentiment_intensity = sid.polarity_scores(text)
		return sentiment_intensity

	def __repr__(self):
		return """ 
				Sentiment_obj: text:{} sentiment:{} sentiment intensity:{}
				""".format(self.text, self.sentiment, self.sentiment_intensity)
	# return the dominant sentiment of the piece of text




