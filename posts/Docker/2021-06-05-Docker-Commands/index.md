---
title: "도커 명령어"
date: "2021-06-05"
categories: [Docker]
notice: false
pinned: false
---

**디스크 사용량 확인 명령어**
```shell
$ docker system df
```

**Container 또는 Image의 세부정보 확인 명령어**
```shell
$ docker inspect [Image Name || Container Name]
```

**도커파일 빌드 명령어**
```shell
$ docker build [Options] [Dockerfile Path]
```

|Option|Description|
| :-: | :- |
| -t | **Dockerfile**로 빌드될 이미지의 이름을 설정 |
| -f | 빌드할 **Dockerfile**명을 지정, 미지정시 기본적으로 **Dockerfile**이라는 이름을 검색하여 가져옴. |
| --pull | **true/false**를 입력, 기존의 이미지를 가져와 사용하지않고 새로운 이미지를 다운받아 사용한다.

<br/>

## Docker Hub Commands

**Docker Hub계정으로 로그인하는 명령어**
```shell 
$ docker login 
```

**Docker Hub계정을 로그아웃하는 명령어**
```shell 
$ docker logout
```

<br/>

## Docker Image Commands

**Image 검색 명령어**
```shell 
$ docker search [Image Name]:[Tag]
# Tag 생략시 기본적으로 latest 태그가 적용됨.

$ docker search --limit=3 [Image]
# image가 많을 때 개수를 제한할 수 있음
```

**Image 다운로드 명령어**
```shell 
$ docker pull [Image Name]:[Tag]
# 검색 명령어와 마찬가지로 Tag를 생략할 수 있다.
```

**Image 삭제 명령어**
```shell 
$ docker rmi [Image Name:Tag || Repository Name]
$ docker image rm [Image Name:Tag || Repository Name]

$ docker rmi $(docker images -q)
# 모든 image를 삭제하는 명령어

$ docker image prune
# 실행중인 Container가 없는 Image 삭제
```

**Image 목록 명령어**
```shell 
$ docker images
$ docker image -q

$ docker image ls
$ docker image ls -q

# -q 옵션을 추가하면 image id만 출력한다.
```

**Image 히스토리 확인 명령어**
```shell
$ docker history [Image Name]:[Tag]
```

<br/>

## Docker Container Commands

**Container 생성 명령어**
```shell 
$ docker create [Image Name]:[Tag]
$ docker create --name [Container Name] [Image Name]:[Tag]
# --name 옵션을 생략하면 container name이 자동으로 지정된다.
```

**Container 삭제 명령어**
```shell
$ docker rm [Container Id || Container Name]

$ docker rm $(docker ps -a -q)
# 모든 container를 삭제하는 명령어
```

**Container 목록 명령어**
```shell
$ docker ps
$ docker ps -q
# 현재 실행중인 container 정보를 보여준다.

$ docker ps -a
$ docker ps -a -q
# 중지, 종료된 container를 포함하여 보여준다.

# -q 옵션을 추가하면 container id만 출력한다.
```

**Container 실행 명령어**
```shell
$ docker start [Container Id || Container Name]
# 별도의 옵션을 지정하지 않으면 실행시 바로 종료됨.

$ docker restart [Container Id || Container Name]
# 종료된 container를 재실행한다.
```

**Container 생성과 실행을 같이 하는 명령어**
```shell
$ docker run [Image Name]:[Tag]
# 별도의 옵션을 지정하지 않으면 실행시 바로 종료됨.

$ docker run -it [Image Name]:[Tag]
# container에 가상터미널을 통해 입력할 수 있다.

$ docker run -it --name [Container Name] [Image Name]:[Tag]
# container에 이름을 지정한다.

$ docker run -it -d [Image Name]:[Tag]
# container를 백그라운드로 실행한다.

$ docker run -it -p [Host Port]:[Container Port] [Image Name]:[Tag]
# container의 port 와 Host의 port를 포트포워딩한다.

$ docker run -it -d -v [Host Path]:[Container Path]
# host의 path를 container의 path에 바인딩한다.

# 위의 조합말고도 아래의 옵션들을 조합하여 다양하게 사용할 수 있다.
```
##### docker run Options
|Option|Description|
| :-: | :- |
| -i | 컨테이너 입력을 열어놓는 옵션 |
| -t | 컨테이너에 가상 터미널을 할당하는 옵션 |
| --name | 컨테이너 이름을 지정하는 옵션 |
| -d | 컨테이너를 백그라운드로 실행하는 옵션 |
| --rm | 컨테이너 종료시 컨테이너를 자동 삭제하는 옵션 |
| -p | 호스트와 컨테이너의 포트를 연결하는 옵션 |
| -v | 호스트의 경로를 컨테이너의 디렉토리에 연결하는 옵션 |
| --link | 컨테이너와 컨테이너를 연결하는 옵션 |

**Container 종료 명령어**
```shell
$ docker stop [Container Id || Container Name]
# start, restart 명령어로 종료된 container를 다시 실행할 수 있다.

$ docker stop $(docker ps -a -q)
# 모든 container를 종료하는 명령어

$ docker container prune
# 정지된 container 삭제 명령어
```

**Container 일시정지 명령어**
```shell
$ docker pause [Container Id || Container Name]
# unpause 명령어로 일시정지한 container를 다시 실행할 수 있다.
```

**실행중인 Container 리소스 확인 명령어**
```shell
$ docker container stats
```

**실행중인 Container에 명령실행 명령어**
```shell
$ docker execute [Container Id || Container Name] [Command] [Args]
```

**실행중인 Container에 접속 명령어**
```shell
$ docker attach [Container Id || Container Name]
```

**Container의 특정파일을 가져오거나 꺼내오는 명령어**
```shell
$ docker cp [Host Path]:[Container Path]
# Container의 특정파일을 호스트 PC의 특정경로에 복사한다.

$ docker cp [Container Path]:[Host Path]
# 호스트 PC의 특정파일을 Container의 특정경로에 복사한다.
```

**Container를 Image로 변환하는 명령어**
```shell
$ docker commit [Options] [Container Id || Container Name] [Image Name]:[Image Tag]
```

**Container 변경내역 확인 명령어**
```shell
$ docker diff [Conatiner Name]
```

**Container 출력 확인 명령어**
```shell
$ docker logs [Container Name]
```

<br/>

--- 

<br/>

이글의 내용은 이후 수정될 수 있습니다.