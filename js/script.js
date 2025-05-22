document.addEventListener('DOMContentLoaded', function() {
    const sidebarLinks = document.querySelectorAll('.sidebar-nav li');
    const toolPages = document.querySelectorAll('.tool-page');
    const pageTabs = document.querySelectorAll('.page-tabs');

    // 初始化：显示第一个工具页面和其对应的标签页内容
    if (sidebarLinks.length > 0) {
        sidebarLinks[0].classList.add('active');
    }
    if (toolPages.length > 0) {
        toolPages[0].classList.add('active-page');
        activateTabsForPage(toolPages[0]);
    }

    // 侧边栏导航切换
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            sidebarLinks.forEach(s => s.classList.remove('active'));
            this.classList.add('active');

            const pageId = this.dataset.page;
            toolPages.forEach(page => {
                if (page.id === pageId) {
                    page.classList.add('active-page');
                    activateTabsForPage(page); // 激活新页面的标签逻辑
                } else {
                    page.classList.remove('active-page');
                }
            });
        });
    });

    // 为指定页面激活标签页功能
    function activateTabsForPage(pageElement) {
        const currentTabsContainer = pageElement.querySelector('.page-tabs');
        if (!currentTabsContainer) return;

        const tabButtons = currentTabsContainer.querySelectorAll('.tab-button');
        const tabContents = pageElement.querySelectorAll('.tab-content');

        // 确保每个页面加载时，默认选中第一个标签及其内容
        tabButtons.forEach((btn, index) => {
            if (index === 0) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        tabContents.forEach((content, index) => {
            // ID 格式通常是 parentId-tabName
            // 我们需要根据按钮的 data-tab 来匹配正确的内容区域
            const firstButtonTab = tabButtons[0] ? tabButtons[0].dataset.tab : null;
            if (firstButtonTab && content.id.endsWith(firstButtonTab)) {
                content.classList.add('active-tab-content');
            } else {
                 content.classList.remove('active-tab-content');
            }
        });

        // 为当前页面的标签按钮添加事件监听
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 移除同级按钮的 active 状态
                tabButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const tabId = this.dataset.tab;
                // 隐藏所有内容区，然后显示匹配的
                tabContents.forEach(content => {
                    // ID 格式是 page.id + '-' + tabId
                    // 但由于HTML结构中，tab-content 的 ID 已经包含了 page.id 部分，如 vocal-remover-how-it-works
                    // 我们需要一种更通用的方式来匹配，例如检查 content.id 是否以 tabId 结尾
                    // 或者，确保 tab content 的 ID 是唯一的，并且与 data-tab 对应。
                    // 为了简单起见，我们假设 content 的 ID 结构是 [pageId]-[tabName]
                    // 或者更简单地，内容区域的 ID 包含按钮的 data-tab 值
                    if (content.id.startsWith(pageElement.id + '-') && content.id.endsWith(tabId)) {
                         content.classList.add('active-tab-content');
                    } else if (content.id === tabId) { // 兼容旧的，如果tab content id直接等于tabId
                        content.classList.add('active-tab-content');
                    } else {
                         content.classList.remove('active-tab-content');
                    }
                });
            });
        });
    }
}); 