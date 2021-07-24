---
title: "리눅스 파일 권한"
date: "2021-06-04"
categories: [Linux]
notice: false
pinned: false
---

리눅스의 파일 권한은 `read`, `write`, `execute` 로 세 가지가 있다.  
- `read (r)` : 파일을 읽을 수 있는 권한
- `write (w)` : 파일을 쓰기, 수정, 삭제할 수 있는 권한
- `execute (x)` : 파일을 실행할 수 있는 권한

```shell
drwxr-xr-x 4 ubuntu ubuntu 4096 Jun  3 13:28 .
drwxr-xr-x 3 root   root   4096 Jun  2 12:34 ..
-rw------- 1 ubuntu ubuntu    9 Jun  2 14:28 .bash_history
-rw-r--r-- 1 ubuntu ubuntu  220 Feb 25  2020 .bash_logout
-rw-r--r-- 1 ubuntu ubuntu 3771 Feb 25  2020 .bashrc
drwx------ 2 ubuntu ubuntu 4096 Jun  2 13:05 .cache
-rw-r--r-- 1 ubuntu ubuntu  807 Feb 25  2020 .profile
drwx------ 2 ubuntu ubuntu 4096 Jun  2 12:34 .ssh
-rw-r--r-- 1 ubuntu ubuntu    0 Jun  3 12:47 .sudo_as_admin_successful
-rw------- 1 ubuntu ubuntu  881 Jun  3 12:56 .viminfo
```

위에서 **-rw-------** 와 같은 부분들이 권한을 나타내는곳으로 총 10개의 문자로 구성되며 4개의 그룹으로 나누어져 있다.  

<br/>

<table>
  <tr>
    <th>-</th>
    <th>-</th>
    <th>-</th>
    <th>-</th>
    <th>-</th>
    <th>-</th>
    <th>-</th>
    <th>-</th>
    <th>-</th>
    <th>-</th>
  </tr>
  <tr>
    <td>타입</td>
    <td colspan="3">주인 권한</td>
    <td colspan="3">그룹 권한</td>
    <td colspan="3">일반 권한</td>
  </tr>
</table>

<br/>

제일 첫번째 문자는 각 파일의 타입을 나타낸다.
- `-` : File
- `d` : Directory
- `l` : Link

뒤의 문자 9개는 3개씩 한 그룹으로 파일에 대한 권한을 나타낸다.  
- 소유자의 권한
- 소유자가 속한 그룹의 권한
- 전체 사용자의 권한

예를 들어 **drw-rw-r--** 권한을 가진 파일은 디렉토리이며,  
소유자와 소유자가 속한 그룹은 읽기, 쓰기만 할 수 있고,  
전체 사용자는 읽기만 할수 있다.  

<br/>

파일에 권한을 주기 위해선 `chmod` 명령어를 사용해야한다. 
아래의 명령어는 **a.txt** 파일에 **777** 권한을 부여한다. 
```shell
chmod 777 a.txt
```
<br/>

<table style="text-align:center">
    <tr>
        <th colspan="3">주인</th>
        <th colspan="3">그룹</th>
        <th colspan="3">일반</th>
    </tr>
    <tr>
        <td>r</td>
        <td>w</td>
        <td>x</td>
        <td>r</td>
        <td>w</td>
        <td>x</td>
        <td>r</td>
        <td>w</td>
        <td>x</td>
    </tr>
    <tr>
        <td>2<sup>2</sup></td>
        <td>2<sup>1</sup></td>
        <td>2<sup>0</sup></td>
        <td>2<sup>2</sup></td>
        <td>2<sup>1</sup></td>
        <td>2<sup>0</sup></td>
        <td>2<sup>2</sup></td>
        <td>2<sup>1</sup></td>
        <td>2<sup>0</sup></td>
    </tr>
    <tr>
        <td>4</td>
        <td>2</td>
        <td>1</td>
        <td>4</td>
        <td>2</td>
        <td>1</td>
        <td>4</td>
        <td>2</td>
        <td>1</td>
    </tr>
    <tr>
    <td colspan="3">7</td>
    <td colspan="3">7</td>
    <td colspan="3">7</td>
  </tr>
</table>

위의 표를 참고하면 **rw-rw-r--** 권한은 **664** 가 된다.