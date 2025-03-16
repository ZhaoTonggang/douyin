// 严格模式
"use strict";
const urldata = window.location.href;
if (window.top != window) {
	alert('当您看到这条提示意味着：您所访问的网站正在恶意调用本站资源，本站对偷盗资源的行为0容忍，点击确认跳转正版体验。');
	window.open(urldata, '_self');
}
const resultDiv = document.getElementById('result');
const stbt = document.getElementById('stbt');
// 封装POST
const post = async (videoUrl = '') => {
	stbt.disabled = true;
	stbt.value = '正在解析';
	const response = await fetch('https://php-api.heheda.top/jiexi/douyin/', {
		body: 'url=' + videoUrl,
		method: 'POST',
		cache: 'force-cache',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	});
	if (response.ok) {
		return response.json();
	} else {
		throw new Error(response.statusText);
	}
}
// 内容填充
const init = (datas) => {
	if (datas) {
		if (datas.code == 1) {
			document.body.style.backgroundImage = 'url(' + datas.cover + ')';
			document.getElementById('cover').src = datas.cover;
			document.getElementById('ccover').value = datas.cover;
			document.getElementById('name').innerText = '@' + datas.name;
			document.getElementById('title').innerText = datas.title;
			document.getElementById('cname').value = datas.name;
			document.getElementById('ctitle').value = datas.title;
			document.getElementById('cvideo').value = datas.video;
			document.getElementById('lcover').href = datas.cover;
			document.getElementById('lvideo').href = datas.video;
			const downtitle = '(抖音) - ' + datas.name + ' - ' + datas
				.title;
			const dcover = document.getElementById('dcover');
			dcover.href = datas.cover;
			dcover.download = '封面' + downtitle;
			const dvideo = document.getElementById('dvideo');
			dvideo.href = datas.video;
			dvideo.download = '视频' + downtitle;
			document.getElementById('content').style.display = 'block';
		} else if (datas.code == 0) {
			resultDiv.innerHTML = '<p style="color: var(--primary-color);">' + datas.msg +
				'</p>';
		} else {
			resultDiv.innerHTML =
				'<p style="color: var(--primary-color);">没有获取到数据，请检查输入链接是否有误！</p>';
		}
	} else {
		resultDiv.innerHTML = '<p style="color: var(--primary-color);">算法可能失效，请联系管理员维护！</p>';
	}
	stbt.value = '开始解析';
	stbt.disabled = false;
}
// 无数据
const error = (err) => {
	resultDiv.innerHTML = '<p style="color: var(--primary-color);">出现错误：' + err + '</p>';
	stbt.value = '开始解析';
	stbt.disabled = false;
}
// 获取URL参数
if (urldata.indexOf('?') > -1 && urldata.indexOf('.html') > -1) {
	const surl = 'https://v.douyin.com/' + urldata.substring(urldata.indexOf('?') + 1, urldata.indexOf('.html')) + '/';
	document.getElementById('video-url').value = surl;
	post(surl).then(
		datas => {
			init(datas);
		}).catch(e => error(e))
}
// 监听提交
document.getElementById('parse-form').onsubmit = (e) => {
	e.preventDefault();
	// 使用正则表达式匹配URL
	const videoUrl = document.getElementById('video-url').value.match(
		/https:\/\/v\.douyin\.com\/[a-zA-Z0-9]+\//)?.[0];
	if (!videoUrl) {
		alert('请输入有效的抖音分享链接');
		return;
	}
	document.getElementById('video-url').value = videoUrl;
	post(videoUrl).then(datas => {
		init(datas);
	}).catch(e => error(e))
}
const copy = (e) => {
	let value = null;
	if (e) {
		value = e.previousElementSibling.value;
	} else {
		const match = document.getElementById('video-url').value.match(/https:\/\/v\.douyin\.com\/([^\/]+)\//);
		if (match && match[1]) {
			value = 'https://' + window.location.host + '/?' + match[1] + '.html';
		} else {
			alert('复制失败！');
			return;
		}
	}
	if (value) {
		navigator.clipboard.writeText(value);
		alert('内容已成功复制到剪贴板！');
	} else {
		alert('复制失败！');
	}
}
const chose = (e) => {
	e.select();
	e.setSelectionRange(0, 99999);
}