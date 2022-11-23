// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

require("@rails/ujs").start()
require("turbolinks").start()
require("@rails/activestorage").start()
require("channels")


// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)
import "../styles"

// vue.js
import Vue from 'vue/dist/vue.esm';
import List from 'components/list.vue'
import Rails from '@rails/ujs'


document.addEventListener("turbolinks:load", function(event){
  let el = document.querySelector('#board');
  if(el){
  new Vue({
    el,
    data:{
      lists: JSON.parse(el.dataset.lists),
      eventEditing: false,

    },
    computed:{
    },
    components:{List},
    methods:{
      newList(evt){
        evt.preventDefault()
        // console.log("ready to new a list")
        let data = new FormData();
        data.append("list[name]", '尚未決定名稱...');
        // lists
        Rails.ajax({
          url: '/lists',
          type: 'POST',
          data,
          dataType: 'json',
          success: res =>{
            console.log('success')
          },
          error: err => {
            console.log(err)
          }
        })
      },
      createEvent(evt){
        evt.preventDefault()
        let data = new FormData()
        data.append
        Rails.ajax({
          url:'',
          type: 'POST',
          data,
          dataType:'json',
          success: res => {
            console.log(res)
          },
          error: res => {
            console.log(err)
          }
        })
      }
    },
    mounted(){
      console.log("in vue")
    }
    })
  };
})

