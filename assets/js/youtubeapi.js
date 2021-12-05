window.onload = 
    function() {
        var urlParams = parseURLParams(window.location.href);
        console.log(urlParams['t'][0]);
        getJSONP('https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3&key=AIzaSyAYVGBe8I4aYNlnvUR5uTRny48f-XPXpao', function(data){
        console.log(data)
        youtubeSearch(urlParams['t'][0])
    });
    }

    function youtubeSearch(topic){
        $.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyAYVGBe8I4aYNlnvUR5uTRny48f-XPXpao&type=video&part=snippet&maxResults=10&q="+topic,function(data){
            console.log(data)
        })
    }
    function parseURLParams(url) {
        var queryStart = url.indexOf("?") + 1,
            queryEnd   = url.indexOf("#") + 1 || url.length + 1,
            query = url.slice(queryStart, queryEnd - 1),
            pairs = query.replace(/\+/g, " ").split("&"),
            parms = {}, i, n, v, nv;
    
        if (query === url || query === "") return;
    
        for (i = 0; i < pairs.length; i++) {
            nv = pairs[i].split("=", 2);
            n = decodeURIComponent(nv[0]);
            v = decodeURIComponent(nv[1]);
    
            if (!parms.hasOwnProperty(n)) parms[n] = [];
            parms[n].push(nv.length === 2 ? v : null);
        }
        return parms;
    }

    function getJSONP(url, success) {

        var ud = '_' + +new Date,
            script = document.createElement('script'),
            head = document.getElementsByTagName('head')[0] 
                || document.documentElement;
    
        window[ud] = function(data) {
            head.removeChild(script);
            success && success(data);
        };
    
        script.src = url.replace('callback=?', 'callback=' + ud);
        head.appendChild(script);
    
    }
