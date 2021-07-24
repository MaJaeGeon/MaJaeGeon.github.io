---
title: "Dockerfile 명령어"
date: "2021-06-06"
categories: [Docker]
notice: false
pinned: false
---

**Dockerfile**은 이미지의 청사진이라 할 수 있다.  
즉, Dockerfile 문법에 맞게 명령문을 작성하고, 이 파일을 빌드하여  
우리가 원하는 이미지를 생성해 낼 수 있다.  

Dockerfile은 명령과 인자로 구성되며, 보통 명령은 대문자로 작성한다.  
`#`을 사용하면 해당줄은 주석처리된다.  

<br/>

## 명령어
주요 명령들을 설명한다.  

> 일부 명령어들이 제공하는 명령어 형식들 중 **exec** 형식의 명령어는 
> **JSON array**로 구분되기 때문에 반드시 쌍따옴표(*"*)만 사용할 수 있다.


### FROM
`FROM`은 우리가 만들 이미지의 베이스 이미지를 지정하는 명령어이다.
```dockerfile
FROM <Image Name>:<Image Tag>

FROM ubuntu:latest
```


### RUN 
`RUN`은 이미지가 빌드될 때 `shell`에서 실행되는 명령어로, 쉘 명령을 실행한다.  
주로 `shell` 명령어를 사용하여 새로운 이미지 레이어를 만드는 역할을 한다.
```dockerfile
# RUN 명령어는 두가지 형식를 제공한다.  

# shell
RUN <Command>
RUN apt-get install nano

# exec
RUN ["Command", "Param 1", "Param N.."]
RUN ["apt-get", "install", "nano"]
```


### CMD
`CMD`명령어는 컨테이너가 실행될 때 실행되는 명령어로,  
**Dockerfile**에서 하나만 사용할 수 있다.  
만약 `CMD`가 여러개가 있다면 가장 마지막에 `CMD`만 실행된다.  

`CMD`의 주된 목적은 컨테이너에 기본값을 제공하는 것이다.  
예를 들어 실행중인 작업이 없는 컨테이너는 종료되기 때문에  
`CMD`를 사용하여 `bin/bash`같은 프로그램들을 실행한다.  

```dockerfile
# CMD 명령어는 세 가지 형식를 제공한다.

# shell : 이 형식을 사용하면 <Command>는 /bin/sh -c 에서 실행된다.
CMD <Command> <Param 1> <Param N..>
CMD /bin/bash

# exec : 권장되는 형식이다.
CMD ["Executable", "Param 1", "Param N.."]
CMD ["/bin/bash"]
```

`CMD`의 형식들 중 마지막 형식은 *exec*형식에서 *Executable*을 생략한 형식으로,  
`ENTRYPOINT` 명령어의 파라미터로 사용된다.  
이 형식을 사용할 경우 `ENTRYPOINT`명령어도 지정해 주어야한다.  

> CMD 와 RUN 은 비슷한 부분이 많지만 RUN 은 이미지가 빌드될 때 실행되어 
> 결과를 이미지에 저장하지만, CMD는 빌드될 때는 아무것도 하지않으며 
> 오직 컨테이너가 실행될 때에만 명령어가 실행된다.  


### LABEL
`LABEL`명령어는 이미지에 대한 메타데이터를 작성하기위한 명령어이다.  
키와 값이 한쌍으로 사용된다.  
```dockerfile
LABEL <key>=<value> <key>=<value> <key>=<value> ...
LABEL version=0.1
```


## EXPOSE
`EXPOSE`명령어는 컨테이너가 특정 포트를 열어두었음을 *Docker*에게 알려준다.  
포트가 TCP/UDP 중 어떤 방식으로 데이터를 송수신할 지 지정할 수 있으며  
이 프로토콜을 지정하지 않으면 기본값인 TCP가 적용된다.  
```dockerfile
EXPOSE <Port>/<Protocol>
EXPOSE 80
EXPOSE 8080/udp
```

> EXPOSE 명령어는 실제 서버의 포트를 여는것이 아닌,
> 컨테이너의 포트를 열어두는 것이다.


## ENV
`ENV`명령어는 컨테이너 내부에서 사용될 환경변수를 지정한다.  
```dockerfile
ENV <key>=<value> ...
ENV MY_NAME="MaJaeGeon"
```


## COPY
**Dockerfile**의 경로를 기준으로 특정경로의 파일들을 이미지 내부의 경로에 복사한다.
```shell
COPY [Specific Path] [Image Inner Path]
```

## ADD
`COPY`명령어와 같은 작업을 수행하지만 동일한 이름의  
파일이나 디렉토리를 덮어쓰기하지 않음
```shell
COPY [Specific Path] [Image Inner Path]
```

## ENTRYPOINT
**Container** 실행시 반드시 실행되어야할 명령어를 입력한다.
예를들어 DB서버의 경우 DB를 실행하는 명령어가 입력된다.  
```shell
ENTRYPOINT ["Command", "Param 1", "Param N.."]
```


## VOLUME
**Container** 내부의 Volume 대상을 지정한다.
```shell
VOLUME ["Volume 1", "Volume 2", "Volume N.."]
```

## USER
명령을 실행할 사용자 계정을 지정한다.
```shell
USER [User Name]
```

## WORKDIR
`RUN`, `CMD`, `ENTRYPOINT` 명령이 실행될 경로를 지정한다.
```shell
WORKDIR [Path]
```

<br/>

--- 

<br/>

이 명령어들 외에도 다른 명령어들이 있으며  
명령어들의 자세한 설명은 [Dockerfile Reference](https://docs.docker.com/engine/reference/builder/)를 참고하면된다. 