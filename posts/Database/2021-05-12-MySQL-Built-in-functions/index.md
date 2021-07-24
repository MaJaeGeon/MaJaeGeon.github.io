---
title: "MySQL 내장 함수"
date: "2021-05-12"
categories: [Database]
notice: false
pinned: false
---

함수의 파라미터값은 편의를 위해 아래와 같이 표기한다.  

```sql
-- 필수 파라미터 : R:파라미터
-- 옵션 파라미터 : O:파라미터
SELECT ABS(R:number)
SELECT LOG(O:base, R:number)
SELECT MOD(R:X, O:Y)
```

<br/>

## 숫자 관련 함수

-   `ABS` : 절대값을 출력한다.  
    ```sql
    SELECT ABS(R:number);
    /*
    number : 5000  -> 5000
    number : -6000 -> 6000
    */
    ```

    <br/>

-   `CEIL` : 값과 같거나 값보다 큰 근사값을 반환한다.
    ```sql
    SELECT CEIL(R:number);
    /*
    number : 151   -> 151
    number : 15.1  -> 16
    */
    ```

    <br/>

-   `COS` : 값의 코사인값을 반환한다.  
    ```sql
    SELECT COS(R:number);
    /*
    number : 15        -> -0.7596879128588213
    number : 3.14159   -> -0.9999999999964793
    */
    ```

    <br/>

-   `FLOOR` : 값과 같거나 값보다 작은 근사값을 반환한다.  
    ```sql
    SELECT FLOOR(R:number);
    /*
    number : 25.1  -> 25
    number : 15.7  -> 15
    */
    ```

    <br/>

-   `LOG` : 값의 LOG값을 반환한다.  
    ```sql
    SELECT LOG(R:number);
    SELECT LOG(O:base, R:number); -- base는 1보다 값이어야한다.
    /*
    number : 2               -> 0.6931471805599453
    number : 10, base : 100  -> 2
    */
    ```

    <br/>

-   `MOD` : X를 Y로 나눈값을 반환한다.  
    ```sql
    SELECT MOD(R:X, R:Y);
    /*
    X : 18.4, Y : 4 -> 2.4
    X : 11, Y : 4   -> 3
    */
    ```

    <br/>

-   `POWER` : X에 대한 Y거듭제곱값을 반환한다.  
    ```sql
    SELECT POWER(R:X, R:Y);
    /*
    X : 4, Y : 2    -> 16
    X : 3, Y : 2    -> 9
    */
    ```

    <br/>

-   `ROUND` : 값에대한 반올림값을 반환한다.  
    ```sql
    SELECT ROUND(R:number, O:decimals);
    /*
    number : 15.7                   -> 15
    number : 12.1234, decimals : 2  -> 12.12
    */
    ```

    <br/>

-   `SIGN` : 값에대한 사인값을 반환한다.  
    ```sql
    SELECT SIGN(R:number);
    /*
    number : 135.1   -> 1
    number : -15     -> -1
    */
    ```

    <br/>

-   `TRUNC` : 숫자1의 소수점을 숫자2의 자릿수만큼 자른다.  
    ```sql
    SELECT TRUNC(R:X, R:Y);
    /*
    X : 1.375, Y : 2    -> 1.37
    X : 3.12, Y : 0     -> 3
    */
    ```

<br/>

## 문자 관련 함수

-   `CONCAT` : 두 개 이상의 표현을 연결한다.  
    ```sql
    SELECT CONCAT(R:expression, ...);
    /*
    expression1 : HAPPY, expression2 : Birthday -> HAPPYBirthday
    */
    ```

    <br/>

-   `LOWER` : 대문자를 소문자로 변환한다.  
    ```sql
    SELECT LOWER(R:text);
    /*
    text : Birthday -> birthday
    */
    ```

    <br/>

-   `UPPER` : 소문자를 대문자로 변환한다.  
    ```sql
    SELECT UPPER(R:text);
    /*
    text : Birthday -> BIRTHDAY
    */
    ```

    <br/>

-   `LPAD` : string이 length길이만큼 되도록 좌측을 lpad_string으로 채운다.  
    ```sql
    SELECT CONCAT(R:string, R:length, R:lpad_string);
    /*
    string : Page 1, length : 15, lpad_string : *.  -> *.*.*.*.*Page 1
    */
    ```

    <br/>

-   `RPAD` : string이 length길이만큼 되도록 우측을 rpad_string으로 채운다.  
    ```sql
    SELECT CONCAT(R:string, R:length, R:rpad_string);
    /*
    string : Page 1, length : 15, rpad_string : *.  -> Page 1*********
    */
    ```

    <br/>

-   `REPLACE` : string에서 from_string을 new_string으로 대체한다.    
    ```sql
    SELECT REPLACE(R:string, R:from_string, R:new_string);
    /*
    string : JACK, from_string : J, new_string : BL -> BLACK
    */
    ```

    <br/>

-   `SUBSTR` : string에서 start번째부터 length 만큼 추출한다.     
    ```sql
    SELECT SUBSTR(R:string, R:start, O:length);
    /*
    string : ABCDEFG, start : 3, length : 4 -> CDEF
    */
    ```

    <br/>

-   `TRIM` : 문자열의 좌우 공백을 제거한다.  
    ```sql
    SELECT CONCAT(R:text);
    /*
    text : "    TRIM    "   -> TRIM
    */
    ```

    <br/>

-   `ASCII` : 특정문자의 아스키값을 반환한다.  
    ```sql
    SELECT ASCII(R:character);
    /*
    character : A    -> 65
    */
    ```

    <br/>

-   `LENGTH` : 문자열의 길이를 반환한다.
    ```sql
    SELECT LENGTH(R:text);
    /*
    text : Birthday -> 8
    */
    ```
    
<br/>

## 날짜 관련 함수

-   `ADDDATE` : 날짜에 특정 날짜를 더한 값을 반환한다.  
    ```sql
    SELECT ADDDATE(R:date, R:value);
    /*
    date : 2019-02-14, value : INTERVAL 10 DAY  -> 2019-02-24
    */
    ```

    <br/>

-   `LAST_DAY` : 특정달의 마지막 일을 반환한다.  
    ```sql
    SELECT LAST_DAY(R:date);
    /*
    date : 2021-05-12   -> 2020-05-31
    */
    ```

    <br/>

-   `NOW` : 현재시간을 반환한다.
    ```sql
    SELECT NOW();
    /*
    -> 2021-05-12 08:52:28
    */
    ```

    <br/>

-   `DATE_FORMAT` : 지정된 날짜를 형식화한다.  
    ```sql
    SELECT DATE_FORMAT(date, format);
    /*
    date : 2021, format : %Y    -> 2021
    */
    ```

    <br/>

-   `DATE_FORMAT` : 문자열을 지정된 형식에 따라 날짜로 변환한다.  
    ```sql
    SELECT DATE_FORMAT(string, format);
    /*
    string : 12 05 2014, format : %d  %m %Y -> 2014-05-12
    */
    ```

<br/>

이외에도 다양한 함수를 알고싶다면 [W3Schools 레퍼런스](https://www.w3schools.com/mysql/mysql_ref_functions.asp)를 참고하면된다.