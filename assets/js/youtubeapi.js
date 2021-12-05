window.onload = function () {
    var urlParams = parseURLParams(window.location.href);
    console.log(urlParams['t'][0]);
    youtubeSearch(urlParams['t'][0])
}

function youtubeSearch(topic) {
    $.get("https://www.googleapis.com/youtube/v3/search?key=AIzaSyAYVGBe8I4aYNlnvUR5uTRny48f-XPXpao&type=video&part=snippet&maxResults=10&q=" + topic, function (data) {
        data.items.forEach(element => {
            var video = `
                <iframe style='margin:20px' width="420" height="315" src="https://www.youtube.com/embed/${element.id.videoId}" frameborder="0" allowfullscreen></iframe>
                `
            document.getElementById("videos").insertAdjacentHTML( 'beforeend', video)
        });
    })
}
function parseURLParams(url) {
    var queryStart = url.indexOf("?") + 1,
        queryEnd = url.indexOf("#") + 1 || url.length + 1,
        query = url.slice(queryStart, queryEnd - 1),
        pairs = query.split("&"),
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
