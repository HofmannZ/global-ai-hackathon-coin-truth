# -*- coding: utf-8 -*-
import scrapy


class BitcointalkSpider(scrapy.Spider):
    name = 'bitcointalk'
    allowed_domains = ['bitcointalk.org']
    start_urls = [
        # 'https://bitcointalk.org/index.php?board=1.0',
        'https://bitcointalk.org/index.php?topic=1972053.0',
        'https://bitcointalk.org/index.php?topic=1784753.0',
    ]

    def parse(self, response):
        for post in response.css('form#quickModForm tr'):

            yield {
                'author': post.css('td.poster_info b a::text').extract_first(),
                'messageNumber': post.css('a.message_number::text').extract_first(),
                'title': post.css('div.subject a::text').extract_first(),
                'date': post.css('td.td_headerandpost div.smalltext::text').extract_first(),
                'text': post.css('div.post::text').extract(),
            }
