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
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import cross_val_score

from scipy.sparse import csr_matrix

TEXT_PATH = r'~/\My Projects\AI_hackathon\notebooks\posts_ccompare_raw.csv'
DATA_OUTPUT_PATH = r'~/\My Projects\AI_hackathon\notebooks\btc-ind.csv'

# read in the data from the csv
cc = pd.read_csv(TEXT_PATH, index_col=0)
targets = pd.read_csv(DATA_OUTPUT_PATH)

# extract the timestamps
cc['Timestamp'] = pd.to_datetime(cc['Timestamp'])

# get the date from the bitcoin data
targets['date'] = pd.to_datetime(targets['Date'])
targets = targets.set_index('date')
del targets['Date']

# join data by date
join_by_date = pd.DataFrame(index=cc.index)
join_by_date['date'] = cc.Timestamp.dt.round(freq="d")


text = cc['Body']

features_date = pd.DataFrame(index=cc.index)
features_date['t_week'] = cc.Timestamp.dt.week
features_date['t_dow'] = cc.Timestamp.dt.dayofweek
features_date['t_hour'] = cc.Timestamp.dt.hour
features_date['t_day'] = cc.Timestamp.dt.day

Y_all = join_by_date.join(targets, on='date').dropna()
groups = Y_all['date']
del Y_all['date']
cols = Y_all.columns
index = Y_all.index
Y_all = Y_all - Y_all.mean()
Y_all = Y_all/Y_all.std()

# match the dates of the posts to the dates of the output data

# create a stopset (words that occur to many times)
stopset = set(stopwords.words('english'))
vectorizer = TfidfVectorizer(use_idf=True, lowercase=True, strip_accents='ascii', stop_words=stopset)

X = vectorizer.fit_transform(text)

features = pd.concat([features_date, pd.DataFrame(X.toarray())], axis=1)
X_all = features.ix[Y_all.index]

reg = RandomForestRegressor(n_estimators=10, max_depth=2, criterion='mse')

target_scores = {}
for indicator in targets.columns:
	Y =Y_all[indicator]    
	scores = cross_val_score(reg, X_all, Y, cv=5, groups=groups, scoring='neg_mean_squared_error')
	target_scores[indicator] = scores

cv_score = pd.DataFrame(target_scores)
cv_score.to_csv('cv_output.csv')

