<script setup>
import UserMenu from './UserMenu.vue'
</script>

<template>
    <header class="dm-header-wrap">
        <div class="dm-header-box">
            <router-link to="/home">
                <img class="i-logo" src="//img.alicdn.com/tfs/TB1fbVFfu3tHKVjSZSgXXX4QFXa-230-104.png" alt="大麦">
            </router-link>

            <!-- 城市选择 -->
            <div class="location-header">
                <img class="i-icon-location" src="//img.alicdn.com/tfs/TB1XHDuxNGYBuNjy0FnXXX5lpXa-28-32.png" alt="定位">
                <span class="city-location">北京</span>
                <img class="i-arrow-location" src="https://img.alicdn.com/tfs/TB1vnUBxStYBeNjSspaXXaOOFXa-20-12.png"
                    alt="箭头">

                <div class="city-header-wrap">
                    <div class="city-header">
                        <div class="now-city">
                            <span class="title-city">当前城市：</span>
                            <span class="name-city select-city">北京</span>
                        </div>

                        <div class="hot-city">
                            <span class="title-city">热门城市：</span>
                            <div class="list-other">
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=北京">北京</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=上海">上海</span><span
                                    class="name-city" data-spm="dselectcity&amp;clicktitle=广州">广州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=深圳">深圳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=杭州">杭州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=南京">南京</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=成都">成都</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=武汉">武汉</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=天津">天津</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=沈阳">沈阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=西安">西安</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=苏州">苏州</span>
                            </div>
                        </div>

                        <div class="other-city">
                            <span class="title-city">其他城市：</span>
                            <div class="list-other">
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=阿坝">阿坝</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=阿克苏">阿克苏</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=阿拉善">阿拉善</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=阿勒泰">阿勒泰</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=安康">安康</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=安庆">安庆</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=鞍山">鞍山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=安顺">安顺</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=安阳">安阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=澳门">澳门</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=巴音郭楞">巴音郭楞</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=巴中">巴中</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=白城">白城</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=百色">百色</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=白山">白山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=保定">保定</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=宝鸡">宝鸡</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=保山">保山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=保亭">保亭</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=包头">包头</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=北海">北海</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=北京">北京</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=本溪">本溪</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=蚌埠">蚌埠</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=毕节">毕节</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=滨州">滨州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=博尔塔拉">博尔塔拉</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=亳州">亳州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=沧州">沧州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=长春">长春</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=常德">常德</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=昌吉">昌吉</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=长沙">长沙</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=长治">长治</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=常州">常州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=朝阳">朝阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=潮州">潮州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=郴州">郴州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=承德">承德</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=成都">成都</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=赤峰">赤峰</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=池州">池州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=重庆">重庆</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=崇左">崇左</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=楚雄">楚雄</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=滁州">滁州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=大理">大理</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=大连">大连</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=大庆">大庆</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=大同">大同</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=大兴安岭">大兴安岭</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=达州">达州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=丹东">丹东</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=儋州">儋州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=德宏">德宏</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=德阳">德阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=德州">德州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=迪庆">迪庆</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=定西">定西</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=东方">东方</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=东莞">东莞</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=东营">东营</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=鄂尔多斯">鄂尔多斯</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=鄂州">鄂州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=恩施">恩施</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=佛山">佛山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=抚顺">抚顺</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=阜新">阜新</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=阜阳">阜阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=福州">福州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=抚州">抚州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=甘南">甘南</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=赣州">赣州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=甘孜">甘孜</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=高雄">高雄</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=固原">固原</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=广安">广安</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=广元">广元</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=广州">广州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=贵港">贵港</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=桂林">桂林</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=贵阳">贵阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=哈尔滨">哈尔滨</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=哈密">哈密</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=海北">海北</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=海东">海东</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=海口">海口</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=海南州">海南州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=海外">海外</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=海西">海西</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=邯郸">邯郸</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=汉中">汉中</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=杭州">杭州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=鹤壁">鹤壁</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=河池">河池</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=合肥">合肥</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=和田">和田</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=河源">河源</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=菏泽">菏泽</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=贺州">贺州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=黑河">黑河</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=衡水">衡水</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=衡阳">衡阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=红河">红河</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=呼和浩特">呼和浩特</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=葫芦岛">葫芦岛</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=呼伦贝尔">呼伦贝尔</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=湖州">湖州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=淮安">淮安</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=怀化">怀化</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=淮南">淮南</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=黄冈">黄冈</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=黄山">黄山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=黄石">黄石</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=惠州">惠州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=吉安">吉安</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=吉林">吉林</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=济南">济南</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=济宁">济宁</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=佳木斯">佳木斯</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=嘉兴">嘉兴</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=嘉峪关">嘉峪关</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=江门">江门</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=焦作">焦作</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=揭阳">揭阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=金昌">金昌</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=晋城">晋城</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=金华">金华</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=晋中">晋中</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=锦州">锦州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=景德镇">景德镇</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=荆门">荆门</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=荆州">荆州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=九江">九江</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=酒泉">酒泉</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=喀什">喀什</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=开封">开封</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=克拉玛依">克拉玛依</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=克孜勒苏柯尔克孜">克孜勒苏柯尔克孜</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=昆明">昆明</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=拉萨">拉萨</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=来宾">来宾</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=莱芜">莱芜</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=兰州">兰州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=廊坊">廊坊</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=乐东">乐东</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=乐山">乐山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=丽江">丽江</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=丽水">丽水</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=连云港">连云港</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=凉山">凉山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=聊城">聊城</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=辽阳">辽阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=辽源">辽源</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=临沧">临沧</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=临汾">临汾</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=临夏">临夏</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=临沂">临沂</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=林芝">林芝</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=陵水">陵水</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=六盘水">六盘水</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=柳州">柳州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=陇南">陇南</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=龙岩">龙岩</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=六安">六安</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=泸州">泸州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=漯河">漯河</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=洛阳">洛阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=吕梁">吕梁</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=马鞍山">马鞍山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=茂名">茂名</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=眉山">眉山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=梅州">梅州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=绵阳">绵阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=苗栗">苗栗</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=牡丹江">牡丹江</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=那曲">那曲</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=南昌">南昌</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=南充">南充</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=南京">南京</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=南宁">南宁</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=南平">南平</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=南通">南通</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=南阳">南阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=内江">内江</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=宁波">宁波</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=宁德">宁德</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=盘锦">盘锦</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=攀枝花">攀枝花</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=平顶山">平顶山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=平凉">平凉</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=萍乡">萍乡</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=普洱">普洱</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=莆田">莆田</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=濮阳">濮阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=齐齐哈尔">齐齐哈尔</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=黔东南">黔东南</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=潜江">潜江</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=黔南">黔南</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=黔西南">黔西南</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=秦皇岛">秦皇岛</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=钦州">钦州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=青岛">青岛</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=清远">清远</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=琼海">琼海</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=琼中">琼中</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=曲靖">曲靖</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=衢州">衢州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=泉州">泉州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=日喀则">日喀则</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=日照">日照</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=三门峡">三门峡</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=三明">三明</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=三亚">三亚</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=山南">山南</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=汕头">汕头</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=汕尾">汕尾</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=上海">上海</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=商洛">商洛</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=商丘">商丘</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=上饶">上饶</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=韶关">韶关</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=绍兴">绍兴</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=邵阳">邵阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=神农架">神农架</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=沈阳">沈阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=深圳">深圳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=石家庄">石家庄</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=十堰">十堰</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=石嘴山">石嘴山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=双鸭山">双鸭山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=朔州">朔州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=宿迁">宿迁</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=苏州">苏州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=宿州">宿州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=绥化">绥化</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=遂宁">遂宁</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=随州">随州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=塔城">塔城</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=泰安">泰安</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=太原">太原</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=台中">台中</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=台州">台州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=泰州">泰州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=唐山">唐山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=天津">天津</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=天水">天水</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=铁岭">铁岭</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=铜川">铜川</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=通化">通化</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=通辽">通辽</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=铜陵">铜陵</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=铜仁">铜仁</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=吐鲁番">吐鲁番</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=万宁">万宁</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=潍坊">潍坊</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=威海">威海</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=渭南">渭南</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=文昌">文昌</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=文山">文山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=温州">温州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=乌海">乌海</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=武汉">武汉</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=芜湖">芜湖</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=乌兰察布">乌兰察布</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=乌鲁木齐">乌鲁木齐</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=武威">武威</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=无锡">无锡</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=五指山">五指山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=吴忠">吴忠</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=梧州">梧州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=西安">西安</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=锡林郭勒">锡林郭勒</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=西宁">西宁</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=西双版纳">西双版纳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=厦门">厦门</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=咸宁">咸宁</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=仙桃">仙桃</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=咸阳">咸阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=香港">香港</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=湘潭">湘潭</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=湘西">湘西</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=襄阳">襄阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=孝感">孝感</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=新乡">新乡</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=信阳">信阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=新余">新余</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=忻州">忻州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=新竹">新竹</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=新竹">新竹</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=兴安盟">兴安盟</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=邢台">邢台</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=许昌">许昌</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=徐州">徐州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=宣城">宣城</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=雅安">雅安</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=延安">延安</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=盐城">盐城</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=烟台">烟台</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=阳江">阳江</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=阳泉">阳泉</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=扬州">扬州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=宜宾">宜宾</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=宜昌">宜昌</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=伊春">伊春</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=宜春">宜春</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=宜兰">宜兰</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=伊犁">伊犁</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=益阳">益阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=银川">银川</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=营口">营口</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=鹰潭">鹰潭</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=永州">永州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=玉林">玉林</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=榆林">榆林</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=玉溪">玉溪</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=岳阳">岳阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=运城">运城</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=云浮">云浮</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=枣庄">枣庄</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=湛江">湛江</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=张家界">张家界</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=张家口">张家口</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=张掖">张掖</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=漳州">漳州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=肇庆">肇庆</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=昭通">昭通</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=镇江">镇江</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=郑州">郑州</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=中山">中山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=中卫">中卫</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=周口">周口</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=舟山">舟山</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=珠海">珠海</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=驻马店">驻马店</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=株洲">株洲</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=淄博">淄博</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=自贡">自贡</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=资阳">资阳</span>
                                <span class="name-city" data-spm="dselectcity&amp;clicktitle=遵义">遵义</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- 首页和分类 -->
            <div class="recommend-header">
                <router-link to="/home" class="type-recommend select">首页</router-link>
                <a href="#" class="type-recommend">分类</a>
            </div>

            <!-- 登录和下载 -->
            <div class="right-header">

                <!-- 搜索框 -->
                <div class="search-header">
                    <img class="i-search" src="//img.alicdn.com/tfs/TB1qv3jxGmWBuNjy1XaXXXCbXXa-34-36.png" alt="搜索">
                    <input class="input-search" placeholder="搜索明星、演出、体育赛事">
                    <div class="btn-search" data-spm="dsearchbtn2">搜索</div>
                    <div class="list-search-wrap">
                        <div class="list-search"></div>
                    </div>
                </div>

                <!-- 登录 -->
                <UserMenu />

                <!-- 下载 -->
                <div class="box-header download-header">
                    <img class="i-box-header i-download"
                        src="//img.alicdn.com/tfs/TB1A9eIGKuSBuNjy1XcXXcYjFXa-54-54.png" alt="下载">
                    <span class="span-box-header">下载</span>
                    <div class="ewm-download">
                        <img class="i-ewm"
                            src="//gw.alicdn.com/imgextra/i2/O1CN01WXpWzZ1r0C9fGPCfv_!!6000000005568-2-tps-2440-2440.png">
                    </div>
                </div>



            </div>




        </div>

    </header>

</template>

<style scoped>
@import "./Header.css";
</style>
