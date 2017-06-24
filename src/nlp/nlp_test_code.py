from nltk import tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.sentiment.util import *
from Sentiment_Analysis import Sentiment


import pandas as pd
import numpy as np
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cross_validation import train_test_split
from sklearn import naive_bayes
from sklearn.metrics import roc_auc_score

df = pd.read_csv('training.txt', sep='\t', names=['liked', 'txt'])
# vectorize words
stopset = set(stopwords.words('english'))
vectorizer = TfidfVectorizer(use_idf=True, lowercase=True, strip_accents='ascii', stop_words=stopset)

# target
y = df.liked

# smaples
X = vectorizer.fit_transform(df.txt)

# split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
print(X_train)
print(y_test)

# train the naive bayes classifier
clf = naive_bayes.MultinomialNB()
clf.fit(X_train, y_train)

# get accuracy of the model
print(roc_auc_score(y_test, clf.predict_proba(X_test)[:,1]))

# try to predict a new entry/text/reviews

movie_review_array = np.array([' Juptier ascending was a dissapointing and terrible movie'])

movie_review_vector = vectorizer.transform(movie_review_array)

# should output 0, beacuse this is a bad review
print(clf.predict(movie_review_vector))
