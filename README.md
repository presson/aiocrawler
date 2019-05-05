<div align="left">
<img src="https://github.com/kylin1020/aiocrawler/blob/master/logo.png" height="128" width="128" >
 </div>

![version](https://img.shields.io/badge/version-v1.20-green.svg)
![support](https://img.shields.io/badge/python-3.6%20%7C%203.7-blue.svg)
![license](https://img.shields.io/badge/license-MIT-yellow.svg)

#### Aiocrawler is an asynchronous, distributed crawler framework, based on redis, asyncio, aiohttp.
**Different from scrapy, Aiocrawler starts with a series of words,
generates urls based on words and starts crawling instead of
start_urls**

![image](https://github.com/kylin1020/aiocrawler-demo/blob/master/credit.gif)


- [中文文档][doc_cn] | [documentation][doc_en]
- ### Installation
```bash
pip3 install aiocrawler
```
You can also install by this way
```bash
python3 setup.py install
```

- ### start project
```bash
aiocrawler startproject demo
```
**This will create a demo directory with the following contents**
```
+-- demo/
|    +-- items.py
|    +-- middlewares.py
|    +-- run.py
|    +-- settings.py
|    +-- spiders.py
```
**This is the code for your first Spider**
```python
# coding: utf-8
from aiocrawler import BaseSettings, Spider, Request


class DemoSpider(Spider):
    name = "demo"

    def __init__(self, settings: BaseSettings):
        Spider.__init__(self, settings)

    def make_request(self, word):
        return Request(word, callback=self.parse)

    def parse(self, response):
        pass
```
**Configure your settings**
```python
# coding: utf-8
from aiocrawler import BaseSettings
from demo.middlewares import DemoMiddleware


class DemoSettings(BaseSettings):
    PROJECT_NAME = 'demo'

    """
    If you use the redis server as the scheduler, the REDIS_URL must be configured.
    """
    REDIS_URL = 'redis://user:password@redis_address:port'
    REDIS_PROJECT_NAME = 'demo'

    CONCURRENT_REQUESTS = 32
    CONCURRENT_WORDS = 32
    DEFAULT_TIMEOUT = 20
    DEFAULT_HEADERS = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN',
    }

    DOWNLOAD_DALEY = 0
    PROCESS_DALEY = 0.01
    DOWNLOADER_MIDDLEWARES = [
        (DemoMiddleware, 300),

    ]
```
**Configure your items** 
```python
from aiocrawler import Item, Field


class DemoItem(Item):
    """
    you can define your Item like this, just like scrapy Item:
    name = Field()
    website = Field()
    """
    item_name = "demo"
    pass
```
### run the project
```bash
aiocrawler run demo
```
### Export the Item from the redis server to a local csv file or remote mongo sever
```bash
aiocrawler output demo
```
**If you configure MONGO_HOST in your settings or the Environmental variables, it will be exported to mongo sever by default.**
```python
from aiocrawler import BaseSettings
from demo.middlewares import DemoMiddleware


class DemoSettings(BaseSettings):
    PROJECT_NAME = 'demo'
    
    # other information...
    MONGO_HOST = 'your mongo sever address'
    MONGO_PORT = 27017
    MONGO_USER = "mongo username"
    MONGO_PASSWORD = "mongo password"
    MONGO_DB = None # If you configure MONGO_HOST in your settings or the Environmental variables, it will be exported to mongo sever by default.    

```
**You can also specify the file name and the output type.**
```bash
aiocrawler output demo --filename data.csv --type csv
```
**Export to a remote mongo server**
```bash
aiocrawler output demo --type mongo
```
[doc_cn]: #
[doc_en]: #

