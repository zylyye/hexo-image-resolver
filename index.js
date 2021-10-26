'use strict'
const cheerio = require('cheerio')

// asset_dir /Users/zhuyilong/Documents/Personal/blog_new/source/_posts/read-note/software-release-life-cycle/
// slug read-note/software-release-life-cycle
// path 2021/10/25/read-note/software-release-life-cycle/
// permalink https://zylyye.cn/2021/10/25/read-note/software-release-life-cycle/

// parameters supported by this plugin
const getSupportedParamMap = (data) => {
  let { slug = '', path = '', permalink = '', title = '' } = data
  console.log('===', typeof permalink)
  permalink = permalink.replace(/^http(s)?:\/\/(\S)+?\//, '')
  let full_filename = slug
  let filename = slug.split('/').pop()
  return {
    title,
    permalink,
    full_filename,
    filename,
    // just indicate that this plugin support these params, will parse for each image later
    img_name: '',
    full_img_name: ''
  }
}

// customise image src by config
const getCustomizedImgSrc = (src, paramsMap) => {
  let image_resolver = hexo.config.image_resolver || {}
  // default
  let path = image_resolver.path || '/${permalink}${img_name}'
  paramsMap.full_img_name = src
  paramsMap.img_name = src.split('/').pop()
  // replace parameter which defined in map
  for (let key in paramsMap) {
    path = path.replace(`\$\{${key}\}`, paramsMap[key])
  }
  return path
}

hexo.extend.filter.register('after_post_render', (data) => {
  let paramMap = getSupportedParamMap(data)
  let parts = ['excerpt', 'more', 'content']
  for (let part of parts) {
    let $ = cheerio.load(data[part], {
      ignoreWhitespace: false,
      xmlMode: false,
      lowerCaseTags: false,
      decodeEntities: false
    });
    $('img').each(function () {
      let img = $(this)
      let src = img.attr('src') || ''
      // skip remote image url
      if (src.startsWith('http://') || src.startsWith('https://')) {
        return
      }
      let customUrl = getCustomizedImgSrc(src, paramMap)
      img.attr('src', customUrl)
      console.info(`update img url from ${src} to ${customUrl}`)
    })
    data[part] = $.html()
  }
})
