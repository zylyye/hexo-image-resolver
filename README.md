
# hexo-image-resolver

Custom your local image url in generation.

[![Latest Stable Version](https://img.shields.io/npm/v/hexo-image-resolver.svg)](https://www.npmjs.com/package/hexo-image-resolver) [![NPM Downloads](https://img.shields.io/npm/dm/hexo-image-resolver.svg)](https://npmjs.org/package/hexo-image-resolver) [![GitHub stars](https://img.shields.io/github/stars/zylyye/hexo-image-resolver?style=social&label=Star)](https://github.com/zylyye/hexo-image-resolver)

# Usage

```shell
npm i hexo-image-resolver --save
```


If you are using **[Post Asset Folder](https://hexo.io/docs/asset-folders.html)** (turn on this feature by setting `post_asset_folder: true` in your `_config.yml`), the plugin will resolve your local image path **automatically**, you don't need any extra configuration.



# Configuration

You can add following settings in your `_config.yml` to custom your own image url:

```yaml
image_resolver:
  # this is the default setting
  path: /${permalink}${img_name}
```

The  `path` will determine how the image's url generates, here are full of usable parameters:

| Name          | Desc                                                         |
| ------------- | ------------------------------------------------------------ |
| title         | your article's title.                                        |
| permalink     | permanent link, which specified in _config.yml.              |
| filename      | post filename without directory path and extension.          |
| full_filename | filename with directory path relative to your post directory, if your file is located in `hexo_dir/source/__posts/bash/basics.md`, the `full_filename` = `bash/basics`, and the `filename` =  `basics`. |
| img_name      | image's name with extension.                                 |
| full_img_name | original image url path.                                     |


****
