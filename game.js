let currentPage = 'page_1';
const gameData = {}; // 存储从YAML加载的游戏数据

// 加载YAML文件并解析
fetch('chapters.yaml')
    .then(response => response.text())
    .then(data => {
        gameData = jsyaml.load(data);
        loadPage(currentPage);
    });

// 加载页面内容
function loadPage(pageId) {
    const page = gameData[pageId];
    
    // 更新内容
    document.getElementById('content').innerText = page.content;
    
    // 更新选择按钮
    const choicesContainer = document.getElementById('choices');
    choicesContainer.innerHTML = ''; // 清空现有选项
    page.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice.text;
        button.onclick = () => loadPage(choice.next_page); // 根据选择加载下一页
        choicesContainer.appendChild(button);
    });
}
