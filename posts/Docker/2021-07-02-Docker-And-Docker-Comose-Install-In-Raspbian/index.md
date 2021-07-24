---
title: "라즈비안에 도커와 도커 컴포즈 설치하기"
date: "2021-07-02"
categories: [Docker]
notice: false
pinned: false
thumbnail: "https://pbs.twimg.com/media/E1oMV3QVgAIr1NT?format=jpg&name=large"
---

이 글에서는 라즈비안 운영체제에 도커와 도커 컴포즈를 설치해 본다.  

### 도커 설치하기

도커는 일반적으로 레포지토리를 사용한 방식으로 설치된다.  
하지만 라즈비안의 경우 아직 레포지토리를 사용한 방식이 지원되지 않아 편의 스크립트를 사용한 방식으로 설치해야된다.  
또한 `docker`를 사용하기 위해선 `root` 또는 `sudo`권한이 필요하다.

<br/>

1.  전체 패키지를 업데이트한다.
```bash
apt-get update
```

<br/>

2.  `curl`을 통해 [get.docker.com](https://get.docker.com)에서 스크립트를 다운로드한다.
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
```

<br/>

3.  다운받은 스크립트파일을 실행하여 Docker의 최신 릴리즈를 설치한다.
```bash
sh get-docker.sh
```

<br/>

4.  `sudo` 없이 `docker` 명령어를 사용하기위해 현재 사용자의 아이디를 **docker** 그룹에 포함시킨다.
```bash
sudo usermod -aG docker ${USER}
```

5.	도커를 부팅시 자동으로 시작하려면 아래의 명령어를 사용한다.

```bash
sudo systemctl enable docker
sudo systemctl start docker
```

<br/>

### 도커 컴포즈 설치하기
도커 컴포즈를 설치하는 방법은 두가지를 안내한다.  
나의 경우 첫번째 방법은 AWS EC2 ubuntu 환경에서 정상적으로 작동했지만 라즈비안에서는 작동하지않았다.  
두번째 방법은 내가 라즈비안에 설치하고 작동을 확인한 방법이다.


#### 첫번째 방법.
1.  도커 컴포즈의 릴리즈를 다운로드한다.  
	다른버전을 설치하고 싶은 경우 `1.29.2`를 사용하려하는 컴포즈의 버전으로 변경한다.
```bash
sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

<br/>

2.  설치한 도커 컴포즈에 실행권한을 부여한다.
```bash
sudo chmod +x /usr/local/bin/docker-compose
```

<br/>

3.	`/usr/bin`경로에 docker-compose 심볼릭 링크가 없다면 생성한다.
```bash
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

<br/>

4.	도커 컴포즈 버전 확인하기
```bash
docker-compose --version
```

<br/>

#### 두번째 방법.

1.  `python3-pip`패키지와 `libffi-dev`패키지를 설치한다.
```bash
sudo apt-get install -y python3-pip libffi-dev
```

<br/>

2.	도커 컴포즈를 설치한다.
```bash
sudo pip3 install docker-compose
```

<br/>

3.	도커 컴포즈 버전 확인하기
```bash
docker-compose --version
```