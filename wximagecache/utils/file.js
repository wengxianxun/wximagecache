/*
  步骤：
  1.用wx.downloadFile下载到临时文件
  2.用wx.saveFile保存临时文件到长久文件
  3.用wx.setStorage把长久文件路径和fileurl匹配存储，外部可直接使用fileurl获取到文件路径使用(可多次使用)
*/

function downloadFile(fileid,fileurl, callback){

  console.log('downloadFile:'+fileurl);
    wx.downloadFile({
      url: fileurl,
      success: function (res) {
        console.log('下载完成');
        console.log(res);
        // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        if (res.statusCode === 200) {
          
          wx.saveFile({
            tempFilePath: res.tempFilePath,
            success: function (res) {
              var savedFilePath = res.savedFilePath;
              wx.setStorageSync(fileid, savedFilePath)//保存
              callback(fileid,fileurl,savedFilePath);
              console.log('下载图片到本地，并返回本地路径:'+savedFilePath);
            }
          })
        }else{
          console.log('错误状态:'+res.statusCode);
          
        }
      }
    })
  
}

/**
 * 根据文件url去本地获取，如果本地没有先去下载回本地
 * callback: 回调本地路径的文件或者图片,图片使用fileurl作为key保存在本地
 */
function getLocalFile(fileid,fileurl,callback){
   
   
  console.log('fileid:' + fileid + 'fileurl:' + fileurl );

  var localfileurl = wx.getStorageSync(fileid);//获取本地是否有缓存
  
  if(localfileurl){ //存在链接
    
    wx.getSavedFileInfo({
      filePath: localfileurl, 
      success: function (res) {
        console.log('存在本地url：'+localfileurl);
        callback(fileid,fileurl,localfileurl);
      },
      fail: function (res) {

        wx.removeStorageSync(fileid); //不存在就删除文件

        localfileurl = '';
        console.log('本地缓存被清理，重新下载:' + localfileurl);
        if (!localfileurl) {
          downloadFile(fileid,fileurl, callback);
        }
      }
    })
  }else{
    console.log('开始下载');
    downloadFile(fileid,fileurl, callback);
  }
  

  
}

/*
  删除缓存文件
*/
function removeSaveFile(){
   
   wx.getSavedFileList({
      success: function (res) {
        if (res.fileList.length > 0) {
          wx.removeSavedFile({
            filePath: res.fileList[0].filePath,
            complete: function (res) {
              console.log(res)
            }
          })
        }
      }
    })
}

module.exports.downloadFile = downloadFile;
module.exports.getLocalFile = getLocalFile;
module.exports.removeSaveFile = removeSaveFile;
