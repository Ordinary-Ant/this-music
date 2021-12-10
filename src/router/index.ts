import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Index from '@/views/index/index.vue'
import Display from '@/views/display/Display.vue'
const Login = () => import(/* webpackChunkName: "login" */ '../views/login/Login.vue')
const Ranking = () => import(/* webpackChunkName: "Ranking" */ '../views/ranking/Ranking.vue')
const Singer = () => import(/* webpackChunkName: "Singer" */ '../views/singer/Singer.vue')
const SingSheet = () => import(/* webpackChunkName: "SingSheet" */ '../views/singsheet/SingSheet.vue')
const NewMusic = () => import(/* webpackChunkName: "NewMusic" */ '../views/newmusic/NewMusic.vue')
const RecommendMV = () => import(/* webpackChunkName: "RecommendMV" */ '../views/recommendmv/RecommendMV.vue')
const MVRanking = () => import(/* webpackChunkName: "MVRanking" */ '../views/mvranking/MVRanking.vue')
const Sole = () => import(/* webpackChunkName: "Sole" */ '../views/sole/Sole.vue')
const Video = () => import(/* webpackChunkName: "Video" */ '../views/video/Video.vue')
const Friends = () => import(/* webpackChunkName: "Friends" */ '../views/friends/Friends.vue')
const SingleSheet = () => import(/* webpackChunkName: "SingleSheet" */ '../views/singsheet/SingleSheet.vue')
const SingerDetail = () => import(/* webpackChunkName: "SingerDetail" */ '../views/singer/SingerDetail.vue')
const PrivateFM = () => import(/* webpackChunkName: "PrivateFM" */ '../views/privatefm/PrivateFM.vue')
const Player = () => import(/* webpackChunkName: "Player" */ '../views/player/Player.vue')
const SingerAlbum = () => import(/* webpackChunkName: "SingerAlbum" */ '../views/singer/SingerAlbum.vue')
const SingerMV = () => import(/* webpackChunkName: "SingerMV" */ '../views/singer/SingerMV.vue')
const SingerSeemArt = () => import(/* webpackChunkName: "SingerSeemArt" */ '../views/singer/SingerSeemArt.vue')
const SingerInfo = () => import(/* webpackChunkName: "SingerInfo" */ '../views/singer/SingerInfo.vue')
const Album = () => import(/* webpackChunkName: "Album" */ '../views/album/Album.vue')
const AlbumSongs = () => import(/* webpackChunkName: "AlbumSongs" */ '../views/album/AlbumSongs.vue')
const AlbumComment = () => import(/* webpackChunkName: "AlbumComment" */ '../views/album/AlbumComment.vue')
const AlbumInfo = () => import(/* webpackChunkName: "AlbumInfo" */ '../views/album/AlbumInfo.vue')
const Station = () => import(/* webpackChunkName: "Station" */ '../views/station/Station.vue')
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Index,
    children: [
      {
        path: '',
        name: 'Display',
        component: Display
      },
      {
        path: 'ranking',
        name: 'Ranking',
        component: Ranking
      },
      {
        path: 'singer',
        name: 'Singer',
        component: Singer
      },
      {
        path: 'singsheet',
        name: 'SingSheet',
        component: SingSheet
      },
      {
        path: 'newmusic',
        name: 'NewMusic',
        component: NewMusic
      },
      {
        path: 'recommendmv',
        name: 'RecommendMV',
        component: RecommendMV
      },
      {
        path: 'mvranking',
        name: 'MVRanking',
        component: MVRanking
      },
      {
        path: 'sole',
        name: 'Sole',
        component: Sole
      },
      {
        path: 'video',
        name: 'Video',
        component: Video
      },
      {
        path: 'friends',
        name: 'Friends',
        component: Friends
      },
      {
        path: 'singlesheet/:id',
        name: 'SingleSheet',
        component: SingleSheet,
        props: true
      },
      {
        path: 'singerdetail/:id',
        name: 'SingerDetail',
        component: SingerDetail,
        props: true,
        children: [
          {
            path: '',
            redirect: { name: 'SingerAlbum' }
          },
          {
            path: 'singerAlbum',
            name: 'SingerAlbum',
            component: SingerAlbum,
            props: true
          },
          {
            path: 'singermv',
            name: 'SingerMV',
            component: SingerMV,
            props: true
          },
          {
            path: 'singerinfo',
            name: 'SingerInfo',
            component: SingerInfo,
            props: true
          },
          {
            path: 'singerseemart',
            name: 'SingerSeemArt',
            component: SingerSeemArt,
            props: true
          }
        ]
      },
      {
        path: 'privatefm',
        name: 'PrivateFM',
        component: PrivateFM
      },
      {
        path: 'player',
        name: 'Player',
        component: Player
      },
      {
        path: 'album/:id',
        name: 'Album',
        component: Album,
        props: true,
        children: [
          {
            path: '',
            redirect: { name: 'AlbumSongs' }
          },
          {
            path: 'albumsongs',
            name: 'AlbumSongs',
            component: AlbumSongs
          },
          {
            path: 'albumcomment',
            name: 'AlbumComment',
            component: AlbumComment
          },
          {
            path: 'albuminfo',
            name: 'AlbumInfo',
            component: AlbumInfo
          }
        ]
      },
      {
        path: 'station',
        name: 'Station',
        component: Station
      }
    ]
  },
  {
    path: '/login',
    name: 'LoginIndex',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
