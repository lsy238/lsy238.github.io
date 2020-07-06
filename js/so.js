$(document).ready(function() {
    var so_keyword = decodeURI(window.location.href.toString().split("keyword=")[1]);
    var so_sugg_url = "https://suggest.video.iqiyi.com/?platform=11&rltnum=1&key=";
    $.get(so_sugg_url + so_keyword,
        function(data, status) {
            parseData(data)
        });
    $("#so-btn").click(function() {
        window.location.href = "so.html?keyword=" + $("#keyword").val()
    })
}).keydown(function(event) {
    if (event.keyCode == 13 && $("#keyword").val() != "") {
        window.location.href = "so.html?keyword=" + $("#keyword").val()
    }
});

function parseData(data) {
    var data = JSON.parse(data);
    data = data.data;
    if (data.length == 1) {
        var datarel = data[0];
        var link = datarel.link;
        if (link == "") {
            $(".container").html("<h2 style='color:red'>抱歉，没有找到相关视频！</h2>")
        } else {
            showView(datarel)
        }
    } else {
        $(".container").html("<h2 style='color:red'>抱歉，没有找到相关视频！</h2>")
    }
}

function showView(data) {
    console.log(data);
    console.log(data.name);
    $("#v-pic").attr("src", data.picture_url);
    $("#v-pic").attr("alt", data.name);
    $("#v-name").html(data.name);
    $("#v-year").html(data.year);
    $("#v-director").html((data.director).toString());
    $("#v-actor").html(data.main_actor.toString());
    $("#v-duration").html((data.duration / 60).toFixed(1) + "分钟");
    $("#v-region").html(data.region);
    $("#v-cname").html(data.cname);
    if (data.cid == "1") {
        $("#v-link").attr("href", "index.html?url=" + data.link + "&aid=" + data.aid)
    } else {
        if (data.cid == "2") {
            $("#v-link").attr("href", "index.html?url=" + data.link_address[0] + "&aid=" + data.aid);
            var ser = "<span style='color:#777'>剧集：</span><div class='btn-group'>";
            for (var i = 0; i < data.show_title.length; ++i) {
                ser = ser + "<a href='index.html?url=" + data.link_address[i] + "'><button class='btn btn-success'>" + data.show_title[i] + "</button></a>"
            }
            ser = ser + "</div>";
            $("#v-series").html(ser)
        }
    }
};