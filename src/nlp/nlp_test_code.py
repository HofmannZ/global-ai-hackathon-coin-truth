from nltk import tokenize
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.sentiment.util import *
from Sentiment_Analysis import Sentiment


import pandas as pd
import numpy as np
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cross_validation import train_test_split
from sklearn import svm
from sklearn.model_selection import cross_val_score

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

# train the naive bayes classifier
svc = svm.SVC(kernel='linear', C=1.0, cache_size=1024)

scores = cross_val_score(svc, X_test, y_test, cv=5)
print(scores.mean(), scores.std() * 2)
