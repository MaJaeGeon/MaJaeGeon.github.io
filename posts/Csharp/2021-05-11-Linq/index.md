---
title: "Linq 란"
date: "2021-05-11"
categories: [Csharp]
notice: false
pinned: false
---

LINQ는 Language INtegrated Query의 약어로,  
C# 에서 사용되는 데이터 질의 기능을 말한다.  

<br/>

```cs
private static List<Profile> profiles = new List<Profile>
{
    new Profile{Name = "김철수", Age = 5  },
    new Profile{Name = "신짱구", Age = 5  },
    new Profile{Name = "신형만", Age = 29 },
    new Profile{Name = "봉미선", Age = 35 },
};
```

LINQ를 사용하지 않은 코드
```cs
static void Main(string[] args)
{
    List<string> minors = new List<string>();

    foreach (var profile in profiles)
    {
        if (profile.Age < 20) minors.Add(profile.Name);
    }

    foreach (var name in minors)
    {
        Console.WriteLine(name);
    }
}
```

<br/>

LINQ를 사용한 코드
```cs
static void Main(string[] args)
{
    var minors =
        from profile in profiles
        where profile.Age < 20
        select profile.Name;

    foreach (string name in minors)
    {
        Console.WriteLine(name);
    }
}
```

<br/>

LINQ를 사용하면 컬렉션 형태를 띄고있는 데이터들에 대해 질의할 수 있고,  
복잡한 코드없이 쉽게 필터링, 정렬 등의 기능들을 수행할 수 있다.  


## LINQ의 기본

LINQ는 `from`, `where`, `select`로 이루어지고 옵션으로 `orderby`등 이 있다.

<br/>

### from
```cs
//from 범위변수 in 데이터원본

from profile in profiles
```

`from`은 위와 같은 형식으로 이루어지며, LINQ는 아무 데이터원본에나  
사용할 수 있는것이 아닌 `IEnumerable` 또는 이를 상속받는 형식에서만 사용할 수 있다.  
또한 범위변수는 `foreach`문 등에서 사용되는 반복변수는 실제 데이터를 담아내지만  
범위변수는 실제 데이터를 담지는 않기때문에 쿼리식 외부에 선연된 변수에 범위 변수의  
데이터를 복사해 넣는등의 행위는 할 수 없다.

<br/>

### where
```cs
//where 조건식

where profile.Age < 20
```

`where`은 요소를 필터링하는 역할을 담당한다.  
위와 같은 형식으로 사용되며, 데이터원본으로 부터 순차적으로 요소를 가져오고,  
그 요소가 범위변수에 들어가게 되면 이 범위변수를 조건식을 통해 걸러낸다.  
요소에 대한 조건식이 거짓이면 요소를 반환하지 않으며, 참이면 요소를 반환한다.  

<br/>

### select
```cs
//select 범위변수

select profile.Name
//select profile
//select new { Name = profile.Name, Age = profile.Age }
```

`select`는 LINQ식에 대한 최종적인 결과를 출력한다.  
LINQ식의 반환형식은 `select`에서 최종적으로 반환하는 데이터형식에 따라 달라진다.  
객체, 문자열 등의 형식 외에도 무명형식을 통해 새로운 객체를 만들어 낼 수도 있다.  

<br/>

### orderby
```cs
//orderby 정렬 기준

orderby profile.Age
//orderby profile.Age ascending
//orderby profile.Age descending
```

`orderby`는 데이터의 정렬을 위해 사용되는 연산자이다.
별도의 키워드를 지정하지않으면 오름차순으로 데이터가 정렬되고,  
`descending`키워드를 통해 내림차순으로 정렬을 할 수 있다.  
오름차순으로 정렬할때 `ascending`키워드를 붙여 명시해도된다.  


<br/>

## LINQ의 표준 연산자

LINQ의 `select`, `where` 등과 같은 연산자는 실제 메소드이다.  

```cs
var minors =
    from profile in profiles
    where profile.Age < 20
    select profile.Name;
```

C# 컴파일러는 위와 같은 LINQ 쿼리식을 컴파일할때  
아래와 같은 코드로 번역하게된다.  

```cs
var minors = profiles
    .Where(profile => profile.Age < 20)
    .Select(profile => profile.Name);
```

표준 연산 메소드는 53개가 있지만,  
LINQ 쿼리식에서 지원되는 연산 메소드는 11개 뿐이다.
지원되고있는 표준 연산 메소드중 일부는 위에서 알아보았다.  
아래의 내용부터는 LINQ의 기본을 넘어서는 내용에 대해 알아본다.  


<br/>

### 여러 데이터 원본에 질의하기
`from`을 통해 여러 데이터 원본에서 동시에 질의가 가능하다.  

아래는 clsses에서 점수가 70점 미만인 교실의 이름을 출력한다.  

