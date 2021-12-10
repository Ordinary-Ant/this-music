<template>
  <div class="playlist-container">
    <PlayInfo />
    <PlayControl />
    <PlayMenu />
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core'
import PlayInfo from '@/components/audioplay/PlayInfo.vue'
import PlayControl from '@/components/audioplay/PlayControl.vue'
import PlayMenu from '@/components/audioplay/PlayMenu.vue'
export default defineComponent({
  name: 'PlayList',
  setup () {
    return {}
  },
  components: {
    PlayInfo,
    PlayControl,
    PlayMenu
  }
})
</script>

<style lang="less" scoped>
.playlist-container{
  position: fixed;
  bottom: -60px;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  box-shadow: 0 0 10px rgba(255, 255, 255, .5);
  z-index: 100000;
  transition: all 0.6s ease-in-out;
  .songinfo{
    display: flex;
    align-items: center;
    margin-left: 5%;
    width: 30%;
    img{
      width: 70px;
      height: 70px;
      border-radius: 10px;
    }
    .info{
      display: flex;
      flex-direction: column;
      margin-left: 20px;
      font-size: 16px;
      letter-spacing: 2px;
      color: #000;
      .song-ator{
        color: #666;
        font-size: 14px;
        margin-top: 10px;
      }
    }
  }
  .handlemenu{
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 30%;
    .audio-menu{
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      a{
        width: 40px;
        height: 40px;
        text-align: center;
        line-height: 40px;
        border-radius: 50%;
        box-shadow: 0 0 3px rgba(0, 0, 0, .3);
        margin: 5px 10px 0;
        i{
          font-size: 30px;
          color: #666;
        }
      }
      .player{
        width: 45px;
        height: 45px;
        line-height: 45px;
        i{
          font-size: 35px;
        }
      }
    }
    .audio-time{
      margin-top: 5px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span{
        color: #666;
        font-size: 14px;
      }
      .time-control{
        position: relative;
        height: 5px;
        background-color: #ccc;
        margin: 0 10px;
        border-radius: 10px;
        flex: 1;
        .current-time{
          position: absolute;
          top: 0;
          left: 0;
          width: 5px;
          transition: width 1s linear;
          .current-circle{
            position: absolute;
            top: -2px;
            right: -3px;
            width: 8px;
            height: 8px;
            background: #000;
            box-shadow: 0 0 5px rgba(255, 255, 255, .5);
            border-radius: 50%;
          }
        }
      }
    }
  }
  .otheroption{
    width: 30%;
    margin-right: 5%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .volume,.songlist,.menu{
      margin-right: 40px;
      position: relative;
      a{
        width: 50px;
        height: 50px;
        i{
          font-size: 30px;
          color: #666;
        }
      }
    }
    .menu{
      span{
        position: absolute;
        left: 50%;
        bottom: 60px;
        transform: translateX(-50%);
        width: 80px;
        height: 25px;
        line-height: 25px;
        border-radius: 5px;
        font-size: 14px;
        text-align: center;
        background: #fff;
        box-shadow: 0 0 5px rgba(0, 0, 0, .5);
        opacity: 0;
        transition: opacity .6s ease-in-out;
      }
      &:hover{
        span{
          opacity: 1;
        }
      }
    }
    .volume{
      .volume-div{
        position: absolute;
        left: 50%;
        bottom: 60px;
        transform: translateX(-50%);
        height: 130px;
        width: 40px;
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        opacity: 0;
        transition: opacity .6s ease-in-out;
        .volume-control{
          position: relative;
          height: 100px;
          width: 6px;
          background-color: #ccc;
          margin: 15px auto;
          border-radius: 10px;
          .current-volume{
            position: absolute;
            bottom: 0;
            left: 0;
            height: 5px;
            transition: height 1s linear;
            .volume-circle{
              position: absolute;
              bottom: -3px;
              left: -1px;
              width: 8px;
              height: 8px;
              background: #000;
              box-shadow: 0 0 5px rgba(255, 255, 255, .5);
              border-radius: 50%;
            }
          }
        }
      }
      &:hover{
        .volume-div{
          opacity: 1;
        }
      }
    }
    .songlist{
      margin-right: 0;
      .list-wrap{
        position: absolute;
        bottom: 60px;
        right: 0;
        width: 500px;
        height: 500px;
        background: #fff;
        box-shadow: 0 0 10px rgba(0, 0, 0, .5);
        border-radius: 10px;
        padding: 10px;
        box-sizing: border-box;
        transition: all .6s ease-in-out;
        .list-title{
          border-bottom: 1px #ccc solid;
          .title-menu{
            display: flex;
            justify-content: flex-end;
            color: #666;
            margin-bottom: 10px;
            span{
              font-size: 14px;
              &:first-child{
                margin-right: 20px;
              }
            }
          }
        }
        .list-song{
          list-style: none;
          padding: 0;
          .list-item{
            display: flex;
            align-items: center;
            height: 20px;
            font-size: 14px;
            color: #666;
            i{
              width: 5%;
            }
            .song-name{
              width: 45%;
            }
            .song-ator{
              width: 45%;
            }
            .song-time{
              width: 10%;
            }
          }
        }
      }
    }
  }
  &:hover{
    bottom: 0;
  }
}
</style>
