---
title: "CSS Flex"
date: "2021-05-14"
categories: [Web]
notice: false
pinned: false
---

## Flex 컨테이너 속성


### Display
아이템들을 어떻게 보여줄지를 결정한다.  

#### flex
컨테이너에 `flex` 속성을 적용한다.    

```css
display: flex;
```

![flex](./display-flex.png)

#### inline-flex
컨테이너에 `inline-flex`속성을 적용한다.  

```css
display: inline-flex;
```

![inline-flex](./display-inline-flex.png)

<br/>

### Flex-Direction
아이템들의 배치방향을 설정하는 속성이다.  

#### row
아이템들이 좌측에서 우측 가로 방향으로 배치되며 기본값이다.  

```css
flex-direction: row;
```

![flex-direction-row](./direction-row.png)

#### row-reverse
아이템들이 우측에서 좌측 가로 방향으로 배치된다.  

```css
flex-direction: row-reverse;
```

![flex-direction-row-reverse](./direction-row-reverse.png)

#### column
아이템들이 위쪽에서 아래쪽 방향으로 배치된다.  

```css
flex-direction: column;
```

![flex-direction-column](./direction-column.png)

#### column-reverse
아이템들이 아래쪽에서 위쪽 방향으로 배치된다.  

```css
flex-direction: column-reverse;
```

![flex-direction-column-reverse](./direction-column-reverse.png)

<br/>

### Flex-Wrap
아이템들의 줄바꿈을 결정하는 속성이다.  

#### nowrap
아이템들이 줄바꿈을 하지 않으며 기본값이다.  

```css
flex-wrap: nowrap;
```

![flex-wrap-nowrap](./wrap-nowrap.gif)

#### wrap
아이템들이 위쪽에서 아래쪽 방향으로 줄바꿈을 하게된다.  

```css
flex-wrap: wrap;
```

![flex-wrap-wrap](./wrap-wrap.gif)

#### wrap-reverse
아이템들이 아래쪽에서 위쪽방향으로 줄바꿈을 하게된다.  

```css
flex-wrap: wrap-reverse;
```

![flex-wrap-wrap-reverse](./wrap-wrap-reverse.gif)

<br/>

### Justify-Content
메인축의 방향을 결정하는 속성이다.  

#### flex-start
아이템들이 메인축의 시작점으로 정렬하며, 기본값이다.  
`flex-direction`이 `row`일때는 왼쪽, `column`일때는 위쪽이다.   

```css
justify-content: flex-start;
```

![justify-content-flex-start](./justify-flex-start.png)

#### flex-end
아이템들이 메인축의 끝점으로 정렬한다.  
`flex-direction`이 `row`일때는 오른쪽, `column`일때는 아래쪽이다.   

```css
justify-content: flex-end;
```

![justify-content-flex-end](./justify-flex-end.png)

#### center
아이템들이 메인축의 가운데로 정렬한다.  

```css
justify-content: center;
```

![justify-content-center](./justify-center.png)

#### space-between
아이템들의 사이에 균일한 간격을 만든다.  

```css
justify-content: space-between;
```

![justify-content-space-between](./justify-space-between.png)

#### space-around
아이템들의 주위에 균일한 간격을 만든다.  

```css
justify-content: space-around;
```

![justify-content-space-around](./justify-space-around.png)

#### space-evenly
아이템들의 사이와 양끝에 균일한 간격을 만든다.  

```css
justify-content: space-evenly;
```

![justify-content-space-evenly](./justify-space-evenly.png)

<br/>

### Align-Items
수직축 방향으로 아이템들을 정렬하는 속성이다.  

#### stretch
아이템들이 수직축방향으로 끝까지 늘어나며 기본값이다.  

```css
align-items: stretch;
```

![align-items-stretch](./align-items-stretch.png)

#### flex-start
아이템들이 메인축의 시작점으로 정렬하며, 기본값이다.  
`flex-direction`이 `row`일때는 왼쪽, `column`일때는 위쪽이다.  

```css
align-items: flex-start;
```

![align-items-flex-start](./align-items-flex-start.png)

#### flex-end
아이템들이 메인축의 끝점으로 정렬한다.  
`flex-direction`이 `row`일때는 오른쪽, `column`일때는 아래쪽이다.  

```css
align-items: flex-end;
```

![align-items-flex-end](./align-items-flex-end.png)

#### center
아이템들을 중앙으로 정렬한다.  

```css
align-items: center;
```

![align-items-center](./align-items-center.png)

#### baseline
아이템들을 텍스트 베이스라인 기준으로 정렬한다.  

```css
align-items: baseline;
```

![align-items-baseline](./align-items-baseline.png)

<br/>

### Align-Content
`flex-wrap: wrap`이 설정된 상태에서 아이템들의 줄바꿈이 일어났을때  
수직축 방향 정렬을 결정하는 속성으로 `justify-content`와 비슷한 방식으로 작동한다.  

<br/>


## Flex 아이템 속성

### Flex-Basis
아이템들의 기본 크기를 설정한다.  
`flex-direction`이 `row`일때는 너비, `column`일때는 높이로  
기본값은 `auto`이다.

```css
flex-basis: auto; /* 10, 10px, 10rem, 10%, ... */
```