```cs
static void Main(string[] args)
{
    List<Class> classes = new List<Class>
    {
        new Class{ Name = "A", Average = 88.6f, Scores = new int[]{100, 86, 92, 76, 89}},
        new Class{ Name = "B", Average = 89.0f, Scores = new int[]{98, 72, 87, 94, 94}},
        new Class{ Name = "C", Average = 82.4f, Scores = new int[]{67, 97, 84, 85, 79}},
        new Class{ Name = "D", Average = 80.6f, Scores = new int[]{89, 81, 42, 91, 100}},
    };

    var sixty =
        from c in classes
        from s in c.Scores
        where s < 70
        select c.Name;
    
    foreach (var name in sixty)
    {
        Console.WriteLine(name);
    }
}
```
```bash
C
D
```

<br/>

### 데이터 분류하기
```cs
//group 범위변수 by 분류기준 into 그룹변수
```

그룹은 분류기준의 결과값을 Key값으로 사용한다.  
<br/>

```cs
static void Main(string[] args)
{
    List<Class> classes = new List<Class>
    {
        new Class{ Name = "A", Average = 88.6f },
        new Class{ Name = "B", Average = 89.0f },
        new Class{ Name = "C", Average = 82.4f },
        new Class{ Name = "D", Average = 80.6f },
    };

    var resultGroup =
        from c in classes
        group c by c.Average < 85.0;

    foreach(var result in resultGroup)
    {
        Console.WriteLine(result.Key ? "평균 85점 미만 :" : "평균 85점 이상 :");

        foreach (var c in result) Console.WriteLine($"{c.Name} : {c.Average}점");
    }
}
```
```bash
평균 85점 이상 :
A : 88.6점
B : 89점
평균 85점 미만 :
C : 82.4점
D : 80.6점
```

`group`에서 `into`를 생략할 수 있다.  
위의 소스코드에선 85점 미만인지 아닌지에 따른  
논리식으로 분류하여 두 개의 그룹으로 나뉜다.  


아래의 소스코드는 평균점수를 10으로 나눠 분류한다.

```cs
static void Main(string[] args)
{
    List<Class> classes = new List<Class>
    {
        new Class{ Name = "A", Average = 68.6f },
        new Class{ Name = "B", Average = 79.0f },
        new Class{ Name = "C", Average = 82.4f },
        new Class{ Name = "D", Average = 90.6f },
    };

    var resultGroup =
        from c in classes
        group c by (int)c.Average / 10 into g
        select g;

    foreach (var result in resultGroup)
    {
        Console.WriteLine($"{result.Key * 10}점~");

        foreach (var c in result) Console.WriteLine($"{c.Name} : {c.Average}점");
    }
}
```
```bash
60점~
A : 68.6점
70점~
B : 79점
80점~
C : 82.4점
90점~
D : 90.6점
```

<br/>

### 두 데이터원본 연결하기
`join`은 각 데이터원본에서 서로 일치하는  
특정필드값을 가진 데이터끼리 연결을 수행한다.  

```cs
static List<User> users = new List<User>
    {
        new User { Id = 1, Name = "신형만" },
        new User { Id = 2, Name = "봉미선" },
        new User { Id = 3, Name = "신짱구" },
        new User { Id = 4, Name = "신짱아" },
    };

static List<Order> orders = new List<Order>
{
    new Order { UserId = 1, OrderContent = "주문1"},
    new Order { UserId = 1, OrderContent = "주문2"},
    new Order { UserId = 2, OrderContent = "주문3"},
    new Order { UserId = 1, OrderContent = "주문4"},
    new Order { UserId = 2, OrderContent = "주문5"},
    new Order { UserId = 4, OrderContent = "주문6"},
};
```

<br/>

#### 내부 조인
내부 조인은 두 데이터원본 사이에서 일치하는  
데이터만 연결 후 반환하며, 교집합과 비슷하다.  

```cs
static void Main(string[] args)
{
    var orderInfo =
        from order in orders
        join user in users on order.UserId equals user.Id
        orderby user.Id
        select new
        {
            Name = user.Name,
            OrderContent = order.OrderContent
        };

    foreach (var info in orderInfo)
        Console.WriteLine($"{info.Name} : {info.OrderContent}");
}
```
```bash
신형만 : 주문1
신형만 : 주문2
신형만 : 주문4
봉미선 : 주문3
봉미선 : 주문5
신짱아 : 주문6
```

<br/>

#### 외부 조인
외부 조인은 내부 조인과 비슷하지만 내부 조인과 달리  
조인 결과에 기준이 되는 데이터원본의 모든것이 포함된다.  

```cs
static void Main(string[] args)
{
    var orderInfo =
        from user in users
        join order in orders on user.Id equals order.UserId into o
        from order in o.DefaultIfEmpty(new Order { OrderContent = "주문없음"})
        orderby user.Id
        select new
        {
            Name = user.Name,
            OrderContent = order.OrderContent
        };

    foreach (var info in orderInfo)
        Console.WriteLine($"{info.Name} : {info.OrderContent}");
}
```
```bash
신형만 : 주문1
신형만 : 주문2
신형만 : 주문4
봉미선 : 주문3
봉미선 : 주문5
신짱구 : 주문없음
신짱아 : 주문6
```