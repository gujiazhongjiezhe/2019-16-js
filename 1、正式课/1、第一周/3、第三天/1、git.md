# git基础
- 1、git就是一个版本控制系统
    第一天：今天写了一章节(保存) 生成一个历史版本
    第二天：在第一天的基础上继续写了第二章节的内容，我又发现第一章节的内容有些不完善的地方，又开始修改第一章节的内容，又继续保存
    第三天：你发现，我不想改第二天改的东西了，
    + 记录历史版本信息
    + 方便团队之间协作开发

- 国内历史版本控制系统：
    + git：分布式管理系统
    + svn：集中式版本管理系统

- git的安装
    》 安装成功后在桌面右击出现git bash here，然后输入 git --version；如果出现版本信息，就是安装成功
- git的工作原理
    + 工作区 ：我们平时写代码的地方
    + 暂存区：用来临时存储代码的地方
    + 历史区：生成历史版本

    - 1、git的全局配置
        + git config -l:查看全局的配置信息
        + git config --global user.name 'xxx' :配置用户名
        + git config --global user.email 'xxx@xxx'
    - 2、创建本地仓库，完成版本控制
        + 1、创建本地仓库：
            git init(会默认生成一个.git文件，这里存放的就是本地仓库的信息，这个文件不能删除)
        + 2、再工作去编写代码，然后提交到暂存区
            + git add 文件名称 ：把指定的文件提交到暂存区
            + git add . : 把所有的文件提交到暂存区
            + git add -A：把所有的文件提交到暂存区

            + git status:查看文件提交状态，如果是红色的，那就是在工作区，如果是绿色的，那就是在暂存区

        + 3、把暂存区的代码提交到历史区
            + git commit -m'描述内容' ：把暂存区的代码提交到历史区，字符串里是这次提交内容的描述
            + git log：查看历史版本信息
            + git reflog：查看所有的历史版本信息
            + git reset --hard 前七位历史版本号
        + 4、创建远程仓库(gitHub)
        + 5、把本地的代码上传到远程仓库
            + 1、本地仓库和远程仓库建立连接
                + git remote -v(产看连接状态)
                + git remote add origin git仓库远程地址
                + git remote remove origin 移除本地仓库和远程仓库的连接

        + 上传代码
            + git pull origin master：把远程仓库的代码下载到本地
            + git push origin master：把本地的代码上传到远程仓库

        + git clone 远程仓库地址  仓库的名字[这个名字可以省略]
            + 在真正的项目开发中，我们都使用这个功能去下载项目
            + 相当 (git init  git remote add    git pull origin master)

            
