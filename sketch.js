let circles = [];
let iframe; // 用於嵌入網頁的 iframe

function setup() {
  createCanvas(windowWidth, windowHeight);
  // 初始化40個圓
  for (let i = 0; i < 40; i++) {
    circles.push({
      x: random(width),
      y: random(height),
      size: random(30, 50),
      color: color(random(255), random(255), random(255)),
    });
  }

  // 建立選單
  createMenu();

  // 建立 iframe
  iframe = createElement('iframe');
  iframe.style('position', 'absolute');
  iframe.style('top', '100px'); // iframe 放置於選單下方
  iframe.style('left', '10px');
  iframe.style('width', '90%');
  iframe.style('height', '80%');
  iframe.style('border', 'none');
  iframe.style('background', 'transparent'); // 使用透明背景
  iframe.hide(); // 預設隱藏 iframe
}

function draw() {
  background("#d8e2dc");
  let sizeOffset = map(mouseX, 0, width, 20, 80); // 根據滑鼠X位置計算大小變化幅度

  for (let circle of circles) {
    fill(circle.color);
    noStroke();
    ellipse(circle.x, circle.y, circle.size + sizeOffset);
  }
}

function createMenu() {
  // 建立選單容器
  let menu = createElement('ul');
  menu.style('position', 'absolute');
  menu.style('top', '10px');
  menu.style('left', '10px'); // 調整為左上角
  menu.style('display', 'flex'); // 水平排列
  menu.style('gap', '15px'); // 選項間距
  menu.style('padding', '0'); // 移除容器內邊距
  menu.style('background', 'transparent'); // 容器背景透明
  menu.style('border', 'none'); // 移除容器邊框
  menu.style('z-index', '1000'); // 確保選單在最上層

  // 選單項目
  let items = ['首頁', '自我介紹', '作品集', '測驗卷', '教學影片'];
  for (let item of items) {
    let li = createElement('li', item);
    li.style('list-style', 'none'); // 移除項目符號
    li.style('cursor', 'pointer');
    li.style('color', '#007BFF');
    li.style('text-align', 'center');
    li.style('text-decoration', 'none');
    li.style('padding', '10px 15px');
    li.style('border-radius', '10px'); // 每個項目為圓角矩形
    li.style('background', '#ffffff'); // 每個項目背景色
    li.style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)'); // 每個項目陰影
    li.style('border', '1px solid #ccc'); // 每個項目邊框

    // 滑鼠移入事件
    li.mouseOver(() => {
      li.style('background', '#007BFF'); // 背景變藍
      li.style('color', '#ffffff'); // 文字變白
    });

    // 滑鼠移出事件
    li.mouseOut(() => {
      li.style('background', '#ffffff'); // 背景恢復白色
      li.style('color', '#007BFF'); // 文字恢復藍色
    });

    // 點擊事件
    li.mousePressed(() => {
      if (item === '首頁') {
        iframe.hide(); // 隱藏 iframe
      }
    });

    // 如果是「作品集」，新增子選項
    if (item === '作品集') {
      let subMenu = createElement('ul');
      subMenu.style('position', 'absolute'); // 子選單絕對定位
      subMenu.style('top', '42px'); // 子選單放置於「作品集」下方
      subMenu.style('left', '167px'); // 子選單向右移動 50px
      subMenu.style('display', 'none'); // 預設隱藏子選單
      subMenu.style('flex-direction', 'column');
      subMenu.style('gap', '5px');
      subMenu.style('padding', '10px');
      subMenu.style('background', '#ffffff');
      subMenu.style('border', '1px solid #ccc');
      subMenu.style('border-radius', '10px');
      subMenu.style('box-shadow', '0 4px 6px rgba(0, 0, 0, 0.1)');
      subMenu.style('z-index', '1001'); // 確保子選單在最上層

      let subItems = [
        { name: '第一周作業', url: 'https://yyyyanlai.github.io/20250303/' },
        { name: '第二周作業', url: 'https://yyyyanlai.github.io/20250310/' },
        { name: '第三周作業', url: 'https://yyyyanlai.github.io/20250317/' },
        { name: '第四周作業', url: 'https://yyyyanlai.github.io/20250324./' },
      ];

      for (let subItem of subItems) {
        let subLi = createElement('li', subItem.name);
        subLi.style('list-style', 'none');
        subLi.style('cursor', 'pointer');
        subLi.style('color', '#007BFF');
        subLi.style('text-align', 'center');
        subLi.style('text-decoration', 'none');
        subLi.style('padding', '5px 10px');
        subLi.style('border-radius', '5px');
        subLi.style('background', '#f8f9fa');
        subLi.style('border', '1px solid #ccc');

        // 滑鼠移入事件
        subLi.mouseOver(() => {
          subLi.style('background', '#007BFF');
          subLi.style('color', '#ffffff');
        });

        // 滑鼠移出事件
        subLi.mouseOut(() => {
          subLi.style('background', '#f8f9fa');
          subLi.style('color', '#007BFF');
        });

        // 點擊事件，顯示對應的網頁
        subLi.mousePressed(() => {
          iframe.attribute('src', subItem.url); // 設定 iframe 的來源
          iframe.show(); // 顯示 iframe
        });

        subLi.parent(subMenu);
      }

      subMenu.parent(li);

      // 滑鼠移入「作品集」時顯示子選單
      li.mouseOver(() => {
        subMenu.style('display', 'flex');
      });

      // 滑鼠移出「作品集」時隱藏子選單
      li.mouseOut(() => {
        subMenu.style('display', 'none');
      });
    }

    li.parent(menu);
  }
}
