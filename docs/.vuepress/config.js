module.exports = {
    base: '/learn-ts/',
    title: 'TypeScript',
    description: 'TS學習筆記',
    themeConfig: {
        // 你的GitHub仓库，请正确填写
        repo: 'https://github.com/LuffyLiao/blog-new',
        // 自定义仓库链接文字。
        repoLabel: 'GitHub',
        nav: [
            { text: '首页', link: '/' },
            { text: 'TS學習筆記', link: '/ts/' }
        ],
        sidebar: {
            '/ts/': [
                {
                    title: 'TS學習筆記',
                    collapsable: true,
                    children: [
                        '',
                        'base',
                        'week2',
                        'week3',
                        'week4',
                        'week7',
                        'week8',
                        'week9'
                    ]
                }
            ]
        }
    },
    markdown: {
        lineNumbers: true
    }
  }