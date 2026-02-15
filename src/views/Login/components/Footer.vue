<template>
    <div class="login-footer-wrap">
        <div class="login-footer">
            <ul class="login-footer-links">
                <li class="login-links-list">
                    <a href="//help.damai.cn">帮助中心</a >
                </li>
                <li class="footer-links-grep">|</li>
                <li class="login-links-list">
                    <a href="//help.damai.cn">公司介绍</a >
                </li>
                <li class="footer-links-grep">|</li>
                <li class="login-links-list">
                    <a href="//help.damai.cn">品牌识别</a >
                </li>
                <li class="footer-links-grep">|</li>
                <li class="login-links-list">   
                    <a href="//help.damai.cn">公司大事记</a >
                </li>
                <li class="footer-links-grep">|</li>
                <li class="login-links-list">   
                    <a href="//help.damai.cn">协议及隐私权政策</a >
                </li>
                <li class="footer-links-grep">|</li>
                <li class="login-links-list">   
                    <a href="//help.damai.cn">廉政举报</a >
                </li>
                <li class="footer-links-grep">|</li>
                <li class="login-links-list">   
                    <a href="//help.damai.cn">联系合作</a >
                </li>
                <li class="footer-links-grep">|</li>
                <li class="login-links-list">   
                    <a href="//help.damai.cn">招聘信息</a >
                </li>
                <li class="footer-links-grep">|</li>
                <li class="login-links-list">   
                    <a href="//help.damai.cn">防骗秘籍</a >
                </li>
                <li class="footer-links-grep">|</li>
            </ul>
            <div class="footer-ft">
                <div class="footer-ft-fl">
                    <a href="//www.damai.cn/?spm=a2oeg.home.0.0.591b48d3QzpG8B" target="_blank" class="footer__ft__logo">
                        <img src="https://img.alicdn.com/tfs/TB1otMASmzqK1RjSZPxXXc4tVXa-167-60.png">
                    </a>
                    <div class="footer-ft-fl-code">
                        <img  src="//gw.alicdn.com/imgextra/i2/O1CN01WXpWzZ1r0C9fGPCfv_!!6000000005568-2-tps-2440-2440.png" alt="">
                        <span>APP下载</span>
                    </div>

                </div>
                <div class="footer-ft-fr">
                    <div class="footer-ft-fr-contact">
                        <a href="#" class="contact-button">帮助中心</a >
                    </div>
                    <div class="footer-ft-fr-words">
                            <div>
                                北京红马传媒文化发展有限公司 版权所有大麦网Copyright 2003-2020 All Rights Reserved
                            </div>
                            <div>
                                举报投诉邮箱：damai_tousu@member.alibaba.com
                            </div>  
                    </div>

                </div>

            </div>
        </div>
    </div>
</template>

<style scoped>
.login-footer-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f8f8f8;
    overflow: hidden;
    height: 280px;
}
.login-footer {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 1200px;
}

.login-footer  ul {
    text-align: center;
    list-style: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 36px 0;
    width: 100%;
}

li.login-links-list{
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    color: #111;
    height: 19.5px;
}



.footer-links-grep {
    color: #111;
    padding: 0 12px;
}


.footer-ft {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding-bottom: 58px;
}

.footer-ft-fl {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 100px;
}

.footer-ft-fl img {
    width: 100%;
    height: 60px;
}

.footer-ft-fl-code {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 40px;
    flex-direction: column;
}

.footer-ft-fl-code img {
    width: 87px;
    height: 87px;
}

.footer-ft-fl-code span {
    color: #111;
    text-align: center;
}

.footer-ft-fr {
    display: flex;
    /* align-items: center;
    justify-content: flex-start; */
    flex-direction: column;
}

.footer-ft-fr-contact {
    float: left;
    display: block;
    width: 98px;
    height: 27px;
    line-height: 27px;
    text-align: center;
    background-color: #ff1268;
    color: #fff;
    font-size: 14px;
    border-radius: 20px;
}

.footer-ft-fr-words {
    margin-block-start: 1em;
    margin-block-end: 1em;
    /* padding-inline-start: 40px; */
    unicode-bidi: isolate;
    display: flex;
    flex-direction: column;
    /* align-items: center;
    justify-content: center; */
}

.footer-ft-fr-words div {
    font-size: 13px;
    color: #111;
}
</style>
