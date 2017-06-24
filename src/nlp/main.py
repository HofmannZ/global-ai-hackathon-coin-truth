'''

Author: Giovanni Kastanja

Python: 3.6.0
Date: 24/6/2017
'''
import pandas as pd
import numpy as np
from nltk.corpus import stopwords
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cross_validation import train_test_split
from sklearn import naive_bayes
from sklearn.metrics import confusion_matrix

TEXT_PATH = r'~/\My Projects\AI_hackathon\notebooks\posts_ccompare_raw.csv'
DATA_OUTPUT_PATH = r'~/\My Projects\AI_hackathon\notebooks\btc-ind.csv'

# C:\Users\Giovanni\My Projects\AI_hackathon\notebooks

# training a custom sentiment model on cryptochain data

# read in the data from the csv
text_body_df = pd.read_csv(TEXT_PATH, names=['text'])
data_output_df = pd.read_csv(DATA_OUTPUT_PATH, names=['BTC_pd_T0'])


# keep the body-feature of the csv
text_body_df = text_body_df['text'][:2504]


# match the dates of the posts to the dates of the output data

# create a stopset (words that occur to many times)
stopset = set(stopwords.words('english'))
vectorizer = TfidfVectorizer(use_idf=True, lowercase=True, strip_accents='ascii', stop_words=stopset)

X = vectorizer.fit_transform(text_body_df)

y = data_output_df['BTC_pd_T0']


# split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)


# train the naive bayes classifier
clf = naive_bayes.MultinomialNB()
clf.fit(X_train, y_train)

# get accuracy of the model
print(roc_auc_score(y_test, clf.predict_proba(X_test)[:,1]))

# train the 





















# save this to a new csv
# manually annotate this data in three ways
# positive, neutral, negative; positive means believes market goes up
# negative means market goes down, neutral means no comment on market direction

# there is a many to one relation between messages/post and the daily fluctiation  
