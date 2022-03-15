# 我的餐廳清單

一個使用 Node.js + Express + Mongoose 打造的餐廳美食網站，提供使用者瀏覽餐廳清單，並新增、瀏覽、修改、刪除特定餐廳。

## Feature - 產品功能

使用者可以以自己的email或facebook註冊帳號<br/>
使用者可以登入自己的餐廳清單，且依喜好新增、修改、刪除清單<br/>
使用者可以瀏覽全部所有餐廳<br/>
使用者可以點擊任一餐廳，查看更多餐廳資訊，如地址、電話與簡介<br/>
使用者可以依照中文名稱、英文名稱與餐廳類別進行搜尋<br/>
使用者可以依喜好排序餐廳<br/>

## Environment SetUp - 環境建置

Node.js<br/>

## dependencies

bcryptjs: 2.4.3<br/>
connect-flash: 0.1.1<br/>
dotenv: 8.2.0<br/>
express: 4.17.2<br/>
express-handlebars: 3.0.0<br/>
express-session: 1.17.1<br/>
method-override: 3.0.0<br/>
mongoose: 6.2.1<br/>
passport: 0.4.1<br/>
passport-facebook: 3.0.0<br/>
passport-local: 1.0.0<br/>

## Installing - 專案安裝流程

1. 打開你的 terminal，Clone 此專案至本機電腦

```
git clone
```

2. 開啟終端機(Terminal)，進入存放此專案的資料夾

```
cd
```

3. 安裝 npm 套件

```
在 Terminal 輸入 npm install express指令
```

4. 執行 seeder

```
在 Terminal 輸入 npm run seed 指令
```

5. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

6. 當 terminal 出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
http://localhost:3000
```
