
const file = require('../../utils/file.js')
Component({

    properties:{
      imageid: {    //图片存储使用的key，没张图片的id必须唯一
        type: String,
        value: '1',
      },
      imageurl:{   //图片url
        type: String,
        value: 'default.png',
        observer: function(newurl,oldVal,changePath){
          let that = this;
          file.getLocalFile(this.properties.imageid, newurl, function (fileid, fileurl, localfileurl){
            that.setData({
              srcurl: localfileurl,
            });
          });
        }
      }
      

    },
    data:{

    },
    method:{
      customMethod: function(){}
    },
    externalClasses: ['wxximageclass'] //自定义样式

})