# -*- coding: utf-8 -*-
import scrapy


class BitcointalkSpider(scrapy.Spider):
    name = 'bitcointalk'
    allowed_domains = ['bitcointalk.org']
    start_urls = [
        'https://bitcointalk.org/index.php?board=1.0',
    ]

    firstBoardPage = True
    firstTopicPage = True

    def parse(self, response):
        topics = response.css('div.tborder table.bordercolor')[-1]

        self.firstTopicPage = True

        if topics.css('table span a::attr(href)') is not None:
            for link in topics.css('span a::attr(href)'):
                url = link.extract()
                yield scrapy.Request(url, callback=self.parseTopic)

        link = response.css('td#toppages span.prevnext a::attr(href)')

        if (len(link) > 1) or self.firstBoardPage:
            url = link[0 if self.firstBoardPage else 1].extract()

            if self.firstBoardPage:
                self.firstBoardPage = False

            yield scrapy.Request(url, callback=self.parse)

    def parseTopic(self, response):
        for post in response.css('form#quickModForm tr'):

            yield {
                'author': post.css('td.poster_info b a::text').extract_first(),
                'messageNumber': post.css('a.message_number::text').extract_first(),
                'title': post.css('div.subject a::text').extract_first(),
                'date': post.css('td.td_headerandpost div.smalltext::text').extract_first(),
                'text': post.css('div.post::text').extract(),
            }

        link = response.css('td.middletext span.prevnext a::attr(href)')

        if (len(link) > 1) or self.firstTopicPage:
            url = link[0 if self.firstTopicPage else 1].extract()

            if self.firstTopicPage:
                self.firstTopicPage = False

            yield scrapy.Request(url, callback=self.parseTopic)
