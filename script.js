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
				resultDiv.innerHTML = '<p>标题：' + datas.title + '</p>' + '<p>作者：' + datas.name +
					'</p>' +
					'<p>封面：<img src="' + datas.cover + '" alt="' + datas.title + '" /></p>' +
					'<p>地址：<a href="' + datas.video +
					'" target="_blank" rel="noopener noreferrer">点击预览或下载视频</a></p>';
				document.body.style.backgroundImage = 'url(' + datas.cover + ')';
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