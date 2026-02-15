<template>
    <div class="register-wrap">
        <div class="register-container">
            <div class="register-table">
                <div class="register-line">
                    <div class="item-label">
                        邮箱
                    </div>
                    <div class="item-input">
                        <input type="text" placeholder="请输入邮箱">
                    </div>
                </div>
                <div class="register-line">
                    <div class="item-label">
                        用户名
                    </div>
                    <div class="item-input">
                        <input type="text" placeholder="请输入用户名">
                    </div>
                </div>
                <div class="register-line">
                    <div class="item-label">
                        密码
                    </div>
                    <div class="item-input">
                        <div class="password-container">
                            <input type="password" placeholder="请输入密码">
                            <div class="password-tip">
                                <ul>
                                    <li>6-20个字符，密码不能是相同的用户名</li>
                                    <li>只能包含字母、数字以及标点符号（除空格）</li>
                                    <li>字母、数字和标点符号至少包含2种</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="register-line">
                    <div class="item-label">
                        确认密码
                    </div>
                    <div class="item-input">
                        <input type="password" placeholder="请再次输入密码">
                    </div>
                </div>
                <div class="register-line">
                    <div class="item-label">
                        验证码
                    </div>
                    <div class="item-input">
                        <input type="text" placeholder="请输入验证码">
                        <button class="get-code">获取验证码</button>
                    </div>
                </div>
                <div class="register-agreement">
                    <input type="checkbox" id="agreement" class="agreement-checkbox">
                    <label for="agreement" class="agreement-label">
                        我已阅读并接受
                        <a href="#" class="agreement-link">《大麦会员服务协议》</a>
                        <a href="#" class="agreement-link">《隐私权政策》</a>
                        <a href="#" class="agreement-link">《订票服务条款》</a>
                        并同意自动注册成为会员
                    </label>
                </div>
                <div class="register-line register-line-button">
                    <button class="register-btn">同意并注册</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.register-wrap {
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f8f8f8;
    display: flex;
    justify-content: center;
    align-items: center;
}

.register-container {
    margin: 0 auto;
    width: 1200px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    padding: 40px 0;
}

.register-table {
    margin: 0 auto;
    width: 400px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
}

.register-line {
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.register-line-button {
    display: flex;
    align-items: center;
    justify-content: center;
}

.item-label {
    width: 100px;
    text-align: right;
    margin-right: 20px;
    font-size: 14px;
    color: #333;
}

.item-input {
    flex: 1;
    display: flex;
    align-items: center;
    position: relative;
}

.item-input input {
    width: 100%;
    height: 44px;
    padding: 0 15px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
    transition: all 0.3s;
    outline: none;
    box-sizing: border-box;
}

.item-input input:focus {
    border-color: #ff1268;
    box-shadow: 0 0 0 2px rgba(255, 18, 104, 0.1);
}

.item-input input::placeholder {
    color: #999;
}

.get-code {
    position: absolute;
    right: 10px;
    height: 36px;
    padding: 0 15px;
    background: #fff;
    border: 1px solid #ff1268;
    border-radius: 4px;
    color: #ff1268;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s;
}

.get-code:hover {
    background: #ff1268;
    color: #fff;
}

.register-btn {
    width: 150px;
    height: 44px;
    background: linear-gradient(135deg, #ff1268, #ff4d8a);
    color: #fff;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s;
    
}

.register-btn:hover {
    background: linear-gradient(135deg, #e0105d, #ff3d7a);
    box-shadow: 0 4px 12px rgba(255, 18, 104, 0.3);
    transform: translateY(-1px);
}

.register-btn:active {
    transform: translateY(0);
}

.register-agreement {
    display: flex;
    align-items: flex-start;
    margin-bottom: 24px;
    padding-left: 120px;
}

.agreement-checkbox {
    width: 16px;
    height: 16px;
    margin: 0 8px 0 0;
    cursor: pointer;
    accent-color: #ff1268;
}

.agreement-label {
    font-size: 13px;
    color: #666;
    line-height: 1.6;
    cursor: pointer;
    display: inline;
    word-wrap: break-word;
    word-break: break-all;
}

.agreement-link {
    color: #ff1268;
    text-decoration: none;
    margin: 0 4px;
    font-size: 13px;
}

.agreement-link:hover {
    text-decoration: underline;
}

/* 密码提示框样式 */
.password-container {
    position: relative;
    width: 100%;
}

.password-tip {
    position: absolute;
    top: 0;
    left: 100%;
    margin-left: 10px;
    padding: 12px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    width: 280px;
    z-index: 100;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s;
}

.password-container:hover .password-tip {
    opacity: 1;
    visibility: visible;
}

.password-tip ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.password-tip li {
    font-size: 12px;
    color: #666;
    line-height: 1.5;
    margin-bottom: 4px;
    display: flex;
    align-items: flex-start;
}

.password-tip li::before {
    content: '✓';
    color: #52c41a;
    margin-right: 8px;
    font-weight: bold;
}
</style>