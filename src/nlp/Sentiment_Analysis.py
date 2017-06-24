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

ToDo
There isn't data for doing the sentiment analysis, so for know we will work with dummy data
''' 
# for sentiment intensity classification
from nltk.corpus import subjectivity
from nltk.sentiment import SentimentAnalyzer
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.tokenize import word_tokenize
from nltk.sentiment.util import * 

# for time insights
from profilehooks import coverage, timecall

# for sentiment classification
import pandas as pd
import numpy as np
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cross_validation import train_test_split
from sklearn import naive_bayes
from sklearn.metrics import roc_auc_score

POSITIVE = list()
NEGATIVE = list()
BUZZWORDS = dict()

class Sentiment(object):
	"""docstring for Sentiment"""

	version = '0.0.1'
	def __init__(self, classifier, data):
		''' 
			In what format is the information passed:
			- json with metadata?
			- array with words?

			assume that data passed is in JSON, but
			for now we assume that the passed data is a String
			data = String()
		''' 
		self.text = data
		self.sentiment = self.sent_analysis(classifier, data)
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
	def sent_analysis(self, classifier, text):
		''' 
			This function will classify a piece of text, 
			based on the classifier that is passed 
			returns:
				- returns the class the text will be classified in according to the trained
				predictor
		'''
		text_array = np.array([text])
		text_vector = vectorizer.transform(text_array)
		return classifier.predict(text_vector)

	@timecall
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


# train the sentiment classifier
def train_sentiment_classifier(trainingtext):
	'''
		trains a naive bayes classifier to train on sentiment.
		parameters:
			- trainingtext(.csv/.txt), needs to be annotated
	'''
	df = pd.read_csv('training.txt', sep='\t', names=['liked', 'txt'])
	# vectorize words
	stopset = set(stopwords.words('english'))
	vectorizer = TfidfVectorizer(use_idf=True, lowercase=True, strip_accents='ascii', stop_words=stopset)
	# target
	y = df.liked
	# samples
	X = vectorizer.fit_transform(df.txt)
	# split dataset
	X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
	# train the naive bayes classifier
	clf = naive_bayes.MultinomialNB()
	clf.fit(X_train, y_train)
	return clf

