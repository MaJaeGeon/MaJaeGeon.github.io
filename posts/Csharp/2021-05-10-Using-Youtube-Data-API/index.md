---
title: "Youtube Data API 사용하기"
date: "2021-05-10"
categories: [Csharp]
notice: false
pinned: false
---

이 글에서는 Google OAuth API를 통해 Youtube Data API를 사용하는 `YoutubeService`를 만들어본다. 
OAuth 인증에는 [C#에서 Google Device OAuth2.0 API 사용하기](./2021-05-09-Google-Device-OAuth2.0-API-in-Csharp.md)에서 만든 `GoogleOAuthService`를 사용한다.  
Youtube API에 대한 설명은 [Youtube Data API](https://developers.google.com/youtube/v3/getting-started)를 참고하면된다.

<br/>

## 1. 할당량과 부분 리소스

하루에 내가 호출할 수 있는 요청의 양이 정해져있는데 이를 할당량이라 하며,  
API를 통해 요청을 하면 각 요청마다 비용이라는 것이 든다.  
예를들어, 나에게 만원이 있고 편의점에서 물건을 구매할 때 비용이 드는것과 같다.  
여기서 만원은 할당량, 내가 구매한 물건의 가격은 요청에 대한 비용이다.  
실제 물건처럼 각 요청마다 비용은 다르며, 할당량을 소진하게되면 다음날까지는 요청을 할 수 없다.  
따라서 우리는 요청에 대한 비용을 최대한 줄여, 할당량을 아껴써야한다.  

<br/>

부분 리소스에는 `part`와 `fields`라는 파라미터가 있다.  
이 부분 리소스를 통해 필요한 데이터만 받아오고, 요청에 대한 비용을 줄일 수 있다.  

-   `part`
    `part`파라미터는 리소스를 검색하거나 반환하는 모든 API요청에 필요한 필수 파라미터이다.  
    이 파라미터는 `snippet`, `status`등과 같은 1개 이상의 최상위 수준의 리소스 속성을 식별한다.  

-   `fields`
    `fields` 파라미터는 `part`파라미터에서 식별된 리소스에서 필요한 데이터를 필터링하는데 사용된다.  
    이 파라미터를 통해 중복되는 속성을 삭제하여 요청에 대한 비용을 줄일 수 있다.  

부분 리소스에 대한 정보는 이 글의 목적과는 다르기 때문에 [부분 리소스](https://developers.google.com/youtube/v3/getting-started#partial)를 참고하길 바란다.  

<br/>

## 2. Youtube Service 전체 소스코드
비디오 검색, 재생목록 생성, 재생목록 아이템 추가 API를 사용해 본다.

```cs
public class YoutubeService
{
    private const string ApiBase = "https://www.googleapis.com/youtube/v3";

    private readonly GoogleOAuthService _googleOAuth;


    public YoutubeService(string clientId, string clientSecret)
    {
        _googleOAuth = new GoogleOAuthService(clientId, clientSecret);

        _googleOAuth.DeviceOAuth();
    }

    public string SearchVideo(string videoName)
    {
        string parameters = $"part=id&fields=items/id/videoId&q={videoName}";

        var resp = HttpRequestService.HttpRequest($"{ApiBase}/search?{parameters}", "", AccessTokenHeader());
        var job = JObject.Parse(resp);

        if (ErrorCheck(job)) return null;

        var videos = JArray.Parse(job["items"].ToString());

        return videos.First["id"]["videoId"].ToString();
    }

    public string CreatePlayList(string title, string description)
    {
        string parameters = $"part=snippet,status&fields=id";

        JObject data = JObject.FromObject(new {
            snippet = new
            {
                title = title,
                description = description
            },
            status = new
            {
                privacyStatus = "public"
            }
        });

        string resp = HttpRequestService.HttpRequest($"{ApiBase}/playlists?{parameters}", data.ToString(), AccessTokenHeader(), "application/json");
        var job = JObject.Parse(resp);

        if (ErrorCheck(job)) return null;

        return job["id"].ToString();
    }

    public string AddPlayListItem(string playListId, string videoId)
    {
        string parameters = $"part=snippet&fields=snippet/title";

        JObject data = JObject.FromObject(new
        {
            snippet = new {
                playlistId = playListId,
                resourceId = new
                {
                    kind = "youtube#video",
                    videoId = videoId
                }
            }
        });

        string resp = HttpRequestService.HttpRequest($"{ApiBase}/playlistItems?{parameters}", data.ToString(), AccessTokenHeader(), "application/json");
        var job = JObject.Parse(resp);

        if (ErrorCheck(job)) return null;

        return job["snippet"]["title"].ToString();
    }



    private WebHeaderCollection AccessTokenHeader()
    {
        var headers = new WebHeaderCollection();
        headers.Add("Authorization", $"{_googleOAuth.CurrentToken.Token_Type} {_googleOAuth.CurrentToken.Access_Token}");

        return headers;
    }

    private bool ErrorCheck(JObject job)
    {
        if (!job.ContainsKey("error")) return false;

        var errors = JArray.Parse(job["error"]["errors"].ToString());

        foreach(var error in errors)
        {
            error["reason"].ToString();
        }

        return true;
    }
}
```