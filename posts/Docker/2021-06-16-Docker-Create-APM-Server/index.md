---
title: "도커 APM 서버 구축하기"
date: "2021-06-16"
categories: [Docker]
notice: false
pinned: false
---

```bash
mkdir APM
nano ./APM/index.php
```

```php
<?php phpinfo(); ?>
```

```bash
nano Dockerfile-apache2
```

```dockerfile
FROM httpd:2.4
COPY ./public-html/ /usr/local/apache2/htdocs/
```

```bash
docker build -t apache2 -f Dockerfile-apache2 .
```