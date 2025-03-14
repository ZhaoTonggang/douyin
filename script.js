document.getElementById('parse-form').addEventListener('submit', (event) => {
	event.preventDefault();
	// 使用正则表达式匹配URL
	const videoUrl = document.getElementById('video-url').value.match(
		/https:\/\/v\.douyin\.com\/[a-zA-Z0-9]+\//)?.[0];
	if (!videoUrl) {
		alert('请输入有效的抖音分享链接');
		return;
	}
	document.getElementById('video-url').value = videoUrl;
	const resultDiv = document.getElementById('result');
	const stbt = document.getElementById('stbt');
	stbt.innerText = '正在解析';
	fetch('https://php-api.heheda.top/jiexi/douyin/', {
		body: 'url=' + videoUrl,
		method: 'POST',
		cache: 'force-cache',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}).then(response => response.json()).then(datas => {
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
				document.getElementById('dcover').href = datas.cover;
				document.getElementById('dcover').download = '封面' + downtitle;
				document.getElementById('dvideo').href = datas.video;
				document.getElementById('dvideo').download = '视频' + downtitle;
				document.getElementById('content').style.display = 'block';
				console.log(datas)
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
		stbt.innerText = '开始解析';
	}).catch(err => {
		resultDiv.innerHTML = '<p style="color: var(--primary-color);">出现错误：' + err + '</p>';
		stbt.innerText = '开始解析';
	})
});
const copy = (e) => {
	const value = e.previousElementSibling.value;
	if (value) {
		navigator.clipboard.writeText(value);
		alert('复制成功！');
	} else {
		alert('复制失败，未获取到密钥！');
	}
}
const chose = (e) => {
	e.select();
	e.setSelectionRange(0, 99999);
}