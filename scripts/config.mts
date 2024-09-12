// Originally from: https://coding-memo.work/development/2612/

/*
  sharpライブラリを使用して画像を圧縮する
  https://sharp.pixelplumbing.com/

  参考
  https://zenn.dev/spicato_blog/articles/6afdf43d0f0a97
*/
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

//対象ファイルの格納先
const dirName = './src/assets/images'

//変換後ファイルの格納先
const outPutDir = `./public/assets/images`

//jpgオプション 詳細: https://sharp.pixelplumbing.com/api-output#jpeg
const jpgOptions = {
  quality: 70,
  mozjpeg: true
}

//pngオプション 詳細: https://sharp.pixelplumbing.com/api-output#png
const pngOptions = {
  effort: 10,
  quality: 70,
  compressionLevel: 9
}

//gifオプション 詳細: https://sharp.pixelplumbing.com/api-output#gif
const gifOptions: sharp.GifOptions = {
  colors: 256
}

//webpオプション 詳細: https://sharp.pixelplumbing.com/api-output#webp
const webpOptions = {
  quality: 70,
  alpha_quality: 0
}

//avifオプション 詳細: https://sharp.pixelplumbing.com/api-output#avif
const avifOptions = {
  quality: 50
}

async function imageConversion(options: {
  isOptimize: any
  isWebp: any
  isAvif: any
  isJpg: any
  isPng: any
}) {
  options = Object.assign(
    {
      isOptimize: true,
      isWebp: true,
      isAvif: true,
      isJpg: true,
      isPng: true
    },
    options
  )
  const { isOptimize, isWebp, isAvif, isJpg, isPng } = options

  // 拡張子を確認
  function getExtension(file: string) {
    const ext = path.extname(file || '').split('.')
    return ext[ext.length - 1]
  }

  const readSubDir = (
    folderPath: string,
    finishFunc: { (items: any): void; (arg0: never[]): void }
  ) => {
    // フォルダ内の全ての画像の配列
    const result: string[] = []
    let execCounter = 0

    const readTopDir = (folderPath: fs.PathLike) => {
      execCounter += 1
      fs.readdir(folderPath, (err, items) => {
        //.から始まる隠しファイルを除外
        items = items.filter((item) => {
          return item.indexOf('.') !== 0
        })

        if (err) {
          console.log(err)
        }

        items = items.map((itemName) => {
          return path.join(folderPath.toString(), itemName)
        })

        items.forEach((itemPath) => {
          if (fs.statSync(itemPath).isFile()) {
            result.push(itemPath)
          }
          if (fs.statSync(itemPath).isDirectory()) {
            //フォルダなら再帰呼び出し
            readTopDir(itemPath)
          }
        })

        execCounter -= 1

        if (execCounter === 0) {
          if (finishFunc) {
            finishFunc(result)
          }
        }
      })
    }

    readTopDir(folderPath)
  }

  //サブディレクトリの列挙 非同期
  readSubDir(dirName, (items: any[]) => {
    items.forEach((item: fs.PathLike) => {
      const pathName = path.dirname(item.toString())
      const fileName = path.basename(item.toString())
      const fileFormat = getExtension(fileName)

      //非対応ファイルの簡易チェック
      if (fileFormat === '') {
        //拡張子なし
        console.log(`\u001b[1;31m 対応していないファイルです。-> ${fileName}`)
        return
      } else if (fileFormat === 'svg') {
        // svgは複製のみ
        fs.copyFile(item, `${outPutDir}/${fileName}`, (err) => {
          if (err) {
            return
          }
          console.log(`\u001b[1;32m ${fileName}を${outPutDir}に複製しました。`)
        })
        return
      }

      //JPG、PNG、GIFファイルを圧縮
      if (isOptimize) {
        let sh = sharp(`${pathName}/${path.basename(item.toString())}`)
        if (
          fileFormat === 'JPG' ||
          fileFormat === 'JPEG' ||
          fileFormat === 'jpg' ||
          fileFormat === 'jpeg'
        ) {
          sh = sh.jpeg(jpgOptions)
        } else if (fileFormat === 'PNG' || fileFormat === 'png') {
          sh = sh.png(pngOptions)
        } else if (fileFormat === 'GIF' || fileFormat === 'gif') {
          sh = sh.gif(gifOptions)
        } else {
          console.log(`\u001b[1;31m 対応していないファイルです。-> ${fileName}`)
          return
        }
        sh.toFile(`${outPutDir}/${fileName}`, (err, info) => {
          if (err) {
            console.error(err)
            return
          }
          console.log(`\u001b[1;32m ${fileName}を圧縮しました。 ${info.size / 1000}KB`)
        })
      }

      //webp変換
      if (isWebp) {
        sharp(`${pathName}/${path.basename(item.toString())}`)
          .webp(webpOptions)
          .toFile(`${outPutDir}/${fileName.replace(/\.[^/.]+$/, '.webp')}`, (err, info) => {
            if (err) {
              console.error(err)
              return
            }

            console.log(`\u001b[1;32m ${fileName}をwebpに変換しました。 ${info.size / 1000}KB`)
          })
      }

      //avif変換
      if (isAvif) {
        sharp(`${pathName}/${path.basename(item.toString())}`)
          .avif(avifOptions)
          .toFile(`${outPutDir}/${fileName.replace(/\.[^/.]+$/, '.avif')}`, (err, info) => {
            if (err) {
              console.error(err)
              return
            }

            console.log(`\u001b[1;32m ${fileName}をavifに変換しました。 ${info.size / 1000}KB`)
          })
      }

      //jpg変換
      if (isJpg) {
        sharp(`${pathName}/${path.basename(item.toString())}`)
          .jpeg(jpgOptions)
          .toFile(`${outPutDir}/${fileName.replace(/\.[^/.]+$/, '.jpg')}`, (err, info) => {
            if (err) {
              console.error(err)
              return
            }

            console.log(`\u001b[1;32m ${fileName}をjpgに変換しました。 ${info.size / 1000}KB`)
          })
      }

      //png変換
      if (isPng) {
        sharp(`${pathName}/${path.basename(item.toString())}`)
          .png(pngOptions)
          .toFile(`${outPutDir}/${fileName.replace(/\.[^/.]+$/, '.png')}`, (err, info) => {
            if (err) {
              console.error(err)
              return
            }

            console.log(`\u001b[1;32m ${fileName}をpngに変換しました。 ${info.size / 1000}KB`)
          })
      }
    })
  })
}
export { imageConversion }
