# -*- coding: utf-8 -*-
import scrapy


class BitcointalkSpider(scrapy.Spider):
    name = 'bitcointalk'
    allowed_domains = ['bitcointalk.org']
    start_urls = [
        'https://bitcointalk.org/index.php?board=1.0',
    ]

    def parse(self, response):
        topics = response.css('div.tborder table.bordercolor')[-1]

        if topics.css('table span a::attr(href)') is not None:
            for link in topics.css('span a::attr(href)'):
                url = link.extract()
                yield scrapy.Request(url, callback=self.parseTopic)

        prevnext = response.css('td#toppages span.prevnext')[-1]
        linkContent = prevnext.css('a::text').extract_first()
        link = prevnext.css('a::attr(href)')

        print(linkContent)

        if linkContent == '»':
            url = link.extract_first()

            yield scrapy.Request(url, callback=self.parse)

    def parseTopic(self, response):
        for post in response.css('form#quickModForm tr:first-of-type'):

            yield {
                'author': post.css('td.poster_info b a::text').extract_first(),
                'messageNumber': post.css('a.message_number::text').extract_first(),
                'title': post.css('div.subject a::text').extract_first(),
                'date': post.css('td.td_headerandpost div.smalltext::text').extract_first(),
                'text': post.css('div.post::text').extract(),
            }

        prevnext = response.css('td.middletext span.prevnext')
        linkContent = prevnext.css('a::text').extract_first()
        link = prevnext.css('a::attr(href)')

        print(linkContent)

        if linkContent == '»':
            url = link.extract_first()

            yield scrapy.Request(url, callback=self.parseTopic)
