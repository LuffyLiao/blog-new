module.exports = {
    title: "Liaowq",
    theme: 'reco',
    description: '前端工程师，记录学习的脚步',
    head: [
        ['link', { rel: 'icon', href: '/favicon.png' }],
        ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }],
        ['script',{}, `
            var _hmt = _hmt || [];
            (function() {
              var hm = document.createElement("script");
              hm.src = "https://hm.baidu.com/hm.js?9c279da92a4d49aea2ae2a2b0cb96950";
              var s = document.getElementsByTagName("script")[0]; 
              s.parentNode.insertBefore(hm, s);
            })();
        `]
    ],
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            { text: '动态', link: '/timeline/', icon: 'reco-date' }
        ],
        repo: 'LuffyLiao/LuffyLiao.github.io',
        repoLabel: 'GitHub',
        docsBranch: 'master',
        lastUpdated: 'Last Updated',
        type: 'blog',
        authorAvatar: '/logo.png',
        author: 'Liaowq',
        // 博客配置
        blogConfig: {
            category: {
                location: 2,      // 在导航栏菜单中所占的位置，默认2
                text: '分类' // 默认文案 “分类”
            },
            tag: {
                location: 3,     // 在导航栏菜单中所占的位置，默认3
                text: '标签'      // 默认文案 “标签”
            },
            socialLinks: [     // 信息栏展示社交信息
                { icon: 'reco-github', link: 'https://github.com/LuffyLiao' },
                { icon: 'reco-mail', link: 'mentorbro1@gmail.com' }
            ]
        },
        modePicker: false 
    }
}